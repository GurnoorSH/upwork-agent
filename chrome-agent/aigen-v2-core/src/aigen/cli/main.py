"""Main CLI application v2 — all commands including scheduler, MCP, and quality."""

from __future__ import annotations

import sys
from pathlib import Path
from typing import Optional

import typer
from rich.console import Console

from aigen import __version__
from aigen.cli.wizard import run_init_wizard
from aigen.core.engine import GenerationEngine
from aigen.core.session import SessionManager
from aigen.tui.summary import show_summary

app = typer.Typer(
    name="aigen",
    help="Zero-API, browser-based AI generation toolkit v2",
    add_completion=False,
    rich_markup_mode="rich",
    invoke_without_command=True,
)
console = Console()


@app.callback()
def callback(
    ctx: typer.Context,
    version: bool = typer.Option(False, "--version", "-v", is_flag=True, help="Show version"),
) -> None:
    if version:
        console.print(f"[bold green]aigen-cli v{__version__}[/bold green]")
        raise typer.Exit(0)
    if ctx.invoked_subcommand is None:
        console.print(f"[bold green]aigen-cli v{__version__}[/bold green]\n")
        console.print("[bold]Enterprise Features:[/bold]")
        console.print("  [cyan]✓[/cyan] Playwright backend (headless mode)")
        console.print("  [cyan]✓[/cyan] AI Quality Scorer")
        console.print("  [cyan]✓[/cyan] Semantic Deduplication")
        console.print("  [cyan]✓[/cyan] HuggingFace Push")
        console.print("  [cyan]✓[/cyan] PII Detection & Compliance")
        console.print("  [cyan]✓[/cyan] Scheduled Generation")
        console.print("  [cyan]✓[/cyan] MCP Server")
        console.print("  [cyan]✓[/cyan] Domain Config Packs")
        console.print("\n")
        console.print(ctx.get_help())
        raise typer.Exit(0)


@app.command()
def init(
    config: Path = typer.Option(Path("aigen.yaml"), "--config", "-c", help="Output config file path"),
) -> None:
    """Interactive wizard to create a generation config."""
    run_init_wizard(config)


@app.command()
def generate(
    config: Path = typer.Option(Path("aigen.yaml"), "--config", "-c", help="Config file path"),
    debug_port: int = typer.Option(9222, "--debug-port", "-p", help="Chrome remote debugging port"),
    agents: int = typer.Option(2, "--agents", "-n", help="Number of parallel browser tabs"),
    backend: Optional[str] = typer.Option(
        None,
        "--backend",
        help="Execution backend override: selenium or playwright",
    ),
    target: Optional[int] = typer.Option(None, "--target", "-t", help="Override target count"),
    dry_run: bool = typer.Option(False, "--dry-run", help="Validate config without running"),
    resume: bool = typer.Option(True, "--resume/--no-resume", help="Resume from existing output"),
    pack: Optional[str] = typer.Option(None, "--pack", help="Use a domain config pack"),
) -> None:
    """Run a generation job from config."""
    from aigen.core.engine import load_config, validate_generation_config

    # Load from pack if specified
    if pack:
        pack_path = Path("packs") / f"{pack}.yaml"
        if not pack_path.exists():
            # Try as absolute path
            pack_path = Path(pack)
        if not pack_path.exists():
            console.print(f"[red]Pack not found: {pack}[/red]")
            raise typer.Exit(1)
        config = pack_path

    cfg = load_config(config)

    cfg_errors = validate_generation_config(cfg)
    if cfg_errors:
        console.print("[red]Invalid configuration:[/red]")
        for err in cfg_errors:
            console.print(f"  - {err}")
        raise typer.Exit(1)

    if target is not None:
        cfg["target"] = target

    if backend is not None:
        runtime_cfg = cfg.get("runtime")
        if not isinstance(runtime_cfg, dict):
            runtime_cfg = {}
        runtime_cfg["backend"] = backend
        cfg["runtime"] = runtime_cfg

    cfg_errors = validate_generation_config(cfg)
    if cfg_errors:
        console.print("[red]Invalid configuration after overrides:[/red]")
        for err in cfg_errors:
            console.print(f"  - {err}")
        raise typer.Exit(1)

    if dry_run:
        console.print("[bold green]✓ Config is valid[/bold green]")
        console.print(f"  Project: {cfg.get('project', 'unnamed')}")
        console.print(f"  Target: {cfg['target']} items")
        console.print(f"  Agents: {cfg.get('agents', agents)}")
        console.print(f"  Platforms: {cfg.get('platforms', ['gemini'])}")
        runtime_cfg = cfg.get("runtime", {})
        backend_name = runtime_cfg.get("backend", "selenium") if isinstance(runtime_cfg, dict) else "selenium"
        console.print(f"  Backend: {backend_name}")
        if cfg.get("quality", {}).get("enabled"):
            console.print(f"  Quality: {cfg['quality'].get('mode')} (threshold: {cfg['quality'].get('threshold')})")
        if cfg.get("compliance", {}).get("pii_detection"):
            console.print(f"  PII Detection: [green]enabled[/green]")
        if cfg.get("huggingface", {}).get("repo_id"):
            console.print(f"  HF Push: {cfg['huggingface']['repo_id']}")
        return

    engine = GenerationEngine(cfg, debug_port=debug_port, agents=agents, resume=resume, backend=backend)
    try:
        engine.run()
    except KeyboardInterrupt:
        console.print("\n[yellow]Interrupted — flushing current output[/yellow]")
        engine.flush()
        console.print("[green]Output saved[/green]")
        raise typer.Exit(0)
    except Exception as exc:
        console.print(f"[red]Generation failed: {exc}[/red]")
        raise typer.Exit(1)


@app.command()
def schedule(
    action: str = typer.Argument("list", help="Action: list, add, remove, run"),
    name: str = typer.Option("", "--name", "-n", help="Job name"),
    cron: str = typer.Option("", "--cron", help="Cron expression"),
    config: Path = typer.Option(Path("aigen.yaml"), "--config", "-c", help="Config file"),
    max_items: Optional[int] = typer.Option(None, "--max-items", help="Max items per run"),
    hf_repo: Optional[str] = typer.Option(None, "--hf-repo", help="HuggingFace repo ID"),
) -> None:
    """Manage scheduled generation jobs."""
    from aigen.core.scheduler import JobScheduler, ScheduledJob
    from aigen.core.engine import load_config

    scheduler = JobScheduler()

    if action == "list":
        scheduler._load_jobs()
        jobs = scheduler.list_jobs()
        if not jobs:
            console.print("[dim]No scheduled jobs[/dim]")
        else:
            for job in jobs:
                status = "[green]active[/green]" if job["enabled"] else "[red]disabled[/red]"
                console.print(f"  {job['name']} — {job['cron']} — next: {job.get('next_run', 'N/A')} — {status}")

    elif action == "add":
        if not name or not cron:
            console.print("[red]Error: --name and --cron are required[/red]")
            raise typer.Exit(1)
        cfg = load_config(config)
        job = ScheduledJob(
            name=name,
            cron_expression=cron,
            config=cfg,
            max_items=max_items,
            hf_repo_id=hf_repo,
        )
        scheduler.add_job(job)
        console.print(f"[green]✓ Job '{name}' scheduled: {cron}[/green]")

    elif action == "remove":
        if not name:
            console.print("[red]Error: --name is required[/red]")
            raise typer.Exit(1)
        if scheduler.remove_job(name):
            console.print(f"[green]✓ Job '{name}' removed[/green]")
        else:
            console.print(f"[yellow]Job '{name}' not found[/yellow]")

    elif action == "run":
        console.print("[bold]Starting scheduler loop...[/bold]")
        console.print("Press Ctrl+C to stop")
        import asyncio
        try:
            asyncio.run(scheduler.run_loop(
                engine_factory=lambda cfg: GenerationEngine(cfg, resume=True),
                check_interval=30,
            ))
        except KeyboardInterrupt:
            scheduler.stop()
            console.print("\n[yellow]Scheduler stopped[/yellow]")


@app.command()
def bridge(
    host: str = typer.Option("127.0.0.1", "--host", help="Bridge bind host"),
    port: int = typer.Option(8787, "--port", help="Bridge bind port"),
    debug_port: int = typer.Option(9222, "--debug-port", help="Chrome remote debugging port"),
    platform: str = typer.Option("gemini", "--platform", help="Default web AI platform"),
    token: str = typer.Option("", "--token", help="Optional shared token required via X-Aigen-Bridge-Token"),
) -> None:
    """Run the local HTTP bridge for browser-backed AI calls."""
    from aigen.bridge.server import run_bridge_server

    if platform not in {"gemini", "chatgpt", "claude", "perplexity"}:
        console.print("[red]Invalid platform. Use one of: gemini, chatgpt, claude, perplexity.[/red]")
        raise typer.Exit(1)

    console.print(f"[bold green]Starting aigen bridge[/bold green] http://{host}:{port}")
    console.print(f"[dim]Platform: {platform} | Chrome debug port: {debug_port}[/dim]")
    if token:
        console.print("[dim]Bridge token required via X-Aigen-Bridge-Token[/dim]")

    try:
        run_bridge_server(host=host, port=port, debug_port=debug_port, platform=platform, token=token)
    except KeyboardInterrupt:
        console.print("\n[yellow]Bridge stopped[/yellow]")


@app.command()
def mcp() -> None:
    """Run as an MCP server for AI agent integration."""
    from aigen.mcp_server import run_mcp_server
    run_mcp_server()


@app.command()
def push_hf(
    config: Path = typer.Option(Path("aigen.yaml"), "--config", "-c", help="Config file path"),
    repo_id: str = typer.Option(..., "--repo", "-r", help="HuggingFace repo ID (username/dataset-name)"),
    version: str = typer.Option("v1.0", "--version", help="Version tag"),
    private: bool = typer.Option(False, "--private", help="Make repo private"),
    token: Optional[str] = typer.Option(None, "--token", help="HF API token"),
) -> None:
    """Push an existing dataset to HuggingFace Hub."""
    from aigen.core.engine import load_config
    from aigen.output.hf_push import HuggingFacePusher
    import json

    cfg = load_config(config)
    output_dir = Path(cfg.get("output", {}).get("path", "output"))
    output_file = output_dir / cfg.get("output", {}).get("filename", "dataset.json")

    if not output_file.exists():
        console.print(f"[red]Dataset file not found: {output_file}[/red]")
        raise typer.Exit(1)

    payload = json.loads(output_file.read_text(encoding="utf-8"))

    console.print(f"[bold]Pushing to HuggingFace: {repo_id}[/bold]")
    pusher = HuggingFacePusher(token=token)

    url = pusher.push(
        repo_id=repo_id,
        dataset=payload,
        version=version,
        commit_message=f"aigen-cli: {cfg.get('project', 'dataset')} — {len(payload.get('items', []))} items",
        private=private,
    )

    # Generate and push dataset card
    card = pusher.generate_dataset_card(
        project_name=cfg.get("project", "dataset"),
        description=cfg.get("description", ""),
        schema=cfg.get("schema", {}),
        stats={"total_items": len(payload.get("items", []))},
        platform=", ".join(cfg.get("platforms", ["gemini"])),
    )
    console.print(f"[bold green]✓ Pushed to {url}[/bold green]")


@app.command()
def sessions(
    action: str = typer.Argument("list", help="Action: list, export, import"),
    profile: str = typer.Option("default", "--profile", help="Session profile name"),
    output: Optional[Path] = typer.Option(None, "--output", "-o", help="Export output path"),
    input_path: Optional[Path] = typer.Option(None, "--input", "-i", help="Import input path"),
) -> None:
    """Manage browser sessions (cookies)."""
    mgr = SessionManager()

    if action == "list":
        sessions = mgr.list_sessions()
        if not sessions:
            console.print("[dim]No saved sessions[/dim]")
        else:
            for name, info in sessions.items():
                console.print(f"  [bold]{name}[/bold] — {info}")
    elif action == "export":
        path = output or Path(f"sessions/{profile}.json")
        mgr.export_session(profile, path)
        console.print(f"[green]Session exported to {path}[/green]")
    elif action == "import":
        path = input_path or Path(f"sessions/{profile}.json")
        mgr.import_session(profile, path)
        console.print(f"[green]Session imported from {path}[/green]")
    else:
        console.print(f"[red]Unknown action: {action}[/red]")
        raise typer.Exit(1)


@app.command()
def status(
    output_dir: Path = typer.Option(Path("output"), "--output-dir", "-o", help="Output directory"),
) -> None:
    """Show generation status and statistics."""
    import json

    console.print(f"\n[bold]📊 Output directory:[/bold] {output_dir}")

    if not output_dir.exists():
        console.print("[yellow]Directory does not exist[/yellow]")
        return

    # Find dataset file
    dataset_file = None
    for name in ["dataset.json", "pseb_math.json", "faq_dataset.json"]:
        f = output_dir / name
        if f.exists():
            dataset_file = f
            break

    if not dataset_file:
        for f in output_dir.glob("*.json"):
            if f.name != "generation_log.json":
                dataset_file = f
                break

    if not dataset_file:
        console.print("[yellow]No dataset file found[/yellow]")
        return

    console.print(f"[bold]Dataset file:[/bold] {dataset_file}")

    try:
        payload = json.loads(dataset_file.read_text(encoding="utf-8"))
        items = payload.get("items", payload.get("questions", []))
        console.print(f"[bold]Total items:[/bold] {len(items)}")

        # Distribution
        classes = {}
        difficulties = {}
        platforms = {}
        for item in items:
            c = str(item.get("class", "unknown"))
            classes[c] = classes.get(c, 0) + 1
            d = str(item.get("difficulty", "unknown"))
            difficulties[d] = difficulties.get(d, 0) + 1
            p = str(item.get("provenance", {}).get("platform", "unknown"))
            platforms[p] = platforms.get(p, 0) + 1

        console.print("\n[bold]📈 Distribution:[/bold]")
        for label, data in [("Class", classes), ("Difficulty", difficulties), ("Platform", platforms)]:
            if data:
                console.print(f"  [dim]{label}:[/dim]")
                for k, v in sorted(data.items()):
                    console.print(f"    {k}: {v}")
    except Exception as exc:
        console.print(f"[yellow]Could not read dataset: {exc}[/yellow]")

    # Load generation log
    log_path = output_dir / "generation_log.json"
    if log_path.exists():
        try:
            stats = json.loads(log_path.read_text(encoding="utf-8"))
            console.print(f"\n[bold]📋 Generation Log:[/bold]")
            console.print(f"  Batches: {stats.get('batches', '?')}")
            console.print(f"  Repairs: {stats.get('repairs', 0)}")
            console.print(f"  Rejections: {stats.get('rejections', 0)}")
            if stats.get("quality_filtered"):
                console.print(f"  Quality Filtered: {stats['quality_filtered']}")
            if stats.get("pii_flagged"):
                console.print(f"  PII Flagged: {stats['pii_flagged']}")
            if stats.get("started_at"):
                console.print(f"  Started: {stats['started_at']}")
            if stats.get("completed_at"):
                console.print(f"  Completed: {stats['completed_at']}")
        except Exception:
            pass

    # Check for audit trail
    audit_path = output_dir / "audit_trail.json"
    if audit_path.exists():
        console.print(f"\n[bold]🔒 Compliance:[/bold] [green]Audit trail present[/green]")

    # File sizes
    total_size = sum(f.stat().st_size for f in output_dir.rglob("*") if f.is_file())
    raw_count = len(list((output_dir / "raw_responses").glob("*.txt"))) if (output_dir / "raw_responses").exists() else 0
    batch_count = len(list((output_dir / "parsed_batches").glob("*.json"))) if (output_dir / "parsed_batches").exists() else 0

    console.print(f"\n[bold]📁 Files:[/bold]")
    console.print(f"  Raw responses: {raw_count}")
    console.print(f"  Parsed batches: {batch_count}")
    console.print(f"  Total size: {total_size / 1024:.1f} KB")


@app.command()
def packs() -> None:
    """List available domain config packs."""
    packs_dir = Path(__file__).parent.parent.parent.parent / "packs"
    if not packs_dir.exists():
        console.print("[yellow]No packs directory found[/yellow]")
        return

    pack_files = list(packs_dir.glob("*.yaml"))
    if not pack_files:
        console.print("[dim]No domain packs available[/dim]")
        return

    console.print("\n[bold]📦 Available Domain Packs[/bold]\n")
    for pf in sorted(pack_files):
        import yaml
        try:
            cfg = yaml.safe_load(pf.read_text(encoding="utf-8"))
            desc = cfg.get("description", "No description")
            target = cfg.get("target", "?")
            console.print(f"  [bold]{pf.stem}[/bold]")
            console.print(f"    {desc}")
            console.print(f"    Target: {target} items")
            console.print(f"    Run: [cyan]aigen generate --pack {pf.stem}[/cyan]")
            console.print()
        except Exception:
            pass


def main() -> None:
    app()


if __name__ == "__main__":
    main()
