import {
  j as te,
  l as ne,
  g as re,
  e as A,
  s as _,
  k as ae,
  b as m,
  t as se,
  r as ie,
} from "./_virtual_wxt-plugins-C1xRqpYK.js";
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
    (e._sentryDebugIds[t] = "957690d8-9494-47bc-9b38-7b75c5532161"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-957690d8-9494-47bc-9b38-7b75c5532161"));
} catch {}
const k = te.create({
  adapter: "fetch",
  baseURL: "https://www.uptoolkit.io/api",
});
k.interceptors.response.use(ne.logRequest);
const oe = async (e) => {
    const t = await k.post(
      "/subscription/generate",
      { prompt: e.prompt },
      { responseType: "stream", headers: { "X-License-Key": e.licenseKey } },
    );
    if (!t.data) throw new Error("No data");
    const n = new TextDecoder();
    let r = "";
    for await (const a of t.data) {
      const s = n.decode(a, { stream: !0 });
      r += s;
      let i = 0,
        o = 0;
      for (; o < r.length && ((i = r.indexOf("{", o)), i !== -1); ) {
        let d = 0,
          f = !1;
        for (let u = i; u < r.length; u++)
          if ((r[u] === "{" && d++, r[u] === "}" && d--, d === 0)) {
            ((o = u + 1), (f = !0));
            break;
          }
        if (!f) break;
        const l = r.substring(i, o);
        try {
          const u = JSON.parse(l);
          if (u.choices && u.choices[0] && u.choices[0].delta) {
            const P = u.choices[0].delta.content || "";
            e.onChunk(P);
          } else u.content ? e.onChunk(u.content) : e.onChunk(l);
        } catch (u) {
          (console.error("Error parsing JSON:", u), e.onChunk(l));
        }
      }
      r = r.substring(o);
    }
    r.trim() && e.onChunk(r);
  },
  ce = async () => (await k.get("/subscription/products")).data,
  ue = async (e) =>
    (await k.get("/subscription", { headers: { "X-License-Key": e } })).data,
  de = async (e) =>
    (
      await k.put(
        "/subscription",
        { priceId: e.priceId, devices: e.devices, instanceId: e.instanceId },
        { headers: { "X-License-Key": e.licenseKey } },
      )
    ).data,
  fe = async (e) =>
    (await k.delete("/subscription", { headers: { "X-License-Key": e } })).data,
  le = async (e) =>
    (
      await k.post(
        "/subscription/reactivate",
        {},
        { headers: { "X-License-Key": e } },
      )
    ).data,
  Yt = {
    deactivate: fe,
    getSubscription: ue,
    generateCoverLetter: oe,
    getProducts: ce,
    reactivate: le,
    updateSubscription: de,
  },
  he = 100,
  me = "https://www.google-analytics.com/mp/collect";
var Q = ((e) => (
  (e.PAGE_VIEW = "page_view"),
  (e.JOB_CLICK = "job_click"),
  (e.DAILY_REPORT = "daily_report"),
  (e.DEBUG_MODE_TRIGGERED = "debug_mode_triggered"),
  e
))(Q || {});
const ge = async (e) => {
    const t = "B2L2WvW6Rfmfv38U8Oqv0w",
      n = "G-RSE209TR4Z",
      r = await re.get(),
      a = me;
    try {
      const s = await fetch(`${a}?measurement_id=${n}&api_secret=${t}`, {
        method: "POST",
        body: JSON.stringify({
          client_id: r.instanceId,
          events: [
            {
              name: e.event,
              params: {
                ...e.params,
                extensionVersion: A.version,
                engagement_time_msec: he,
                created_at: Date.now(),
              },
            },
          ],
        }),
      });
      A.debugEnabled;
    } catch {}
  },
  _t = { Event: Q, sendEvent: ge },
  we = "#ff4000",
  ye = "#fc7703",
  be = "#ffffc6",
  Pe = "rgba(255, 255, 12, 0.11)",
  Ct = { error: we, orange: ye, warning: be, warningDark: Pe },
  C = "local:__JOBS",
  p = () => _.getItem(C),
  Oe = async (e) => {
    const t = ae(e) ? e((await p()) ?? []) : e;
    return (await _.setItem(C, t), t);
  },
  ke = (e) => _.watch(C, e),
  Ft = { addEventListener: ke, getAll: p, save: Oe },
  V = (e) =>
    new Promise((t, n) =>
      m.notifications.create(e, (r) =>
        m.runtime.lastError ? n(m.runtime.lastError) : t(r),
      ),
    ),
  J = (e) =>
    new Promise((t, n) =>
      m.notifications.clear(e, (r) =>
        m.runtime.lastError ? n(m.runtime.lastError) : t(r),
      ),
    ),
  U = async () =>
    new Promise((e, t) => {
      m.notifications.getAll(async (n) => {
        if (m.runtime.lastError) return t(m.runtime.lastError);
        try {
          const a = Object.keys(n).map(J),
            s = await Promise.all(a);
          e(s.every(Boolean));
        } catch (r) {
          t(r);
        }
      });
    }),
  $ = async (e) => {
    try {
      await m.offscreen.closeDocument();
    } catch {}
    try {
      await m.offscreen.createDocument({
        justification: "Audio playback",
        url: m.runtime.getURL("offscreen.html"),
        reasons: [m.offscreen.Reason.AUDIO_PLAYBACK],
      });
    } catch {}
    await m.runtime.sendMessage({ volume: e, type: ie.Message.PLAY_SOUND });
  },
  Me = async (e, t = {}) => {
    const n = await U();
    await se.resolveIn(100);
    const r = await V(e);
    return (
      t.enabled && t.volume && (await $(t.volume)),
      { created: r, clearedAll: n }
    );
  },
  Nt = { create: V, clear: J, clearAll: U, playSound: $, show: Me },
  K = 6048e5,
  ve = 864e5,
  qt = 6e4,
  It = 36e5,
  At = 1e3,
  L = Symbol.for("constructDateFrom");
function b(e, t) {
  return typeof e == "function"
    ? e(t)
    : e && typeof e == "object" && L in e
      ? e[L](t)
      : e instanceof Date
        ? new e.constructor(t)
        : new Date(t);
}
function w(e, t) {
  return b(t || e, e);
}
let De = {};
function E() {
  return De;
}
function S(e, t) {
  var o, d, f, l;
  const n = E(),
    r =
      (t == null ? void 0 : t.weekStartsOn) ??
      ((d = (o = t == null ? void 0 : t.locale) == null ? void 0 : o.options) ==
      null
        ? void 0
        : d.weekStartsOn) ??
      n.weekStartsOn ??
      ((l = (f = n.locale) == null ? void 0 : f.options) == null
        ? void 0
        : l.weekStartsOn) ??
      0,
    a = w(e, t == null ? void 0 : t.in),
    s = a.getDay(),
    i = (s < r ? 7 : 0) + s - r;
  return (a.setDate(a.getDate() - i), a.setHours(0, 0, 0, 0), a);
}
function W(e, t) {
  return S(e, { ...t, weekStartsOn: 1 });
}
function z(e, t) {
  const n = w(e, t == null ? void 0 : t.in),
    r = n.getFullYear(),
    a = b(n, 0);
  (a.setFullYear(r + 1, 0, 4), a.setHours(0, 0, 0, 0));
  const s = W(a),
    i = b(n, 0);
  (i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0));
  const o = W(i);
  return n.getTime() >= s.getTime()
    ? r + 1
    : n.getTime() >= o.getTime()
      ? r
      : r - 1;
}
function R(e) {
  const t = w(e),
    n = new Date(
      Date.UTC(
        t.getFullYear(),
        t.getMonth(),
        t.getDate(),
        t.getHours(),
        t.getMinutes(),
        t.getSeconds(),
        t.getMilliseconds(),
      ),
    );
  return (n.setUTCFullYear(t.getFullYear()), +e - +n);
}
function xe(e, ...t) {
  const n = b.bind(
    null,
    t.find((r) => typeof r == "object"),
  );
  return t.map(n);
}
function G(e, t) {
  const n = w(e, t == null ? void 0 : t.in);
  return (n.setHours(0, 0, 0, 0), n);
}
function Se(e, t, n) {
  const [r, a] = xe(n == null ? void 0 : n.in, e, t),
    s = G(r),
    i = G(a),
    o = +s - R(s),
    d = +i - R(i);
  return Math.round((o - d) / ve);
}
function We(e, t) {
  const n = z(e, t),
    r = b(e, 0);
  return (r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), W(r));
}
function Ee(e) {
  return (
    e instanceof Date ||
    (typeof e == "object" &&
      Object.prototype.toString.call(e) === "[object Date]")
  );
}
function Te(e) {
  return !((!Ee(e) && typeof e != "number") || isNaN(+w(e)));
}
function Ye(e, t) {
  const n = w(e, t == null ? void 0 : t.in);
  return (n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n);
}
const _e = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds",
    },
    xSeconds: { one: "1 second", other: "{{count}} seconds" },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes",
    },
    xMinutes: { one: "1 minute", other: "{{count}} minutes" },
    aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
    xHours: { one: "1 hour", other: "{{count}} hours" },
    xDays: { one: "1 day", other: "{{count}} days" },
    aboutXWeeks: { one: "about 1 week", other: "about {{count}} weeks" },
    xWeeks: { one: "1 week", other: "{{count}} weeks" },
    aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
    xMonths: { one: "1 month", other: "{{count}} months" },
    aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
    xYears: { one: "1 year", other: "{{count}} years" },
    overXYears: { one: "over 1 year", other: "over {{count}} years" },
    almostXYears: { one: "almost 1 year", other: "almost {{count}} years" },
  },
  Ce = (e, t, n) => {
    let r;
    const a = _e[e];
    return (
      typeof a == "string"
        ? (r = a)
        : t === 1
          ? (r = a.one)
          : (r = a.other.replace("{{count}}", t.toString())),
      n != null && n.addSuffix
        ? n.comparison && n.comparison > 0
          ? "in " + r
          : r + " ago"
        : r
    );
  };
function Y(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Fe = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy",
  },
  Ne = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a",
  },
  qe = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}",
  },
  Ie = {
    date: Y({ formats: Fe, defaultWidth: "full" }),
    time: Y({ formats: Ne, defaultWidth: "full" }),
    dateTime: Y({ formats: qe, defaultWidth: "full" }),
  },
  Ae = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P",
  },
  Le = (e, t, n, r) => Ae[e];
function D(e) {
  return (t, n) => {
    const r = n != null && n.context ? String(n.context) : "standalone";
    let a;
    if (r === "formatting" && e.formattingValues) {
      const i = e.defaultFormattingWidth || e.defaultWidth,
        o = n != null && n.width ? String(n.width) : i;
      a = e.formattingValues[o] || e.formattingValues[i];
    } else {
      const i = e.defaultWidth,
        o = n != null && n.width ? String(n.width) : e.defaultWidth;
      a = e.values[o] || e.values[i];
    }
    const s = e.argumentCallback ? e.argumentCallback(t) : t;
    return a[s];
  };
}
const Re = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"],
  },
  Ge = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
  },
  Xe = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    wide: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
  He = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  },
  je = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night",
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night",
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night",
    },
  },
  Be = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night",
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night",
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night",
    },
  },
  Qe = (e, t) => {
    const n = Number(e),
      r = n % 100;
    if (r > 20 || r < 10)
      switch (r % 10) {
        case 1:
          return n + "st";
        case 2:
          return n + "nd";
        case 3:
          return n + "rd";
      }
    return n + "th";
  },
  pe = {
    ordinalNumber: Qe,
    era: D({ values: Re, defaultWidth: "wide" }),
    quarter: D({
      values: Ge,
      defaultWidth: "wide",
      argumentCallback: (e) => e - 1,
    }),
    month: D({ values: Xe, defaultWidth: "wide" }),
    day: D({ values: He, defaultWidth: "wide" }),
    dayPeriod: D({
      values: je,
      defaultWidth: "wide",
      formattingValues: Be,
      defaultFormattingWidth: "wide",
    }),
  };
function x(e) {
  return (t, n = {}) => {
    const r = n.width,
      a = (r && e.matchPatterns[r]) || e.matchPatterns[e.defaultMatchWidth],
      s = t.match(a);
    if (!s) return null;
    const i = s[0],
      o = (r && e.parsePatterns[r]) || e.parsePatterns[e.defaultParseWidth],
      d = Array.isArray(o) ? Je(o, (u) => u.test(i)) : Ve(o, (u) => u.test(i));
    let f;
    ((f = e.valueCallback ? e.valueCallback(d) : d),
      (f = n.valueCallback ? n.valueCallback(f) : f));
    const l = t.slice(i.length);
    return { value: f, rest: l };
  };
}
function Ve(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n])) return n;
}
function Je(e, t) {
  for (let n = 0; n < e.length; n++) if (t(e[n])) return n;
}
function Ue(e) {
  return (t, n = {}) => {
    const r = t.match(e.matchPattern);
    if (!r) return null;
    const a = r[0],
      s = t.match(e.parsePattern);
    if (!s) return null;
    let i = e.valueCallback ? e.valueCallback(s[0]) : s[0];
    i = n.valueCallback ? n.valueCallback(i) : i;
    const o = t.slice(a.length);
    return { value: i, rest: o };
  };
}
const $e = /^(\d+)(th|st|nd|rd)?/i,
  Ke = /\d+/i,
  ze = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i,
  },
  Ze = { any: [/^b/i, /^(a|c)/i] },
  et = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i,
  },
  tt = { any: [/1/i, /2/i, /3/i, /4/i] },
  nt = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
  },
  rt = {
    narrow: [
      /^j/i,
      /^f/i,
      /^m/i,
      /^a/i,
      /^m/i,
      /^j/i,
      /^j/i,
      /^a/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i,
    ],
    any: [
      /^ja/i,
      /^f/i,
      /^mar/i,
      /^ap/i,
      /^may/i,
      /^jun/i,
      /^jul/i,
      /^au/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i,
    ],
  },
  at = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
  },
  st = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
  },
  it = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
  },
  ot = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i,
    },
  },
  ct = {
    ordinalNumber: Ue({
      matchPattern: $e,
      parsePattern: Ke,
      valueCallback: (e) => parseInt(e, 10),
    }),
    era: x({
      matchPatterns: ze,
      defaultMatchWidth: "wide",
      parsePatterns: Ze,
      defaultParseWidth: "any",
    }),
    quarter: x({
      matchPatterns: et,
      defaultMatchWidth: "wide",
      parsePatterns: tt,
      defaultParseWidth: "any",
      valueCallback: (e) => e + 1,
    }),
    month: x({
      matchPatterns: nt,
      defaultMatchWidth: "wide",
      parsePatterns: rt,
      defaultParseWidth: "any",
    }),
    day: x({
      matchPatterns: at,
      defaultMatchWidth: "wide",
      parsePatterns: st,
      defaultParseWidth: "any",
    }),
    dayPeriod: x({
      matchPatterns: it,
      defaultMatchWidth: "any",
      parsePatterns: ot,
      defaultParseWidth: "any",
    }),
  },
  ut = {
    code: "en-US",
    formatDistance: Ce,
    formatLong: Ie,
    formatRelative: Le,
    localize: pe,
    match: ct,
    options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
  };
function dt(e, t) {
  const n = w(e, t == null ? void 0 : t.in);
  return Se(n, Ye(n)) + 1;
}
function ft(e, t) {
  const n = w(e, t == null ? void 0 : t.in),
    r = +W(n) - +We(n);
  return Math.round(r / K) + 1;
}
function Z(e, t) {
  var l, u, P, v;
  const n = w(e, t == null ? void 0 : t.in),
    r = n.getFullYear(),
    a = E(),
    s =
      (t == null ? void 0 : t.firstWeekContainsDate) ??
      ((u = (l = t == null ? void 0 : t.locale) == null ? void 0 : l.options) ==
      null
        ? void 0
        : u.firstWeekContainsDate) ??
      a.firstWeekContainsDate ??
      ((v = (P = a.locale) == null ? void 0 : P.options) == null
        ? void 0
        : v.firstWeekContainsDate) ??
      1,
    i = b((t == null ? void 0 : t.in) || e, 0);
  (i.setFullYear(r + 1, 0, s), i.setHours(0, 0, 0, 0));
  const o = S(i, t),
    d = b((t == null ? void 0 : t.in) || e, 0);
  (d.setFullYear(r, 0, s), d.setHours(0, 0, 0, 0));
  const f = S(d, t);
  return +n >= +o ? r + 1 : +n >= +f ? r : r - 1;
}
function lt(e, t) {
  var o, d, f, l;
  const n = E(),
    r =
      (t == null ? void 0 : t.firstWeekContainsDate) ??
      ((d = (o = t == null ? void 0 : t.locale) == null ? void 0 : o.options) ==
      null
        ? void 0
        : d.firstWeekContainsDate) ??
      n.firstWeekContainsDate ??
      ((l = (f = n.locale) == null ? void 0 : f.options) == null
        ? void 0
        : l.firstWeekContainsDate) ??
      1,
    a = Z(e, t),
    s = b((t == null ? void 0 : t.in) || e, 0);
  return (s.setFullYear(a, 0, r), s.setHours(0, 0, 0, 0), S(s, t));
}
function ht(e, t) {
  const n = w(e, t == null ? void 0 : t.in),
    r = +S(n, t) - +lt(n, t);
  return Math.round(r / K) + 1;
}
function c(e, t) {
  const n = e < 0 ? "-" : "",
    r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const y = {
    y(e, t) {
      const n = e.getFullYear(),
        r = n > 0 ? n : 1 - n;
      return c(t === "yy" ? r % 100 : r, t.length);
    },
    M(e, t) {
      const n = e.getMonth();
      return t === "M" ? String(n + 1) : c(n + 1, 2);
    },
    d(e, t) {
      return c(e.getDate(), t.length);
    },
    a(e, t) {
      const n = e.getHours() / 12 >= 1 ? "pm" : "am";
      switch (t) {
        case "a":
        case "aa":
          return n.toUpperCase();
        case "aaa":
          return n;
        case "aaaaa":
          return n[0];
        case "aaaa":
        default:
          return n === "am" ? "a.m." : "p.m.";
      }
    },
    h(e, t) {
      return c(e.getHours() % 12 || 12, t.length);
    },
    H(e, t) {
      return c(e.getHours(), t.length);
    },
    m(e, t) {
      return c(e.getMinutes(), t.length);
    },
    s(e, t) {
      return c(e.getSeconds(), t.length);
    },
    S(e, t) {
      const n = t.length,
        r = e.getMilliseconds(),
        a = Math.trunc(r * Math.pow(10, n - 3));
      return c(a, t.length);
    },
  },
  M = {
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  X = {
    G: function (e, t, n) {
      const r = e.getFullYear() > 0 ? 1 : 0;
      switch (t) {
        case "G":
        case "GG":
        case "GGG":
          return n.era(r, { width: "abbreviated" });
        case "GGGGG":
          return n.era(r, { width: "narrow" });
        case "GGGG":
        default:
          return n.era(r, { width: "wide" });
      }
    },
    y: function (e, t, n) {
      if (t === "yo") {
        const r = e.getFullYear(),
          a = r > 0 ? r : 1 - r;
        return n.ordinalNumber(a, { unit: "year" });
      }
      return y.y(e, t);
    },
    Y: function (e, t, n, r) {
      const a = Z(e, r),
        s = a > 0 ? a : 1 - a;
      if (t === "YY") {
        const i = s % 100;
        return c(i, 2);
      }
      return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : c(s, t.length);
    },
    R: function (e, t) {
      const n = z(e);
      return c(n, t.length);
    },
    u: function (e, t) {
      const n = e.getFullYear();
      return c(n, t.length);
    },
    Q: function (e, t, n) {
      const r = Math.ceil((e.getMonth() + 1) / 3);
      switch (t) {
        case "Q":
          return String(r);
        case "QQ":
          return c(r, 2);
        case "Qo":
          return n.ordinalNumber(r, { unit: "quarter" });
        case "QQQ":
          return n.quarter(r, { width: "abbreviated", context: "formatting" });
        case "QQQQQ":
          return n.quarter(r, { width: "narrow", context: "formatting" });
        case "QQQQ":
        default:
          return n.quarter(r, { width: "wide", context: "formatting" });
      }
    },
    q: function (e, t, n) {
      const r = Math.ceil((e.getMonth() + 1) / 3);
      switch (t) {
        case "q":
          return String(r);
        case "qq":
          return c(r, 2);
        case "qo":
          return n.ordinalNumber(r, { unit: "quarter" });
        case "qqq":
          return n.quarter(r, { width: "abbreviated", context: "standalone" });
        case "qqqqq":
          return n.quarter(r, { width: "narrow", context: "standalone" });
        case "qqqq":
        default:
          return n.quarter(r, { width: "wide", context: "standalone" });
      }
    },
    M: function (e, t, n) {
      const r = e.getMonth();
      switch (t) {
        case "M":
        case "MM":
          return y.M(e, t);
        case "Mo":
          return n.ordinalNumber(r + 1, { unit: "month" });
        case "MMM":
          return n.month(r, { width: "abbreviated", context: "formatting" });
        case "MMMMM":
          return n.month(r, { width: "narrow", context: "formatting" });
        case "MMMM":
        default:
          return n.month(r, { width: "wide", context: "formatting" });
      }
    },
    L: function (e, t, n) {
      const r = e.getMonth();
      switch (t) {
        case "L":
          return String(r + 1);
        case "LL":
          return c(r + 1, 2);
        case "Lo":
          return n.ordinalNumber(r + 1, { unit: "month" });
        case "LLL":
          return n.month(r, { width: "abbreviated", context: "standalone" });
        case "LLLLL":
          return n.month(r, { width: "narrow", context: "standalone" });
        case "LLLL":
        default:
          return n.month(r, { width: "wide", context: "standalone" });
      }
    },
    w: function (e, t, n, r) {
      const a = ht(e, r);
      return t === "wo" ? n.ordinalNumber(a, { unit: "week" }) : c(a, t.length);
    },
    I: function (e, t, n) {
      const r = ft(e);
      return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : c(r, t.length);
    },
    d: function (e, t, n) {
      return t === "do"
        ? n.ordinalNumber(e.getDate(), { unit: "date" })
        : y.d(e, t);
    },
    D: function (e, t, n) {
      const r = dt(e);
      return t === "Do"
        ? n.ordinalNumber(r, { unit: "dayOfYear" })
        : c(r, t.length);
    },
    E: function (e, t, n) {
      const r = e.getDay();
      switch (t) {
        case "E":
        case "EE":
        case "EEE":
          return n.day(r, { width: "abbreviated", context: "formatting" });
        case "EEEEE":
          return n.day(r, { width: "narrow", context: "formatting" });
        case "EEEEEE":
          return n.day(r, { width: "short", context: "formatting" });
        case "EEEE":
        default:
          return n.day(r, { width: "wide", context: "formatting" });
      }
    },
    e: function (e, t, n, r) {
      const a = e.getDay(),
        s = (a - r.weekStartsOn + 8) % 7 || 7;
      switch (t) {
        case "e":
          return String(s);
        case "ee":
          return c(s, 2);
        case "eo":
          return n.ordinalNumber(s, { unit: "day" });
        case "eee":
          return n.day(a, { width: "abbreviated", context: "formatting" });
        case "eeeee":
          return n.day(a, { width: "narrow", context: "formatting" });
        case "eeeeee":
          return n.day(a, { width: "short", context: "formatting" });
        case "eeee":
        default:
          return n.day(a, { width: "wide", context: "formatting" });
      }
    },
    c: function (e, t, n, r) {
      const a = e.getDay(),
        s = (a - r.weekStartsOn + 8) % 7 || 7;
      switch (t) {
        case "c":
          return String(s);
        case "cc":
          return c(s, t.length);
        case "co":
          return n.ordinalNumber(s, { unit: "day" });
        case "ccc":
          return n.day(a, { width: "abbreviated", context: "standalone" });
        case "ccccc":
          return n.day(a, { width: "narrow", context: "standalone" });
        case "cccccc":
          return n.day(a, { width: "short", context: "standalone" });
        case "cccc":
        default:
          return n.day(a, { width: "wide", context: "standalone" });
      }
    },
    i: function (e, t, n) {
      const r = e.getDay(),
        a = r === 0 ? 7 : r;
      switch (t) {
        case "i":
          return String(a);
        case "ii":
          return c(a, t.length);
        case "io":
          return n.ordinalNumber(a, { unit: "day" });
        case "iii":
          return n.day(r, { width: "abbreviated", context: "formatting" });
        case "iiiii":
          return n.day(r, { width: "narrow", context: "formatting" });
        case "iiiiii":
          return n.day(r, { width: "short", context: "formatting" });
        case "iiii":
        default:
          return n.day(r, { width: "wide", context: "formatting" });
      }
    },
    a: function (e, t, n) {
      const a = e.getHours() / 12 >= 1 ? "pm" : "am";
      switch (t) {
        case "a":
        case "aa":
          return n.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting",
          });
        case "aaa":
          return n
            .dayPeriod(a, { width: "abbreviated", context: "formatting" })
            .toLowerCase();
        case "aaaaa":
          return n.dayPeriod(a, { width: "narrow", context: "formatting" });
        case "aaaa":
        default:
          return n.dayPeriod(a, { width: "wide", context: "formatting" });
      }
    },
    b: function (e, t, n) {
      const r = e.getHours();
      let a;
      switch (
        (r === 12
          ? (a = M.noon)
          : r === 0
            ? (a = M.midnight)
            : (a = r / 12 >= 1 ? "pm" : "am"),
        t)
      ) {
        case "b":
        case "bb":
          return n.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting",
          });
        case "bbb":
          return n
            .dayPeriod(a, { width: "abbreviated", context: "formatting" })
            .toLowerCase();
        case "bbbbb":
          return n.dayPeriod(a, { width: "narrow", context: "formatting" });
        case "bbbb":
        default:
          return n.dayPeriod(a, { width: "wide", context: "formatting" });
      }
    },
    B: function (e, t, n) {
      const r = e.getHours();
      let a;
      switch (
        (r >= 17
          ? (a = M.evening)
          : r >= 12
            ? (a = M.afternoon)
            : r >= 4
              ? (a = M.morning)
              : (a = M.night),
        t)
      ) {
        case "B":
        case "BB":
        case "BBB":
          return n.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting",
          });
        case "BBBBB":
          return n.dayPeriod(a, { width: "narrow", context: "formatting" });
        case "BBBB":
        default:
          return n.dayPeriod(a, { width: "wide", context: "formatting" });
      }
    },
    h: function (e, t, n) {
      if (t === "ho") {
        let r = e.getHours() % 12;
        return (r === 0 && (r = 12), n.ordinalNumber(r, { unit: "hour" }));
      }
      return y.h(e, t);
    },
    H: function (e, t, n) {
      return t === "Ho"
        ? n.ordinalNumber(e.getHours(), { unit: "hour" })
        : y.H(e, t);
    },
    K: function (e, t, n) {
      const r = e.getHours() % 12;
      return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : c(r, t.length);
    },
    k: function (e, t, n) {
      let r = e.getHours();
      return (
        r === 0 && (r = 24),
        t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : c(r, t.length)
      );
    },
    m: function (e, t, n) {
      return t === "mo"
        ? n.ordinalNumber(e.getMinutes(), { unit: "minute" })
        : y.m(e, t);
    },
    s: function (e, t, n) {
      return t === "so"
        ? n.ordinalNumber(e.getSeconds(), { unit: "second" })
        : y.s(e, t);
    },
    S: function (e, t) {
      return y.S(e, t);
    },
    X: function (e, t, n) {
      const r = e.getTimezoneOffset();
      if (r === 0) return "Z";
      switch (t) {
        case "X":
          return j(r);
        case "XXXX":
        case "XX":
          return O(r);
        case "XXXXX":
        case "XXX":
        default:
          return O(r, ":");
      }
    },
    x: function (e, t, n) {
      const r = e.getTimezoneOffset();
      switch (t) {
        case "x":
          return j(r);
        case "xxxx":
        case "xx":
          return O(r);
        case "xxxxx":
        case "xxx":
        default:
          return O(r, ":");
      }
    },
    O: function (e, t, n) {
      const r = e.getTimezoneOffset();
      switch (t) {
        case "O":
        case "OO":
        case "OOO":
          return "GMT" + H(r, ":");
        case "OOOO":
        default:
          return "GMT" + O(r, ":");
      }
    },
    z: function (e, t, n) {
      const r = e.getTimezoneOffset();
      switch (t) {
        case "z":
        case "zz":
        case "zzz":
          return "GMT" + H(r, ":");
        case "zzzz":
        default:
          return "GMT" + O(r, ":");
      }
    },
    t: function (e, t, n) {
      const r = Math.trunc(+e / 1e3);
      return c(r, t.length);
    },
    T: function (e, t, n) {
      return c(+e, t.length);
    },
  };
function H(e, t = "") {
  const n = e > 0 ? "-" : "+",
    r = Math.abs(e),
    a = Math.trunc(r / 60),
    s = r % 60;
  return s === 0 ? n + String(a) : n + String(a) + t + c(s, 2);
}
function j(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + c(Math.abs(e) / 60, 2) : O(e, t);
}
function O(e, t = "") {
  const n = e > 0 ? "-" : "+",
    r = Math.abs(e),
    a = c(Math.trunc(r / 60), 2),
    s = c(r % 60, 2);
  return n + a + t + s;
}
const B = (e, t) => {
    switch (e) {
      case "P":
        return t.date({ width: "short" });
      case "PP":
        return t.date({ width: "medium" });
      case "PPP":
        return t.date({ width: "long" });
      case "PPPP":
      default:
        return t.date({ width: "full" });
    }
  },
  ee = (e, t) => {
    switch (e) {
      case "p":
        return t.time({ width: "short" });
      case "pp":
        return t.time({ width: "medium" });
      case "ppp":
        return t.time({ width: "long" });
      case "pppp":
      default:
        return t.time({ width: "full" });
    }
  },
  mt = (e, t) => {
    const n = e.match(/(P+)(p+)?/) || [],
      r = n[1],
      a = n[2];
    if (!a) return B(e, t);
    let s;
    switch (r) {
      case "P":
        s = t.dateTime({ width: "short" });
        break;
      case "PP":
        s = t.dateTime({ width: "medium" });
        break;
      case "PPP":
        s = t.dateTime({ width: "long" });
        break;
      case "PPPP":
      default:
        s = t.dateTime({ width: "full" });
        break;
    }
    return s.replace("{{date}}", B(r, t)).replace("{{time}}", ee(a, t));
  },
  gt = { p: ee, P: mt },
  wt = /^D+$/,
  yt = /^Y+$/,
  bt = ["D", "DD", "YY", "YYYY"];
function Pt(e) {
  return wt.test(e);
}
function Ot(e) {
  return yt.test(e);
}
function kt(e, t, n) {
  const r = Mt(e, t, n);
  if ((console.warn(r), bt.includes(e))) throw new RangeError(r);
}
function Mt(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const vt = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
  Dt = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
  xt = /^'([^]*?)'?$/,
  St = /''/g,
  Wt = /[a-zA-Z]/;
function Lt(e, t, n) {
  var l, u, P, v, F, N, q, I;
  const r = E(),
    a = (n == null ? void 0 : n.locale) ?? r.locale ?? ut,
    s =
      (n == null ? void 0 : n.firstWeekContainsDate) ??
      ((u = (l = n == null ? void 0 : n.locale) == null ? void 0 : l.options) ==
      null
        ? void 0
        : u.firstWeekContainsDate) ??
      r.firstWeekContainsDate ??
      ((v = (P = r.locale) == null ? void 0 : P.options) == null
        ? void 0
        : v.firstWeekContainsDate) ??
      1,
    i =
      (n == null ? void 0 : n.weekStartsOn) ??
      ((N = (F = n == null ? void 0 : n.locale) == null ? void 0 : F.options) ==
      null
        ? void 0
        : N.weekStartsOn) ??
      r.weekStartsOn ??
      ((I = (q = r.locale) == null ? void 0 : q.options) == null
        ? void 0
        : I.weekStartsOn) ??
      0,
    o = w(e, n == null ? void 0 : n.in);
  if (!Te(o)) throw new RangeError("Invalid time value");
  let d = t
    .match(Dt)
    .map((g) => {
      const h = g[0];
      if (h === "p" || h === "P") {
        const T = gt[h];
        return T(g, a.formatLong);
      }
      return g;
    })
    .join("")
    .match(vt)
    .map((g) => {
      if (g === "''") return { isToken: !1, value: "'" };
      const h = g[0];
      if (h === "'") return { isToken: !1, value: Et(g) };
      if (X[h]) return { isToken: !0, value: g };
      if (h.match(Wt))
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" +
            h +
            "`",
        );
      return { isToken: !1, value: g };
    });
  a.localize.preprocessor && (d = a.localize.preprocessor(o, d));
  const f = { firstWeekContainsDate: s, weekStartsOn: i, locale: a };
  return d
    .map((g) => {
      if (!g.isToken) return g.value;
      const h = g.value;
      ((!(n != null && n.useAdditionalWeekYearTokens) && Ot(h)) ||
        (!(n != null && n.useAdditionalDayOfYearTokens) && Pt(h))) &&
        kt(h, t, String(e));
      const T = X[h[0]];
      return T(o, h, a.localize, f);
    })
    .join("");
}
function Et(e) {
  const t = e.match(xt);
  return t ? t[1].replace(St, "'") : e;
}
export {
  Ye as A,
  _t as a,
  b,
  Ct as c,
  qt as d,
  xe as e,
  Lt as f,
  E as g,
  At as h,
  Z as i,
  Ft as j,
  S as k,
  W as l,
  It as m,
  Nt as n,
  ht as o,
  ft as p,
  R as q,
  ut as r,
  G as s,
  w as t,
  Yt as u,
  gt as v,
  Ot as w,
  kt as x,
  Pt as y,
  Te as z,
};
//# sourceMappingURL=format-Cenk5p6T.js.map
