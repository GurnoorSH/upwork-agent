"""Scheduled Generation — cron-based recurring dataset."""

from __future__ import annotations

import asyncio
import json
import logging
import time
from datetime import datetime
from pathlib import Path
from typing import Callable, Optional

from croniter import croniter

logger = logging.getLogger(__name__)


class ScheduledJob:
    """A single scheduled generation job."""

    def __init__(
        self,
        name: str,
        cron_expression: str,
        config: dict,
        mode: str = "top_up",
        max_items: Optional[int] = None,
        enabled: bool = True,
        on_complete: Optional[Callable] = None,
        hf_repo_id: Optional[str] = None,
    ):
        self.name = name
        self.cron_expression = cron_expression
        self.config = config
        self.mode = mode
        self.max_items = max_items
        self.enabled = enabled
        self.on_complete = on_complete
        self.hf_repo_id = hf_repo_id
        self.last_run: Optional[datetime] = None
        self.next_run: Optional[datetime] = None
        self.run_count = 0
        self.run_history: list[dict] = []
        self._update_next()

    def _update_next(self) -> None:
        """Calculate the next scheduled run time."""
        try:
            cron = croniter(self.cron_expression, datetime.now())
            self.next_run = cron.get_next(datetime)
        except Exception as exc:
            logger.error(f"Invalid cron expression '{self.cron_expression}': {exc}")
            self.next_run = None

    def is_due(self) -> bool:
        """Check if this job is due to run."""
        if not self.enabled or not self.next_run:
            return False
        return datetime.now() >= self.next_run

    def record_run(self, result: dict) -> None:
        """Record a completed run."""
        self.last_run = datetime.now()
        self.run_count += 1
        self.run_history.append({
            "timestamp": self.last_run.isoformat(),
            "items_generated": result.get("items_generated", 0),
            "duration_seconds": result.get("duration_seconds", 0),
            "status": result.get("status", "unknown"),
        })
        self._update_next()

    def to_dict(self) -> dict:
        """Serialize job to dict."""
        return {
            "name": self.name,
            "cron": self.cron_expression,
            "config": self.config,
            "mode": self.mode,
            "max_items": self.max_items,
            "enabled": self.enabled,
            "last_run": self.last_run.isoformat() if self.last_run else None,
            "next_run": self.next_run.isoformat() if self.next_run else None,
            "run_count": self.run_count,
            "hf_repo_id": self.hf_repo_id,
        }


class JobScheduler:
    """Manage scheduled generation jobs."""

    def __init__(self, jobs_dir: Path = Path("schedules")):
        self.jobs_dir = jobs_dir
        self.jobs_dir.mkdir(parents=True, exist_ok=True)
        self.jobs: list[ScheduledJob] = []
        self._running = False

    def add_job(self, job: ScheduledJob) -> None:
        """Add a scheduled job."""
        self.jobs.append(job)
        self._save_jobs()

    def remove_job(self, name: str) -> bool:
        """Remove a scheduled job."""
        before = len(self.jobs)
        self.jobs = [j for j in self.jobs if j.name != name]
        if len(self.jobs) < before:
            self._save_jobs()
            return True
        return False

    def list_jobs(self) -> list[dict]:
        """List all scheduled jobs."""
        return [j.to_dict() for j in self.jobs]

    def get_due_jobs(self) -> list[ScheduledJob]:
        """Get jobs that are due to run."""
        return [j for j in self.jobs if j.is_due()]

    def _save_jobs(self) -> None:
        """Persist jobs to disk."""
        for job in self.jobs:
            path = self.jobs_dir / f"{job.name}.json"
            path.write_text(json.dumps(job.to_dict(), indent=2, default=str), encoding="utf-8")

    def _load_jobs(self) -> None:
        """Load jobs from disk."""
        self.jobs = []
        for path in self.jobs_dir.glob("*.json"):
            try:
                data = json.loads(path.read_text(encoding="utf-8"))
                job = ScheduledJob(
                    name=data["name"],
                    cron_expression=data["cron"],
                    config=data["config"],
                    mode=data.get("mode", "top_up"),
                    max_items=data.get("max_items"),
                    enabled=data.get("enabled", True),
                    hf_repo_id=data.get("hf_repo_id"),
                )
                if data.get("last_run"):
                    job.last_run = datetime.fromisoformat(data["last_run"])
                job.run_count = data.get("run_count", 0)
                job._update_next()
                self.jobs.append(job)
            except Exception as exc:
                logger.error(f"Failed to load job from {path}: {exc}")

    async def run_loop(self, engine_factory: Callable, check_interval: int = 60) -> None:
        """Main loop: check for due jobs and run them.
        
        Args:
            engine_factory: Callable that creates a GenerationEngine from a config
            check_interval: How often to check for due jobs (seconds)
        """
        self._running = True
        self._load_jobs()

        logger.info(f"Scheduler started with {len(self.jobs)} jobs")

        while self._running:
            due_jobs = self.get_due_jobs()
            for job in due_jobs:
                logger.info(f"Running scheduled job: {job.name}")
                start = time.time()
                try:
                    engine = engine_factory(job.config)
                    if job.max_items:
                        engine.target = min(engine.target, job.max_items)
                    engine.run()
                    result = {
                        "items_generated": len(engine.rows),
                        "duration_seconds": time.time() - start,
                        "status": "success",
                    }
                    job.record_run(result)

                    # Push to HF if configured
                    if job.hf_repo_id:
                        from aigen.output.hf_push import HuggingFacePusher
                        pusher = HuggingFacePusher()
                        version = f"v{job.run_count}"
                        url = pusher.push(
                            repo_id=job.hf_repo_id,
                            dataset={"items": engine.rows},
                            version=version,
                            commit_message=f"Scheduled run {job.name} — {version}",
                        )
                        logger.info(f"Pushed to HF: {url}")

                except Exception as exc:
                    result = {
                        "items_generated": 0,
                        "duration_seconds": time.time() - start,
                        "status": f"error: {exc}",
                    }
                    job.record_run(result)
                    logger.error(f"Job {job.name} failed: {exc}")

                self._save_jobs()

            await asyncio.sleep(check_interval)

    def stop(self) -> None:
        """Stop the scheduler."""
        self._running = False
