"""Generation Engine v2 — with quality scoring, semantic dedup, compliance, and HF push."""

from __future__ import annotations

import asyncio
import datetime
import json
import re
import time
from collections import defaultdict
from pathlib import Path
from typing import Any, Optional

from rich.console import Console

from aigen.core.driver import attach_driver
from aigen.core.tab import BrowserTab
from aigen.core.session import SessionManager
from aigen.parsers.json_extract import extract_json_array
from aigen.validators.schema import SchemaValidator
from aigen.validators.dedup import DedupEngine
from aigen.validators.semantic_dedup import SemanticDedup
from aigen.validators.quality import QualityScorer
from aigen.validators.compliance import ProvenanceTracker, PIIDetector
from aigen.output.json_writer import JsonWriter
from aigen.output.csv_writer import CsvWriter
from aigen.output.jsonl_writer import JsonlWriter
from aigen.output.hf_push import HuggingFacePusher, DatasetVersioner
from aigen.prompts.templates import make_batch_prompt, GENERATION_SYSTEM
from aigen.utils.fingerprint import fingerprint
from aigen.utils.normalize import normalize_text
from aigen.tui.summary import show_summary

console = Console()


def utc_now() -> str:
    return datetime.datetime.utcnow().isoformat() + "Z"


def load_config(path: Path) -> dict:
    import yaml
    with open(path, encoding="utf-8") as f:
        return yaml.safe_load(f)


def validate_generation_config(cfg: dict) -> list[str]:
    """Return user-facing config validation errors."""
    errors: list[str] = []

    if not isinstance(cfg, dict):
        return ["Config must be a mapping."]

    target = cfg.get("target")
    if not isinstance(target, int) or target <= 0:
        errors.append("'target' must be a positive integer.")

    batch_size = cfg.get("batch_size", 5)
    if not isinstance(batch_size, int) or batch_size <= 0:
        errors.append("'batch_size' must be a positive integer.")

    topic_pool = cfg.get("topic_pool")
    if not isinstance(topic_pool, list) or not topic_pool:
        errors.append("'topic_pool' must be a non-empty list.")
    else:
        invalid_topics = [i for i, topic in enumerate(topic_pool) if not isinstance(topic, dict)]
        if invalid_topics:
            errors.append("'topic_pool' entries must be objects (dict-like).")

    output_cfg = cfg.get("output", {})
    if output_cfg is not None and not isinstance(output_cfg, dict):
        errors.append("'output' must be an object.")
    else:
        filename = output_cfg.get("filename", "dataset.json") if isinstance(output_cfg, dict) else "dataset.json"
        if not isinstance(filename, str) or not filename.strip():
            errors.append("'output.filename' must be a non-empty string.")

    runtime_cfg = cfg.get("runtime", {})
    if runtime_cfg is not None and not isinstance(runtime_cfg, dict):
        errors.append("'runtime' must be an object.")
    else:
        backend = (runtime_cfg or {}).get("backend", "selenium")
        if backend not in {"selenium", "playwright"}:
            errors.append("runtime.backend must be one of: selenium, playwright.")

    playwright_cfg = cfg.get("playwright", {})
    if playwright_cfg is not None and not isinstance(playwright_cfg, dict):
        errors.append("'playwright' must be an object.")
    else:
        headless = (playwright_cfg or {}).get("headless", True)
        if not isinstance(headless, bool):
            errors.append("playwright.headless must be true or false.")

    source_cfg = cfg.get("source_attachments", {})
    if source_cfg and not isinstance(source_cfg, dict):
        errors.append("'source_attachments' must be an object.")
    elif isinstance(source_cfg, dict) and source_cfg.get("enabled"):
        chunks_path = source_cfg.get("chunks_path")
        books_dir = source_cfg.get("books_dir")
        if not chunks_path and not books_dir:
            errors.append("source_attachments.enabled=true requires 'chunks_path' or 'books_dir'.")
        if chunks_path and not Path(chunks_path).exists():
            errors.append(f"source_attachments.chunks_path not found: {chunks_path}")
        if books_dir and not Path(books_dir).exists():
            errors.append(f"source_attachments.books_dir not found: {books_dir}")
        max_chars = source_cfg.get("max_chars", 1800)
        if not isinstance(max_chars, int) or max_chars <= 0:
            errors.append("source_attachments.max_chars must be a positive integer.")
        upload_files = source_cfg.get("upload_files", False)
        if not isinstance(upload_files, bool):
            errors.append("source_attachments.upload_files must be true or false.")
        if upload_files and not books_dir:
            errors.append("source_attachments.upload_files=true requires 'books_dir' so source files can be resolved.")
        inject_prompt_text = source_cfg.get("inject_prompt_text", True)
        if not isinstance(inject_prompt_text, bool):
            errors.append("source_attachments.inject_prompt_text must be true or false.")

    return errors


class SourceAttachmentProvider:
    """Provide per-batch source excerpts from chunks or full_books files."""

    _BOOK_PATTERN = re.compile(r"class(?P<class_level>\d{1,2})_book(?P<book_no>\d+)_full\.txt$", re.IGNORECASE)

    def __init__(self, cfg: Optional[dict]):
        cfg = cfg or {}
        self.enabled = bool(cfg.get("enabled"))
        self.max_chars = int(cfg.get("max_chars", 1800))
        self._mode = None

        self._chunks_path: Optional[Path] = None
        self._chunks_handle = None

        self._books_dir: Optional[Path] = None
        self._book_files: list[Path] = []
        self._book_idx = 0
        self._book_offsets: dict[str, int] = {}
        self._book_stride = max(200, self.max_chars // 2)

        if not self.enabled:
            return

        chunks_path = cfg.get("chunks_path")
        books_dir = cfg.get("books_dir")

        if books_dir:
            p = Path(books_dir)
            if not p.exists():
                raise ValueError(f"source books_dir not found: {books_dir}")
            self._books_dir = p

        if chunks_path:
            p = Path(chunks_path)
            if not p.exists():
                raise ValueError(f"source chunks_path not found: {chunks_path}")
            self._mode = "chunks"
            self._chunks_path = p
            return

        if books_dir:
            p = self._books_dir
            files = []
            for fp in sorted(p.rglob("*.txt")):
                if not fp.is_file():
                    continue
                rel_parts = fp.relative_to(p).parts
                if any(part.startswith(".") for part in rel_parts):
                    continue
                if fp.name.endswith("-checkpoint.txt"):
                    continue
                files.append(fp)
            if not files:
                raise ValueError(f"no .txt files found under books_dir: {books_dir}")
            self._mode = "books"
            self._books_dir = p
            self._book_files = files
            return

        raise ValueError("source_attachments.enabled=true requires chunks_path or books_dir")

    def close(self) -> None:
        if self._chunks_handle:
            try:
                self._chunks_handle.close()
            except Exception:
                pass
            self._chunks_handle = None

    def next(self) -> Optional[dict]:
        if not self.enabled or not self._mode:
            return None
        if self._mode == "chunks":
            return self._next_chunk_attachment()
        return self._next_book_attachment()

    def _next_chunk_attachment(self) -> Optional[dict]:
        if not self._chunks_path:
            return None
        if self._chunks_handle is None:
            self._chunks_handle = self._chunks_path.open("r", encoding="utf-8")

        for _ in range(2):
            line = self._chunks_handle.readline()
            if not line:
                self._chunks_handle.seek(0)
                line = self._chunks_handle.readline()
            if not line:
                return None

            try:
                row = json.loads(line)
            except Exception:
                continue

            source_text = normalize_text(row.get("text", ""))[: self.max_chars]
            if not source_text:
                continue

            source_path = row.get("path")
            source_file = None
            if self._books_dir and source_path:
                candidate = (self._books_dir / str(source_path)).resolve()
                if candidate.exists() and candidate.is_file():
                    source_file = str(candidate)

            return {
                "source_path": source_path or row.get("book_id", "unknown"),
                "book_id": row.get("book_id", "unknown"),
                "class": row.get("class", "unknown"),
                "source_text": source_text,
                "source_file": source_file,
            }

        return None

    def _next_book_attachment(self) -> Optional[dict]:
        if not self._book_files:
            return None

        fp = self._book_files[self._book_idx % len(self._book_files)]
        self._book_idx += 1

        text = fp.read_text(encoding="utf-8", errors="ignore")
        normalized = normalize_text(text)
        if not normalized:
            return None

        key = str(fp)
        offset = self._book_offsets.get(key, 0)
        if offset >= len(normalized):
            offset = 0

        source_text = normalized[offset : offset + self.max_chars]
        self._book_offsets[key] = offset + self._book_stride

        class_level = "unknown"
        m = self._BOOK_PATTERN.search(fp.name)
        if m:
            class_level = int(m.group("class_level"))

        rel_path = fp.name
        if self._books_dir:
            rel_path = fp.relative_to(self._books_dir).as_posix()

        return {
            "source_path": rel_path,
            "book_id": fp.stem.replace("_full", ""),
            "class": class_level,
            "source_text": source_text,
            "source_file": str(fp.resolve()),
        }


class GenerationEngine:
    def __init__(
        self,
        cfg: dict,
        debug_port: int = 9222,
        agents: int = 2,
        resume: bool = True,
        backend: Optional[str] = None,
    ):
        self.cfg = cfg
        self.debug_port = debug_port
        self.agents = agents
        self.resume = resume

        self.target = cfg["target"]
        self.batch_size = cfg.get("batch_size", 5)
        self.project = cfg.get("project", "unnamed")
        self.platforms = cfg.get("platforms", ["gemini"])
        self.mode = cfg.get("mode", "batch")

        runtime_cfg = cfg.get("runtime", {})
        runtime_cfg = runtime_cfg if isinstance(runtime_cfg, dict) else {}
        self.backend = backend or runtime_cfg.get("backend", "selenium")
        playwright_cfg = cfg.get("playwright", {})
        playwright_cfg = playwright_cfg if isinstance(playwright_cfg, dict) else {}
        self.playwright_headless = bool(playwright_cfg.get("headless", True))

        # Output setup
        self.output_dir = Path(cfg.get("output", {}).get("path", "output"))
        self.raw_dir = self.output_dir / "raw_responses"
        self.batch_dir = self.output_dir / "parsed_batches"
        output_cfg = cfg.get("output", {})
        self.output_file = self.output_dir / output_cfg.get("filename", "dataset.json")
        self.output_format = output_cfg.get("format", "json")

        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.raw_dir.mkdir(parents=True, exist_ok=True)
        self.batch_dir.mkdir(parents=True, exist_ok=True)

        # State
        self.rows: list[dict] = []
        self.dedup = DedupEngine(enabled=cfg.get("validators", {}).get("dedup", True))

        # v2: Semantic dedup
        self.semantic_dedup = SemanticDedup(
            enabled=cfg.get("validators", {}).get("dedup", True),
            threshold=cfg.get("validators", {}).get("semantic_threshold", 0.92),
            method=cfg.get("validators", {}).get("semantic_method", "auto"),
        )

        # v2: Quality scorer
        quality_cfg = cfg.get("quality", {})
        self.quality_scorer = QualityScorer(
            mode=quality_cfg.get("mode", "none"),
            threshold=quality_cfg.get("threshold", 6.0),
        ) if quality_cfg.get("enabled", False) else None

        # v2: Compliance
        compliance_cfg = cfg.get("compliance", {})
        self.pii_detector = PIIDetector(
            enabled=compliance_cfg.get("pii_detection", False),
            auto_redact=compliance_cfg.get("auto_redact", False),
        )
        self.provenance = ProvenanceTracker(
            config_version=cfg.get("version", "2.0"),
        )

        self.validator = SchemaValidator(cfg.get("schema", {}))
        self.writer = self._make_writer()

        source_cfg = cfg.get("source_attachments", {})
        self.source_provider: Optional[SourceAttachmentProvider] = None
        self.source_upload_files = bool(source_cfg.get("upload_files", False)) if isinstance(source_cfg, dict) else False
        self.source_inject_prompt_text = (
            bool(source_cfg.get("inject_prompt_text", True)) if isinstance(source_cfg, dict) else True
        )
        try:
            self.source_provider = SourceAttachmentProvider(source_cfg)
            if self.source_provider and self.source_provider.enabled:
                console.print("[dim]Source attachments enabled for prompt grounding[/dim]")
                if self.source_upload_files:
                    console.print("[dim]Source file upload enabled (Gemini UI attachment)[/dim]")
                if not self.source_inject_prompt_text:
                    console.print("[dim]Prompt source text injection disabled[/dim]")
        except Exception as exc:
            console.print(f"[yellow]Source attachments disabled: {exc}[/yellow]")

        if resume:
            self._load_existing()

        # Browser
        self.driver = None
        self.tabs: list[BrowserTab] = []

        # v2: HF push
        self.hf_cfg = cfg.get("huggingface", {})

        # Stats
        self.stats = {
            "batches": 0,
            "repairs": 0,
            "rejections": 0,
            "quality_filtered": 0,
            "pii_flagged": 0,
            "started_at": None,
            "completed_at": None,
        }

    def _make_writer(self):
        fmt = self.output_format
        if fmt == "csv":
            return CsvWriter(self.output_file)
        elif fmt == "jsonl":
            return JsonlWriter(self.output_file)
        return JsonWriter(self.output_file, project=self.project)

    def _load_existing(self) -> None:
        if not self.output_file.exists():
            return
        try:
            if self.output_format == "json":
                payload = json.loads(self.output_file.read_text(encoding="utf-8"))
                existing = payload.get("questions", payload.get("items", []))
            elif self.output_format == "jsonl":
                existing = [json.loads(line) for line in self.output_file.read_text().strip().splitlines() if line.strip()]
            else:
                existing = []
            for row in existing:
                if isinstance(row, dict):
                    self.rows.append(row)
                    self.dedup.add_existing(row)
                    # Add to semantic dedup
                    text = row.get("question_text", row.get("question", row.get("text", "")))
                    if text:
                        self.semantic_dedup.add_existing(text)
            console.print(f"[dim]Loaded {len(self.rows)} existing items[/dim]")
        except Exception as exc:
            console.print(f"[yellow]Failed loading existing dataset: {exc}[/yellow]")

    def _flush(self) -> None:
        self.writer.write(self.rows, self.stats)

    def setup(self) -> None:
        console.print(f"\n[bold]Connecting to Chrome on port {self.debug_port}...[/bold]")
        self.driver = attach_driver(self.debug_port)
        self._validate_remote_debug_connection()

        for i in range(self.agents):
            name = f"AG{i + 1}"
            if i == 0 and self.driver.window_handles:
                h = self.driver.window_handles[0]
                self.driver.switch_to.window(h)
            else:
                h = self._open_tab(name)
            tab = BrowserTab(self.driver, h, name, platform=self.platforms[i % len(self.platforms)])
            self.tabs.append(tab)

        console.print(f"[green]✓ {len(self.tabs)} agent tabs ready[/green]\n")

    def _validate_remote_debug_connection(self) -> None:
        """Ensure the attached Chrome session is usable before generation starts."""
        if not self.driver:
            raise RuntimeError("Chrome driver was not initialized.")

        handles = list(getattr(self.driver, "window_handles", []) or [])
        if not handles:
            raise RuntimeError(
                "No discoverable pages found on remote-debug Chrome session. "
                "Open Chrome with --remote-debugging-port and keep at least one tab active."
            )

        # For Gemini runs, we require at least one Gemini page to reduce selector failures.
        if "gemini" in self.platforms:
            has_gemini_tab = False
            for handle in handles:
                try:
                    self.driver.switch_to.window(handle)
                    if "gemini.google.com" in (self.driver.current_url or ""):
                        has_gemini_tab = True
                        break
                except Exception:
                    continue

            if not has_gemini_tab:
                raise RuntimeError(
                    "Connected to Chrome, but no Gemini tab was detected. "
                    "Open https://gemini.google.com/app in the attached profile before running."
                )

    def _open_tab(self, name: str) -> str:
        before = set(self.driver.window_handles)
        self.driver.switch_to.new_window("tab")
        after = set(self.driver.window_handles)
        handles = list(after - before)
        if not handles:
            raise RuntimeError(f"Cannot open tab for {name}")
        h = handles[0]
        self.driver.switch_to.window(h)
        try:
            self.driver.set_page_load_timeout(45)
            self.driver.get("https://gemini.google.com/app")
        except Exception:
            pass
        time.sleep(2)
        return h

    def run(self) -> None:
        cfg_errors = validate_generation_config(self.cfg)
        if cfg_errors:
            console.print("[red]Invalid configuration:[/red]")
            for err in cfg_errors:
                console.print(f"  - {err}")
            return

        self.stats["started_at"] = utc_now()

        if self.backend == "playwright":
            self._run_with_playwright()
        else:
            self._run_with_selenium()

        self.stats["completed_at"] = utc_now()
        (self.output_dir / "generation_log.json").write_text(
            json.dumps(self.stats, ensure_ascii=False, indent=2, default=str), encoding="utf-8"
        )

        self.provenance.export_audit_trail(self.output_dir / "audit_trail.json")

        if self.hf_cfg.get("repo_id"):
            self._push_to_huggingface()

        show_summary(self.output_dir, self.project, self.stats, self.rows)

        if self.source_provider:
            self.source_provider.close()

    def _run_with_selenium(self) -> None:
        # Auto-setup if not already done
        if not self.tabs or not self.driver:
            self.setup()

        if not self.tabs:
            console.print("[red]Error: No browser tabs available. Is Chrome running with --remote-debugging-port?[/red]")
            return

        console.print(f"\n[bold green]{'═' * 50}[/bold green]")
        console.print(f"[bold green]  {self.project}[/bold green]")
        console.print(
            f"[bold green]  Target: {self.target} | Agents: {len(self.tabs)} | Batch: {self.batch_size}[/bold green]"
        )
        console.print(f"[bold green]  Backend: selenium | Platforms: {', '.join(self.platforms)}[/bold green]")
        quality_mode = self.quality_scorer.mode if self.quality_scorer else "none"
        console.print(f"[bold green]  Quality: {quality_mode} | Semantic Dedup: {self.semantic_dedup.enabled}[/bold green]")
        console.print(f"[bold green]{'═' * 50}[/bold green]\n")

        with console.status(f"[bold green]Generating {self.project}...[/bold green]", spinner="dots"):
            batch_idx = 0
            topic_idx = 0
            topic_pool = self.cfg.get("topic_pool", [])
            n_tabs = len(self.tabs)

            while len(self.rows) < self.target:
                tab = self.tabs[batch_idx % n_tabs]
                topic = topic_pool[topic_idx % len(topic_pool)]
                topic_idx += 1
                batch_idx += 1

                source_attachment = self.source_provider.next() if self.source_provider else None

                if self.source_upload_files and source_attachment and source_attachment.get("source_file"):
                    try:
                        uploaded = tab.upload_file(source_attachment["source_file"])
                        if uploaded:
                            console.print(
                                f"    [dim]Attached source file: {Path(source_attachment['source_file']).name}[/dim]"
                            )
                        else:
                            console.print("    [yellow]Source file upload skipped/failed[/yellow]")
                    except Exception as exc:
                        console.print(f"    [yellow]Source file upload error: {exc}[/yellow]")

                prompt = make_batch_prompt(
                    batch_size=self.batch_size,
                    batch_idx=batch_idx,
                    project=self.project,
                    topic=topic,
                    schema=self.cfg.get("schema", {}),
                    platform=tab.platform,
                    source_attachment=source_attachment if self.source_inject_prompt_text else None,
                )

                console.print(
                    f"  [cyan]Batch {batch_idx}[/cyan] → [{tab.color}]{tab.name}[/{tab.color}] | Topic: {topic.get('topic', 'N/A')}"
                )

                try:
                    tab.send(prompt)
                    raw = tab.recv()
                except Exception as exc:
                    console.print(f"    [red]Error: {exc}[/red]")
                    continue

                raw_path = self.raw_dir / f"batch_{batch_idx:04d}_{tab.name}.txt"
                raw_path.write_text(raw, encoding="utf-8")

                parsed = extract_json_array(raw)
                if not parsed:
                    self.stats["repairs"] += 1
                    console.print("    [yellow]Parse failed → repair[/yellow]")
                    tab.send("Rewrite your previous answer as ONLY a strict valid JSON array. No markdown, no commentary.")
                    raw = tab.recv()
                    raw_path = self.raw_dir / f"batch_{batch_idx:04d}_{tab.name}_repair.txt"
                    raw_path.write_text(raw, encoding="utf-8")
                    parsed = extract_json_array(raw)

                parsed_path = self.batch_dir / f"batch_{batch_idx:04d}_{tab.name}.json"
                parsed_path.write_text(json.dumps(parsed, ensure_ascii=False, indent=2), encoding="utf-8")

                added = self._ingest_items(
                    parsed=parsed,
                    batch_idx=batch_idx,
                    tab_name=tab.name,
                    platform=tab.platform,
                    prompt=prompt,
                    raw_path=raw_path,
                    parsed_path=parsed_path,
                )
                self.stats["batches"] += 1
                self._flush()
                console.print(f"    [green]+{added}[/green] | Total: {len(self.rows)}/{self.target}")
                time.sleep(1.5)

    def _run_with_playwright(self) -> None:
        try:
            asyncio.run(self._run_with_playwright_async())
        except RuntimeError as exc:
            if "asyncio.run() cannot be called" not in str(exc):
                raise
            loop = asyncio.new_event_loop()
            try:
                loop.run_until_complete(self._run_with_playwright_async())
            finally:
                loop.close()

    async def _run_with_playwright_async(self) -> None:
        from aigen.core.playwright_pool import PlaywrightPool

        console.print(f"\n[bold green]{'═' * 50}[/bold green]")
        console.print(f"[bold green]  {self.project}[/bold green]")
        console.print(
            f"[bold green]  Target: {self.target} | Agents: {self.agents} | Batch: {self.batch_size}[/bold green]"
        )
        console.print(f"[bold green]  Backend: playwright | Platforms: {', '.join(self.platforms)}[/bold green]")
        quality_mode = self.quality_scorer.mode if self.quality_scorer else "none"
        console.print(f"[bold green]  Quality: {quality_mode} | Semantic Dedup: {self.semantic_dedup.enabled}[/bold green]")
        console.print(f"[bold green]{'═' * 50}[/bold green]\n")

        batch_idx = 0
        topic_idx = 0
        topic_pool = self.cfg.get("topic_pool", [])

        async with PlaywrightPool(headless=self.playwright_headless) as pool:
            agents = await pool.create_agents(count=self.agents, platforms=self.platforms)

            while len(self.rows) < self.target:
                tasks: list[tuple[int, str]] = []
                task_meta: list[dict] = []

                for agent_idx, agent in enumerate(agents):
                    if len(self.rows) >= self.target:
                        break

                    topic = topic_pool[topic_idx % len(topic_pool)]
                    topic_idx += 1
                    batch_idx += 1

                    source_attachment = self.source_provider.next() if self.source_provider else None
                    prompt = make_batch_prompt(
                        batch_size=self.batch_size,
                        batch_idx=batch_idx,
                        project=self.project,
                        topic=topic,
                        schema=self.cfg.get("schema", {}),
                        platform=agent.platform,
                        source_attachment=source_attachment if self.source_inject_prompt_text else None,
                    )

                    tasks.append((agent_idx, prompt))
                    task_meta.append(
                        {
                            "agent": agent,
                            "batch_idx": batch_idx,
                            "prompt": prompt,
                            "topic": topic,
                        }
                    )

                if not tasks:
                    break

                responses = await pool.run_parallel(tasks)

                for meta, response in zip(task_meta, responses):
                    agent = meta["agent"]
                    batch_id = meta["batch_idx"]
                    prompt = meta["prompt"]
                    topic = meta["topic"]
                    console.print(
                        f"  [cyan]Batch {batch_id}[/cyan] → [green]{agent.name}[/green] | Topic: {topic.get('topic', 'N/A')}"
                    )

                    raw = response.text or ""
                    raw_path = self.raw_dir / f"batch_{batch_id:04d}_{agent.name}.txt"
                    raw_path.write_text(raw, encoding="utf-8")

                    parsed = extract_json_array(raw)
                    if not parsed:
                        self.stats["repairs"] += 1
                        repair_prompt = "Rewrite your previous answer as ONLY a strict valid JSON array. No markdown, no commentary."
                        repair_response = await agent.send_and_recv(repair_prompt)
                        raw = repair_response.text or ""
                        raw_path = self.raw_dir / f"batch_{batch_id:04d}_{agent.name}_repair.txt"
                        raw_path.write_text(raw, encoding="utf-8")
                        parsed = extract_json_array(raw)

                    parsed_path = self.batch_dir / f"batch_{batch_id:04d}_{agent.name}.json"
                    parsed_path.write_text(json.dumps(parsed, ensure_ascii=False, indent=2), encoding="utf-8")

                    added = self._ingest_items(
                        parsed=parsed,
                        batch_idx=batch_id,
                        tab_name=agent.name,
                        platform=agent.platform,
                        prompt=prompt,
                        raw_path=raw_path,
                        parsed_path=parsed_path,
                    )
                    self.stats["batches"] += 1
                    self._flush()
                    console.print(f"    [green]+{added}[/green] | Total: {len(self.rows)}/{self.target}")

                await asyncio.sleep(1.0)

    def _ingest_items(
        self,
        parsed: list,
        batch_idx: int,
        tab_name: str,
        platform: str,
        prompt: str,
        raw_path: Path,
        parsed_path: Path,
    ) -> int:
        added = 0
        for raw_item in parsed:
            if len(self.rows) >= self.target:
                break

            item = self.validator.validate(raw_item)
            if not item:
                self.stats["rejections"] += 1
                continue

            text = item.get("question_text", item.get("question", item.get("text", "")))
            if text and self.semantic_dedup.is_duplicate(text):
                continue

            if self.dedup.is_duplicate(item):
                continue

            quality_score_value = None
            if self.quality_scorer:
                quality_score = self.quality_scorer.score_item_sync(item)
                quality_score_value = quality_score.score
                if not quality_score.passed:
                    self.stats["quality_filtered"] += 1
                    continue

            if self.pii_detector.enabled:
                pii_result = self.pii_detector.scan_item(item)
                if pii_result:
                    self.stats["pii_flagged"] += len(pii_result)
                    if self.pii_detector.auto_redact:
                        for key, result in pii_result.items():
                            item[key] = result.redacted_text

            self.dedup.add(item)
            if text:
                self.semantic_dedup.add(text)

            item["provenance"] = {
                "batch": batch_idx,
                "tab": tab_name,
                "platform": platform,
                "captured_at": utc_now(),
            }
            self.rows.append(item)
            added += 1

            self.provenance.record_item(
                platform=platform,
                batch_id=batch_idx,
                tab_name=tab_name,
                generated_at=utc_now(),
                prompt_text=prompt,
                raw_response_path=str(raw_path),
                parsed_path=str(parsed_path),
                quality_score=quality_score_value,
            )

        return added

    def _push_to_huggingface(self) -> None:
        """Push dataset to HuggingFace Hub."""
        repo_id = self.hf_cfg.get("repo_id")
        if not repo_id:
            return

        console.print(f"\n[bold]Pushing to HuggingFace: {repo_id}[/bold]")
        pusher = HuggingFacePusher(token=self.hf_cfg.get("token"))

        payload = {
            "dataset_name": self.project,
            "created_at": utc_now(),
            "total_items": len(self.rows),
            "items": self.rows,
        }

        version = self.hf_cfg.get("version", f"v{self.stats['batches']}")
        url = pusher.push(
            repo_id=repo_id,
            dataset=payload,
            version=version,
            commit_message=f"aigen-cli: {self.project} — {len(self.rows)} items",
            private=self.hf_cfg.get("private", False),
        )

        # Generate and push dataset card
        card = pusher.generate_dataset_card(
            project_name=self.project,
            description=self.cfg.get("description", ""),
            schema=self.cfg.get("schema", {}),
            stats=self.stats,
            platform=", ".join(self.platforms),
        )
        console.print(f"[green]✓ Pushed to {url}[/green]")

    def flush(self) -> None:
        self._flush()
