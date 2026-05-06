"""Interactive configuration wizard."""

from __future__ import annotations

from pathlib import Path
from typing import Any, Optional, List

import yaml
from rich.console import Console

console = Console()

PLATFORMS = ["gemini", "chatgpt", "claude", "perplexity"]
MODES = ["batch", "iterative"]
OUTPUT_FORMATS = ["json", "csv", "jsonl"]


def _ask(prompt: str, default_val=None, choices=None):
    while True:
        suffix = f" [{default_val}]" if default_val else ""
        if choices:
            suffix += f" (choices: {', '.join(choices)})"
        raw = input(f"{prompt}{suffix}: ").strip()
        if not raw and default_val:
            return default_val
        if not raw:
            continue
        if choices and raw not in choices:
            console.print(f"  [red]Invalid. Choose: {', '.join(choices)}[/red]")
            continue
        return raw


def _ask_multi_select(prompt: str, options: list[str]) -> list[str]:
    console.print(f"\n[bold]{prompt}[/bold]")
    selected = []
    for opt in options:
        raw = input(f"  [ ] {opt} — include? (y/n) [y]: ").strip().lower()
        if raw in ("", "y", "yes"):
            selected.append(opt)
    return selected


def run_init_wizard(config_path: Path) -> None:
    console.print("\n[bold green]╔══════════════════════════════════════╗[/bold green]")
    console.print("[bold green]║   aigen-cli Configuration Wizard    ║[/bold green]")
    console.print("[bold green]╚══════════════════════════════════════╝[/bold green]\n")

    cfg: dict[str, Any] = {}

    # Project
    cfg["project"] = _ask("Project name", default_val="my_dataset")
    cfg["description"] = _ask("Description", default_val="AI-generated dataset")

    # Target
    cfg["target"] = int(_ask("Target items count", default_val="100"))
    cfg["batch_size"] = int(_ask("Batch size per request", default_val="5"))
    cfg["agents"] = int(_ask("Parallel browser tabs", default_val="2"))

    # Platforms
    platforms = _ask_multi_select("AI platforms", PLATFORMS)
    if not platforms:
        platforms = ["gemini"]
    cfg["platforms"] = platforms

    # Mode
    cfg["mode"] = _ask("Generation mode", default_val="batch", choices=MODES)

    # Schema
    console.print("\n[bold]Schema fields (comma-separated)[/bold]")
    console.print("  [dim]Example: question_text,question_text_english,expected_answer,difficulty,marks[/dim]")
    fields_raw = _ask("Fields", default_val="question_text,question_text_english,expected_answer,key_marking_points,common_wrong_answers,difficulty,marks")
    cfg["schema"] = {"fields": [f.strip() for f in fields_raw.split(",") if f.strip()]}

    # Required fields
    req_raw = _ask("Required fields (comma-separated)", default_val="question_text,expected_answer,difficulty")
    cfg["schema"]["required"] = [f.strip() for f in req_raw.split(",") if f.strip()]

    # Topic pool
    console.print("\n[bold]Topic pool[/bold] — define topics to cycle through")
    console.print("  [dim]Format: chapter | topic | question_type | difficulty | marks[/dim]")
    console.print("  [dim]One per line, empty line to finish[/dim]")
    topics = []
    while True:
        raw = input(f"  Topic {len(topics) + 1}: ").strip()
        if not raw:
            break
        parts = [p.strip() for p in raw.split("|")]
        if len(parts) >= 5:
            topics.append({
                "chapter": parts[0],
                "topic": parts[1],
                "question_type": parts[2],
                "difficulty": parts[3],
                "marks": int(parts[4]),
            })
    cfg["topic_pool"] = topics

    # Output
    cfg["output"] = {
        "format": _ask("Output format", default_val="json", choices=OUTPUT_FORMATS),
        "path": _ask("Output directory", default_val="output"),
        "filename": _ask("Output filename", default_val="dataset.json"),
    }

    # Validators
    cfg["validators"] = {
        "dedup": _ask("Enable deduplication", default_val="true", choices=["true", "false"]).lower() == "true",
        "min_answer_length": int(_ask("Minimum answer length (chars)", default_val="50")),
    }

    # Write config
    config_path.parent.mkdir(parents=True, exist_ok=True)
    with open(config_path, "w", encoding="utf-8") as f:
        yaml.dump(cfg, f, default_flow_style=False, allow_unicode=True, sort_keys=False)

    console.print(f"\n[bold green]✓ Config saved to {config_path}[/bold green]")
    console.print(f"\nRun with: [bold]aigen generate -c {config_path}[/bold]")
