"""Custom TUI widgets for the aigen dashboard."""

from __future__ import annotations

from typing import Optional

from textual.reactive import reactive
from textual.widget import Widget
from textual.widgets import Static


class AgentStatus(Widget):
    """Shows status of a single browser tab agent with color-coded indicator."""

    DEFAULT_CSS = """
    AgentStatus {
        height: auto;
        padding: 0 1;
    }
    AgentStatus .agent-name {
        text-style: bold;
    }
    AgentStatus .agent-idle { color: grey; }
    AgentStatus .agent-typing { color: yellow; }
    AgentStatus .agent-waiting { color: blue; }
    AgentStatus .agent-streaming { color: cyan; }
    AgentStatus .agent-done { color: green; }
    AgentStatus .agent-error { color: red; }
    """

    name: str = reactive("")
    status: str = reactive("idle")
    current_batch: int = reactive(0)
    last_response_size: int = reactive(0)

    STATUS_LABELS = {
        "idle": "⏸ Idle",
        "typing": "⌨️ Typing",
        "waiting": "⏳ Waiting",
        "streaming": "📡 Streaming",
        "done": "✅ Done",
        "error": "❌ Error",
    }

    def render(self) -> str:
        label = self.STATUS_LABELS.get(self.status, self.status)
        detail = ""
        if self.current_batch > 0:
            detail = f" Batch #{self.current_batch}"
        if self.last_response_size > 0:
            detail += f" ({self.last_response_size:,} chars)"
        return f"  [{self._color_class()}]{label}[/{self._color_class()}]  {self.name}{detail}"

    def _color_class(self) -> str:
        return f"agent-{self.status}"


class AgentPanel(Widget):
    """Container showing all agents in a vertical list."""

    DEFAULT_CSS = """
    AgentPanel {
        background: $surface;
        border: solid $primary;
        title: Agents;
        height: auto;
    }
    """

    def __init__(self, num_agents: int = 2, **kwargs):
        super().__init__(**kwargs)
        self.num_agents = num_agents
        self._agents: list[dict] = []
        for i in range(num_agents):
            self._agents.append({
                "name": f"AG{i + 1}",
                "status": "idle",
                "current_batch": 0,
                "last_response_size": 0,
            })

    def update_agent(self, idx: int, status: str, batch: int = 0, response_size: int = 0) -> None:
        if idx < len(self._agents):
            self._agents[idx]["status"] = status
            self._agents[idx]["current_batch"] = batch
            self._agents[idx]["last_response_size"] = response_size
        self.refresh()

    def render(self) -> str:
        lines = []
        for agent in self._agents:
            label = AgentStatus.STATUS_LABELS.get(agent["status"], agent["status"])
            color = f"agent-{agent['status']}"
            detail = ""
            if agent["current_batch"] > 0:
                detail = f"  Batch #{agent['current_batch']}"
            if agent["last_response_size"] > 0:
                detail += f" ({agent['last_response_size']:,}c)"
            lines.append(f"  [{color}]{label}[/{color}]  {agent['name']}{detail}")
        return "\n".join(lines)


class StatsPanel(Widget):
    """Live statistics panel."""

    DEFAULT_CSS = """
    StatsPanel {
        background: $surface;
        border: solid $accent;
        title: Statistics;
        height: auto;
    }
    """

    batches: int = reactive(0)
    repairs: int = reactive(0)
    rejections: int = reactive(0)
    current: int = reactive(0)
    target: int = reactive(0)
    elapsed: str = reactive("00:00")
    avg_response_time: str = reactive("--")

    def render(self) -> str:
        pct = (self.current / self.target * 100) if self.target > 0 else 0
        bar_len = 30
        filled = int(bar_len * self.current / self.target) if self.target > 0 else 0
        bar = "█" * filled + "░" * (bar_len - filled)

        return (
            f"  Progress:    [{self._progress_color()}]{bar}[/] {pct:.0f}%\n"
            f"  Items:       {self.current} / {self.target}\n"
            f"  Batches:     {self.batches}\n"
            f"  Repairs:     [{self._repair_color()}]{self.repairs}[/]\n"
            f"  Rejections:  [{self._reject_color()}]{self.rejections}[/]\n"
            f"  Elapsed:     {self.elapsed}\n"
            f"  Avg RT:      {self.avg_response_time}"
        )

    def _progress_color(self) -> str:
        pct = (self.current / self.target * 100) if self.target > 0 else 0
        if pct >= 80:
            return "green"
        elif pct >= 40:
            return "yellow"
        return "blue"

    def _repair_color(self) -> str:
        return "red" if self.repairs > 3 else "yellow" if self.repairs > 0 else "green"

    def _reject_color(self) -> str:
        return "red" if self.rejections > 5 else "yellow" if self.rejections > 0 else "green"


class ActivityLog(Widget):
    """Scrolling activity log showing recent events."""

    DEFAULT_CSS = """
    ActivityLog {
        background: $surface;
        border: solid $success;
        title: Activity;
        height: 1fr;
        overflow-y: auto;
    }
    """

    MAX_LINES = 50

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self._lines: list[str] = []

    def add(self, message: str, level: str = "INFO") -> None:
        import datetime
        ts = datetime.datetime.now().strftime("%H:%M:%S")
        color = {"INFO": "blue", "OK": "green", "WARN": "yellow", "ERROR": "red", "TX": "cyan", "RX": "magenta"}.get(level, "white")
        self._lines.append(f"  [dim]{ts}[/]  [{color}]{level:7s}[/]  {message}")
        if len(self._lines) > self.MAX_LINES:
            self._lines = self._lines[-self.MAX_LINES:]
        self.refresh()

    def render(self) -> str:
        return "\n".join(self._lines[-self.MAX_LINES:])


class Sparkline(Widget):
    """Simple sparkline showing response times."""

    DEFAULT_CSS = """
    Sparkline {
        height: 1;
    }
    """

    BARS = "▁▂▃▄▅▆▇█"

    def __init__(self, values: Optional[list[float]] = None, **kwargs):
        super().__init__(**kwargs)
        self.values = values or []

    def add_value(self, value: float) -> None:
        self.values.append(value)
        if len(self.values) > 20:
            self.values = self.values[-20:]
        self.refresh()

    def render(self) -> str:
        if not self.values:
            return ""
        max_val = max(self.values)
        if max_val == 0:
            return ""
        scale = len(self.BARS) - 1
        return "".join(self.BARS[int(v / max_val * scale)] for v in self.values)
