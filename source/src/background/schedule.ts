import type { GlobalState, Schedule } from "../storage/globalState";

export function shouldNotifyNow(state: GlobalState, now = new Date()) {
  if (!state.schedulingEnabled) {
    return true;
  }

  if (state.schedules.length === 0) {
    return false;
  }

  return state.schedules.some((schedule) => isScheduleActive(schedule, now));
}

function isScheduleActive(schedule: Schedule, now: Date) {
  if (!schedule.days.includes(now.getDay())) {
    return false;
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const from = toMinutes(schedule.from);
  const to = toMinutes(schedule.to);

  if (from === null || to === null) {
    return false;
  }

  if (from <= to) {
    return currentMinutes >= from && currentMinutes <= to;
  }

  return currentMinutes >= from || currentMinutes <= to;
}

function toMinutes(value: string | number | Date) {
  if (typeof value === "number") {
    return value;
  }

  if (value instanceof Date) {
    return value.getHours() * 60 + value.getMinutes();
  }

  const match = /^(\d{1,2}):(\d{2})/.exec(value);
  if (!match) {
    return null;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return null;
  }

  return hours * 60 + minutes;
}
