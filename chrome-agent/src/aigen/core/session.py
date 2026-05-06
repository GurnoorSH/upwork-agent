"""Browser session (cookie) management."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any


class SessionManager:
    """Manage browser login sessions as JSON cookie files."""

    def __init__(self, base_dir: str = "sessions"):
        self.base_dir = Path(base_dir)
        self.base_dir.mkdir(parents=True, exist_ok=True)

    def list_sessions(self) -> dict[str, str]:
        sessions = {}
        for f in self.base_dir.glob("*.json"):
            try:
                data = json.loads(f.read_text(encoding="utf-8"))
                cookies = data.get("cookies", [])
                sessions[f.stem] = f"{len(cookies)} cookies, {data.get('url', 'N/A')}"
            except Exception:
                sessions[f.stem] = "(corrupt)"
        return sessions

    def export_session(self, profile: str, path: Path, driver=None) -> None:
        """Export cookies from a live driver or from current store."""
        path.parent.mkdir(parents=True, exist_ok=True)
        if driver is not None:
            cookies = driver.get_cookies()
            data = {"cookies": cookies, "url": driver.current_url}
        else:
            src = self.base_dir / f"{profile}.json"
            if src.exists():
                data = json.loads(src.read_text(encoding="utf-8"))
            else:
                data = {"cookies": [], "url": ""}
        path.write_text(json.dumps(data, indent=2), encoding="utf-8")

    def import_session(self, profile: str, path: Path) -> None:
        """Import cookies from a JSON file into session store."""
        data = json.loads(path.read_text(encoding="utf-8"))
        dest = self.base_dir / f"{profile}.json"
        dest.write_text(json.dumps(data, indent=2), encoding="utf-8")

    def load_for_driver(self, profile: str, driver) -> bool:
        """Load cookies into a live driver."""
        src = self.base_dir / f"{profile}.json"
        if not src.exists():
            return False
        try:
            data = json.loads(src.read_text(encoding="utf-8"))
            driver.get(data.get("url", "https://gemini.google.com"))
            for cookie in data.get("cookies", []):
                try:
                    driver.add_cookie(cookie)
                except Exception:
                    pass
            driver.refresh()
            return True
        except Exception:
            return False
