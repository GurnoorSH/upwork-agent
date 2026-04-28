import {
  g as u,
  c,
  u as o,
  v as H,
  l as w,
  e as l,
  b as n,
  E as y,
  a as k,
  r as S,
  i as N,
} from "./chunks/_virtual_wxt-plugins-C1xRqpYK.js";
import {
  u as v,
  a as I,
  c as h,
  j as A,
  n as _,
  f as p,
} from "./chunks/format-Cenk5p6T.js";
try {
  let e =
      typeof window < "u"
        ? window
        : typeof global < "u"
          ? global
          : typeof globalThis < "u"
            ? globalThis
            : typeof self < "u"
              ? self
              : {},
    t = new e.Error().stack;
  t &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[t] = "a77cc3cb-377b-4cec-9c97-315277254fcd"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-a77cc3cb-377b-4cec-9c97-315277254fcd"));
} catch {}
function U(e) {
  return e == null || typeof e == "function" ? { main: e } : e;
}
const x = async () => {
    var s;
    const e = await u.get(),
      t = (s = e.subscription) == null ? void 0 : s.license_key;
    if (!t) return;
    let a = null,
      i = null;
    try {
      const d = await v.getSubscription(t);
      ((i = d.subscription), (a = d.product));
    } catch (d) {
      c(d);
      return;
    }
    if (!i) {
      c(new Error("Subscription not found"), { data: { licenseKey: t } });
      return;
    }
    if (!a) {
      c(new Error("Product not found"), { data: { licenseKey: t } });
      return;
    }
    if (!Object.keys(i.devices).includes(e.instanceId)) {
      await u.save({ subscription: null, product: null });
      return;
    }
    await u.save({ subscription: i, product: a });
  },
  P = async (e) => {
    const t = new TextEncoder().encode(e),
      a = await crypto.subtle.digest("SHA-256", t);
    return Array.from(new Uint8Array(a))
      .map((s) => s.toString(16).padStart(2, "0"))
      .join("");
  },
  L = async () => {
    try {
      const e = await o.getUsername();
      if (e) return e;
      const [t, a] = await Promise.all([
        o.getJobsToken(),
        o.getUsernameToken(),
      ]);
      return (t && !a && c(new Error("FAILED_TO_FETCH_USERNAME_TOKEN")), null);
    } catch (e) {
      return (
        !o.isServerError(e) &&
          !o.isNetworkError(e) &&
          !o.isForbiddenError(e) &&
          !o.isRateLimitError(e) &&
          !o.isUnauthenticatedError(e) &&
          c(e),
        null
      );
    }
  },
  F = async () => {
    const e = await L();
    await u.save({ usernameHash: e ? await P(e) : null });
    const t = await u.get();
    await I.sendEvent({
      event: I.Event.DAILY_REPORT,
      params: {
        enabled: t.enabled,
        compactList: t.compactList,
        darkMode: t.darkMode,
        soundVolume: t.soundSettings.volume,
        soundEnabled: t.soundSettings.enabled,
        schedulingEnabled: t.schedulingEnabled,
        usernameHash: t.usernameHash,
      },
    });
  },
  J = (e) => {
    switch (!0) {
      case o.isServerError(e):
        return y.SERVER_ERROR;
      case o.isUnauthenticatedError(e):
        return y.UNAUTHENTICATED;
      case o.isNetworkError(e):
        return y.NETWORK_ERROR;
      case o.isForbiddenError(e):
      case o.isRateLimitError(e):
        return y.FORBIDDEN;
      default:
        return y.OTHER;
    }
  },
  M = async () => {
    const e = H().split("-").shift(),
      t = await u.get();
    if (t.lastCycleStartedAt + 30 * 1e3 > Date.now()) {
      await w.info([
        l.Cycles.FETCH_JOBS,
        e,
        "Another cycle is already running, exiting...",
      ]);
      return;
    }
    if ((await u.save({ lastCycleStartedAt: Date.now() }), !t.enabled)) {
      await Promise.all([
        w.info([l.Cycles.FETCH_JOBS, e, "Extension is disabled, exiting..."]),
        n.action.setBadgeText({ text: "OFF" }),
        n.action.setBadgeBackgroundColor({ color: h.orange }),
      ]);
      return;
    }
    const a = await A.getAll();
    let i = [];
    try {
      i = await o.getJobs(t.feedType);
    } catch (r) {
      const m = J(r);
      (m === y.UNAUTHENTICATED &&
        t.lastCycleError !== y.UNAUTHENTICATED &&
        (await _.show({
          type: "basic",
          iconUrl: "empty-icon.png",
          title: "Your Upwork session has ended.",
          message: "Please login to keep extension working.",
        })),
        await Promise.all([
          w.info([l.Cycles.FETCH_JOBS, e, `${m}, exiting...`]),
          u.save({ lastCycleError: m }),
          m === y.OTHER && !o.shouldIgnoreError(r) && c(r),
          n.action.setBadgeText({ text: "ERR" }),
          n.action.setBadgeBackgroundColor({ color: h.error }),
        ]));
      return;
    }
    a &&
      !Array.isArray(a) &&
      k({ message: "oldBatch is not an array", extra: { oldBatch: a } });
    const s = (Array.isArray(a) ? a : []).map((r) => r.ciphertext),
      d = [
        ...i
          .filter((r) => !s.includes(r.ciphertext))
          .map((r) => ({ ...r, __isSeen: !1 })),
        ...(a ?? []),
      ].slice(0, 50),
      E = d.filter((r) => !r.__isSeen),
      g = E.length,
      T = E.length > 0 && E.some((r) => !s.includes(r.ciphertext));
    if (
      (await Promise.all([
        A.save(d),
        u.save({ lastCycleError: null }),
        n.action.setBadgeText({ text: String(g || "") }),
        n.action.setBadgeBackgroundColor({ color: h.warning }),
        !T && w.info([l.Cycles.FETCH_JOBS, e, "No new jobs, exiting..."]),
      ]),
      !T)
    )
      return;
    const O = new Date().getDay(),
      C = p(new Date(), "HH:mm:ss");
    if (
      t.schedulingEnabled &&
      t.schedules.length > 0 &&
      !t.schedules.find(
        (r) =>
          r.days.includes(O) &&
          p(new Date(r.from), "HH:mm:00") <= C &&
          p(new Date(r.to), "HH:mm:59") >= C,
      )
    )
      return await w.info([
        l.Cycles.FETCH_JOBS,
        e,
        "Outside of working hours, exiting without notifying...",
      ]);
    const [{ created: R, clearedAll: D }] = await Promise.all([
      _.show(
        {
          type: "basic",
          iconUrl: "empty-icon.png",
          title: `You have ${g} new job${g > 1 ? "s" : ""}`,
          message: "Click to apply!",
        },
        t.soundSettings,
      ),
      w.info([l.Cycles.FETCH_JOBS, e, `New counter: ${g}. Notifying...`]),
    ]);
    await w.info([
      l.Cycles.FETCH_JOBS,
      e,
      `created: ${R} / clearedAll: ${D ? "true" : "false"}`,
    ]);
  },
  $ = [
    { cycleName: l.Cycles.FETCH_JOBS, delayInMinutes: 0, periodInMinutes: 1 },
    {
      cycleName: l.Cycles.DAILY_REPORT,
      delayInMinutes: 10 / 60,
      periodInMinutes: 60 * 24,
    },
    {
      cycleName: l.Cycles.CHECK_SUBSCRIPTION,
      delayInMinutes: 10 / 60,
      periodInMinutes: 60,
    },
  ],
  b = async () => {
    const t = (await n.alarms.getAll()).map((a) => a.name);
    await Promise.all(
      $.map(async (a) => {
        t.includes(a.cycleName) ||
          (await n.alarms.create(a.cycleName, {
            delayInMinutes: a.delayInMinutes,
            periodInMinutes: a.periodInMinutes,
          }));
      }),
    );
  },
  j = U({
    type: "module",
    main() {
      (n.action.onClicked.addListener(async () => {
        try {
          await n.tabs.create({ url: "options.html" });
        } catch (e) {
          c(e);
        }
      }),
        n.notifications.onClicked.addListener(async () => {
          try {
            (await n.windows.getCurrent())
              ? await n.tabs.create({ active: !0, url: "options.html" })
              : await n.windows.create({ focused: !0, url: "options.html" });
          } catch {
            await n.windows.create({ focused: !0, url: "options.html" });
          }
        }),
        n.alarms.onAlarm.addListener(async (e) => {
          try {
            switch (e.name) {
              case l.Cycles.FETCH_JOBS:
                return await M();
              case l.Cycles.DAILY_REPORT:
                return await F();
              case l.Cycles.CHECK_SUBSCRIPTION:
                return await x();
            }
          } catch (t) {
            c(t);
          }
        }),
        n.runtime.onInstalled.addListener(async (e) => {
          try {
            ((e.reason === chrome.runtime.OnInstalledReason.INSTALL ||
              e.reason === chrome.runtime.OnInstalledReason.UPDATE) &&
              (await b()),
              e.reason === chrome.runtime.OnInstalledReason.UPDATE &&
                (await u.save((t) =>
                  Object.entries(u.getDefaultState()).reduce(
                    (a, [i, s]) => ({ ...a, [i]: t[i] ?? s }),
                    { ...u.getDefaultState(), lastCycleError: null },
                  ),
                )));
          } catch (t) {
            c(t);
          }
        }),
        n.idle.onStateChanged.addListener(async (e) => {
          try {
            e === "active" && (await b());
          } catch (t) {
            c(t);
          }
        }),
        n.runtime.onStartup.addListener(async () => {
          try {
            await b();
          } catch (e) {
            c(e);
          }
        }),
        n.runtime.onMessage.addListener((e, t, a) => {
          if (S.isGetJobDetailsMessage(e))
            return (
              (async () => {
                try {
                  a([null, await o.getJobDetails(e.jobId)]);
                } catch (s) {
                  (c(s), a([s, null]));
                }
              })(),
              !0
            );
          S.isOpenPageMessage(e) &&
            (async () => {
              const s = await n.windows.getLastFocused();
              try {
                await n.tabs.create({
                  url: e.url,
                  active: !0,
                  windowId: s == null ? void 0 : s.id,
                });
              } catch (d) {
                c(d);
              }
            })();
        }));
    },
  });
function f(e, ...t) {}
const K = {
  debug: (...e) => f(console.debug, ...e),
  log: (...e) => f(console.log, ...e),
  warn: (...e) => f(console.warn, ...e),
  error: (...e) => f(console.error, ...e),
};
let B;
try {
  (N(),
    (B = j.main()),
    B instanceof Promise &&
      console.warn(
        "The background's main() function return a promise, but it must be synchronous",
      ));
} catch (e) {
  throw (K.error("The background crashed on startup!"), e);
}
//# sourceMappingURL=background.js.map
