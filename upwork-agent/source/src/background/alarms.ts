import { CYCLE_NAMES } from "../shared/constants";

export const BACKGROUND_ALARMS = [
  { name: CYCLE_NAMES.FETCH_JOBS, delayInMinutes: 0, periodInMinutes: 1 },
  {
    name: CYCLE_NAMES.DAILY_REPORT,
    delayInMinutes: 10 / 60,
    periodInMinutes: 60 * 24
  }
] as const;

export type BackgroundAlarmName = (typeof BACKGROUND_ALARMS)[number]["name"];

export async function ensureBackgroundAlarms() {
  const existing = new Set((await browser.alarms.getAll()).map((alarm) => alarm.name));

  await Promise.all(
    BACKGROUND_ALARMS.map(async (alarm) => {
      if (!existing.has(alarm.name)) {
        await browser.alarms.create(alarm.name, {
          delayInMinutes: alarm.delayInMinutes,
          periodInMinutes: alarm.periodInMinutes
        });
      }
    })
  );
}
