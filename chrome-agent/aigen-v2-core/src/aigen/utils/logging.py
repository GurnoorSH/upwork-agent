"""Logging utilities."""

from __future__ import annotations

import datetime


def now_str() -> str:
    return datetime.datetime.now().strftime("%H:%M:%S.%f")[:-3]


def log(msg: str, level: str = "INFO", tab: str = "") -> None:
    tag = f"[{tab}]" if tab else "      "
    print(f"[{now_str()}] {level:5s} {tag} {msg}", flush=True)
