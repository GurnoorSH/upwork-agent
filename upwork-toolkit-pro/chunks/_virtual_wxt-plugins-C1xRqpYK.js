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
    (e._sentryDebugIds[t] = "85867158-e925-4340-ae1d-184ca3e0722e"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-85867158-e925-4340-ae1d-184ca3e0722e"));
} catch {}
var ns, rs;
const ko =
    (rs = (ns = globalThis.browser) == null ? void 0 : ns.runtime) != null &&
    rs.id
      ? globalThis.browser
      : globalThis.chrome,
  Wt = ko;
{
  let e =
    typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof globalThis < "u"
          ? globalThis
          : typeof self < "u"
            ? self
            : {};
  e.SENTRY_RELEASE = { id: "d70ede9f393dd28d2ebe4bb1717e93bc18e390ed" };
}
var Me =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
function En(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Rt, Bn;
function is() {
  if (Bn) return Rt;
  Bn = 1;
  function e(t) {
    var n = typeof t;
    return t != null && (n == "object" || n == "function");
  }
  return ((Rt = e), Rt);
}
var No = is();
const Co = En(No);
var ge = ((e) => (
  (e.FORBIDDEN = "FORBIDDEN"),
  (e.NETWORK_ERROR = "NETWORK_ERROR"),
  (e.OTHER = "OTHER"),
  (e.SERVER_ERROR = "SERVER_ERROR"),
  (e.UNAUTHENTICATED = "UNAUTHENTICATED"),
  e
))(ge || {});
const Do = (e) =>
    e != null && e.message ? e.message : Co(e) ? JSON.stringify(e) : String(e),
  vd = { getErrorMessage: Do };
var qn = Object.prototype.hasOwnProperty;
function Kt(e, t) {
  var n, r;
  if (e === t) return !0;
  if (e && t && (n = e.constructor) === t.constructor) {
    if (n === Date) return e.getTime() === t.getTime();
    if (n === RegExp) return e.toString() === t.toString();
    if (n === Array) {
      if ((r = e.length) === t.length) for (; r-- && Kt(e[r], t[r]); );
      return r === -1;
    }
    if (!n || typeof e == "object") {
      r = 0;
      for (n in e)
        if (
          (qn.call(e, n) && ++r && !qn.call(t, n)) ||
          !(n in t) ||
          !Kt(e[n], t[n])
        )
          return !1;
      return Object.keys(t).length === r;
    }
  }
  return e !== e && t !== t;
}
const Po = new Error("request for lock canceled");
var Lo = function (e, t, n, r) {
  function s(o) {
    return o instanceof n
      ? o
      : new n(function (i) {
          i(o);
        });
  }
  return new (n || (n = Promise))(function (o, i) {
    function a(l) {
      try {
        u(r.next(l));
      } catch (d) {
        i(d);
      }
    }
    function c(l) {
      try {
        u(r.throw(l));
      } catch (d) {
        i(d);
      }
    }
    function u(l) {
      l.done ? o(l.value) : s(l.value).then(a, c);
    }
    u((r = r.apply(e, t || [])).next());
  });
};
class Fo {
  constructor(t, n = Po) {
    ((this._value = t),
      (this._cancelError = n),
      (this._queue = []),
      (this._weightedWaiters = []));
  }
  acquire(t = 1, n = 0) {
    if (t <= 0) throw new Error(`invalid weight ${t}: must be positive`);
    return new Promise((r, s) => {
      const o = { resolve: r, reject: s, weight: t, priority: n },
        i = as(this._queue, (a) => n <= a.priority);
      i === -1 && t <= this._value
        ? this._dispatchItem(o)
        : this._queue.splice(i + 1, 0, o);
    });
  }
  runExclusive(t) {
    return Lo(this, arguments, void 0, function* (n, r = 1, s = 0) {
      const [o, i] = yield this.acquire(r, s);
      try {
        return yield n(o);
      } finally {
        i();
      }
    });
  }
  waitForUnlock(t = 1, n = 0) {
    if (t <= 0) throw new Error(`invalid weight ${t}: must be positive`);
    return this._couldLockImmediately(t, n)
      ? Promise.resolve()
      : new Promise((r) => {
          (this._weightedWaiters[t - 1] || (this._weightedWaiters[t - 1] = []),
            Mo(this._weightedWaiters[t - 1], { resolve: r, priority: n }));
        });
  }
  isLocked() {
    return this._value <= 0;
  }
  getValue() {
    return this._value;
  }
  setValue(t) {
    ((this._value = t), this._dispatchQueue());
  }
  release(t = 1) {
    if (t <= 0) throw new Error(`invalid weight ${t}: must be positive`);
    ((this._value += t), this._dispatchQueue());
  }
  cancel() {
    (this._queue.forEach((t) => t.reject(this._cancelError)),
      (this._queue = []));
  }
  _dispatchQueue() {
    for (
      this._drainUnlockWaiters();
      this._queue.length > 0 && this._queue[0].weight <= this._value;
    )
      (this._dispatchItem(this._queue.shift()), this._drainUnlockWaiters());
  }
  _dispatchItem(t) {
    const n = this._value;
    ((this._value -= t.weight), t.resolve([n, this._newReleaser(t.weight)]));
  }
  _newReleaser(t) {
    let n = !1;
    return () => {
      n || ((n = !0), this.release(t));
    };
  }
  _drainUnlockWaiters() {
    if (this._queue.length === 0)
      for (let t = this._value; t > 0; t--) {
        const n = this._weightedWaiters[t - 1];
        n &&
          (n.forEach((r) => r.resolve()), (this._weightedWaiters[t - 1] = []));
      }
    else {
      const t = this._queue[0].priority;
      for (let n = this._value; n > 0; n--) {
        const r = this._weightedWaiters[n - 1];
        if (!r) continue;
        const s = r.findIndex((o) => o.priority <= t);
        (s === -1 ? r : r.splice(0, s)).forEach((o) => o.resolve());
      }
    }
  }
  _couldLockImmediately(t, n) {
    return (
      (this._queue.length === 0 || this._queue[0].priority < n) &&
      t <= this._value
    );
  }
}
function Mo(e, t) {
  const n = as(e, (r) => t.priority <= r.priority);
  e.splice(n + 1, 0, t);
}
function as(e, t) {
  for (let n = e.length - 1; n >= 0; n--) if (t(e[n])) return n;
  return -1;
}
var Uo = function (e, t, n, r) {
  function s(o) {
    return o instanceof n
      ? o
      : new n(function (i) {
          i(o);
        });
  }
  return new (n || (n = Promise))(function (o, i) {
    function a(l) {
      try {
        u(r.next(l));
      } catch (d) {
        i(d);
      }
    }
    function c(l) {
      try {
        u(r.throw(l));
      } catch (d) {
        i(d);
      }
    }
    function u(l) {
      l.done ? o(l.value) : s(l.value).then(a, c);
    }
    u((r = r.apply(e, t || [])).next());
  });
};
class $o {
  constructor(t) {
    this._semaphore = new Fo(1, t);
  }
  acquire() {
    return Uo(this, arguments, void 0, function* (t = 0) {
      const [, n] = yield this._semaphore.acquire(1, t);
      return n;
    });
  }
  runExclusive(t, n = 0) {
    return this._semaphore.runExclusive(() => t(), 1, n);
  }
  isLocked() {
    return this._semaphore.isLocked();
  }
  waitForUnlock(t = 0) {
    return this._semaphore.waitForUnlock(1, t);
  }
  release() {
    this._semaphore.isLocked() && this._semaphore.release();
  }
  cancel() {
    return this._semaphore.cancel();
  }
}
var ss, os;
const Ge =
    ((os = (ss = globalThis.browser) == null ? void 0 : ss.runtime) == null
      ? void 0
      : os.id) == null
      ? globalThis.chrome
      : globalThis.browser,
  oe = jo();
function jo() {
  const e = {
      local: Ue("local"),
      session: Ue("session"),
      sync: Ue("sync"),
      managed: Ue("managed"),
    },
    t = (h) => {
      const f = e[h];
      if (f == null) {
        const m = Object.keys(e).join(", ");
        throw Error(`Invalid area "${h}". Options: ${m}`);
      }
      return f;
    },
    n = (h) => {
      const f = h.indexOf(":"),
        m = h.substring(0, f),
        g = h.substring(f + 1);
      if (g == null)
        throw Error(
          `Storage key should be in the form of "area:key", but received "${h}"`,
        );
      return { driverArea: m, driverKey: g, driver: t(m) };
    },
    r = (h) => h + "$",
    s = (h, f) => {
      const m = { ...h };
      return (
        Object.entries(f).forEach(([g, _]) => {
          _ == null ? delete m[g] : (m[g] = _);
        }),
        m
      );
    },
    o = (h, f) => h ?? f ?? null,
    i = (h) => (typeof h == "object" && !Array.isArray(h) ? h : {}),
    a = async (h, f, m) => {
      const g = await h.getItem(f);
      return o(
        g,
        (m == null ? void 0 : m.fallback) ??
          (m == null ? void 0 : m.defaultValue),
      );
    },
    c = async (h, f) => {
      const m = r(f),
        g = await h.getItem(m);
      return i(g);
    },
    u = async (h, f, m) => {
      await h.setItem(f, m ?? null);
    },
    l = async (h, f, m) => {
      const g = r(f),
        _ = i(await h.getItem(g));
      await h.setItem(g, s(_, m));
    },
    d = async (h, f, m) => {
      if ((await h.removeItem(f), m != null && m.removeMeta)) {
        const g = r(f);
        await h.removeItem(g);
      }
    },
    E = async (h, f, m) => {
      const g = r(f);
      if (m == null) await h.removeItem(g);
      else {
        const _ = i(await h.getItem(g));
        ([m].flat().forEach((S) => delete _[S]), await h.setItem(g, _));
      }
    },
    y = (h, f, m) => h.watch(f, m);
  return {
    getItem: async (h, f) => {
      const { driver: m, driverKey: g } = n(h);
      return await a(m, g, f);
    },
    getItems: async (h) => {
      const f = new Map(),
        m = new Map(),
        g = [];
      h.forEach((S) => {
        let R, v;
        (typeof S == "string"
          ? (R = S)
          : "getValue" in S
            ? ((R = S.key), (v = { fallback: S.fallback }))
            : ((R = S.key), (v = S.options)),
          g.push(R));
        const { driverArea: C, driverKey: k } = n(R),
          N = f.get(C) ?? [];
        (f.set(C, N.concat(k)), m.set(R, v));
      });
      const _ = new Map();
      return (
        await Promise.all(
          Array.from(f.entries()).map(async ([S, R]) => {
            (await e[S].getItems(R)).forEach((C) => {
              const k = `${S}:${C.key}`,
                N = m.get(k),
                x = o(
                  C.value,
                  (N == null ? void 0 : N.fallback) ??
                    (N == null ? void 0 : N.defaultValue),
                );
              _.set(k, x);
            });
          }),
        ),
        g.map((S) => ({ key: S, value: _.get(S) }))
      );
    },
    getMeta: async (h) => {
      const { driver: f, driverKey: m } = n(h);
      return await c(f, m);
    },
    getMetas: async (h) => {
      const f = h.map((_) => {
          const S = typeof _ == "string" ? _ : _.key,
            { driverArea: R, driverKey: v } = n(S);
          return { key: S, driverArea: R, driverKey: v, driverMetaKey: r(v) };
        }),
        m = f.reduce((_, S) => {
          var R;
          return (
            _[(R = S.driverArea)] ?? (_[R] = []),
            _[S.driverArea].push(S),
            _
          );
        }, {}),
        g = {};
      return (
        await Promise.all(
          Object.entries(m).map(async ([_, S]) => {
            const R = await Ge.storage[_].get(S.map((v) => v.driverMetaKey));
            S.forEach((v) => {
              g[v.key] = R[v.driverMetaKey] ?? {};
            });
          }),
        ),
        f.map((_) => ({ key: _.key, meta: g[_.key] }))
      );
    },
    setItem: async (h, f) => {
      const { driver: m, driverKey: g } = n(h);
      await u(m, g, f);
    },
    setItems: async (h) => {
      const f = {};
      (h.forEach((m) => {
        const { driverArea: g, driverKey: _ } = n(
          "key" in m ? m.key : m.item.key,
        );
        (f[g] ?? (f[g] = []), f[g].push({ key: _, value: m.value }));
      }),
        await Promise.all(
          Object.entries(f).map(async ([m, g]) => {
            await t(m).setItems(g);
          }),
        ));
    },
    setMeta: async (h, f) => {
      const { driver: m, driverKey: g } = n(h);
      await l(m, g, f);
    },
    setMetas: async (h) => {
      const f = {};
      (h.forEach((m) => {
        const { driverArea: g, driverKey: _ } = n(
          "key" in m ? m.key : m.item.key,
        );
        (f[g] ?? (f[g] = []), f[g].push({ key: _, properties: m.meta }));
      }),
        await Promise.all(
          Object.entries(f).map(async ([m, g]) => {
            const _ = t(m),
              S = g.map(({ key: k }) => r(k));
            console.log(m, S);
            const R = await _.getItems(S),
              v = Object.fromEntries(
                R.map(({ key: k, value: N }) => [k, i(N)]),
              ),
              C = g.map(({ key: k, properties: N }) => {
                const x = r(k);
                return { key: x, value: s(v[x] ?? {}, N) };
              });
            await _.setItems(C);
          }),
        ));
    },
    removeItem: async (h, f) => {
      const { driver: m, driverKey: g } = n(h);
      await d(m, g, f);
    },
    removeItems: async (h) => {
      const f = {};
      (h.forEach((m) => {
        let g, _;
        typeof m == "string"
          ? (g = m)
          : "getValue" in m
            ? (g = m.key)
            : "item" in m
              ? ((g = m.item.key), (_ = m.options))
              : ((g = m.key), (_ = m.options));
        const { driverArea: S, driverKey: R } = n(g);
        (f[S] ?? (f[S] = []),
          f[S].push(R),
          _ != null && _.removeMeta && f[S].push(r(R)));
      }),
        await Promise.all(
          Object.entries(f).map(async ([m, g]) => {
            await t(m).removeItems(g);
          }),
        ));
    },
    clear: async (h) => {
      await t(h).clear();
    },
    removeMeta: async (h, f) => {
      const { driver: m, driverKey: g } = n(h);
      await E(m, g, f);
    },
    snapshot: async (h, f) => {
      var _;
      const g = await t(h).snapshot();
      return (
        (_ = f == null ? void 0 : f.excludeKeys) == null ||
          _.forEach((S) => {
            (delete g[S], delete g[r(S)]);
          }),
        g
      );
    },
    restoreSnapshot: async (h, f) => {
      await t(h).restoreSnapshot(f);
    },
    watch: (h, f) => {
      const { driver: m, driverKey: g } = n(h);
      return y(m, g, f);
    },
    unwatch() {
      Object.values(e).forEach((h) => {
        h.unwatch();
      });
    },
    defineItem: (h, f) => {
      const { driver: m, driverKey: g } = n(h),
        { version: _ = 1, migrations: S = {} } = f ?? {};
      if (_ < 1)
        throw Error(
          "Storage item version cannot be less than 1. Initial versions should be set to 1, not 0.",
        );
      const R = async () => {
          var jn;
          const x = r(g),
            [{ value: ee }, { value: he }] = await m.getItems([g, x]);
          if (ee == null) return;
          const me = (he == null ? void 0 : he.v) ?? 1;
          if (me > _)
            throw Error(
              `Version downgrade detected (v${me} -> v${_}) for "${h}"`,
            );
          if (me === _) return;
          console.debug(
            `[@wxt-dev/storage] Running storage migration for ${h}: v${me} -> v${_}`,
          );
          const xo = Array.from({ length: _ - me }, (wt, Tt) => me + Tt + 1);
          let ve = ee;
          for (const wt of xo)
            try {
              ve =
                (await ((jn = S == null ? void 0 : S[wt]) == null
                  ? void 0
                  : jn.call(S, ve))) ?? ve;
            } catch (Tt) {
              throw new Bo(h, wt, { cause: Tt });
            }
          (await m.setItems([
            { key: g, value: ve },
            { key: x, value: { ...he, v: _ } },
          ]),
            console.debug(
              `[@wxt-dev/storage] Storage migration completed for ${h} v${_}`,
              { migratedValue: ve },
            ));
        },
        v =
          (f == null ? void 0 : f.migrations) == null
            ? Promise.resolve()
            : R().catch((x) => {
                console.error(
                  `[@wxt-dev/storage] Migration failed for ${h}`,
                  x,
                );
              }),
        C = new $o(),
        k = () =>
          (f == null ? void 0 : f.fallback) ??
          (f == null ? void 0 : f.defaultValue) ??
          null,
        N = () =>
          C.runExclusive(async () => {
            const x = await m.getItem(g);
            if (x != null || (f == null ? void 0 : f.init) == null) return x;
            const ee = await f.init();
            return (await m.setItem(g, ee), ee);
          });
      return (
        v.then(N),
        {
          key: h,
          get defaultValue() {
            return k();
          },
          get fallback() {
            return k();
          },
          getValue: async () => (
            await v,
            f != null && f.init ? await N() : await a(m, g, f)
          ),
          getMeta: async () => (await v, await c(m, g)),
          setValue: async (x) => (await v, await u(m, g, x)),
          setMeta: async (x) => (await v, await l(m, g, x)),
          removeValue: async (x) => (await v, await d(m, g, x)),
          removeMeta: async (x) => (await v, await E(m, g, x)),
          watch: (x) => y(m, g, (ee, he) => x(ee ?? k(), he ?? k())),
          migrate: R,
        }
      );
    },
  };
}
function Ue(e) {
  const t = () => {
      if (Ge.runtime == null)
        throw Error(
          [
            "'wxt/storage' must be loaded in a web extension environment",
            `
 - If thrown during a build, see https://github.com/wxt-dev/wxt/issues/371`,
            ` - If thrown during tests, mock 'wxt/browser' correctly. See https://wxt.dev/guide/go-further/testing.html
`,
          ].join(`
`),
        );
      if (Ge.storage == null)
        throw Error(
          "You must add the 'storage' permission to your manifest to use 'wxt/storage'",
        );
      const r = Ge.storage[e];
      if (r == null) throw Error(`"browser.storage.${e}" is undefined`);
      return r;
    },
    n = new Set();
  return {
    getItem: async (r) => (await t().get(r))[r],
    getItems: async (r) => {
      const s = await t().get(r);
      return r.map((o) => ({ key: o, value: s[o] ?? null }));
    },
    setItem: async (r, s) => {
      s == null ? await t().remove(r) : await t().set({ [r]: s });
    },
    setItems: async (r) => {
      const s = r.reduce((o, { key: i, value: a }) => ((o[i] = a), o), {});
      await t().set(s);
    },
    removeItem: async (r) => {
      await t().remove(r);
    },
    removeItems: async (r) => {
      await t().remove(r);
    },
    clear: async () => {
      await t().clear();
    },
    snapshot: async () => await t().get(),
    restoreSnapshot: async (r) => {
      await t().set(r);
    },
    watch(r, s) {
      const o = (i) => {
        const a = i[r];
        a != null &&
          (Kt(a.newValue, a.oldValue) ||
            s(a.newValue ?? null, a.oldValue ?? null));
      };
      return (
        t().onChanged.addListener(o),
        n.add(o),
        () => {
          (t().onChanged.removeListener(o), n.delete(o));
        }
      );
    },
    unwatch() {
      (n.forEach((r) => {
        t().onChanged.removeListener(r);
      }),
        n.clear());
    },
  };
}
class Bo extends Error {
  constructor(t, n, r) {
    (super(`v${n} migration failed for "${t}"`, r),
      (this.key = t),
      (this.version = n));
  }
}
const D = [];
for (let e = 0; e < 256; ++e) D.push((e + 256).toString(16).slice(1));
function qo(e, t = 0) {
  return (
    D[e[t + 0]] +
    D[e[t + 1]] +
    D[e[t + 2]] +
    D[e[t + 3]] +
    "-" +
    D[e[t + 4]] +
    D[e[t + 5]] +
    "-" +
    D[e[t + 6]] +
    D[e[t + 7]] +
    "-" +
    D[e[t + 8]] +
    D[e[t + 9]] +
    "-" +
    D[e[t + 10]] +
    D[e[t + 11]] +
    D[e[t + 12]] +
    D[e[t + 13]] +
    D[e[t + 14]] +
    D[e[t + 15]]
  ).toLowerCase();
}
let vt;
const Ho = new Uint8Array(16);
function Vo() {
  if (!vt) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported",
      );
    vt = crypto.getRandomValues.bind(crypto);
  }
  return vt(Ho);
}
const Go =
    typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto),
  Hn = { randomUUID: Go };
function cs(e, t, n) {
  var s;
  if (Hn.randomUUID && !e) return Hn.randomUUID();
  e = e || {};
  const r = e.random ?? ((s = e.rng) == null ? void 0 : s.call(e)) ?? Vo();
  if (r.length < 16) throw new Error("Random bytes length must be >= 16");
  return ((r[6] = (r[6] & 15) | 64), (r[8] = (r[8] & 63) | 128), qo(r));
}
const Jo = "1.5.48",
  Wo = { version: Jo },
  Ko = !1,
  zo = Wo.version;
var us = ((e) => (
  (e.FETCH_JOBS = "FETCH_JOBS"),
  (e.DAILY_REPORT = "DAILY_REPORT"),
  (e.CHECK_SUBSCRIPTION = "CHECK_SUBSCRIPTION"),
  e
))(us || {});
const Yo = { Cycles: us, debugEnabled: Ko, version: zo },
  Ze = "local:__LOGS",
  ls = "uptoolkit_logger_response",
  bn = async (e, t) => {
    const n = (r) => ({ id: cs(), type: t, message: r, timestamp: Date.now() });
    await oe.setItem(
      Ze,
      [
        ...((await oe.getItem(Ze)) ?? []),
        n(Array.isArray(e) ? e.join(" ") : e),
      ].slice(-1e3),
    );
  },
  fs = (e) => bn(e, "info"),
  Xo = (e) => bn(e, "warn"),
  Qo = (e) => bn(e, "error"),
  Zo = async () => (await oe.getItem(Ze)) ?? [],
  ei = (e) => oe.watch(Ze, e),
  ti = (e) => {
    var t;
    return (
      (e.status >= 200 && e.status < 300) ||
        fs(
          JSON.stringify({
            [ls]: {
              url: e.config.url,
              queryParams: e.config.params,
              method: (t = e.config.method) == null ? void 0 : t.toUpperCase(),
              status: e.status,
              input: e.config.data,
              output: e.data,
            },
          }),
        ),
      e
    );
  },
  ni = {
    info: fs,
    warn: Xo,
    error: Qo,
    getAll: Zo,
    onChange: ei,
    logRequest: ti,
    LOG_LABEL: ls,
  },
  I = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__,
  re = "9.17.0",
  O = globalThis;
function it() {
  return (at(O), O);
}
function at(e) {
  const t = (e.__SENTRY__ = e.__SENTRY__ || {});
  return ((t.version = t.version || re), (t[re] = t[re] || {}));
}
function ct(e, t, n = O) {
  const r = (n.__SENTRY__ = n.__SENTRY__ || {}),
    s = (r[re] = r[re] || {});
  return s[e] || (s[e] = t());
}
const ds = Object.prototype.toString;
function Sn(e) {
  switch (ds.call(e)) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
    case "[object WebAssembly.Exception]":
      return !0;
    default:
      return X(e, Error);
  }
}
function Se(e, t) {
  return ds.call(e) === `[object ${t}]`;
}
function ps(e) {
  return Se(e, "ErrorEvent");
}
function Vn(e) {
  return Se(e, "DOMError");
}
function ri(e) {
  return Se(e, "DOMException");
}
function K(e) {
  return Se(e, "String");
}
function wn(e) {
  return (
    typeof e == "object" &&
    e !== null &&
    "__sentry_template_string__" in e &&
    "__sentry_template_values__" in e
  );
}
function Tn(e) {
  return (
    e === null || wn(e) || (typeof e != "object" && typeof e != "function")
  );
}
function Ae(e) {
  return Se(e, "Object");
}
function ut(e) {
  return typeof Event < "u" && X(e, Event);
}
function si(e) {
  return typeof Element < "u" && X(e, Element);
}
function oi(e) {
  return Se(e, "RegExp");
}
function lt(e) {
  return !!(e != null && e.then && typeof e.then == "function");
}
function ii(e) {
  return (
    Ae(e) &&
    "nativeEvent" in e &&
    "preventDefault" in e &&
    "stopPropagation" in e
  );
}
function X(e, t) {
  try {
    return e instanceof t;
  } catch {
    return !1;
  }
}
function hs(e) {
  return !!(typeof e == "object" && e !== null && (e.__isVue || e._isVue));
}
function ai(e) {
  return typeof Request < "u" && X(e, Request);
}
const Rn = O,
  ci = 80;
function ms(e, t = {}) {
  if (!e) return "<unknown>";
  try {
    let n = e;
    const r = 5,
      s = [];
    let o = 0,
      i = 0;
    const a = " > ",
      c = a.length;
    let u;
    const l = Array.isArray(t) ? t : t.keyAttrs,
      d = (!Array.isArray(t) && t.maxStringLength) || ci;
    for (
      ;
      n &&
      o++ < r &&
      ((u = ui(n, l)),
      !(u === "html" || (o > 1 && i + s.length * c + u.length >= d)));
    )
      (s.push(u), (i += u.length), (n = n.parentNode));
    return s.reverse().join(a);
  } catch {
    return "<unknown>";
  }
}
function ui(e, t) {
  const n = e,
    r = [];
  if (!(n != null && n.tagName)) return "";
  if (Rn.HTMLElement && n instanceof HTMLElement && n.dataset) {
    if (n.dataset.sentryComponent) return n.dataset.sentryComponent;
    if (n.dataset.sentryElement) return n.dataset.sentryElement;
  }
  r.push(n.tagName.toLowerCase());
  const s =
    t != null && t.length
      ? t.filter((i) => n.getAttribute(i)).map((i) => [i, n.getAttribute(i)])
      : null;
  if (s != null && s.length)
    s.forEach((i) => {
      r.push(`[${i[0]}="${i[1]}"]`);
    });
  else {
    n.id && r.push(`#${n.id}`);
    const i = n.className;
    if (i && K(i)) {
      const a = i.split(/\s+/);
      for (const c of a) r.push(`.${c}`);
    }
  }
  const o = ["aria-label", "type", "name", "title", "alt"];
  for (const i of o) {
    const a = n.getAttribute(i);
    a && r.push(`[${i}="${a}"]`);
  }
  return r.join("");
}
function gs() {
  try {
    return Rn.document.location.href;
  } catch {
    return "";
  }
}
function li(e) {
  if (!Rn.HTMLElement) return null;
  let t = e;
  const n = 5;
  for (let r = 0; r < n; r++) {
    if (!t) return null;
    if (t instanceof HTMLElement) {
      if (t.dataset.sentryComponent) return t.dataset.sentryComponent;
      if (t.dataset.sentryElement) return t.dataset.sentryElement;
    }
    t = t.parentNode;
  }
  return null;
}
const fe = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__,
  fi = "Sentry Logger ",
  zt = ["debug", "info", "warn", "error", "log", "assert", "trace"],
  et = {};
function ft(e) {
  if (!("console" in O)) return e();
  const t = O.console,
    n = {},
    r = Object.keys(et);
  r.forEach((s) => {
    const o = et[s];
    ((n[s] = t[s]), (t[s] = o));
  });
  try {
    return e();
  } finally {
    r.forEach((s) => {
      t[s] = n[s];
    });
  }
}
function di() {
  let e = !1;
  const t = {
    enable: () => {
      e = !0;
    },
    disable: () => {
      e = !1;
    },
    isEnabled: () => e,
  };
  return (
    fe
      ? zt.forEach((n) => {
          t[n] = (...r) => {
            e &&
              ft(() => {
                O.console[n](`${fi}[${n}]:`, ...r);
              });
          };
        })
      : zt.forEach((n) => {
          t[n] = () => {};
        }),
    t
  );
}
const w = ct("logger", di);
function tt(e, t = 0) {
  return typeof e != "string" || t === 0 || e.length <= t
    ? e
    : `${e.slice(0, t)}...`;
}
function Gn(e, t) {
  if (!Array.isArray(e)) return "";
  const n = [];
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    try {
      hs(s) ? n.push("[VueViewModel]") : n.push(String(s));
    } catch {
      n.push("[value cannot be serialized]");
    }
  }
  return n.join(t);
}
function pi(e, t, n = !1) {
  return K(e)
    ? oi(t)
      ? t.test(e)
      : K(t)
        ? n
          ? e === t
          : e.includes(t)
        : !1
    : !1;
}
function dt(e, t = [], n = !1) {
  return t.some((r) => pi(e, r, n));
}
function j(e, t, n) {
  if (!(t in e)) return;
  const r = e[t];
  if (typeof r != "function") return;
  const s = n(r);
  typeof s == "function" && ys(s, r);
  try {
    e[t] = s;
  } catch {
    fe && w.log(`Failed to replace method "${t}" in object`, e);
  }
}
function ie(e, t, n) {
  try {
    Object.defineProperty(e, t, { value: n, writable: !0, configurable: !0 });
  } catch {
    fe && w.log(`Failed to add non-enumerable property "${t}" to object`, e);
  }
}
function ys(e, t) {
  try {
    const n = t.prototype || {};
    ((e.prototype = t.prototype = n), ie(e, "__sentry_original__", t));
  } catch {}
}
function vn(e) {
  return e.__sentry_original__;
}
function _s(e) {
  if (Sn(e))
    return { message: e.message, name: e.name, stack: e.stack, ...Wn(e) };
  if (ut(e)) {
    const t = {
      type: e.type,
      target: Jn(e.target),
      currentTarget: Jn(e.currentTarget),
      ...Wn(e),
    };
    return (
      typeof CustomEvent < "u" && X(e, CustomEvent) && (t.detail = e.detail),
      t
    );
  } else return e;
}
function Jn(e) {
  try {
    return si(e) ? ms(e) : Object.prototype.toString.call(e);
  } catch {
    return "<unknown>";
  }
}
function Wn(e) {
  if (typeof e == "object" && e !== null) {
    const t = {};
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t;
  } else return {};
}
function hi(e, t = 40) {
  const n = Object.keys(_s(e));
  n.sort();
  const r = n[0];
  if (!r) return "[object has no keys]";
  if (r.length >= t) return tt(r, t);
  for (let s = n.length; s > 0; s--) {
    const o = n.slice(0, s).join(", ");
    if (!(o.length > t)) return s === n.length ? o : tt(o, t);
  }
  return "";
}
function mi() {
  const e = O;
  return e.crypto || e.msCrypto;
}
function B(e = mi()) {
  let t = () => Math.random() * 16;
  try {
    if (e != null && e.randomUUID) return e.randomUUID().replace(/-/g, "");
    e != null &&
      e.getRandomValues &&
      (t = () => {
        const n = new Uint8Array(1);
        return (e.getRandomValues(n), n[0]);
      });
  } catch {}
  return ("10000000100040008000" + 1e11).replace(/[018]/g, (n) =>
    (n ^ ((t() & 15) >> (n / 4))).toString(16),
  );
}
function Es(e) {
  var t, n;
  return (n = (t = e.exception) == null ? void 0 : t.values) == null
    ? void 0
    : n[0];
}
function te(e) {
  const { message: t, event_id: n } = e;
  if (t) return t;
  const r = Es(e);
  return r
    ? r.type && r.value
      ? `${r.type}: ${r.value}`
      : r.type || r.value || n || "<unknown>"
    : n || "<unknown>";
}
function Yt(e, t, n) {
  const r = (e.exception = e.exception || {}),
    s = (r.values = r.values || []),
    o = (s[0] = s[0] || {});
  (o.value || (o.value = t || ""), o.type || (o.type = "Error"));
}
function ye(e, t) {
  const n = Es(e);
  if (!n) return;
  const r = { type: "generic", handled: !0 },
    s = n.mechanism;
  if (((n.mechanism = { ...r, ...s, ...t }), t && "data" in t)) {
    const o = { ...(s == null ? void 0 : s.data), ...t.data };
    n.mechanism.data = o;
  }
}
function Kn(e) {
  if (gi(e)) return !0;
  try {
    ie(e, "__sentry_captured__", !0);
  } catch {}
  return !1;
}
function gi(e) {
  try {
    return e.__sentry_captured__;
  } catch {}
}
const bs = 1e3;
function Ne() {
  return Date.now() / bs;
}
function yi() {
  const { performance: e } = O;
  if (!(e != null && e.now)) return Ne;
  const t = Date.now() - e.now(),
    n = e.timeOrigin == null ? t : e.timeOrigin;
  return () => (n + e.now()) / bs;
}
const z = yi();
function _i(e) {
  const t = z(),
    n = {
      sid: B(),
      init: !0,
      timestamp: t,
      started: t,
      duration: 0,
      status: "ok",
      errors: 0,
      ignoreDuration: !1,
      toJSON: () => bi(n),
    };
  return (e && _e(n, e), n);
}
function _e(e, t = {}) {
  if (
    (t.user &&
      (!e.ipAddress && t.user.ip_address && (e.ipAddress = t.user.ip_address),
      !e.did &&
        !t.did &&
        (e.did = t.user.id || t.user.email || t.user.username)),
    (e.timestamp = t.timestamp || z()),
    t.abnormal_mechanism && (e.abnormal_mechanism = t.abnormal_mechanism),
    t.ignoreDuration && (e.ignoreDuration = t.ignoreDuration),
    t.sid && (e.sid = t.sid.length === 32 ? t.sid : B()),
    t.init !== void 0 && (e.init = t.init),
    !e.did && t.did && (e.did = `${t.did}`),
    typeof t.started == "number" && (e.started = t.started),
    e.ignoreDuration)
  )
    e.duration = void 0;
  else if (typeof t.duration == "number") e.duration = t.duration;
  else {
    const n = e.timestamp - e.started;
    e.duration = n >= 0 ? n : 0;
  }
  (t.release && (e.release = t.release),
    t.environment && (e.environment = t.environment),
    !e.ipAddress && t.ipAddress && (e.ipAddress = t.ipAddress),
    !e.userAgent && t.userAgent && (e.userAgent = t.userAgent),
    typeof t.errors == "number" && (e.errors = t.errors),
    t.status && (e.status = t.status));
}
function Ei(e, t) {
  let n = {};
  (e.status === "ok" && (n = { status: "exited" }), _e(e, n));
}
function bi(e) {
  return {
    sid: `${e.sid}`,
    init: e.init,
    started: new Date(e.started * 1e3).toISOString(),
    timestamp: new Date(e.timestamp * 1e3).toISOString(),
    status: e.status,
    errors: e.errors,
    did:
      typeof e.did == "number" || typeof e.did == "string"
        ? `${e.did}`
        : void 0,
    duration: e.duration,
    abnormal_mechanism: e.abnormal_mechanism,
    attrs: {
      release: e.release,
      environment: e.environment,
      ip_address: e.ipAddress,
      user_agent: e.userAgent,
    },
  };
}
function Ce(e, t, n = 2) {
  if (!t || typeof t != "object" || n <= 0) return t;
  if (e && Object.keys(t).length === 0) return e;
  const r = { ...e };
  for (const s in t)
    Object.prototype.hasOwnProperty.call(t, s) &&
      (r[s] = Ce(r[s], t[s], n - 1));
  return r;
}
const Xt = "_sentrySpan";
function zn(e, t) {
  t ? ie(e, Xt, t) : delete e[Xt];
}
function Yn(e) {
  return e[Xt];
}
function Xn() {
  return B();
}
function Ss() {
  return B().substring(16);
}
const Si = 100;
class G {
  constructor() {
    ((this._notifyingListeners = !1),
      (this._scopeListeners = []),
      (this._eventProcessors = []),
      (this._breadcrumbs = []),
      (this._attachments = []),
      (this._user = {}),
      (this._tags = {}),
      (this._extra = {}),
      (this._contexts = {}),
      (this._sdkProcessingMetadata = {}),
      (this._propagationContext = {
        traceId: Xn(),
        sampleRand: Math.random(),
      }));
  }
  clone() {
    const t = new G();
    return (
      (t._breadcrumbs = [...this._breadcrumbs]),
      (t._tags = { ...this._tags }),
      (t._extra = { ...this._extra }),
      (t._contexts = { ...this._contexts }),
      this._contexts.flags &&
        (t._contexts.flags = { values: [...this._contexts.flags.values] }),
      (t._user = this._user),
      (t._level = this._level),
      (t._session = this._session),
      (t._transactionName = this._transactionName),
      (t._fingerprint = this._fingerprint),
      (t._eventProcessors = [...this._eventProcessors]),
      (t._attachments = [...this._attachments]),
      (t._sdkProcessingMetadata = { ...this._sdkProcessingMetadata }),
      (t._propagationContext = { ...this._propagationContext }),
      (t._client = this._client),
      (t._lastEventId = this._lastEventId),
      zn(t, Yn(this)),
      t
    );
  }
  setClient(t) {
    this._client = t;
  }
  setLastEventId(t) {
    this._lastEventId = t;
  }
  getClient() {
    return this._client;
  }
  lastEventId() {
    return this._lastEventId;
  }
  addScopeListener(t) {
    this._scopeListeners.push(t);
  }
  addEventProcessor(t) {
    return (this._eventProcessors.push(t), this);
  }
  setUser(t) {
    return (
      (this._user = t || {
        email: void 0,
        id: void 0,
        ip_address: void 0,
        username: void 0,
      }),
      this._session && _e(this._session, { user: t }),
      this._notifyScopeListeners(),
      this
    );
  }
  getUser() {
    return this._user;
  }
  setTags(t) {
    return (
      (this._tags = { ...this._tags, ...t }),
      this._notifyScopeListeners(),
      this
    );
  }
  setTag(t, n) {
    return (
      (this._tags = { ...this._tags, [t]: n }),
      this._notifyScopeListeners(),
      this
    );
  }
  setExtras(t) {
    return (
      (this._extra = { ...this._extra, ...t }),
      this._notifyScopeListeners(),
      this
    );
  }
  setExtra(t, n) {
    return (
      (this._extra = { ...this._extra, [t]: n }),
      this._notifyScopeListeners(),
      this
    );
  }
  setFingerprint(t) {
    return ((this._fingerprint = t), this._notifyScopeListeners(), this);
  }
  setLevel(t) {
    return ((this._level = t), this._notifyScopeListeners(), this);
  }
  setTransactionName(t) {
    return ((this._transactionName = t), this._notifyScopeListeners(), this);
  }
  setContext(t, n) {
    return (
      n === null ? delete this._contexts[t] : (this._contexts[t] = n),
      this._notifyScopeListeners(),
      this
    );
  }
  setSession(t) {
    return (
      t ? (this._session = t) : delete this._session,
      this._notifyScopeListeners(),
      this
    );
  }
  getSession() {
    return this._session;
  }
  update(t) {
    if (!t) return this;
    const n = typeof t == "function" ? t(this) : t,
      r = n instanceof G ? n.getScopeData() : Ae(n) ? t : void 0,
      {
        tags: s,
        extra: o,
        user: i,
        contexts: a,
        level: c,
        fingerprint: u = [],
        propagationContext: l,
      } = r || {};
    return (
      (this._tags = { ...this._tags, ...s }),
      (this._extra = { ...this._extra, ...o }),
      (this._contexts = { ...this._contexts, ...a }),
      i && Object.keys(i).length && (this._user = i),
      c && (this._level = c),
      u.length && (this._fingerprint = u),
      l && (this._propagationContext = l),
      this
    );
  }
  clear() {
    return (
      (this._breadcrumbs = []),
      (this._tags = {}),
      (this._extra = {}),
      (this._user = {}),
      (this._contexts = {}),
      (this._level = void 0),
      (this._transactionName = void 0),
      (this._fingerprint = void 0),
      (this._session = void 0),
      zn(this, void 0),
      (this._attachments = []),
      this.setPropagationContext({ traceId: Xn(), sampleRand: Math.random() }),
      this._notifyScopeListeners(),
      this
    );
  }
  addBreadcrumb(t, n) {
    var o;
    const r = typeof n == "number" ? n : Si;
    if (r <= 0) return this;
    const s = {
      timestamp: Ne(),
      ...t,
      message: t.message ? tt(t.message, 2048) : t.message,
    };
    return (
      this._breadcrumbs.push(s),
      this._breadcrumbs.length > r &&
        ((this._breadcrumbs = this._breadcrumbs.slice(-r)),
        (o = this._client) == null ||
          o.recordDroppedEvent("buffer_overflow", "log_item")),
      this._notifyScopeListeners(),
      this
    );
  }
  getLastBreadcrumb() {
    return this._breadcrumbs[this._breadcrumbs.length - 1];
  }
  clearBreadcrumbs() {
    return ((this._breadcrumbs = []), this._notifyScopeListeners(), this);
  }
  addAttachment(t) {
    return (this._attachments.push(t), this);
  }
  clearAttachments() {
    return ((this._attachments = []), this);
  }
  getScopeData() {
    return {
      breadcrumbs: this._breadcrumbs,
      attachments: this._attachments,
      contexts: this._contexts,
      tags: this._tags,
      extra: this._extra,
      user: this._user,
      level: this._level,
      fingerprint: this._fingerprint || [],
      eventProcessors: this._eventProcessors,
      propagationContext: this._propagationContext,
      sdkProcessingMetadata: this._sdkProcessingMetadata,
      transactionName: this._transactionName,
      span: Yn(this),
    };
  }
  setSDKProcessingMetadata(t) {
    return (
      (this._sdkProcessingMetadata = Ce(this._sdkProcessingMetadata, t, 2)),
      this
    );
  }
  setPropagationContext(t) {
    return ((this._propagationContext = t), this);
  }
  getPropagationContext() {
    return this._propagationContext;
  }
  captureException(t, n) {
    const r = (n == null ? void 0 : n.event_id) || B();
    if (!this._client)
      return (
        w.warn("No client configured on scope - will not capture exception!"),
        r
      );
    const s = new Error("Sentry syntheticException");
    return (
      this._client.captureException(
        t,
        { originalException: t, syntheticException: s, ...n, event_id: r },
        this,
      ),
      r
    );
  }
  captureMessage(t, n, r) {
    const s = (r == null ? void 0 : r.event_id) || B();
    if (!this._client)
      return (
        w.warn("No client configured on scope - will not capture message!"),
        s
      );
    const o = new Error(t);
    return (
      this._client.captureMessage(
        t,
        n,
        { originalException: t, syntheticException: o, ...r, event_id: s },
        this,
      ),
      s
    );
  }
  captureEvent(t, n) {
    const r = (n == null ? void 0 : n.event_id) || B();
    return this._client
      ? (this._client.captureEvent(t, { ...n, event_id: r }, this), r)
      : (w.warn("No client configured on scope - will not capture event!"), r);
  }
  _notifyScopeListeners() {
    this._notifyingListeners ||
      ((this._notifyingListeners = !0),
      this._scopeListeners.forEach((t) => {
        t(this);
      }),
      (this._notifyingListeners = !1));
  }
}
function wi() {
  return ct("defaultCurrentScope", () => new G());
}
function Ti() {
  return ct("defaultIsolationScope", () => new G());
}
class Ri {
  constructor(t, n) {
    let r;
    t ? (r = t) : (r = new G());
    let s;
    (n ? (s = n) : (s = new G()),
      (this._stack = [{ scope: r }]),
      (this._isolationScope = s));
  }
  withScope(t) {
    const n = this._pushScope();
    let r;
    try {
      r = t(n);
    } catch (s) {
      throw (this._popScope(), s);
    }
    return lt(r)
      ? r.then(
          (s) => (this._popScope(), s),
          (s) => {
            throw (this._popScope(), s);
          },
        )
      : (this._popScope(), r);
  }
  getClient() {
    return this.getStackTop().client;
  }
  getScope() {
    return this.getStackTop().scope;
  }
  getIsolationScope() {
    return this._isolationScope;
  }
  getStackTop() {
    return this._stack[this._stack.length - 1];
  }
  _pushScope() {
    const t = this.getScope().clone();
    return (this._stack.push({ client: this.getClient(), scope: t }), t);
  }
  _popScope() {
    return this._stack.length <= 1 ? !1 : !!this._stack.pop();
  }
}
function Ee() {
  const e = it(),
    t = at(e);
  return (t.stack = t.stack || new Ri(wi(), Ti()));
}
function vi(e) {
  return Ee().withScope(e);
}
function Oi(e, t) {
  const n = Ee();
  return n.withScope(() => ((n.getStackTop().scope = e), t(e)));
}
function Qn(e) {
  return Ee().withScope(() => e(Ee().getIsolationScope()));
}
function Ii() {
  return {
    withIsolationScope: Qn,
    withScope: vi,
    withSetScope: Oi,
    withSetIsolationScope: (e, t) => Qn(t),
    getCurrentScope: () => Ee().getScope(),
    getIsolationScope: () => Ee().getIsolationScope(),
  };
}
function On(e) {
  const t = at(e);
  return t.acs ? t.acs : Ii();
}
function we() {
  const e = it();
  return On(e).getCurrentScope();
}
function De() {
  const e = it();
  return On(e).getIsolationScope();
}
function Ai() {
  return ct("globalScope", () => new G());
}
function xi(...e) {
  const t = it(),
    n = On(t);
  if (e.length === 2) {
    const [r, s] = e;
    return r ? n.withSetScope(r, s) : n.withScope(s);
  }
  return n.withScope(e[0]);
}
function F() {
  return we().getClient();
}
function ki(e) {
  const t = e.getPropagationContext(),
    { traceId: n, parentSpanId: r, propagationSpanId: s } = t,
    o = { trace_id: n, span_id: s || Ss() };
  return (r && (o.parent_span_id = r), o);
}
const Ni = "sentry.source",
  Ci = "sentry.sample_rate",
  Di = "sentry.previous_trace_sample_rate",
  Pi = "sentry.op",
  Li = "sentry.origin",
  ws = "sentry.profile_id",
  Ts = "sentry.exclusive_time",
  Fi = 0,
  Mi = 1,
  Ui = "_sentryScope",
  $i = "_sentryIsolationScope";
function Rs(e) {
  return { scope: e[Ui], isolationScope: e[$i] };
}
function ji(e) {
  if (typeof e == "boolean") return Number(e);
  const t = typeof e == "string" ? parseFloat(e) : e;
  if (!(typeof t != "number" || isNaN(t) || t < 0 || t > 1)) return t;
}
const Bi = "sentry-",
  qi = /^sentry-/;
function Hi(e) {
  const t = Vi(e);
  if (!t) return;
  const n = Object.entries(t).reduce((r, [s, o]) => {
    if (s.match(qi)) {
      const i = s.slice(Bi.length);
      r[i] = o;
    }
    return r;
  }, {});
  if (Object.keys(n).length > 0) return n;
}
function Vi(e) {
  if (!(!e || (!K(e) && !Array.isArray(e))))
    return Array.isArray(e)
      ? e.reduce((t, n) => {
          const r = Zn(n);
          return (
            Object.entries(r).forEach(([s, o]) => {
              t[s] = o;
            }),
            t
          );
        }, {})
      : Zn(e);
}
function Zn(e) {
  return e
    .split(",")
    .map((t) => t.split("=").map((n) => decodeURIComponent(n.trim())))
    .reduce((t, [n, r]) => (n && r && (t[n] = r), t), {});
}
const vs = 1;
let er = !1;
function Gi(e) {
  const { spanId: t, traceId: n, isRemote: r } = e.spanContext(),
    s = r ? t : In(e).parent_span_id,
    o = Rs(e).scope,
    i = r
      ? (o == null ? void 0 : o.getPropagationContext().propagationSpanId) ||
        Ss()
      : t;
  return { parent_span_id: s, span_id: i, trace_id: n };
}
function Ji(e) {
  if (e && e.length > 0)
    return e.map(
      ({
        context: { spanId: t, traceId: n, traceFlags: r, ...s },
        attributes: o,
      }) => ({
        span_id: t,
        trace_id: n,
        sampled: r === vs,
        attributes: o,
        ...s,
      }),
    );
}
function tr(e) {
  return typeof e == "number"
    ? nr(e)
    : Array.isArray(e)
      ? e[0] + e[1] / 1e9
      : e instanceof Date
        ? nr(e.getTime())
        : z();
}
function nr(e) {
  return e > 9999999999 ? e / 1e3 : e;
}
function In(e) {
  if (Ki(e)) return e.getSpanJSON();
  const { spanId: t, traceId: n } = e.spanContext();
  if (Wi(e)) {
    const {
      attributes: r,
      startTime: s,
      name: o,
      endTime: i,
      parentSpanId: a,
      status: c,
      links: u,
    } = e;
    return {
      span_id: t,
      trace_id: n,
      data: r,
      description: o,
      parent_span_id: a,
      start_timestamp: tr(s),
      timestamp: tr(i) || void 0,
      status: Yi(c),
      op: r[Pi],
      origin: r[Li],
      links: Ji(u),
    };
  }
  return { span_id: t, trace_id: n, start_timestamp: 0, data: {} };
}
function Wi(e) {
  const t = e;
  return (
    !!t.attributes && !!t.startTime && !!t.name && !!t.endTime && !!t.status
  );
}
function Ki(e) {
  return typeof e.getSpanJSON == "function";
}
function zi(e) {
  const { traceFlags: t } = e.spanContext();
  return t === vs;
}
function Yi(e) {
  if (!(!e || e.code === Fi))
    return e.code === Mi ? "ok" : e.message || "unknown_error";
}
const Xi = "_sentryRootSpan";
function Os(e) {
  return e[Xi] || e;
}
function rr() {
  er ||
    (ft(() => {
      console.warn(
        "[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly.",
      );
    }),
    (er = !0));
}
const Is = 50,
  ae = "?",
  sr = /\(error: (.*)\)/,
  or = /captureMessage|captureException/;
function Qi(...e) {
  const t = e.sort((n, r) => n[0] - r[0]).map((n) => n[1]);
  return (n, r = 0, s = 0) => {
    const o = [],
      i = n.split(`
`);
    for (let a = r; a < i.length; a++) {
      const c = i[a];
      if (c.length > 1024) continue;
      const u = sr.test(c) ? c.replace(sr, "$1") : c;
      if (!u.match(/\S*Error: /)) {
        for (const l of t) {
          const d = l(u);
          if (d) {
            o.push(d);
            break;
          }
        }
        if (o.length >= Is + s) break;
      }
    }
    return Zi(o.slice(s));
  };
}
function Zi(e) {
  if (!e.length) return [];
  const t = Array.from(e);
  return (
    /sentryWrapped/.test($e(t).function || "") && t.pop(),
    t.reverse(),
    or.test($e(t).function || "") &&
      (t.pop(), or.test($e(t).function || "") && t.pop()),
    t
      .slice(0, Is)
      .map((n) => ({
        ...n,
        filename: n.filename || $e(t).filename,
        function: n.function || ae,
      }))
  );
}
function $e(e) {
  return e[e.length - 1] || {};
}
const Ot = "<anonymous>";
function Q(e) {
  try {
    return !e || typeof e != "function" ? Ot : e.name || Ot;
  } catch {
    return Ot;
  }
}
function ir(e) {
  const t = e.exception;
  if (t) {
    const n = [];
    try {
      return (
        t.values.forEach((r) => {
          r.stacktrace.frames && n.push(...r.stacktrace.frames);
        }),
        n
      );
    } catch {
      return;
    }
  }
}
const Je = {},
  ar = {};
function de(e, t) {
  ((Je[e] = Je[e] || []), Je[e].push(t));
}
function pe(e, t) {
  if (!ar[e]) {
    ar[e] = !0;
    try {
      t();
    } catch (n) {
      fe && w.error(`Error while instrumenting ${e}`, n);
    }
  }
}
function q(e, t) {
  const n = e && Je[e];
  if (n)
    for (const r of n)
      try {
        r(t);
      } catch (s) {
        fe &&
          w.error(
            `Error while triggering instrumentation handler.
Type: ${e}
Name: ${Q(r)}
Error:`,
            s,
          );
      }
}
let It = null;
function ea(e) {
  const t = "error";
  (de(t, e), pe(t, ta));
}
function ta() {
  ((It = O.onerror),
    (O.onerror = function (e, t, n, r, s) {
      return (
        q("error", { column: r, error: s, line: n, msg: e, url: t }),
        It ? It.apply(this, arguments) : !1
      );
    }),
    (O.onerror.__SENTRY_INSTRUMENTED__ = !0));
}
let At = null;
function na(e) {
  const t = "unhandledrejection";
  (de(t, e), pe(t, ra));
}
function ra() {
  ((At = O.onunhandledrejection),
    (O.onunhandledrejection = function (e) {
      return (q("unhandledrejection", e), At ? At.apply(this, arguments) : !0);
    }),
    (O.onunhandledrejection.__SENTRY_INSTRUMENTED__ = !0));
}
function sa(e) {
  var n;
  if (typeof __SENTRY_TRACING__ == "boolean" && !__SENTRY_TRACING__) return !1;
  const t = e || ((n = F()) == null ? void 0 : n.getOptions());
  return !!t && (t.tracesSampleRate != null || !!t.tracesSampler);
}
const An = "production",
  oa = "_frozenDsc";
function As(e, t) {
  const n = t.getOptions(),
    { publicKey: r } = t.getDsn() || {},
    s = {
      environment: n.environment || An,
      release: n.release,
      public_key: r,
      trace_id: e,
    };
  return (t.emit("createDsc", s), s);
}
function ia(e, t) {
  const n = t.getPropagationContext();
  return n.dsc || As(n.traceId, e);
}
function aa(e) {
  var b;
  const t = F();
  if (!t) return {};
  const n = Os(e),
    r = In(n),
    s = r.data,
    o = n.spanContext().traceState,
    i = (o == null ? void 0 : o.get("sentry.sample_rate")) ?? s[Ci] ?? s[Di];
  function a(h) {
    return (
      (typeof i == "number" || typeof i == "string") &&
        (h.sample_rate = `${i}`),
      h
    );
  }
  const c = n[oa];
  if (c) return a(c);
  const u = o == null ? void 0 : o.get("sentry.dsc"),
    l = u && Hi(u);
  if (l) return a(l);
  const d = As(e.spanContext().traceId, t),
    E = s[Ni],
    y = r.description;
  return (
    E !== "url" && y && (d.transaction = y),
    sa() &&
      ((d.sampled = String(zi(n))),
      (d.sample_rand =
        (o == null ? void 0 : o.get("sentry.sample_rand")) ??
        ((b = Rs(n).scope) == null
          ? void 0
          : b.getPropagationContext().sampleRand.toString()))),
    a(d),
    t.emit("createDsc", d, n),
    d
  );
}
const ca = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
function ua(e) {
  return e === "http" || e === "https";
}
function pt(e, t = !1) {
  const {
    host: n,
    path: r,
    pass: s,
    port: o,
    projectId: i,
    protocol: a,
    publicKey: c,
  } = e;
  return `${a}://${c}${t && s ? `:${s}` : ""}@${n}${o ? `:${o}` : ""}/${r && `${r}/`}${i}`;
}
function la(e) {
  const t = ca.exec(e);
  if (!t) {
    ft(() => {
      console.error(`Invalid Sentry Dsn: ${e}`);
    });
    return;
  }
  const [n, r, s = "", o = "", i = "", a = ""] = t.slice(1);
  let c = "",
    u = a;
  const l = u.split("/");
  if ((l.length > 1 && ((c = l.slice(0, -1).join("/")), (u = l.pop())), u)) {
    const d = u.match(/^\d+/);
    d && (u = d[0]);
  }
  return xs({
    host: o,
    pass: s,
    path: c,
    projectId: u,
    port: i,
    protocol: n,
    publicKey: r,
  });
}
function xs(e) {
  return {
    protocol: e.protocol,
    publicKey: e.publicKey || "",
    pass: e.pass || "",
    host: e.host,
    port: e.port || "",
    path: e.path || "",
    projectId: e.projectId,
  };
}
function fa(e) {
  if (!fe) return !0;
  const { port: t, projectId: n, protocol: r } = e;
  return ["protocol", "publicKey", "host", "projectId"].find((i) =>
    e[i] ? !1 : (w.error(`Invalid Sentry Dsn: ${i} missing`), !0),
  )
    ? !1
    : n.match(/^\d+$/)
      ? ua(r)
        ? t && isNaN(parseInt(t, 10))
          ? (w.error(`Invalid Sentry Dsn: Invalid port ${t}`), !1)
          : !0
        : (w.error(`Invalid Sentry Dsn: Invalid protocol ${r}`), !1)
      : (w.error(`Invalid Sentry Dsn: Invalid projectId ${n}`), !1);
}
function da(e) {
  const t = typeof e == "string" ? la(e) : xs(e);
  if (!(!t || !fa(t))) return t;
}
function J(e, t = 100, n = 1 / 0) {
  try {
    return Qt("", e, t, n);
  } catch (r) {
    return { ERROR: `**non-serializable** (${r})` };
  }
}
function ks(e, t = 3, n = 100 * 1024) {
  const r = J(e, t);
  return ga(r) > n ? ks(e, t - 1, n) : r;
}
function Qt(e, t, n = 1 / 0, r = 1 / 0, s = ya()) {
  const [o, i] = s;
  if (
    t == null ||
    ["boolean", "string"].includes(typeof t) ||
    (typeof t == "number" && Number.isFinite(t))
  )
    return t;
  const a = pa(e, t);
  if (!a.startsWith("[object ")) return a;
  if (t.__sentry_skip_normalization__) return t;
  const c =
    typeof t.__sentry_override_normalization_depth__ == "number"
      ? t.__sentry_override_normalization_depth__
      : n;
  if (c === 0) return a.replace("object ", "");
  if (o(t)) return "[Circular ~]";
  const u = t;
  if (u && typeof u.toJSON == "function")
    try {
      const y = u.toJSON();
      return Qt("", y, c - 1, r, s);
    } catch {}
  const l = Array.isArray(t) ? [] : {};
  let d = 0;
  const E = _s(t);
  for (const y in E) {
    if (!Object.prototype.hasOwnProperty.call(E, y)) continue;
    if (d >= r) {
      l[y] = "[MaxProperties ~]";
      break;
    }
    const b = E[y];
    ((l[y] = Qt(y, b, c - 1, r, s)), d++);
  }
  return (i(t), l);
}
function pa(e, t) {
  try {
    if (e === "domain" && t && typeof t == "object" && t._events)
      return "[Domain]";
    if (e === "domainEmitter") return "[DomainEmitter]";
    if (typeof global < "u" && t === global) return "[Global]";
    if (typeof window < "u" && t === window) return "[Window]";
    if (typeof document < "u" && t === document) return "[Document]";
    if (hs(t)) return "[VueViewModel]";
    if (ii(t)) return "[SyntheticEvent]";
    if (typeof t == "number" && !Number.isFinite(t)) return `[${t}]`;
    if (typeof t == "function") return `[Function: ${Q(t)}]`;
    if (typeof t == "symbol") return `[${String(t)}]`;
    if (typeof t == "bigint") return `[BigInt: ${String(t)}]`;
    const n = ha(t);
    return /^HTML(\w*)Element$/.test(n)
      ? `[HTMLElement: ${n}]`
      : `[object ${n}]`;
  } catch (n) {
    return `**non-serializable** (${n})`;
  }
}
function ha(e) {
  const t = Object.getPrototypeOf(e);
  return t != null && t.constructor ? t.constructor.name : "null prototype";
}
function ma(e) {
  return ~-encodeURI(e).split(/%..|./).length;
}
function ga(e) {
  return ma(JSON.stringify(e));
}
function ya() {
  const e = new WeakSet();
  function t(r) {
    return e.has(r) ? !0 : (e.add(r), !1);
  }
  function n(r) {
    e.delete(r);
  }
  return [t, n];
}
function Pe(e, t = []) {
  return [e, t];
}
function _a(e, t) {
  const [n, r] = e;
  return [n, [...r, t]];
}
function cr(e, t) {
  const n = e[1];
  for (const r of n) {
    const s = r[0].type;
    if (t(r, s)) return !0;
  }
  return !1;
}
function Zt(e) {
  const t = at(O);
  return t.encodePolyfill ? t.encodePolyfill(e) : new TextEncoder().encode(e);
}
function Ea(e) {
  const [t, n] = e;
  let r = JSON.stringify(t);
  function s(o) {
    typeof r == "string"
      ? (r = typeof o == "string" ? r + o : [Zt(r), o])
      : r.push(typeof o == "string" ? Zt(o) : o);
  }
  for (const o of n) {
    const [i, a] = o;
    if (
      (s(`
${JSON.stringify(i)}
`),
      typeof a == "string" || a instanceof Uint8Array)
    )
      s(a);
    else {
      let c;
      try {
        c = JSON.stringify(a);
      } catch {
        c = JSON.stringify(J(a));
      }
      s(c);
    }
  }
  return typeof r == "string" ? r : ba(r);
}
function ba(e) {
  const t = e.reduce((s, o) => s + o.length, 0),
    n = new Uint8Array(t);
  let r = 0;
  for (const s of e) (n.set(s, r), (r += s.length));
  return n;
}
function Sa(e) {
  const t = typeof e.data == "string" ? Zt(e.data) : e.data;
  return [
    {
      type: "attachment",
      length: t.length,
      filename: e.filename,
      content_type: e.contentType,
      attachment_type: e.attachmentType,
    },
    t,
  ];
}
const wa = {
  session: "session",
  sessions: "session",
  attachment: "attachment",
  transaction: "transaction",
  event: "error",
  client_report: "internal",
  user_report: "default",
  profile: "profile",
  profile_chunk: "profile",
  replay_event: "replay",
  replay_recording: "replay",
  check_in: "monitor",
  feedback: "feedback",
  span: "span",
  raw_security: "security",
  log: "log_item",
};
function ur(e) {
  return wa[e];
}
function Ns(e) {
  if (!(e != null && e.sdk)) return;
  const { name: t, version: n } = e.sdk;
  return { name: t, version: n };
}
function Ta(e, t, n, r) {
  var o;
  const s =
    (o = e.sdkProcessingMetadata) == null ? void 0 : o.dynamicSamplingContext;
  return {
    event_id: e.event_id,
    sent_at: new Date().toISOString(),
    ...(t && { sdk: t }),
    ...(!!n && r && { dsn: pt(r) }),
    ...(s && { trace: s }),
  };
}
function Ra(e, t) {
  return (
    t &&
      ((e.sdk = e.sdk || {}),
      (e.sdk.name = e.sdk.name || t.name),
      (e.sdk.version = e.sdk.version || t.version),
      (e.sdk.integrations = [
        ...(e.sdk.integrations || []),
        ...(t.integrations || []),
      ]),
      (e.sdk.packages = [...(e.sdk.packages || []), ...(t.packages || [])])),
    e
  );
}
function va(e, t, n, r) {
  const s = Ns(n),
    o = {
      sent_at: new Date().toISOString(),
      ...(s && { sdk: s }),
      ...(!!r && t && { dsn: pt(t) }),
    },
    i =
      "aggregates" in e
        ? [{ type: "sessions" }, e]
        : [{ type: "session" }, e.toJSON()];
  return Pe(o, [i]);
}
function Oa(e, t, n, r) {
  const s = Ns(n),
    o = e.type && e.type !== "replay_event" ? e.type : "event";
  Ra(e, n == null ? void 0 : n.sdk);
  const i = Ta(e, s, r, t);
  return (delete e.sdkProcessingMetadata, Pe(i, [[{ type: o }, e]]));
}
var W;
(function (e) {
  e[(e.PENDING = 0)] = "PENDING";
  const n = 1;
  e[(e.RESOLVED = n)] = "RESOLVED";
  const r = 2;
  e[(e.REJECTED = r)] = "REJECTED";
})(W || (W = {}));
function ce(e) {
  return new Z((t) => {
    t(e);
  });
}
function nt(e) {
  return new Z((t, n) => {
    n(e);
  });
}
class Z {
  constructor(t) {
    ((this._state = W.PENDING), (this._handlers = []), this._runExecutor(t));
  }
  then(t, n) {
    return new Z((r, s) => {
      (this._handlers.push([
        !1,
        (o) => {
          if (!t) r(o);
          else
            try {
              r(t(o));
            } catch (i) {
              s(i);
            }
        },
        (o) => {
          if (!n) s(o);
          else
            try {
              r(n(o));
            } catch (i) {
              s(i);
            }
        },
      ]),
        this._executeHandlers());
    });
  }
  catch(t) {
    return this.then((n) => n, t);
  }
  finally(t) {
    return new Z((n, r) => {
      let s, o;
      return this.then(
        (i) => {
          ((o = !1), (s = i), t && t());
        },
        (i) => {
          ((o = !0), (s = i), t && t());
        },
      ).then(() => {
        if (o) {
          r(s);
          return;
        }
        n(s);
      });
    });
  }
  _executeHandlers() {
    if (this._state === W.PENDING) return;
    const t = this._handlers.slice();
    ((this._handlers = []),
      t.forEach((n) => {
        n[0] ||
          (this._state === W.RESOLVED && n[1](this._value),
          this._state === W.REJECTED && n[2](this._value),
          (n[0] = !0));
      }));
  }
  _runExecutor(t) {
    const n = (o, i) => {
        if (this._state === W.PENDING) {
          if (lt(i)) {
            i.then(r, s);
            return;
          }
          ((this._state = o), (this._value = i), this._executeHandlers());
        }
      },
      r = (o) => {
        n(W.RESOLVED, o);
      },
      s = (o) => {
        n(W.REJECTED, o);
      };
    try {
      t(r, s);
    } catch (o) {
      s(o);
    }
  }
}
function en(e, t, n, r = 0) {
  return new Z((s, o) => {
    const i = e[r];
    if (t === null || typeof i != "function") s(t);
    else {
      const a = i({ ...t }, n);
      (I &&
        i.id &&
        a === null &&
        w.log(`Event processor "${i.id}" dropped event`),
        lt(a)
          ? a.then((c) => en(e, c, n, r + 1).then(s)).then(null, o)
          : en(e, a, n, r + 1)
              .then(s)
              .then(null, o));
    }
  });
}
let je, lr, Be;
function Ia(e) {
  const t = O._sentryDebugIds;
  if (!t) return {};
  const n = Object.keys(t);
  return (
    (Be && n.length === lr) ||
      ((lr = n.length),
      (Be = n.reduce((r, s) => {
        je || (je = {});
        const o = je[s];
        if (o) r[o[0]] = o[1];
        else {
          const i = e(s);
          for (let a = i.length - 1; a >= 0; a--) {
            const c = i[a],
              u = c == null ? void 0 : c.filename,
              l = t[s];
            if (u && l) {
              ((r[u] = l), (je[s] = [u, l]));
              break;
            }
          }
        }
        return r;
      }, {}))),
    Be
  );
}
function Aa(e, t) {
  const {
    fingerprint: n,
    span: r,
    breadcrumbs: s,
    sdkProcessingMetadata: o,
  } = t;
  (xa(e, t), r && Ca(e, r), Da(e, n), ka(e, s), Na(e, o));
}
function fr(e, t) {
  const {
    extra: n,
    tags: r,
    user: s,
    contexts: o,
    level: i,
    sdkProcessingMetadata: a,
    breadcrumbs: c,
    fingerprint: u,
    eventProcessors: l,
    attachments: d,
    propagationContext: E,
    transactionName: y,
    span: b,
  } = t;
  (qe(e, "extra", n),
    qe(e, "tags", r),
    qe(e, "user", s),
    qe(e, "contexts", o),
    (e.sdkProcessingMetadata = Ce(e.sdkProcessingMetadata, a, 2)),
    i && (e.level = i),
    y && (e.transactionName = y),
    b && (e.span = b),
    c.length && (e.breadcrumbs = [...e.breadcrumbs, ...c]),
    u.length && (e.fingerprint = [...e.fingerprint, ...u]),
    l.length && (e.eventProcessors = [...e.eventProcessors, ...l]),
    d.length && (e.attachments = [...e.attachments, ...d]),
    (e.propagationContext = { ...e.propagationContext, ...E }));
}
function qe(e, t, n) {
  e[t] = Ce(e[t], n, 1);
}
function xa(e, t) {
  const {
    extra: n,
    tags: r,
    user: s,
    contexts: o,
    level: i,
    transactionName: a,
  } = t;
  (Object.keys(n).length && (e.extra = { ...n, ...e.extra }),
    Object.keys(r).length && (e.tags = { ...r, ...e.tags }),
    Object.keys(s).length && (e.user = { ...s, ...e.user }),
    Object.keys(o).length && (e.contexts = { ...o, ...e.contexts }),
    i && (e.level = i),
    a && e.type !== "transaction" && (e.transaction = a));
}
function ka(e, t) {
  const n = [...(e.breadcrumbs || []), ...t];
  e.breadcrumbs = n.length ? n : void 0;
}
function Na(e, t) {
  e.sdkProcessingMetadata = { ...e.sdkProcessingMetadata, ...t };
}
function Ca(e, t) {
  ((e.contexts = { trace: Gi(t), ...e.contexts }),
    (e.sdkProcessingMetadata = {
      dynamicSamplingContext: aa(t),
      ...e.sdkProcessingMetadata,
    }));
  const n = Os(t),
    r = In(n).description;
  r && !e.transaction && e.type === "transaction" && (e.transaction = r);
}
function Da(e, t) {
  ((e.fingerprint = e.fingerprint
    ? Array.isArray(e.fingerprint)
      ? e.fingerprint
      : [e.fingerprint]
    : []),
    t && (e.fingerprint = e.fingerprint.concat(t)),
    e.fingerprint.length || delete e.fingerprint);
}
function Pa(e, t, n, r, s, o) {
  const { normalizeDepth: i = 3, normalizeMaxBreadth: a = 1e3 } = e,
    c = {
      ...t,
      event_id: t.event_id || n.event_id || B(),
      timestamp: t.timestamp || Ne(),
    },
    u = n.integrations || e.integrations.map((f) => f.name);
  (La(c, e),
    Ua(c, u),
    s && s.emit("applyFrameMetadata", t),
    t.type === void 0 && Fa(c, e.stackParser));
  const l = ja(r, n.captureContext);
  n.mechanism && ye(c, n.mechanism);
  const d = s ? s.getEventProcessors() : [],
    E = Ai().getScopeData();
  if (o) {
    const f = o.getScopeData();
    fr(E, f);
  }
  if (l) {
    const f = l.getScopeData();
    fr(E, f);
  }
  const y = [...(n.attachments || []), ...E.attachments];
  (y.length && (n.attachments = y), Aa(c, E));
  const b = [...d, ...E.eventProcessors];
  return en(b, c, n).then(
    (f) => (f && Ma(f), typeof i == "number" && i > 0 ? $a(f, i, a) : f),
  );
}
function La(e, t) {
  const { environment: n, release: r, dist: s, maxValueLength: o = 250 } = t;
  ((e.environment = e.environment || n || An),
    !e.release && r && (e.release = r),
    !e.dist && s && (e.dist = s));
  const i = e.request;
  i != null && i.url && (i.url = tt(i.url, o));
}
function Fa(e, t) {
  var r, s;
  const n = Ia(t);
  (s = (r = e.exception) == null ? void 0 : r.values) == null ||
    s.forEach((o) => {
      var i, a;
      (a = (i = o.stacktrace) == null ? void 0 : i.frames) == null ||
        a.forEach((c) => {
          c.filename && (c.debug_id = n[c.filename]);
        });
    });
}
function Ma(e) {
  var r, s;
  const t = {};
  if (
    ((s = (r = e.exception) == null ? void 0 : r.values) == null ||
      s.forEach((o) => {
        var i, a;
        (a = (i = o.stacktrace) == null ? void 0 : i.frames) == null ||
          a.forEach((c) => {
            c.debug_id &&
              (c.abs_path
                ? (t[c.abs_path] = c.debug_id)
                : c.filename && (t[c.filename] = c.debug_id),
              delete c.debug_id);
          });
      }),
    Object.keys(t).length === 0)
  )
    return;
  ((e.debug_meta = e.debug_meta || {}),
    (e.debug_meta.images = e.debug_meta.images || []));
  const n = e.debug_meta.images;
  Object.entries(t).forEach(([o, i]) => {
    n.push({ type: "sourcemap", code_file: o, debug_id: i });
  });
}
function Ua(e, t) {
  t.length > 0 &&
    ((e.sdk = e.sdk || {}),
    (e.sdk.integrations = [...(e.sdk.integrations || []), ...t]));
}
function $a(e, t, n) {
  var s, o;
  if (!e) return null;
  const r = {
    ...e,
    ...(e.breadcrumbs && {
      breadcrumbs: e.breadcrumbs.map((i) => ({
        ...i,
        ...(i.data && { data: J(i.data, t, n) }),
      })),
    }),
    ...(e.user && { user: J(e.user, t, n) }),
    ...(e.contexts && { contexts: J(e.contexts, t, n) }),
    ...(e.extra && { extra: J(e.extra, t, n) }),
  };
  return (
    (s = e.contexts) != null &&
      s.trace &&
      r.contexts &&
      ((r.contexts.trace = e.contexts.trace),
      e.contexts.trace.data &&
        (r.contexts.trace.data = J(e.contexts.trace.data, t, n))),
    e.spans &&
      (r.spans = e.spans.map((i) => ({
        ...i,
        ...(i.data && { data: J(i.data, t, n) }),
      }))),
    (o = e.contexts) != null &&
      o.flags &&
      r.contexts &&
      (r.contexts.flags = J(e.contexts.flags, 3, n)),
    r
  );
}
function ja(e, t) {
  if (!t) return e;
  const n = e ? e.clone() : new G();
  return (n.update(t), n);
}
function Ba(e, t) {
  return we().captureException(e, void 0);
}
function Cs(e, t) {
  return we().captureEvent(e, t);
}
function dr(e) {
  const t = De(),
    n = we(),
    { userAgent: r } = O.navigator || {},
    s = _i({
      user: n.getUser() || t.getUser(),
      ...(r && { userAgent: r }),
      ...e,
    }),
    o = t.getSession();
  return (
    (o == null ? void 0 : o.status) === "ok" && _e(o, { status: "exited" }),
    Ds(),
    t.setSession(s),
    s
  );
}
function Ds() {
  const e = De(),
    n = we().getSession() || e.getSession();
  (n && Ei(n), Ps(), e.setSession());
}
function Ps() {
  const e = De(),
    t = F(),
    n = e.getSession();
  n && t && t.captureSession(n);
}
function pr(e = !1) {
  if (e) {
    Ds();
    return;
  }
  Ps();
}
const qa = "7";
function Ha(e) {
  const t = e.protocol ? `${e.protocol}:` : "",
    n = e.port ? `:${e.port}` : "";
  return `${t}//${e.host}${n}${e.path ? `/${e.path}` : ""}/api/`;
}
function Va(e) {
  return `${Ha(e)}${e.projectId}/envelope/`;
}
function Ga(e, t) {
  const n = { sentry_version: qa };
  return (
    e.publicKey && (n.sentry_key = e.publicKey),
    t && (n.sentry_client = `${t.name}/${t.version}`),
    new URLSearchParams(n).toString()
  );
}
function Ja(e, t, n) {
  return t || `${Va(e)}?${Ga(e, n)}`;
}
const hr = [];
function Wa(e, t) {
  const n = {};
  return (
    t.forEach((r) => {
      r && Ls(e, r, n);
    }),
    n
  );
}
function mr(e, t) {
  for (const n of t) n != null && n.afterAllSetup && n.afterAllSetup(e);
}
function Ls(e, t, n) {
  if (n[t.name]) {
    I &&
      w.log(`Integration skipped because it was already installed: ${t.name}`);
    return;
  }
  if (
    ((n[t.name] = t),
    hr.indexOf(t.name) === -1 &&
      typeof t.setupOnce == "function" &&
      (t.setupOnce(), hr.push(t.name)),
    t.setup && typeof t.setup == "function" && t.setup(e),
    typeof t.preprocessEvent == "function")
  ) {
    const r = t.preprocessEvent.bind(t);
    e.on("preprocessEvent", (s, o) => r(s, o, e));
  }
  if (typeof t.processEvent == "function") {
    const r = t.processEvent.bind(t),
      s = Object.assign((o, i) => r(o, i, e), { id: t.name });
    e.addEventProcessor(s);
  }
  I && w.log(`Integration installed: ${t.name}`);
}
function Fs(e) {
  const t = [];
  e.message && t.push(e.message);
  try {
    const n = e.exception.values[e.exception.values.length - 1];
    n != null &&
      n.value &&
      (t.push(n.value), n.type && t.push(`${n.type}: ${n.value}`));
  } catch {}
  return t;
}
function Ka(e) {
  var c;
  const {
    trace_id: t,
    parent_span_id: n,
    span_id: r,
    status: s,
    origin: o,
    data: i,
    op: a,
  } = ((c = e.contexts) == null ? void 0 : c.trace) ?? {};
  return {
    data: i ?? {},
    description: e.transaction,
    op: a,
    parent_span_id: n,
    span_id: r ?? "",
    start_timestamp: e.start_timestamp ?? 0,
    status: s,
    timestamp: e.timestamp,
    trace_id: t ?? "",
    origin: o,
    profile_id: i == null ? void 0 : i[ws],
    exclusive_time: i == null ? void 0 : i[Ts],
    measurements: e.measurements,
    is_segment: !0,
  };
}
function za(e) {
  return {
    type: "transaction",
    timestamp: e.timestamp,
    start_timestamp: e.start_timestamp,
    transaction: e.description,
    contexts: {
      trace: {
        trace_id: e.trace_id,
        span_id: e.span_id,
        parent_span_id: e.parent_span_id,
        op: e.op,
        status: e.status,
        origin: e.origin,
        data: {
          ...e.data,
          ...(e.profile_id && { [ws]: e.profile_id }),
          ...(e.exclusive_time && { [Ts]: e.exclusive_time }),
        },
      },
    },
    measurements: e.measurements,
  };
}
function Ya(e, t, n) {
  const r = [
    { type: "client_report" },
    { timestamp: Ne(), discarded_events: e },
  ];
  return Pe(t ? { dsn: t } : {}, [r]);
}
const gr = "Not capturing exception because it's already been captured.",
  yr = "Discarded session because of missing or non-string release",
  Ms = Symbol.for("SentryInternalError"),
  Us = Symbol.for("SentryDoNotSendEventError");
function We(e) {
  return { message: e, [Ms]: !0 };
}
function xt(e) {
  return { message: e, [Us]: !0 };
}
function _r(e) {
  return !!e && typeof e == "object" && Ms in e;
}
function Er(e) {
  return !!e && typeof e == "object" && Us in e;
}
class Xa {
  constructor(t) {
    if (
      ((this._options = t),
      (this._integrations = {}),
      (this._numProcessing = 0),
      (this._outcomes = {}),
      (this._hooks = {}),
      (this._eventProcessors = []),
      t.dsn
        ? (this._dsn = da(t.dsn))
        : I && w.warn("No DSN provided, client will not send events."),
      this._dsn)
    ) {
      const n = Ja(this._dsn, t.tunnel, t._metadata ? t._metadata.sdk : void 0);
      this._transport = t.transport({
        tunnel: this._options.tunnel,
        recordDroppedEvent: this.recordDroppedEvent.bind(this),
        ...t.transportOptions,
        url: n,
      });
    }
  }
  captureException(t, n, r) {
    const s = B();
    if (Kn(t)) return (I && w.log(gr), s);
    const o = { event_id: s, ...n };
    return (
      this._process(
        this.eventFromException(t, o).then((i) => this._captureEvent(i, o, r)),
      ),
      o.event_id
    );
  }
  captureMessage(t, n, r, s) {
    const o = { event_id: B(), ...r },
      i = wn(t) ? t : String(t),
      a = Tn(t)
        ? this.eventFromMessage(i, n, o)
        : this.eventFromException(t, o);
    return (
      this._process(a.then((c) => this._captureEvent(c, o, s))),
      o.event_id
    );
  }
  captureEvent(t, n, r) {
    const s = B();
    if (n != null && n.originalException && Kn(n.originalException))
      return (I && w.log(gr), s);
    const o = { event_id: s, ...n },
      i = t.sdkProcessingMetadata || {},
      a = i.capturedSpanScope,
      c = i.capturedSpanIsolationScope;
    return (this._process(this._captureEvent(t, o, a || r, c)), o.event_id);
  }
  captureSession(t) {
    (this.sendSession(t), _e(t, { init: !1 }));
  }
  getDsn() {
    return this._dsn;
  }
  getOptions() {
    return this._options;
  }
  getSdkMetadata() {
    return this._options._metadata;
  }
  getTransport() {
    return this._transport;
  }
  flush(t) {
    const n = this._transport;
    return n
      ? (this.emit("flush"),
        this._isClientDoneProcessing(t).then((r) =>
          n.flush(t).then((s) => r && s),
        ))
      : ce(!0);
  }
  close(t) {
    return this.flush(t).then(
      (n) => ((this.getOptions().enabled = !1), this.emit("close"), n),
    );
  }
  getEventProcessors() {
    return this._eventProcessors;
  }
  addEventProcessor(t) {
    this._eventProcessors.push(t);
  }
  init() {
    (this._isEnabled() ||
      this._options.integrations.some(({ name: t }) =>
        t.startsWith("Spotlight"),
      )) &&
      this._setupIntegrations();
  }
  getIntegrationByName(t) {
    return this._integrations[t];
  }
  addIntegration(t) {
    const n = this._integrations[t.name];
    (Ls(this, t, this._integrations), n || mr(this, [t]));
  }
  sendEvent(t, n = {}) {
    this.emit("beforeSendEvent", t, n);
    let r = Oa(t, this._dsn, this._options._metadata, this._options.tunnel);
    for (const o of n.attachments || []) r = _a(r, Sa(o));
    const s = this.sendEnvelope(r);
    s && s.then((o) => this.emit("afterSendEvent", t, o), null);
  }
  sendSession(t) {
    const { release: n, environment: r = An } = this._options;
    if ("aggregates" in t) {
      const o = t.attrs || {};
      if (!o.release && !n) {
        I && w.warn(yr);
        return;
      }
      ((o.release = o.release || n),
        (o.environment = o.environment || r),
        (t.attrs = o));
    } else {
      if (!t.release && !n) {
        I && w.warn(yr);
        return;
      }
      ((t.release = t.release || n), (t.environment = t.environment || r));
    }
    this.emit("beforeSendSession", t);
    const s = va(t, this._dsn, this._options._metadata, this._options.tunnel);
    this.sendEnvelope(s);
  }
  recordDroppedEvent(t, n, r = 1) {
    if (this._options.sendClientReports) {
      const s = `${t}:${n}`;
      (I && w.log(`Recording outcome: "${s}"${r > 1 ? ` (${r} times)` : ""}`),
        (this._outcomes[s] = (this._outcomes[s] || 0) + r));
    }
  }
  on(t, n) {
    const r = (this._hooks[t] = this._hooks[t] || []);
    return (
      r.push(n),
      () => {
        const s = r.indexOf(n);
        s > -1 && r.splice(s, 1);
      }
    );
  }
  emit(t, ...n) {
    const r = this._hooks[t];
    r && r.forEach((s) => s(...n));
  }
  sendEnvelope(t) {
    return (
      this.emit("beforeEnvelope", t),
      this._isEnabled() && this._transport
        ? this._transport
            .send(t)
            .then(
              null,
              (n) => (I && w.error("Error while sending envelope:", n), n),
            )
        : (I && w.error("Transport disabled"), ce({}))
    );
  }
  _setupIntegrations() {
    const { integrations: t } = this._options;
    ((this._integrations = Wa(this, t)), mr(this, t));
  }
  _updateSessionFromEvent(t, n) {
    var c;
    let r = n.level === "fatal",
      s = !1;
    const o = (c = n.exception) == null ? void 0 : c.values;
    if (o) {
      s = !0;
      for (const u of o) {
        const l = u.mechanism;
        if ((l == null ? void 0 : l.handled) === !1) {
          r = !0;
          break;
        }
      }
    }
    const i = t.status === "ok";
    ((i && t.errors === 0) || (i && r)) &&
      (_e(t, {
        ...(r && { status: "crashed" }),
        errors: t.errors || Number(s || r),
      }),
      this.captureSession(t));
  }
  _isClientDoneProcessing(t) {
    return new Z((n) => {
      let r = 0;
      const s = 1,
        o = setInterval(() => {
          this._numProcessing == 0
            ? (clearInterval(o), n(!0))
            : ((r += s), t && r >= t && (clearInterval(o), n(!1)));
        }, s);
    });
  }
  _isEnabled() {
    return this.getOptions().enabled !== !1 && this._transport !== void 0;
  }
  _prepareEvent(t, n, r, s) {
    const o = this.getOptions(),
      i = Object.keys(this._integrations);
    return (
      !n.integrations && i != null && i.length && (n.integrations = i),
      this.emit("preprocessEvent", t, n),
      t.type || s.setLastEventId(t.event_id || n.event_id),
      Pa(o, t, n, r, this, s).then((a) => {
        if (a === null) return a;
        (this.emit("postprocessEvent", a, n),
          (a.contexts = { trace: ki(r), ...a.contexts }));
        const c = ia(this, r);
        return (
          (a.sdkProcessingMetadata = {
            dynamicSamplingContext: c,
            ...a.sdkProcessingMetadata,
          }),
          a
        );
      })
    );
  }
  _captureEvent(t, n = {}, r = we(), s = De()) {
    return (
      I &&
        tn(t) &&
        w.log(`Captured error event \`${Fs(t)[0] || "<unknown>"}\``),
      this._processEvent(t, n, r, s).then(
        (o) => o.event_id,
        (o) => {
          I &&
            (Er(o) ? w.log(o.message) : _r(o) ? w.warn(o.message) : w.warn(o));
        },
      )
    );
  }
  _processEvent(t, n, r, s) {
    const o = this.getOptions(),
      { sampleRate: i } = o,
      a = $s(t),
      c = tn(t),
      u = t.type || "error",
      l = `before send for type \`${u}\``,
      d = typeof i > "u" ? void 0 : ji(i);
    if (c && typeof d == "number" && Math.random() > d)
      return (
        this.recordDroppedEvent("sample_rate", "error"),
        nt(
          xt(
            `Discarding event because it's not included in the random sample (sampling rate = ${i})`,
          ),
        )
      );
    const E = u === "replay_event" ? "replay" : u;
    return this._prepareEvent(t, n, r, s)
      .then((y) => {
        if (y === null)
          throw (
            this.recordDroppedEvent("event_processor", E),
            xt("An event processor returned `null`, will not send event.")
          );
        if (n.data && n.data.__sentry__ === !0) return y;
        const h = Za(this, o, y, n);
        return Qa(h, l);
      })
      .then((y) => {
        var f;
        if (y === null) {
          if ((this.recordDroppedEvent("before_send", E), a)) {
            const g = 1 + (t.spans || []).length;
            this.recordDroppedEvent("before_send", "span", g);
          }
          throw xt(`${l} returned \`null\`, will not send event.`);
        }
        const b = r.getSession() || s.getSession();
        if ((c && b && this._updateSessionFromEvent(b, y), a)) {
          const m =
              ((f = y.sdkProcessingMetadata) == null
                ? void 0
                : f.spanCountBeforeProcessing) || 0,
            g = y.spans ? y.spans.length : 0,
            _ = m - g;
          _ > 0 && this.recordDroppedEvent("before_send", "span", _);
        }
        const h = y.transaction_info;
        if (a && h && y.transaction !== t.transaction) {
          const m = "custom";
          y.transaction_info = { ...h, source: m };
        }
        return (this.sendEvent(y, n), y);
      })
      .then(null, (y) => {
        throw Er(y) || _r(y)
          ? y
          : (this.captureException(y, {
              data: { __sentry__: !0 },
              originalException: y,
            }),
            We(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${y}`));
      });
  }
  _process(t) {
    (this._numProcessing++,
      t.then(
        (n) => (this._numProcessing--, n),
        (n) => (this._numProcessing--, n),
      ));
  }
  _clearOutcomes() {
    const t = this._outcomes;
    return (
      (this._outcomes = {}),
      Object.entries(t).map(([n, r]) => {
        const [s, o] = n.split(":");
        return { reason: s, category: o, quantity: r };
      })
    );
  }
  _flushOutcomes() {
    I && w.log("Flushing outcomes...");
    const t = this._clearOutcomes();
    if (t.length === 0) {
      I && w.log("No outcomes to send");
      return;
    }
    if (!this._dsn) {
      I && w.log("No dsn provided, will not send outcomes");
      return;
    }
    I && w.log("Sending outcomes:", t);
    const n = Ya(t, this._options.tunnel && pt(this._dsn));
    this.sendEnvelope(n);
  }
}
function Qa(e, t) {
  const n = `${t} must return \`null\` or a valid event.`;
  if (lt(e))
    return e.then(
      (r) => {
        if (!Ae(r) && r !== null) throw We(n);
        return r;
      },
      (r) => {
        throw We(`${t} rejected with ${r}`);
      },
    );
  if (!Ae(e) && e !== null) throw We(n);
  return e;
}
function Za(e, t, n, r) {
  const { beforeSend: s, beforeSendTransaction: o, beforeSendSpan: i } = t;
  let a = n;
  if (tn(a) && s) return s(a, r);
  if ($s(a)) {
    if (i) {
      const c = i(Ka(a));
      if ((c ? (a = Ce(n, za(c))) : rr(), a.spans)) {
        const u = [];
        for (const l of a.spans) {
          const d = i(l);
          d ? u.push(d) : (rr(), u.push(l));
        }
        a.spans = u;
      }
    }
    if (o) {
      if (a.spans) {
        const c = a.spans.length;
        a.sdkProcessingMetadata = {
          ...n.sdkProcessingMetadata,
          spanCountBeforeProcessing: c,
        };
      }
      return o(a, r);
    }
  }
  return a;
}
function tn(e) {
  return e.type === void 0;
}
function $s(e) {
  return e.type === "transaction";
}
function ec(e) {
  return [
    {
      type: "log",
      item_count: e.length,
      content_type: "application/vnd.sentry.items.log+json",
    },
    { items: e },
  ];
}
function tc(e, t, n, r) {
  const s = {};
  return (
    t != null &&
      t.sdk &&
      (s.sdk = { name: t.sdk.name, version: t.sdk.version }),
    n && r && (s.dsn = pt(r)),
    Pe(s, [ec(e)])
  );
}
O._sentryClientToLogBufferMap = new WeakMap();
function kt(e, t) {
  var o;
  const n = nc(e) ?? [];
  if (n.length === 0) return;
  const r = e.getOptions(),
    s = tc(n, r._metadata, r.tunnel, e.getDsn());
  ((o = O._sentryClientToLogBufferMap) == null || o.set(e, []),
    e.emit("flushLogs"),
    e.sendEnvelope(s));
}
function nc(e) {
  var t;
  return (t = O._sentryClientToLogBufferMap) == null ? void 0 : t.get(e);
}
const js = Symbol.for("SentryBufferFullError");
function rc(e) {
  const t = [];
  function n() {
    return e === void 0 || t.length < e;
  }
  function r(i) {
    return t.splice(t.indexOf(i), 1)[0] || Promise.resolve(void 0);
  }
  function s(i) {
    if (!n()) return nt(js);
    const a = i();
    return (
      t.indexOf(a) === -1 && t.push(a),
      a.then(() => r(a)).then(null, () => r(a).then(null, () => {})),
      a
    );
  }
  function o(i) {
    return new Z((a, c) => {
      let u = t.length;
      if (!u) return a(!0);
      const l = setTimeout(() => {
        i && i > 0 && a(!1);
      }, i);
      t.forEach((d) => {
        ce(d).then(() => {
          --u || (clearTimeout(l), a(!0));
        }, c);
      });
    });
  }
  return { $: t, add: s, drain: o };
}
const sc = 60 * 1e3;
function oc(e, t = Date.now()) {
  const n = parseInt(`${e}`, 10);
  if (!isNaN(n)) return n * 1e3;
  const r = Date.parse(`${e}`);
  return isNaN(r) ? sc : r - t;
}
function ic(e, t) {
  return e[t] || e.all || 0;
}
function ac(e, t, n = Date.now()) {
  return ic(e, t) > n;
}
function cc(e, { statusCode: t, headers: n }, r = Date.now()) {
  const s = { ...e },
    o = n == null ? void 0 : n["x-sentry-rate-limits"],
    i = n == null ? void 0 : n["retry-after"];
  if (o)
    for (const a of o.trim().split(",")) {
      const [c, u, , , l] = a.split(":", 5),
        d = parseInt(c, 10),
        E = (isNaN(d) ? 60 : d) * 1e3;
      if (!u) s.all = r + E;
      else
        for (const y of u.split(";"))
          y === "metric_bucket"
            ? (!l || l.split(";").includes("custom")) && (s[y] = r + E)
            : (s[y] = r + E);
    }
  else i ? (s.all = r + oc(i, r)) : t === 429 && (s.all = r + 60 * 1e3);
  return s;
}
const uc = 64;
function lc(e, t, n = rc(e.bufferSize || uc)) {
  let r = {};
  const s = (i) => n.drain(i);
  function o(i) {
    const a = [];
    if (
      (cr(i, (d, E) => {
        const y = ur(E);
        ac(r, y) ? e.recordDroppedEvent("ratelimit_backoff", y) : a.push(d);
      }),
      a.length === 0)
    )
      return ce({});
    const c = Pe(i[0], a),
      u = (d) => {
        cr(c, (E, y) => {
          e.recordDroppedEvent(d, ur(y));
        });
      },
      l = () =>
        t({ body: Ea(c) }).then(
          (d) => (
            d.statusCode !== void 0 &&
              (d.statusCode < 200 || d.statusCode >= 300) &&
              I &&
              w.warn(
                `Sentry responded with status code ${d.statusCode} to sent event.`,
              ),
            (r = cc(r, d)),
            d
          ),
          (d) => {
            throw (
              u("network_error"),
              I && w.error("Encountered error running transport request:", d),
              d
            );
          },
        );
    return n.add(l).then(
      (d) => d,
      (d) => {
        if (d === js)
          return (
            I && w.error("Skipped sending event because buffer is full."),
            u("queue_overflow"),
            ce({})
          );
        throw d;
      },
    );
  }
  return { send: o, flush: s };
}
function fc(e) {
  var t;
  ((t = e.user) == null ? void 0 : t.ip_address) === void 0 &&
    (e.user = { ...e.user, ip_address: "{{auto}}" });
}
function dc(e) {
  var t;
  "aggregates" in e
    ? ((t = e.attrs) == null ? void 0 : t.ip_address) === void 0 &&
      (e.attrs = { ...e.attrs, ip_address: "{{auto}}" })
    : e.ipAddress === void 0 && (e.ipAddress = "{{auto}}");
}
function pc(e, t, n = [t], r = "npm") {
  const s = e._metadata || {};
  (s.sdk ||
    (s.sdk = {
      name: `sentry.javascript.${t}`,
      packages: n.map((o) => ({ name: `${r}:@sentry/${o}`, version: re })),
      version: re,
    }),
    (e._metadata = s));
}
const hc = 100;
function ue(e, t) {
  const n = F(),
    r = De();
  if (!n) return;
  const { beforeBreadcrumb: s = null, maxBreadcrumbs: o = hc } = n.getOptions();
  if (o <= 0) return;
  const a = { timestamp: Ne(), ...e },
    c = s ? ft(() => s(a, t)) : a;
  c !== null &&
    (n.emit && n.emit("beforeAddBreadcrumb", c, t), r.addBreadcrumb(c, o));
}
let br;
const mc = "FunctionToString",
  Sr = new WeakMap(),
  gc = () => ({
    name: mc,
    setupOnce() {
      br = Function.prototype.toString;
      try {
        Function.prototype.toString = function (...e) {
          const t = vn(this),
            n = Sr.has(F()) && t !== void 0 ? t : this;
          return br.apply(n, e);
        };
      } catch {}
    },
    setup(e) {
      Sr.set(e, !0);
    },
  }),
  yc = gc,
  _c = [
    /^Script error\.?$/,
    /^Javascript error: Script error\.? on line 0$/,
    /^ResizeObserver loop completed with undelivered notifications.$/,
    /^Cannot redefine property: googletag$/,
    /^Can't find variable: gmo$/,
    /^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,
    `can't redefine non-configurable property "solana"`,
    "vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)",
    "Can't find variable: _AutofillCallbackHandler",
    /^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,
    /^Java exception was raised during method invocation$/,
  ],
  Ec = "EventFilters",
  bc = (e = {}) => {
    let t;
    return {
      name: Ec,
      setup(n) {
        const r = n.getOptions();
        t = wr(e, r);
      },
      processEvent(n, r, s) {
        if (!t) {
          const o = s.getOptions();
          t = wr(e, o);
        }
        return wc(n, t) ? null : n;
      },
    };
  },
  Sc = (e = {}) => ({ ...bc(e), name: "InboundFilters" });
function wr(e = {}, t = {}) {
  return {
    allowUrls: [...(e.allowUrls || []), ...(t.allowUrls || [])],
    denyUrls: [...(e.denyUrls || []), ...(t.denyUrls || [])],
    ignoreErrors: [
      ...(e.ignoreErrors || []),
      ...(t.ignoreErrors || []),
      ...(e.disableErrorDefaults ? [] : _c),
    ],
    ignoreTransactions: [
      ...(e.ignoreTransactions || []),
      ...(t.ignoreTransactions || []),
    ],
  };
}
function wc(e, t) {
  if (e.type) {
    if (e.type === "transaction" && Rc(e, t.ignoreTransactions))
      return (
        I &&
          w.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${te(e)}`),
        !0
      );
  } else {
    if (Tc(e, t.ignoreErrors))
      return (
        I &&
          w.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${te(e)}`),
        !0
      );
    if (Ac(e))
      return (
        I &&
          w.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${te(e)}`),
        !0
      );
    if (vc(e, t.denyUrls))
      return (
        I &&
          w.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${te(e)}.
Url: ${rt(e)}`),
        !0
      );
    if (!Oc(e, t.allowUrls))
      return (
        I &&
          w.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${te(e)}.
Url: ${rt(e)}`),
        !0
      );
  }
  return !1;
}
function Tc(e, t) {
  return t != null && t.length ? Fs(e).some((n) => dt(n, t)) : !1;
}
function Rc(e, t) {
  if (!(t != null && t.length)) return !1;
  const n = e.transaction;
  return n ? dt(n, t) : !1;
}
function vc(e, t) {
  if (!(t != null && t.length)) return !1;
  const n = rt(e);
  return n ? dt(n, t) : !1;
}
function Oc(e, t) {
  if (!(t != null && t.length)) return !0;
  const n = rt(e);
  return n ? dt(n, t) : !0;
}
function Ic(e = []) {
  for (let t = e.length - 1; t >= 0; t--) {
    const n = e[t];
    if (n && n.filename !== "<anonymous>" && n.filename !== "[native code]")
      return n.filename || null;
  }
  return null;
}
function rt(e) {
  var t, n;
  try {
    const r = [...(((t = e.exception) == null ? void 0 : t.values) ?? [])]
        .reverse()
        .find((o) => {
          var i, a, c;
          return (
            ((i = o.mechanism) == null ? void 0 : i.parent_id) === void 0 &&
            ((c = (a = o.stacktrace) == null ? void 0 : a.frames) == null
              ? void 0
              : c.length)
          );
        }),
      s = (n = r == null ? void 0 : r.stacktrace) == null ? void 0 : n.frames;
    return s ? Ic(s) : null;
  } catch {
    return (I && w.error(`Cannot extract url for event ${te(e)}`), null);
  }
}
function Ac(e) {
  var t, n;
  return (n = (t = e.exception) == null ? void 0 : t.values) != null && n.length
    ? !e.message &&
        !e.exception.values.some(
          (r) => r.stacktrace || (r.type && r.type !== "Error") || r.value,
        )
    : !1;
}
function xc(e, t, n, r, s, o) {
  var a;
  if (
    !((a = s.exception) != null && a.values) ||
    !o ||
    !X(o.originalException, Error)
  )
    return;
  const i =
    s.exception.values.length > 0
      ? s.exception.values[s.exception.values.length - 1]
      : void 0;
  i &&
    (s.exception.values = nn(
      e,
      t,
      r,
      o.originalException,
      n,
      s.exception.values,
      i,
      0,
    ));
}
function nn(e, t, n, r, s, o, i, a) {
  if (o.length >= n + 1) return o;
  let c = [...o];
  if (X(r[s], Error)) {
    Tr(i, a);
    const u = e(t, r[s]),
      l = c.length;
    (Rr(u, s, l, a), (c = nn(e, t, n, r[s], s, [u, ...c], u, l)));
  }
  return (
    Array.isArray(r.errors) &&
      r.errors.forEach((u, l) => {
        if (X(u, Error)) {
          Tr(i, a);
          const d = e(t, u),
            E = c.length;
          (Rr(d, `errors[${l}]`, E, a),
            (c = nn(e, t, n, u, s, [d, ...c], d, E)));
        }
      }),
    c
  );
}
function Tr(e, t) {
  ((e.mechanism = e.mechanism || { type: "generic", handled: !0 }),
    (e.mechanism = {
      ...e.mechanism,
      ...(e.type === "AggregateError" && { is_exception_group: !0 }),
      exception_id: t,
    }));
}
function Rr(e, t, n, r) {
  ((e.mechanism = e.mechanism || { type: "generic", handled: !0 }),
    (e.mechanism = {
      ...e.mechanism,
      type: "chained",
      source: t,
      exception_id: n,
      parent_id: r,
    }));
}
function kc(e) {
  const t = "console";
  (de(t, e), pe(t, Nc));
}
function Nc() {
  "console" in O &&
    zt.forEach(function (e) {
      e in O.console &&
        j(O.console, e, function (t) {
          return (
            (et[e] = t),
            function (...n) {
              q("console", { args: n, level: e });
              const s = et[e];
              s == null || s.apply(O.console, n);
            }
          );
        });
    });
}
function Cc(e) {
  return e === "warn"
    ? "warning"
    : ["fatal", "error", "warning", "log", "info", "debug"].includes(e)
      ? e
      : "log";
}
const Dc = "Dedupe",
  Pc = () => {
    let e;
    return {
      name: Dc,
      processEvent(t) {
        if (t.type) return t;
        try {
          if (Fc(t, e))
            return (
              I &&
                w.warn(
                  "Event dropped due to being a duplicate of previously captured event.",
                ),
              null
            );
        } catch {}
        return (e = t);
      },
    };
  },
  Lc = Pc;
function Fc(e, t) {
  return t ? !!(Mc(e, t) || Uc(e, t)) : !1;
}
function Mc(e, t) {
  const n = e.message,
    r = t.message;
  return !(
    (!n && !r) ||
    (n && !r) ||
    (!n && r) ||
    n !== r ||
    !qs(e, t) ||
    !Bs(e, t)
  );
}
function Uc(e, t) {
  const n = vr(t),
    r = vr(e);
  return !(
    !n ||
    !r ||
    n.type !== r.type ||
    n.value !== r.value ||
    !qs(e, t) ||
    !Bs(e, t)
  );
}
function Bs(e, t) {
  let n = ir(e),
    r = ir(t);
  if (!n && !r) return !0;
  if ((n && !r) || (!n && r) || ((n = n), (r = r), r.length !== n.length))
    return !1;
  for (let s = 0; s < r.length; s++) {
    const o = r[s],
      i = n[s];
    if (
      o.filename !== i.filename ||
      o.lineno !== i.lineno ||
      o.colno !== i.colno ||
      o.function !== i.function
    )
      return !1;
  }
  return !0;
}
function qs(e, t) {
  let n = e.fingerprint,
    r = t.fingerprint;
  if (!n && !r) return !0;
  if ((n && !r) || (!n && r)) return !1;
  ((n = n), (r = r));
  try {
    return n.join("") === r.join("");
  } catch {
    return !1;
  }
}
function vr(e) {
  var t;
  return (
    ((t = e.exception) == null ? void 0 : t.values) && e.exception.values[0]
  );
}
function Nt(e) {
  if (!e) return {};
  const t = e.match(
    /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/,
  );
  if (!t) return {};
  const n = t[6] || "",
    r = t[8] || "";
  return {
    host: t[4],
    path: t[5],
    protocol: t[2],
    search: n,
    hash: r,
    relative: t[5] + n + r,
  };
}
function Hs(e) {
  if (e !== void 0)
    return e >= 400 && e < 500 ? "warning" : e >= 500 ? "error" : void 0;
}
const xe = O;
function $c() {
  return "history" in xe && !!xe.history;
}
function jc() {
  if (!("fetch" in xe)) return !1;
  try {
    return (
      new Headers(),
      new Request("http://www.example.com"),
      new Response(),
      !0
    );
  } catch {
    return !1;
  }
}
function rn(e) {
  return (
    e && /^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString())
  );
}
function Bc() {
  var n;
  if (typeof EdgeRuntime == "string") return !0;
  if (!jc()) return !1;
  if (rn(xe.fetch)) return !0;
  let e = !1;
  const t = xe.document;
  if (t && typeof t.createElement == "function")
    try {
      const r = t.createElement("iframe");
      ((r.hidden = !0),
        t.head.appendChild(r),
        (n = r.contentWindow) != null &&
          n.fetch &&
          (e = rn(r.contentWindow.fetch)),
        t.head.removeChild(r));
    } catch (r) {
      fe &&
        w.warn(
          "Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
          r,
        );
    }
  return e;
}
function qc(e, t) {
  const n = "fetch";
  (de(n, e), pe(n, () => Hc(void 0, t)));
}
function Hc(e, t = !1) {
  (t && !Bc()) ||
    j(O, "fetch", function (n) {
      return function (...r) {
        const s = new Error(),
          { method: o, url: i } = Vc(r),
          a = {
            args: r,
            fetchData: { method: o, url: i },
            startTimestamp: z() * 1e3,
            virtualError: s,
            headers: Gc(r),
          };
        return (
          q("fetch", { ...a }),
          n.apply(O, r).then(
            async (c) => (
              q("fetch", { ...a, endTimestamp: z() * 1e3, response: c }),
              c
            ),
            (c) => {
              if (
                (q("fetch", { ...a, endTimestamp: z() * 1e3, error: c }),
                Sn(c) &&
                  c.stack === void 0 &&
                  ((c.stack = s.stack), ie(c, "framesToPop", 1)),
                c instanceof TypeError &&
                  (c.message === "Failed to fetch" ||
                    c.message === "Load failed" ||
                    c.message ===
                      "NetworkError when attempting to fetch resource."))
              )
                try {
                  const u = new URL(a.fetchData.url);
                  c.message = `${c.message} (${u.host})`;
                } catch {}
              throw c;
            },
          )
        );
      };
    });
}
function sn(e, t) {
  return !!e && typeof e == "object" && !!e[t];
}
function Or(e) {
  return typeof e == "string"
    ? e
    : e
      ? sn(e, "url")
        ? e.url
        : e.toString
          ? e.toString()
          : ""
      : "";
}
function Vc(e) {
  if (e.length === 0) return { method: "GET", url: "" };
  if (e.length === 2) {
    const [n, r] = e;
    return {
      url: Or(n),
      method: sn(r, "method") ? String(r.method).toUpperCase() : "GET",
    };
  }
  const t = e[0];
  return {
    url: Or(t),
    method: sn(t, "method") ? String(t.method).toUpperCase() : "GET",
  };
}
function Gc(e) {
  const [t, n] = e;
  try {
    if (typeof n == "object" && n !== null && "headers" in n && n.headers)
      return new Headers(n.headers);
    if (ai(t)) return new Headers(t.headers);
  } catch {}
}
function Jc() {
  return "npm";
}
const P = O;
let on = 0;
function Vs() {
  return on > 0;
}
function Wc() {
  (on++,
    setTimeout(() => {
      on--;
    }));
}
function be(e, t = {}) {
  function n(s) {
    return typeof s == "function";
  }
  if (!n(e)) return e;
  try {
    const s = e.__sentry_wrapped__;
    if (s) return typeof s == "function" ? s : e;
    if (vn(e)) return e;
  } catch {
    return e;
  }
  const r = function (...s) {
    try {
      const o = s.map((i) => be(i, t));
      return e.apply(this, o);
    } catch (o) {
      throw (
        Wc(),
        xi((i) => {
          (i.addEventProcessor(
            (a) => (
              t.mechanism && (Yt(a, void 0), ye(a, t.mechanism)),
              (a.extra = { ...a.extra, arguments: s }),
              a
            ),
          ),
            Ba(o));
        }),
        o
      );
    }
  };
  try {
    for (const s in e)
      Object.prototype.hasOwnProperty.call(e, s) && (r[s] = e[s]);
  } catch {}
  (ys(r, e), ie(e, "__sentry_wrapped__", r));
  try {
    Object.getOwnPropertyDescriptor(r, "name").configurable &&
      Object.defineProperty(r, "name", {
        get() {
          return e.name;
        },
      });
  } catch {}
  return r;
}
function xn(e, t) {
  const n = kn(e, t),
    r = { type: Qc(t), value: Zc(t) };
  return (
    n.length && (r.stacktrace = { frames: n }),
    r.type === void 0 &&
      r.value === "" &&
      (r.value = "Unrecoverable error caught"),
    r
  );
}
function Kc(e, t, n, r) {
  const s = F(),
    o = s == null ? void 0 : s.getOptions().normalizeDepth,
    i = su(t),
    a = { __serialized__: ks(t, o) };
  if (i) return { exception: { values: [xn(e, i)] }, extra: a };
  const c = {
    exception: {
      values: [
        {
          type: ut(t) ? t.constructor.name : r ? "UnhandledRejection" : "Error",
          value: nu(t, { isUnhandledRejection: r }),
        },
      ],
    },
    extra: a,
  };
  if (n) {
    const u = kn(e, n);
    u.length && (c.exception.values[0].stacktrace = { frames: u });
  }
  return c;
}
function Ct(e, t) {
  return { exception: { values: [xn(e, t)] } };
}
function kn(e, t) {
  const n = t.stacktrace || t.stack || "",
    r = Yc(t),
    s = Xc(t);
  try {
    return e(n, r, s);
  } catch {}
  return [];
}
const zc = /Minified React error #\d+;/i;
function Yc(e) {
  return e && zc.test(e.message) ? 1 : 0;
}
function Xc(e) {
  return typeof e.framesToPop == "number" ? e.framesToPop : 0;
}
function Gs(e) {
  return typeof WebAssembly < "u" && typeof WebAssembly.Exception < "u"
    ? e instanceof WebAssembly.Exception
    : !1;
}
function Qc(e) {
  const t = e == null ? void 0 : e.name;
  return !t && Gs(e)
    ? e.message && Array.isArray(e.message) && e.message.length == 2
      ? e.message[0]
      : "WebAssembly.Exception"
    : t;
}
function Zc(e) {
  const t = e == null ? void 0 : e.message;
  return Gs(e)
    ? Array.isArray(e.message) && e.message.length == 2
      ? e.message[1]
      : "wasm exception"
    : t
      ? t.error && typeof t.error.message == "string"
        ? t.error.message
        : t
      : "No error message";
}
function eu(e, t, n, r) {
  const s = (n == null ? void 0 : n.syntheticException) || void 0,
    o = Nn(e, t, s, r);
  return (
    ye(o),
    (o.level = "error"),
    n != null && n.event_id && (o.event_id = n.event_id),
    ce(o)
  );
}
function tu(e, t, n = "info", r, s) {
  const o = (r == null ? void 0 : r.syntheticException) || void 0,
    i = an(e, t, o, s);
  return (
    (i.level = n),
    r != null && r.event_id && (i.event_id = r.event_id),
    ce(i)
  );
}
function Nn(e, t, n, r, s) {
  let o;
  if (ps(t) && t.error) return Ct(e, t.error);
  if (Vn(t) || ri(t)) {
    const i = t;
    if ("stack" in t) o = Ct(e, t);
    else {
      const a = i.name || (Vn(i) ? "DOMError" : "DOMException"),
        c = i.message ? `${a}: ${i.message}` : a;
      ((o = an(e, c, n, r)), Yt(o, c));
    }
    return (
      "code" in i && (o.tags = { ...o.tags, "DOMException.code": `${i.code}` }),
      o
    );
  }
  return Sn(t)
    ? Ct(e, t)
    : Ae(t) || ut(t)
      ? ((o = Kc(e, t, n, s)), ye(o, { synthetic: !0 }), o)
      : ((o = an(e, t, n, r)), Yt(o, `${t}`), ye(o, { synthetic: !0 }), o);
}
function an(e, t, n, r) {
  const s = {};
  if (r && n) {
    const o = kn(e, n);
    (o.length &&
      (s.exception = { values: [{ value: t, stacktrace: { frames: o } }] }),
      ye(s, { synthetic: !0 }));
  }
  if (wn(t)) {
    const { __sentry_template_string__: o, __sentry_template_values__: i } = t;
    return ((s.logentry = { message: o, params: i }), s);
  }
  return ((s.message = t), s);
}
function nu(e, { isUnhandledRejection: t }) {
  const n = hi(e),
    r = t ? "promise rejection" : "exception";
  return ps(e)
    ? `Event \`ErrorEvent\` captured as ${r} with message \`${e.message}\``
    : ut(e)
      ? `Event \`${ru(e)}\` (type=${e.type}) captured as ${r}`
      : `Object captured as ${r} with keys: ${n}`;
}
function ru(e) {
  try {
    const t = Object.getPrototypeOf(e);
    return t ? t.constructor.name : void 0;
  } catch {}
}
function su(e) {
  for (const t in e)
    if (Object.prototype.hasOwnProperty.call(e, t)) {
      const n = e[t];
      if (n instanceof Error) return n;
    }
}
const ou = 5e3;
class iu extends Xa {
  constructor(t) {
    const n = { parentSpanIsAlwaysRootSpan: !0, ...t },
      r = P.SENTRY_SDK_SOURCE || Jc();
    (pc(n, "browser", ["browser"], r), super(n));
    const s = this,
      { sendDefaultPii: o, _experiments: i } = s._options,
      a = i == null ? void 0 : i.enableLogs;
    (n.sendClientReports &&
      P.document &&
      P.document.addEventListener("visibilitychange", () => {
        P.document.visibilityState === "hidden" &&
          (this._flushOutcomes(), a && kt(s));
      }),
      a &&
        (s.on("flush", () => {
          kt(s);
        }),
        s.on("afterCaptureLog", () => {
          (s._logFlushIdleTimeout && clearTimeout(s._logFlushIdleTimeout),
            (s._logFlushIdleTimeout = setTimeout(() => {
              kt(s);
            }, ou)));
        })),
      o && (s.on("postprocessEvent", fc), s.on("beforeSendSession", dc)));
  }
  eventFromException(t, n) {
    return eu(this._options.stackParser, t, n, this._options.attachStacktrace);
  }
  eventFromMessage(t, n = "info", r) {
    return tu(
      this._options.stackParser,
      t,
      n,
      r,
      this._options.attachStacktrace,
    );
  }
  _prepareEvent(t, n, r, s) {
    return (
      (t.platform = t.platform || "javascript"),
      super._prepareEvent(t, n, r, s)
    );
  }
}
const au = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__,
  M = O,
  cu = 1e3;
let Ir, cn, un;
function uu(e) {
  const t = "dom";
  (de(t, e), pe(t, lu));
}
function lu() {
  if (!M.document) return;
  const e = q.bind(null, "dom"),
    t = Ar(e, !0);
  (M.document.addEventListener("click", t, !1),
    M.document.addEventListener("keypress", t, !1),
    ["EventTarget", "Node"].forEach((n) => {
      var o, i;
      const s = (o = M[n]) == null ? void 0 : o.prototype;
      (i = s == null ? void 0 : s.hasOwnProperty) != null &&
        i.call(s, "addEventListener") &&
        (j(s, "addEventListener", function (a) {
          return function (c, u, l) {
            if (c === "click" || c == "keypress")
              try {
                const d = (this.__sentry_instrumentation_handlers__ =
                    this.__sentry_instrumentation_handlers__ || {}),
                  E = (d[c] = d[c] || { refCount: 0 });
                if (!E.handler) {
                  const y = Ar(e);
                  ((E.handler = y), a.call(this, c, y, l));
                }
                E.refCount++;
              } catch {}
            return a.call(this, c, u, l);
          };
        }),
        j(s, "removeEventListener", function (a) {
          return function (c, u, l) {
            if (c === "click" || c == "keypress")
              try {
                const d = this.__sentry_instrumentation_handlers__ || {},
                  E = d[c];
                E &&
                  (E.refCount--,
                  E.refCount <= 0 &&
                    (a.call(this, c, E.handler, l),
                    (E.handler = void 0),
                    delete d[c]),
                  Object.keys(d).length === 0 &&
                    delete this.__sentry_instrumentation_handlers__);
              } catch {}
            return a.call(this, c, u, l);
          };
        }));
    }));
}
function fu(e) {
  if (e.type !== cn) return !1;
  try {
    if (!e.target || e.target._sentryId !== un) return !1;
  } catch {}
  return !0;
}
function du(e, t) {
  return e !== "keypress"
    ? !1
    : t != null && t.tagName
      ? !(
          t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable
        )
      : !0;
}
function Ar(e, t = !1) {
  return (n) => {
    if (!n || n._sentryCaptured) return;
    const r = pu(n);
    if (du(n.type, r)) return;
    (ie(n, "_sentryCaptured", !0),
      r && !r._sentryId && ie(r, "_sentryId", B()));
    const s = n.type === "keypress" ? "input" : n.type;
    (fu(n) ||
      (e({ event: n, name: s, global: t }),
      (cn = n.type),
      (un = r ? r._sentryId : void 0)),
      clearTimeout(Ir),
      (Ir = M.setTimeout(() => {
        ((un = void 0), (cn = void 0));
      }, cu)));
  };
}
function pu(e) {
  try {
    return e.target;
  } catch {
    return null;
  }
}
let He;
function Js(e) {
  const t = "history";
  (de(t, e), pe(t, hu));
}
function hu() {
  if (
    (M.addEventListener("popstate", () => {
      const t = M.location.href,
        n = He;
      if (((He = t), n === t)) return;
      q("history", { from: n, to: t });
    }),
    !$c())
  )
    return;
  function e(t) {
    return function (...n) {
      const r = n.length > 2 ? n[2] : void 0;
      if (r) {
        const s = He,
          o = String(r);
        if (((He = o), s === o)) return t.apply(this, n);
        q("history", { from: s, to: o });
      }
      return t.apply(this, n);
    };
  }
  (j(M.history, "pushState", e), j(M.history, "replaceState", e));
}
const Ke = {};
function mu(e) {
  const t = Ke[e];
  if (t) return t;
  let n = M[e];
  if (rn(n)) return (Ke[e] = n.bind(M));
  const r = M.document;
  if (r && typeof r.createElement == "function")
    try {
      const s = r.createElement("iframe");
      ((s.hidden = !0), r.head.appendChild(s));
      const o = s.contentWindow;
      (o != null && o[e] && (n = o[e]), r.head.removeChild(s));
    } catch (s) {
      au &&
        w.warn(
          `Could not create sandbox iframe for ${e} check, bailing to window.${e}: `,
          s,
        );
    }
  return n && (Ke[e] = n.bind(M));
}
function xr(e) {
  Ke[e] = void 0;
}
const Ie = "__sentry_xhr_v3__";
function gu(e) {
  const t = "xhr";
  (de(t, e), pe(t, yu));
}
function yu() {
  if (!M.XMLHttpRequest) return;
  const e = XMLHttpRequest.prototype;
  ((e.open = new Proxy(e.open, {
    apply(t, n, r) {
      const s = new Error(),
        o = z() * 1e3,
        i = K(r[0]) ? r[0].toUpperCase() : void 0,
        a = _u(r[1]);
      if (!i || !a) return t.apply(n, r);
      ((n[Ie] = { method: i, url: a, request_headers: {} }),
        i === "POST" &&
          a.match(/sentry_key/) &&
          (n.__sentry_own_request__ = !0));
      const c = () => {
        const u = n[Ie];
        if (u && n.readyState === 4) {
          try {
            u.status_code = n.status;
          } catch {}
          const l = {
            endTimestamp: z() * 1e3,
            startTimestamp: o,
            xhr: n,
            virtualError: s,
          };
          q("xhr", l);
        }
      };
      return (
        "onreadystatechange" in n && typeof n.onreadystatechange == "function"
          ? (n.onreadystatechange = new Proxy(n.onreadystatechange, {
              apply(u, l, d) {
                return (c(), u.apply(l, d));
              },
            }))
          : n.addEventListener("readystatechange", c),
        (n.setRequestHeader = new Proxy(n.setRequestHeader, {
          apply(u, l, d) {
            const [E, y] = d,
              b = l[Ie];
            return (
              b && K(E) && K(y) && (b.request_headers[E.toLowerCase()] = y),
              u.apply(l, d)
            );
          },
        })),
        t.apply(n, r)
      );
    },
  })),
    (e.send = new Proxy(e.send, {
      apply(t, n, r) {
        const s = n[Ie];
        if (!s) return t.apply(n, r);
        r[0] !== void 0 && (s.body = r[0]);
        const o = { startTimestamp: z() * 1e3, xhr: n };
        return (q("xhr", o), t.apply(n, r));
      },
    })));
}
function _u(e) {
  if (K(e)) return e;
  try {
    return e.toString();
  } catch {}
}
function Eu(e, t = mu("fetch")) {
  let n = 0,
    r = 0;
  function s(o) {
    const i = o.body.length;
    ((n += i), r++);
    const a = {
      body: o.body,
      method: "POST",
      referrerPolicy: "strict-origin",
      headers: e.headers,
      keepalive: n <= 6e4 && r < 15,
      ...e.fetchOptions,
    };
    if (!t) return (xr("fetch"), nt("No fetch implementation available"));
    try {
      return t(e.url, a).then(
        (c) => (
          (n -= i),
          r--,
          {
            statusCode: c.status,
            headers: {
              "x-sentry-rate-limits": c.headers.get("X-Sentry-Rate-Limits"),
              "retry-after": c.headers.get("Retry-After"),
            },
          }
        ),
      );
    } catch (c) {
      return (xr("fetch"), (n -= i), r--, nt(c));
    }
  }
  return lc(e, s);
}
const bu = 30,
  Su = 50;
function ln(e, t, n, r) {
  const s = { filename: e, function: t === "<anonymous>" ? ae : t, in_app: !0 };
  return (n !== void 0 && (s.lineno = n), r !== void 0 && (s.colno = r), s);
}
const wu = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,
  Tu =
    /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
  Ru = /\((\S*)(?::(\d+))(?::(\d+))\)/,
  vu = (e) => {
    const t = wu.exec(e);
    if (t) {
      const [, r, s, o] = t;
      return ln(r, ae, +s, +o);
    }
    const n = Tu.exec(e);
    if (n) {
      if (n[2] && n[2].indexOf("eval") === 0) {
        const i = Ru.exec(n[2]);
        i && ((n[2] = i[1]), (n[3] = i[2]), (n[4] = i[3]));
      }
      const [s, o] = Ws(n[1] || ae, n[2]);
      return ln(o, s, n[3] ? +n[3] : void 0, n[4] ? +n[4] : void 0);
    }
  },
  Ou = [bu, vu],
  Iu =
    /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,
  Au = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
  xu = (e) => {
    const t = Iu.exec(e);
    if (t) {
      if (t[3] && t[3].indexOf(" > eval") > -1) {
        const o = Au.exec(t[3]);
        o &&
          ((t[1] = t[1] || "eval"), (t[3] = o[1]), (t[4] = o[2]), (t[5] = ""));
      }
      let r = t[3],
        s = t[1] || ae;
      return (
        ([s, r] = Ws(s, r)),
        ln(r, s, t[4] ? +t[4] : void 0, t[5] ? +t[5] : void 0)
      );
    }
  },
  ku = [Su, xu],
  Nu = [Ou, ku],
  Cu = Qi(...Nu),
  Ws = (e, t) => {
    const n = e.indexOf("safari-extension") !== -1,
      r = e.indexOf("safari-web-extension") !== -1;
    return n || r
      ? [
          e.indexOf("@") !== -1 ? e.split("@")[0] : ae,
          n ? `safari-extension:${t}` : `safari-web-extension:${t}`,
        ]
      : [e, t];
  },
  Cn = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__,
  Ve = 1024,
  Du = "Breadcrumbs",
  Pu = (e = {}) => {
    const t = {
      console: !0,
      dom: !0,
      fetch: !0,
      history: !0,
      sentry: !0,
      xhr: !0,
      ...e,
    };
    return {
      name: Du,
      setup(n) {
        (t.console && kc(Uu(n)),
          t.dom && uu(Mu(n, t.dom)),
          t.xhr && gu($u(n)),
          t.fetch && qc(ju(n)),
          t.history && Js(Bu(n)),
          t.sentry && n.on("beforeSendEvent", Fu(n)));
      },
    };
  },
  Lu = Pu;
function Fu(e) {
  return function (n) {
    F() === e &&
      ue(
        {
          category: `sentry.${n.type === "transaction" ? "transaction" : "event"}`,
          event_id: n.event_id,
          level: n.level,
          message: te(n),
        },
        { event: n },
      );
  };
}
function Mu(e, t) {
  return function (r) {
    if (F() !== e) return;
    let s,
      o,
      i = typeof t == "object" ? t.serializeAttribute : void 0,
      a =
        typeof t == "object" && typeof t.maxStringLength == "number"
          ? t.maxStringLength
          : void 0;
    (a &&
      a > Ve &&
      (Cn &&
        w.warn(
          `\`dom.maxStringLength\` cannot exceed ${Ve}, but a value of ${a} was configured. Sentry will use ${Ve} instead.`,
        ),
      (a = Ve)),
      typeof i == "string" && (i = [i]));
    try {
      const u = r.event,
        l = qu(u) ? u.target : u;
      ((s = ms(l, { keyAttrs: i, maxStringLength: a })), (o = li(l)));
    } catch {
      s = "<unknown>";
    }
    if (s.length === 0) return;
    const c = { category: `ui.${r.name}`, message: s };
    (o && (c.data = { "ui.component_name": o }),
      ue(c, { event: r.event, name: r.name, global: r.global }));
  };
}
function Uu(e) {
  return function (n) {
    if (F() !== e) return;
    const r = {
      category: "console",
      data: { arguments: n.args, logger: "console" },
      level: Cc(n.level),
      message: Gn(n.args, " "),
    };
    if (n.level === "assert")
      if (n.args[0] === !1)
        ((r.message = `Assertion failed: ${Gn(n.args.slice(1), " ") || "console.assert"}`),
          (r.data.arguments = n.args.slice(1)));
      else return;
    ue(r, { input: n.args, level: n.level });
  };
}
function $u(e) {
  return function (n) {
    if (F() !== e) return;
    const { startTimestamp: r, endTimestamp: s } = n,
      o = n.xhr[Ie];
    if (!r || !s || !o) return;
    const { method: i, url: a, status_code: c, body: u } = o,
      l = { method: i, url: a, status_code: c },
      d = { xhr: n.xhr, input: u, startTimestamp: r, endTimestamp: s },
      E = { category: "xhr", data: l, type: "http", level: Hs(c) };
    (e.emit("beforeOutgoingRequestBreadcrumb", E, d), ue(E, d));
  };
}
function ju(e) {
  return function (n) {
    if (F() !== e) return;
    const { startTimestamp: r, endTimestamp: s } = n;
    if (
      s &&
      !(n.fetchData.url.match(/sentry_key/) && n.fetchData.method === "POST")
    )
      if ((n.fetchData.method, n.fetchData.url, n.error)) {
        const o = n.fetchData,
          i = {
            data: n.error,
            input: n.args,
            startTimestamp: r,
            endTimestamp: s,
          },
          a = { category: "fetch", data: o, level: "error", type: "http" };
        (e.emit("beforeOutgoingRequestBreadcrumb", a, i), ue(a, i));
      } else {
        const o = n.response,
          i = { ...n.fetchData, status_code: o == null ? void 0 : o.status };
        (n.fetchData.request_body_size,
          n.fetchData.response_body_size,
          o == null || o.status);
        const a = {
            input: n.args,
            response: o,
            startTimestamp: r,
            endTimestamp: s,
          },
          c = {
            category: "fetch",
            data: i,
            type: "http",
            level: Hs(i.status_code),
          };
        (e.emit("beforeOutgoingRequestBreadcrumb", c, a), ue(c, a));
      }
  };
}
function Bu(e) {
  return function (n) {
    if (F() !== e) return;
    let r = n.from,
      s = n.to;
    const o = Nt(P.location.href);
    let i = r ? Nt(r) : void 0;
    const a = Nt(s);
    ((i != null && i.path) || (i = o),
      o.protocol === a.protocol && o.host === a.host && (s = a.relative),
      o.protocol === i.protocol && o.host === i.host && (r = i.relative),
      ue({ category: "navigation", data: { from: r, to: s } }));
  };
}
function qu(e) {
  return !!e && !!e.target;
}
const Hu = [
    "EventTarget",
    "Window",
    "Node",
    "ApplicationCache",
    "AudioTrackList",
    "BroadcastChannel",
    "ChannelMergerNode",
    "CryptoOperation",
    "EventSource",
    "FileReader",
    "HTMLUnknownElement",
    "IDBDatabase",
    "IDBRequest",
    "IDBTransaction",
    "KeyOperation",
    "MediaController",
    "MessagePort",
    "ModalWindow",
    "Notification",
    "SVGElementInstance",
    "Screen",
    "SharedWorker",
    "TextTrack",
    "TextTrackCue",
    "TextTrackList",
    "WebSocket",
    "WebSocketWorker",
    "Worker",
    "XMLHttpRequest",
    "XMLHttpRequestEventTarget",
    "XMLHttpRequestUpload",
  ],
  Vu = "BrowserApiErrors",
  Gu = (e = {}) => {
    const t = {
      XMLHttpRequest: !0,
      eventTarget: !0,
      requestAnimationFrame: !0,
      setInterval: !0,
      setTimeout: !0,
      ...e,
    };
    return {
      name: Vu,
      setupOnce() {
        (t.setTimeout && j(P, "setTimeout", kr),
          t.setInterval && j(P, "setInterval", kr),
          t.requestAnimationFrame && j(P, "requestAnimationFrame", Wu),
          t.XMLHttpRequest &&
            "XMLHttpRequest" in P &&
            j(XMLHttpRequest.prototype, "send", Ku));
        const n = t.eventTarget;
        n && (Array.isArray(n) ? n : Hu).forEach(zu);
      },
    };
  },
  Ju = Gu;
function kr(e) {
  return function (...t) {
    const n = t[0];
    return (
      (t[0] = be(n, {
        mechanism: {
          data: { function: Q(e) },
          handled: !1,
          type: "instrument",
        },
      })),
      e.apply(this, t)
    );
  };
}
function Wu(e) {
  return function (t) {
    return e.apply(this, [
      be(t, {
        mechanism: {
          data: { function: "requestAnimationFrame", handler: Q(e) },
          handled: !1,
          type: "instrument",
        },
      }),
    ]);
  };
}
function Ku(e) {
  return function (...t) {
    const n = this;
    return (
      ["onload", "onerror", "onprogress", "onreadystatechange"].forEach((s) => {
        s in n &&
          typeof n[s] == "function" &&
          j(n, s, function (o) {
            const i = {
                mechanism: {
                  data: { function: s, handler: Q(o) },
                  handled: !1,
                  type: "instrument",
                },
              },
              a = vn(o);
            return (a && (i.mechanism.data.handler = Q(a)), be(o, i));
          });
      }),
      e.apply(this, t)
    );
  };
}
function zu(e) {
  var r, s;
  const n = (r = P[e]) == null ? void 0 : r.prototype;
  (s = n == null ? void 0 : n.hasOwnProperty) != null &&
    s.call(n, "addEventListener") &&
    (j(n, "addEventListener", function (o) {
      return function (i, a, c) {
        try {
          Yu(a) &&
            (a.handleEvent = be(a.handleEvent, {
              mechanism: {
                data: { function: "handleEvent", handler: Q(a), target: e },
                handled: !1,
                type: "instrument",
              },
            }));
        } catch {}
        return o.apply(this, [
          i,
          be(a, {
            mechanism: {
              data: { function: "addEventListener", handler: Q(a), target: e },
              handled: !1,
              type: "instrument",
            },
          }),
          c,
        ]);
      };
    }),
    j(n, "removeEventListener", function (o) {
      return function (i, a, c) {
        try {
          const u = a.__sentry_wrapped__;
          u && o.call(this, i, u, c);
        } catch {}
        return o.call(this, i, a, c);
      };
    }));
}
function Yu(e) {
  return typeof e.handleEvent == "function";
}
const Xu = () => ({
    name: "BrowserSession",
    setupOnce() {
      if (typeof P.document > "u") {
        Cn &&
          w.warn(
            "Using the `browserSessionIntegration` in non-browser environments is not supported.",
          );
        return;
      }
      (dr({ ignoreDuration: !0 }),
        pr(),
        Js(({ from: e, to: t }) => {
          e !== void 0 && e !== t && (dr({ ignoreDuration: !0 }), pr());
        }));
    },
  }),
  Qu = "GlobalHandlers",
  Zu = (e = {}) => {
    const t = { onerror: !0, onunhandledrejection: !0, ...e };
    return {
      name: Qu,
      setupOnce() {
        Error.stackTraceLimit = 50;
      },
      setup(n) {
        (t.onerror && (tl(n), Nr("onerror")),
          t.onunhandledrejection && (nl(n), Nr("onunhandledrejection")));
      },
    };
  },
  el = Zu;
function tl(e) {
  ea((t) => {
    const { stackParser: n, attachStacktrace: r } = Ks();
    if (F() !== e || Vs()) return;
    const { msg: s, url: o, line: i, column: a, error: c } = t,
      u = ol(Nn(n, c || s, void 0, r, !1), o, i, a);
    ((u.level = "error"),
      Cs(u, {
        originalException: c,
        mechanism: { handled: !1, type: "onerror" },
      }));
  });
}
function nl(e) {
  na((t) => {
    const { stackParser: n, attachStacktrace: r } = Ks();
    if (F() !== e || Vs()) return;
    const s = rl(t),
      o = Tn(s) ? sl(s) : Nn(n, s, void 0, r, !0);
    ((o.level = "error"),
      Cs(o, {
        originalException: s,
        mechanism: { handled: !1, type: "onunhandledrejection" },
      }));
  });
}
function rl(e) {
  if (Tn(e)) return e;
  try {
    if ("reason" in e) return e.reason;
    if ("detail" in e && "reason" in e.detail) return e.detail.reason;
  } catch {}
  return e;
}
function sl(e) {
  return {
    exception: {
      values: [
        {
          type: "UnhandledRejection",
          value: `Non-Error promise rejection captured with value: ${String(e)}`,
        },
      ],
    },
  };
}
function ol(e, t, n, r) {
  const s = (e.exception = e.exception || {}),
    o = (s.values = s.values || []),
    i = (o[0] = o[0] || {}),
    a = (i.stacktrace = i.stacktrace || {}),
    c = (a.frames = a.frames || []),
    u = r,
    l = n,
    d = K(t) && t.length > 0 ? t : gs();
  return (
    c.length === 0 &&
      c.push({ colno: u, filename: d, function: ae, in_app: !0, lineno: l }),
    e
  );
}
function Nr(e) {
  Cn && w.log(`Global Handler attached: ${e}`);
}
function Ks() {
  const e = F();
  return (
    (e == null ? void 0 : e.getOptions()) || {
      stackParser: () => [],
      attachStacktrace: !1,
    }
  );
}
const il = () => ({
    name: "HttpContext",
    preprocessEvent(e) {
      var i, a;
      if (!P.navigator && !P.location && !P.document) return;
      const t = ((i = e.request) == null ? void 0 : i.url) || gs(),
        { referrer: n } = P.document || {},
        { userAgent: r } = P.navigator || {},
        s = {
          ...((a = e.request) == null ? void 0 : a.headers),
          ...(n && { Referer: n }),
          ...(r && { "User-Agent": r }),
        },
        o = { ...e.request, ...(t && { url: t }), headers: s };
      e.request = o;
    },
  }),
  al = "cause",
  cl = 5,
  ul = "LinkedErrors",
  ll = (e = {}) => {
    const t = e.limit || cl,
      n = e.key || al;
    return {
      name: ul,
      preprocessEvent(r, s, o) {
        const i = o.getOptions();
        xc(xn, i.stackParser, n, t, r, s);
      },
    };
  },
  fl = ll;
function dl(e) {
  return [Sc(), yc(), Ju(), Lu(), el(), fl(), Lc(), il(), Xu()];
}
var Dt, Cr;
function pl() {
  if (Cr) return Dt;
  Cr = 1;
  var e = typeof Me == "object" && Me && Me.Object === Object && Me;
  return ((Dt = e), Dt);
}
var Pt, Dr;
function hl() {
  if (Dr) return Pt;
  Dr = 1;
  var e = pl(),
    t = typeof self == "object" && self && self.Object === Object && self,
    n = e || t || Function("return this")();
  return ((Pt = n), Pt);
}
var Lt, Pr;
function zs() {
  if (Pr) return Lt;
  Pr = 1;
  var e = hl(),
    t = e.Symbol;
  return ((Lt = t), Lt);
}
var Ft, Lr;
function ml() {
  if (Lr) return Ft;
  Lr = 1;
  var e = zs(),
    t = Object.prototype,
    n = t.hasOwnProperty,
    r = t.toString,
    s = e ? e.toStringTag : void 0;
  function o(i) {
    var a = n.call(i, s),
      c = i[s];
    try {
      i[s] = void 0;
      var u = !0;
    } catch {}
    var l = r.call(i);
    return (u && (a ? (i[s] = c) : delete i[s]), l);
  }
  return ((Ft = o), Ft);
}
var Mt, Fr;
function gl() {
  if (Fr) return Mt;
  Fr = 1;
  var e = Object.prototype,
    t = e.toString;
  function n(r) {
    return t.call(r);
  }
  return ((Mt = n), Mt);
}
var Ut, Mr;
function Ys() {
  if (Mr) return Ut;
  Mr = 1;
  var e = zs(),
    t = ml(),
    n = gl(),
    r = "[object Null]",
    s = "[object Undefined]",
    o = e ? e.toStringTag : void 0;
  function i(a) {
    return a == null
      ? a === void 0
        ? s
        : r
      : o && o in Object(a)
        ? t(a)
        : n(a);
  }
  return ((Ut = i), Ut);
}
var $t, Ur;
function yl() {
  if (Ur) return $t;
  Ur = 1;
  var e = Ys(),
    t = is(),
    n = "[object AsyncFunction]",
    r = "[object Function]",
    s = "[object GeneratorFunction]",
    o = "[object Proxy]";
  function i(a) {
    if (!t(a)) return !1;
    var c = e(a);
    return c == r || c == s || c == n || c == o;
  }
  return (($t = i), $t);
}
var _l = yl();
const El = En(_l),
  Dn = "sync:__STATE",
  Xs = () => ({
    instanceId: cs(),
    enabled: !0,
    darkMode: "system",
    compactList: !0,
    readAlerts: [],
    readAlertIds: [],
    openProposalPage: !0,
    lastLoginAttemptAt: null,
    lastCaptchaAttemptAt: null,
    feedType: Ro.MyFeed,
    product: null,
    subscription: null,
    lastCycleError: null,
    lastCycleStartedAt: 0,
    soundSettings: { volume: 100, enabled: !0 },
    schedulingEnabled: !1,
    schedules: [],
    usTimeFormat: !1,
    usernameHash: null,
  }),
  fn = () => oe.getItem(Dn, { fallback: Xs() }),
  bl = async (e) => {
    const t = El(e) ? e(await fn()) : { ...(await fn()), ...e };
    return (await oe.setItem(Dn, t), t);
  },
  Sl = (e) => oe.watch(Dn, e),
  wl = { addEventListener: Sl, getDefaultState: Xs, get: fn, save: bl },
  Tl = [
    "No SW",
    "Failed to fetch",
    "FILE_ERROR_NO_SPACE",
    "The browser is shutting down",
    "Extension context invalidated",
    "Corruption: block checksum mismatch",
    "Could not establish connection. Receiving end does not exist.",
  ],
  Pn = new iu({
    beforeSend: async (e, t) => {
      var r, s, o;
      const n =
        ((o =
          (s = (r = e.exception) == null ? void 0 : r.values) == null
            ? void 0
            : s[0]) == null
          ? void 0
          : o.value) || "";
      if (Tl.some((i) => n.toLowerCase().includes(i.toLowerCase())))
        return null;
      try {
        return {
          ...e,
          extra: { ...t.data, ...e.extra, globalState: await wl.get() },
        };
      } catch {
        return { ...e, extra: { ...e.extra, ...t.data } };
      }
    },
    dsn: "https://ea6708d40c9416f10d3930b0dbc10b48@o4509207413981184.ingest.de.sentry.io/4509207415488592",
    debug: !1,
    environment: "production",
    integrations: dl().filter(
      (e) =>
        !["BrowserApiErrors", "Breadcrumbs", "GlobalHandlers"].includes(e.name),
    ),
    release: Yo.version,
    stackParser: Cu,
    transport: Eu,
  }),
  Ln = new G();
Ln.setClient(Pn);
const jt = (e, t) => Pn.captureException(e, t, Ln),
  Od = (e, t) => Pn.captureEvent(e, t, Ln),
  Rl = (e) => new Promise((t) => setTimeout(t, e)),
  vl = { resolveIn: Rl };
function Qs(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: Ol } = Object.prototype,
  { getPrototypeOf: Fn } = Object,
  { iterator: ht, toStringTag: Zs } = Symbol,
  mt = ((e) => (t) => {
    const n = Ol.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  H = (e) => ((e = e.toLowerCase()), (t) => mt(t) === e),
  gt = (e) => (t) => typeof t === e,
  { isArray: Te } = Array,
  ke = gt("undefined");
function Il(e) {
  return (
    e !== null &&
    !ke(e) &&
    e.constructor !== null &&
    !ke(e.constructor) &&
    U(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const eo = H("ArrayBuffer");
function Al(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && eo(e.buffer)),
    t
  );
}
const xl = gt("string"),
  U = gt("function"),
  to = gt("number"),
  yt = (e) => e !== null && typeof e == "object",
  kl = (e) => e === !0 || e === !1,
  ze = (e) => {
    if (mt(e) !== "object") return !1;
    const t = Fn(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Zs in e) &&
      !(ht in e)
    );
  },
  Nl = H("Date"),
  Cl = H("File"),
  Dl = H("Blob"),
  Pl = H("FileList"),
  Ll = (e) => yt(e) && U(e.pipe),
  Fl = (e) => {
    let t;
    return (
      e &&
      ((typeof FormData == "function" && e instanceof FormData) ||
        (U(e.append) &&
          ((t = mt(e)) === "formdata" ||
            (t === "object" &&
              U(e.toString) &&
              e.toString() === "[object FormData]"))))
    );
  },
  Ml = H("URLSearchParams"),
  [Ul, $l, jl, Bl] = ["ReadableStream", "Request", "Response", "Headers"].map(
    H,
  ),
  ql = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Le(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let r, s;
  if ((typeof e != "object" && (e = [e]), Te(e)))
    for (r = 0, s = e.length; r < s; r++) t.call(null, e[r], r, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      i = o.length;
    let a;
    for (r = 0; r < i; r++) ((a = o[r]), t.call(null, e[a], a, e));
  }
}
function no(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length,
    s;
  for (; r-- > 0; ) if (((s = n[r]), t === s.toLowerCase())) return s;
  return null;
}
const ne =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : global,
  ro = (e) => !ke(e) && e !== ne;
function dn() {
  const { caseless: e } = (ro(this) && this) || {},
    t = {},
    n = (r, s) => {
      const o = (e && no(t, s)) || s;
      ze(t[o]) && ze(r)
        ? (t[o] = dn(t[o], r))
        : ze(r)
          ? (t[o] = dn({}, r))
          : Te(r)
            ? (t[o] = r.slice())
            : (t[o] = r);
    };
  for (let r = 0, s = arguments.length; r < s; r++)
    arguments[r] && Le(arguments[r], n);
  return t;
}
const Hl = (e, t, n, { allOwnKeys: r } = {}) => (
    Le(
      t,
      (s, o) => {
        n && U(s) ? (e[o] = Qs(s, n)) : (e[o] = s);
      },
      { allOwnKeys: r },
    ),
    e
  ),
  Vl = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  Gl = (e, t, n, r) => {
    ((e.prototype = Object.create(t.prototype, r)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, "super", { value: t.prototype }),
      n && Object.assign(e.prototype, n));
  },
  Jl = (e, t, n, r) => {
    let s, o, i;
    const a = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0; )
        ((i = s[o]),
          (!r || r(i, e, t)) && !a[i] && ((t[i] = e[i]), (a[i] = !0)));
      e = n !== !1 && Fn(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  Wl = (e, t, n) => {
    ((e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length));
    const r = e.indexOf(t, n);
    return r !== -1 && r === n;
  },
  Kl = (e) => {
    if (!e) return null;
    if (Te(e)) return e;
    let t = e.length;
    if (!to(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  zl = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && Fn(Uint8Array)),
  Yl = (e, t) => {
    const r = (e && e[ht]).call(e);
    let s;
    for (; (s = r.next()) && !s.done; ) {
      const o = s.value;
      t.call(e, o[0], o[1]);
    }
  },
  Xl = (e, t) => {
    let n;
    const r = [];
    for (; (n = e.exec(t)) !== null; ) r.push(n);
    return r;
  },
  Ql = H("HTMLFormElement"),
  Zl = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, s) {
      return r.toUpperCase() + s;
    }),
  $r = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  ef = H("RegExp"),
  so = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {};
    (Le(n, (s, o) => {
      let i;
      (i = t(s, o, e)) !== !1 && (r[o] = i || s);
    }),
      Object.defineProperties(e, r));
  },
  tf = (e) => {
    so(e, (t, n) => {
      if (U(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
        return !1;
      const r = e[n];
      if (U(r)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  nf = (e, t) => {
    const n = {},
      r = (s) => {
        s.forEach((o) => {
          n[o] = !0;
        });
      };
    return (Te(e) ? r(e) : r(String(e).split(t)), n);
  },
  rf = () => {},
  sf = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t);
function of(e) {
  return !!(e && U(e.append) && e[Zs] === "FormData" && e[ht]);
}
const af = (e) => {
    const t = new Array(10),
      n = (r, s) => {
        if (yt(r)) {
          if (t.indexOf(r) >= 0) return;
          if (!("toJSON" in r)) {
            t[s] = r;
            const o = Te(r) ? [] : {};
            return (
              Le(r, (i, a) => {
                const c = n(i, s + 1);
                !ke(c) && (o[a] = c);
              }),
              (t[s] = void 0),
              o
            );
          }
        }
        return r;
      };
    return n(e, 0);
  },
  cf = H("AsyncFunction"),
  uf = (e) => e && (yt(e) || U(e)) && U(e.then) && U(e.catch),
  oo = ((e, t) =>
    e
      ? setImmediate
      : t
        ? ((n, r) => (
            ne.addEventListener(
              "message",
              ({ source: s, data: o }) => {
                s === ne && o === n && r.length && r.shift()();
              },
              !1,
            ),
            (s) => {
              (r.push(s), ne.postMessage(n, "*"));
            }
          ))(`axios@${Math.random()}`, [])
        : (n) => setTimeout(n))(
    typeof setImmediate == "function",
    U(ne.postMessage),
  ),
  lf =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(ne)
      : (typeof process < "u" && process.nextTick) || oo,
  ff = (e) => e != null && U(e[ht]),
  p = {
    isArray: Te,
    isArrayBuffer: eo,
    isBuffer: Il,
    isFormData: Fl,
    isArrayBufferView: Al,
    isString: xl,
    isNumber: to,
    isBoolean: kl,
    isObject: yt,
    isPlainObject: ze,
    isReadableStream: Ul,
    isRequest: $l,
    isResponse: jl,
    isHeaders: Bl,
    isUndefined: ke,
    isDate: Nl,
    isFile: Cl,
    isBlob: Dl,
    isRegExp: ef,
    isFunction: U,
    isStream: Ll,
    isURLSearchParams: Ml,
    isTypedArray: zl,
    isFileList: Pl,
    forEach: Le,
    merge: dn,
    extend: Hl,
    trim: ql,
    stripBOM: Vl,
    inherits: Gl,
    toFlatObject: Jl,
    kindOf: mt,
    kindOfTest: H,
    endsWith: Wl,
    toArray: Kl,
    forEachEntry: Yl,
    matchAll: Xl,
    isHTMLForm: Ql,
    hasOwnProperty: $r,
    hasOwnProp: $r,
    reduceDescriptors: so,
    freezeMethods: tf,
    toObjectSet: nf,
    toCamelCase: Zl,
    noop: rf,
    toFiniteNumber: sf,
    findKey: no,
    global: ne,
    isContextDefined: ro,
    isSpecCompliantForm: of,
    toJSONObject: af,
    isAsyncFn: cf,
    isThenable: uf,
    setImmediate: oo,
    asap: lf,
    isIterable: ff,
  };
function T(e, t, n, r, s) {
  (Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = "AxiosError"),
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    s && ((this.response = s), (this.status = s.status ? s.status : null)));
}
p.inherits(T, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: p.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const io = T.prototype,
  ao = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((e) => {
  ao[e] = { value: e };
});
Object.defineProperties(T, ao);
Object.defineProperty(io, "isAxiosError", { value: !0 });
T.from = (e, t, n, r, s, o) => {
  const i = Object.create(io);
  return (
    p.toFlatObject(
      e,
      i,
      function (c) {
        return c !== Error.prototype;
      },
      (a) => a !== "isAxiosError",
    ),
    T.call(i, e.message, t, n, r, s),
    (i.cause = e),
    (i.name = e.name),
    o && Object.assign(i, o),
    i
  );
};
const df = null;
function pn(e) {
  return p.isPlainObject(e) || p.isArray(e);
}
function co(e) {
  return p.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function jr(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (s, o) {
          return ((s = co(s)), !n && o ? "[" + s + "]" : s);
        })
        .join(n ? "." : "")
    : t;
}
function pf(e) {
  return p.isArray(e) && !e.some(pn);
}
const hf = p.toFlatObject(p, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function _t(e, t, n) {
  if (!p.isObject(e)) throw new TypeError("target must be an object");
  ((t = t || new FormData()),
    (n = p.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (h, f) {
        return !p.isUndefined(f[h]);
      },
    )));
  const r = n.metaTokens,
    s = n.visitor || l,
    o = n.dots,
    i = n.indexes,
    c = (n.Blob || (typeof Blob < "u" && Blob)) && p.isSpecCompliantForm(t);
  if (!p.isFunction(s)) throw new TypeError("visitor must be a function");
  function u(b) {
    if (b === null) return "";
    if (p.isDate(b)) return b.toISOString();
    if (!c && p.isBlob(b))
      throw new T("Blob is not supported. Use a Buffer instead.");
    return p.isArrayBuffer(b) || p.isTypedArray(b)
      ? c && typeof Blob == "function"
        ? new Blob([b])
        : Buffer.from(b)
      : b;
  }
  function l(b, h, f) {
    let m = b;
    if (b && !f && typeof b == "object") {
      if (p.endsWith(h, "{}"))
        ((h = r ? h : h.slice(0, -2)), (b = JSON.stringify(b)));
      else if (
        (p.isArray(b) && pf(b)) ||
        ((p.isFileList(b) || p.endsWith(h, "[]")) && (m = p.toArray(b)))
      )
        return (
          (h = co(h)),
          m.forEach(function (_, S) {
            !(p.isUndefined(_) || _ === null) &&
              t.append(
                i === !0 ? jr([h], S, o) : i === null ? h : h + "[]",
                u(_),
              );
          }),
          !1
        );
    }
    return pn(b) ? !0 : (t.append(jr(f, h, o), u(b)), !1);
  }
  const d = [],
    E = Object.assign(hf, {
      defaultVisitor: l,
      convertValue: u,
      isVisitable: pn,
    });
  function y(b, h) {
    if (!p.isUndefined(b)) {
      if (d.indexOf(b) !== -1)
        throw Error("Circular reference detected in " + h.join("."));
      (d.push(b),
        p.forEach(b, function (m, g) {
          (!(p.isUndefined(m) || m === null) &&
            s.call(t, m, p.isString(g) ? g.trim() : g, h, E)) === !0 &&
            y(m, h ? h.concat(g) : [g]);
        }),
        d.pop());
    }
  }
  if (!p.isObject(e)) throw new TypeError("data must be an object");
  return (y(e), t);
}
function Br(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
    return t[r];
  });
}
function Mn(e, t) {
  ((this._pairs = []), e && _t(e, this, t));
}
const uo = Mn.prototype;
uo.append = function (t, n) {
  this._pairs.push([t, n]);
};
uo.toString = function (t) {
  const n = t
    ? function (r) {
        return t.call(this, r, Br);
      }
    : Br;
  return this._pairs
    .map(function (s) {
      return n(s[0]) + "=" + n(s[1]);
    }, "")
    .join("&");
};
function mf(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function lo(e, t, n) {
  if (!t) return e;
  const r = (n && n.encode) || mf;
  p.isFunction(n) && (n = { serialize: n });
  const s = n && n.serialize;
  let o;
  if (
    (s
      ? (o = s(t, n))
      : (o = p.isURLSearchParams(t) ? t.toString() : new Mn(t, n).toString(r)),
    o)
  ) {
    const i = e.indexOf("#");
    (i !== -1 && (e = e.slice(0, i)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + o));
  }
  return e;
}
class qr {
  constructor() {
    this.handlers = [];
  }
  use(t, n, r) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    p.forEach(this.handlers, function (r) {
      r !== null && t(r);
    });
  }
}
const fo = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  gf = typeof URLSearchParams < "u" ? URLSearchParams : Mn,
  yf = typeof FormData < "u" ? FormData : null,
  _f = typeof Blob < "u" ? Blob : null,
  Ef = {
    isBrowser: !0,
    classes: { URLSearchParams: gf, FormData: yf, Blob: _f },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  Un = typeof window < "u" && typeof document < "u",
  hn = (typeof navigator == "object" && navigator) || void 0,
  bf =
    Un &&
    (!hn || ["ReactNative", "NativeScript", "NS"].indexOf(hn.product) < 0),
  Sf =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  wf = (Un && window.location.href) || "http://localhost",
  Tf = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: Un,
        hasStandardBrowserEnv: bf,
        hasStandardBrowserWebWorkerEnv: Sf,
        navigator: hn,
        origin: wf,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  L = { ...Tf, ...Ef };
function Rf(e, t) {
  return _t(
    e,
    new L.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (n, r, s, o) {
          return L.isNode && p.isBuffer(n)
            ? (this.append(r, n.toString("base64")), !1)
            : o.defaultVisitor.apply(this, arguments);
        },
      },
      t,
    ),
  );
}
function vf(e) {
  return p
    .matchAll(/\w+|\[(\w*)]/g, e)
    .map((t) => (t[0] === "[]" ? "" : t[1] || t[0]));
}
function Of(e) {
  const t = {},
    n = Object.keys(e);
  let r;
  const s = n.length;
  let o;
  for (r = 0; r < s; r++) ((o = n[r]), (t[o] = e[o]));
  return t;
}
function po(e) {
  function t(n, r, s, o) {
    let i = n[o++];
    if (i === "__proto__") return !0;
    const a = Number.isFinite(+i),
      c = o >= n.length;
    return (
      (i = !i && p.isArray(s) ? s.length : i),
      c
        ? (p.hasOwnProp(s, i) ? (s[i] = [s[i], r]) : (s[i] = r), !a)
        : ((!s[i] || !p.isObject(s[i])) && (s[i] = []),
          t(n, r, s[i], o) && p.isArray(s[i]) && (s[i] = Of(s[i])),
          !a)
    );
  }
  if (p.isFormData(e) && p.isFunction(e.entries)) {
    const n = {};
    return (
      p.forEachEntry(e, (r, s) => {
        t(vf(r), s, n, 0);
      }),
      n
    );
  }
  return null;
}
function If(e, t, n) {
  if (p.isString(e))
    try {
      return ((t || JSON.parse)(e), p.trim(e));
    } catch (r) {
      if (r.name !== "SyntaxError") throw r;
    }
  return (n || JSON.stringify)(e);
}
const Fe = {
  transitional: fo,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (t, n) {
      const r = n.getContentType() || "",
        s = r.indexOf("application/json") > -1,
        o = p.isObject(t);
      if ((o && p.isHTMLForm(t) && (t = new FormData(t)), p.isFormData(t)))
        return s ? JSON.stringify(po(t)) : t;
      if (
        p.isArrayBuffer(t) ||
        p.isBuffer(t) ||
        p.isStream(t) ||
        p.isFile(t) ||
        p.isBlob(t) ||
        p.isReadableStream(t)
      )
        return t;
      if (p.isArrayBufferView(t)) return t.buffer;
      if (p.isURLSearchParams(t))
        return (
          n.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1,
          ),
          t.toString()
        );
      let a;
      if (o) {
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return Rf(t, this.formSerializer).toString();
        if ((a = p.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
          const c = this.env && this.env.FormData;
          return _t(
            a ? { "files[]": t } : t,
            c && new c(),
            this.formSerializer,
          );
        }
      }
      return o || s ? (n.setContentType("application/json", !1), If(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || Fe.transitional,
        r = n && n.forcedJSONParsing,
        s = this.responseType === "json";
      if (p.isResponse(t) || p.isReadableStream(t)) return t;
      if (t && p.isString(t) && ((r && !this.responseType) || s)) {
        const i = !(n && n.silentJSONParsing) && s;
        try {
          return JSON.parse(t);
        } catch (a) {
          if (i)
            throw a.name === "SyntaxError"
              ? T.from(a, T.ERR_BAD_RESPONSE, this, null, this.response)
              : a;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: L.classes.FormData, Blob: L.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
p.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Fe.headers[e] = {};
});
const Af = p.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  xf = (e) => {
    const t = {};
    let n, r, s;
    return (
      e &&
        e
          .split(
            `
`,
          )
          .forEach(function (i) {
            ((s = i.indexOf(":")),
              (n = i.substring(0, s).trim().toLowerCase()),
              (r = i.substring(s + 1).trim()),
              !(!n || (t[n] && Af[n])) &&
                (n === "set-cookie"
                  ? t[n]
                    ? t[n].push(r)
                    : (t[n] = [r])
                  : (t[n] = t[n] ? t[n] + ", " + r : r)));
          }),
      t
    );
  },
  Hr = Symbol("internals");
function Oe(e) {
  return e && String(e).trim().toLowerCase();
}
function Ye(e) {
  return e === !1 || e == null ? e : p.isArray(e) ? e.map(Ye) : String(e);
}
function kf(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = n.exec(e)); ) t[r[1]] = r[2];
  return t;
}
const Nf = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Bt(e, t, n, r, s) {
  if (p.isFunction(r)) return r.call(this, t, n);
  if ((s && (t = n), !!p.isString(t))) {
    if (p.isString(r)) return t.indexOf(r) !== -1;
    if (p.isRegExp(r)) return r.test(t);
  }
}
function Cf(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function Df(e, t) {
  const n = p.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function (s, o, i) {
        return this[r].call(this, t, s, o, i);
      },
      configurable: !0,
    });
  });
}
let $ = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const s = this;
    function o(a, c, u) {
      const l = Oe(c);
      if (!l) throw new Error("header name must be a non-empty string");
      const d = p.findKey(s, l);
      (!d || s[d] === void 0 || u === !0 || (u === void 0 && s[d] !== !1)) &&
        (s[d || c] = Ye(a));
    }
    const i = (a, c) => p.forEach(a, (u, l) => o(u, l, c));
    if (p.isPlainObject(t) || t instanceof this.constructor) i(t, n);
    else if (p.isString(t) && (t = t.trim()) && !Nf(t)) i(xf(t), n);
    else if (p.isObject(t) && p.isIterable(t)) {
      let a = {},
        c,
        u;
      for (const l of t) {
        if (!p.isArray(l))
          throw TypeError("Object iterator must return a key-value pair");
        a[(u = l[0])] = (c = a[u])
          ? p.isArray(c)
            ? [...c, l[1]]
            : [c, l[1]]
          : l[1];
      }
      i(a, n);
    } else t != null && o(n, t, r);
    return this;
  }
  get(t, n) {
    if (((t = Oe(t)), t)) {
      const r = p.findKey(this, t);
      if (r) {
        const s = this[r];
        if (!n) return s;
        if (n === !0) return kf(s);
        if (p.isFunction(n)) return n.call(this, s, r);
        if (p.isRegExp(n)) return n.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (((t = Oe(t)), t)) {
      const r = p.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || Bt(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let s = !1;
    function o(i) {
      if (((i = Oe(i)), i)) {
        const a = p.findKey(r, i);
        a && (!n || Bt(r, r[a], a, n)) && (delete r[a], (s = !0));
      }
    }
    return (p.isArray(t) ? t.forEach(o) : o(t), s);
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length,
      s = !1;
    for (; r--; ) {
      const o = n[r];
      (!t || Bt(this, this[o], o, t, !0)) && (delete this[o], (s = !0));
    }
    return s;
  }
  normalize(t) {
    const n = this,
      r = {};
    return (
      p.forEach(this, (s, o) => {
        const i = p.findKey(r, o);
        if (i) {
          ((n[i] = Ye(s)), delete n[o]);
          return;
        }
        const a = t ? Cf(o) : String(o).trim();
        (a !== o && delete n[o], (n[a] = Ye(s)), (r[a] = !0));
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = Object.create(null);
    return (
      p.forEach(this, (r, s) => {
        r != null && r !== !1 && (n[s] = t && p.isArray(r) ? r.join(", ") : r);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return (n.forEach((s) => r.set(s)), r);
  }
  static accessor(t) {
    const r = (this[Hr] = this[Hr] = { accessors: {} }).accessors,
      s = this.prototype;
    function o(i) {
      const a = Oe(i);
      r[a] || (Df(s, i), (r[a] = !0));
    }
    return (p.isArray(t) ? t.forEach(o) : o(t), this);
  }
};
$.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
p.reduceDescriptors($.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    },
  };
});
p.freezeMethods($);
function qt(e, t) {
  const n = this || Fe,
    r = t || n,
    s = $.from(r.headers);
  let o = r.data;
  return (
    p.forEach(e, function (a) {
      o = a.call(n, o, s.normalize(), t ? t.status : void 0);
    }),
    s.normalize(),
    o
  );
}
function ho(e) {
  return !!(e && e.__CANCEL__);
}
function Re(e, t, n) {
  (T.call(this, e ?? "canceled", T.ERR_CANCELED, t, n),
    (this.name = "CanceledError"));
}
p.inherits(Re, T, { __CANCEL__: !0 });
function mo(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new T(
          "Request failed with status code " + n.status,
          [T.ERR_BAD_REQUEST, T.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n,
        ),
      );
}
function Pf(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
function Lf(e, t) {
  e = e || 10;
  const n = new Array(e),
    r = new Array(e);
  let s = 0,
    o = 0,
    i;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (c) {
      const u = Date.now(),
        l = r[o];
      (i || (i = u), (n[s] = c), (r[s] = u));
      let d = o,
        E = 0;
      for (; d !== s; ) ((E += n[d++]), (d = d % e));
      if (((s = (s + 1) % e), s === o && (o = (o + 1) % e), u - i < t)) return;
      const y = l && u - l;
      return y ? Math.round((E * 1e3) / y) : void 0;
    }
  );
}
function Ff(e, t) {
  let n = 0,
    r = 1e3 / t,
    s,
    o;
  const i = (u, l = Date.now()) => {
    ((n = l), (s = null), o && (clearTimeout(o), (o = null)), e.apply(null, u));
  };
  return [
    (...u) => {
      const l = Date.now(),
        d = l - n;
      d >= r
        ? i(u, l)
        : ((s = u),
          o ||
            (o = setTimeout(() => {
              ((o = null), i(s));
            }, r - d)));
    },
    () => s && i(s),
  ];
}
const st = (e, t, n = 3) => {
    let r = 0;
    const s = Lf(50, 250);
    return Ff((o) => {
      const i = o.loaded,
        a = o.lengthComputable ? o.total : void 0,
        c = i - r,
        u = s(c),
        l = i <= a;
      r = i;
      const d = {
        loaded: i,
        total: a,
        progress: a ? i / a : void 0,
        bytes: c,
        rate: u || void 0,
        estimated: u && a && l ? (a - i) / u : void 0,
        event: o,
        lengthComputable: a != null,
        [t ? "download" : "upload"]: !0,
      };
      e(d);
    }, n);
  },
  Vr = (e, t) => {
    const n = e != null;
    return [(r) => t[0]({ lengthComputable: n, total: e, loaded: r }), t[1]];
  },
  Gr =
    (e) =>
    (...t) =>
      p.asap(() => e(...t)),
  Mf = L.hasStandardBrowserEnv
    ? ((e, t) => (n) => (
        (n = new URL(n, L.origin)),
        e.protocol === n.protocol &&
          e.host === n.host &&
          (t || e.port === n.port)
      ))(
        new URL(L.origin),
        L.navigator && /(msie|trident)/i.test(L.navigator.userAgent),
      )
    : () => !0,
  Uf = L.hasStandardBrowserEnv
    ? {
        write(e, t, n, r, s, o) {
          const i = [e + "=" + encodeURIComponent(t)];
          (p.isNumber(n) && i.push("expires=" + new Date(n).toGMTString()),
            p.isString(r) && i.push("path=" + r),
            p.isString(s) && i.push("domain=" + s),
            o === !0 && i.push("secure"),
            (document.cookie = i.join("; ")));
        },
        read(e) {
          const t = document.cookie.match(
            new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"),
          );
          return t ? decodeURIComponent(t[3]) : null;
        },
        remove(e) {
          this.write(e, "", Date.now() - 864e5);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function $f(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function jf(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function go(e, t, n) {
  let r = !$f(t);
  return e && (r || n == !1) ? jf(e, t) : t;
}
const Jr = (e) => (e instanceof $ ? { ...e } : e);
function le(e, t) {
  t = t || {};
  const n = {};
  function r(u, l, d, E) {
    return p.isPlainObject(u) && p.isPlainObject(l)
      ? p.merge.call({ caseless: E }, u, l)
      : p.isPlainObject(l)
        ? p.merge({}, l)
        : p.isArray(l)
          ? l.slice()
          : l;
  }
  function s(u, l, d, E) {
    if (p.isUndefined(l)) {
      if (!p.isUndefined(u)) return r(void 0, u, d, E);
    } else return r(u, l, d, E);
  }
  function o(u, l) {
    if (!p.isUndefined(l)) return r(void 0, l);
  }
  function i(u, l) {
    if (p.isUndefined(l)) {
      if (!p.isUndefined(u)) return r(void 0, u);
    } else return r(void 0, l);
  }
  function a(u, l, d) {
    if (d in t) return r(u, l);
    if (d in e) return r(void 0, u);
  }
  const c = {
    url: o,
    method: o,
    data: o,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: a,
    headers: (u, l, d) => s(Jr(u), Jr(l), d, !0),
  };
  return (
    p.forEach(Object.keys(Object.assign({}, e, t)), function (l) {
      const d = c[l] || s,
        E = d(e[l], t[l], l);
      (p.isUndefined(E) && d !== a) || (n[l] = E);
    }),
    n
  );
}
const yo = (e) => {
    const t = le({}, e);
    let {
      data: n,
      withXSRFToken: r,
      xsrfHeaderName: s,
      xsrfCookieName: o,
      headers: i,
      auth: a,
    } = t;
    ((t.headers = i = $.from(i)),
      (t.url = lo(
        go(t.baseURL, t.url, t.allowAbsoluteUrls),
        e.params,
        e.paramsSerializer,
      )),
      a &&
        i.set(
          "Authorization",
          "Basic " +
            btoa(
              (a.username || "") +
                ":" +
                (a.password ? unescape(encodeURIComponent(a.password)) : ""),
            ),
        ));
    let c;
    if (p.isFormData(n)) {
      if (L.hasStandardBrowserEnv || L.hasStandardBrowserWebWorkerEnv)
        i.setContentType(void 0);
      else if ((c = i.getContentType()) !== !1) {
        const [u, ...l] = c
          ? c
              .split(";")
              .map((d) => d.trim())
              .filter(Boolean)
          : [];
        i.setContentType([u || "multipart/form-data", ...l].join("; "));
      }
    }
    if (
      L.hasStandardBrowserEnv &&
      (r && p.isFunction(r) && (r = r(t)), r || (r !== !1 && Mf(t.url)))
    ) {
      const u = s && o && Uf.read(o);
      u && i.set(s, u);
    }
    return t;
  },
  Bf = typeof XMLHttpRequest < "u",
  qf =
    Bf &&
    function (e) {
      return new Promise(function (n, r) {
        const s = yo(e);
        let o = s.data;
        const i = $.from(s.headers).normalize();
        let { responseType: a, onUploadProgress: c, onDownloadProgress: u } = s,
          l,
          d,
          E,
          y,
          b;
        function h() {
          (y && y(),
            b && b(),
            s.cancelToken && s.cancelToken.unsubscribe(l),
            s.signal && s.signal.removeEventListener("abort", l));
        }
        let f = new XMLHttpRequest();
        (f.open(s.method.toUpperCase(), s.url, !0), (f.timeout = s.timeout));
        function m() {
          if (!f) return;
          const _ = $.from(
              "getAllResponseHeaders" in f && f.getAllResponseHeaders(),
            ),
            R = {
              data:
                !a || a === "text" || a === "json"
                  ? f.responseText
                  : f.response,
              status: f.status,
              statusText: f.statusText,
              headers: _,
              config: e,
              request: f,
            };
          (mo(
            function (C) {
              (n(C), h());
            },
            function (C) {
              (r(C), h());
            },
            R,
          ),
            (f = null));
        }
        ("onloadend" in f
          ? (f.onloadend = m)
          : (f.onreadystatechange = function () {
              !f ||
                f.readyState !== 4 ||
                (f.status === 0 &&
                  !(f.responseURL && f.responseURL.indexOf("file:") === 0)) ||
                setTimeout(m);
            }),
          (f.onabort = function () {
            f &&
              (r(new T("Request aborted", T.ECONNABORTED, e, f)), (f = null));
          }),
          (f.onerror = function () {
            (r(new T("Network Error", T.ERR_NETWORK, e, f)), (f = null));
          }),
          (f.ontimeout = function () {
            let S = s.timeout
              ? "timeout of " + s.timeout + "ms exceeded"
              : "timeout exceeded";
            const R = s.transitional || fo;
            (s.timeoutErrorMessage && (S = s.timeoutErrorMessage),
              r(
                new T(
                  S,
                  R.clarifyTimeoutError ? T.ETIMEDOUT : T.ECONNABORTED,
                  e,
                  f,
                ),
              ),
              (f = null));
          }),
          o === void 0 && i.setContentType(null),
          "setRequestHeader" in f &&
            p.forEach(i.toJSON(), function (S, R) {
              f.setRequestHeader(R, S);
            }),
          p.isUndefined(s.withCredentials) ||
            (f.withCredentials = !!s.withCredentials),
          a && a !== "json" && (f.responseType = s.responseType),
          u && (([E, b] = st(u, !0)), f.addEventListener("progress", E)),
          c &&
            f.upload &&
            (([d, y] = st(c)),
            f.upload.addEventListener("progress", d),
            f.upload.addEventListener("loadend", y)),
          (s.cancelToken || s.signal) &&
            ((l = (_) => {
              f &&
                (r(!_ || _.type ? new Re(null, e, f) : _),
                f.abort(),
                (f = null));
            }),
            s.cancelToken && s.cancelToken.subscribe(l),
            s.signal &&
              (s.signal.aborted
                ? l()
                : s.signal.addEventListener("abort", l))));
        const g = Pf(s.url);
        if (g && L.protocols.indexOf(g) === -1) {
          r(new T("Unsupported protocol " + g + ":", T.ERR_BAD_REQUEST, e));
          return;
        }
        f.send(o || null);
      });
    },
  Hf = (e, t) => {
    const { length: n } = (e = e ? e.filter(Boolean) : []);
    if (t || n) {
      let r = new AbortController(),
        s;
      const o = function (u) {
        if (!s) {
          ((s = !0), a());
          const l = u instanceof Error ? u : this.reason;
          r.abort(
            l instanceof T ? l : new Re(l instanceof Error ? l.message : l),
          );
        }
      };
      let i =
        t &&
        setTimeout(() => {
          ((i = null), o(new T(`timeout ${t} of ms exceeded`, T.ETIMEDOUT)));
        }, t);
      const a = () => {
        e &&
          (i && clearTimeout(i),
          (i = null),
          e.forEach((u) => {
            u.unsubscribe
              ? u.unsubscribe(o)
              : u.removeEventListener("abort", o);
          }),
          (e = null));
      };
      e.forEach((u) => u.addEventListener("abort", o));
      const { signal: c } = r;
      return ((c.unsubscribe = () => p.asap(a)), c);
    }
  },
  Vf = function* (e, t) {
    let n = e.byteLength;
    if (n < t) {
      yield e;
      return;
    }
    let r = 0,
      s;
    for (; r < n; ) ((s = r + t), yield e.slice(r, s), (r = s));
  },
  Gf = async function* (e, t) {
    for await (const n of Jf(e)) yield* Vf(n, t);
  },
  Jf = async function* (e) {
    if (e[Symbol.asyncIterator]) {
      yield* e;
      return;
    }
    const t = e.getReader();
    try {
      for (;;) {
        const { done: n, value: r } = await t.read();
        if (n) break;
        yield r;
      }
    } finally {
      await t.cancel();
    }
  },
  Wr = (e, t, n, r) => {
    const s = Gf(e, t);
    let o = 0,
      i,
      a = (c) => {
        i || ((i = !0), r && r(c));
      };
    return new ReadableStream(
      {
        async pull(c) {
          try {
            const { done: u, value: l } = await s.next();
            if (u) {
              (a(), c.close());
              return;
            }
            let d = l.byteLength;
            if (n) {
              let E = (o += d);
              n(E);
            }
            c.enqueue(new Uint8Array(l));
          } catch (u) {
            throw (a(u), u);
          }
        },
        cancel(c) {
          return (a(c), s.return());
        },
      },
      { highWaterMark: 2 },
    );
  },
  Et =
    typeof fetch == "function" &&
    typeof Request == "function" &&
    typeof Response == "function",
  _o = Et && typeof ReadableStream == "function",
  Wf =
    Et &&
    (typeof TextEncoder == "function"
      ? (
          (e) => (t) =>
            e.encode(t)
        )(new TextEncoder())
      : async (e) => new Uint8Array(await new Response(e).arrayBuffer())),
  Eo = (e, ...t) => {
    try {
      return !!e(...t);
    } catch {
      return !1;
    }
  },
  Kf =
    _o &&
    Eo(() => {
      let e = !1;
      const t = new Request(L.origin, {
        body: new ReadableStream(),
        method: "POST",
        get duplex() {
          return ((e = !0), "half");
        },
      }).headers.has("Content-Type");
      return e && !t;
    }),
  Kr = 64 * 1024,
  mn = _o && Eo(() => p.isReadableStream(new Response("").body)),
  ot = { stream: mn && ((e) => e.body) };
Et &&
  ((e) => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
      !ot[t] &&
        (ot[t] = p.isFunction(e[t])
          ? (n) => n[t]()
          : (n, r) => {
              throw new T(
                `Response type '${t}' is not supported`,
                T.ERR_NOT_SUPPORT,
                r,
              );
            });
    });
  })(new Response());
const zf = async (e) => {
    if (e == null) return 0;
    if (p.isBlob(e)) return e.size;
    if (p.isSpecCompliantForm(e))
      return (
        await new Request(L.origin, { method: "POST", body: e }).arrayBuffer()
      ).byteLength;
    if (p.isArrayBufferView(e) || p.isArrayBuffer(e)) return e.byteLength;
    if ((p.isURLSearchParams(e) && (e = e + ""), p.isString(e)))
      return (await Wf(e)).byteLength;
  },
  Yf = async (e, t) => {
    const n = p.toFiniteNumber(e.getContentLength());
    return n ?? zf(t);
  },
  Xf =
    Et &&
    (async (e) => {
      let {
        url: t,
        method: n,
        data: r,
        signal: s,
        cancelToken: o,
        timeout: i,
        onDownloadProgress: a,
        onUploadProgress: c,
        responseType: u,
        headers: l,
        withCredentials: d = "same-origin",
        fetchOptions: E,
      } = yo(e);
      u = u ? (u + "").toLowerCase() : "text";
      let y = Hf([s, o && o.toAbortSignal()], i),
        b;
      const h =
        y &&
        y.unsubscribe &&
        (() => {
          y.unsubscribe();
        });
      let f;
      try {
        if (
          c &&
          Kf &&
          n !== "get" &&
          n !== "head" &&
          (f = await Yf(l, r)) !== 0
        ) {
          let R = new Request(t, { method: "POST", body: r, duplex: "half" }),
            v;
          if (
            (p.isFormData(r) &&
              (v = R.headers.get("content-type")) &&
              l.setContentType(v),
            R.body)
          ) {
            const [C, k] = Vr(f, st(Gr(c)));
            r = Wr(R.body, Kr, C, k);
          }
        }
        p.isString(d) || (d = d ? "include" : "omit");
        const m = "credentials" in Request.prototype;
        b = new Request(t, {
          ...E,
          signal: y,
          method: n.toUpperCase(),
          headers: l.normalize().toJSON(),
          body: r,
          duplex: "half",
          credentials: m ? d : void 0,
        });
        let g = await fetch(b);
        const _ = mn && (u === "stream" || u === "response");
        if (mn && (a || (_ && h))) {
          const R = {};
          ["status", "statusText", "headers"].forEach((N) => {
            R[N] = g[N];
          });
          const v = p.toFiniteNumber(g.headers.get("content-length")),
            [C, k] = (a && Vr(v, st(Gr(a), !0))) || [];
          g = new Response(
            Wr(g.body, Kr, C, () => {
              (k && k(), h && h());
            }),
            R,
          );
        }
        u = u || "text";
        let S = await ot[p.findKey(ot, u) || "text"](g, e);
        return (
          !_ && h && h(),
          await new Promise((R, v) => {
            mo(R, v, {
              data: S,
              headers: $.from(g.headers),
              status: g.status,
              statusText: g.statusText,
              config: e,
              request: b,
            });
          })
        );
      } catch (m) {
        throw (
          h && h(),
          m && m.name === "TypeError" && /Load failed|fetch/i.test(m.message)
            ? Object.assign(new T("Network Error", T.ERR_NETWORK, e, b), {
                cause: m.cause || m,
              })
            : T.from(m, m && m.code, e, b)
        );
      }
    }),
  gn = { http: df, xhr: qf, fetch: Xf };
p.forEach(gn, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const zr = (e) => `- ${e}`,
  Qf = (e) => p.isFunction(e) || e === null || e === !1,
  bo = {
    getAdapter: (e) => {
      e = p.isArray(e) ? e : [e];
      const { length: t } = e;
      let n, r;
      const s = {};
      for (let o = 0; o < t; o++) {
        n = e[o];
        let i;
        if (
          ((r = n),
          !Qf(n) && ((r = gn[(i = String(n)).toLowerCase()]), r === void 0))
        )
          throw new T(`Unknown adapter '${i}'`);
        if (r) break;
        s[i || "#" + o] = r;
      }
      if (!r) {
        const o = Object.entries(s).map(
          ([a, c]) =>
            `adapter ${a} ` +
            (c === !1
              ? "is not supported by the environment"
              : "is not available in the build"),
        );
        let i = t
          ? o.length > 1
            ? `since :
` +
              o.map(zr).join(`
`)
            : " " + zr(o[0])
          : "as no adapter specified";
        throw new T(
          "There is no suitable adapter to dispatch the request " + i,
          "ERR_NOT_SUPPORT",
        );
      }
      return r;
    },
    adapters: gn,
  };
function Ht(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Re(null, e);
}
function Yr(e) {
  return (
    Ht(e),
    (e.headers = $.from(e.headers)),
    (e.data = qt.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    bo
      .getAdapter(e.adapter || Fe.adapter)(e)
      .then(
        function (r) {
          return (
            Ht(e),
            (r.data = qt.call(e, e.transformResponse, r)),
            (r.headers = $.from(r.headers)),
            r
          );
        },
        function (r) {
          return (
            ho(r) ||
              (Ht(e),
              r &&
                r.response &&
                ((r.response.data = qt.call(
                  e,
                  e.transformResponse,
                  r.response,
                )),
                (r.response.headers = $.from(r.response.headers)))),
            Promise.reject(r)
          );
        },
      )
  );
}
const So = "1.9.0",
  bt = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    bt[e] = function (r) {
      return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  },
);
const Xr = {};
bt.transitional = function (t, n, r) {
  function s(o, i) {
    return (
      "[Axios v" +
      So +
      "] Transitional option '" +
      o +
      "'" +
      i +
      (r ? ". " + r : "")
    );
  }
  return (o, i, a) => {
    if (t === !1)
      throw new T(
        s(i, " has been removed" + (n ? " in " + n : "")),
        T.ERR_DEPRECATED,
      );
    return (
      n &&
        !Xr[i] &&
        ((Xr[i] = !0),
        console.warn(
          s(
            i,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future",
          ),
        )),
      t ? t(o, i, a) : !0
    );
  };
};
bt.spelling = function (t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
};
function Zf(e, t, n) {
  if (typeof e != "object")
    throw new T("options must be an object", T.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let s = r.length;
  for (; s-- > 0; ) {
    const o = r[s],
      i = t[o];
    if (i) {
      const a = e[o],
        c = a === void 0 || i(a, o, e);
      if (c !== !0)
        throw new T("option " + o + " must be " + c, T.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new T("Unknown option " + o, T.ERR_BAD_OPTION);
  }
}
const Xe = { assertOptions: Zf, validators: bt },
  V = Xe.validators;
let se = class {
  constructor(t) {
    ((this.defaults = t || {}),
      (this.interceptors = { request: new qr(), response: new qr() }));
  }
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let s = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(s)
          : (s = new Error());
        const o = s.stack ? s.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack
            ? o &&
              !String(r.stack).endsWith(o.replace(/^.+\n.+\n/, "")) &&
              (r.stack +=
                `
` + o)
            : (r.stack = o);
        } catch {}
      }
      throw r;
    }
  }
  _request(t, n) {
    (typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = le(this.defaults, n)));
    const { transitional: r, paramsSerializer: s, headers: o } = n;
    (r !== void 0 &&
      Xe.assertOptions(
        r,
        {
          silentJSONParsing: V.transitional(V.boolean),
          forcedJSONParsing: V.transitional(V.boolean),
          clarifyTimeoutError: V.transitional(V.boolean),
        },
        !1,
      ),
      s != null &&
        (p.isFunction(s)
          ? (n.paramsSerializer = { serialize: s })
          : Xe.assertOptions(
              s,
              { encode: V.function, serialize: V.function },
              !0,
            )),
      n.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (n.allowAbsoluteUrls = !0)),
      Xe.assertOptions(
        n,
        {
          baseUrl: V.spelling("baseURL"),
          withXsrfToken: V.spelling("withXSRFToken"),
        },
        !0,
      ),
      (n.method = (n.method || this.defaults.method || "get").toLowerCase()));
    let i = o && p.merge(o.common, o[n.method]);
    (o &&
      p.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (b) => {
          delete o[b];
        },
      ),
      (n.headers = $.concat(i, o)));
    const a = [];
    let c = !0;
    this.interceptors.request.forEach(function (h) {
      (typeof h.runWhen == "function" && h.runWhen(n) === !1) ||
        ((c = c && h.synchronous), a.unshift(h.fulfilled, h.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function (h) {
      u.push(h.fulfilled, h.rejected);
    });
    let l,
      d = 0,
      E;
    if (!c) {
      const b = [Yr.bind(this), void 0];
      for (
        b.unshift.apply(b, a),
          b.push.apply(b, u),
          E = b.length,
          l = Promise.resolve(n);
        d < E;
      )
        l = l.then(b[d++], b[d++]);
      return l;
    }
    E = a.length;
    let y = n;
    for (d = 0; d < E; ) {
      const b = a[d++],
        h = a[d++];
      try {
        y = b(y);
      } catch (f) {
        h.call(this, f);
        break;
      }
    }
    try {
      l = Yr.call(this, y);
    } catch (b) {
      return Promise.reject(b);
    }
    for (d = 0, E = u.length; d < E; ) l = l.then(u[d++], u[d++]);
    return l;
  }
  getUri(t) {
    t = le(this.defaults, t);
    const n = go(t.baseURL, t.url, t.allowAbsoluteUrls);
    return lo(n, t.params, t.paramsSerializer);
  }
};
p.forEach(["delete", "get", "head", "options"], function (t) {
  se.prototype[t] = function (n, r) {
    return this.request(
      le(r || {}, { method: t, url: n, data: (r || {}).data }),
    );
  };
});
p.forEach(["post", "put", "patch"], function (t) {
  function n(r) {
    return function (o, i, a) {
      return this.request(
        le(a || {}, {
          method: t,
          headers: r ? { "Content-Type": "multipart/form-data" } : {},
          url: o,
          data: i,
        }),
      );
    };
  }
  ((se.prototype[t] = n()), (se.prototype[t + "Form"] = n(!0)));
});
let ed = class wo {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function (o) {
      n = o;
    });
    const r = this;
    (this.promise.then((s) => {
      if (!r._listeners) return;
      let o = r._listeners.length;
      for (; o-- > 0; ) r._listeners[o](s);
      r._listeners = null;
    }),
      (this.promise.then = (s) => {
        let o;
        const i = new Promise((a) => {
          (r.subscribe(a), (o = a));
        }).then(s);
        return (
          (i.cancel = function () {
            r.unsubscribe(o);
          }),
          i
        );
      }),
      t(function (o, i, a) {
        r.reason || ((r.reason = new Re(o, i, a)), n(r.reason));
      }));
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(),
      n = (r) => {
        t.abort(r);
      };
    return (
      this.subscribe(n),
      (t.signal.unsubscribe = () => this.unsubscribe(n)),
      t.signal
    );
  }
  static source() {
    let t;
    return {
      token: new wo(function (s) {
        t = s;
      }),
      cancel: t,
    };
  }
};
function td(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function nd(e) {
  return p.isObject(e) && e.isAxiosError === !0;
}
const yn = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(yn).forEach(([e, t]) => {
  yn[t] = e;
});
function To(e) {
  const t = new se(e),
    n = Qs(se.prototype.request, t);
  return (
    p.extend(n, se.prototype, t, { allOwnKeys: !0 }),
    p.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (s) {
      return To(le(e, s));
    }),
    n
  );
}
const A = To(Fe);
A.Axios = se;
A.CanceledError = Re;
A.CancelToken = ed;
A.isCancel = ho;
A.VERSION = So;
A.toFormData = _t;
A.AxiosError = T;
A.Cancel = A.CanceledError;
A.all = function (t) {
  return Promise.all(t);
};
A.spread = td;
A.isAxiosError = nd;
A.mergeConfig = le;
A.AxiosHeaders = $;
A.formToJSON = (e) => po(p.isHTMLForm(e) ? new FormData(e) : e);
A.getAdapter = bo.getAdapter;
A.HttpStatusCode = yn;
A.default = A;
const {
  Axios: xd,
  AxiosError: kd,
  CanceledError: Nd,
  isCancel: Cd,
  CancelToken: Dd,
  VERSION: Pd,
  all: Ld,
  Cancel: Fd,
  isAxiosError: Md,
  spread: Ud,
  toFormData: $d,
  AxiosHeaders: jd,
  HttpStatusCode: Bd,
  formToJSON: qd,
  getAdapter: Hd,
  mergeConfig: Vd,
} = A;
var Vt, Qr;
function rd() {
  if (Qr) return Vt;
  Qr = 1;
  var e = Array.isArray;
  return ((Vt = e), Vt);
}
var Gt, Zr;
function sd() {
  if (Zr) return Gt;
  Zr = 1;
  function e(t) {
    return t != null && typeof t == "object";
  }
  return ((Gt = e), Gt);
}
var Jt, es;
function od() {
  if (es) return Jt;
  es = 1;
  var e = Ys(),
    t = rd(),
    n = sd(),
    r = "[object String]";
  function s(o) {
    return typeof o == "string" || (!t(o) && n(o) && e(o) == r);
  }
  return ((Jt = s), Jt);
}
var id = od();
const ad = En(id),
  cd = `
  query($queryParams: UserSavedSearchesParams) {
    userSavedSearches(params: $queryParams) {
      results {
        id
        uid:id
        title
        ciphertext
        description
        type
        recno
        freelancersToHire
        duration
        durationLabel
        engagement
        amount {
          amount:displayValue
        }
        createdOn:createdDateTime
        publishedOn:publishedDateTime
        renewedOn:renewedDateTime
        prefFreelancerLocation
        prefFreelancerLocationMandatory
        connectPrice
        client {
          totalHires
          totalPostedJobs
          totalSpent {
            rawValue
            currency
            displayValue
          }
          paymentVerificationStatus
          location {
            country
          }
          totalReviews
          totalFeedback
          companyRid
          edcUserId
          lastContractRid
          companyOrgUid
          hasFinancialPrivacy
        }
        enterpriseJob
        premium
        jobTs:jobTime
        skills {
          id
          name
          prettyName
          highlighted
        }
        contractorTier
        jobStatus
        relevanceEncoded
        totalApplicants
        proposalsTier
        isLocal:local
        locations {
          city
          country
        }
        isApplied:applied
        attrs {
          id
          uid:id
          prettyName:prefLabel
          parentSkillId
          prefLabel
          highlighted
          freeText
        }
        hourlyBudget {
          type
          min
          max
        }
        clientRelation {
          companyRid
          companyName
          edcUserId
          lastContractPlatform
          lastContractRid
          lastContractTitle
        }
        totalFreelancersToHire
        contractToHire
      }
      paging {
        total
        count
        resultSetTs:resultSetTime
      }
    }
  }
`,
  ud = `
  query bestMatches {
    bestMatchJobsFeed(limit: 30) {
      results {
        uid:id
        title
        ciphertext
        description
        type
        recno
        freelancersToHire
        duration
        durationLabel
        engagement
        amount {
          amount
          currencyCode
        }
        createdOn:createdDateTime
        publishedOn:publishedDateTime
        renewedOn:renewedDateTime
        prefFreelancerLocation
        prefFreelancerLocationMandatory
        connectPrice
        client {
          totalHires
          totalSpent
          paymentVerificationStatus
          location {
            country
            city
            state
            countryTimezone
            worldRegion
          }
          totalReviews
          totalFeedback
          hasFinancialPrivacy
        }
        enterpriseJob
        premium
        jobTime
        skills {
          id
          prefLabel
        }
        tierText
        tier
        tierLabel
        proposalsTier
        isApplied
        hourlyBudget {
          type
          min
          max
        }
        weeklyBudget {
          amount
        }
        clientRelation {
          companyName
          lastContractRid
          lastContractTitle
        }
        relevanceEncoded
        attrs {
          uid:id
          prettyName
          freeText
          skillType
        }
      }
      paging {
        total
        count
        minTime
        maxTime
      }
    }
  }
`,
  ld = `
  query($limit: Int, $toTime: String) {
    mostRecentJobsFeed(limit: $limit, toTime: $toTime) {
      results {
        id
        uid:id
        title
        ciphertext
        description
        type
        recno
        freelancersToHire
        duration
        engagement
        amount {
          amount
        }
        createdOn:createdDateTime
        publishedOn:publishedDateTime
        prefFreelancerLocationMandatory
        connectPrice
        client {
          totalHires
          totalSpent
          paymentVerificationStatus
          location {
            country
          }
          totalReviews
          totalFeedback
          hasFinancialPrivacy
        }
        tierText
        tier
        tierLabel
        proposalsTier
        enterpriseJob
        premium
        jobTs:jobTime
        attrs:skills {
          id
          uid:id
          prettyName:prefLabel
          prefLabel
        }
        hourlyBudget {
          type
          min
          max
        }
        isApplied
      }
      paging {
        total
        count
        resultSetTs:minTime
        maxTime
      }
    }
  }
`,
  fd = `
  query {
    user {
      id
      rid
      nid
    }
  }
`,
  Y = A.create({
    adapter: "fetch",
    withCredentials: !0,
    baseURL: "https://www.upwork.com",
  });
Y.interceptors.response.use(ni.logRequest);
const $n = {
  "Cache-Control": "no-cache",
  Accept: [
    "text/html",
    "application/xhtml+xml",
    "application/xml;q=0.9",
    "image/avif",
    "image/webp",
    "image/apng",
    "*/*;q=0.8",
    "application/signed-exchange;v=b3;q=0.9",
  ].join(", "),
  "Accept-Encoding": ["gzip", "deflate", "br"].join(", "),
  "X-Requested-With": "XMLHttpRequest",
};
var Ro = ((e) => (
  (e.MostRecent = "Most Recent"),
  (e.BestMatches = "Best Matches"),
  (e.MyFeed = "My Feed / Saved Searches"),
  e
))(Ro || {});
const Qe = {
    "My Feed / Saved Searches": {
      pageUrl: "https://www.upwork.com/nx/find-work",
      description:
        "Jobs that match your personal preferences/filters <strong>(configurable)</strong>.",
      query: cd,
    },
    "Best Matches": {
      pageUrl: "https://www.upwork.com/nx/find-work/best-matches",
      description:
        "Jobs that match your experience to a client's hiring preferences <strong>(not configurable)</strong>. Ordered by most relevant.",
      query: ud,
    },
    "Most Recent": {
      pageUrl: "https://www.upwork.com/nx/find-work/most-recent",
      description:
        "The most recent jobs that match your skills and profile description to the skills clients are looking for <strong>(not configurable)</strong>.",
      query: ld,
    },
  },
  St = async (e) => {
    const { shouldTryAgain: t = !0, triggerCookieToken: n, path: r } = e,
      s = await Wt.cookies.getAll({ path: r }),
      o = s.length
        ? s.reduce((a, c) => (c.expirationDate > a.expirationDate ? c : a))
        : null;
    if (o && o.expirationDate && o.expirationDate * 1e3 > Date.now()) return o;
    if (!t) return null;
    (await vo(e.path), await n(), await vl.resolveIn(5e3));
    const i = await n();
    return ad(i.data.action) &&
      i.data.action.startsWith(
        "https://www.upwork.com/ab/account-security/login",
      )
      ? null
      : St({ ...e, shouldTryAgain: !1 });
  },
  _n = () =>
    St({
      path: "/nx/find-work/",
      triggerCookieToken: () => Y.get("nx/find-work/", { headers: $n }),
    }),
  vo = async (e) => {
    const t = await Wt.cookies.getAll({ path: e });
    await Promise.all(
      t.map((n) =>
        Wt.cookies.remove({ name: n.name, url: `https://upwork.com${n.path}` }),
      ),
    );
  },
  ts = async (e, t) => {
    var r, s, o, i, a, c;
    const n = {
      Authorization: e ? `bearer ${e.value}` : !1,
      "X-Requested-With": t === "Most Recent" ? "XMLHttpRequest" : !1,
    };
    if (t === "My Feed / Saved Searches") {
      const u = await Y.post(
        "api/graphql/v1",
        {
          query: Qe["My Feed / Saved Searches"].query,
          variables: { queryParams: {} },
        },
        { headers: n },
      );
      return (s = (r = u.data) == null ? void 0 : r.data) != null &&
        s.userSavedSearches
        ? u.data.data.userSavedSearches.results.map((l) => ({
            ...l,
            __isSeen: !1,
            tierText: l.contractorTier,
            type: l.type === "FIXED" ? "Fixed-price" : "Hourly",
            client: {
              ...l.client,
              totalSpent: Number.parseFloat(
                l.client.totalSpent ? l.client.totalSpent.displayValue : "",
              ),
            },
          }))
        : (jt(new Error("response.data.data is undefined"), {
            data: { response: u },
          }),
          []);
    }
    if (t === "Best Matches") {
      const u = await Y.post(
        "api/graphql/v1",
        {
          query: Qe["Best Matches"].query,
          variables: { fromTime: 0, toTime: 30 },
        },
        { headers: n },
      );
      return (i = (o = u.data) == null ? void 0 : o.data) != null &&
        i.bestMatchJobsFeed
        ? u.data.data.bestMatchJobsFeed.results.map((l) => ({
            ...l,
            __isSeen: !1,
            type: l.type === 1 ? "Fixed-price" : "Hourly",
            amount: { ...l.amount, amount: String(l.amount.amount) },
          }))
        : (jt(new Error("response.data.data is undefined"), {
            data: { response: u },
          }),
          []);
    }
    if (t === "Most Recent") {
      const u = await Y.post(
        "api/graphql/v1",
        { query: Qe["Most Recent"].query, variables: { limit: 10 } },
        { headers: n },
      );
      return (c = (a = u.data) == null ? void 0 : a.data) != null &&
        c.mostRecentJobsFeed
        ? u.data.data.mostRecentJobsFeed.results.map((l) => ({
            ...l,
            __isSeen: !1,
            durationLabel: l.duration,
            clientRelation: null,
            renewedOn: l.publishedOn,
            type: l.type === 1 ? "Fixed-price" : "Hourly",
            amount: { ...l.amount, amount: String(l.amount.amount) },
          }))
        : (jt(new Error("response.data.data is undefined"), {
            data: { response: u },
          }),
          []);
    }
    throw new Error("Invalid feed type");
  },
  dd = async (e) => {
    const t = await St({
      path: "/nx/proposals/",
      triggerCookieToken: () =>
        Y.get(`nx/proposals/job/${e}/apply`, { headers: $n }),
    });
    if (!t) throw new Error(ge.UNAUTHENTICATED);
    return (
      await Y.get(`/ab/proposals/api/v4/check/${e}?payload=1`, {
        headers: { Authorization: `bearer ${t.value}` },
      })
    ).data;
  },
  pd = async (e) => {
    const t = await _n();
    if (!t) throw new Error(ge.UNAUTHENTICATED);
    try {
      return await ts(t, e);
    } catch (n) {
      if (Io(n)) {
        await vo("/nx/find-work/");
        const r = await _n();
        if (!r) throw new Error(ge.UNAUTHENTICATED);
        return await ts(r, e);
      } else throw n;
    }
  },
  hd = (e) => `https://upwork.com/jobs/${e}`,
  md = (e) => `https://upwork.com/ab/proposals/job/${e}/apply`,
  Oo = () =>
    St({
      path: "/freelancers/settings/",
      triggerCookieToken: () =>
        Y.get("/freelancers/settings/contactInfo", { headers: $n }),
    }),
  gd = async () => {
    const e = await Oo();
    if (!e) throw new Error(ge.UNAUTHENTICATED);
    return (
      await Y.post(
        "api/graphql/v1",
        { query: fd, variables: { queryParams: {} } },
        { headers: { Authorization: `bearer ${e.value}` } },
      )
    ).data.data.user.nid;
  },
  Io = (e) => {
    var t;
    return (
      (A.isAxiosError(e) &&
        ((t = e.response) == null ? void 0 : t.status) === 401) ||
      (e == null ? void 0 : e.message) === ge.UNAUTHENTICATED
    );
  },
  yd = (e) => {
    var t;
    return (
      A.isAxiosError(e) &&
      ((t = e.response) == null ? void 0 : t.status) === 403
    );
  },
  _d = (e) => A.isAxiosError(e) && e.code === "ERR_NETWORK",
  Ed = (e) => A.isAxiosError(e) && e.response && e.response.status >= 500,
  bd = (e) => A.isAxiosError(e) && e.response && e.response.status === 429,
  Sd = (e) =>
    A.isAxiosError(e) &&
    e.response &&
    [400, 409, 499].includes(e.response.status),
  Gd = {
    getJobDetails: dd,
    getJobs: pd,
    getJobsToken: _n,
    getUsername: gd,
    getUsernameToken: Oo,
    feedOptions: Qe,
    isUnauthenticatedError: Io,
    isForbiddenError: yd,
    isNetworkError: _d,
    isRateLimitError: bd,
    isServerError: Ed,
    proposalUrl: md,
    shouldIgnoreError: Sd,
    viewUrl: hd,
  };
var Ao = ((e) => (
  (e.OPEN_PAGE = "OPEN_PAGE"),
  (e.PLAY_SOUND = "PLAY_SOUND"),
  (e.GET_JOB_DETAILS = "GET_JOB_DETAILS"),
  e
))(Ao || {});
const wd = (e) => e && !isNaN(e.volume) && e.type === "PLAY_SOUND",
  Td = (e) => e && e.type === "GET_JOB_DETAILS" && typeof e.jobId == "string",
  Rd = (e) => e && e.type === "OPEN_PAGE",
  Jd = {
    isGetJobDetailsMessage: Td,
    isPlaySoundMessage: wd,
    isOpenPageMessage: Rd,
    Message: Ao,
  };
function Wd() {}
export {
  ge as E,
  Od as a,
  Wt as b,
  jt as c,
  En as d,
  Yo as e,
  Md as f,
  wl as g,
  vd as h,
  Wd as i,
  A as j,
  El as k,
  ni as l,
  Jd as r,
  oe as s,
  vl as t,
  Gd as u,
  cs as v,
};
//# sourceMappingURL=_virtual_wxt-plugins-C1xRqpYK.js.map
