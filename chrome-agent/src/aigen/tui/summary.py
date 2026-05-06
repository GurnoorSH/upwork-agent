"""Post-run summary with rich formatting."""

from __future__ import annotations

import datetime
from pathlib import Path
from typing import Any

from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich.text import Text

console = Console()


def show_summary(output_dir: Path, project: str, stats: dict, items: list[dict]) -> None:
    """Display a beautiful post-generation summary."""
    console.print()
    console.print("[bold green]" + "═" * 60 + "[/bold green]")
    console.print("[bold green]  🎉  Generation Complete[/bold green]")
    console.print("[bold green]" + "═" * 60 + "[/bold green]")

    # Stats table
    table = Table(show_header=False, box=None, padding=(0, 2))
    table.add_column("Label", style="bold", justify="right", width=18)
    table.add_column("Value", justify="left")

    table.add_row("Project", project)
    table.add_row("Items Generated", str(len(items)))
    table.add_row("Batches", str(stats.get("batches", "?")))
    table.add_row("Repairs", f"[red]{stats.get('repairs', 0)}[/]" if stats.get("repairs", 0) > 0 else f"[green]{stats.get('repairs', 0)}[/]")
    table.add_row("Rejections", f"[red]{stats.get('rejections', 0)}[/]" if stats.get("rejections", 0) > 0 else f"[green]{stats.get('rejections', 0)}[/]")

    elapsed = _calc_elapsed(stats)
    table.add_row("Elapsed Time", elapsed)

    if stats.get("batches", 0) > 0:
        avg = _parse_elapsed_secs(elapsed) / stats["batches"]
        table.add_row("Avg Batch Time", f"{avg:.1f}s")

    console.print(table)

    # Distribution
    console.print("\n[bold]📊 Distribution[/bold]")
    dist = _compute_distribution(items)
    for category, values in dist.items():
        console.print(f"\n  [dim]{category}:[/dim]")
        for key, count in sorted(values.items(), key=lambda x: -x[1])[:10]:
            bar_len = max(1, int(30 * count / max(values.values())))
            bar = "█" * bar_len + "░" * (30 - bar_len)
            console.print(f"    {key:<25s} [{_dist_color(count)}]{bar}[/] {count}")

    # Cost estimate
    console.print("\n[bold]💰 Cost Estimate[/bold]")
    api_cost = len(items) * 0.008  # Approximate per-item API cost
    console.print(f"  Estimated API cost (OpenAI):   [red]${api_cost:.2f}[/]")
    console.print(f"  Your cost (aigen-cli):         [green]$0.00[/]  (using existing subscription)")
    console.print(f"  [bold green]You saved: ${api_cost:.2f}[/bold green]")

    # Files
    console.print("\n[bold]📁 Output Files[/bold]")
    files = list(output_dir.rglob("*"))
    total_size = sum(f.stat().st_size for f in files if f.is_file())
    console.print(f"  Files:  {len(files)}")
    console.print(f"  Size:   {_human_size(total_size)}")
    console.print(f"  Path:   [cyan]{output_dir}[/cyan]")

    console.print("\n[bold green]" + "═" * 60 + "[/bold green]")
    console.print()


def _calc_elapsed(stats: dict) -> str:
    started = stats.get("started_at")
    completed = stats.get("completed_at")
    if started and completed:
        try:
            fmt = "%Y-%m-%dT%H:%M:%S.%f" if "." in started else "%Y-%m-%dT%H:%M:%S"
            s = datetime.datetime.fromisoformat(started.replace("Z", ""))
            c = datetime.datetime.fromisoformat(completed.replace("Z", ""))
            diff = int((c - s).total_seconds())
            m, s = divmod(diff, 60)
            return f"{m:02d}:{s:02d}"
        except Exception:
            return "--:--"
    return "--:--"


def _parse_elapsed_secs(s: str) -> float:
    try:
        parts = s.split(":")
        return int(parts[0]) * 60 + int(parts[1])
    except Exception:
        return 1.0


def _compute_distribution(items: list[dict]) -> dict[str, dict[str, int]]:
    dist: dict[str, dict[str, int]] = {}
    for item in items:
        for field in ["class", "difficulty", "question_type", "chapter"]:
            val = str(item.get(field, "unknown"))
            if field not in dist:
                dist[field] = {}
            dist[field][val] = dist[field].get(val, 0) + 1
    return dist


def _dist_color(count: int) -> str:
    if count >= 20:
        return "green"
    elif count >= 10:
        return "yellow"
    return "blue"


def _human_size(n: int) -> str:
    for unit in ["B", "KB", "MB", "GB"]:
        if abs(n) < 1024:
            return f"{n:.1f} {unit}"
        n /= 1024
    return f"{n:.1f} TB"
