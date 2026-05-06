"""Textual TUI Dashboard for aigen generation."""

from __future__ import annotations

import time
from typing import Optional

from textual.app import App, ComposeResult
from textual.containers import Horizontal, Vertical
from textual.widgets import Header, Footer, Label, ProgressBar

from aigen.tui.widgets import AgentPanel, StatsPanel, ActivityLog, Sparkline


class GenerationDashboard(App):
    """Live dashboard for monitoring AI generation jobs."""

    CSS = """
    Screen {
        background: $background;
    }
    #header-bar {
        dock: top;
        height: 3;
        background: $primary-darken-2;
    }
    #header-bar Label {
        content-align: center middle;
        text-style: bold;
    }
    #progress-section {
        height: 5;
        padding: 0 2;
    }
    #progress-section Label {
        text-align: center;
    }
    #main-area {
        layout: horizontal;
    }
    #left-panel {
        width: 35%;
    }
    #right-panel {
        width: 65%;
    }
    AgentPanel {
        background: $surface;
        border: solid $primary;
        title: "Agents";
        margin: 0 1;
    }
    StatsPanel {
        background: $surface;
        border: solid $accent;
        title: "Statistics";
        margin: 0 1;
    }
    ActivityLog {
        background: $surface;
        border: solid $success;
        title: "Activity Log";
        margin: 0 1;
        height: 1fr;
    }
    Sparkline {
        height: 1;
        margin: 0 1;
    }
    """

    def __init__(self, project: str = "aigen-job", target: int = 100, agents: int = 2, **kwargs):
        super().__init__(**kwargs)
        self.project = project
        self.target = target
        self.num_agents = agents
        self._current = 0
        self._batches = 0
        self._repairs = 0
        self._rejections = 0
        self._start_time = time.time()
        self._response_times: list[float] = []

    def compose(self) -> ComposeResult:
        yield Header()
        yield Label(f"⚡ {self.project}", id="header-bar")
        yield Vertical(
            Label(f"Progress: 0 / {self.target}", id="progress-label"),
            id="progress-section",
        )
        yield Horizontal(
            Vertical(
                AgentPanel(num_agents=self.num_agents, id="agent-panel"),
                StatsPanel(id="stats-panel"),
                id="left-panel",
            ),
            Vertical(
                ActivityLog(id="activity-log"),
                Sparkline(id="sparkline"),
                id="right-panel",
            ),
            id="main-area",
        )
        yield Footer()

    def on_mount(self) -> None:
        self.update_title()
        self.set_interval(1.0, self.update_elapsed)

    def update_title(self) -> None:
        elapsed = time.time() - self._start_time
        mins, secs = divmod(int(elapsed), 60)
        self.title = f"aigen — {self.project} — {mins:02d}:{secs:02d}"

    def update_progress(self, current: int) -> None:
        self._current = current
        pct = (current / self.target * 100) if self.target > 0 else 0
        label = self.query_one("#progress-label", Label)
        bar = "█" * int(50 * current / self.target) + "░" * (50 - int(50 * current / self.target)) if self.target > 0 else ""
        label.update(f"  [{self._progress_color(pct)}]{bar}[/]  {current} / {self.target}  ({pct:.0f}%)")

    def update_agent(self, idx: int, status: str, batch: int = 0, response_size: int = 0) -> None:
        panel = self.query_one("#agent-panel", AgentPanel)
        panel.update_agent(idx, status, batch, response_size)

    def update_stats(self, batches: int = 0, repairs: int = 0, rejections: int = 0) -> None:
        self._batches = batches
        self._repairs = repairs
        self._rejections = rejections
        stats = self.query_one("#stats-panel", StatsPanel)
        stats.current = self._current
        stats.target = self.target
        stats.batches = batches
        stats.repairs = repairs
        stats.rejections = rejections
        elapsed = time.time() - self._start_time
        mins, secs = divmod(int(elapsed), 60)
        stats.elapsed = f"{mins:02d}:{secs:02d}"
        if self._response_times:
            avg = sum(self._response_times) / len(self._response_times)
            stats.avg_response_time = f"{avg:.1f}s"

    def add_response_time(self, seconds: float) -> None:
        self._response_times.append(seconds)
        sparkline = self.query_one("#sparkline", Sparkline)
        sparkline.add_value(seconds)

    def add_log(self, message: str, level: str = "INFO") -> None:
        log = self.query_one("#activity-log", ActivityLog)
        log.add(message, level)

    def update_elapsed(self) -> None:
        self.update_title()
        self.update_stats(self._batches, self._repairs, self._rejections)

    def _progress_color(self, pct: float) -> str:
        if pct >= 80:
            return "green"
        elif pct >= 40:
            return "yellow"
        return "blue"
