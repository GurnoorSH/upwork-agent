import { ensureBackgroundAlarms } from "../src/background/alarms";
import { runDailyReportCycle } from "../src/background/dailyReport";
import { runFetchJobsCycle } from "../src/background/fetchJobsCycle";
import { runSubscriptionCheckCycle } from "../src/background/subscriptionCheck";
import { getJobDetails } from "../src/graphql/upworkClient";
import { appendLog } from "../src/logs/logStorage";
import { CYCLE_NAMES } from "../src/shared/constants";
import { isGetJobDetailsMessage, isOpenPageMessage } from "../src/shared/messages";

export default defineBackground({
  type: "module",
  main() {
    browser.action.onClicked.addListener(async () => {
      await browser.tabs.create({ url: browser.runtime.getURL("/options.html") });
    });

    browser.notifications.onClicked.addListener(async () => {
      await browser.tabs.create({
        active: true,
        url: browser.runtime.getURL("/options.html")
      });
    });

    browser.alarms.onAlarm.addListener(async (alarm) => {
      switch (alarm.name) {
        case CYCLE_NAMES.FETCH_JOBS:
          await runFetchJobsCycle();
          break;
        case CYCLE_NAMES.DAILY_REPORT:
          await runDailyReportCycle();
          break;
        case CYCLE_NAMES.CHECK_SUBSCRIPTION:
          await runSubscriptionCheckCycle();
          break;
      }
    });

    browser.runtime.onMessage.addListener((message) => {
      if (isOpenPageMessage(message)) {
        void browser.tabs.create({ active: true, url: message.url });
        return undefined;
      }

      if (isGetJobDetailsMessage(message)) {
        return getJobDetails(message.jobId);
      }

      return undefined;
    });

    browser.runtime.onInstalled.addListener(async ({ reason }) => {
      if (reason === "install" || reason === "update") {
        await ensureBackgroundAlarms();
        await appendLog({
          id: crypto.randomUUID(),
          level: "info",
          message: `Extension ${reason} initialized background alarms.`,
          createdAt: Date.now()
        });
      }
    });

    browser.runtime.onStartup.addListener(ensureBackgroundAlarms);
    browser.idle.onStateChanged.addListener(async (state) => {
      if (state === "active") await ensureBackgroundAlarms();
    });
  }
});
