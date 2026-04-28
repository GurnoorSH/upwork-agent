var content = (function () {
  "use strict";
  var q6 = Object.defineProperty;
  var F6 = (an, qn, An) =>
    qn in an
      ? q6(an, qn, {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: An,
        })
      : (an[qn] = An);
  var Jn = (an, qn, An) => F6(an, typeof qn != "symbol" ? qn + "" : qn, An);
  try {
    let an =
        typeof window < "u"
          ? window
          : typeof global < "u"
            ? global
            : typeof globalThis < "u"
              ? globalThis
              : typeof self < "u"
                ? self
                : {},
      qn = new an.Error().stack;
    qn &&
      ((an._sentryDebugIds = an._sentryDebugIds || {}),
      (an._sentryDebugIds[qn] = "f305e025-1262-49c1-a533-adcd7b92a5bf"),
      (an._sentryDebugIdIdentifier =
        "sentry-dbid-f305e025-1262-49c1-a533-adcd7b92a5bf"));
  } catch {}
  var Xv, Wv, Qv, Zv;
  function an(e, n) {
    for (var a = 0; a < n.length; a++) {
      const o = n[a];
      if (typeof o != "string" && !Array.isArray(o)) {
        for (const s in o)
          if (s !== "default" && !(s in e)) {
            const u = Object.getOwnPropertyDescriptor(o, s);
            u &&
              Object.defineProperty(
                e,
                s,
                u.get ? u : { enumerable: !0, get: () => o[s] },
              );
          }
      }
    }
    return Object.freeze(
      Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
    );
  }
  const An =
    (Wv = (Xv = globalThis.browser) == null ? void 0 : Xv.runtime) != null &&
    Wv.id
      ? globalThis.browser
      : globalThis.chrome;
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
  var Ks =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
        ? window
        : typeof global < "u"
          ? global
          : typeof self < "u"
            ? self
            : {};
  function di(e) {
    return e &&
      e.__esModule &&
      Object.prototype.hasOwnProperty.call(e, "default")
      ? e.default
      : e;
  }
  var Ac, Am;
  function P_() {
    if (Am) return Ac;
    Am = 1;
    var e =
        /^[a-z](?:[\.0-9_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*-(?:[\x2D\.0-9_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/,
      n = function (a) {
        return e.test(a);
      };
    return ((Ac = n), Ac);
  }
  var q_ = P_();
  const F_ = di(q_);
  var G_ = (e, n, a) =>
    new Promise((o, s) => {
      var u = (h) => {
          try {
            d(a.next(h));
          } catch (m) {
            s(m);
          }
        },
        c = (h) => {
          try {
            d(a.throw(h));
          } catch (m) {
            s(m);
          }
        },
        d = (h) => (h.done ? o(h.value) : Promise.resolve(h.value).then(u, c));
      d((a = a.apply(e, n)).next());
    });
  function V_(e) {
    return G_(this, null, function* () {
      const { name: n, mode: a = "closed", css: o, isolateEvents: s = !1 } = e;
      if (!F_(n))
        throw Error(
          `"${n}" is not a valid custom element name. It must be two words and kebab-case, with a few exceptions. See spec for more details: https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name`,
        );
      const u = document.createElement(n),
        c = u.attachShadow({ mode: a }),
        d = document.createElement("html"),
        h = document.createElement("body"),
        m = document.createElement("head");
      if (o) {
        const g = document.createElement("style");
        ("url" in o
          ? (g.textContent = yield fetch(o.url).then((b) => b.text()))
          : (g.textContent = o.textContent),
          m.appendChild(g));
      }
      return (
        d.appendChild(m),
        d.appendChild(h),
        c.appendChild(d),
        s &&
          (Array.isArray(s) ? s : ["keydown", "keyup", "keypress"]).forEach(
            (b) => {
              h.addEventListener(b, (x) => x.stopPropagation());
            },
          ),
        { parentElement: u, shadow: c, isolatedElement: h }
      );
    });
  }
  const K_ = Symbol("null");
  let Y_ = 0;
  class X_ extends Map {
    constructor() {
      (super(),
        (this._objectHashes = new WeakMap()),
        (this._symbolHashes = new Map()),
        (this._publicKeys = new Map()));
      const [n] = arguments;
      if (n != null) {
        if (typeof n[Symbol.iterator] != "function")
          throw new TypeError(
            typeof n +
              " is not iterable (cannot read property Symbol(Symbol.iterator))",
          );
        for (const [a, o] of n) this.set(a, o);
      }
    }
    _getPublicKeys(n, a = !1) {
      if (!Array.isArray(n))
        throw new TypeError("The keys parameter must be an array");
      const o = this._getPrivateKey(n, a);
      let s;
      return (
        o && this._publicKeys.has(o)
          ? (s = this._publicKeys.get(o))
          : a && ((s = [...n]), this._publicKeys.set(o, s)),
        { privateKey: o, publicKey: s }
      );
    }
    _getPrivateKey(n, a = !1) {
      const o = [];
      for (let s of n) {
        s === null && (s = K_);
        const u =
          typeof s == "object" || typeof s == "function"
            ? "_objectHashes"
            : typeof s == "symbol"
              ? "_symbolHashes"
              : !1;
        if (!u) o.push(s);
        else if (this[u].has(s)) o.push(this[u].get(s));
        else if (a) {
          const c = `@@mkm-ref-${Y_++}@@`;
          (this[u].set(s, c), o.push(c));
        } else return !1;
      }
      return JSON.stringify(o);
    }
    set(n, a) {
      const { publicKey: o } = this._getPublicKeys(n, !0);
      return super.set(o, a);
    }
    get(n) {
      const { publicKey: a } = this._getPublicKeys(n);
      return super.get(a);
    }
    has(n) {
      const { publicKey: a } = this._getPublicKeys(n);
      return super.has(a);
    }
    delete(n) {
      const { publicKey: a, privateKey: o } = this._getPublicKeys(n);
      return !!(a && super.delete(a) && this._publicKeys.delete(o));
    }
    clear() {
      (super.clear(), this._symbolHashes.clear(), this._publicKeys.clear());
    }
    get [Symbol.toStringTag]() {
      return "ManyKeysMap";
    }
    get size() {
      return super.size;
    }
  }
  function Oc(e) {
    if (e === null || typeof e != "object") return !1;
    const n = Object.getPrototypeOf(e);
    return (n !== null &&
      n !== Object.prototype &&
      Object.getPrototypeOf(n) !== null) ||
      Symbol.iterator in e
      ? !1
      : Symbol.toStringTag in e
        ? Object.prototype.toString.call(e) === "[object Module]"
        : !0;
  }
  function Mc(e, n, a = ".", o) {
    if (!Oc(n)) return Mc(e, {}, a, o);
    const s = Object.assign({}, n);
    for (const u in e) {
      if (u === "__proto__" || u === "constructor") continue;
      const c = e[u];
      c != null &&
        ((o && o(s, u, c, a)) ||
          (Array.isArray(c) && Array.isArray(s[u])
            ? (s[u] = [...c, ...s[u]])
            : Oc(c) && Oc(s[u])
              ? (s[u] = Mc(c, s[u], (a ? `${a}.` : "") + u.toString(), o))
              : (s[u] = c)));
    }
    return s;
  }
  function W_(e) {
    return (...n) => n.reduce((a, o) => Mc(a, o, "", e), {});
  }
  const Q_ = W_(),
    Om = (e) =>
      e !== null ? { isDetected: !0, result: e } : { isDetected: !1 },
    Z_ = (e) =>
      e === null ? { isDetected: !0, result: null } : { isDetected: !1 },
    J_ = () => ({
      target: globalThis.document,
      unifyProcess: !0,
      detector: Om,
      observeConfigs: { childList: !0, subtree: !0, attributes: !0 },
      signal: void 0,
      customMatcher: void 0,
    }),
    eT = (e, n) => Q_(e, n),
    Dc = new X_();
  function tT(e) {
    const { defaultOptions: n } = e;
    return (a, o) => {
      const {
          target: s,
          unifyProcess: u,
          observeConfigs: c,
          detector: d,
          signal: h,
          customMatcher: m,
        } = eT(o, n),
        g = [a, s, u, c, d, h, m],
        b = Dc.get(g);
      if (u && b) return b;
      const x = new Promise(async (C, _) => {
        if (h != null && h.aborted) return _(h.reason);
        const v = new MutationObserver(async (w) => {
          for (const D of w) {
            if (h != null && h.aborted) {
              v.disconnect();
              break;
            }
            const R = await Mm({
              selector: a,
              target: s,
              detector: d,
              customMatcher: m,
            });
            if (R.isDetected) {
              (v.disconnect(), C(R.result));
              break;
            }
          }
        });
        h == null ||
          h.addEventListener("abort", () => (v.disconnect(), _(h.reason)), {
            once: !0,
          });
        const E = await Mm({
          selector: a,
          target: s,
          detector: d,
          customMatcher: m,
        });
        if (E.isDetected) return C(E.result);
        v.observe(s, c);
      }).finally(() => {
        Dc.delete(g);
      });
      return (Dc.set(g, x), x);
    };
  }
  async function Mm({ target: e, selector: n, detector: a, customMatcher: o }) {
    const s = o ? o(n) : e.querySelector(n);
    return await a(s);
  }
  const nT = tT({ defaultOptions: J_() });
  function Ys(e, ...n) {}
  const Nc = {
    debug: (...e) => Ys(console.debug, ...e),
    log: (...e) => Ys(console.log, ...e),
    warn: (...e) => Ys(console.warn, ...e),
    error: (...e) => Ys(console.error, ...e),
  };
  function rT(e, n, a) {
    var o, s;
    a.position !== "inline" &&
      (a.zIndex != null && (e.style.zIndex = String(a.zIndex)),
      (e.style.overflow = "visible"),
      (e.style.position = "relative"),
      (e.style.width = "0"),
      (e.style.height = "0"),
      (e.style.display = "block"),
      n &&
        (a.position === "overlay"
          ? ((n.style.position = "absolute"),
            (o = a.alignment) != null && o.startsWith("bottom-")
              ? (n.style.bottom = "0")
              : (n.style.top = "0"),
            (s = a.alignment) != null && s.endsWith("-right")
              ? (n.style.right = "0")
              : (n.style.left = "0"))
          : ((n.style.position = "fixed"),
            (n.style.top = "0"),
            (n.style.bottom = "0"),
            (n.style.left = "0"),
            (n.style.right = "0"))));
  }
  function kc(e) {
    if (e.anchor == null) return document.body;
    let n = typeof e.anchor == "function" ? e.anchor() : e.anchor;
    return typeof n == "string"
      ? n.startsWith("/")
        ? (document.evaluate(
            n,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null,
          ).singleNodeValue ?? void 0)
        : (document.querySelector(n) ?? void 0)
      : (n ?? void 0);
  }
  function aT(e, n) {
    var o, s;
    const a = kc(n);
    if (a == null)
      throw Error(
        "Failed to mount content script UI: could not find anchor element",
      );
    switch (n.append) {
      case void 0:
      case "last":
        a.append(e);
        break;
      case "first":
        a.prepend(e);
        break;
      case "replace":
        a.replaceWith(e);
        break;
      case "after":
        (o = a.parentElement) == null ||
          o.insertBefore(e, a.nextElementSibling);
        break;
      case "before":
        (s = a.parentElement) == null || s.insertBefore(e, a);
        break;
      default:
        n.append(a, e);
        break;
    }
  }
  function oT(e, n) {
    let a;
    const o = () => {
        (a == null || a.stopAutoMount(), (a = void 0));
      },
      s = () => {
        e.mount();
      },
      u = e.remove;
    return {
      mount: s,
      remove: () => {
        (o(), e.remove());
      },
      autoMount: (h) => {
        (a && Nc.warn("autoMount is already set."),
          (a = iT({ mount: s, unmount: u, stopAutoMount: o }, { ...n, ...h })));
      },
    };
  }
  function iT(e, n) {
    const a = new AbortController(),
      o = "explicit_stop_auto_mount",
      s = () => {
        var d;
        (a.abort(o), (d = n.onStop) == null || d.call(n));
      };
    let u = typeof n.anchor == "function" ? n.anchor() : n.anchor;
    if (u instanceof Element)
      throw Error(
        "autoMount and Element anchor option cannot be combined. Avoid passing `Element` directly or `() => Element` to the anchor.",
      );
    async function c(d) {
      let h = !!kc(n);
      for (h && e.mount(); !a.signal.aborted; )
        try {
          ((h = !!(await nT(d ?? "body", {
            customMatcher: () => kc(n) ?? null,
            detector: h ? Z_ : Om,
            signal: a.signal,
          }))),
            h ? e.mount() : (e.unmount(), n.once && e.stopAutoMount()));
        } catch (m) {
          if (a.signal.aborted && a.signal.reason === o) break;
          throw m;
        }
    }
    return (c(u), { stopAutoMount: s });
  }
  function sT(e) {
    let n = e,
      a = "";
    const o = /(\s*@property[\s\S]*?{[\s\S]*?})/gm;
    let s;
    for (; (s = o.exec(e)) !== null; ) ((a += s[1]), (n = n.replace(s[1], "")));
    return { documentCss: a.trim(), shadowCss: n.trim() };
  }
  async function Dm(e, n) {
    var C;
    const a = Math.random().toString(36).substring(2, 15),
      o = [];
    if (
      (n.inheritStyles ||
        o.push("/* WXT Shadow Root Reset */ body{all:initial;}"),
      n.css && o.push(n.css),
      ((C = e.options) == null ? void 0 : C.cssInjectionMode) === "ui")
    ) {
      const _ = await lT();
      o.push(_.replaceAll(":root", ":host"));
    }
    const { shadowCss: s, documentCss: u } = sT(
        o
          .join(
            `
`,
          )
          .trim(),
      ),
      {
        isolatedElement: c,
        parentElement: d,
        shadow: h,
      } = await V_({
        name: n.name,
        css: { textContent: s },
        mode: n.mode ?? "open",
        isolateEvents: n.isolateEvents,
      });
    d.setAttribute("data-wxt-shadow-root", "");
    let m;
    const g = () => {
        if (
          (aT(d, n),
          rT(d, h.querySelector("html"), n),
          u &&
            !document.querySelector(
              `style[wxt-shadow-root-document-styles="${a}"]`,
            ))
        ) {
          const _ = document.createElement("style");
          ((_.textContent = u),
            _.setAttribute("wxt-shadow-root-document-styles", a),
            (document.head ?? document.body).append(_));
        }
        m = n.onMount(c, h, d);
      },
      b = () => {
        var v;
        ((v = n.onRemove) == null || v.call(n, m), d.remove());
        const _ = document.querySelector(
          `style[wxt-shadow-root-document-styles="${a}"]`,
        );
        for (_ == null || _.remove(); c.lastChild; ) c.removeChild(c.lastChild);
        m = void 0;
      },
      x = oT({ mount: g, remove: b }, n);
    return (
      e.onInvalidated(b),
      {
        shadow: h,
        shadowHost: d,
        uiContainer: c,
        ...x,
        get mounted() {
          return m;
        },
      }
    );
  }
  async function lT() {
    const e = An.runtime.getURL("/content-scripts/content.css");
    try {
      return await (await fetch(e)).text();
    } catch (n) {
      return (
        Nc.warn(
          `Failed to load styles @ ${e}. Did you forget to import the stylesheet in your entrypoint?`,
          n,
        ),
        ""
      );
    }
  }
  function G6(e) {
    return e;
  }
  var zc = { exports: {} },
    pi = {};
  /**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var Nm;
  function uT() {
    if (Nm) return pi;
    Nm = 1;
    var e = Symbol.for("react.transitional.element"),
      n = Symbol.for("react.fragment");
    function a(o, s, u) {
      var c = null;
      if (
        (u !== void 0 && (c = "" + u),
        s.key !== void 0 && (c = "" + s.key),
        "key" in s)
      ) {
        u = {};
        for (var d in s) d !== "key" && (u[d] = s[d]);
      } else u = s;
      return (
        (s = u.ref),
        { $$typeof: e, type: o, key: c, ref: s !== void 0 ? s : null, props: u }
      );
    }
    return ((pi.Fragment = n), (pi.jsx = a), (pi.jsxs = a), pi);
  }
  var km;
  function cT() {
    return (km || ((km = 1), (zc.exports = uT())), zc.exports);
  }
  var P = cT(),
    Bc = { exports: {} },
    we = {};
  /**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var zm;
  function fT() {
    if (zm) return we;
    zm = 1;
    var e = Symbol.for("react.transitional.element"),
      n = Symbol.for("react.portal"),
      a = Symbol.for("react.fragment"),
      o = Symbol.for("react.strict_mode"),
      s = Symbol.for("react.profiler"),
      u = Symbol.for("react.consumer"),
      c = Symbol.for("react.context"),
      d = Symbol.for("react.forward_ref"),
      h = Symbol.for("react.suspense"),
      m = Symbol.for("react.memo"),
      g = Symbol.for("react.lazy"),
      b = Symbol.iterator;
    function x(N) {
      return N === null || typeof N != "object"
        ? null
        : ((N = (b && N[b]) || N["@@iterator"]),
          typeof N == "function" ? N : null);
    }
    var C = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      _ = Object.assign,
      v = {};
    function E(N, K, ae) {
      ((this.props = N),
        (this.context = K),
        (this.refs = v),
        (this.updater = ae || C));
    }
    ((E.prototype.isReactComponent = {}),
      (E.prototype.setState = function (N, K) {
        if (typeof N != "object" && typeof N != "function" && N != null)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables.",
          );
        this.updater.enqueueSetState(this, N, K, "setState");
      }),
      (E.prototype.forceUpdate = function (N) {
        this.updater.enqueueForceUpdate(this, N, "forceUpdate");
      }));
    function w() {}
    w.prototype = E.prototype;
    function D(N, K, ae) {
      ((this.props = N),
        (this.context = K),
        (this.refs = v),
        (this.updater = ae || C));
    }
    var R = (D.prototype = new w());
    ((R.constructor = D), _(R, E.prototype), (R.isPureReactComponent = !0));
    var M = Array.isArray,
      A = { H: null, A: null, T: null, S: null, V: null },
      L = Object.prototype.hasOwnProperty;
    function G(N, K, ae, te, le, ce) {
      return (
        (ae = ce.ref),
        {
          $$typeof: e,
          type: N,
          key: K,
          ref: ae !== void 0 ? ae : null,
          props: ce,
        }
      );
    }
    function q(N, K) {
      return G(N.type, K, void 0, void 0, void 0, N.props);
    }
    function W(N) {
      return typeof N == "object" && N !== null && N.$$typeof === e;
    }
    function S(N) {
      var K = { "=": "=0", ":": "=2" };
      return (
        "$" +
        N.replace(/[=:]/g, function (ae) {
          return K[ae];
        })
      );
    }
    var I = /\/+/g;
    function X(N, K) {
      return typeof N == "object" && N !== null && N.key != null
        ? S("" + N.key)
        : K.toString(36);
    }
    function oe() {}
    function se(N) {
      switch (N.status) {
        case "fulfilled":
          return N.value;
        case "rejected":
          throw N.reason;
        default:
          switch (
            (typeof N.status == "string"
              ? N.then(oe, oe)
              : ((N.status = "pending"),
                N.then(
                  function (K) {
                    N.status === "pending" &&
                      ((N.status = "fulfilled"), (N.value = K));
                  },
                  function (K) {
                    N.status === "pending" &&
                      ((N.status = "rejected"), (N.reason = K));
                  },
                )),
            N.status)
          ) {
            case "fulfilled":
              return N.value;
            case "rejected":
              throw N.reason;
          }
      }
      throw N;
    }
    function J(N, K, ae, te, le) {
      var ce = typeof N;
      (ce === "undefined" || ce === "boolean") && (N = null);
      var fe = !1;
      if (N === null) fe = !0;
      else
        switch (ce) {
          case "bigint":
          case "string":
          case "number":
            fe = !0;
            break;
          case "object":
            switch (N.$$typeof) {
              case e:
              case n:
                fe = !0;
                break;
              case g:
                return ((fe = N._init), J(fe(N._payload), K, ae, te, le));
            }
        }
      if (fe)
        return (
          (le = le(N)),
          (fe = te === "" ? "." + X(N, 0) : te),
          M(le)
            ? ((ae = ""),
              fe != null && (ae = fe.replace(I, "$&/") + "/"),
              J(le, K, ae, "", function (ke) {
                return ke;
              }))
            : le != null &&
              (W(le) &&
                (le = q(
                  le,
                  ae +
                    (le.key == null || (N && N.key === le.key)
                      ? ""
                      : ("" + le.key).replace(I, "$&/") + "/") +
                    fe,
                )),
              K.push(le)),
          1
        );
      fe = 0;
      var Ae = te === "" ? "." : te + ":";
      if (M(N))
        for (var xe = 0; xe < N.length; xe++)
          ((te = N[xe]), (ce = Ae + X(te, xe)), (fe += J(te, K, ae, ce, le)));
      else if (((xe = x(N)), typeof xe == "function"))
        for (N = xe.call(N), xe = 0; !(te = N.next()).done; )
          ((te = te.value),
            (ce = Ae + X(te, xe++)),
            (fe += J(te, K, ae, ce, le)));
      else if (ce === "object") {
        if (typeof N.then == "function") return J(se(N), K, ae, te, le);
        throw (
          (K = String(N)),
          Error(
            "Objects are not valid as a React child (found: " +
              (K === "[object Object]"
                ? "object with keys {" + Object.keys(N).join(", ") + "}"
                : K) +
              "). If you meant to render a collection of children, use an array instead.",
          )
        );
      }
      return fe;
    }
    function z(N, K, ae) {
      if (N == null) return N;
      var te = [],
        le = 0;
      return (
        J(N, te, "", "", function (ce) {
          return K.call(ae, ce, le++);
        }),
        te
      );
    }
    function Y(N) {
      if (N._status === -1) {
        var K = N._result;
        ((K = K()),
          K.then(
            function (ae) {
              (N._status === 0 || N._status === -1) &&
                ((N._status = 1), (N._result = ae));
            },
            function (ae) {
              (N._status === 0 || N._status === -1) &&
                ((N._status = 2), (N._result = ae));
            },
          ),
          N._status === -1 && ((N._status = 0), (N._result = K)));
      }
      if (N._status === 1) return N._result.default;
      throw N._result;
    }
    var ie =
      typeof reportError == "function"
        ? reportError
        : function (N) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var K = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof N == "object" &&
                  N !== null &&
                  typeof N.message == "string"
                    ? String(N.message)
                    : String(N),
                error: N,
              });
              if (!window.dispatchEvent(K)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", N);
              return;
            }
            console.error(N);
          };
    function re() {}
    return (
      (we.Children = {
        map: z,
        forEach: function (N, K, ae) {
          z(
            N,
            function () {
              K.apply(this, arguments);
            },
            ae,
          );
        },
        count: function (N) {
          var K = 0;
          return (
            z(N, function () {
              K++;
            }),
            K
          );
        },
        toArray: function (N) {
          return (
            z(N, function (K) {
              return K;
            }) || []
          );
        },
        only: function (N) {
          if (!W(N))
            throw Error(
              "React.Children.only expected to receive a single React element child.",
            );
          return N;
        },
      }),
      (we.Component = E),
      (we.Fragment = a),
      (we.Profiler = s),
      (we.PureComponent = D),
      (we.StrictMode = o),
      (we.Suspense = h),
      (we.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = A),
      (we.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function (N) {
          return A.H.useMemoCache(N);
        },
      }),
      (we.cache = function (N) {
        return function () {
          return N.apply(null, arguments);
        };
      }),
      (we.cloneElement = function (N, K, ae) {
        if (N == null)
          throw Error(
            "The argument must be a React element, but you passed " + N + ".",
          );
        var te = _({}, N.props),
          le = N.key,
          ce = void 0;
        if (K != null)
          for (fe in (K.ref !== void 0 && (ce = void 0),
          K.key !== void 0 && (le = "" + K.key),
          K))
            !L.call(K, fe) ||
              fe === "key" ||
              fe === "__self" ||
              fe === "__source" ||
              (fe === "ref" && K.ref === void 0) ||
              (te[fe] = K[fe]);
        var fe = arguments.length - 2;
        if (fe === 1) te.children = ae;
        else if (1 < fe) {
          for (var Ae = Array(fe), xe = 0; xe < fe; xe++)
            Ae[xe] = arguments[xe + 2];
          te.children = Ae;
        }
        return G(N.type, le, void 0, void 0, ce, te);
      }),
      (we.createContext = function (N) {
        return (
          (N = {
            $$typeof: c,
            _currentValue: N,
            _currentValue2: N,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
          }),
          (N.Provider = N),
          (N.Consumer = { $$typeof: u, _context: N }),
          N
        );
      }),
      (we.createElement = function (N, K, ae) {
        var te,
          le = {},
          ce = null;
        if (K != null)
          for (te in (K.key !== void 0 && (ce = "" + K.key), K))
            L.call(K, te) &&
              te !== "key" &&
              te !== "__self" &&
              te !== "__source" &&
              (le[te] = K[te]);
        var fe = arguments.length - 2;
        if (fe === 1) le.children = ae;
        else if (1 < fe) {
          for (var Ae = Array(fe), xe = 0; xe < fe; xe++)
            Ae[xe] = arguments[xe + 2];
          le.children = Ae;
        }
        if (N && N.defaultProps)
          for (te in ((fe = N.defaultProps), fe))
            le[te] === void 0 && (le[te] = fe[te]);
        return G(N, ce, void 0, void 0, null, le);
      }),
      (we.createRef = function () {
        return { current: null };
      }),
      (we.forwardRef = function (N) {
        return { $$typeof: d, render: N };
      }),
      (we.isValidElement = W),
      (we.lazy = function (N) {
        return { $$typeof: g, _payload: { _status: -1, _result: N }, _init: Y };
      }),
      (we.memo = function (N, K) {
        return { $$typeof: m, type: N, compare: K === void 0 ? null : K };
      }),
      (we.startTransition = function (N) {
        var K = A.T,
          ae = {};
        A.T = ae;
        try {
          var te = N(),
            le = A.S;
          (le !== null && le(ae, te),
            typeof te == "object" &&
              te !== null &&
              typeof te.then == "function" &&
              te.then(re, ie));
        } catch (ce) {
          ie(ce);
        } finally {
          A.T = K;
        }
      }),
      (we.unstable_useCacheRefresh = function () {
        return A.H.useCacheRefresh();
      }),
      (we.use = function (N) {
        return A.H.use(N);
      }),
      (we.useActionState = function (N, K, ae) {
        return A.H.useActionState(N, K, ae);
      }),
      (we.useCallback = function (N, K) {
        return A.H.useCallback(N, K);
      }),
      (we.useContext = function (N) {
        return A.H.useContext(N);
      }),
      (we.useDebugValue = function () {}),
      (we.useDeferredValue = function (N, K) {
        return A.H.useDeferredValue(N, K);
      }),
      (we.useEffect = function (N, K, ae) {
        var te = A.H;
        if (typeof ae == "function")
          throw Error(
            "useEffect CRUD overload is not enabled in this build of React.",
          );
        return te.useEffect(N, K);
      }),
      (we.useId = function () {
        return A.H.useId();
      }),
      (we.useImperativeHandle = function (N, K, ae) {
        return A.H.useImperativeHandle(N, K, ae);
      }),
      (we.useInsertionEffect = function (N, K) {
        return A.H.useInsertionEffect(N, K);
      }),
      (we.useLayoutEffect = function (N, K) {
        return A.H.useLayoutEffect(N, K);
      }),
      (we.useMemo = function (N, K) {
        return A.H.useMemo(N, K);
      }),
      (we.useOptimistic = function (N, K) {
        return A.H.useOptimistic(N, K);
      }),
      (we.useReducer = function (N, K, ae) {
        return A.H.useReducer(N, K, ae);
      }),
      (we.useRef = function (N) {
        return A.H.useRef(N);
      }),
      (we.useState = function (N) {
        return A.H.useState(N);
      }),
      (we.useSyncExternalStore = function (N, K, ae) {
        return A.H.useSyncExternalStore(N, K, ae);
      }),
      (we.useTransition = function () {
        return A.H.useTransition();
      }),
      (we.version = "19.1.0"),
      we
    );
  }
  var Bm;
  function Lc() {
    return (Bm || ((Bm = 1), (Bc.exports = fT())), Bc.exports);
  }
  var O = Lc();
  const er = di(O),
    Uc = an({ __proto__: null, default: er }, [O]);
  var Lm = Object.prototype.hasOwnProperty;
  function jc(e, n) {
    var a, o;
    if (e === n) return !0;
    if (e && n && (a = e.constructor) === n.constructor) {
      if (a === Date) return e.getTime() === n.getTime();
      if (a === RegExp) return e.toString() === n.toString();
      if (a === Array) {
        if ((o = e.length) === n.length) for (; o-- && jc(e[o], n[o]); );
        return o === -1;
      }
      if (!a || typeof e == "object") {
        o = 0;
        for (a in e)
          if (
            (Lm.call(e, a) && ++o && !Lm.call(n, a)) ||
            !(a in n) ||
            !jc(e[a], n[a])
          )
            return !1;
        return Object.keys(n).length === o;
      }
    }
    return e !== e && n !== n;
  }
  const dT = new Error("request for lock canceled");
  var pT = function (e, n, a, o) {
    function s(u) {
      return u instanceof a
        ? u
        : new a(function (c) {
            c(u);
          });
    }
    return new (a || (a = Promise))(function (u, c) {
      function d(g) {
        try {
          m(o.next(g));
        } catch (b) {
          c(b);
        }
      }
      function h(g) {
        try {
          m(o.throw(g));
        } catch (b) {
          c(b);
        }
      }
      function m(g) {
        g.done ? u(g.value) : s(g.value).then(d, h);
      }
      m((o = o.apply(e, n || [])).next());
    });
  };
  class hT {
    constructor(n, a = dT) {
      ((this._value = n),
        (this._cancelError = a),
        (this._queue = []),
        (this._weightedWaiters = []));
    }
    acquire(n = 1, a = 0) {
      if (n <= 0) throw new Error(`invalid weight ${n}: must be positive`);
      return new Promise((o, s) => {
        const u = { resolve: o, reject: s, weight: n, priority: a },
          c = Um(this._queue, (d) => a <= d.priority);
        c === -1 && n <= this._value
          ? this._dispatchItem(u)
          : this._queue.splice(c + 1, 0, u);
      });
    }
    runExclusive(n) {
      return pT(this, arguments, void 0, function* (a, o = 1, s = 0) {
        const [u, c] = yield this.acquire(o, s);
        try {
          return yield a(u);
        } finally {
          c();
        }
      });
    }
    waitForUnlock(n = 1, a = 0) {
      if (n <= 0) throw new Error(`invalid weight ${n}: must be positive`);
      return this._couldLockImmediately(n, a)
        ? Promise.resolve()
        : new Promise((o) => {
            (this._weightedWaiters[n - 1] ||
              (this._weightedWaiters[n - 1] = []),
              mT(this._weightedWaiters[n - 1], { resolve: o, priority: a }));
          });
    }
    isLocked() {
      return this._value <= 0;
    }
    getValue() {
      return this._value;
    }
    setValue(n) {
      ((this._value = n), this._dispatchQueue());
    }
    release(n = 1) {
      if (n <= 0) throw new Error(`invalid weight ${n}: must be positive`);
      ((this._value += n), this._dispatchQueue());
    }
    cancel() {
      (this._queue.forEach((n) => n.reject(this._cancelError)),
        (this._queue = []));
    }
    _dispatchQueue() {
      for (
        this._drainUnlockWaiters();
        this._queue.length > 0 && this._queue[0].weight <= this._value;
      )
        (this._dispatchItem(this._queue.shift()), this._drainUnlockWaiters());
    }
    _dispatchItem(n) {
      const a = this._value;
      ((this._value -= n.weight), n.resolve([a, this._newReleaser(n.weight)]));
    }
    _newReleaser(n) {
      let a = !1;
      return () => {
        a || ((a = !0), this.release(n));
      };
    }
    _drainUnlockWaiters() {
      if (this._queue.length === 0)
        for (let n = this._value; n > 0; n--) {
          const a = this._weightedWaiters[n - 1];
          a &&
            (a.forEach((o) => o.resolve()),
            (this._weightedWaiters[n - 1] = []));
        }
      else {
        const n = this._queue[0].priority;
        for (let a = this._value; a > 0; a--) {
          const o = this._weightedWaiters[a - 1];
          if (!o) continue;
          const s = o.findIndex((u) => u.priority <= n);
          (s === -1 ? o : o.splice(0, s)).forEach((u) => u.resolve());
        }
      }
    }
    _couldLockImmediately(n, a) {
      return (
        (this._queue.length === 0 || this._queue[0].priority < a) &&
        n <= this._value
      );
    }
  }
  function mT(e, n) {
    const a = Um(e, (o) => n.priority <= o.priority);
    e.splice(a + 1, 0, n);
  }
  function Um(e, n) {
    for (let a = e.length - 1; a >= 0; a--) if (n(e[a])) return a;
    return -1;
  }
  var gT = function (e, n, a, o) {
    function s(u) {
      return u instanceof a
        ? u
        : new a(function (c) {
            c(u);
          });
    }
    return new (a || (a = Promise))(function (u, c) {
      function d(g) {
        try {
          m(o.next(g));
        } catch (b) {
          c(b);
        }
      }
      function h(g) {
        try {
          m(o.throw(g));
        } catch (b) {
          c(b);
        }
      }
      function m(g) {
        g.done ? u(g.value) : s(g.value).then(d, h);
      }
      m((o = o.apply(e, n || [])).next());
    });
  };
  class yT {
    constructor(n) {
      this._semaphore = new hT(1, n);
    }
    acquire() {
      return gT(this, arguments, void 0, function* (n = 0) {
        const [, a] = yield this._semaphore.acquire(1, n);
        return a;
      });
    }
    runExclusive(n, a = 0) {
      return this._semaphore.runExclusive(() => n(), 1, a);
    }
    isLocked() {
      return this._semaphore.isLocked();
    }
    waitForUnlock(n = 0) {
      return this._semaphore.waitForUnlock(1, n);
    }
    release() {
      this._semaphore.isLocked() && this._semaphore.release();
    }
    cancel() {
      return this._semaphore.cancel();
    }
  }
  const Xs =
      ((Zv = (Qv = globalThis.browser) == null ? void 0 : Qv.runtime) == null
        ? void 0
        : Zv.id) == null
        ? globalThis.chrome
        : globalThis.browser,
    On = bT();
  function bT() {
    const e = {
        local: Ws("local"),
        session: Ws("session"),
        sync: Ws("sync"),
        managed: Ws("managed"),
      },
      n = (v) => {
        const E = e[v];
        if (E == null) {
          const w = Object.keys(e).join(", ");
          throw Error(`Invalid area "${v}". Options: ${w}`);
        }
        return E;
      },
      a = (v) => {
        const E = v.indexOf(":"),
          w = v.substring(0, E),
          D = v.substring(E + 1);
        if (D == null)
          throw Error(
            `Storage key should be in the form of "area:key", but received "${v}"`,
          );
        return { driverArea: w, driverKey: D, driver: n(w) };
      },
      o = (v) => v + "$",
      s = (v, E) => {
        const w = { ...v };
        return (
          Object.entries(E).forEach(([D, R]) => {
            R == null ? delete w[D] : (w[D] = R);
          }),
          w
        );
      },
      u = (v, E) => v ?? E ?? null,
      c = (v) => (typeof v == "object" && !Array.isArray(v) ? v : {}),
      d = async (v, E, w) => {
        const D = await v.getItem(E);
        return u(
          D,
          (w == null ? void 0 : w.fallback) ??
            (w == null ? void 0 : w.defaultValue),
        );
      },
      h = async (v, E) => {
        const w = o(E),
          D = await v.getItem(w);
        return c(D);
      },
      m = async (v, E, w) => {
        await v.setItem(E, w ?? null);
      },
      g = async (v, E, w) => {
        const D = o(E),
          R = c(await v.getItem(D));
        await v.setItem(D, s(R, w));
      },
      b = async (v, E, w) => {
        if ((await v.removeItem(E), w != null && w.removeMeta)) {
          const D = o(E);
          await v.removeItem(D);
        }
      },
      x = async (v, E, w) => {
        const D = o(E);
        if (w == null) await v.removeItem(D);
        else {
          const R = c(await v.getItem(D));
          ([w].flat().forEach((M) => delete R[M]), await v.setItem(D, R));
        }
      },
      C = (v, E, w) => v.watch(E, w);
    return {
      getItem: async (v, E) => {
        const { driver: w, driverKey: D } = a(v);
        return await d(w, D, E);
      },
      getItems: async (v) => {
        const E = new Map(),
          w = new Map(),
          D = [];
        v.forEach((M) => {
          let A, L;
          (typeof M == "string"
            ? (A = M)
            : "getValue" in M
              ? ((A = M.key), (L = { fallback: M.fallback }))
              : ((A = M.key), (L = M.options)),
            D.push(A));
          const { driverArea: G, driverKey: q } = a(A),
            W = E.get(G) ?? [];
          (E.set(G, W.concat(q)), w.set(A, L));
        });
        const R = new Map();
        return (
          await Promise.all(
            Array.from(E.entries()).map(async ([M, A]) => {
              (await e[M].getItems(A)).forEach((G) => {
                const q = `${M}:${G.key}`,
                  W = w.get(q),
                  S = u(
                    G.value,
                    (W == null ? void 0 : W.fallback) ??
                      (W == null ? void 0 : W.defaultValue),
                  );
                R.set(q, S);
              });
            }),
          ),
          D.map((M) => ({ key: M, value: R.get(M) }))
        );
      },
      getMeta: async (v) => {
        const { driver: E, driverKey: w } = a(v);
        return await h(E, w);
      },
      getMetas: async (v) => {
        const E = v.map((R) => {
            const M = typeof R == "string" ? R : R.key,
              { driverArea: A, driverKey: L } = a(M);
            return { key: M, driverArea: A, driverKey: L, driverMetaKey: o(L) };
          }),
          w = E.reduce((R, M) => {
            var A;
            return (
              R[(A = M.driverArea)] ?? (R[A] = []),
              R[M.driverArea].push(M),
              R
            );
          }, {}),
          D = {};
        return (
          await Promise.all(
            Object.entries(w).map(async ([R, M]) => {
              const A = await Xs.storage[R].get(M.map((L) => L.driverMetaKey));
              M.forEach((L) => {
                D[L.key] = A[L.driverMetaKey] ?? {};
              });
            }),
          ),
          E.map((R) => ({ key: R.key, meta: D[R.key] }))
        );
      },
      setItem: async (v, E) => {
        const { driver: w, driverKey: D } = a(v);
        await m(w, D, E);
      },
      setItems: async (v) => {
        const E = {};
        (v.forEach((w) => {
          const { driverArea: D, driverKey: R } = a(
            "key" in w ? w.key : w.item.key,
          );
          (E[D] ?? (E[D] = []), E[D].push({ key: R, value: w.value }));
        }),
          await Promise.all(
            Object.entries(E).map(async ([w, D]) => {
              await n(w).setItems(D);
            }),
          ));
      },
      setMeta: async (v, E) => {
        const { driver: w, driverKey: D } = a(v);
        await g(w, D, E);
      },
      setMetas: async (v) => {
        const E = {};
        (v.forEach((w) => {
          const { driverArea: D, driverKey: R } = a(
            "key" in w ? w.key : w.item.key,
          );
          (E[D] ?? (E[D] = []), E[D].push({ key: R, properties: w.meta }));
        }),
          await Promise.all(
            Object.entries(E).map(async ([w, D]) => {
              const R = n(w),
                M = D.map(({ key: q }) => o(q));
              console.log(w, M);
              const A = await R.getItems(M),
                L = Object.fromEntries(
                  A.map(({ key: q, value: W }) => [q, c(W)]),
                ),
                G = D.map(({ key: q, properties: W }) => {
                  const S = o(q);
                  return { key: S, value: s(L[S] ?? {}, W) };
                });
              await R.setItems(G);
            }),
          ));
      },
      removeItem: async (v, E) => {
        const { driver: w, driverKey: D } = a(v);
        await b(w, D, E);
      },
      removeItems: async (v) => {
        const E = {};
        (v.forEach((w) => {
          let D, R;
          typeof w == "string"
            ? (D = w)
            : "getValue" in w
              ? (D = w.key)
              : "item" in w
                ? ((D = w.item.key), (R = w.options))
                : ((D = w.key), (R = w.options));
          const { driverArea: M, driverKey: A } = a(D);
          (E[M] ?? (E[M] = []),
            E[M].push(A),
            R != null && R.removeMeta && E[M].push(o(A)));
        }),
          await Promise.all(
            Object.entries(E).map(async ([w, D]) => {
              await n(w).removeItems(D);
            }),
          ));
      },
      clear: async (v) => {
        await n(v).clear();
      },
      removeMeta: async (v, E) => {
        const { driver: w, driverKey: D } = a(v);
        await x(w, D, E);
      },
      snapshot: async (v, E) => {
        var R;
        const D = await n(v).snapshot();
        return (
          (R = E == null ? void 0 : E.excludeKeys) == null ||
            R.forEach((M) => {
              (delete D[M], delete D[o(M)]);
            }),
          D
        );
      },
      restoreSnapshot: async (v, E) => {
        await n(v).restoreSnapshot(E);
      },
      watch: (v, E) => {
        const { driver: w, driverKey: D } = a(v);
        return C(w, D, E);
      },
      unwatch() {
        Object.values(e).forEach((v) => {
          v.unwatch();
        });
      },
      defineItem: (v, E) => {
        const { driver: w, driverKey: D } = a(v),
          { version: R = 1, migrations: M = {} } = E ?? {};
        if (R < 1)
          throw Error(
            "Storage item version cannot be less than 1. Initial versions should be set to 1, not 0.",
          );
        const A = async () => {
            var z;
            const S = o(D),
              [{ value: I }, { value: X }] = await w.getItems([D, S]);
            if (I == null) return;
            const oe = (X == null ? void 0 : X.v) ?? 1;
            if (oe > R)
              throw Error(
                `Version downgrade detected (v${oe} -> v${R}) for "${v}"`,
              );
            if (oe === R) return;
            console.debug(
              `[@wxt-dev/storage] Running storage migration for ${v}: v${oe} -> v${R}`,
            );
            const se = Array.from({ length: R - oe }, (Y, ie) => oe + ie + 1);
            let J = I;
            for (const Y of se)
              try {
                J =
                  (await ((z = M == null ? void 0 : M[Y]) == null
                    ? void 0
                    : z.call(M, J))) ?? J;
              } catch (ie) {
                throw new vT(v, Y, { cause: ie });
              }
            (await w.setItems([
              { key: D, value: J },
              { key: S, value: { ...X, v: R } },
            ]),
              console.debug(
                `[@wxt-dev/storage] Storage migration completed for ${v} v${R}`,
                { migratedValue: J },
              ));
          },
          L =
            (E == null ? void 0 : E.migrations) == null
              ? Promise.resolve()
              : A().catch((S) => {
                  console.error(
                    `[@wxt-dev/storage] Migration failed for ${v}`,
                    S,
                  );
                }),
          G = new yT(),
          q = () =>
            (E == null ? void 0 : E.fallback) ??
            (E == null ? void 0 : E.defaultValue) ??
            null,
          W = () =>
            G.runExclusive(async () => {
              const S = await w.getItem(D);
              if (S != null || (E == null ? void 0 : E.init) == null) return S;
              const I = await E.init();
              return (await w.setItem(D, I), I);
            });
        return (
          L.then(W),
          {
            key: v,
            get defaultValue() {
              return q();
            },
            get fallback() {
              return q();
            },
            getValue: async () => (
              await L,
              E != null && E.init ? await W() : await d(w, D, E)
            ),
            getMeta: async () => (await L, await h(w, D)),
            setValue: async (S) => (await L, await m(w, D, S)),
            setMeta: async (S) => (await L, await g(w, D, S)),
            removeValue: async (S) => (await L, await b(w, D, S)),
            removeMeta: async (S) => (await L, await x(w, D, S)),
            watch: (S) => C(w, D, (I, X) => S(I ?? q(), X ?? q())),
            migrate: A,
          }
        );
      },
    };
  }
  function Ws(e) {
    const n = () => {
        if (Xs.runtime == null)
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
        if (Xs.storage == null)
          throw Error(
            "You must add the 'storage' permission to your manifest to use 'wxt/storage'",
          );
        const o = Xs.storage[e];
        if (o == null) throw Error(`"browser.storage.${e}" is undefined`);
        return o;
      },
      a = new Set();
    return {
      getItem: async (o) => (await n().get(o))[o],
      getItems: async (o) => {
        const s = await n().get(o);
        return o.map((u) => ({ key: u, value: s[u] ?? null }));
      },
      setItem: async (o, s) => {
        s == null ? await n().remove(o) : await n().set({ [o]: s });
      },
      setItems: async (o) => {
        const s = o.reduce((u, { key: c, value: d }) => ((u[c] = d), u), {});
        await n().set(s);
      },
      removeItem: async (o) => {
        await n().remove(o);
      },
      removeItems: async (o) => {
        await n().remove(o);
      },
      clear: async () => {
        await n().clear();
      },
      snapshot: async () => await n().get(),
      restoreSnapshot: async (o) => {
        await n().set(o);
      },
      watch(o, s) {
        const u = (c) => {
          const d = c[o];
          d != null &&
            (jc(d.newValue, d.oldValue) ||
              s(d.newValue ?? null, d.oldValue ?? null));
        };
        return (
          n().onChanged.addListener(u),
          a.add(u),
          () => {
            (n().onChanged.removeListener(u), a.delete(u));
          }
        );
      },
      unwatch() {
        (a.forEach((o) => {
          n().onChanged.removeListener(o);
        }),
          a.clear());
      },
    };
  }
  class vT extends Error {
    constructor(n, a, o) {
      (super(`v${a} migration failed for "${n}"`, o),
        (this.key = n),
        (this.version = a));
    }
  }
  var $c, jm;
  function $m() {
    if (jm) return $c;
    jm = 1;
    function e(n) {
      var a = typeof n;
      return n != null && (a == "object" || a == "function");
    }
    return (($c = e), $c);
  }
  $m();
  const qt = [];
  for (let e = 0; e < 256; ++e) qt.push((e + 256).toString(16).slice(1));
  function ST(e, n = 0) {
    return (
      qt[e[n + 0]] +
      qt[e[n + 1]] +
      qt[e[n + 2]] +
      qt[e[n + 3]] +
      "-" +
      qt[e[n + 4]] +
      qt[e[n + 5]] +
      "-" +
      qt[e[n + 6]] +
      qt[e[n + 7]] +
      "-" +
      qt[e[n + 8]] +
      qt[e[n + 9]] +
      "-" +
      qt[e[n + 10]] +
      qt[e[n + 11]] +
      qt[e[n + 12]] +
      qt[e[n + 13]] +
      qt[e[n + 14]] +
      qt[e[n + 15]]
    ).toLowerCase();
  }
  let Ic;
  const ET = new Uint8Array(16);
  function _T() {
    if (!Ic) {
      if (typeof crypto > "u" || !crypto.getRandomValues)
        throw new Error(
          "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported",
        );
      Ic = crypto.getRandomValues.bind(crypto);
    }
    return Ic(ET);
  }
  const Im = {
    randomUUID:
      typeof crypto < "u" &&
      crypto.randomUUID &&
      crypto.randomUUID.bind(crypto),
  };
  function Hm(e, n, a) {
    var s;
    if (Im.randomUUID && !e) return Im.randomUUID();
    e = e || {};
    const o = e.random ?? ((s = e.rng) == null ? void 0 : s.call(e)) ?? _T();
    if (o.length < 16) throw new Error("Random bytes length must be >= 16");
    return ((o[6] = (o[6] & 15) | 64), (o[8] = (o[8] & 63) | 128), ST(o));
  }
  const TT = { version: { version: "1.5.48" }.version },
    Pm = "local:__LOGS",
    xT = "uptoolkit_logger_response",
    CT = async (e, n) => {
      const a = (o) => ({
        id: Hm(),
        type: n,
        message: o,
        timestamp: Date.now(),
      });
      await On.setItem(
        Pm,
        [
          ...((await On.getItem(Pm)) ?? []),
          a(Array.isArray(e) ? e.join(" ") : e),
        ].slice(-1e3),
      );
    },
    wT = (e) => CT(e, "info"),
    qm = {
      logRequest: (e) => {
        var n;
        return (
          (e.status >= 200 && e.status < 300) ||
            wT(
              JSON.stringify({
                [xT]: {
                  url: e.config.url,
                  queryParams: e.config.params,
                  method:
                    (n = e.config.method) == null ? void 0 : n.toUpperCase(),
                  status: e.status,
                  input: e.config.data,
                  output: e.data,
                },
              }),
            ),
          e
        );
      },
    },
    at = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__,
    ba = "9.17.0",
    Pe = globalThis;
  function Qs() {
    return (Zs(Pe), Pe);
  }
  function Zs(e) {
    const n = (e.__SENTRY__ = e.__SENTRY__ || {});
    return ((n.version = n.version || ba), (n[ba] = n[ba] || {}));
  }
  function Js(e, n, a = Pe) {
    const o = (a.__SENTRY__ = a.__SENTRY__ || {}),
      s = (o[ba] = o[ba] || {});
    return s[e] || (s[e] = n());
  }
  const Fm = Object.prototype.toString;
  function Hc(e) {
    switch (Fm.call(e)) {
      case "[object Error]":
      case "[object Exception]":
      case "[object DOMException]":
      case "[object WebAssembly.Exception]":
        return !0;
      default:
        return $r(e, Error);
    }
  }
  function ao(e, n) {
    return Fm.call(e) === `[object ${n}]`;
  }
  function Gm(e) {
    return ao(e, "ErrorEvent");
  }
  function Vm(e) {
    return ao(e, "DOMError");
  }
  function RT(e) {
    return ao(e, "DOMException");
  }
  function mr(e) {
    return ao(e, "String");
  }
  function Pc(e) {
    return (
      typeof e == "object" &&
      e !== null &&
      "__sentry_template_string__" in e &&
      "__sentry_template_values__" in e
    );
  }
  function qc(e) {
    return (
      e === null || Pc(e) || (typeof e != "object" && typeof e != "function")
    );
  }
  function hi(e) {
    return ao(e, "Object");
  }
  function el(e) {
    return typeof Event < "u" && $r(e, Event);
  }
  function AT(e) {
    return typeof Element < "u" && $r(e, Element);
  }
  function OT(e) {
    return ao(e, "RegExp");
  }
  function tl(e) {
    return !!(e != null && e.then && typeof e.then == "function");
  }
  function MT(e) {
    return (
      hi(e) &&
      "nativeEvent" in e &&
      "preventDefault" in e &&
      "stopPropagation" in e
    );
  }
  function $r(e, n) {
    try {
      return e instanceof n;
    } catch {
      return !1;
    }
  }
  function Km(e) {
    return !!(typeof e == "object" && e !== null && (e.__isVue || e._isVue));
  }
  function DT(e) {
    return typeof Request < "u" && $r(e, Request);
  }
  const Fc = Pe,
    NT = 80;
  function Ym(e, n = {}) {
    if (!e) return "<unknown>";
    try {
      let a = e;
      const o = 5,
        s = [];
      let u = 0,
        c = 0;
      const d = " > ",
        h = d.length;
      let m;
      const g = Array.isArray(n) ? n : n.keyAttrs,
        b = (!Array.isArray(n) && n.maxStringLength) || NT;
      for (
        ;
        a &&
        u++ < o &&
        ((m = kT(a, g)),
        !(m === "html" || (u > 1 && c + s.length * h + m.length >= b)));
      )
        (s.push(m), (c += m.length), (a = a.parentNode));
      return s.reverse().join(d);
    } catch {
      return "<unknown>";
    }
  }
  function kT(e, n) {
    const a = e,
      o = [];
    if (!(a != null && a.tagName)) return "";
    if (Fc.HTMLElement && a instanceof HTMLElement && a.dataset) {
      if (a.dataset.sentryComponent) return a.dataset.sentryComponent;
      if (a.dataset.sentryElement) return a.dataset.sentryElement;
    }
    o.push(a.tagName.toLowerCase());
    const s =
      n != null && n.length
        ? n.filter((c) => a.getAttribute(c)).map((c) => [c, a.getAttribute(c)])
        : null;
    if (s != null && s.length)
      s.forEach((c) => {
        o.push(`[${c[0]}="${c[1]}"]`);
      });
    else {
      a.id && o.push(`#${a.id}`);
      const c = a.className;
      if (c && mr(c)) {
        const d = c.split(/\s+/);
        for (const h of d) o.push(`.${h}`);
      }
    }
    const u = ["aria-label", "type", "name", "title", "alt"];
    for (const c of u) {
      const d = a.getAttribute(c);
      d && o.push(`[${c}="${d}"]`);
    }
    return o.join("");
  }
  function Xm() {
    try {
      return Fc.document.location.href;
    } catch {
      return "";
    }
  }
  function zT(e) {
    if (!Fc.HTMLElement) return null;
    let n = e;
    const a = 5;
    for (let o = 0; o < a; o++) {
      if (!n) return null;
      if (n instanceof HTMLElement) {
        if (n.dataset.sentryComponent) return n.dataset.sentryComponent;
        if (n.dataset.sentryElement) return n.dataset.sentryElement;
      }
      n = n.parentNode;
    }
    return null;
  }
  const va = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__,
    BT = "Sentry Logger ",
    Gc = ["debug", "info", "warn", "error", "log", "assert", "trace"],
    nl = {};
  function rl(e) {
    if (!("console" in Pe)) return e();
    const n = Pe.console,
      a = {},
      o = Object.keys(nl);
    o.forEach((s) => {
      const u = nl[s];
      ((a[s] = n[s]), (n[s] = u));
    });
    try {
      return e();
    } finally {
      o.forEach((s) => {
        n[s] = a[s];
      });
    }
  }
  function LT() {
    let e = !1;
    const n = {
      enable: () => {
        e = !0;
      },
      disable: () => {
        e = !1;
      },
      isEnabled: () => e,
    };
    return (
      va
        ? Gc.forEach((a) => {
            n[a] = (...o) => {
              e &&
                rl(() => {
                  Pe.console[a](`${BT}[${a}]:`, ...o);
                });
            };
          })
        : Gc.forEach((a) => {
            n[a] = () => {};
          }),
      n
    );
  }
  const Ee = Js("logger", LT);
  function al(e, n = 0) {
    return typeof e != "string" || n === 0 || e.length <= n
      ? e
      : `${e.slice(0, n)}...`;
  }
  function Wm(e, n) {
    if (!Array.isArray(e)) return "";
    const a = [];
    for (let o = 0; o < e.length; o++) {
      const s = e[o];
      try {
        Km(s) ? a.push("[VueViewModel]") : a.push(String(s));
      } catch {
        a.push("[value cannot be serialized]");
      }
    }
    return a.join(n);
  }
  function UT(e, n, a = !1) {
    return mr(e)
      ? OT(n)
        ? n.test(e)
        : mr(n)
          ? a
            ? e === n
            : e.includes(n)
          : !1
      : !1;
  }
  function ol(e, n = [], a = !1) {
    return n.some((o) => UT(e, o, a));
  }
  function yn(e, n, a) {
    if (!(n in e)) return;
    const o = e[n];
    if (typeof o != "function") return;
    const s = a(o);
    typeof s == "function" && Qm(s, o);
    try {
      e[n] = s;
    } catch {
      va && Ee.log(`Failed to replace method "${n}" in object`, e);
    }
  }
  function Sa(e, n, a) {
    try {
      Object.defineProperty(e, n, { value: a, writable: !0, configurable: !0 });
    } catch {
      va && Ee.log(`Failed to add non-enumerable property "${n}" to object`, e);
    }
  }
  function Qm(e, n) {
    try {
      const a = n.prototype || {};
      ((e.prototype = n.prototype = a), Sa(e, "__sentry_original__", n));
    } catch {}
  }
  function Vc(e) {
    return e.__sentry_original__;
  }
  function Zm(e) {
    if (Hc(e))
      return { message: e.message, name: e.name, stack: e.stack, ...eg(e) };
    if (el(e)) {
      const n = {
        type: e.type,
        target: Jm(e.target),
        currentTarget: Jm(e.currentTarget),
        ...eg(e),
      };
      return (
        typeof CustomEvent < "u" && $r(e, CustomEvent) && (n.detail = e.detail),
        n
      );
    } else return e;
  }
  function Jm(e) {
    try {
      return AT(e) ? Ym(e) : Object.prototype.toString.call(e);
    } catch {
      return "<unknown>";
    }
  }
  function eg(e) {
    if (typeof e == "object" && e !== null) {
      const n = {};
      for (const a in e)
        Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
      return n;
    } else return {};
  }
  function jT(e, n = 40) {
    const a = Object.keys(Zm(e));
    a.sort();
    const o = a[0];
    if (!o) return "[object has no keys]";
    if (o.length >= n) return al(o, n);
    for (let s = a.length; s > 0; s--) {
      const u = a.slice(0, s).join(", ");
      if (!(u.length > n)) return s === a.length ? u : al(u, n);
    }
    return "";
  }
  function $T() {
    const e = Pe;
    return e.crypto || e.msCrypto;
  }
  function Mn(e = $T()) {
    let n = () => Math.random() * 16;
    try {
      if (e != null && e.randomUUID) return e.randomUUID().replace(/-/g, "");
      e != null &&
        e.getRandomValues &&
        (n = () => {
          const a = new Uint8Array(1);
          return (e.getRandomValues(a), a[0]);
        });
    } catch {}
    return ("10000000100040008000" + 1e11).replace(/[018]/g, (a) =>
      (a ^ ((n() & 15) >> (a / 4))).toString(16),
    );
  }
  function tg(e) {
    var n, a;
    return (a = (n = e.exception) == null ? void 0 : n.values) == null
      ? void 0
      : a[0];
  }
  function Ea(e) {
    const { message: n, event_id: a } = e;
    if (n) return n;
    const o = tg(e);
    return o
      ? o.type && o.value
        ? `${o.type}: ${o.value}`
        : o.type || o.value || a || "<unknown>"
      : a || "<unknown>";
  }
  function Kc(e, n, a) {
    const o = (e.exception = e.exception || {}),
      s = (o.values = o.values || []),
      u = (s[0] = s[0] || {});
    (u.value || (u.value = n || ""), u.type || (u.type = "Error"));
  }
  function oo(e, n) {
    const a = tg(e);
    if (!a) return;
    const o = { type: "generic", handled: !0 },
      s = a.mechanism;
    if (((a.mechanism = { ...o, ...s, ...n }), n && "data" in n)) {
      const u = { ...(s == null ? void 0 : s.data), ...n.data };
      a.mechanism.data = u;
    }
  }
  function ng(e) {
    if (IT(e)) return !0;
    try {
      Sa(e, "__sentry_captured__", !0);
    } catch {}
    return !1;
  }
  function IT(e) {
    try {
      return e.__sentry_captured__;
    } catch {}
  }
  const rg = 1e3;
  function mi() {
    return Date.now() / rg;
  }
  function HT() {
    const { performance: e } = Pe;
    if (!(e != null && e.now)) return mi;
    const n = Date.now() - e.now(),
      a = e.timeOrigin == null ? n : e.timeOrigin;
    return () => (a + e.now()) / rg;
  }
  const gr = HT();
  function PT(e) {
    const n = gr(),
      a = {
        sid: Mn(),
        init: !0,
        timestamp: n,
        started: n,
        duration: 0,
        status: "ok",
        errors: 0,
        ignoreDuration: !1,
        toJSON: () => FT(a),
      };
    return (e && io(a, e), a);
  }
  function io(e, n = {}) {
    if (
      (n.user &&
        (!e.ipAddress && n.user.ip_address && (e.ipAddress = n.user.ip_address),
        !e.did &&
          !n.did &&
          (e.did = n.user.id || n.user.email || n.user.username)),
      (e.timestamp = n.timestamp || gr()),
      n.abnormal_mechanism && (e.abnormal_mechanism = n.abnormal_mechanism),
      n.ignoreDuration && (e.ignoreDuration = n.ignoreDuration),
      n.sid && (e.sid = n.sid.length === 32 ? n.sid : Mn()),
      n.init !== void 0 && (e.init = n.init),
      !e.did && n.did && (e.did = `${n.did}`),
      typeof n.started == "number" && (e.started = n.started),
      e.ignoreDuration)
    )
      e.duration = void 0;
    else if (typeof n.duration == "number") e.duration = n.duration;
    else {
      const a = e.timestamp - e.started;
      e.duration = a >= 0 ? a : 0;
    }
    (n.release && (e.release = n.release),
      n.environment && (e.environment = n.environment),
      !e.ipAddress && n.ipAddress && (e.ipAddress = n.ipAddress),
      !e.userAgent && n.userAgent && (e.userAgent = n.userAgent),
      typeof n.errors == "number" && (e.errors = n.errors),
      n.status && (e.status = n.status));
  }
  function qT(e, n) {
    let a = {};
    (e.status === "ok" && (a = { status: "exited" }), io(e, a));
  }
  function FT(e) {
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
  function gi(e, n, a = 2) {
    if (!n || typeof n != "object" || a <= 0) return n;
    if (e && Object.keys(n).length === 0) return e;
    const o = { ...e };
    for (const s in n)
      Object.prototype.hasOwnProperty.call(n, s) &&
        (o[s] = gi(o[s], n[s], a - 1));
    return o;
  }
  const Yc = "_sentrySpan";
  function ag(e, n) {
    n ? Sa(e, Yc, n) : delete e[Yc];
  }
  function og(e) {
    return e[Yc];
  }
  function ig() {
    return Mn();
  }
  function sg() {
    return Mn().substring(16);
  }
  const GT = 100;
  class tr {
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
          traceId: ig(),
          sampleRand: Math.random(),
        }));
    }
    clone() {
      const n = new tr();
      return (
        (n._breadcrumbs = [...this._breadcrumbs]),
        (n._tags = { ...this._tags }),
        (n._extra = { ...this._extra }),
        (n._contexts = { ...this._contexts }),
        this._contexts.flags &&
          (n._contexts.flags = { values: [...this._contexts.flags.values] }),
        (n._user = this._user),
        (n._level = this._level),
        (n._session = this._session),
        (n._transactionName = this._transactionName),
        (n._fingerprint = this._fingerprint),
        (n._eventProcessors = [...this._eventProcessors]),
        (n._attachments = [...this._attachments]),
        (n._sdkProcessingMetadata = { ...this._sdkProcessingMetadata }),
        (n._propagationContext = { ...this._propagationContext }),
        (n._client = this._client),
        (n._lastEventId = this._lastEventId),
        ag(n, og(this)),
        n
      );
    }
    setClient(n) {
      this._client = n;
    }
    setLastEventId(n) {
      this._lastEventId = n;
    }
    getClient() {
      return this._client;
    }
    lastEventId() {
      return this._lastEventId;
    }
    addScopeListener(n) {
      this._scopeListeners.push(n);
    }
    addEventProcessor(n) {
      return (this._eventProcessors.push(n), this);
    }
    setUser(n) {
      return (
        (this._user = n || {
          email: void 0,
          id: void 0,
          ip_address: void 0,
          username: void 0,
        }),
        this._session && io(this._session, { user: n }),
        this._notifyScopeListeners(),
        this
      );
    }
    getUser() {
      return this._user;
    }
    setTags(n) {
      return (
        (this._tags = { ...this._tags, ...n }),
        this._notifyScopeListeners(),
        this
      );
    }
    setTag(n, a) {
      return (
        (this._tags = { ...this._tags, [n]: a }),
        this._notifyScopeListeners(),
        this
      );
    }
    setExtras(n) {
      return (
        (this._extra = { ...this._extra, ...n }),
        this._notifyScopeListeners(),
        this
      );
    }
    setExtra(n, a) {
      return (
        (this._extra = { ...this._extra, [n]: a }),
        this._notifyScopeListeners(),
        this
      );
    }
    setFingerprint(n) {
      return ((this._fingerprint = n), this._notifyScopeListeners(), this);
    }
    setLevel(n) {
      return ((this._level = n), this._notifyScopeListeners(), this);
    }
    setTransactionName(n) {
      return ((this._transactionName = n), this._notifyScopeListeners(), this);
    }
    setContext(n, a) {
      return (
        a === null ? delete this._contexts[n] : (this._contexts[n] = a),
        this._notifyScopeListeners(),
        this
      );
    }
    setSession(n) {
      return (
        n ? (this._session = n) : delete this._session,
        this._notifyScopeListeners(),
        this
      );
    }
    getSession() {
      return this._session;
    }
    update(n) {
      if (!n) return this;
      const a = typeof n == "function" ? n(this) : n,
        o = a instanceof tr ? a.getScopeData() : hi(a) ? n : void 0,
        {
          tags: s,
          extra: u,
          user: c,
          contexts: d,
          level: h,
          fingerprint: m = [],
          propagationContext: g,
        } = o || {};
      return (
        (this._tags = { ...this._tags, ...s }),
        (this._extra = { ...this._extra, ...u }),
        (this._contexts = { ...this._contexts, ...d }),
        c && Object.keys(c).length && (this._user = c),
        h && (this._level = h),
        m.length && (this._fingerprint = m),
        g && (this._propagationContext = g),
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
        ag(this, void 0),
        (this._attachments = []),
        this.setPropagationContext({
          traceId: ig(),
          sampleRand: Math.random(),
        }),
        this._notifyScopeListeners(),
        this
      );
    }
    addBreadcrumb(n, a) {
      var u;
      const o = typeof a == "number" ? a : GT;
      if (o <= 0) return this;
      const s = {
        timestamp: mi(),
        ...n,
        message: n.message ? al(n.message, 2048) : n.message,
      };
      return (
        this._breadcrumbs.push(s),
        this._breadcrumbs.length > o &&
          ((this._breadcrumbs = this._breadcrumbs.slice(-o)),
          (u = this._client) == null ||
            u.recordDroppedEvent("buffer_overflow", "log_item")),
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
    addAttachment(n) {
      return (this._attachments.push(n), this);
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
        span: og(this),
      };
    }
    setSDKProcessingMetadata(n) {
      return (
        (this._sdkProcessingMetadata = gi(this._sdkProcessingMetadata, n, 2)),
        this
      );
    }
    setPropagationContext(n) {
      return ((this._propagationContext = n), this);
    }
    getPropagationContext() {
      return this._propagationContext;
    }
    captureException(n, a) {
      const o = (a == null ? void 0 : a.event_id) || Mn();
      if (!this._client)
        return (
          Ee.warn(
            "No client configured on scope - will not capture exception!",
          ),
          o
        );
      const s = new Error("Sentry syntheticException");
      return (
        this._client.captureException(
          n,
          { originalException: n, syntheticException: s, ...a, event_id: o },
          this,
        ),
        o
      );
    }
    captureMessage(n, a, o) {
      const s = (o == null ? void 0 : o.event_id) || Mn();
      if (!this._client)
        return (
          Ee.warn("No client configured on scope - will not capture message!"),
          s
        );
      const u = new Error(n);
      return (
        this._client.captureMessage(
          n,
          a,
          { originalException: n, syntheticException: u, ...o, event_id: s },
          this,
        ),
        s
      );
    }
    captureEvent(n, a) {
      const o = (a == null ? void 0 : a.event_id) || Mn();
      return this._client
        ? (this._client.captureEvent(n, { ...a, event_id: o }, this), o)
        : (Ee.warn("No client configured on scope - will not capture event!"),
          o);
    }
    _notifyScopeListeners() {
      this._notifyingListeners ||
        ((this._notifyingListeners = !0),
        this._scopeListeners.forEach((n) => {
          n(this);
        }),
        (this._notifyingListeners = !1));
    }
  }
  function VT() {
    return Js("defaultCurrentScope", () => new tr());
  }
  function KT() {
    return Js("defaultIsolationScope", () => new tr());
  }
  class YT {
    constructor(n, a) {
      let o;
      n ? (o = n) : (o = new tr());
      let s;
      (a ? (s = a) : (s = new tr()),
        (this._stack = [{ scope: o }]),
        (this._isolationScope = s));
    }
    withScope(n) {
      const a = this._pushScope();
      let o;
      try {
        o = n(a);
      } catch (s) {
        throw (this._popScope(), s);
      }
      return tl(o)
        ? o.then(
            (s) => (this._popScope(), s),
            (s) => {
              throw (this._popScope(), s);
            },
          )
        : (this._popScope(), o);
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
      const n = this.getScope().clone();
      return (this._stack.push({ client: this.getClient(), scope: n }), n);
    }
    _popScope() {
      return this._stack.length <= 1 ? !1 : !!this._stack.pop();
    }
  }
  function so() {
    const e = Qs(),
      n = Zs(e);
    return (n.stack = n.stack || new YT(VT(), KT()));
  }
  function XT(e) {
    return so().withScope(e);
  }
  function WT(e, n) {
    const a = so();
    return a.withScope(() => ((a.getStackTop().scope = e), n(e)));
  }
  function lg(e) {
    return so().withScope(() => e(so().getIsolationScope()));
  }
  function QT() {
    return {
      withIsolationScope: lg,
      withScope: XT,
      withSetScope: WT,
      withSetIsolationScope: (e, n) => lg(n),
      getCurrentScope: () => so().getScope(),
      getIsolationScope: () => so().getIsolationScope(),
    };
  }
  function Xc(e) {
    const n = Zs(e);
    return n.acs ? n.acs : QT();
  }
  function lo() {
    const e = Qs();
    return Xc(e).getCurrentScope();
  }
  function yi() {
    const e = Qs();
    return Xc(e).getIsolationScope();
  }
  function ZT() {
    return Js("globalScope", () => new tr());
  }
  function JT(...e) {
    const n = Qs(),
      a = Xc(n);
    if (e.length === 2) {
      const [o, s] = e;
      return o ? a.withSetScope(o, s) : a.withScope(s);
    }
    return a.withScope(e[0]);
  }
  function nn() {
    return lo().getClient();
  }
  function ex(e) {
    const n = e.getPropagationContext(),
      { traceId: a, parentSpanId: o, propagationSpanId: s } = n,
      u = { trace_id: a, span_id: s || sg() };
    return (o && (u.parent_span_id = o), u);
  }
  const tx = "sentry.source",
    nx = "sentry.sample_rate",
    rx = "sentry.previous_trace_sample_rate",
    ax = "sentry.op",
    ox = "sentry.origin",
    ug = "sentry.profile_id",
    cg = "sentry.exclusive_time",
    ix = 0,
    sx = 1,
    lx = "_sentryScope",
    ux = "_sentryIsolationScope";
  function fg(e) {
    return { scope: e[lx], isolationScope: e[ux] };
  }
  function cx(e) {
    if (typeof e == "boolean") return Number(e);
    const n = typeof e == "string" ? parseFloat(e) : e;
    if (!(typeof n != "number" || isNaN(n) || n < 0 || n > 1)) return n;
  }
  const fx = "sentry-",
    dx = /^sentry-/;
  function px(e) {
    const n = hx(e);
    if (!n) return;
    const a = Object.entries(n).reduce((o, [s, u]) => {
      if (s.match(dx)) {
        const c = s.slice(fx.length);
        o[c] = u;
      }
      return o;
    }, {});
    if (Object.keys(a).length > 0) return a;
  }
  function hx(e) {
    if (!(!e || (!mr(e) && !Array.isArray(e))))
      return Array.isArray(e)
        ? e.reduce((n, a) => {
            const o = dg(a);
            return (
              Object.entries(o).forEach(([s, u]) => {
                n[s] = u;
              }),
              n
            );
          }, {})
        : dg(e);
  }
  function dg(e) {
    return e
      .split(",")
      .map((n) => n.split("=").map((a) => decodeURIComponent(a.trim())))
      .reduce((n, [a, o]) => (a && o && (n[a] = o), n), {});
  }
  const pg = 1;
  let hg = !1;
  function mx(e) {
    const { spanId: n, traceId: a, isRemote: o } = e.spanContext(),
      s = o ? n : Wc(e).parent_span_id,
      u = fg(e).scope,
      c = o
        ? (u == null ? void 0 : u.getPropagationContext().propagationSpanId) ||
          sg()
        : n;
    return { parent_span_id: s, span_id: c, trace_id: a };
  }
  function gx(e) {
    if (e && e.length > 0)
      return e.map(
        ({
          context: { spanId: n, traceId: a, traceFlags: o, ...s },
          attributes: u,
        }) => ({
          span_id: n,
          trace_id: a,
          sampled: o === pg,
          attributes: u,
          ...s,
        }),
      );
  }
  function mg(e) {
    return typeof e == "number"
      ? gg(e)
      : Array.isArray(e)
        ? e[0] + e[1] / 1e9
        : e instanceof Date
          ? gg(e.getTime())
          : gr();
  }
  function gg(e) {
    return e > 9999999999 ? e / 1e3 : e;
  }
  function Wc(e) {
    if (bx(e)) return e.getSpanJSON();
    const { spanId: n, traceId: a } = e.spanContext();
    if (yx(e)) {
      const {
        attributes: o,
        startTime: s,
        name: u,
        endTime: c,
        parentSpanId: d,
        status: h,
        links: m,
      } = e;
      return {
        span_id: n,
        trace_id: a,
        data: o,
        description: u,
        parent_span_id: d,
        start_timestamp: mg(s),
        timestamp: mg(c) || void 0,
        status: Sx(h),
        op: o[ax],
        origin: o[ox],
        links: gx(m),
      };
    }
    return { span_id: n, trace_id: a, start_timestamp: 0, data: {} };
  }
  function yx(e) {
    const n = e;
    return (
      !!n.attributes && !!n.startTime && !!n.name && !!n.endTime && !!n.status
    );
  }
  function bx(e) {
    return typeof e.getSpanJSON == "function";
  }
  function vx(e) {
    const { traceFlags: n } = e.spanContext();
    return n === pg;
  }
  function Sx(e) {
    if (!(!e || e.code === ix))
      return e.code === sx ? "ok" : e.message || "unknown_error";
  }
  const Ex = "_sentryRootSpan";
  function yg(e) {
    return e[Ex] || e;
  }
  function bg() {
    hg ||
      (rl(() => {
        console.warn(
          "[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly.",
        );
      }),
      (hg = !0));
  }
  const vg = 50,
    _a = "?",
    Sg = /\(error: (.*)\)/,
    Eg = /captureMessage|captureException/;
  function _x(...e) {
    const n = e.sort((a, o) => a[0] - o[0]).map((a) => a[1]);
    return (a, o = 0, s = 0) => {
      const u = [],
        c = a.split(`
`);
      for (let d = o; d < c.length; d++) {
        const h = c[d];
        if (h.length > 1024) continue;
        const m = Sg.test(h) ? h.replace(Sg, "$1") : h;
        if (!m.match(/\S*Error: /)) {
          for (const g of n) {
            const b = g(m);
            if (b) {
              u.push(b);
              break;
            }
          }
          if (u.length >= vg + s) break;
        }
      }
      return Tx(u.slice(s));
    };
  }
  function Tx(e) {
    if (!e.length) return [];
    const n = Array.from(e);
    return (
      /sentryWrapped/.test(il(n).function || "") && n.pop(),
      n.reverse(),
      Eg.test(il(n).function || "") &&
        (n.pop(), Eg.test(il(n).function || "") && n.pop()),
      n
        .slice(0, vg)
        .map((a) => ({
          ...a,
          filename: a.filename || il(n).filename,
          function: a.function || _a,
        }))
    );
  }
  function il(e) {
    return e[e.length - 1] || {};
  }
  const Qc = "<anonymous>";
  function Ir(e) {
    try {
      return !e || typeof e != "function" ? Qc : e.name || Qc;
    } catch {
      return Qc;
    }
  }
  function _g(e) {
    const n = e.exception;
    if (n) {
      const a = [];
      try {
        return (
          n.values.forEach((o) => {
            o.stacktrace.frames && a.push(...o.stacktrace.frames);
          }),
          a
        );
      } catch {
        return;
      }
    }
  }
  const sl = {},
    Tg = {};
  function Ta(e, n) {
    ((sl[e] = sl[e] || []), sl[e].push(n));
  }
  function xa(e, n) {
    if (!Tg[e]) {
      Tg[e] = !0;
      try {
        n();
      } catch (a) {
        va && Ee.error(`Error while instrumenting ${e}`, a);
      }
    }
  }
  function Fn(e, n) {
    const a = e && sl[e];
    if (a)
      for (const o of a)
        try {
          o(n);
        } catch (s) {
          va &&
            Ee.error(
              `Error while triggering instrumentation handler.
Type: ${e}
Name: ${Ir(o)}
Error:`,
              s,
            );
        }
  }
  let Zc = null;
  function xx(e) {
    const n = "error";
    (Ta(n, e), xa(n, Cx));
  }
  function Cx() {
    ((Zc = Pe.onerror),
      (Pe.onerror = function (e, n, a, o, s) {
        return (
          Fn("error", { column: o, error: s, line: a, msg: e, url: n }),
          Zc ? Zc.apply(this, arguments) : !1
        );
      }),
      (Pe.onerror.__SENTRY_INSTRUMENTED__ = !0));
  }
  let Jc = null;
  function wx(e) {
    const n = "unhandledrejection";
    (Ta(n, e), xa(n, Rx));
  }
  function Rx() {
    ((Jc = Pe.onunhandledrejection),
      (Pe.onunhandledrejection = function (e) {
        return (
          Fn("unhandledrejection", e),
          Jc ? Jc.apply(this, arguments) : !0
        );
      }),
      (Pe.onunhandledrejection.__SENTRY_INSTRUMENTED__ = !0));
  }
  function Ax(e) {
    var a;
    if (typeof __SENTRY_TRACING__ == "boolean" && !__SENTRY_TRACING__)
      return !1;
    const n = e || ((a = nn()) == null ? void 0 : a.getOptions());
    return !!n && (n.tracesSampleRate != null || !!n.tracesSampler);
  }
  const ef = "production",
    Ox = "_frozenDsc";
  function xg(e, n) {
    const a = n.getOptions(),
      { publicKey: o } = n.getDsn() || {},
      s = {
        environment: a.environment || ef,
        release: a.release,
        public_key: o,
        trace_id: e,
      };
    return (n.emit("createDsc", s), s);
  }
  function Mx(e, n) {
    const a = n.getPropagationContext();
    return a.dsc || xg(a.traceId, e);
  }
  function Dx(e) {
    var _;
    const n = nn();
    if (!n) return {};
    const a = yg(e),
      o = Wc(a),
      s = o.data,
      u = a.spanContext().traceState,
      c = (u == null ? void 0 : u.get("sentry.sample_rate")) ?? s[nx] ?? s[rx];
    function d(v) {
      return (
        (typeof c == "number" || typeof c == "string") &&
          (v.sample_rate = `${c}`),
        v
      );
    }
    const h = a[Ox];
    if (h) return d(h);
    const m = u == null ? void 0 : u.get("sentry.dsc"),
      g = m && px(m);
    if (g) return d(g);
    const b = xg(e.spanContext().traceId, n),
      x = s[tx],
      C = o.description;
    return (
      x !== "url" && C && (b.transaction = C),
      Ax() &&
        ((b.sampled = String(vx(a))),
        (b.sample_rand =
          (u == null ? void 0 : u.get("sentry.sample_rand")) ??
          ((_ = fg(a).scope) == null
            ? void 0
            : _.getPropagationContext().sampleRand.toString()))),
      d(b),
      n.emit("createDsc", b, a),
      b
    );
  }
  const Nx = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
  function kx(e) {
    return e === "http" || e === "https";
  }
  function ll(e, n = !1) {
    const {
      host: a,
      path: o,
      pass: s,
      port: u,
      projectId: c,
      protocol: d,
      publicKey: h,
    } = e;
    return `${d}://${h}${n && s ? `:${s}` : ""}@${a}${u ? `:${u}` : ""}/${o && `${o}/`}${c}`;
  }
  function zx(e) {
    const n = Nx.exec(e);
    if (!n) {
      rl(() => {
        console.error(`Invalid Sentry Dsn: ${e}`);
      });
      return;
    }
    const [a, o, s = "", u = "", c = "", d = ""] = n.slice(1);
    let h = "",
      m = d;
    const g = m.split("/");
    if ((g.length > 1 && ((h = g.slice(0, -1).join("/")), (m = g.pop())), m)) {
      const b = m.match(/^\d+/);
      b && (m = b[0]);
    }
    return Cg({
      host: u,
      pass: s,
      path: h,
      projectId: m,
      port: c,
      protocol: a,
      publicKey: o,
    });
  }
  function Cg(e) {
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
  function Bx(e) {
    if (!va) return !0;
    const { port: n, projectId: a, protocol: o } = e;
    return ["protocol", "publicKey", "host", "projectId"].find((c) =>
      e[c] ? !1 : (Ee.error(`Invalid Sentry Dsn: ${c} missing`), !0),
    )
      ? !1
      : a.match(/^\d+$/)
        ? kx(o)
          ? n && isNaN(parseInt(n, 10))
            ? (Ee.error(`Invalid Sentry Dsn: Invalid port ${n}`), !1)
            : !0
          : (Ee.error(`Invalid Sentry Dsn: Invalid protocol ${o}`), !1)
        : (Ee.error(`Invalid Sentry Dsn: Invalid projectId ${a}`), !1);
  }
  function Lx(e) {
    const n = typeof e == "string" ? zx(e) : Cg(e);
    if (!(!n || !Bx(n))) return n;
  }
  function yr(e, n = 100, a = 1 / 0) {
    try {
      return tf("", e, n, a);
    } catch (o) {
      return { ERROR: `**non-serializable** (${o})` };
    }
  }
  function wg(e, n = 3, a = 100 * 1024) {
    const o = yr(e, n);
    return Ix(o) > a ? wg(e, n - 1, a) : o;
  }
  function tf(e, n, a = 1 / 0, o = 1 / 0, s = Hx()) {
    const [u, c] = s;
    if (
      n == null ||
      ["boolean", "string"].includes(typeof n) ||
      (typeof n == "number" && Number.isFinite(n))
    )
      return n;
    const d = Ux(e, n);
    if (!d.startsWith("[object ")) return d;
    if (n.__sentry_skip_normalization__) return n;
    const h =
      typeof n.__sentry_override_normalization_depth__ == "number"
        ? n.__sentry_override_normalization_depth__
        : a;
    if (h === 0) return d.replace("object ", "");
    if (u(n)) return "[Circular ~]";
    const m = n;
    if (m && typeof m.toJSON == "function")
      try {
        const C = m.toJSON();
        return tf("", C, h - 1, o, s);
      } catch {}
    const g = Array.isArray(n) ? [] : {};
    let b = 0;
    const x = Zm(n);
    for (const C in x) {
      if (!Object.prototype.hasOwnProperty.call(x, C)) continue;
      if (b >= o) {
        g[C] = "[MaxProperties ~]";
        break;
      }
      const _ = x[C];
      ((g[C] = tf(C, _, h - 1, o, s)), b++);
    }
    return (c(n), g);
  }
  function Ux(e, n) {
    try {
      if (e === "domain" && n && typeof n == "object" && n._events)
        return "[Domain]";
      if (e === "domainEmitter") return "[DomainEmitter]";
      if (typeof global < "u" && n === global) return "[Global]";
      if (typeof window < "u" && n === window) return "[Window]";
      if (typeof document < "u" && n === document) return "[Document]";
      if (Km(n)) return "[VueViewModel]";
      if (MT(n)) return "[SyntheticEvent]";
      if (typeof n == "number" && !Number.isFinite(n)) return `[${n}]`;
      if (typeof n == "function") return `[Function: ${Ir(n)}]`;
      if (typeof n == "symbol") return `[${String(n)}]`;
      if (typeof n == "bigint") return `[BigInt: ${String(n)}]`;
      const a = jx(n);
      return /^HTML(\w*)Element$/.test(a)
        ? `[HTMLElement: ${a}]`
        : `[object ${a}]`;
    } catch (a) {
      return `**non-serializable** (${a})`;
    }
  }
  function jx(e) {
    const n = Object.getPrototypeOf(e);
    return n != null && n.constructor ? n.constructor.name : "null prototype";
  }
  function $x(e) {
    return ~-encodeURI(e).split(/%..|./).length;
  }
  function Ix(e) {
    return $x(JSON.stringify(e));
  }
  function Hx() {
    const e = new WeakSet();
    function n(o) {
      return e.has(o) ? !0 : (e.add(o), !1);
    }
    function a(o) {
      e.delete(o);
    }
    return [n, a];
  }
  function bi(e, n = []) {
    return [e, n];
  }
  function Px(e, n) {
    const [a, o] = e;
    return [a, [...o, n]];
  }
  function Rg(e, n) {
    const a = e[1];
    for (const o of a) {
      const s = o[0].type;
      if (n(o, s)) return !0;
    }
    return !1;
  }
  function nf(e) {
    const n = Zs(Pe);
    return n.encodePolyfill ? n.encodePolyfill(e) : new TextEncoder().encode(e);
  }
  function qx(e) {
    const [n, a] = e;
    let o = JSON.stringify(n);
    function s(u) {
      typeof o == "string"
        ? (o = typeof u == "string" ? o + u : [nf(o), u])
        : o.push(typeof u == "string" ? nf(u) : u);
    }
    for (const u of a) {
      const [c, d] = u;
      if (
        (s(`
${JSON.stringify(c)}
`),
        typeof d == "string" || d instanceof Uint8Array)
      )
        s(d);
      else {
        let h;
        try {
          h = JSON.stringify(d);
        } catch {
          h = JSON.stringify(yr(d));
        }
        s(h);
      }
    }
    return typeof o == "string" ? o : Fx(o);
  }
  function Fx(e) {
    const n = e.reduce((s, u) => s + u.length, 0),
      a = new Uint8Array(n);
    let o = 0;
    for (const s of e) (a.set(s, o), (o += s.length));
    return a;
  }
  function Gx(e) {
    const n = typeof e.data == "string" ? nf(e.data) : e.data;
    return [
      {
        type: "attachment",
        length: n.length,
        filename: e.filename,
        content_type: e.contentType,
        attachment_type: e.attachmentType,
      },
      n,
    ];
  }
  const Vx = {
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
  function Ag(e) {
    return Vx[e];
  }
  function Og(e) {
    if (!(e != null && e.sdk)) return;
    const { name: n, version: a } = e.sdk;
    return { name: n, version: a };
  }
  function Kx(e, n, a, o) {
    var u;
    const s =
      (u = e.sdkProcessingMetadata) == null ? void 0 : u.dynamicSamplingContext;
    return {
      event_id: e.event_id,
      sent_at: new Date().toISOString(),
      ...(n && { sdk: n }),
      ...(!!a && o && { dsn: ll(o) }),
      ...(s && { trace: s }),
    };
  }
  function Yx(e, n) {
    return (
      n &&
        ((e.sdk = e.sdk || {}),
        (e.sdk.name = e.sdk.name || n.name),
        (e.sdk.version = e.sdk.version || n.version),
        (e.sdk.integrations = [
          ...(e.sdk.integrations || []),
          ...(n.integrations || []),
        ]),
        (e.sdk.packages = [...(e.sdk.packages || []), ...(n.packages || [])])),
      e
    );
  }
  function Xx(e, n, a, o) {
    const s = Og(a),
      u = {
        sent_at: new Date().toISOString(),
        ...(s && { sdk: s }),
        ...(!!o && n && { dsn: ll(n) }),
      },
      c =
        "aggregates" in e
          ? [{ type: "sessions" }, e]
          : [{ type: "session" }, e.toJSON()];
    return bi(u, [c]);
  }
  function Wx(e, n, a, o) {
    const s = Og(a),
      u = e.type && e.type !== "replay_event" ? e.type : "event";
    Yx(e, a == null ? void 0 : a.sdk);
    const c = Kx(e, s, o, n);
    return (delete e.sdkProcessingMetadata, bi(c, [[{ type: u }, e]]));
  }
  var br;
  (function (e) {
    e[(e.PENDING = 0)] = "PENDING";
    const a = 1;
    e[(e.RESOLVED = a)] = "RESOLVED";
    const o = 2;
    e[(e.REJECTED = o)] = "REJECTED";
  })(br || (br = {}));
  function Ca(e) {
    return new Hr((n) => {
      n(e);
    });
  }
  function ul(e) {
    return new Hr((n, a) => {
      a(e);
    });
  }
  class Hr {
    constructor(n) {
      ((this._state = br.PENDING), (this._handlers = []), this._runExecutor(n));
    }
    then(n, a) {
      return new Hr((o, s) => {
        (this._handlers.push([
          !1,
          (u) => {
            if (!n) o(u);
            else
              try {
                o(n(u));
              } catch (c) {
                s(c);
              }
          },
          (u) => {
            if (!a) s(u);
            else
              try {
                o(a(u));
              } catch (c) {
                s(c);
              }
          },
        ]),
          this._executeHandlers());
      });
    }
    catch(n) {
      return this.then((a) => a, n);
    }
    finally(n) {
      return new Hr((a, o) => {
        let s, u;
        return this.then(
          (c) => {
            ((u = !1), (s = c), n && n());
          },
          (c) => {
            ((u = !0), (s = c), n && n());
          },
        ).then(() => {
          if (u) {
            o(s);
            return;
          }
          a(s);
        });
      });
    }
    _executeHandlers() {
      if (this._state === br.PENDING) return;
      const n = this._handlers.slice();
      ((this._handlers = []),
        n.forEach((a) => {
          a[0] ||
            (this._state === br.RESOLVED && a[1](this._value),
            this._state === br.REJECTED && a[2](this._value),
            (a[0] = !0));
        }));
    }
    _runExecutor(n) {
      const a = (u, c) => {
          if (this._state === br.PENDING) {
            if (tl(c)) {
              c.then(o, s);
              return;
            }
            ((this._state = u), (this._value = c), this._executeHandlers());
          }
        },
        o = (u) => {
          a(br.RESOLVED, u);
        },
        s = (u) => {
          a(br.REJECTED, u);
        };
      try {
        n(o, s);
      } catch (u) {
        s(u);
      }
    }
  }
  function rf(e, n, a, o = 0) {
    return new Hr((s, u) => {
      const c = e[o];
      if (n === null || typeof c != "function") s(n);
      else {
        const d = c({ ...n }, a);
        (at &&
          c.id &&
          d === null &&
          Ee.log(`Event processor "${c.id}" dropped event`),
          tl(d)
            ? d.then((h) => rf(e, h, a, o + 1).then(s)).then(null, u)
            : rf(e, d, a, o + 1)
                .then(s)
                .then(null, u));
      }
    });
  }
  let cl, Mg, fl;
  function Qx(e) {
    const n = Pe._sentryDebugIds;
    if (!n) return {};
    const a = Object.keys(n);
    return (
      (fl && a.length === Mg) ||
        ((Mg = a.length),
        (fl = a.reduce((o, s) => {
          cl || (cl = {});
          const u = cl[s];
          if (u) o[u[0]] = u[1];
          else {
            const c = e(s);
            for (let d = c.length - 1; d >= 0; d--) {
              const h = c[d],
                m = h == null ? void 0 : h.filename,
                g = n[s];
              if (m && g) {
                ((o[m] = g), (cl[s] = [m, g]));
                break;
              }
            }
          }
          return o;
        }, {}))),
      fl
    );
  }
  function Zx(e, n) {
    const {
      fingerprint: a,
      span: o,
      breadcrumbs: s,
      sdkProcessingMetadata: u,
    } = n;
    (Jx(e, n), o && nC(e, o), rC(e, a), eC(e, s), tC(e, u));
  }
  function Dg(e, n) {
    const {
      extra: a,
      tags: o,
      user: s,
      contexts: u,
      level: c,
      sdkProcessingMetadata: d,
      breadcrumbs: h,
      fingerprint: m,
      eventProcessors: g,
      attachments: b,
      propagationContext: x,
      transactionName: C,
      span: _,
    } = n;
    (dl(e, "extra", a),
      dl(e, "tags", o),
      dl(e, "user", s),
      dl(e, "contexts", u),
      (e.sdkProcessingMetadata = gi(e.sdkProcessingMetadata, d, 2)),
      c && (e.level = c),
      C && (e.transactionName = C),
      _ && (e.span = _),
      h.length && (e.breadcrumbs = [...e.breadcrumbs, ...h]),
      m.length && (e.fingerprint = [...e.fingerprint, ...m]),
      g.length && (e.eventProcessors = [...e.eventProcessors, ...g]),
      b.length && (e.attachments = [...e.attachments, ...b]),
      (e.propagationContext = { ...e.propagationContext, ...x }));
  }
  function dl(e, n, a) {
    e[n] = gi(e[n], a, 1);
  }
  function Jx(e, n) {
    const {
      extra: a,
      tags: o,
      user: s,
      contexts: u,
      level: c,
      transactionName: d,
    } = n;
    (Object.keys(a).length && (e.extra = { ...a, ...e.extra }),
      Object.keys(o).length && (e.tags = { ...o, ...e.tags }),
      Object.keys(s).length && (e.user = { ...s, ...e.user }),
      Object.keys(u).length && (e.contexts = { ...u, ...e.contexts }),
      c && (e.level = c),
      d && e.type !== "transaction" && (e.transaction = d));
  }
  function eC(e, n) {
    const a = [...(e.breadcrumbs || []), ...n];
    e.breadcrumbs = a.length ? a : void 0;
  }
  function tC(e, n) {
    e.sdkProcessingMetadata = { ...e.sdkProcessingMetadata, ...n };
  }
  function nC(e, n) {
    ((e.contexts = { trace: mx(n), ...e.contexts }),
      (e.sdkProcessingMetadata = {
        dynamicSamplingContext: Dx(n),
        ...e.sdkProcessingMetadata,
      }));
    const a = yg(n),
      o = Wc(a).description;
    o && !e.transaction && e.type === "transaction" && (e.transaction = o);
  }
  function rC(e, n) {
    ((e.fingerprint = e.fingerprint
      ? Array.isArray(e.fingerprint)
        ? e.fingerprint
        : [e.fingerprint]
      : []),
      n && (e.fingerprint = e.fingerprint.concat(n)),
      e.fingerprint.length || delete e.fingerprint);
  }
  function aC(e, n, a, o, s, u) {
    const { normalizeDepth: c = 3, normalizeMaxBreadth: d = 1e3 } = e,
      h = {
        ...n,
        event_id: n.event_id || a.event_id || Mn(),
        timestamp: n.timestamp || mi(),
      },
      m = a.integrations || e.integrations.map((E) => E.name);
    (oC(h, e),
      lC(h, m),
      s && s.emit("applyFrameMetadata", n),
      n.type === void 0 && iC(h, e.stackParser));
    const g = cC(o, a.captureContext);
    a.mechanism && oo(h, a.mechanism);
    const b = s ? s.getEventProcessors() : [],
      x = ZT().getScopeData();
    if (u) {
      const E = u.getScopeData();
      Dg(x, E);
    }
    if (g) {
      const E = g.getScopeData();
      Dg(x, E);
    }
    const C = [...(a.attachments || []), ...x.attachments];
    (C.length && (a.attachments = C), Zx(h, x));
    const _ = [...b, ...x.eventProcessors];
    return rf(_, h, a).then(
      (E) => (E && sC(E), typeof c == "number" && c > 0 ? uC(E, c, d) : E),
    );
  }
  function oC(e, n) {
    const { environment: a, release: o, dist: s, maxValueLength: u = 250 } = n;
    ((e.environment = e.environment || a || ef),
      !e.release && o && (e.release = o),
      !e.dist && s && (e.dist = s));
    const c = e.request;
    c != null && c.url && (c.url = al(c.url, u));
  }
  function iC(e, n) {
    var o, s;
    const a = Qx(n);
    (s = (o = e.exception) == null ? void 0 : o.values) == null ||
      s.forEach((u) => {
        var c, d;
        (d = (c = u.stacktrace) == null ? void 0 : c.frames) == null ||
          d.forEach((h) => {
            h.filename && (h.debug_id = a[h.filename]);
          });
      });
  }
  function sC(e) {
    var o, s;
    const n = {};
    if (
      ((s = (o = e.exception) == null ? void 0 : o.values) == null ||
        s.forEach((u) => {
          var c, d;
          (d = (c = u.stacktrace) == null ? void 0 : c.frames) == null ||
            d.forEach((h) => {
              h.debug_id &&
                (h.abs_path
                  ? (n[h.abs_path] = h.debug_id)
                  : h.filename && (n[h.filename] = h.debug_id),
                delete h.debug_id);
            });
        }),
      Object.keys(n).length === 0)
    )
      return;
    ((e.debug_meta = e.debug_meta || {}),
      (e.debug_meta.images = e.debug_meta.images || []));
    const a = e.debug_meta.images;
    Object.entries(n).forEach(([u, c]) => {
      a.push({ type: "sourcemap", code_file: u, debug_id: c });
    });
  }
  function lC(e, n) {
    n.length > 0 &&
      ((e.sdk = e.sdk || {}),
      (e.sdk.integrations = [...(e.sdk.integrations || []), ...n]));
  }
  function uC(e, n, a) {
    var s, u;
    if (!e) return null;
    const o = {
      ...e,
      ...(e.breadcrumbs && {
        breadcrumbs: e.breadcrumbs.map((c) => ({
          ...c,
          ...(c.data && { data: yr(c.data, n, a) }),
        })),
      }),
      ...(e.user && { user: yr(e.user, n, a) }),
      ...(e.contexts && { contexts: yr(e.contexts, n, a) }),
      ...(e.extra && { extra: yr(e.extra, n, a) }),
    };
    return (
      (s = e.contexts) != null &&
        s.trace &&
        o.contexts &&
        ((o.contexts.trace = e.contexts.trace),
        e.contexts.trace.data &&
          (o.contexts.trace.data = yr(e.contexts.trace.data, n, a))),
      e.spans &&
        (o.spans = e.spans.map((c) => ({
          ...c,
          ...(c.data && { data: yr(c.data, n, a) }),
        }))),
      (u = e.contexts) != null &&
        u.flags &&
        o.contexts &&
        (o.contexts.flags = yr(e.contexts.flags, 3, a)),
      o
    );
  }
  function cC(e, n) {
    if (!n) return e;
    const a = e ? e.clone() : new tr();
    return (a.update(n), a);
  }
  function Q6(e) {}
  function fC(e, n) {
    return lo().captureException(e, void 0);
  }
  function Ng(e, n) {
    return lo().captureEvent(e, n);
  }
  function kg(e) {
    const n = yi(),
      a = lo(),
      { userAgent: o } = Pe.navigator || {},
      s = PT({
        user: a.getUser() || n.getUser(),
        ...(o && { userAgent: o }),
        ...e,
      }),
      u = n.getSession();
    return (
      (u == null ? void 0 : u.status) === "ok" && io(u, { status: "exited" }),
      zg(),
      n.setSession(s),
      s
    );
  }
  function zg() {
    const e = yi(),
      a = lo().getSession() || e.getSession();
    (a && qT(a), Bg(), e.setSession());
  }
  function Bg() {
    const e = yi(),
      n = nn(),
      a = e.getSession();
    a && n && n.captureSession(a);
  }
  function Lg(e = !1) {
    if (e) {
      zg();
      return;
    }
    Bg();
  }
  const dC = "7";
  function pC(e) {
    const n = e.protocol ? `${e.protocol}:` : "",
      a = e.port ? `:${e.port}` : "";
    return `${n}//${e.host}${a}${e.path ? `/${e.path}` : ""}/api/`;
  }
  function hC(e) {
    return `${pC(e)}${e.projectId}/envelope/`;
  }
  function mC(e, n) {
    const a = { sentry_version: dC };
    return (
      e.publicKey && (a.sentry_key = e.publicKey),
      n && (a.sentry_client = `${n.name}/${n.version}`),
      new URLSearchParams(a).toString()
    );
  }
  function gC(e, n, a) {
    return n || `${hC(e)}?${mC(e, a)}`;
  }
  const Ug = [];
  function yC(e, n) {
    const a = {};
    return (
      n.forEach((o) => {
        o && $g(e, o, a);
      }),
      a
    );
  }
  function jg(e, n) {
    for (const a of n) a != null && a.afterAllSetup && a.afterAllSetup(e);
  }
  function $g(e, n, a) {
    if (a[n.name]) {
      at &&
        Ee.log(
          `Integration skipped because it was already installed: ${n.name}`,
        );
      return;
    }
    if (
      ((a[n.name] = n),
      Ug.indexOf(n.name) === -1 &&
        typeof n.setupOnce == "function" &&
        (n.setupOnce(), Ug.push(n.name)),
      n.setup && typeof n.setup == "function" && n.setup(e),
      typeof n.preprocessEvent == "function")
    ) {
      const o = n.preprocessEvent.bind(n);
      e.on("preprocessEvent", (s, u) => o(s, u, e));
    }
    if (typeof n.processEvent == "function") {
      const o = n.processEvent.bind(n),
        s = Object.assign((u, c) => o(u, c, e), { id: n.name });
      e.addEventProcessor(s);
    }
    at && Ee.log(`Integration installed: ${n.name}`);
  }
  function Z6(e) {
    return e;
  }
  function Ig(e) {
    const n = [];
    e.message && n.push(e.message);
    try {
      const a = e.exception.values[e.exception.values.length - 1];
      a != null &&
        a.value &&
        (n.push(a.value), a.type && n.push(`${a.type}: ${a.value}`));
    } catch {}
    return n;
  }
  function bC(e) {
    var h;
    const {
      trace_id: n,
      parent_span_id: a,
      span_id: o,
      status: s,
      origin: u,
      data: c,
      op: d,
    } = ((h = e.contexts) == null ? void 0 : h.trace) ?? {};
    return {
      data: c ?? {},
      description: e.transaction,
      op: d,
      parent_span_id: a,
      span_id: o ?? "",
      start_timestamp: e.start_timestamp ?? 0,
      status: s,
      timestamp: e.timestamp,
      trace_id: n ?? "",
      origin: u,
      profile_id: c == null ? void 0 : c[ug],
      exclusive_time: c == null ? void 0 : c[cg],
      measurements: e.measurements,
      is_segment: !0,
    };
  }
  function vC(e) {
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
            ...(e.profile_id && { [ug]: e.profile_id }),
            ...(e.exclusive_time && { [cg]: e.exclusive_time }),
          },
        },
      },
      measurements: e.measurements,
    };
  }
  function SC(e, n, a) {
    const o = [
      { type: "client_report" },
      { timestamp: mi(), discarded_events: e },
    ];
    return bi(n ? { dsn: n } : {}, [o]);
  }
  const Hg = "Not capturing exception because it's already been captured.",
    Pg = "Discarded session because of missing or non-string release",
    qg = Symbol.for("SentryInternalError"),
    Fg = Symbol.for("SentryDoNotSendEventError");
  function pl(e) {
    return { message: e, [qg]: !0 };
  }
  function af(e) {
    return { message: e, [Fg]: !0 };
  }
  function Gg(e) {
    return !!e && typeof e == "object" && qg in e;
  }
  function Vg(e) {
    return !!e && typeof e == "object" && Fg in e;
  }
  class EC {
    constructor(n) {
      if (
        ((this._options = n),
        (this._integrations = {}),
        (this._numProcessing = 0),
        (this._outcomes = {}),
        (this._hooks = {}),
        (this._eventProcessors = []),
        n.dsn
          ? (this._dsn = Lx(n.dsn))
          : at && Ee.warn("No DSN provided, client will not send events."),
        this._dsn)
      ) {
        const a = gC(
          this._dsn,
          n.tunnel,
          n._metadata ? n._metadata.sdk : void 0,
        );
        this._transport = n.transport({
          tunnel: this._options.tunnel,
          recordDroppedEvent: this.recordDroppedEvent.bind(this),
          ...n.transportOptions,
          url: a,
        });
      }
    }
    captureException(n, a, o) {
      const s = Mn();
      if (ng(n)) return (at && Ee.log(Hg), s);
      const u = { event_id: s, ...a };
      return (
        this._process(
          this.eventFromException(n, u).then((c) =>
            this._captureEvent(c, u, o),
          ),
        ),
        u.event_id
      );
    }
    captureMessage(n, a, o, s) {
      const u = { event_id: Mn(), ...o },
        c = Pc(n) ? n : String(n),
        d = qc(n)
          ? this.eventFromMessage(c, a, u)
          : this.eventFromException(n, u);
      return (
        this._process(d.then((h) => this._captureEvent(h, u, s))),
        u.event_id
      );
    }
    captureEvent(n, a, o) {
      const s = Mn();
      if (a != null && a.originalException && ng(a.originalException))
        return (at && Ee.log(Hg), s);
      const u = { event_id: s, ...a },
        c = n.sdkProcessingMetadata || {},
        d = c.capturedSpanScope,
        h = c.capturedSpanIsolationScope;
      return (this._process(this._captureEvent(n, u, d || o, h)), u.event_id);
    }
    captureSession(n) {
      (this.sendSession(n), io(n, { init: !1 }));
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
    flush(n) {
      const a = this._transport;
      return a
        ? (this.emit("flush"),
          this._isClientDoneProcessing(n).then((o) =>
            a.flush(n).then((s) => o && s),
          ))
        : Ca(!0);
    }
    close(n) {
      return this.flush(n).then(
        (a) => ((this.getOptions().enabled = !1), this.emit("close"), a),
      );
    }
    getEventProcessors() {
      return this._eventProcessors;
    }
    addEventProcessor(n) {
      this._eventProcessors.push(n);
    }
    init() {
      (this._isEnabled() ||
        this._options.integrations.some(({ name: n }) =>
          n.startsWith("Spotlight"),
        )) &&
        this._setupIntegrations();
    }
    getIntegrationByName(n) {
      return this._integrations[n];
    }
    addIntegration(n) {
      const a = this._integrations[n.name];
      ($g(this, n, this._integrations), a || jg(this, [n]));
    }
    sendEvent(n, a = {}) {
      this.emit("beforeSendEvent", n, a);
      let o = Wx(n, this._dsn, this._options._metadata, this._options.tunnel);
      for (const u of a.attachments || []) o = Px(o, Gx(u));
      const s = this.sendEnvelope(o);
      s && s.then((u) => this.emit("afterSendEvent", n, u), null);
    }
    sendSession(n) {
      const { release: a, environment: o = ef } = this._options;
      if ("aggregates" in n) {
        const u = n.attrs || {};
        if (!u.release && !a) {
          at && Ee.warn(Pg);
          return;
        }
        ((u.release = u.release || a),
          (u.environment = u.environment || o),
          (n.attrs = u));
      } else {
        if (!n.release && !a) {
          at && Ee.warn(Pg);
          return;
        }
        ((n.release = n.release || a), (n.environment = n.environment || o));
      }
      this.emit("beforeSendSession", n);
      const s = Xx(n, this._dsn, this._options._metadata, this._options.tunnel);
      this.sendEnvelope(s);
    }
    recordDroppedEvent(n, a, o = 1) {
      if (this._options.sendClientReports) {
        const s = `${n}:${a}`;
        (at &&
          Ee.log(`Recording outcome: "${s}"${o > 1 ? ` (${o} times)` : ""}`),
          (this._outcomes[s] = (this._outcomes[s] || 0) + o));
      }
    }
    on(n, a) {
      const o = (this._hooks[n] = this._hooks[n] || []);
      return (
        o.push(a),
        () => {
          const s = o.indexOf(a);
          s > -1 && o.splice(s, 1);
        }
      );
    }
    emit(n, ...a) {
      const o = this._hooks[n];
      o && o.forEach((s) => s(...a));
    }
    sendEnvelope(n) {
      return (
        this.emit("beforeEnvelope", n),
        this._isEnabled() && this._transport
          ? this._transport
              .send(n)
              .then(
                null,
                (a) => (at && Ee.error("Error while sending envelope:", a), a),
              )
          : (at && Ee.error("Transport disabled"), Ca({}))
      );
    }
    _setupIntegrations() {
      const { integrations: n } = this._options;
      ((this._integrations = yC(this, n)), jg(this, n));
    }
    _updateSessionFromEvent(n, a) {
      var h;
      let o = a.level === "fatal",
        s = !1;
      const u = (h = a.exception) == null ? void 0 : h.values;
      if (u) {
        s = !0;
        for (const m of u) {
          const g = m.mechanism;
          if ((g == null ? void 0 : g.handled) === !1) {
            o = !0;
            break;
          }
        }
      }
      const c = n.status === "ok";
      ((c && n.errors === 0) || (c && o)) &&
        (io(n, {
          ...(o && { status: "crashed" }),
          errors: n.errors || Number(s || o),
        }),
        this.captureSession(n));
    }
    _isClientDoneProcessing(n) {
      return new Hr((a) => {
        let o = 0;
        const s = 1,
          u = setInterval(() => {
            this._numProcessing == 0
              ? (clearInterval(u), a(!0))
              : ((o += s), n && o >= n && (clearInterval(u), a(!1)));
          }, s);
      });
    }
    _isEnabled() {
      return this.getOptions().enabled !== !1 && this._transport !== void 0;
    }
    _prepareEvent(n, a, o, s) {
      const u = this.getOptions(),
        c = Object.keys(this._integrations);
      return (
        !a.integrations && c != null && c.length && (a.integrations = c),
        this.emit("preprocessEvent", n, a),
        n.type || s.setLastEventId(n.event_id || a.event_id),
        aC(u, n, a, o, this, s).then((d) => {
          if (d === null) return d;
          (this.emit("postprocessEvent", d, a),
            (d.contexts = { trace: ex(o), ...d.contexts }));
          const h = Mx(this, o);
          return (
            (d.sdkProcessingMetadata = {
              dynamicSamplingContext: h,
              ...d.sdkProcessingMetadata,
            }),
            d
          );
        })
      );
    }
    _captureEvent(n, a = {}, o = lo(), s = yi()) {
      return (
        at &&
          of(n) &&
          Ee.log(`Captured error event \`${Ig(n)[0] || "<unknown>"}\``),
        this._processEvent(n, a, o, s).then(
          (u) => u.event_id,
          (u) => {
            at &&
              (Vg(u)
                ? Ee.log(u.message)
                : Gg(u)
                  ? Ee.warn(u.message)
                  : Ee.warn(u));
          },
        )
      );
    }
    _processEvent(n, a, o, s) {
      const u = this.getOptions(),
        { sampleRate: c } = u,
        d = Kg(n),
        h = of(n),
        m = n.type || "error",
        g = `before send for type \`${m}\``,
        b = typeof c > "u" ? void 0 : cx(c);
      if (h && typeof b == "number" && Math.random() > b)
        return (
          this.recordDroppedEvent("sample_rate", "error"),
          ul(
            af(
              `Discarding event because it's not included in the random sample (sampling rate = ${c})`,
            ),
          )
        );
      const x = m === "replay_event" ? "replay" : m;
      return this._prepareEvent(n, a, o, s)
        .then((C) => {
          if (C === null)
            throw (
              this.recordDroppedEvent("event_processor", x),
              af("An event processor returned `null`, will not send event.")
            );
          if (a.data && a.data.__sentry__ === !0) return C;
          const v = TC(this, u, C, a);
          return _C(v, g);
        })
        .then((C) => {
          var E;
          if (C === null) {
            if ((this.recordDroppedEvent("before_send", x), d)) {
              const D = 1 + (n.spans || []).length;
              this.recordDroppedEvent("before_send", "span", D);
            }
            throw af(`${g} returned \`null\`, will not send event.`);
          }
          const _ = o.getSession() || s.getSession();
          if ((h && _ && this._updateSessionFromEvent(_, C), d)) {
            const w =
                ((E = C.sdkProcessingMetadata) == null
                  ? void 0
                  : E.spanCountBeforeProcessing) || 0,
              D = C.spans ? C.spans.length : 0,
              R = w - D;
            R > 0 && this.recordDroppedEvent("before_send", "span", R);
          }
          const v = C.transaction_info;
          if (d && v && C.transaction !== n.transaction) {
            const w = "custom";
            C.transaction_info = { ...v, source: w };
          }
          return (this.sendEvent(C, a), C);
        })
        .then(null, (C) => {
          throw Vg(C) || Gg(C)
            ? C
            : (this.captureException(C, {
                data: { __sentry__: !0 },
                originalException: C,
              }),
              pl(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${C}`));
        });
    }
    _process(n) {
      (this._numProcessing++,
        n.then(
          (a) => (this._numProcessing--, a),
          (a) => (this._numProcessing--, a),
        ));
    }
    _clearOutcomes() {
      const n = this._outcomes;
      return (
        (this._outcomes = {}),
        Object.entries(n).map(([a, o]) => {
          const [s, u] = a.split(":");
          return { reason: s, category: u, quantity: o };
        })
      );
    }
    _flushOutcomes() {
      at && Ee.log("Flushing outcomes...");
      const n = this._clearOutcomes();
      if (n.length === 0) {
        at && Ee.log("No outcomes to send");
        return;
      }
      if (!this._dsn) {
        at && Ee.log("No dsn provided, will not send outcomes");
        return;
      }
      at && Ee.log("Sending outcomes:", n);
      const a = SC(n, this._options.tunnel && ll(this._dsn));
      this.sendEnvelope(a);
    }
  }
  function _C(e, n) {
    const a = `${n} must return \`null\` or a valid event.`;
    if (tl(e))
      return e.then(
        (o) => {
          if (!hi(o) && o !== null) throw pl(a);
          return o;
        },
        (o) => {
          throw pl(`${n} rejected with ${o}`);
        },
      );
    if (!hi(e) && e !== null) throw pl(a);
    return e;
  }
  function TC(e, n, a, o) {
    const { beforeSend: s, beforeSendTransaction: u, beforeSendSpan: c } = n;
    let d = a;
    if (of(d) && s) return s(d, o);
    if (Kg(d)) {
      if (c) {
        const h = c(bC(d));
        if ((h ? (d = gi(a, vC(h))) : bg(), d.spans)) {
          const m = [];
          for (const g of d.spans) {
            const b = c(g);
            b ? m.push(b) : (bg(), m.push(g));
          }
          d.spans = m;
        }
      }
      if (u) {
        if (d.spans) {
          const h = d.spans.length;
          d.sdkProcessingMetadata = {
            ...a.sdkProcessingMetadata,
            spanCountBeforeProcessing: h,
          };
        }
        return u(d, o);
      }
    }
    return d;
  }
  function of(e) {
    return e.type === void 0;
  }
  function Kg(e) {
    return e.type === "transaction";
  }
  function xC(e) {
    return [
      {
        type: "log",
        item_count: e.length,
        content_type: "application/vnd.sentry.items.log+json",
      },
      { items: e },
    ];
  }
  function CC(e, n, a, o) {
    const s = {};
    return (
      n != null &&
        n.sdk &&
        (s.sdk = { name: n.sdk.name, version: n.sdk.version }),
      a && o && (s.dsn = ll(o)),
      bi(s, [xC(e)])
    );
  }
  Pe._sentryClientToLogBufferMap = new WeakMap();
  function sf(e, n) {
    var u;
    const a = wC(e) ?? [];
    if (a.length === 0) return;
    const o = e.getOptions(),
      s = CC(a, o._metadata, o.tunnel, e.getDsn());
    ((u = Pe._sentryClientToLogBufferMap) == null || u.set(e, []),
      e.emit("flushLogs"),
      e.sendEnvelope(s));
  }
  function wC(e) {
    var n;
    return (n = Pe._sentryClientToLogBufferMap) == null ? void 0 : n.get(e);
  }
  const Yg = Symbol.for("SentryBufferFullError");
  function RC(e) {
    const n = [];
    function a() {
      return e === void 0 || n.length < e;
    }
    function o(c) {
      return n.splice(n.indexOf(c), 1)[0] || Promise.resolve(void 0);
    }
    function s(c) {
      if (!a()) return ul(Yg);
      const d = c();
      return (
        n.indexOf(d) === -1 && n.push(d),
        d.then(() => o(d)).then(null, () => o(d).then(null, () => {})),
        d
      );
    }
    function u(c) {
      return new Hr((d, h) => {
        let m = n.length;
        if (!m) return d(!0);
        const g = setTimeout(() => {
          c && c > 0 && d(!1);
        }, c);
        n.forEach((b) => {
          Ca(b).then(() => {
            --m || (clearTimeout(g), d(!0));
          }, h);
        });
      });
    }
    return { $: n, add: s, drain: u };
  }
  const AC = 60 * 1e3;
  function OC(e, n = Date.now()) {
    const a = parseInt(`${e}`, 10);
    if (!isNaN(a)) return a * 1e3;
    const o = Date.parse(`${e}`);
    return isNaN(o) ? AC : o - n;
  }
  function MC(e, n) {
    return e[n] || e.all || 0;
  }
  function DC(e, n, a = Date.now()) {
    return MC(e, n) > a;
  }
  function NC(e, { statusCode: n, headers: a }, o = Date.now()) {
    const s = { ...e },
      u = a == null ? void 0 : a["x-sentry-rate-limits"],
      c = a == null ? void 0 : a["retry-after"];
    if (u)
      for (const d of u.trim().split(",")) {
        const [h, m, , , g] = d.split(":", 5),
          b = parseInt(h, 10),
          x = (isNaN(b) ? 60 : b) * 1e3;
        if (!m) s.all = o + x;
        else
          for (const C of m.split(";"))
            C === "metric_bucket"
              ? (!g || g.split(";").includes("custom")) && (s[C] = o + x)
              : (s[C] = o + x);
      }
    else c ? (s.all = o + OC(c, o)) : n === 429 && (s.all = o + 60 * 1e3);
    return s;
  }
  const kC = 64;
  function zC(e, n, a = RC(e.bufferSize || kC)) {
    let o = {};
    const s = (c) => a.drain(c);
    function u(c) {
      const d = [];
      if (
        (Rg(c, (b, x) => {
          const C = Ag(x);
          DC(o, C) ? e.recordDroppedEvent("ratelimit_backoff", C) : d.push(b);
        }),
        d.length === 0)
      )
        return Ca({});
      const h = bi(c[0], d),
        m = (b) => {
          Rg(h, (x, C) => {
            e.recordDroppedEvent(b, Ag(C));
          });
        },
        g = () =>
          n({ body: qx(h) }).then(
            (b) => (
              b.statusCode !== void 0 &&
                (b.statusCode < 200 || b.statusCode >= 300) &&
                at &&
                Ee.warn(
                  `Sentry responded with status code ${b.statusCode} to sent event.`,
                ),
              (o = NC(o, b)),
              b
            ),
            (b) => {
              throw (
                m("network_error"),
                at &&
                  Ee.error("Encountered error running transport request:", b),
                b
              );
            },
          );
      return a.add(g).then(
        (b) => b,
        (b) => {
          if (b === Yg)
            return (
              at && Ee.error("Skipped sending event because buffer is full."),
              m("queue_overflow"),
              Ca({})
            );
          throw b;
        },
      );
    }
    return { send: u, flush: s };
  }
  function BC(e) {
    var n;
    ((n = e.user) == null ? void 0 : n.ip_address) === void 0 &&
      (e.user = { ...e.user, ip_address: "{{auto}}" });
  }
  function LC(e) {
    var n;
    "aggregates" in e
      ? ((n = e.attrs) == null ? void 0 : n.ip_address) === void 0 &&
        (e.attrs = { ...e.attrs, ip_address: "{{auto}}" })
      : e.ipAddress === void 0 && (e.ipAddress = "{{auto}}");
  }
  function UC(e, n, a = [n], o = "npm") {
    const s = e._metadata || {};
    (s.sdk ||
      (s.sdk = {
        name: `sentry.javascript.${n}`,
        packages: a.map((u) => ({ name: `${o}:@sentry/${u}`, version: ba })),
        version: ba,
      }),
      (e._metadata = s));
  }
  const jC = 100;
  function wa(e, n) {
    const a = nn(),
      o = yi();
    if (!a) return;
    const { beforeBreadcrumb: s = null, maxBreadcrumbs: u = jC } =
      a.getOptions();
    if (u <= 0) return;
    const d = { timestamp: mi(), ...e },
      h = s ? rl(() => s(d, n)) : d;
    h !== null &&
      (a.emit && a.emit("beforeAddBreadcrumb", h, n), o.addBreadcrumb(h, u));
  }
  let Xg;
  const $C = "FunctionToString",
    Wg = new WeakMap(),
    IC = () => ({
      name: $C,
      setupOnce() {
        Xg = Function.prototype.toString;
        try {
          Function.prototype.toString = function (...e) {
            const n = Vc(this),
              a = Wg.has(nn()) && n !== void 0 ? n : this;
            return Xg.apply(a, e);
          };
        } catch {}
      },
      setup(e) {
        Wg.set(e, !0);
      },
    }),
    HC = [
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
    PC = "EventFilters",
    qC = (e = {}) => {
      let n;
      return {
        name: PC,
        setup(a) {
          const o = a.getOptions();
          n = Qg(e, o);
        },
        processEvent(a, o, s) {
          if (!n) {
            const u = s.getOptions();
            n = Qg(e, u);
          }
          return GC(a, n) ? null : a;
        },
      };
    },
    FC = (e = {}) => ({ ...qC(e), name: "InboundFilters" });
  function Qg(e = {}, n = {}) {
    return {
      allowUrls: [...(e.allowUrls || []), ...(n.allowUrls || [])],
      denyUrls: [...(e.denyUrls || []), ...(n.denyUrls || [])],
      ignoreErrors: [
        ...(e.ignoreErrors || []),
        ...(n.ignoreErrors || []),
        ...(e.disableErrorDefaults ? [] : HC),
      ],
      ignoreTransactions: [
        ...(e.ignoreTransactions || []),
        ...(n.ignoreTransactions || []),
      ],
    };
  }
  function GC(e, n) {
    if (e.type) {
      if (e.type === "transaction" && KC(e, n.ignoreTransactions))
        return (
          at &&
            Ee.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${Ea(e)}`),
          !0
        );
    } else {
      if (VC(e, n.ignoreErrors))
        return (
          at &&
            Ee.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${Ea(e)}`),
          !0
        );
      if (QC(e))
        return (
          at &&
            Ee.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${Ea(e)}`),
          !0
        );
      if (YC(e, n.denyUrls))
        return (
          at &&
            Ee.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${Ea(e)}.
Url: ${hl(e)}`),
          !0
        );
      if (!XC(e, n.allowUrls))
        return (
          at &&
            Ee.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${Ea(e)}.
Url: ${hl(e)}`),
          !0
        );
    }
    return !1;
  }
  function VC(e, n) {
    return n != null && n.length ? Ig(e).some((a) => ol(a, n)) : !1;
  }
  function KC(e, n) {
    if (!(n != null && n.length)) return !1;
    const a = e.transaction;
    return a ? ol(a, n) : !1;
  }
  function YC(e, n) {
    if (!(n != null && n.length)) return !1;
    const a = hl(e);
    return a ? ol(a, n) : !1;
  }
  function XC(e, n) {
    if (!(n != null && n.length)) return !0;
    const a = hl(e);
    return a ? ol(a, n) : !0;
  }
  function WC(e = []) {
    for (let n = e.length - 1; n >= 0; n--) {
      const a = e[n];
      if (a && a.filename !== "<anonymous>" && a.filename !== "[native code]")
        return a.filename || null;
    }
    return null;
  }
  function hl(e) {
    var n, a;
    try {
      const o = [...(((n = e.exception) == null ? void 0 : n.values) ?? [])]
          .reverse()
          .find((u) => {
            var c, d, h;
            return (
              ((c = u.mechanism) == null ? void 0 : c.parent_id) === void 0 &&
              ((h = (d = u.stacktrace) == null ? void 0 : d.frames) == null
                ? void 0
                : h.length)
            );
          }),
        s = (a = o == null ? void 0 : o.stacktrace) == null ? void 0 : a.frames;
      return s ? WC(s) : null;
    } catch {
      return (at && Ee.error(`Cannot extract url for event ${Ea(e)}`), null);
    }
  }
  function QC(e) {
    var n, a;
    return (a = (n = e.exception) == null ? void 0 : n.values) != null &&
      a.length
      ? !e.message &&
          !e.exception.values.some(
            (o) => o.stacktrace || (o.type && o.type !== "Error") || o.value,
          )
      : !1;
  }
  function ZC(e, n, a, o, s, u) {
    var d;
    if (
      !((d = s.exception) != null && d.values) ||
      !u ||
      !$r(u.originalException, Error)
    )
      return;
    const c =
      s.exception.values.length > 0
        ? s.exception.values[s.exception.values.length - 1]
        : void 0;
    c &&
      (s.exception.values = lf(
        e,
        n,
        o,
        u.originalException,
        a,
        s.exception.values,
        c,
        0,
      ));
  }
  function lf(e, n, a, o, s, u, c, d) {
    if (u.length >= a + 1) return u;
    let h = [...u];
    if ($r(o[s], Error)) {
      Zg(c, d);
      const m = e(n, o[s]),
        g = h.length;
      (Jg(m, s, g, d), (h = lf(e, n, a, o[s], s, [m, ...h], m, g)));
    }
    return (
      Array.isArray(o.errors) &&
        o.errors.forEach((m, g) => {
          if ($r(m, Error)) {
            Zg(c, d);
            const b = e(n, m),
              x = h.length;
            (Jg(b, `errors[${g}]`, x, d),
              (h = lf(e, n, a, m, s, [b, ...h], b, x)));
          }
        }),
      h
    );
  }
  function Zg(e, n) {
    ((e.mechanism = e.mechanism || { type: "generic", handled: !0 }),
      (e.mechanism = {
        ...e.mechanism,
        ...(e.type === "AggregateError" && { is_exception_group: !0 }),
        exception_id: n,
      }));
  }
  function Jg(e, n, a, o) {
    ((e.mechanism = e.mechanism || { type: "generic", handled: !0 }),
      (e.mechanism = {
        ...e.mechanism,
        type: "chained",
        source: n,
        exception_id: a,
        parent_id: o,
      }));
  }
  function JC(e) {
    const n = "console";
    (Ta(n, e), xa(n, ew));
  }
  function ew() {
    "console" in Pe &&
      Gc.forEach(function (e) {
        e in Pe.console &&
          yn(Pe.console, e, function (n) {
            return (
              (nl[e] = n),
              function (...a) {
                Fn("console", { args: a, level: e });
                const s = nl[e];
                s == null || s.apply(Pe.console, a);
              }
            );
          });
      });
  }
  function tw(e) {
    return e === "warn"
      ? "warning"
      : ["fatal", "error", "warning", "log", "info", "debug"].includes(e)
        ? e
        : "log";
  }
  const nw = "Dedupe",
    rw = () => {
      let e;
      return {
        name: nw,
        processEvent(n) {
          if (n.type) return n;
          try {
            if (aw(n, e))
              return (
                at &&
                  Ee.warn(
                    "Event dropped due to being a duplicate of previously captured event.",
                  ),
                null
              );
          } catch {}
          return (e = n);
        },
      };
    };
  function aw(e, n) {
    return n ? !!(ow(e, n) || iw(e, n)) : !1;
  }
  function ow(e, n) {
    const a = e.message,
      o = n.message;
    return !(
      (!a && !o) ||
      (a && !o) ||
      (!a && o) ||
      a !== o ||
      !ty(e, n) ||
      !ey(e, n)
    );
  }
  function iw(e, n) {
    const a = ny(n),
      o = ny(e);
    return !(
      !a ||
      !o ||
      a.type !== o.type ||
      a.value !== o.value ||
      !ty(e, n) ||
      !ey(e, n)
    );
  }
  function ey(e, n) {
    let a = _g(e),
      o = _g(n);
    if (!a && !o) return !0;
    if ((a && !o) || (!a && o) || ((a = a), (o = o), o.length !== a.length))
      return !1;
    for (let s = 0; s < o.length; s++) {
      const u = o[s],
        c = a[s];
      if (
        u.filename !== c.filename ||
        u.lineno !== c.lineno ||
        u.colno !== c.colno ||
        u.function !== c.function
      )
        return !1;
    }
    return !0;
  }
  function ty(e, n) {
    let a = e.fingerprint,
      o = n.fingerprint;
    if (!a && !o) return !0;
    if ((a && !o) || (!a && o)) return !1;
    ((a = a), (o = o));
    try {
      return a.join("") === o.join("");
    } catch {
      return !1;
    }
  }
  function ny(e) {
    var n;
    return (
      ((n = e.exception) == null ? void 0 : n.values) && e.exception.values[0]
    );
  }
  function uf(e) {
    if (!e) return {};
    const n = e.match(
      /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/,
    );
    if (!n) return {};
    const a = n[6] || "",
      o = n[8] || "";
    return {
      host: n[4],
      path: n[5],
      protocol: n[2],
      search: a,
      hash: o,
      relative: n[5] + a + o,
    };
  }
  function ry(e) {
    if (e !== void 0)
      return e >= 400 && e < 500 ? "warning" : e >= 500 ? "error" : void 0;
  }
  const vi = Pe;
  function sw() {
    return "history" in vi && !!vi.history;
  }
  function lw() {
    if (!("fetch" in vi)) return !1;
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
  function cf(e) {
    return (
      e && /^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString())
    );
  }
  function uw() {
    var a;
    if (typeof EdgeRuntime == "string") return !0;
    if (!lw()) return !1;
    if (cf(vi.fetch)) return !0;
    let e = !1;
    const n = vi.document;
    if (n && typeof n.createElement == "function")
      try {
        const o = n.createElement("iframe");
        ((o.hidden = !0),
          n.head.appendChild(o),
          (a = o.contentWindow) != null &&
            a.fetch &&
            (e = cf(o.contentWindow.fetch)),
          n.head.removeChild(o));
      } catch (o) {
        va &&
          Ee.warn(
            "Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
            o,
          );
      }
    return e;
  }
  function cw(e, n) {
    const a = "fetch";
    (Ta(a, e), xa(a, () => fw(void 0, n)));
  }
  function fw(e, n = !1) {
    (n && !uw()) ||
      yn(Pe, "fetch", function (a) {
        return function (...o) {
          const s = new Error(),
            { method: u, url: c } = dw(o),
            d = {
              args: o,
              fetchData: { method: u, url: c },
              startTimestamp: gr() * 1e3,
              virtualError: s,
              headers: pw(o),
            };
          return (
            Fn("fetch", { ...d }),
            a.apply(Pe, o).then(
              async (h) => (
                Fn("fetch", { ...d, endTimestamp: gr() * 1e3, response: h }),
                h
              ),
              (h) => {
                if (
                  (Fn("fetch", { ...d, endTimestamp: gr() * 1e3, error: h }),
                  Hc(h) &&
                    h.stack === void 0 &&
                    ((h.stack = s.stack), Sa(h, "framesToPop", 1)),
                  h instanceof TypeError &&
                    (h.message === "Failed to fetch" ||
                      h.message === "Load failed" ||
                      h.message ===
                        "NetworkError when attempting to fetch resource."))
                )
                  try {
                    const m = new URL(d.fetchData.url);
                    h.message = `${h.message} (${m.host})`;
                  } catch {}
                throw h;
              },
            )
          );
        };
      });
  }
  function ff(e, n) {
    return !!e && typeof e == "object" && !!e[n];
  }
  function ay(e) {
    return typeof e == "string"
      ? e
      : e
        ? ff(e, "url")
          ? e.url
          : e.toString
            ? e.toString()
            : ""
        : "";
  }
  function dw(e) {
    if (e.length === 0) return { method: "GET", url: "" };
    if (e.length === 2) {
      const [a, o] = e;
      return {
        url: ay(a),
        method: ff(o, "method") ? String(o.method).toUpperCase() : "GET",
      };
    }
    const n = e[0];
    return {
      url: ay(n),
      method: ff(n, "method") ? String(n.method).toUpperCase() : "GET",
    };
  }
  function pw(e) {
    const [n, a] = e;
    try {
      if (typeof a == "object" && a !== null && "headers" in a && a.headers)
        return new Headers(a.headers);
      if (DT(n)) return new Headers(n.headers);
    } catch {}
  }
  function hw() {
    return "npm";
  }
  const Xt = Pe;
  let df = 0;
  function oy() {
    return df > 0;
  }
  function mw() {
    (df++,
      setTimeout(() => {
        df--;
      }));
  }
  function uo(e, n = {}) {
    function a(s) {
      return typeof s == "function";
    }
    if (!a(e)) return e;
    try {
      const s = e.__sentry_wrapped__;
      if (s) return typeof s == "function" ? s : e;
      if (Vc(e)) return e;
    } catch {
      return e;
    }
    const o = function (...s) {
      try {
        const u = s.map((c) => uo(c, n));
        return e.apply(this, u);
      } catch (u) {
        throw (
          mw(),
          JT((c) => {
            (c.addEventProcessor(
              (d) => (
                n.mechanism && (Kc(d, void 0), oo(d, n.mechanism)),
                (d.extra = { ...d.extra, arguments: s }),
                d
              ),
            ),
              fC(u));
          }),
          u
        );
      }
    };
    try {
      for (const s in e)
        Object.prototype.hasOwnProperty.call(e, s) && (o[s] = e[s]);
    } catch {}
    (Qm(o, e), Sa(e, "__sentry_wrapped__", o));
    try {
      Object.getOwnPropertyDescriptor(o, "name").configurable &&
        Object.defineProperty(o, "name", {
          get() {
            return e.name;
          },
        });
    } catch {}
    return o;
  }
  function pf(e, n) {
    const a = mf(e, n),
      o = { type: Sw(n), value: Ew(n) };
    return (
      a.length && (o.stacktrace = { frames: a }),
      o.type === void 0 &&
        o.value === "" &&
        (o.value = "Unrecoverable error caught"),
      o
    );
  }
  function gw(e, n, a, o) {
    const s = nn(),
      u = s == null ? void 0 : s.getOptions().normalizeDepth,
      c = ww(n),
      d = { __serialized__: wg(n, u) };
    if (c) return { exception: { values: [pf(e, c)] }, extra: d };
    const h = {
      exception: {
        values: [
          {
            type: el(n)
              ? n.constructor.name
              : o
                ? "UnhandledRejection"
                : "Error",
            value: xw(n, { isUnhandledRejection: o }),
          },
        ],
      },
      extra: d,
    };
    if (a) {
      const m = mf(e, a);
      m.length && (h.exception.values[0].stacktrace = { frames: m });
    }
    return h;
  }
  function hf(e, n) {
    return { exception: { values: [pf(e, n)] } };
  }
  function mf(e, n) {
    const a = n.stacktrace || n.stack || "",
      o = bw(n),
      s = vw(n);
    try {
      return e(a, o, s);
    } catch {}
    return [];
  }
  const yw = /Minified React error #\d+;/i;
  function bw(e) {
    return e && yw.test(e.message) ? 1 : 0;
  }
  function vw(e) {
    return typeof e.framesToPop == "number" ? e.framesToPop : 0;
  }
  function iy(e) {
    return typeof WebAssembly < "u" && typeof WebAssembly.Exception < "u"
      ? e instanceof WebAssembly.Exception
      : !1;
  }
  function Sw(e) {
    const n = e == null ? void 0 : e.name;
    return !n && iy(e)
      ? e.message && Array.isArray(e.message) && e.message.length == 2
        ? e.message[0]
        : "WebAssembly.Exception"
      : n;
  }
  function Ew(e) {
    const n = e == null ? void 0 : e.message;
    return iy(e)
      ? Array.isArray(e.message) && e.message.length == 2
        ? e.message[1]
        : "wasm exception"
      : n
        ? n.error && typeof n.error.message == "string"
          ? n.error.message
          : n
        : "No error message";
  }
  function _w(e, n, a, o) {
    const s = (a == null ? void 0 : a.syntheticException) || void 0,
      u = gf(e, n, s, o);
    return (
      oo(u),
      (u.level = "error"),
      a != null && a.event_id && (u.event_id = a.event_id),
      Ca(u)
    );
  }
  function Tw(e, n, a = "info", o, s) {
    const u = (o == null ? void 0 : o.syntheticException) || void 0,
      c = yf(e, n, u, s);
    return (
      (c.level = a),
      o != null && o.event_id && (c.event_id = o.event_id),
      Ca(c)
    );
  }
  function gf(e, n, a, o, s) {
    let u;
    if (Gm(n) && n.error) return hf(e, n.error);
    if (Vm(n) || RT(n)) {
      const c = n;
      if ("stack" in n) u = hf(e, n);
      else {
        const d = c.name || (Vm(c) ? "DOMError" : "DOMException"),
          h = c.message ? `${d}: ${c.message}` : d;
        ((u = yf(e, h, a, o)), Kc(u, h));
      }
      return (
        "code" in c &&
          (u.tags = { ...u.tags, "DOMException.code": `${c.code}` }),
        u
      );
    }
    return Hc(n)
      ? hf(e, n)
      : hi(n) || el(n)
        ? ((u = gw(e, n, a, s)), oo(u, { synthetic: !0 }), u)
        : ((u = yf(e, n, a, o)), Kc(u, `${n}`), oo(u, { synthetic: !0 }), u);
  }
  function yf(e, n, a, o) {
    const s = {};
    if (o && a) {
      const u = mf(e, a);
      (u.length &&
        (s.exception = { values: [{ value: n, stacktrace: { frames: u } }] }),
        oo(s, { synthetic: !0 }));
    }
    if (Pc(n)) {
      const { __sentry_template_string__: u, __sentry_template_values__: c } =
        n;
      return ((s.logentry = { message: u, params: c }), s);
    }
    return ((s.message = n), s);
  }
  function xw(e, { isUnhandledRejection: n }) {
    const a = jT(e),
      o = n ? "promise rejection" : "exception";
    return Gm(e)
      ? `Event \`ErrorEvent\` captured as ${o} with message \`${e.message}\``
      : el(e)
        ? `Event \`${Cw(e)}\` (type=${e.type}) captured as ${o}`
        : `Object captured as ${o} with keys: ${a}`;
  }
  function Cw(e) {
    try {
      const n = Object.getPrototypeOf(e);
      return n ? n.constructor.name : void 0;
    } catch {}
  }
  function ww(e) {
    for (const n in e)
      if (Object.prototype.hasOwnProperty.call(e, n)) {
        const a = e[n];
        if (a instanceof Error) return a;
      }
  }
  const Rw = 5e3;
  class Aw extends EC {
    constructor(n) {
      const a = { parentSpanIsAlwaysRootSpan: !0, ...n },
        o = Xt.SENTRY_SDK_SOURCE || hw();
      (UC(a, "browser", ["browser"], o), super(a));
      const s = this,
        { sendDefaultPii: u, _experiments: c } = s._options,
        d = c == null ? void 0 : c.enableLogs;
      (a.sendClientReports &&
        Xt.document &&
        Xt.document.addEventListener("visibilitychange", () => {
          Xt.document.visibilityState === "hidden" &&
            (this._flushOutcomes(), d && sf(s));
        }),
        d &&
          (s.on("flush", () => {
            sf(s);
          }),
          s.on("afterCaptureLog", () => {
            (s._logFlushIdleTimeout && clearTimeout(s._logFlushIdleTimeout),
              (s._logFlushIdleTimeout = setTimeout(() => {
                sf(s);
              }, Rw)));
          })),
        u && (s.on("postprocessEvent", BC), s.on("beforeSendSession", LC)));
    }
    eventFromException(n, a) {
      return _w(
        this._options.stackParser,
        n,
        a,
        this._options.attachStacktrace,
      );
    }
    eventFromMessage(n, a = "info", o) {
      return Tw(
        this._options.stackParser,
        n,
        a,
        o,
        this._options.attachStacktrace,
      );
    }
    _prepareEvent(n, a, o, s) {
      return (
        (n.platform = n.platform || "javascript"),
        super._prepareEvent(n, a, o, s)
      );
    }
  }
  const Ow = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__,
    on = Pe,
    Mw = 1e3;
  let sy, bf, vf;
  function Dw(e) {
    const n = "dom";
    (Ta(n, e), xa(n, Nw));
  }
  function Nw() {
    if (!on.document) return;
    const e = Fn.bind(null, "dom"),
      n = ly(e, !0);
    (on.document.addEventListener("click", n, !1),
      on.document.addEventListener("keypress", n, !1),
      ["EventTarget", "Node"].forEach((a) => {
        var u, c;
        const s = (u = on[a]) == null ? void 0 : u.prototype;
        (c = s == null ? void 0 : s.hasOwnProperty) != null &&
          c.call(s, "addEventListener") &&
          (yn(s, "addEventListener", function (d) {
            return function (h, m, g) {
              if (h === "click" || h == "keypress")
                try {
                  const b = (this.__sentry_instrumentation_handlers__ =
                      this.__sentry_instrumentation_handlers__ || {}),
                    x = (b[h] = b[h] || { refCount: 0 });
                  if (!x.handler) {
                    const C = ly(e);
                    ((x.handler = C), d.call(this, h, C, g));
                  }
                  x.refCount++;
                } catch {}
              return d.call(this, h, m, g);
            };
          }),
          yn(s, "removeEventListener", function (d) {
            return function (h, m, g) {
              if (h === "click" || h == "keypress")
                try {
                  const b = this.__sentry_instrumentation_handlers__ || {},
                    x = b[h];
                  x &&
                    (x.refCount--,
                    x.refCount <= 0 &&
                      (d.call(this, h, x.handler, g),
                      (x.handler = void 0),
                      delete b[h]),
                    Object.keys(b).length === 0 &&
                      delete this.__sentry_instrumentation_handlers__);
                } catch {}
              return d.call(this, h, m, g);
            };
          }));
      }));
  }
  function kw(e) {
    if (e.type !== bf) return !1;
    try {
      if (!e.target || e.target._sentryId !== vf) return !1;
    } catch {}
    return !0;
  }
  function zw(e, n) {
    return e !== "keypress"
      ? !1
      : n != null && n.tagName
        ? !(
            n.tagName === "INPUT" ||
            n.tagName === "TEXTAREA" ||
            n.isContentEditable
          )
        : !0;
  }
  function ly(e, n = !1) {
    return (a) => {
      if (!a || a._sentryCaptured) return;
      const o = Bw(a);
      if (zw(a.type, o)) return;
      (Sa(a, "_sentryCaptured", !0),
        o && !o._sentryId && Sa(o, "_sentryId", Mn()));
      const s = a.type === "keypress" ? "input" : a.type;
      (kw(a) ||
        (e({ event: a, name: s, global: n }),
        (bf = a.type),
        (vf = o ? o._sentryId : void 0)),
        clearTimeout(sy),
        (sy = on.setTimeout(() => {
          ((vf = void 0), (bf = void 0));
        }, Mw)));
    };
  }
  function Bw(e) {
    try {
      return e.target;
    } catch {
      return null;
    }
  }
  let ml;
  function uy(e) {
    const n = "history";
    (Ta(n, e), xa(n, Lw));
  }
  function Lw() {
    if (
      (on.addEventListener("popstate", () => {
        const n = on.location.href,
          a = ml;
        if (((ml = n), a === n)) return;
        Fn("history", { from: a, to: n });
      }),
      !sw())
    )
      return;
    function e(n) {
      return function (...a) {
        const o = a.length > 2 ? a[2] : void 0;
        if (o) {
          const s = ml,
            u = String(o);
          if (((ml = u), s === u)) return n.apply(this, a);
          Fn("history", { from: s, to: u });
        }
        return n.apply(this, a);
      };
    }
    (yn(on.history, "pushState", e), yn(on.history, "replaceState", e));
  }
  const gl = {};
  function Uw(e) {
    const n = gl[e];
    if (n) return n;
    let a = on[e];
    if (cf(a)) return (gl[e] = a.bind(on));
    const o = on.document;
    if (o && typeof o.createElement == "function")
      try {
        const s = o.createElement("iframe");
        ((s.hidden = !0), o.head.appendChild(s));
        const u = s.contentWindow;
        (u != null && u[e] && (a = u[e]), o.head.removeChild(s));
      } catch (s) {
        Ow &&
          Ee.warn(
            `Could not create sandbox iframe for ${e} check, bailing to window.${e}: `,
            s,
          );
      }
    return a && (gl[e] = a.bind(on));
  }
  function cy(e) {
    gl[e] = void 0;
  }
  const Si = "__sentry_xhr_v3__";
  function jw(e) {
    const n = "xhr";
    (Ta(n, e), xa(n, $w));
  }
  function $w() {
    if (!on.XMLHttpRequest) return;
    const e = XMLHttpRequest.prototype;
    ((e.open = new Proxy(e.open, {
      apply(n, a, o) {
        const s = new Error(),
          u = gr() * 1e3,
          c = mr(o[0]) ? o[0].toUpperCase() : void 0,
          d = Iw(o[1]);
        if (!c || !d) return n.apply(a, o);
        ((a[Si] = { method: c, url: d, request_headers: {} }),
          c === "POST" &&
            d.match(/sentry_key/) &&
            (a.__sentry_own_request__ = !0));
        const h = () => {
          const m = a[Si];
          if (m && a.readyState === 4) {
            try {
              m.status_code = a.status;
            } catch {}
            const g = {
              endTimestamp: gr() * 1e3,
              startTimestamp: u,
              xhr: a,
              virtualError: s,
            };
            Fn("xhr", g);
          }
        };
        return (
          "onreadystatechange" in a && typeof a.onreadystatechange == "function"
            ? (a.onreadystatechange = new Proxy(a.onreadystatechange, {
                apply(m, g, b) {
                  return (h(), m.apply(g, b));
                },
              }))
            : a.addEventListener("readystatechange", h),
          (a.setRequestHeader = new Proxy(a.setRequestHeader, {
            apply(m, g, b) {
              const [x, C] = b,
                _ = g[Si];
              return (
                _ && mr(x) && mr(C) && (_.request_headers[x.toLowerCase()] = C),
                m.apply(g, b)
              );
            },
          })),
          n.apply(a, o)
        );
      },
    })),
      (e.send = new Proxy(e.send, {
        apply(n, a, o) {
          const s = a[Si];
          if (!s) return n.apply(a, o);
          o[0] !== void 0 && (s.body = o[0]);
          const u = { startTimestamp: gr() * 1e3, xhr: a };
          return (Fn("xhr", u), n.apply(a, o));
        },
      })));
  }
  function Iw(e) {
    if (mr(e)) return e;
    try {
      return e.toString();
    } catch {}
  }
  function Hw(e, n = Uw("fetch")) {
    let a = 0,
      o = 0;
    function s(u) {
      const c = u.body.length;
      ((a += c), o++);
      const d = {
        body: u.body,
        method: "POST",
        referrerPolicy: "strict-origin",
        headers: e.headers,
        keepalive: a <= 6e4 && o < 15,
        ...e.fetchOptions,
      };
      if (!n) return (cy("fetch"), ul("No fetch implementation available"));
      try {
        return n(e.url, d).then(
          (h) => (
            (a -= c),
            o--,
            {
              statusCode: h.status,
              headers: {
                "x-sentry-rate-limits": h.headers.get("X-Sentry-Rate-Limits"),
                "retry-after": h.headers.get("Retry-After"),
              },
            }
          ),
        );
      } catch (h) {
        return (cy("fetch"), (a -= c), o--, ul(h));
      }
    }
    return zC(e, s);
  }
  const Pw = 30,
    qw = 50;
  function Sf(e, n, a, o) {
    const s = {
      filename: e,
      function: n === "<anonymous>" ? _a : n,
      in_app: !0,
    };
    return (a !== void 0 && (s.lineno = a), o !== void 0 && (s.colno = o), s);
  }
  const Fw = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,
    Gw =
      /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
    Vw = /\((\S*)(?::(\d+))(?::(\d+))\)/,
    Kw = [
      Pw,
      (e) => {
        const n = Fw.exec(e);
        if (n) {
          const [, o, s, u] = n;
          return Sf(o, _a, +s, +u);
        }
        const a = Gw.exec(e);
        if (a) {
          if (a[2] && a[2].indexOf("eval") === 0) {
            const c = Vw.exec(a[2]);
            c && ((a[2] = c[1]), (a[3] = c[2]), (a[4] = c[3]));
          }
          const [s, u] = fy(a[1] || _a, a[2]);
          return Sf(u, s, a[3] ? +a[3] : void 0, a[4] ? +a[4] : void 0);
        }
      },
    ],
    Yw =
      /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,
    Xw = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
    Ww = _x(
      ...[
        Kw,
        [
          qw,
          (e) => {
            const n = Yw.exec(e);
            if (n) {
              if (n[3] && n[3].indexOf(" > eval") > -1) {
                const u = Xw.exec(n[3]);
                u &&
                  ((n[1] = n[1] || "eval"),
                  (n[3] = u[1]),
                  (n[4] = u[2]),
                  (n[5] = ""));
              }
              let o = n[3],
                s = n[1] || _a;
              return (
                ([s, o] = fy(s, o)),
                Sf(o, s, n[4] ? +n[4] : void 0, n[5] ? +n[5] : void 0)
              );
            }
          },
        ],
      ],
    ),
    fy = (e, n) => {
      const a = e.indexOf("safari-extension") !== -1,
        o = e.indexOf("safari-web-extension") !== -1;
      return a || o
        ? [
            e.indexOf("@") !== -1 ? e.split("@")[0] : _a,
            a ? `safari-extension:${n}` : `safari-web-extension:${n}`,
          ]
        : [e, n];
    },
    Ef = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__,
    yl = 1024,
    Qw = "Breadcrumbs",
    Zw = (e = {}) => {
      const n = {
        console: !0,
        dom: !0,
        fetch: !0,
        history: !0,
        sentry: !0,
        xhr: !0,
        ...e,
      };
      return {
        name: Qw,
        setup(a) {
          (n.console && JC(tR(a)),
            n.dom && Dw(eR(a, n.dom)),
            n.xhr && jw(nR(a)),
            n.fetch && cw(rR(a)),
            n.history && uy(aR(a)),
            n.sentry && a.on("beforeSendEvent", Jw(a)));
        },
      };
    };
  function Jw(e) {
    return function (a) {
      nn() === e &&
        wa(
          {
            category: `sentry.${a.type === "transaction" ? "transaction" : "event"}`,
            event_id: a.event_id,
            level: a.level,
            message: Ea(a),
          },
          { event: a },
        );
    };
  }
  function eR(e, n) {
    return function (o) {
      if (nn() !== e) return;
      let s,
        u,
        c = typeof n == "object" ? n.serializeAttribute : void 0,
        d =
          typeof n == "object" && typeof n.maxStringLength == "number"
            ? n.maxStringLength
            : void 0;
      (d &&
        d > yl &&
        (Ef &&
          Ee.warn(
            `\`dom.maxStringLength\` cannot exceed ${yl}, but a value of ${d} was configured. Sentry will use ${yl} instead.`,
          ),
        (d = yl)),
        typeof c == "string" && (c = [c]));
      try {
        const m = o.event,
          g = oR(m) ? m.target : m;
        ((s = Ym(g, { keyAttrs: c, maxStringLength: d })), (u = zT(g)));
      } catch {
        s = "<unknown>";
      }
      if (s.length === 0) return;
      const h = { category: `ui.${o.name}`, message: s };
      (u && (h.data = { "ui.component_name": u }),
        wa(h, { event: o.event, name: o.name, global: o.global }));
    };
  }
  function tR(e) {
    return function (a) {
      if (nn() !== e) return;
      const o = {
        category: "console",
        data: { arguments: a.args, logger: "console" },
        level: tw(a.level),
        message: Wm(a.args, " "),
      };
      if (a.level === "assert")
        if (a.args[0] === !1)
          ((o.message = `Assertion failed: ${Wm(a.args.slice(1), " ") || "console.assert"}`),
            (o.data.arguments = a.args.slice(1)));
        else return;
      wa(o, { input: a.args, level: a.level });
    };
  }
  function nR(e) {
    return function (a) {
      if (nn() !== e) return;
      const { startTimestamp: o, endTimestamp: s } = a,
        u = a.xhr[Si];
      if (!o || !s || !u) return;
      const { method: c, url: d, status_code: h, body: m } = u,
        g = { method: c, url: d, status_code: h },
        b = { xhr: a.xhr, input: m, startTimestamp: o, endTimestamp: s },
        x = { category: "xhr", data: g, type: "http", level: ry(h) };
      (e.emit("beforeOutgoingRequestBreadcrumb", x, b), wa(x, b));
    };
  }
  function rR(e) {
    return function (a) {
      if (nn() !== e) return;
      const { startTimestamp: o, endTimestamp: s } = a;
      if (
        s &&
        !(a.fetchData.url.match(/sentry_key/) && a.fetchData.method === "POST")
      )
        if ((a.fetchData.method, a.fetchData.url, a.error)) {
          const u = a.fetchData,
            c = {
              data: a.error,
              input: a.args,
              startTimestamp: o,
              endTimestamp: s,
            },
            d = { category: "fetch", data: u, level: "error", type: "http" };
          (e.emit("beforeOutgoingRequestBreadcrumb", d, c), wa(d, c));
        } else {
          const u = a.response,
            c = { ...a.fetchData, status_code: u == null ? void 0 : u.status };
          (a.fetchData.request_body_size,
            a.fetchData.response_body_size,
            u == null || u.status);
          const d = {
              input: a.args,
              response: u,
              startTimestamp: o,
              endTimestamp: s,
            },
            h = {
              category: "fetch",
              data: c,
              type: "http",
              level: ry(c.status_code),
            };
          (e.emit("beforeOutgoingRequestBreadcrumb", h, d), wa(h, d));
        }
    };
  }
  function aR(e) {
    return function (a) {
      if (nn() !== e) return;
      let o = a.from,
        s = a.to;
      const u = uf(Xt.location.href);
      let c = o ? uf(o) : void 0;
      const d = uf(s);
      ((c != null && c.path) || (c = u),
        u.protocol === d.protocol && u.host === d.host && (s = d.relative),
        u.protocol === c.protocol && u.host === c.host && (o = c.relative),
        wa({ category: "navigation", data: { from: o, to: s } }));
    };
  }
  function oR(e) {
    return !!e && !!e.target;
  }
  const iR = [
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
    sR = "BrowserApiErrors",
    lR = (e = {}) => {
      const n = {
        XMLHttpRequest: !0,
        eventTarget: !0,
        requestAnimationFrame: !0,
        setInterval: !0,
        setTimeout: !0,
        ...e,
      };
      return {
        name: sR,
        setupOnce() {
          (n.setTimeout && yn(Xt, "setTimeout", dy),
            n.setInterval && yn(Xt, "setInterval", dy),
            n.requestAnimationFrame && yn(Xt, "requestAnimationFrame", uR),
            n.XMLHttpRequest &&
              "XMLHttpRequest" in Xt &&
              yn(XMLHttpRequest.prototype, "send", cR));
          const a = n.eventTarget;
          a && (Array.isArray(a) ? a : iR).forEach(fR);
        },
      };
    };
  function dy(e) {
    return function (...n) {
      const a = n[0];
      return (
        (n[0] = uo(a, {
          mechanism: {
            data: { function: Ir(e) },
            handled: !1,
            type: "instrument",
          },
        })),
        e.apply(this, n)
      );
    };
  }
  function uR(e) {
    return function (n) {
      return e.apply(this, [
        uo(n, {
          mechanism: {
            data: { function: "requestAnimationFrame", handler: Ir(e) },
            handled: !1,
            type: "instrument",
          },
        }),
      ]);
    };
  }
  function cR(e) {
    return function (...n) {
      const a = this;
      return (
        ["onload", "onerror", "onprogress", "onreadystatechange"].forEach(
          (s) => {
            s in a &&
              typeof a[s] == "function" &&
              yn(a, s, function (u) {
                const c = {
                    mechanism: {
                      data: { function: s, handler: Ir(u) },
                      handled: !1,
                      type: "instrument",
                    },
                  },
                  d = Vc(u);
                return (d && (c.mechanism.data.handler = Ir(d)), uo(u, c));
              });
          },
        ),
        e.apply(this, n)
      );
    };
  }
  function fR(e) {
    var o, s;
    const a = (o = Xt[e]) == null ? void 0 : o.prototype;
    (s = a == null ? void 0 : a.hasOwnProperty) != null &&
      s.call(a, "addEventListener") &&
      (yn(a, "addEventListener", function (u) {
        return function (c, d, h) {
          try {
            dR(d) &&
              (d.handleEvent = uo(d.handleEvent, {
                mechanism: {
                  data: { function: "handleEvent", handler: Ir(d), target: e },
                  handled: !1,
                  type: "instrument",
                },
              }));
          } catch {}
          return u.apply(this, [
            c,
            uo(d, {
              mechanism: {
                data: {
                  function: "addEventListener",
                  handler: Ir(d),
                  target: e,
                },
                handled: !1,
                type: "instrument",
              },
            }),
            h,
          ]);
        };
      }),
      yn(a, "removeEventListener", function (u) {
        return function (c, d, h) {
          try {
            const m = d.__sentry_wrapped__;
            m && u.call(this, c, m, h);
          } catch {}
          return u.call(this, c, d, h);
        };
      }));
  }
  function dR(e) {
    return typeof e.handleEvent == "function";
  }
  const pR = () => ({
      name: "BrowserSession",
      setupOnce() {
        if (typeof Xt.document > "u") {
          Ef &&
            Ee.warn(
              "Using the `browserSessionIntegration` in non-browser environments is not supported.",
            );
          return;
        }
        (kg({ ignoreDuration: !0 }),
          Lg(),
          uy(({ from: e, to: n }) => {
            e !== void 0 && e !== n && (kg({ ignoreDuration: !0 }), Lg());
          }));
      },
    }),
    hR = "GlobalHandlers",
    mR = (e = {}) => {
      const n = { onerror: !0, onunhandledrejection: !0, ...e };
      return {
        name: hR,
        setupOnce() {
          Error.stackTraceLimit = 50;
        },
        setup(a) {
          (n.onerror && (gR(a), py("onerror")),
            n.onunhandledrejection && (yR(a), py("onunhandledrejection")));
        },
      };
    };
  function gR(e) {
    xx((n) => {
      const { stackParser: a, attachStacktrace: o } = hy();
      if (nn() !== e || oy()) return;
      const { msg: s, url: u, line: c, column: d, error: h } = n,
        m = SR(gf(a, h || s, void 0, o, !1), u, c, d);
      ((m.level = "error"),
        Ng(m, {
          originalException: h,
          mechanism: { handled: !1, type: "onerror" },
        }));
    });
  }
  function yR(e) {
    wx((n) => {
      const { stackParser: a, attachStacktrace: o } = hy();
      if (nn() !== e || oy()) return;
      const s = bR(n),
        u = qc(s) ? vR(s) : gf(a, s, void 0, o, !0);
      ((u.level = "error"),
        Ng(u, {
          originalException: s,
          mechanism: { handled: !1, type: "onunhandledrejection" },
        }));
    });
  }
  function bR(e) {
    if (qc(e)) return e;
    try {
      if ("reason" in e) return e.reason;
      if ("detail" in e && "reason" in e.detail) return e.detail.reason;
    } catch {}
    return e;
  }
  function vR(e) {
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
  function SR(e, n, a, o) {
    const s = (e.exception = e.exception || {}),
      u = (s.values = s.values || []),
      c = (u[0] = u[0] || {}),
      d = (c.stacktrace = c.stacktrace || {}),
      h = (d.frames = d.frames || []),
      m = o,
      g = a,
      b = mr(n) && n.length > 0 ? n : Xm();
    return (
      h.length === 0 &&
        h.push({ colno: m, filename: b, function: _a, in_app: !0, lineno: g }),
      e
    );
  }
  function py(e) {
    Ef && Ee.log(`Global Handler attached: ${e}`);
  }
  function hy() {
    const e = nn();
    return (
      (e == null ? void 0 : e.getOptions()) || {
        stackParser: () => [],
        attachStacktrace: !1,
      }
    );
  }
  const ER = () => ({
      name: "HttpContext",
      preprocessEvent(e) {
        var c, d;
        if (!Xt.navigator && !Xt.location && !Xt.document) return;
        const n = ((c = e.request) == null ? void 0 : c.url) || Xm(),
          { referrer: a } = Xt.document || {},
          { userAgent: o } = Xt.navigator || {},
          s = {
            ...((d = e.request) == null ? void 0 : d.headers),
            ...(a && { Referer: a }),
            ...(o && { "User-Agent": o }),
          },
          u = { ...e.request, ...(n && { url: n }), headers: s };
        e.request = u;
      },
    }),
    _R = "cause",
    TR = 5,
    xR = "LinkedErrors",
    CR = (e = {}) => {
      const n = e.limit || TR,
        a = e.key || _R;
      return {
        name: xR,
        preprocessEvent(o, s, u) {
          const c = u.getOptions();
          ZC(pf, c.stackParser, a, n, o, s);
        },
      };
    };
  function wR(e) {
    return [FC(), IC(), lR(), Zw(), mR(), CR(), rw(), ER(), pR()];
  }
  const RR = [
      "No SW",
      "Failed to fetch",
      "FILE_ERROR_NO_SPACE",
      "The browser is shutting down",
      "Extension context invalidated",
      "Corruption: block checksum mismatch",
      "Could not establish connection. Receiving end does not exist.",
    ],
    my = new Aw({
      beforeSend: async (e, n) => {
        var o, s, u;
        const a =
          ((u =
            (s = (o = e.exception) == null ? void 0 : o.values) == null
              ? void 0
              : s[0]) == null
            ? void 0
            : u.value) || "";
        if (RR.some((c) => a.toLowerCase().includes(c.toLowerCase())))
          return null;
        try {
          return {
            ...e,
            extra: { ...n.data, ...e.extra, globalState: await Pr.get() },
          };
        } catch {
          return { ...e, extra: { ...e.extra, ...n.data } };
        }
      },
      dsn: "https://ea6708d40c9416f10d3930b0dbc10b48@o4509207413981184.ingest.de.sentry.io/4509207415488592",
      debug: !1,
      environment: "production",
      integrations: wR().filter(
        (e) =>
          !["BrowserApiErrors", "Breadcrumbs", "GlobalHandlers"].includes(
            e.name,
          ),
      ),
      release: TT.version,
      stackParser: Ww,
      transport: Hw,
    }),
    gy = new tr();
  gy.setClient(my);
  const bl = (e, n) => my.captureException(e, n, gy);
  function yy(e, n) {
    return function () {
      return e.apply(n, arguments);
    };
  }
  const { toString: AR } = Object.prototype,
    { getPrototypeOf: _f } = Object,
    { iterator: vl, toStringTag: by } = Symbol,
    Sl = ((e) => (n) => {
      const a = AR.call(n);
      return e[a] || (e[a] = a.slice(8, -1).toLowerCase());
    })(Object.create(null)),
    Gn = (e) => ((e = e.toLowerCase()), (n) => Sl(n) === e),
    El = (e) => (n) => typeof n === e,
    { isArray: co } = Array,
    Ei = El("undefined");
  function OR(e) {
    return (
      e !== null &&
      !Ei(e) &&
      e.constructor !== null &&
      !Ei(e.constructor) &&
      sn(e.constructor.isBuffer) &&
      e.constructor.isBuffer(e)
    );
  }
  const vy = Gn("ArrayBuffer");
  function MR(e) {
    let n;
    return (
      typeof ArrayBuffer < "u" && ArrayBuffer.isView
        ? (n = ArrayBuffer.isView(e))
        : (n = e && e.buffer && vy(e.buffer)),
      n
    );
  }
  const DR = El("string"),
    sn = El("function"),
    Sy = El("number"),
    _l = (e) => e !== null && typeof e == "object",
    NR = (e) => e === !0 || e === !1,
    Tl = (e) => {
      if (Sl(e) !== "object") return !1;
      const n = _f(e);
      return (
        (n === null ||
          n === Object.prototype ||
          Object.getPrototypeOf(n) === null) &&
        !(by in e) &&
        !(vl in e)
      );
    },
    kR = Gn("Date"),
    zR = Gn("File"),
    BR = Gn("Blob"),
    LR = Gn("FileList"),
    UR = (e) => _l(e) && sn(e.pipe),
    jR = (e) => {
      let n;
      return (
        e &&
        ((typeof FormData == "function" && e instanceof FormData) ||
          (sn(e.append) &&
            ((n = Sl(e)) === "formdata" ||
              (n === "object" &&
                sn(e.toString) &&
                e.toString() === "[object FormData]"))))
      );
    },
    $R = Gn("URLSearchParams"),
    [IR, HR, PR, qR] = ["ReadableStream", "Request", "Response", "Headers"].map(
      Gn,
    ),
    FR = (e) =>
      e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  function _i(e, n, { allOwnKeys: a = !1 } = {}) {
    if (e === null || typeof e > "u") return;
    let o, s;
    if ((typeof e != "object" && (e = [e]), co(e)))
      for (o = 0, s = e.length; o < s; o++) n.call(null, e[o], o, e);
    else {
      const u = a ? Object.getOwnPropertyNames(e) : Object.keys(e),
        c = u.length;
      let d;
      for (o = 0; o < c; o++) ((d = u[o]), n.call(null, e[d], d, e));
    }
  }
  function Ey(e, n) {
    n = n.toLowerCase();
    const a = Object.keys(e);
    let o = a.length,
      s;
    for (; o-- > 0; ) if (((s = a[o]), n === s.toLowerCase())) return s;
    return null;
  }
  const Ra =
      typeof globalThis < "u"
        ? globalThis
        : typeof self < "u"
          ? self
          : typeof window < "u"
            ? window
            : global,
    _y = (e) => !Ei(e) && e !== Ra;
  function Tf() {
    const { caseless: e } = (_y(this) && this) || {},
      n = {},
      a = (o, s) => {
        const u = (e && Ey(n, s)) || s;
        Tl(n[u]) && Tl(o)
          ? (n[u] = Tf(n[u], o))
          : Tl(o)
            ? (n[u] = Tf({}, o))
            : co(o)
              ? (n[u] = o.slice())
              : (n[u] = o);
      };
    for (let o = 0, s = arguments.length; o < s; o++)
      arguments[o] && _i(arguments[o], a);
    return n;
  }
  const GR = (e, n, a, { allOwnKeys: o } = {}) => (
      _i(
        n,
        (s, u) => {
          a && sn(s) ? (e[u] = yy(s, a)) : (e[u] = s);
        },
        { allOwnKeys: o },
      ),
      e
    ),
    VR = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
    KR = (e, n, a, o) => {
      ((e.prototype = Object.create(n.prototype, o)),
        (e.prototype.constructor = e),
        Object.defineProperty(e, "super", { value: n.prototype }),
        a && Object.assign(e.prototype, a));
    },
    YR = (e, n, a, o) => {
      let s, u, c;
      const d = {};
      if (((n = n || {}), e == null)) return n;
      do {
        for (s = Object.getOwnPropertyNames(e), u = s.length; u-- > 0; )
          ((c = s[u]),
            (!o || o(c, e, n)) && !d[c] && ((n[c] = e[c]), (d[c] = !0)));
        e = a !== !1 && _f(e);
      } while (e && (!a || a(e, n)) && e !== Object.prototype);
      return n;
    },
    XR = (e, n, a) => {
      ((e = String(e)),
        (a === void 0 || a > e.length) && (a = e.length),
        (a -= n.length));
      const o = e.indexOf(n, a);
      return o !== -1 && o === a;
    },
    WR = (e) => {
      if (!e) return null;
      if (co(e)) return e;
      let n = e.length;
      if (!Sy(n)) return null;
      const a = new Array(n);
      for (; n-- > 0; ) a[n] = e[n];
      return a;
    },
    QR = (
      (e) => (n) =>
        e && n instanceof e
    )(typeof Uint8Array < "u" && _f(Uint8Array)),
    ZR = (e, n) => {
      const o = (e && e[vl]).call(e);
      let s;
      for (; (s = o.next()) && !s.done; ) {
        const u = s.value;
        n.call(e, u[0], u[1]);
      }
    },
    JR = (e, n) => {
      let a;
      const o = [];
      for (; (a = e.exec(n)) !== null; ) o.push(a);
      return o;
    },
    e2 = Gn("HTMLFormElement"),
    t2 = (e) =>
      e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (a, o, s) {
        return o.toUpperCase() + s;
      }),
    Ty = (
      ({ hasOwnProperty: e }) =>
      (n, a) =>
        e.call(n, a)
    )(Object.prototype),
    n2 = Gn("RegExp"),
    xy = (e, n) => {
      const a = Object.getOwnPropertyDescriptors(e),
        o = {};
      (_i(a, (s, u) => {
        let c;
        (c = n(s, u, e)) !== !1 && (o[u] = c || s);
      }),
        Object.defineProperties(e, o));
    },
    r2 = (e) => {
      xy(e, (n, a) => {
        if (sn(e) && ["arguments", "caller", "callee"].indexOf(a) !== -1)
          return !1;
        const o = e[a];
        if (sn(o)) {
          if (((n.enumerable = !1), "writable" in n)) {
            n.writable = !1;
            return;
          }
          n.set ||
            (n.set = () => {
              throw Error("Can not rewrite read-only method '" + a + "'");
            });
        }
      });
    },
    a2 = (e, n) => {
      const a = {},
        o = (s) => {
          s.forEach((u) => {
            a[u] = !0;
          });
        };
      return (co(e) ? o(e) : o(String(e).split(n)), a);
    },
    o2 = () => {},
    i2 = (e, n) => (e != null && Number.isFinite((e = +e)) ? e : n);
  function s2(e) {
    return !!(e && sn(e.append) && e[by] === "FormData" && e[vl]);
  }
  const l2 = (e) => {
      const n = new Array(10),
        a = (o, s) => {
          if (_l(o)) {
            if (n.indexOf(o) >= 0) return;
            if (!("toJSON" in o)) {
              n[s] = o;
              const u = co(o) ? [] : {};
              return (
                _i(o, (c, d) => {
                  const h = a(c, s + 1);
                  !Ei(h) && (u[d] = h);
                }),
                (n[s] = void 0),
                u
              );
            }
          }
          return o;
        };
      return a(e, 0);
    },
    u2 = Gn("AsyncFunction"),
    c2 = (e) => e && (_l(e) || sn(e)) && sn(e.then) && sn(e.catch),
    Cy = ((e, n) =>
      e
        ? setImmediate
        : n
          ? ((a, o) => (
              Ra.addEventListener(
                "message",
                ({ source: s, data: u }) => {
                  s === Ra && u === a && o.length && o.shift()();
                },
                !1,
              ),
              (s) => {
                (o.push(s), Ra.postMessage(a, "*"));
              }
            ))(`axios@${Math.random()}`, [])
          : (a) => setTimeout(a))(
      typeof setImmediate == "function",
      sn(Ra.postMessage),
    ),
    f2 =
      typeof queueMicrotask < "u"
        ? queueMicrotask.bind(Ra)
        : (typeof process < "u" && process.nextTick) || Cy,
    V = {
      isArray: co,
      isArrayBuffer: vy,
      isBuffer: OR,
      isFormData: jR,
      isArrayBufferView: MR,
      isString: DR,
      isNumber: Sy,
      isBoolean: NR,
      isObject: _l,
      isPlainObject: Tl,
      isReadableStream: IR,
      isRequest: HR,
      isResponse: PR,
      isHeaders: qR,
      isUndefined: Ei,
      isDate: kR,
      isFile: zR,
      isBlob: BR,
      isRegExp: n2,
      isFunction: sn,
      isStream: UR,
      isURLSearchParams: $R,
      isTypedArray: QR,
      isFileList: LR,
      forEach: _i,
      merge: Tf,
      extend: GR,
      trim: FR,
      stripBOM: VR,
      inherits: KR,
      toFlatObject: YR,
      kindOf: Sl,
      kindOfTest: Gn,
      endsWith: XR,
      toArray: WR,
      forEachEntry: ZR,
      matchAll: JR,
      isHTMLForm: e2,
      hasOwnProperty: Ty,
      hasOwnProp: Ty,
      reduceDescriptors: xy,
      freezeMethods: r2,
      toObjectSet: a2,
      toCamelCase: t2,
      noop: o2,
      toFiniteNumber: i2,
      findKey: Ey,
      global: Ra,
      isContextDefined: _y,
      isSpecCompliantForm: s2,
      toJSONObject: l2,
      isAsyncFn: u2,
      isThenable: c2,
      setImmediate: Cy,
      asap: f2,
      isIterable: (e) => e != null && sn(e[vl]),
    };
  function Ce(e, n, a, o, s) {
    (Error.call(this),
      Error.captureStackTrace
        ? Error.captureStackTrace(this, this.constructor)
        : (this.stack = new Error().stack),
      (this.message = e),
      (this.name = "AxiosError"),
      n && (this.code = n),
      a && (this.config = a),
      o && (this.request = o),
      s && ((this.response = s), (this.status = s.status ? s.status : null)));
  }
  V.inherits(Ce, Error, {
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
        config: V.toJSONObject(this.config),
        code: this.code,
        status: this.status,
      };
    },
  });
  const wy = Ce.prototype,
    Ry = {};
  ([
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
    Ry[e] = { value: e };
  }),
    Object.defineProperties(Ce, Ry),
    Object.defineProperty(wy, "isAxiosError", { value: !0 }),
    (Ce.from = (e, n, a, o, s, u) => {
      const c = Object.create(wy);
      return (
        V.toFlatObject(
          e,
          c,
          function (h) {
            return h !== Error.prototype;
          },
          (d) => d !== "isAxiosError",
        ),
        Ce.call(c, e.message, n, a, o, s),
        (c.cause = e),
        (c.name = e.name),
        u && Object.assign(c, u),
        c
      );
    }));
  const d2 = null;
  function xf(e) {
    return V.isPlainObject(e) || V.isArray(e);
  }
  function Ay(e) {
    return V.endsWith(e, "[]") ? e.slice(0, -2) : e;
  }
  function Oy(e, n, a) {
    return e
      ? e
          .concat(n)
          .map(function (s, u) {
            return ((s = Ay(s)), !a && u ? "[" + s + "]" : s);
          })
          .join(a ? "." : "")
      : n;
  }
  function p2(e) {
    return V.isArray(e) && !e.some(xf);
  }
  const h2 = V.toFlatObject(V, {}, null, function (n) {
    return /^is[A-Z]/.test(n);
  });
  function xl(e, n, a) {
    if (!V.isObject(e)) throw new TypeError("target must be an object");
    ((n = n || new FormData()),
      (a = V.toFlatObject(
        a,
        { metaTokens: !0, dots: !1, indexes: !1 },
        !1,
        function (v, E) {
          return !V.isUndefined(E[v]);
        },
      )));
    const o = a.metaTokens,
      s = a.visitor || g,
      u = a.dots,
      c = a.indexes,
      h = (a.Blob || (typeof Blob < "u" && Blob)) && V.isSpecCompliantForm(n);
    if (!V.isFunction(s)) throw new TypeError("visitor must be a function");
    function m(_) {
      if (_ === null) return "";
      if (V.isDate(_)) return _.toISOString();
      if (!h && V.isBlob(_))
        throw new Ce("Blob is not supported. Use a Buffer instead.");
      return V.isArrayBuffer(_) || V.isTypedArray(_)
        ? h && typeof Blob == "function"
          ? new Blob([_])
          : Buffer.from(_)
        : _;
    }
    function g(_, v, E) {
      let w = _;
      if (_ && !E && typeof _ == "object") {
        if (V.endsWith(v, "{}"))
          ((v = o ? v : v.slice(0, -2)), (_ = JSON.stringify(_)));
        else if (
          (V.isArray(_) && p2(_)) ||
          ((V.isFileList(_) || V.endsWith(v, "[]")) && (w = V.toArray(_)))
        )
          return (
            (v = Ay(v)),
            w.forEach(function (R, M) {
              !(V.isUndefined(R) || R === null) &&
                n.append(
                  c === !0 ? Oy([v], M, u) : c === null ? v : v + "[]",
                  m(R),
                );
            }),
            !1
          );
      }
      return xf(_) ? !0 : (n.append(Oy(E, v, u), m(_)), !1);
    }
    const b = [],
      x = Object.assign(h2, {
        defaultVisitor: g,
        convertValue: m,
        isVisitable: xf,
      });
    function C(_, v) {
      if (!V.isUndefined(_)) {
        if (b.indexOf(_) !== -1)
          throw Error("Circular reference detected in " + v.join("."));
        (b.push(_),
          V.forEach(_, function (w, D) {
            (!(V.isUndefined(w) || w === null) &&
              s.call(n, w, V.isString(D) ? D.trim() : D, v, x)) === !0 &&
              C(w, v ? v.concat(D) : [D]);
          }),
          b.pop());
      }
    }
    if (!V.isObject(e)) throw new TypeError("data must be an object");
    return (C(e), n);
  }
  function My(e) {
    const n = {
      "!": "%21",
      "'": "%27",
      "(": "%28",
      ")": "%29",
      "~": "%7E",
      "%20": "+",
      "%00": "\0",
    };
    return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (o) {
      return n[o];
    });
  }
  function Cf(e, n) {
    ((this._pairs = []), e && xl(e, this, n));
  }
  const Dy = Cf.prototype;
  ((Dy.append = function (n, a) {
    this._pairs.push([n, a]);
  }),
    (Dy.toString = function (n) {
      const a = n
        ? function (o) {
            return n.call(this, o, My);
          }
        : My;
      return this._pairs
        .map(function (s) {
          return a(s[0]) + "=" + a(s[1]);
        }, "")
        .join("&");
    }));
  function m2(e) {
    return encodeURIComponent(e)
      .replace(/%3A/gi, ":")
      .replace(/%24/g, "$")
      .replace(/%2C/gi, ",")
      .replace(/%20/g, "+")
      .replace(/%5B/gi, "[")
      .replace(/%5D/gi, "]");
  }
  function Ny(e, n, a) {
    if (!n) return e;
    const o = (a && a.encode) || m2;
    V.isFunction(a) && (a = { serialize: a });
    const s = a && a.serialize;
    let u;
    if (
      (s
        ? (u = s(n, a))
        : (u = V.isURLSearchParams(n)
            ? n.toString()
            : new Cf(n, a).toString(o)),
      u)
    ) {
      const c = e.indexOf("#");
      (c !== -1 && (e = e.slice(0, c)),
        (e += (e.indexOf("?") === -1 ? "?" : "&") + u));
    }
    return e;
  }
  class ky {
    constructor() {
      this.handlers = [];
    }
    use(n, a, o) {
      return (
        this.handlers.push({
          fulfilled: n,
          rejected: a,
          synchronous: o ? o.synchronous : !1,
          runWhen: o ? o.runWhen : null,
        }),
        this.handlers.length - 1
      );
    }
    eject(n) {
      this.handlers[n] && (this.handlers[n] = null);
    }
    clear() {
      this.handlers && (this.handlers = []);
    }
    forEach(n) {
      V.forEach(this.handlers, function (o) {
        o !== null && n(o);
      });
    }
  }
  const zy = {
      silentJSONParsing: !0,
      forcedJSONParsing: !0,
      clarifyTimeoutError: !1,
    },
    g2 = {
      isBrowser: !0,
      classes: {
        URLSearchParams: typeof URLSearchParams < "u" ? URLSearchParams : Cf,
        FormData: typeof FormData < "u" ? FormData : null,
        Blob: typeof Blob < "u" ? Blob : null,
      },
      protocols: ["http", "https", "file", "blob", "url", "data"],
    },
    wf = typeof window < "u" && typeof document < "u",
    Rf = (typeof navigator == "object" && navigator) || void 0,
    y2 =
      wf &&
      (!Rf || ["ReactNative", "NativeScript", "NS"].indexOf(Rf.product) < 0),
    b2 =
      typeof WorkerGlobalScope < "u" &&
      self instanceof WorkerGlobalScope &&
      typeof self.importScripts == "function",
    v2 = (wf && window.location.href) || "http://localhost",
    Wt = {
      ...Object.freeze(
        Object.defineProperty(
          {
            __proto__: null,
            hasBrowserEnv: wf,
            hasStandardBrowserEnv: y2,
            hasStandardBrowserWebWorkerEnv: b2,
            navigator: Rf,
            origin: v2,
          },
          Symbol.toStringTag,
          { value: "Module" },
        ),
      ),
      ...g2,
    };
  function S2(e, n) {
    return xl(
      e,
      new Wt.classes.URLSearchParams(),
      Object.assign(
        {
          visitor: function (a, o, s, u) {
            return Wt.isNode && V.isBuffer(a)
              ? (this.append(o, a.toString("base64")), !1)
              : u.defaultVisitor.apply(this, arguments);
          },
        },
        n,
      ),
    );
  }
  function E2(e) {
    return V.matchAll(/\w+|\[(\w*)]/g, e).map((n) =>
      n[0] === "[]" ? "" : n[1] || n[0],
    );
  }
  function _2(e) {
    const n = {},
      a = Object.keys(e);
    let o;
    const s = a.length;
    let u;
    for (o = 0; o < s; o++) ((u = a[o]), (n[u] = e[u]));
    return n;
  }
  function By(e) {
    function n(a, o, s, u) {
      let c = a[u++];
      if (c === "__proto__") return !0;
      const d = Number.isFinite(+c),
        h = u >= a.length;
      return (
        (c = !c && V.isArray(s) ? s.length : c),
        h
          ? (V.hasOwnProp(s, c) ? (s[c] = [s[c], o]) : (s[c] = o), !d)
          : ((!s[c] || !V.isObject(s[c])) && (s[c] = []),
            n(a, o, s[c], u) && V.isArray(s[c]) && (s[c] = _2(s[c])),
            !d)
      );
    }
    if (V.isFormData(e) && V.isFunction(e.entries)) {
      const a = {};
      return (
        V.forEachEntry(e, (o, s) => {
          n(E2(o), s, a, 0);
        }),
        a
      );
    }
    return null;
  }
  function T2(e, n, a) {
    if (V.isString(e))
      try {
        return ((n || JSON.parse)(e), V.trim(e));
      } catch (o) {
        if (o.name !== "SyntaxError") throw o;
      }
    return (a || JSON.stringify)(e);
  }
  const Ti = {
    transitional: zy,
    adapter: ["xhr", "http", "fetch"],
    transformRequest: [
      function (n, a) {
        const o = a.getContentType() || "",
          s = o.indexOf("application/json") > -1,
          u = V.isObject(n);
        if ((u && V.isHTMLForm(n) && (n = new FormData(n)), V.isFormData(n)))
          return s ? JSON.stringify(By(n)) : n;
        if (
          V.isArrayBuffer(n) ||
          V.isBuffer(n) ||
          V.isStream(n) ||
          V.isFile(n) ||
          V.isBlob(n) ||
          V.isReadableStream(n)
        )
          return n;
        if (V.isArrayBufferView(n)) return n.buffer;
        if (V.isURLSearchParams(n))
          return (
            a.setContentType(
              "application/x-www-form-urlencoded;charset=utf-8",
              !1,
            ),
            n.toString()
          );
        let d;
        if (u) {
          if (o.indexOf("application/x-www-form-urlencoded") > -1)
            return S2(n, this.formSerializer).toString();
          if ((d = V.isFileList(n)) || o.indexOf("multipart/form-data") > -1) {
            const h = this.env && this.env.FormData;
            return xl(
              d ? { "files[]": n } : n,
              h && new h(),
              this.formSerializer,
            );
          }
        }
        return u || s ? (a.setContentType("application/json", !1), T2(n)) : n;
      },
    ],
    transformResponse: [
      function (n) {
        const a = this.transitional || Ti.transitional,
          o = a && a.forcedJSONParsing,
          s = this.responseType === "json";
        if (V.isResponse(n) || V.isReadableStream(n)) return n;
        if (n && V.isString(n) && ((o && !this.responseType) || s)) {
          const c = !(a && a.silentJSONParsing) && s;
          try {
            return JSON.parse(n);
          } catch (d) {
            if (c)
              throw d.name === "SyntaxError"
                ? Ce.from(d, Ce.ERR_BAD_RESPONSE, this, null, this.response)
                : d;
          }
        }
        return n;
      },
    ],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: { FormData: Wt.classes.FormData, Blob: Wt.classes.Blob },
    validateStatus: function (n) {
      return n >= 200 && n < 300;
    },
    headers: {
      common: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": void 0,
      },
    },
  };
  V.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
    Ti.headers[e] = {};
  });
  const x2 = V.toObjectSet([
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
    C2 = (e) => {
      const n = {};
      let a, o, s;
      return (
        e &&
          e
            .split(
              `
`,
            )
            .forEach(function (c) {
              ((s = c.indexOf(":")),
                (a = c.substring(0, s).trim().toLowerCase()),
                (o = c.substring(s + 1).trim()),
                !(!a || (n[a] && x2[a])) &&
                  (a === "set-cookie"
                    ? n[a]
                      ? n[a].push(o)
                      : (n[a] = [o])
                    : (n[a] = n[a] ? n[a] + ", " + o : o)));
            }),
        n
      );
    },
    Ly = Symbol("internals");
  function xi(e) {
    return e && String(e).trim().toLowerCase();
  }
  function Cl(e) {
    return e === !1 || e == null ? e : V.isArray(e) ? e.map(Cl) : String(e);
  }
  function w2(e) {
    const n = Object.create(null),
      a = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let o;
    for (; (o = a.exec(e)); ) n[o[1]] = o[2];
    return n;
  }
  const R2 = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
  function Af(e, n, a, o, s) {
    if (V.isFunction(o)) return o.call(this, n, a);
    if ((s && (n = a), !!V.isString(n))) {
      if (V.isString(o)) return n.indexOf(o) !== -1;
      if (V.isRegExp(o)) return o.test(n);
    }
  }
  function A2(e) {
    return e
      .trim()
      .toLowerCase()
      .replace(/([a-z\d])(\w*)/g, (n, a, o) => a.toUpperCase() + o);
  }
  function O2(e, n) {
    const a = V.toCamelCase(" " + n);
    ["get", "set", "has"].forEach((o) => {
      Object.defineProperty(e, o + a, {
        value: function (s, u, c) {
          return this[o].call(this, n, s, u, c);
        },
        configurable: !0,
      });
    });
  }
  let ln = class {
    constructor(n) {
      n && this.set(n);
    }
    set(n, a, o) {
      const s = this;
      function u(d, h, m) {
        const g = xi(h);
        if (!g) throw new Error("header name must be a non-empty string");
        const b = V.findKey(s, g);
        (!b || s[b] === void 0 || m === !0 || (m === void 0 && s[b] !== !1)) &&
          (s[b || h] = Cl(d));
      }
      const c = (d, h) => V.forEach(d, (m, g) => u(m, g, h));
      if (V.isPlainObject(n) || n instanceof this.constructor) c(n, a);
      else if (V.isString(n) && (n = n.trim()) && !R2(n)) c(C2(n), a);
      else if (V.isObject(n) && V.isIterable(n)) {
        let d = {},
          h,
          m;
        for (const g of n) {
          if (!V.isArray(g))
            throw TypeError("Object iterator must return a key-value pair");
          d[(m = g[0])] = (h = d[m])
            ? V.isArray(h)
              ? [...h, g[1]]
              : [h, g[1]]
            : g[1];
        }
        c(d, a);
      } else n != null && u(a, n, o);
      return this;
    }
    get(n, a) {
      if (((n = xi(n)), n)) {
        const o = V.findKey(this, n);
        if (o) {
          const s = this[o];
          if (!a) return s;
          if (a === !0) return w2(s);
          if (V.isFunction(a)) return a.call(this, s, o);
          if (V.isRegExp(a)) return a.exec(s);
          throw new TypeError("parser must be boolean|regexp|function");
        }
      }
    }
    has(n, a) {
      if (((n = xi(n)), n)) {
        const o = V.findKey(this, n);
        return !!(o && this[o] !== void 0 && (!a || Af(this, this[o], o, a)));
      }
      return !1;
    }
    delete(n, a) {
      const o = this;
      let s = !1;
      function u(c) {
        if (((c = xi(c)), c)) {
          const d = V.findKey(o, c);
          d && (!a || Af(o, o[d], d, a)) && (delete o[d], (s = !0));
        }
      }
      return (V.isArray(n) ? n.forEach(u) : u(n), s);
    }
    clear(n) {
      const a = Object.keys(this);
      let o = a.length,
        s = !1;
      for (; o--; ) {
        const u = a[o];
        (!n || Af(this, this[u], u, n, !0)) && (delete this[u], (s = !0));
      }
      return s;
    }
    normalize(n) {
      const a = this,
        o = {};
      return (
        V.forEach(this, (s, u) => {
          const c = V.findKey(o, u);
          if (c) {
            ((a[c] = Cl(s)), delete a[u]);
            return;
          }
          const d = n ? A2(u) : String(u).trim();
          (d !== u && delete a[u], (a[d] = Cl(s)), (o[d] = !0));
        }),
        this
      );
    }
    concat(...n) {
      return this.constructor.concat(this, ...n);
    }
    toJSON(n) {
      const a = Object.create(null);
      return (
        V.forEach(this, (o, s) => {
          o != null &&
            o !== !1 &&
            (a[s] = n && V.isArray(o) ? o.join(", ") : o);
        }),
        a
      );
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON()).map(([n, a]) => n + ": " + a).join(`
`);
    }
    getSetCookie() {
      return this.get("set-cookie") || [];
    }
    get [Symbol.toStringTag]() {
      return "AxiosHeaders";
    }
    static from(n) {
      return n instanceof this ? n : new this(n);
    }
    static concat(n, ...a) {
      const o = new this(n);
      return (a.forEach((s) => o.set(s)), o);
    }
    static accessor(n) {
      const o = (this[Ly] = this[Ly] = { accessors: {} }).accessors,
        s = this.prototype;
      function u(c) {
        const d = xi(c);
        o[d] || (O2(s, c), (o[d] = !0));
      }
      return (V.isArray(n) ? n.forEach(u) : u(n), this);
    }
  };
  (ln.accessor([
    "Content-Type",
    "Content-Length",
    "Accept",
    "Accept-Encoding",
    "User-Agent",
    "Authorization",
  ]),
    V.reduceDescriptors(ln.prototype, ({ value: e }, n) => {
      let a = n[0].toUpperCase() + n.slice(1);
      return {
        get: () => e,
        set(o) {
          this[a] = o;
        },
      };
    }),
    V.freezeMethods(ln));
  function Of(e, n) {
    const a = this || Ti,
      o = n || a,
      s = ln.from(o.headers);
    let u = o.data;
    return (
      V.forEach(e, function (d) {
        u = d.call(a, u, s.normalize(), n ? n.status : void 0);
      }),
      s.normalize(),
      u
    );
  }
  function Uy(e) {
    return !!(e && e.__CANCEL__);
  }
  function fo(e, n, a) {
    (Ce.call(this, e ?? "canceled", Ce.ERR_CANCELED, n, a),
      (this.name = "CanceledError"));
  }
  V.inherits(fo, Ce, { __CANCEL__: !0 });
  function jy(e, n, a) {
    const o = a.config.validateStatus;
    !a.status || !o || o(a.status)
      ? e(a)
      : n(
          new Ce(
            "Request failed with status code " + a.status,
            [Ce.ERR_BAD_REQUEST, Ce.ERR_BAD_RESPONSE][
              Math.floor(a.status / 100) - 4
            ],
            a.config,
            a.request,
            a,
          ),
        );
  }
  function M2(e) {
    const n = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
    return (n && n[1]) || "";
  }
  function D2(e, n) {
    e = e || 10;
    const a = new Array(e),
      o = new Array(e);
    let s = 0,
      u = 0,
      c;
    return (
      (n = n !== void 0 ? n : 1e3),
      function (h) {
        const m = Date.now(),
          g = o[u];
        (c || (c = m), (a[s] = h), (o[s] = m));
        let b = u,
          x = 0;
        for (; b !== s; ) ((x += a[b++]), (b = b % e));
        if (((s = (s + 1) % e), s === u && (u = (u + 1) % e), m - c < n))
          return;
        const C = g && m - g;
        return C ? Math.round((x * 1e3) / C) : void 0;
      }
    );
  }
  function N2(e, n) {
    let a = 0,
      o = 1e3 / n,
      s,
      u;
    const c = (m, g = Date.now()) => {
      ((a = g),
        (s = null),
        u && (clearTimeout(u), (u = null)),
        e.apply(null, m));
    };
    return [
      (...m) => {
        const g = Date.now(),
          b = g - a;
        b >= o
          ? c(m, g)
          : ((s = m),
            u ||
              (u = setTimeout(() => {
                ((u = null), c(s));
              }, o - b)));
      },
      () => s && c(s),
    ];
  }
  const wl = (e, n, a = 3) => {
      let o = 0;
      const s = D2(50, 250);
      return N2((u) => {
        const c = u.loaded,
          d = u.lengthComputable ? u.total : void 0,
          h = c - o,
          m = s(h),
          g = c <= d;
        o = c;
        const b = {
          loaded: c,
          total: d,
          progress: d ? c / d : void 0,
          bytes: h,
          rate: m || void 0,
          estimated: m && d && g ? (d - c) / m : void 0,
          event: u,
          lengthComputable: d != null,
          [n ? "download" : "upload"]: !0,
        };
        e(b);
      }, a);
    },
    $y = (e, n) => {
      const a = e != null;
      return [(o) => n[0]({ lengthComputable: a, total: e, loaded: o }), n[1]];
    },
    Iy =
      (e) =>
      (...n) =>
        V.asap(() => e(...n)),
    k2 = Wt.hasStandardBrowserEnv
      ? ((e, n) => (a) => (
          (a = new URL(a, Wt.origin)),
          e.protocol === a.protocol &&
            e.host === a.host &&
            (n || e.port === a.port)
        ))(
          new URL(Wt.origin),
          Wt.navigator && /(msie|trident)/i.test(Wt.navigator.userAgent),
        )
      : () => !0,
    z2 = Wt.hasStandardBrowserEnv
      ? {
          write(e, n, a, o, s, u) {
            const c = [e + "=" + encodeURIComponent(n)];
            (V.isNumber(a) && c.push("expires=" + new Date(a).toGMTString()),
              V.isString(o) && c.push("path=" + o),
              V.isString(s) && c.push("domain=" + s),
              u === !0 && c.push("secure"),
              (document.cookie = c.join("; ")));
          },
          read(e) {
            const n = document.cookie.match(
              new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"),
            );
            return n ? decodeURIComponent(n[3]) : null;
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
  function B2(e) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
  }
  function L2(e, n) {
    return n ? e.replace(/\/?\/$/, "") + "/" + n.replace(/^\/+/, "") : e;
  }
  function Hy(e, n, a) {
    let o = !B2(n);
    return e && (o || a == !1) ? L2(e, n) : n;
  }
  const Py = (e) => (e instanceof ln ? { ...e } : e);
  function Aa(e, n) {
    n = n || {};
    const a = {};
    function o(m, g, b, x) {
      return V.isPlainObject(m) && V.isPlainObject(g)
        ? V.merge.call({ caseless: x }, m, g)
        : V.isPlainObject(g)
          ? V.merge({}, g)
          : V.isArray(g)
            ? g.slice()
            : g;
    }
    function s(m, g, b, x) {
      if (V.isUndefined(g)) {
        if (!V.isUndefined(m)) return o(void 0, m, b, x);
      } else return o(m, g, b, x);
    }
    function u(m, g) {
      if (!V.isUndefined(g)) return o(void 0, g);
    }
    function c(m, g) {
      if (V.isUndefined(g)) {
        if (!V.isUndefined(m)) return o(void 0, m);
      } else return o(void 0, g);
    }
    function d(m, g, b) {
      if (b in n) return o(m, g);
      if (b in e) return o(void 0, m);
    }
    const h = {
      url: u,
      method: u,
      data: u,
      baseURL: c,
      transformRequest: c,
      transformResponse: c,
      paramsSerializer: c,
      timeout: c,
      timeoutMessage: c,
      withCredentials: c,
      withXSRFToken: c,
      adapter: c,
      responseType: c,
      xsrfCookieName: c,
      xsrfHeaderName: c,
      onUploadProgress: c,
      onDownloadProgress: c,
      decompress: c,
      maxContentLength: c,
      maxBodyLength: c,
      beforeRedirect: c,
      transport: c,
      httpAgent: c,
      httpsAgent: c,
      cancelToken: c,
      socketPath: c,
      responseEncoding: c,
      validateStatus: d,
      headers: (m, g, b) => s(Py(m), Py(g), b, !0),
    };
    return (
      V.forEach(Object.keys(Object.assign({}, e, n)), function (g) {
        const b = h[g] || s,
          x = b(e[g], n[g], g);
        (V.isUndefined(x) && b !== d) || (a[g] = x);
      }),
      a
    );
  }
  const qy = (e) => {
      const n = Aa({}, e);
      let {
        data: a,
        withXSRFToken: o,
        xsrfHeaderName: s,
        xsrfCookieName: u,
        headers: c,
        auth: d,
      } = n;
      ((n.headers = c = ln.from(c)),
        (n.url = Ny(
          Hy(n.baseURL, n.url, n.allowAbsoluteUrls),
          e.params,
          e.paramsSerializer,
        )),
        d &&
          c.set(
            "Authorization",
            "Basic " +
              btoa(
                (d.username || "") +
                  ":" +
                  (d.password ? unescape(encodeURIComponent(d.password)) : ""),
              ),
          ));
      let h;
      if (V.isFormData(a)) {
        if (Wt.hasStandardBrowserEnv || Wt.hasStandardBrowserWebWorkerEnv)
          c.setContentType(void 0);
        else if ((h = c.getContentType()) !== !1) {
          const [m, ...g] = h
            ? h
                .split(";")
                .map((b) => b.trim())
                .filter(Boolean)
            : [];
          c.setContentType([m || "multipart/form-data", ...g].join("; "));
        }
      }
      if (
        Wt.hasStandardBrowserEnv &&
        (o && V.isFunction(o) && (o = o(n)), o || (o !== !1 && k2(n.url)))
      ) {
        const m = s && u && z2.read(u);
        m && c.set(s, m);
      }
      return n;
    },
    U2 =
      typeof XMLHttpRequest < "u" &&
      function (e) {
        return new Promise(function (a, o) {
          const s = qy(e);
          let u = s.data;
          const c = ln.from(s.headers).normalize();
          let {
              responseType: d,
              onUploadProgress: h,
              onDownloadProgress: m,
            } = s,
            g,
            b,
            x,
            C,
            _;
          function v() {
            (C && C(),
              _ && _(),
              s.cancelToken && s.cancelToken.unsubscribe(g),
              s.signal && s.signal.removeEventListener("abort", g));
          }
          let E = new XMLHttpRequest();
          (E.open(s.method.toUpperCase(), s.url, !0), (E.timeout = s.timeout));
          function w() {
            if (!E) return;
            const R = ln.from(
                "getAllResponseHeaders" in E && E.getAllResponseHeaders(),
              ),
              A = {
                data:
                  !d || d === "text" || d === "json"
                    ? E.responseText
                    : E.response,
                status: E.status,
                statusText: E.statusText,
                headers: R,
                config: e,
                request: E,
              };
            (jy(
              function (G) {
                (a(G), v());
              },
              function (G) {
                (o(G), v());
              },
              A,
            ),
              (E = null));
          }
          ("onloadend" in E
            ? (E.onloadend = w)
            : (E.onreadystatechange = function () {
                !E ||
                  E.readyState !== 4 ||
                  (E.status === 0 &&
                    !(E.responseURL && E.responseURL.indexOf("file:") === 0)) ||
                  setTimeout(w);
              }),
            (E.onabort = function () {
              E &&
                (o(new Ce("Request aborted", Ce.ECONNABORTED, e, E)),
                (E = null));
            }),
            (E.onerror = function () {
              (o(new Ce("Network Error", Ce.ERR_NETWORK, e, E)), (E = null));
            }),
            (E.ontimeout = function () {
              let M = s.timeout
                ? "timeout of " + s.timeout + "ms exceeded"
                : "timeout exceeded";
              const A = s.transitional || zy;
              (s.timeoutErrorMessage && (M = s.timeoutErrorMessage),
                o(
                  new Ce(
                    M,
                    A.clarifyTimeoutError ? Ce.ETIMEDOUT : Ce.ECONNABORTED,
                    e,
                    E,
                  ),
                ),
                (E = null));
            }),
            u === void 0 && c.setContentType(null),
            "setRequestHeader" in E &&
              V.forEach(c.toJSON(), function (M, A) {
                E.setRequestHeader(A, M);
              }),
            V.isUndefined(s.withCredentials) ||
              (E.withCredentials = !!s.withCredentials),
            d && d !== "json" && (E.responseType = s.responseType),
            m && (([x, _] = wl(m, !0)), E.addEventListener("progress", x)),
            h &&
              E.upload &&
              (([b, C] = wl(h)),
              E.upload.addEventListener("progress", b),
              E.upload.addEventListener("loadend", C)),
            (s.cancelToken || s.signal) &&
              ((g = (R) => {
                E &&
                  (o(!R || R.type ? new fo(null, e, E) : R),
                  E.abort(),
                  (E = null));
              }),
              s.cancelToken && s.cancelToken.subscribe(g),
              s.signal &&
                (s.signal.aborted
                  ? g()
                  : s.signal.addEventListener("abort", g))));
          const D = M2(s.url);
          if (D && Wt.protocols.indexOf(D) === -1) {
            o(new Ce("Unsupported protocol " + D + ":", Ce.ERR_BAD_REQUEST, e));
            return;
          }
          E.send(u || null);
        });
      },
    j2 = (e, n) => {
      const { length: a } = (e = e ? e.filter(Boolean) : []);
      if (n || a) {
        let o = new AbortController(),
          s;
        const u = function (m) {
          if (!s) {
            ((s = !0), d());
            const g = m instanceof Error ? m : this.reason;
            o.abort(
              g instanceof Ce ? g : new fo(g instanceof Error ? g.message : g),
            );
          }
        };
        let c =
          n &&
          setTimeout(() => {
            ((c = null),
              u(new Ce(`timeout ${n} of ms exceeded`, Ce.ETIMEDOUT)));
          }, n);
        const d = () => {
          e &&
            (c && clearTimeout(c),
            (c = null),
            e.forEach((m) => {
              m.unsubscribe
                ? m.unsubscribe(u)
                : m.removeEventListener("abort", u);
            }),
            (e = null));
        };
        e.forEach((m) => m.addEventListener("abort", u));
        const { signal: h } = o;
        return ((h.unsubscribe = () => V.asap(d)), h);
      }
    },
    $2 = function* (e, n) {
      let a = e.byteLength;
      if (a < n) {
        yield e;
        return;
      }
      let o = 0,
        s;
      for (; o < a; ) ((s = o + n), yield e.slice(o, s), (o = s));
    },
    I2 = async function* (e, n) {
      for await (const a of H2(e)) yield* $2(a, n);
    },
    H2 = async function* (e) {
      if (e[Symbol.asyncIterator]) {
        yield* e;
        return;
      }
      const n = e.getReader();
      try {
        for (;;) {
          const { done: a, value: o } = await n.read();
          if (a) break;
          yield o;
        }
      } finally {
        await n.cancel();
      }
    },
    Fy = (e, n, a, o) => {
      const s = I2(e, n);
      let u = 0,
        c,
        d = (h) => {
          c || ((c = !0), o && o(h));
        };
      return new ReadableStream(
        {
          async pull(h) {
            try {
              const { done: m, value: g } = await s.next();
              if (m) {
                (d(), h.close());
                return;
              }
              let b = g.byteLength;
              if (a) {
                let x = (u += b);
                a(x);
              }
              h.enqueue(new Uint8Array(g));
            } catch (m) {
              throw (d(m), m);
            }
          },
          cancel(h) {
            return (d(h), s.return());
          },
        },
        { highWaterMark: 2 },
      );
    },
    Rl =
      typeof fetch == "function" &&
      typeof Request == "function" &&
      typeof Response == "function",
    Gy = Rl && typeof ReadableStream == "function",
    P2 =
      Rl &&
      (typeof TextEncoder == "function"
        ? (
            (e) => (n) =>
              e.encode(n)
          )(new TextEncoder())
        : async (e) => new Uint8Array(await new Response(e).arrayBuffer())),
    Vy = (e, ...n) => {
      try {
        return !!e(...n);
      } catch {
        return !1;
      }
    },
    q2 =
      Gy &&
      Vy(() => {
        let e = !1;
        const n = new Request(Wt.origin, {
          body: new ReadableStream(),
          method: "POST",
          get duplex() {
            return ((e = !0), "half");
          },
        }).headers.has("Content-Type");
        return e && !n;
      }),
    Ky = 64 * 1024,
    Mf = Gy && Vy(() => V.isReadableStream(new Response("").body)),
    Al = { stream: Mf && ((e) => e.body) };
  Rl &&
    ((e) => {
      ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((n) => {
        !Al[n] &&
          (Al[n] = V.isFunction(e[n])
            ? (a) => a[n]()
            : (a, o) => {
                throw new Ce(
                  `Response type '${n}' is not supported`,
                  Ce.ERR_NOT_SUPPORT,
                  o,
                );
              });
      });
    })(new Response());
  const F2 = async (e) => {
      if (e == null) return 0;
      if (V.isBlob(e)) return e.size;
      if (V.isSpecCompliantForm(e))
        return (
          await new Request(Wt.origin, {
            method: "POST",
            body: e,
          }).arrayBuffer()
        ).byteLength;
      if (V.isArrayBufferView(e) || V.isArrayBuffer(e)) return e.byteLength;
      if ((V.isURLSearchParams(e) && (e = e + ""), V.isString(e)))
        return (await P2(e)).byteLength;
    },
    G2 = async (e, n) => {
      const a = V.toFiniteNumber(e.getContentLength());
      return a ?? F2(n);
    },
    Df = {
      http: d2,
      xhr: U2,
      fetch:
        Rl &&
        (async (e) => {
          let {
            url: n,
            method: a,
            data: o,
            signal: s,
            cancelToken: u,
            timeout: c,
            onDownloadProgress: d,
            onUploadProgress: h,
            responseType: m,
            headers: g,
            withCredentials: b = "same-origin",
            fetchOptions: x,
          } = qy(e);
          m = m ? (m + "").toLowerCase() : "text";
          let C = j2([s, u && u.toAbortSignal()], c),
            _;
          const v =
            C &&
            C.unsubscribe &&
            (() => {
              C.unsubscribe();
            });
          let E;
          try {
            if (
              h &&
              q2 &&
              a !== "get" &&
              a !== "head" &&
              (E = await G2(g, o)) !== 0
            ) {
              let A = new Request(n, {
                  method: "POST",
                  body: o,
                  duplex: "half",
                }),
                L;
              if (
                (V.isFormData(o) &&
                  (L = A.headers.get("content-type")) &&
                  g.setContentType(L),
                A.body)
              ) {
                const [G, q] = $y(E, wl(Iy(h)));
                o = Fy(A.body, Ky, G, q);
              }
            }
            V.isString(b) || (b = b ? "include" : "omit");
            const w = "credentials" in Request.prototype;
            _ = new Request(n, {
              ...x,
              signal: C,
              method: a.toUpperCase(),
              headers: g.normalize().toJSON(),
              body: o,
              duplex: "half",
              credentials: w ? b : void 0,
            });
            let D = await fetch(_);
            const R = Mf && (m === "stream" || m === "response");
            if (Mf && (d || (R && v))) {
              const A = {};
              ["status", "statusText", "headers"].forEach((W) => {
                A[W] = D[W];
              });
              const L = V.toFiniteNumber(D.headers.get("content-length")),
                [G, q] = (d && $y(L, wl(Iy(d), !0))) || [];
              D = new Response(
                Fy(D.body, Ky, G, () => {
                  (q && q(), v && v());
                }),
                A,
              );
            }
            m = m || "text";
            let M = await Al[V.findKey(Al, m) || "text"](D, e);
            return (
              !R && v && v(),
              await new Promise((A, L) => {
                jy(A, L, {
                  data: M,
                  headers: ln.from(D.headers),
                  status: D.status,
                  statusText: D.statusText,
                  config: e,
                  request: _,
                });
              })
            );
          } catch (w) {
            throw (
              v && v(),
              w &&
              w.name === "TypeError" &&
              /Load failed|fetch/i.test(w.message)
                ? Object.assign(new Ce("Network Error", Ce.ERR_NETWORK, e, _), {
                    cause: w.cause || w,
                  })
                : Ce.from(w, w && w.code, e, _)
            );
          }
        }),
    };
  V.forEach(Df, (e, n) => {
    if (e) {
      try {
        Object.defineProperty(e, "name", { value: n });
      } catch {}
      Object.defineProperty(e, "adapterName", { value: n });
    }
  });
  const Yy = (e) => `- ${e}`,
    V2 = (e) => V.isFunction(e) || e === null || e === !1,
    Xy = {
      getAdapter: (e) => {
        e = V.isArray(e) ? e : [e];
        const { length: n } = e;
        let a, o;
        const s = {};
        for (let u = 0; u < n; u++) {
          a = e[u];
          let c;
          if (
            ((o = a),
            !V2(a) && ((o = Df[(c = String(a)).toLowerCase()]), o === void 0))
          )
            throw new Ce(`Unknown adapter '${c}'`);
          if (o) break;
          s[c || "#" + u] = o;
        }
        if (!o) {
          const u = Object.entries(s).map(
            ([d, h]) =>
              `adapter ${d} ` +
              (h === !1
                ? "is not supported by the environment"
                : "is not available in the build"),
          );
          let c = n
            ? u.length > 1
              ? `since :
` +
                u.map(Yy).join(`
`)
              : " " + Yy(u[0])
            : "as no adapter specified";
          throw new Ce(
            "There is no suitable adapter to dispatch the request " + c,
            "ERR_NOT_SUPPORT",
          );
        }
        return o;
      },
      adapters: Df,
    };
  function Nf(e) {
    if (
      (e.cancelToken && e.cancelToken.throwIfRequested(),
      e.signal && e.signal.aborted)
    )
      throw new fo(null, e);
  }
  function Wy(e) {
    return (
      Nf(e),
      (e.headers = ln.from(e.headers)),
      (e.data = Of.call(e, e.transformRequest)),
      ["post", "put", "patch"].indexOf(e.method) !== -1 &&
        e.headers.setContentType("application/x-www-form-urlencoded", !1),
      Xy.getAdapter(e.adapter || Ti.adapter)(e).then(
        function (o) {
          return (
            Nf(e),
            (o.data = Of.call(e, e.transformResponse, o)),
            (o.headers = ln.from(o.headers)),
            o
          );
        },
        function (o) {
          return (
            Uy(o) ||
              (Nf(e),
              o &&
                o.response &&
                ((o.response.data = Of.call(
                  e,
                  e.transformResponse,
                  o.response,
                )),
                (o.response.headers = ln.from(o.response.headers)))),
            Promise.reject(o)
          );
        },
      )
    );
  }
  const Qy = "1.9.0",
    Ol = {};
  ["object", "boolean", "number", "function", "string", "symbol"].forEach(
    (e, n) => {
      Ol[e] = function (o) {
        return typeof o === e || "a" + (n < 1 ? "n " : " ") + e;
      };
    },
  );
  const Zy = {};
  ((Ol.transitional = function (n, a, o) {
    function s(u, c) {
      return (
        "[Axios v" +
        Qy +
        "] Transitional option '" +
        u +
        "'" +
        c +
        (o ? ". " + o : "")
      );
    }
    return (u, c, d) => {
      if (n === !1)
        throw new Ce(
          s(c, " has been removed" + (a ? " in " + a : "")),
          Ce.ERR_DEPRECATED,
        );
      return (
        a &&
          !Zy[c] &&
          ((Zy[c] = !0),
          console.warn(
            s(
              c,
              " has been deprecated since v" +
                a +
                " and will be removed in the near future",
            ),
          )),
        n ? n(u, c, d) : !0
      );
    };
  }),
    (Ol.spelling = function (n) {
      return (a, o) => (
        console.warn(`${o} is likely a misspelling of ${n}`),
        !0
      );
    }));
  function K2(e, n, a) {
    if (typeof e != "object")
      throw new Ce("options must be an object", Ce.ERR_BAD_OPTION_VALUE);
    const o = Object.keys(e);
    let s = o.length;
    for (; s-- > 0; ) {
      const u = o[s],
        c = n[u];
      if (c) {
        const d = e[u],
          h = d === void 0 || c(d, u, e);
        if (h !== !0)
          throw new Ce(
            "option " + u + " must be " + h,
            Ce.ERR_BAD_OPTION_VALUE,
          );
        continue;
      }
      if (a !== !0) throw new Ce("Unknown option " + u, Ce.ERR_BAD_OPTION);
    }
  }
  const Ml = { assertOptions: K2, validators: Ol },
    nr = Ml.validators;
  let Oa = class {
    constructor(n) {
      ((this.defaults = n || {}),
        (this.interceptors = { request: new ky(), response: new ky() }));
    }
    async request(n, a) {
      try {
        return await this._request(n, a);
      } catch (o) {
        if (o instanceof Error) {
          let s = {};
          Error.captureStackTrace
            ? Error.captureStackTrace(s)
            : (s = new Error());
          const u = s.stack ? s.stack.replace(/^.+\n/, "") : "";
          try {
            o.stack
              ? u &&
                !String(o.stack).endsWith(u.replace(/^.+\n.+\n/, "")) &&
                (o.stack +=
                  `
` + u)
              : (o.stack = u);
          } catch {}
        }
        throw o;
      }
    }
    _request(n, a) {
      (typeof n == "string" ? ((a = a || {}), (a.url = n)) : (a = n || {}),
        (a = Aa(this.defaults, a)));
      const { transitional: o, paramsSerializer: s, headers: u } = a;
      (o !== void 0 &&
        Ml.assertOptions(
          o,
          {
            silentJSONParsing: nr.transitional(nr.boolean),
            forcedJSONParsing: nr.transitional(nr.boolean),
            clarifyTimeoutError: nr.transitional(nr.boolean),
          },
          !1,
        ),
        s != null &&
          (V.isFunction(s)
            ? (a.paramsSerializer = { serialize: s })
            : Ml.assertOptions(
                s,
                { encode: nr.function, serialize: nr.function },
                !0,
              )),
        a.allowAbsoluteUrls !== void 0 ||
          (this.defaults.allowAbsoluteUrls !== void 0
            ? (a.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
            : (a.allowAbsoluteUrls = !0)),
        Ml.assertOptions(
          a,
          {
            baseUrl: nr.spelling("baseURL"),
            withXsrfToken: nr.spelling("withXSRFToken"),
          },
          !0,
        ),
        (a.method = (a.method || this.defaults.method || "get").toLowerCase()));
      let c = u && V.merge(u.common, u[a.method]);
      (u &&
        V.forEach(
          ["delete", "get", "head", "post", "put", "patch", "common"],
          (_) => {
            delete u[_];
          },
        ),
        (a.headers = ln.concat(c, u)));
      const d = [];
      let h = !0;
      this.interceptors.request.forEach(function (v) {
        (typeof v.runWhen == "function" && v.runWhen(a) === !1) ||
          ((h = h && v.synchronous), d.unshift(v.fulfilled, v.rejected));
      });
      const m = [];
      this.interceptors.response.forEach(function (v) {
        m.push(v.fulfilled, v.rejected);
      });
      let g,
        b = 0,
        x;
      if (!h) {
        const _ = [Wy.bind(this), void 0];
        for (
          _.unshift.apply(_, d),
            _.push.apply(_, m),
            x = _.length,
            g = Promise.resolve(a);
          b < x;
        )
          g = g.then(_[b++], _[b++]);
        return g;
      }
      x = d.length;
      let C = a;
      for (b = 0; b < x; ) {
        const _ = d[b++],
          v = d[b++];
        try {
          C = _(C);
        } catch (E) {
          v.call(this, E);
          break;
        }
      }
      try {
        g = Wy.call(this, C);
      } catch (_) {
        return Promise.reject(_);
      }
      for (b = 0, x = m.length; b < x; ) g = g.then(m[b++], m[b++]);
      return g;
    }
    getUri(n) {
      n = Aa(this.defaults, n);
      const a = Hy(n.baseURL, n.url, n.allowAbsoluteUrls);
      return Ny(a, n.params, n.paramsSerializer);
    }
  };
  (V.forEach(["delete", "get", "head", "options"], function (n) {
    Oa.prototype[n] = function (a, o) {
      return this.request(
        Aa(o || {}, { method: n, url: a, data: (o || {}).data }),
      );
    };
  }),
    V.forEach(["post", "put", "patch"], function (n) {
      function a(o) {
        return function (u, c, d) {
          return this.request(
            Aa(d || {}, {
              method: n,
              headers: o ? { "Content-Type": "multipart/form-data" } : {},
              url: u,
              data: c,
            }),
          );
        };
      }
      ((Oa.prototype[n] = a()), (Oa.prototype[n + "Form"] = a(!0)));
    }));
  let Y2 = class H_ {
    constructor(n) {
      if (typeof n != "function")
        throw new TypeError("executor must be a function.");
      let a;
      this.promise = new Promise(function (u) {
        a = u;
      });
      const o = this;
      (this.promise.then((s) => {
        if (!o._listeners) return;
        let u = o._listeners.length;
        for (; u-- > 0; ) o._listeners[u](s);
        o._listeners = null;
      }),
        (this.promise.then = (s) => {
          let u;
          const c = new Promise((d) => {
            (o.subscribe(d), (u = d));
          }).then(s);
          return (
            (c.cancel = function () {
              o.unsubscribe(u);
            }),
            c
          );
        }),
        n(function (u, c, d) {
          o.reason || ((o.reason = new fo(u, c, d)), a(o.reason));
        }));
    }
    throwIfRequested() {
      if (this.reason) throw this.reason;
    }
    subscribe(n) {
      if (this.reason) {
        n(this.reason);
        return;
      }
      this._listeners ? this._listeners.push(n) : (this._listeners = [n]);
    }
    unsubscribe(n) {
      if (!this._listeners) return;
      const a = this._listeners.indexOf(n);
      a !== -1 && this._listeners.splice(a, 1);
    }
    toAbortSignal() {
      const n = new AbortController(),
        a = (o) => {
          n.abort(o);
        };
      return (
        this.subscribe(a),
        (n.signal.unsubscribe = () => this.unsubscribe(a)),
        n.signal
      );
    }
    static source() {
      let n;
      return {
        token: new H_(function (s) {
          n = s;
        }),
        cancel: n,
      };
    }
  };
  function X2(e) {
    return function (a) {
      return e.apply(null, a);
    };
  }
  function W2(e) {
    return V.isObject(e) && e.isAxiosError === !0;
  }
  const kf = {
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
  Object.entries(kf).forEach(([e, n]) => {
    kf[n] = e;
  });
  function Jy(e) {
    const n = new Oa(e),
      a = yy(Oa.prototype.request, n);
    return (
      V.extend(a, Oa.prototype, n, { allOwnKeys: !0 }),
      V.extend(a, n, null, { allOwnKeys: !0 }),
      (a.create = function (s) {
        return Jy(Aa(e, s));
      }),
      a
    );
  }
  const vt = Jy(Ti);
  ((vt.Axios = Oa),
    (vt.CanceledError = fo),
    (vt.CancelToken = Y2),
    (vt.isCancel = Uy),
    (vt.VERSION = Qy),
    (vt.toFormData = xl),
    (vt.AxiosError = Ce),
    (vt.Cancel = vt.CanceledError),
    (vt.all = function (n) {
      return Promise.all(n);
    }),
    (vt.spread = X2),
    (vt.isAxiosError = W2),
    (vt.mergeConfig = Aa),
    (vt.AxiosHeaders = ln),
    (vt.formToJSON = (e) => By(V.isHTMLForm(e) ? new FormData(e) : e)),
    (vt.getAdapter = Xy.getAdapter),
    (vt.HttpStatusCode = kf),
    (vt.default = vt));
  const {
    Axios: gz,
    AxiosError: Q2,
    CanceledError: yz,
    isCancel: bz,
    CancelToken: vz,
    VERSION: Sz,
    all: Ez,
    Cancel: _z,
    isAxiosError: Tz,
    spread: xz,
    toFormData: Cz,
    AxiosHeaders: wz,
    HttpStatusCode: Rz,
    formToJSON: Az,
    getAdapter: Oz,
    mergeConfig: Mz,
  } = vt;
  var zf, eb;
  function Z2() {
    if (eb) return zf;
    eb = 1;
    var e = typeof Ks == "object" && Ks && Ks.Object === Object && Ks;
    return ((zf = e), zf);
  }
  var Bf, tb;
  function J2() {
    if (tb) return Bf;
    tb = 1;
    var e = Z2(),
      n = typeof self == "object" && self && self.Object === Object && self,
      a = e || n || Function("return this")();
    return ((Bf = a), Bf);
  }
  var Lf, nb;
  function rb() {
    if (nb) return Lf;
    nb = 1;
    var e = J2(),
      n = e.Symbol;
    return ((Lf = n), Lf);
  }
  var Uf, ab;
  function eA() {
    if (ab) return Uf;
    ab = 1;
    var e = rb(),
      n = Object.prototype,
      a = n.hasOwnProperty,
      o = n.toString,
      s = e ? e.toStringTag : void 0;
    function u(c) {
      var d = a.call(c, s),
        h = c[s];
      try {
        c[s] = void 0;
        var m = !0;
      } catch {}
      var g = o.call(c);
      return (m && (d ? (c[s] = h) : delete c[s]), g);
    }
    return ((Uf = u), Uf);
  }
  var jf, ob;
  function tA() {
    if (ob) return jf;
    ob = 1;
    var e = Object.prototype,
      n = e.toString;
    function a(o) {
      return n.call(o);
    }
    return ((jf = a), jf);
  }
  var $f, ib;
  function sb() {
    if (ib) return $f;
    ib = 1;
    var e = rb(),
      n = eA(),
      a = tA(),
      o = "[object Null]",
      s = "[object Undefined]",
      u = e ? e.toStringTag : void 0;
    function c(d) {
      return d == null
        ? d === void 0
          ? s
          : o
        : u && u in Object(d)
          ? n(d)
          : a(d);
    }
    return (($f = c), $f);
  }
  var If, lb;
  function nA() {
    if (lb) return If;
    lb = 1;
    var e = Array.isArray;
    return ((If = e), If);
  }
  var Hf, ub;
  function rA() {
    if (ub) return Hf;
    ub = 1;
    function e(n) {
      return n != null && typeof n == "object";
    }
    return ((Hf = e), Hf);
  }
  var Pf, cb;
  function aA() {
    if (cb) return Pf;
    cb = 1;
    var e = sb(),
      n = nA(),
      a = rA(),
      o = "[object String]";
    function s(u) {
      return typeof u == "string" || (!n(u) && a(u) && e(u) == o);
    }
    return ((Pf = s), Pf);
  }
  (aA(),
    vt
      .create({
        adapter: "fetch",
        withCredentials: !0,
        baseURL: "https://www.upwork.com",
      })
      .interceptors.response.use(qm.logRequest));
  var fb = ((e) => (
      (e.MostRecent = "Most Recent"),
      (e.BestMatches = "Best Matches"),
      (e.MyFeed = "My Feed / Saved Searches"),
      e
    ))(fb || {}),
    qf,
    db;
  function oA() {
    if (db) return qf;
    db = 1;
    var e = sb(),
      n = $m(),
      a = "[object AsyncFunction]",
      o = "[object Function]",
      s = "[object GeneratorFunction]",
      u = "[object Proxy]";
    function c(d) {
      if (!n(d)) return !1;
      var h = e(d);
      return h == o || h == s || h == a || h == u;
    }
    return ((qf = c), qf);
  }
  var iA = oA();
  const pb = di(iA),
    Ff = "sync:__STATE",
    hb = () => ({
      instanceId: Hm(),
      enabled: !0,
      darkMode: "system",
      compactList: !0,
      readAlerts: [],
      readAlertIds: [],
      openProposalPage: !0,
      lastLoginAttemptAt: null,
      lastCaptchaAttemptAt: null,
      feedType: fb.MyFeed,
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
    Gf = () => On.getItem(Ff, { fallback: hb() }),
    Pr = {
      addEventListener: (e) => On.watch(Ff, e),
      getDefaultState: hb,
      get: Gf,
      save: async (e) => {
        const n = pb(e) ? e(await Gf()) : { ...(await Gf()), ...e };
        return (await On.setItem(Ff, n), n);
      },
    },
    Vf = O.createContext({
      initialized: !1,
      jobs: [],
      prompt: "",
      globalState: Pr.getDefaultState(),
      setJobs: Promise.resolve,
      setState: Promise.resolve,
      setPrompt: Promise.resolve,
    }),
    Ci = { black: "#000", white: "#fff" },
    po = {
      300: "#e57373",
      400: "#ef5350",
      500: "#f44336",
      700: "#d32f2f",
      800: "#c62828",
    },
    ho = {
      50: "#f3e5f5",
      200: "#ce93d8",
      300: "#ba68c8",
      400: "#ab47bc",
      500: "#9c27b0",
      700: "#7b1fa2",
    },
    mo = {
      50: "#e3f2fd",
      200: "#90caf9",
      400: "#42a5f5",
      700: "#1976d2",
      800: "#1565c0",
    },
    go = {
      300: "#4fc3f7",
      400: "#29b6f6",
      500: "#03a9f4",
      700: "#0288d1",
      900: "#01579b",
    },
    yo = {
      300: "#81c784",
      400: "#66bb6a",
      500: "#4caf50",
      700: "#388e3c",
      800: "#2e7d32",
      900: "#1b5e20",
    },
    wi = {
      300: "#ffb74d",
      400: "#ffa726",
      500: "#ff9800",
      700: "#f57c00",
      900: "#e65100",
    },
    sA = {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#f5f5f5",
      A200: "#eeeeee",
      A400: "#bdbdbd",
      A700: "#616161",
    };
  function vr(e, ...n) {
    const a = new URL(`https://mui.com/production-error/?code=${e}`);
    return (
      n.forEach((o) => a.searchParams.append("args[]", o)),
      `Minified MUI error #${e}; visit ${a} for the full message.`
    );
  }
  const Sr = "$$material";
  function Dl() {
    return (
      (Dl = Object.assign
        ? Object.assign.bind()
        : function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var a = arguments[n];
              for (var o in a) ({}).hasOwnProperty.call(a, o) && (e[o] = a[o]);
            }
            return e;
          }),
      Dl.apply(null, arguments)
    );
  }
  function lA(e) {
    if (e.sheet) return e.sheet;
    for (var n = 0; n < document.styleSheets.length; n++)
      if (document.styleSheets[n].ownerNode === e)
        return document.styleSheets[n];
  }
  function uA(e) {
    var n = document.createElement("style");
    return (
      n.setAttribute("data-emotion", e.key),
      e.nonce !== void 0 && n.setAttribute("nonce", e.nonce),
      n.appendChild(document.createTextNode("")),
      n.setAttribute("data-s", ""),
      n
    );
  }
  var cA = (function () {
      function e(a) {
        var o = this;
        ((this._insertTag = function (s) {
          var u;
          (o.tags.length === 0
            ? o.insertionPoint
              ? (u = o.insertionPoint.nextSibling)
              : o.prepend
                ? (u = o.container.firstChild)
                : (u = o.before)
            : (u = o.tags[o.tags.length - 1].nextSibling),
            o.container.insertBefore(s, u),
            o.tags.push(s));
        }),
          (this.isSpeedy = a.speedy === void 0 ? !0 : a.speedy),
          (this.tags = []),
          (this.ctr = 0),
          (this.nonce = a.nonce),
          (this.key = a.key),
          (this.container = a.container),
          (this.prepend = a.prepend),
          (this.insertionPoint = a.insertionPoint),
          (this.before = null));
      }
      var n = e.prototype;
      return (
        (n.hydrate = function (o) {
          o.forEach(this._insertTag);
        }),
        (n.insert = function (o) {
          this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 &&
            this._insertTag(uA(this));
          var s = this.tags[this.tags.length - 1];
          if (this.isSpeedy) {
            var u = lA(s);
            try {
              u.insertRule(o, u.cssRules.length);
            } catch {}
          } else s.appendChild(document.createTextNode(o));
          this.ctr++;
        }),
        (n.flush = function () {
          (this.tags.forEach(function (o) {
            var s;
            return (s = o.parentNode) == null ? void 0 : s.removeChild(o);
          }),
            (this.tags = []),
            (this.ctr = 0));
        }),
        e
      );
    })(),
    Qt = "-ms-",
    Nl = "-moz-",
    je = "-webkit-",
    mb = "comm",
    Kf = "rule",
    Yf = "decl",
    fA = "@import",
    gb = "@keyframes",
    dA = "@layer",
    pA = Math.abs,
    kl = String.fromCharCode,
    hA = Object.assign;
  function mA(e, n) {
    return Ft(e, 0) ^ 45
      ? (((((((n << 2) ^ Ft(e, 0)) << 2) ^ Ft(e, 1)) << 2) ^ Ft(e, 2)) << 2) ^
          Ft(e, 3)
      : 0;
  }
  function yb(e) {
    return e.trim();
  }
  function gA(e, n) {
    return (e = n.exec(e)) ? e[0] : e;
  }
  function $e(e, n, a) {
    return e.replace(n, a);
  }
  function Xf(e, n) {
    return e.indexOf(n);
  }
  function Ft(e, n) {
    return e.charCodeAt(n) | 0;
  }
  function Ri(e, n, a) {
    return e.slice(n, a);
  }
  function rr(e) {
    return e.length;
  }
  function Wf(e) {
    return e.length;
  }
  function zl(e, n) {
    return (n.push(e), e);
  }
  function yA(e, n) {
    return e.map(n).join("");
  }
  var Bl = 1,
    bo = 1,
    bb = 0,
    un = 0,
    Dt = 0,
    vo = "";
  function Ll(e, n, a, o, s, u, c) {
    return {
      value: e,
      root: n,
      parent: a,
      type: o,
      props: s,
      children: u,
      line: Bl,
      column: bo,
      length: c,
      return: "",
    };
  }
  function Ai(e, n) {
    return hA(
      Ll("", null, null, "", null, null, 0),
      e,
      { length: -e.length },
      n,
    );
  }
  function bA() {
    return Dt;
  }
  function vA() {
    return (
      (Dt = un > 0 ? Ft(vo, --un) : 0),
      bo--,
      Dt === 10 && ((bo = 1), Bl--),
      Dt
    );
  }
  function bn() {
    return (
      (Dt = un < bb ? Ft(vo, un++) : 0),
      bo++,
      Dt === 10 && ((bo = 1), Bl++),
      Dt
    );
  }
  function ar() {
    return Ft(vo, un);
  }
  function Ul() {
    return un;
  }
  function Oi(e, n) {
    return Ri(vo, e, n);
  }
  function Mi(e) {
    switch (e) {
      case 0:
      case 9:
      case 10:
      case 13:
      case 32:
        return 5;
      case 33:
      case 43:
      case 44:
      case 47:
      case 62:
      case 64:
      case 126:
      case 59:
      case 123:
      case 125:
        return 4;
      case 58:
        return 3;
      case 34:
      case 39:
      case 40:
      case 91:
        return 2;
      case 41:
      case 93:
        return 1;
    }
    return 0;
  }
  function vb(e) {
    return ((Bl = bo = 1), (bb = rr((vo = e))), (un = 0), []);
  }
  function Sb(e) {
    return ((vo = ""), e);
  }
  function jl(e) {
    return yb(Oi(un - 1, Qf(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
  }
  function SA(e) {
    for (; (Dt = ar()) && Dt < 33; ) bn();
    return Mi(e) > 2 || Mi(Dt) > 3 ? "" : " ";
  }
  function EA(e, n) {
    for (
      ;
      --n &&
      bn() &&
      !(Dt < 48 || Dt > 102 || (Dt > 57 && Dt < 65) || (Dt > 70 && Dt < 97));
    );
    return Oi(e, Ul() + (n < 6 && ar() == 32 && bn() == 32));
  }
  function Qf(e) {
    for (; bn(); )
      switch (Dt) {
        case e:
          return un;
        case 34:
        case 39:
          e !== 34 && e !== 39 && Qf(Dt);
          break;
        case 40:
          e === 41 && Qf(e);
          break;
        case 92:
          bn();
          break;
      }
    return un;
  }
  function _A(e, n) {
    for (; bn() && e + Dt !== 57; ) if (e + Dt === 84 && ar() === 47) break;
    return "/*" + Oi(n, un - 1) + "*" + kl(e === 47 ? e : bn());
  }
  function TA(e) {
    for (; !Mi(ar()); ) bn();
    return Oi(e, un);
  }
  function xA(e) {
    return Sb($l("", null, null, null, [""], (e = vb(e)), 0, [0], e));
  }
  function $l(e, n, a, o, s, u, c, d, h) {
    for (
      var m = 0,
        g = 0,
        b = c,
        x = 0,
        C = 0,
        _ = 0,
        v = 1,
        E = 1,
        w = 1,
        D = 0,
        R = "",
        M = s,
        A = u,
        L = o,
        G = R;
      E;
    )
      switch (((_ = D), (D = bn()))) {
        case 40:
          if (_ != 108 && Ft(G, b - 1) == 58) {
            Xf((G += $e(jl(D), "&", "&\f")), "&\f") != -1 && (w = -1);
            break;
          }
        case 34:
        case 39:
        case 91:
          G += jl(D);
          break;
        case 9:
        case 10:
        case 13:
        case 32:
          G += SA(_);
          break;
        case 92:
          G += EA(Ul() - 1, 7);
          continue;
        case 47:
          switch (ar()) {
            case 42:
            case 47:
              zl(CA(_A(bn(), Ul()), n, a), h);
              break;
            default:
              G += "/";
          }
          break;
        case 123 * v:
          d[m++] = rr(G) * w;
        case 125 * v:
        case 59:
        case 0:
          switch (D) {
            case 0:
            case 125:
              E = 0;
            case 59 + g:
              (w == -1 && (G = $e(G, /\f/g, "")),
                C > 0 &&
                  rr(G) - b &&
                  zl(
                    C > 32
                      ? _b(G + ";", o, a, b - 1)
                      : _b($e(G, " ", "") + ";", o, a, b - 2),
                    h,
                  ));
              break;
            case 59:
              G += ";";
            default:
              if (
                (zl((L = Eb(G, n, a, m, g, s, d, R, (M = []), (A = []), b)), u),
                D === 123)
              )
                if (g === 0) $l(G, n, L, L, M, u, b, d, A);
                else
                  switch (x === 99 && Ft(G, 3) === 110 ? 100 : x) {
                    case 100:
                    case 108:
                    case 109:
                    case 115:
                      $l(
                        e,
                        L,
                        L,
                        o && zl(Eb(e, L, L, 0, 0, s, d, R, s, (M = []), b), A),
                        s,
                        A,
                        b,
                        d,
                        o ? M : A,
                      );
                      break;
                    default:
                      $l(G, L, L, L, [""], A, 0, d, A);
                  }
          }
          ((m = g = C = 0), (v = w = 1), (R = G = ""), (b = c));
          break;
        case 58:
          ((b = 1 + rr(G)), (C = _));
        default:
          if (v < 1) {
            if (D == 123) --v;
            else if (D == 125 && v++ == 0 && vA() == 125) continue;
          }
          switch (((G += kl(D)), D * v)) {
            case 38:
              w = g > 0 ? 1 : ((G += "\f"), -1);
              break;
            case 44:
              ((d[m++] = (rr(G) - 1) * w), (w = 1));
              break;
            case 64:
              (ar() === 45 && (G += jl(bn())),
                (x = ar()),
                (g = b = rr((R = G += TA(Ul())))),
                D++);
              break;
            case 45:
              _ === 45 && rr(G) == 2 && (v = 0);
          }
      }
    return u;
  }
  function Eb(e, n, a, o, s, u, c, d, h, m, g) {
    for (
      var b = s - 1, x = s === 0 ? u : [""], C = Wf(x), _ = 0, v = 0, E = 0;
      _ < o;
      ++_
    )
      for (var w = 0, D = Ri(e, b + 1, (b = pA((v = c[_])))), R = e; w < C; ++w)
        (R = yb(v > 0 ? x[w] + " " + D : $e(D, /&\f/g, x[w]))) && (h[E++] = R);
    return Ll(e, n, a, s === 0 ? Kf : d, h, m, g);
  }
  function CA(e, n, a) {
    return Ll(e, n, a, mb, kl(bA()), Ri(e, 2, -2), 0);
  }
  function _b(e, n, a, o) {
    return Ll(e, n, a, Yf, Ri(e, 0, o), Ri(e, o + 1, -1), o);
  }
  function So(e, n) {
    for (var a = "", o = Wf(e), s = 0; s < o; s++) a += n(e[s], s, e, n) || "";
    return a;
  }
  function wA(e, n, a, o) {
    switch (e.type) {
      case dA:
        if (e.children.length) break;
      case fA:
      case Yf:
        return (e.return = e.return || e.value);
      case mb:
        return "";
      case gb:
        return (e.return = e.value + "{" + So(e.children, o) + "}");
      case Kf:
        e.value = e.props.join(",");
    }
    return rr((a = So(e.children, o)))
      ? (e.return = e.value + "{" + a + "}")
      : "";
  }
  function RA(e) {
    var n = Wf(e);
    return function (a, o, s, u) {
      for (var c = "", d = 0; d < n; d++) c += e[d](a, o, s, u) || "";
      return c;
    };
  }
  function AA(e) {
    return function (n) {
      n.root || ((n = n.return) && e(n));
    };
  }
  function Tb(e) {
    var n = Object.create(null);
    return function (a) {
      return (n[a] === void 0 && (n[a] = e(a)), n[a]);
    };
  }
  var OA = function (n, a, o) {
      for (
        var s = 0, u = 0;
        (s = u), (u = ar()), s === 38 && u === 12 && (a[o] = 1), !Mi(u);
      )
        bn();
      return Oi(n, un);
    },
    MA = function (n, a) {
      var o = -1,
        s = 44;
      do
        switch (Mi(s)) {
          case 0:
            (s === 38 && ar() === 12 && (a[o] = 1), (n[o] += OA(un - 1, a, o)));
            break;
          case 2:
            n[o] += jl(s);
            break;
          case 4:
            if (s === 44) {
              ((n[++o] = ar() === 58 ? "&\f" : ""), (a[o] = n[o].length));
              break;
            }
          default:
            n[o] += kl(s);
        }
      while ((s = bn()));
      return n;
    },
    DA = function (n, a) {
      return Sb(MA(vb(n), a));
    },
    xb = new WeakMap(),
    NA = function (n) {
      if (!(n.type !== "rule" || !n.parent || n.length < 1)) {
        for (
          var a = n.value,
            o = n.parent,
            s = n.column === o.column && n.line === o.line;
          o.type !== "rule";
        )
          if (((o = o.parent), !o)) return;
        if (
          !(n.props.length === 1 && a.charCodeAt(0) !== 58 && !xb.get(o)) &&
          !s
        ) {
          xb.set(n, !0);
          for (
            var u = [], c = DA(a, u), d = o.props, h = 0, m = 0;
            h < c.length;
            h++
          )
            for (var g = 0; g < d.length; g++, m++)
              n.props[m] = u[h]
                ? c[h].replace(/&\f/g, d[g])
                : d[g] + " " + c[h];
        }
      }
    },
    kA = function (n) {
      if (n.type === "decl") {
        var a = n.value;
        a.charCodeAt(0) === 108 &&
          a.charCodeAt(2) === 98 &&
          ((n.return = ""), (n.value = ""));
      }
    };
  function Cb(e, n) {
    switch (mA(e, n)) {
      case 5103:
        return je + "print-" + e + e;
      case 5737:
      case 4201:
      case 3177:
      case 3433:
      case 1641:
      case 4457:
      case 2921:
      case 5572:
      case 6356:
      case 5844:
      case 3191:
      case 6645:
      case 3005:
      case 6391:
      case 5879:
      case 5623:
      case 6135:
      case 4599:
      case 4855:
      case 4215:
      case 6389:
      case 5109:
      case 5365:
      case 5621:
      case 3829:
        return je + e + e;
      case 5349:
      case 4246:
      case 4810:
      case 6968:
      case 2756:
        return je + e + Nl + e + Qt + e + e;
      case 6828:
      case 4268:
        return je + e + Qt + e + e;
      case 6165:
        return je + e + Qt + "flex-" + e + e;
      case 5187:
        return (
          je +
          e +
          $e(e, /(\w+).+(:[^]+)/, je + "box-$1$2" + Qt + "flex-$1$2") +
          e
        );
      case 5443:
        return je + e + Qt + "flex-item-" + $e(e, /flex-|-self/, "") + e;
      case 4675:
        return (
          je +
          e +
          Qt +
          "flex-line-pack" +
          $e(e, /align-content|flex-|-self/, "") +
          e
        );
      case 5548:
        return je + e + Qt + $e(e, "shrink", "negative") + e;
      case 5292:
        return je + e + Qt + $e(e, "basis", "preferred-size") + e;
      case 6060:
        return (
          je +
          "box-" +
          $e(e, "-grow", "") +
          je +
          e +
          Qt +
          $e(e, "grow", "positive") +
          e
        );
      case 4554:
        return je + $e(e, /([^-])(transform)/g, "$1" + je + "$2") + e;
      case 6187:
        return (
          $e(
            $e($e(e, /(zoom-|grab)/, je + "$1"), /(image-set)/, je + "$1"),
            e,
            "",
          ) + e
        );
      case 5495:
      case 3959:
        return $e(e, /(image-set\([^]*)/, je + "$1$`$1");
      case 4968:
        return (
          $e(
            $e(
              e,
              /(.+:)(flex-)?(.*)/,
              je + "box-pack:$3" + Qt + "flex-pack:$3",
            ),
            /s.+-b[^;]+/,
            "justify",
          ) +
          je +
          e +
          e
        );
      case 4095:
      case 3583:
      case 4068:
      case 2532:
        return $e(e, /(.+)-inline(.+)/, je + "$1$2") + e;
      case 8116:
      case 7059:
      case 5753:
      case 5535:
      case 5445:
      case 5701:
      case 4933:
      case 4677:
      case 5533:
      case 5789:
      case 5021:
      case 4765:
        if (rr(e) - 1 - n > 6)
          switch (Ft(e, n + 1)) {
            case 109:
              if (Ft(e, n + 4) !== 45) break;
            case 102:
              return (
                $e(
                  e,
                  /(.+:)(.+)-([^]+)/,
                  "$1" +
                    je +
                    "$2-$3$1" +
                    Nl +
                    (Ft(e, n + 3) == 108 ? "$3" : "$2-$3"),
                ) + e
              );
            case 115:
              return ~Xf(e, "stretch")
                ? Cb($e(e, "stretch", "fill-available"), n) + e
                : e;
          }
        break;
      case 4949:
        if (Ft(e, n + 1) !== 115) break;
      case 6444:
        switch (Ft(e, rr(e) - 3 - (~Xf(e, "!important") && 10))) {
          case 107:
            return $e(e, ":", ":" + je) + e;
          case 101:
            return (
              $e(
                e,
                /(.+:)([^;!]+)(;|!.+)?/,
                "$1" +
                  je +
                  (Ft(e, 14) === 45 ? "inline-" : "") +
                  "box$3$1" +
                  je +
                  "$2$3$1" +
                  Qt +
                  "$2box$3",
              ) + e
            );
        }
        break;
      case 5936:
        switch (Ft(e, n + 11)) {
          case 114:
            return je + e + Qt + $e(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
          case 108:
            return je + e + Qt + $e(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
          case 45:
            return je + e + Qt + $e(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
        }
        return je + e + Qt + e + e;
    }
    return e;
  }
  var zA = function (n, a, o, s) {
      if (n.length > -1 && !n.return)
        switch (n.type) {
          case Yf:
            n.return = Cb(n.value, n.length);
            break;
          case gb:
            return So([Ai(n, { value: $e(n.value, "@", "@" + je) })], s);
          case Kf:
            if (n.length)
              return yA(n.props, function (u) {
                switch (gA(u, /(::plac\w+|:read-\w+)/)) {
                  case ":read-only":
                  case ":read-write":
                    return So(
                      [
                        Ai(n, {
                          props: [$e(u, /:(read-\w+)/, ":" + Nl + "$1")],
                        }),
                      ],
                      s,
                    );
                  case "::placeholder":
                    return So(
                      [
                        Ai(n, {
                          props: [$e(u, /:(plac\w+)/, ":" + je + "input-$1")],
                        }),
                        Ai(n, {
                          props: [$e(u, /:(plac\w+)/, ":" + Nl + "$1")],
                        }),
                        Ai(n, {
                          props: [$e(u, /:(plac\w+)/, Qt + "input-$1")],
                        }),
                      ],
                      s,
                    );
                }
                return "";
              });
        }
    },
    BA = [zA],
    LA = function (n) {
      var a = n.key;
      if (a === "css") {
        var o = document.querySelectorAll("style[data-emotion]:not([data-s])");
        Array.prototype.forEach.call(o, function (v) {
          var E = v.getAttribute("data-emotion");
          E.indexOf(" ") !== -1 &&
            (document.head.appendChild(v), v.setAttribute("data-s", ""));
        });
      }
      var s = n.stylisPlugins || BA,
        u = {},
        c,
        d = [];
      ((c = n.container || document.head),
        Array.prototype.forEach.call(
          document.querySelectorAll('style[data-emotion^="' + a + ' "]'),
          function (v) {
            for (
              var E = v.getAttribute("data-emotion").split(" "), w = 1;
              w < E.length;
              w++
            )
              u[E[w]] = !0;
            d.push(v);
          },
        ));
      var h,
        m = [NA, kA];
      {
        var g,
          b = [
            wA,
            AA(function (v) {
              g.insert(v);
            }),
          ],
          x = RA(m.concat(s, b)),
          C = function (E) {
            return So(xA(E), x);
          };
        h = function (E, w, D, R) {
          ((g = D),
            C(E ? E + "{" + w.styles + "}" : w.styles),
            R && (_.inserted[w.name] = !0));
        };
      }
      var _ = {
        key: a,
        sheet: new cA({
          key: a,
          container: c,
          nonce: n.nonce,
          speedy: n.speedy,
          prepend: n.prepend,
          insertionPoint: n.insertionPoint,
        }),
        nonce: n.nonce,
        inserted: u,
        registered: {},
        insert: h,
      };
      return (_.sheet.hydrate(d), _);
    },
    Zf = { exports: {} },
    qe = {};
  /** @license React v16.13.1
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var wb;
  function UA() {
    if (wb) return qe;
    wb = 1;
    var e = typeof Symbol == "function" && Symbol.for,
      n = e ? Symbol.for("react.element") : 60103,
      a = e ? Symbol.for("react.portal") : 60106,
      o = e ? Symbol.for("react.fragment") : 60107,
      s = e ? Symbol.for("react.strict_mode") : 60108,
      u = e ? Symbol.for("react.profiler") : 60114,
      c = e ? Symbol.for("react.provider") : 60109,
      d = e ? Symbol.for("react.context") : 60110,
      h = e ? Symbol.for("react.async_mode") : 60111,
      m = e ? Symbol.for("react.concurrent_mode") : 60111,
      g = e ? Symbol.for("react.forward_ref") : 60112,
      b = e ? Symbol.for("react.suspense") : 60113,
      x = e ? Symbol.for("react.suspense_list") : 60120,
      C = e ? Symbol.for("react.memo") : 60115,
      _ = e ? Symbol.for("react.lazy") : 60116,
      v = e ? Symbol.for("react.block") : 60121,
      E = e ? Symbol.for("react.fundamental") : 60117,
      w = e ? Symbol.for("react.responder") : 60118,
      D = e ? Symbol.for("react.scope") : 60119;
    function R(A) {
      if (typeof A == "object" && A !== null) {
        var L = A.$$typeof;
        switch (L) {
          case n:
            switch (((A = A.type), A)) {
              case h:
              case m:
              case o:
              case u:
              case s:
              case b:
                return A;
              default:
                switch (((A = A && A.$$typeof), A)) {
                  case d:
                  case g:
                  case _:
                  case C:
                  case c:
                    return A;
                  default:
                    return L;
                }
            }
          case a:
            return L;
        }
      }
    }
    function M(A) {
      return R(A) === m;
    }
    return (
      (qe.AsyncMode = h),
      (qe.ConcurrentMode = m),
      (qe.ContextConsumer = d),
      (qe.ContextProvider = c),
      (qe.Element = n),
      (qe.ForwardRef = g),
      (qe.Fragment = o),
      (qe.Lazy = _),
      (qe.Memo = C),
      (qe.Portal = a),
      (qe.Profiler = u),
      (qe.StrictMode = s),
      (qe.Suspense = b),
      (qe.isAsyncMode = function (A) {
        return M(A) || R(A) === h;
      }),
      (qe.isConcurrentMode = M),
      (qe.isContextConsumer = function (A) {
        return R(A) === d;
      }),
      (qe.isContextProvider = function (A) {
        return R(A) === c;
      }),
      (qe.isElement = function (A) {
        return typeof A == "object" && A !== null && A.$$typeof === n;
      }),
      (qe.isForwardRef = function (A) {
        return R(A) === g;
      }),
      (qe.isFragment = function (A) {
        return R(A) === o;
      }),
      (qe.isLazy = function (A) {
        return R(A) === _;
      }),
      (qe.isMemo = function (A) {
        return R(A) === C;
      }),
      (qe.isPortal = function (A) {
        return R(A) === a;
      }),
      (qe.isProfiler = function (A) {
        return R(A) === u;
      }),
      (qe.isStrictMode = function (A) {
        return R(A) === s;
      }),
      (qe.isSuspense = function (A) {
        return R(A) === b;
      }),
      (qe.isValidElementType = function (A) {
        return (
          typeof A == "string" ||
          typeof A == "function" ||
          A === o ||
          A === m ||
          A === u ||
          A === s ||
          A === b ||
          A === x ||
          (typeof A == "object" &&
            A !== null &&
            (A.$$typeof === _ ||
              A.$$typeof === C ||
              A.$$typeof === c ||
              A.$$typeof === d ||
              A.$$typeof === g ||
              A.$$typeof === E ||
              A.$$typeof === w ||
              A.$$typeof === D ||
              A.$$typeof === v))
        );
      }),
      (qe.typeOf = R),
      qe
    );
  }
  var Rb;
  function jA() {
    return (Rb || ((Rb = 1), (Zf.exports = UA())), Zf.exports);
  }
  var Jf, Ab;
  function $A() {
    if (Ab) return Jf;
    Ab = 1;
    var e = jA(),
      n = {
        childContextTypes: !0,
        contextType: !0,
        contextTypes: !0,
        defaultProps: !0,
        displayName: !0,
        getDefaultProps: !0,
        getDerivedStateFromError: !0,
        getDerivedStateFromProps: !0,
        mixins: !0,
        propTypes: !0,
        type: !0,
      },
      a = {
        name: !0,
        length: !0,
        prototype: !0,
        caller: !0,
        callee: !0,
        arguments: !0,
        arity: !0,
      },
      o = {
        $$typeof: !0,
        render: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0,
      },
      s = {
        $$typeof: !0,
        compare: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0,
        type: !0,
      },
      u = {};
    ((u[e.ForwardRef] = o), (u[e.Memo] = s));
    function c(_) {
      return e.isMemo(_) ? s : u[_.$$typeof] || n;
    }
    var d = Object.defineProperty,
      h = Object.getOwnPropertyNames,
      m = Object.getOwnPropertySymbols,
      g = Object.getOwnPropertyDescriptor,
      b = Object.getPrototypeOf,
      x = Object.prototype;
    function C(_, v, E) {
      if (typeof v != "string") {
        if (x) {
          var w = b(v);
          w && w !== x && C(_, w, E);
        }
        var D = h(v);
        m && (D = D.concat(m(v)));
        for (var R = c(_), M = c(v), A = 0; A < D.length; ++A) {
          var L = D[A];
          if (!a[L] && !(E && E[L]) && !(M && M[L]) && !(R && R[L])) {
            var G = g(v, L);
            try {
              d(_, L, G);
            } catch {}
          }
        }
      }
      return _;
    }
    return ((Jf = C), Jf);
  }
  $A();
  var IA = !0;
  function Ob(e, n, a) {
    var o = "";
    return (
      a.split(" ").forEach(function (s) {
        e[s] !== void 0 ? n.push(e[s] + ";") : s && (o += s + " ");
      }),
      o
    );
  }
  var ed = function (n, a, o) {
      var s = n.key + "-" + a.name;
      (o === !1 || IA === !1) &&
        n.registered[s] === void 0 &&
        (n.registered[s] = a.styles);
    },
    td = function (n, a, o) {
      ed(n, a, o);
      var s = n.key + "-" + a.name;
      if (n.inserted[a.name] === void 0) {
        var u = a;
        do (n.insert(a === u ? "." + s : "", u, n.sheet, !0), (u = u.next));
        while (u !== void 0);
      }
    };
  function HA(e) {
    for (var n = 0, a, o = 0, s = e.length; s >= 4; ++o, s -= 4)
      ((a =
        (e.charCodeAt(o) & 255) |
        ((e.charCodeAt(++o) & 255) << 8) |
        ((e.charCodeAt(++o) & 255) << 16) |
        ((e.charCodeAt(++o) & 255) << 24)),
        (a = (a & 65535) * 1540483477 + (((a >>> 16) * 59797) << 16)),
        (a ^= a >>> 24),
        (n =
          ((a & 65535) * 1540483477 + (((a >>> 16) * 59797) << 16)) ^
          ((n & 65535) * 1540483477 + (((n >>> 16) * 59797) << 16))));
    switch (s) {
      case 3:
        n ^= (e.charCodeAt(o + 2) & 255) << 16;
      case 2:
        n ^= (e.charCodeAt(o + 1) & 255) << 8;
      case 1:
        ((n ^= e.charCodeAt(o) & 255),
          (n = (n & 65535) * 1540483477 + (((n >>> 16) * 59797) << 16)));
    }
    return (
      (n ^= n >>> 13),
      (n = (n & 65535) * 1540483477 + (((n >>> 16) * 59797) << 16)),
      ((n ^ (n >>> 15)) >>> 0).toString(36)
    );
  }
  var PA = {
      animationIterationCount: 1,
      aspectRatio: 1,
      borderImageOutset: 1,
      borderImageSlice: 1,
      borderImageWidth: 1,
      boxFlex: 1,
      boxFlexGroup: 1,
      boxOrdinalGroup: 1,
      columnCount: 1,
      columns: 1,
      flex: 1,
      flexGrow: 1,
      flexPositive: 1,
      flexShrink: 1,
      flexNegative: 1,
      flexOrder: 1,
      gridRow: 1,
      gridRowEnd: 1,
      gridRowSpan: 1,
      gridRowStart: 1,
      gridColumn: 1,
      gridColumnEnd: 1,
      gridColumnSpan: 1,
      gridColumnStart: 1,
      msGridRow: 1,
      msGridRowSpan: 1,
      msGridColumn: 1,
      msGridColumnSpan: 1,
      fontWeight: 1,
      lineHeight: 1,
      opacity: 1,
      order: 1,
      orphans: 1,
      scale: 1,
      tabSize: 1,
      widows: 1,
      zIndex: 1,
      zoom: 1,
      WebkitLineClamp: 1,
      fillOpacity: 1,
      floodOpacity: 1,
      stopOpacity: 1,
      strokeDasharray: 1,
      strokeDashoffset: 1,
      strokeMiterlimit: 1,
      strokeOpacity: 1,
      strokeWidth: 1,
    },
    qA = /[A-Z]|^ms/g,
    FA = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
    Mb = function (n) {
      return n.charCodeAt(1) === 45;
    },
    Db = function (n) {
      return n != null && typeof n != "boolean";
    },
    nd = Tb(function (e) {
      return Mb(e) ? e : e.replace(qA, "-$&").toLowerCase();
    }),
    Nb = function (n, a) {
      switch (n) {
        case "animation":
        case "animationName":
          if (typeof a == "string")
            return a.replace(FA, function (o, s, u) {
              return ((or = { name: s, styles: u, next: or }), s);
            });
      }
      return PA[n] !== 1 && !Mb(n) && typeof a == "number" && a !== 0
        ? a + "px"
        : a;
    };
  function Di(e, n, a) {
    if (a == null) return "";
    var o = a;
    if (o.__emotion_styles !== void 0) return o;
    switch (typeof a) {
      case "boolean":
        return "";
      case "object": {
        var s = a;
        if (s.anim === 1)
          return ((or = { name: s.name, styles: s.styles, next: or }), s.name);
        var u = a;
        if (u.styles !== void 0) {
          var c = u.next;
          if (c !== void 0)
            for (; c !== void 0; )
              ((or = { name: c.name, styles: c.styles, next: or }),
                (c = c.next));
          var d = u.styles + ";";
          return d;
        }
        return GA(e, n, a);
      }
      case "function": {
        if (e !== void 0) {
          var h = or,
            m = a(e);
          return ((or = h), Di(e, n, m));
        }
        break;
      }
    }
    var g = a;
    if (n == null) return g;
    var b = n[g];
    return b !== void 0 ? b : g;
  }
  function GA(e, n, a) {
    var o = "";
    if (Array.isArray(a))
      for (var s = 0; s < a.length; s++) o += Di(e, n, a[s]) + ";";
    else
      for (var u in a) {
        var c = a[u];
        if (typeof c != "object") {
          var d = c;
          n != null && n[d] !== void 0
            ? (o += u + "{" + n[d] + "}")
            : Db(d) && (o += nd(u) + ":" + Nb(u, d) + ";");
        } else if (
          Array.isArray(c) &&
          typeof c[0] == "string" &&
          (n == null || n[c[0]] === void 0)
        )
          for (var h = 0; h < c.length; h++)
            Db(c[h]) && (o += nd(u) + ":" + Nb(u, c[h]) + ";");
        else {
          var m = Di(e, n, c);
          switch (u) {
            case "animation":
            case "animationName": {
              o += nd(u) + ":" + m + ";";
              break;
            }
            default:
              o += u + "{" + m + "}";
          }
        }
      }
    return o;
  }
  var kb = /label:\s*([^\s;{]+)\s*(;|$)/g,
    or;
  function Ni(e, n, a) {
    if (
      e.length === 1 &&
      typeof e[0] == "object" &&
      e[0] !== null &&
      e[0].styles !== void 0
    )
      return e[0];
    var o = !0,
      s = "";
    or = void 0;
    var u = e[0];
    if (u == null || u.raw === void 0) ((o = !1), (s += Di(a, n, u)));
    else {
      var c = u;
      s += c[0];
    }
    for (var d = 1; d < e.length; d++)
      if (((s += Di(a, n, e[d])), o)) {
        var h = u;
        s += h[d];
      }
    kb.lastIndex = 0;
    for (var m = "", g; (g = kb.exec(s)) !== null; ) m += "-" + g[1];
    var b = HA(s) + m;
    return { name: b, styles: s, next: or };
  }
  var VA = function (n) {
      return n();
    },
    zb = Uc.useInsertionEffect ? Uc.useInsertionEffect : !1,
    Bb = zb || VA,
    Lb = zb || O.useLayoutEffect,
    Ub = O.createContext(typeof HTMLElement < "u" ? LA({ key: "css" }) : null);
  Ub.Provider;
  var rd = function (n) {
      return O.forwardRef(function (a, o) {
        var s = O.useContext(Ub);
        return n(a, s, o);
      });
    },
    ki = O.createContext({}),
    ad = {}.hasOwnProperty,
    od = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__",
    KA = function (n, a) {
      var o = {};
      for (var s in a) ad.call(a, s) && (o[s] = a[s]);
      return ((o[od] = n), o);
    },
    YA = function (n) {
      var a = n.cache,
        o = n.serialized,
        s = n.isStringTag;
      return (
        ed(a, o, s),
        Bb(function () {
          return td(a, o, s);
        }),
        null
      );
    },
    XA = rd(function (e, n, a) {
      var o = e.css;
      typeof o == "string" &&
        n.registered[o] !== void 0 &&
        (o = n.registered[o]);
      var s = e[od],
        u = [o],
        c = "";
      typeof e.className == "string"
        ? (c = Ob(n.registered, u, e.className))
        : e.className != null && (c = e.className + " ");
      var d = Ni(u, void 0, O.useContext(ki));
      c += n.key + "-" + d.name;
      var h = {};
      for (var m in e)
        ad.call(e, m) && m !== "css" && m !== od && (h[m] = e[m]);
      return (
        (h.className = c),
        a && (h.ref = a),
        O.createElement(
          O.Fragment,
          null,
          O.createElement(YA, {
            cache: n,
            serialized: d,
            isStringTag: typeof s == "string",
          }),
          O.createElement(s, h),
        )
      );
    }),
    WA = XA,
    jb = function (n, a) {
      var o = arguments;
      if (a == null || !ad.call(a, "css"))
        return O.createElement.apply(void 0, o);
      var s = o.length,
        u = new Array(s);
      ((u[0] = WA), (u[1] = KA(n, a)));
      for (var c = 2; c < s; c++) u[c] = o[c];
      return O.createElement.apply(null, u);
    };
  (function (e) {
    var n;
    n || (n = e.JSX || (e.JSX = {}));
  })(jb || (jb = {}));
  var QA = rd(function (e, n) {
    var a = e.styles,
      o = Ni([a], void 0, O.useContext(ki)),
      s = O.useRef();
    return (
      Lb(
        function () {
          var u = n.key + "-global",
            c = new n.sheet.constructor({
              key: u,
              nonce: n.sheet.nonce,
              container: n.sheet.container,
              speedy: n.sheet.isSpeedy,
            }),
            d = !1,
            h = document.querySelector(
              'style[data-emotion="' + u + " " + o.name + '"]',
            );
          return (
            n.sheet.tags.length && (c.before = n.sheet.tags[0]),
            h !== null &&
              ((d = !0), h.setAttribute("data-emotion", u), c.hydrate([h])),
            (s.current = [c, d]),
            function () {
              c.flush();
            }
          );
        },
        [n],
      ),
      Lb(
        function () {
          var u = s.current,
            c = u[0],
            d = u[1];
          if (d) {
            u[1] = !1;
            return;
          }
          if ((o.next !== void 0 && td(n, o.next, !0), c.tags.length)) {
            var h = c.tags[c.tags.length - 1].nextElementSibling;
            ((c.before = h), c.flush());
          }
          n.insert("", o, c, !1);
        },
        [n, o.name],
      ),
      null
    );
  });
  function id() {
    for (var e = arguments.length, n = new Array(e), a = 0; a < e; a++)
      n[a] = arguments[a];
    return Ni(n);
  }
  function zi() {
    var e = id.apply(void 0, arguments),
      n = "animation-" + e.name;
    return {
      name: n,
      styles: "@keyframes " + n + "{" + e.styles + "}",
      anim: 1,
      toString: function () {
        return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
      },
    };
  }
  var ZA =
      /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
    JA = Tb(function (e) {
      return (
        ZA.test(e) ||
        (e.charCodeAt(0) === 111 &&
          e.charCodeAt(1) === 110 &&
          e.charCodeAt(2) < 91)
      );
    }),
    eO = JA,
    tO = function (n) {
      return n !== "theme";
    },
    $b = function (n) {
      return typeof n == "string" && n.charCodeAt(0) > 96 ? eO : tO;
    },
    Ib = function (n, a, o) {
      var s;
      if (a) {
        var u = a.shouldForwardProp;
        s =
          n.__emotion_forwardProp && u
            ? function (c) {
                return n.__emotion_forwardProp(c) && u(c);
              }
            : u;
      }
      return (typeof s != "function" && o && (s = n.__emotion_forwardProp), s);
    },
    nO = function (n) {
      var a = n.cache,
        o = n.serialized,
        s = n.isStringTag;
      return (
        ed(a, o, s),
        Bb(function () {
          return td(a, o, s);
        }),
        null
      );
    },
    rO = function e(n, a) {
      var o = n.__emotion_real === n,
        s = (o && n.__emotion_base) || n,
        u,
        c;
      a !== void 0 && ((u = a.label), (c = a.target));
      var d = Ib(n, a, o),
        h = d || $b(s),
        m = !h("as");
      return function () {
        var g = arguments,
          b =
            o && n.__emotion_styles !== void 0
              ? n.__emotion_styles.slice(0)
              : [];
        if (
          (u !== void 0 && b.push("label:" + u + ";"),
          g[0] == null || g[0].raw === void 0)
        )
          b.push.apply(b, g);
        else {
          var x = g[0];
          b.push(x[0]);
          for (var C = g.length, _ = 1; _ < C; _++) b.push(g[_], x[_]);
        }
        var v = rd(function (E, w, D) {
          var R = (m && E.as) || s,
            M = "",
            A = [],
            L = E;
          if (E.theme == null) {
            L = {};
            for (var G in E) L[G] = E[G];
            L.theme = O.useContext(ki);
          }
          typeof E.className == "string"
            ? (M = Ob(w.registered, A, E.className))
            : E.className != null && (M = E.className + " ");
          var q = Ni(b.concat(A), w.registered, L);
          ((M += w.key + "-" + q.name), c !== void 0 && (M += " " + c));
          var W = m && d === void 0 ? $b(R) : h,
            S = {};
          for (var I in E) (m && I === "as") || (W(I) && (S[I] = E[I]));
          return (
            (S.className = M),
            D && (S.ref = D),
            O.createElement(
              O.Fragment,
              null,
              O.createElement(nO, {
                cache: w,
                serialized: q,
                isStringTag: typeof R == "string",
              }),
              O.createElement(R, S),
            )
          );
        });
        return (
          (v.displayName =
            u !== void 0
              ? u
              : "Styled(" +
                (typeof s == "string"
                  ? s
                  : s.displayName || s.name || "Component") +
                ")"),
          (v.defaultProps = n.defaultProps),
          (v.__emotion_real = v),
          (v.__emotion_base = s),
          (v.__emotion_styles = b),
          (v.__emotion_forwardProp = d),
          Object.defineProperty(v, "toString", {
            value: function () {
              return "." + c;
            },
          }),
          (v.withComponent = function (E, w) {
            var D = e(E, Dl({}, a, w, { shouldForwardProp: Ib(v, w, !0) }));
            return D.apply(void 0, b);
          }),
          v
        );
      };
    },
    aO = [
      "a",
      "abbr",
      "address",
      "area",
      "article",
      "aside",
      "audio",
      "b",
      "base",
      "bdi",
      "bdo",
      "big",
      "blockquote",
      "body",
      "br",
      "button",
      "canvas",
      "caption",
      "cite",
      "code",
      "col",
      "colgroup",
      "data",
      "datalist",
      "dd",
      "del",
      "details",
      "dfn",
      "dialog",
      "div",
      "dl",
      "dt",
      "em",
      "embed",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "header",
      "hgroup",
      "hr",
      "html",
      "i",
      "iframe",
      "img",
      "input",
      "ins",
      "kbd",
      "keygen",
      "label",
      "legend",
      "li",
      "link",
      "main",
      "map",
      "mark",
      "marquee",
      "menu",
      "menuitem",
      "meta",
      "meter",
      "nav",
      "noscript",
      "object",
      "ol",
      "optgroup",
      "option",
      "output",
      "p",
      "param",
      "picture",
      "pre",
      "progress",
      "q",
      "rp",
      "rt",
      "ruby",
      "s",
      "samp",
      "script",
      "section",
      "select",
      "small",
      "source",
      "span",
      "strong",
      "style",
      "sub",
      "summary",
      "sup",
      "table",
      "tbody",
      "td",
      "textarea",
      "tfoot",
      "th",
      "thead",
      "time",
      "title",
      "tr",
      "track",
      "u",
      "ul",
      "var",
      "video",
      "wbr",
      "circle",
      "clipPath",
      "defs",
      "ellipse",
      "foreignObject",
      "g",
      "image",
      "line",
      "linearGradient",
      "mask",
      "path",
      "pattern",
      "polygon",
      "polyline",
      "radialGradient",
      "rect",
      "stop",
      "svg",
      "text",
      "tspan",
    ],
    sd = rO.bind(null);
  aO.forEach(function (e) {
    sd[e] = sd(e);
  });
  function oO(e) {
    return e == null || Object.keys(e).length === 0;
  }
  function Hb(e) {
    const { styles: n, defaultTheme: a = {} } = e,
      o = typeof n == "function" ? (s) => n(oO(s) ? a : s) : n;
    return P.jsx(QA, { styles: o });
  }
  function iO(e, n) {
    return sd(e, n);
  }
  function sO(e, n) {
    Array.isArray(e.__emotion_styles) &&
      (e.__emotion_styles = n(e.__emotion_styles));
  }
  const Pb = [];
  function qb(e) {
    return ((Pb[0] = e), Ni(Pb));
  }
  var ld = { exports: {} },
    Je = {};
  /**
   * @license React
   * react-is.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var Fb;
  function lO() {
    if (Fb) return Je;
    Fb = 1;
    var e = Symbol.for("react.transitional.element"),
      n = Symbol.for("react.portal"),
      a = Symbol.for("react.fragment"),
      o = Symbol.for("react.strict_mode"),
      s = Symbol.for("react.profiler"),
      u = Symbol.for("react.consumer"),
      c = Symbol.for("react.context"),
      d = Symbol.for("react.forward_ref"),
      h = Symbol.for("react.suspense"),
      m = Symbol.for("react.suspense_list"),
      g = Symbol.for("react.memo"),
      b = Symbol.for("react.lazy"),
      x = Symbol.for("react.view_transition"),
      C = Symbol.for("react.client.reference");
    function _(v) {
      if (typeof v == "object" && v !== null) {
        var E = v.$$typeof;
        switch (E) {
          case e:
            switch (((v = v.type), v)) {
              case a:
              case s:
              case o:
              case h:
              case m:
              case x:
                return v;
              default:
                switch (((v = v && v.$$typeof), v)) {
                  case c:
                  case d:
                  case b:
                  case g:
                    return v;
                  case u:
                    return v;
                  default:
                    return E;
                }
            }
          case n:
            return E;
        }
      }
    }
    return (
      (Je.ContextConsumer = u),
      (Je.ContextProvider = c),
      (Je.Element = e),
      (Je.ForwardRef = d),
      (Je.Fragment = a),
      (Je.Lazy = b),
      (Je.Memo = g),
      (Je.Portal = n),
      (Je.Profiler = s),
      (Je.StrictMode = o),
      (Je.Suspense = h),
      (Je.SuspenseList = m),
      (Je.isContextConsumer = function (v) {
        return _(v) === u;
      }),
      (Je.isContextProvider = function (v) {
        return _(v) === c;
      }),
      (Je.isElement = function (v) {
        return typeof v == "object" && v !== null && v.$$typeof === e;
      }),
      (Je.isForwardRef = function (v) {
        return _(v) === d;
      }),
      (Je.isFragment = function (v) {
        return _(v) === a;
      }),
      (Je.isLazy = function (v) {
        return _(v) === b;
      }),
      (Je.isMemo = function (v) {
        return _(v) === g;
      }),
      (Je.isPortal = function (v) {
        return _(v) === n;
      }),
      (Je.isProfiler = function (v) {
        return _(v) === s;
      }),
      (Je.isStrictMode = function (v) {
        return _(v) === o;
      }),
      (Je.isSuspense = function (v) {
        return _(v) === h;
      }),
      (Je.isSuspenseList = function (v) {
        return _(v) === m;
      }),
      (Je.isValidElementType = function (v) {
        return (
          typeof v == "string" ||
          typeof v == "function" ||
          v === a ||
          v === s ||
          v === o ||
          v === h ||
          v === m ||
          (typeof v == "object" &&
            v !== null &&
            (v.$$typeof === b ||
              v.$$typeof === g ||
              v.$$typeof === c ||
              v.$$typeof === u ||
              v.$$typeof === d ||
              v.$$typeof === C ||
              v.getModuleId !== void 0))
        );
      }),
      (Je.typeOf = _),
      Je
    );
  }
  var Gb;
  function uO() {
    return (Gb || ((Gb = 1), (ld.exports = lO())), ld.exports);
  }
  var Vb = uO();
  function ir(e) {
    if (typeof e != "object" || e === null) return !1;
    const n = Object.getPrototypeOf(e);
    return (
      (n === null ||
        n === Object.prototype ||
        Object.getPrototypeOf(n) === null) &&
      !(Symbol.toStringTag in e) &&
      !(Symbol.iterator in e)
    );
  }
  function Kb(e) {
    if (O.isValidElement(e) || Vb.isValidElementType(e) || !ir(e)) return e;
    const n = {};
    return (
      Object.keys(e).forEach((a) => {
        n[a] = Kb(e[a]);
      }),
      n
    );
  }
  function Ut(e, n, a = { clone: !0 }) {
    const o = a.clone ? { ...e } : e;
    return (
      ir(e) &&
        ir(n) &&
        Object.keys(n).forEach((s) => {
          O.isValidElement(n[s]) || Vb.isValidElementType(n[s])
            ? (o[s] = n[s])
            : ir(n[s]) && Object.prototype.hasOwnProperty.call(e, s) && ir(e[s])
              ? (o[s] = Ut(e[s], n[s], a))
              : a.clone
                ? (o[s] = ir(n[s]) ? Kb(n[s]) : n[s])
                : (o[s] = n[s]);
        }),
      o
    );
  }
  const cO = (e) => {
    const n = Object.keys(e).map((a) => ({ key: a, val: e[a] })) || [];
    return (
      n.sort((a, o) => a.val - o.val),
      n.reduce((a, o) => ({ ...a, [o.key]: o.val }), {})
    );
  };
  function fO(e) {
    const {
        values: n = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
        unit: a = "px",
        step: o = 5,
        ...s
      } = e,
      u = cO(n),
      c = Object.keys(u);
    function d(x) {
      return `@media (min-width:${typeof n[x] == "number" ? n[x] : x}${a})`;
    }
    function h(x) {
      return `@media (max-width:${(typeof n[x] == "number" ? n[x] : x) - o / 100}${a})`;
    }
    function m(x, C) {
      const _ = c.indexOf(C);
      return `@media (min-width:${typeof n[x] == "number" ? n[x] : x}${a}) and (max-width:${(_ !== -1 && typeof n[c[_]] == "number" ? n[c[_]] : C) - o / 100}${a})`;
    }
    function g(x) {
      return c.indexOf(x) + 1 < c.length ? m(x, c[c.indexOf(x) + 1]) : d(x);
    }
    function b(x) {
      const C = c.indexOf(x);
      return C === 0
        ? d(c[1])
        : C === c.length - 1
          ? h(c[C])
          : m(x, c[c.indexOf(x) + 1]).replace("@media", "@media not all and");
    }
    return {
      keys: c,
      values: u,
      up: d,
      down: h,
      between: m,
      only: g,
      not: b,
      unit: a,
      ...s,
    };
  }
  function dO(e, n) {
    if (!e.containerQueries) return n;
    const a = Object.keys(n)
      .filter((o) => o.startsWith("@container"))
      .sort((o, s) => {
        var c, d;
        const u = /min-width:\s*([0-9.]+)/;
        return (
          +(((c = o.match(u)) == null ? void 0 : c[1]) || 0) -
          +(((d = s.match(u)) == null ? void 0 : d[1]) || 0)
        );
      });
    return a.length
      ? a.reduce(
          (o, s) => {
            const u = n[s];
            return (delete o[s], (o[s] = u), o);
          },
          { ...n },
        )
      : n;
  }
  function pO(e, n) {
    return (
      n === "@" ||
      (n.startsWith("@") &&
        (e.some((a) => n.startsWith(`@${a}`)) || !!n.match(/^@\d/)))
    );
  }
  function hO(e, n) {
    const a = n.match(/^@([^/]+)?\/?(.+)?$/);
    if (!a) return null;
    const [, o, s] = a,
      u = Number.isNaN(+o) ? o || 0 : +o;
    return e.containerQueries(s).up(u);
  }
  function mO(e) {
    const n = (u, c) =>
      u.replace("@media", c ? `@container ${c}` : "@container");
    function a(u, c) {
      ((u.up = (...d) => n(e.breakpoints.up(...d), c)),
        (u.down = (...d) => n(e.breakpoints.down(...d), c)),
        (u.between = (...d) => n(e.breakpoints.between(...d), c)),
        (u.only = (...d) => n(e.breakpoints.only(...d), c)),
        (u.not = (...d) => {
          const h = n(e.breakpoints.not(...d), c);
          return h.includes("not all and")
            ? h
                .replace("not all and ", "")
                .replace("min-width:", "width<")
                .replace("max-width:", "width>")
                .replace("and", "or")
            : h;
        }));
    }
    const o = {},
      s = (u) => (a(o, u), o);
    return (a(s), { ...e, containerQueries: s });
  }
  const gO = { borderRadius: 4 };
  function Bi(e, n) {
    return n ? Ut(e, n, { clone: !1 }) : e;
  }
  const Il = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
    Yb = {
      keys: ["xs", "sm", "md", "lg", "xl"],
      up: (e) => `@media (min-width:${Il[e]}px)`,
    },
    yO = {
      containerQueries: (e) => ({
        up: (n) => {
          let a = typeof n == "number" ? n : Il[n] || n;
          return (
            typeof a == "number" && (a = `${a}px`),
            e
              ? `@container ${e} (min-width:${a})`
              : `@container (min-width:${a})`
          );
        },
      }),
    };
  function Vn(e, n, a) {
    const o = e.theme || {};
    if (Array.isArray(n)) {
      const u = o.breakpoints || Yb;
      return n.reduce((c, d, h) => ((c[u.up(u.keys[h])] = a(n[h])), c), {});
    }
    if (typeof n == "object") {
      const u = o.breakpoints || Yb;
      return Object.keys(n).reduce((c, d) => {
        if (pO(u.keys, d)) {
          const h = hO(o.containerQueries ? o : yO, d);
          h && (c[h] = a(n[d], d));
        } else if (Object.keys(u.values || Il).includes(d)) {
          const h = u.up(d);
          c[h] = a(n[d], d);
        } else {
          const h = d;
          c[h] = n[h];
        }
        return c;
      }, {});
    }
    return a(n);
  }
  function Xb(e = {}) {
    var a;
    return (
      ((a = e.keys) == null
        ? void 0
        : a.reduce((o, s) => {
            const u = e.up(s);
            return ((o[u] = {}), o);
          }, {})) || {}
    );
  }
  function Wb(e, n) {
    return e.reduce((a, o) => {
      const s = a[o];
      return ((!s || Object.keys(s).length === 0) && delete a[o], a);
    }, n);
  }
  function bO(e, ...n) {
    const a = Xb(e),
      o = [a, ...n].reduce((s, u) => Ut(s, u), {});
    return Wb(Object.keys(a), o);
  }
  function vO(e, n) {
    if (typeof e != "object") return {};
    const a = {},
      o = Object.keys(n);
    return (
      Array.isArray(e)
        ? o.forEach((s, u) => {
            u < e.length && (a[s] = !0);
          })
        : o.forEach((s) => {
            e[s] != null && (a[s] = !0);
          }),
      a
    );
  }
  function ud({ values: e, breakpoints: n, base: a }) {
    const o = a || vO(e, n),
      s = Object.keys(o);
    if (s.length === 0) return e;
    let u;
    return s.reduce(
      (c, d, h) => (
        Array.isArray(e)
          ? ((c[d] = e[h] != null ? e[h] : e[u]), (u = h))
          : typeof e == "object"
            ? ((c[d] = e[d] != null ? e[d] : e[u]), (u = d))
            : (c[d] = e),
        c
      ),
      {},
    );
  }
  function _e(e) {
    if (typeof e != "string") throw new Error(vr(7));
    return e.charAt(0).toUpperCase() + e.slice(1);
  }
  function Hl(e, n, a = !0) {
    if (!n || typeof n != "string") return null;
    if (e && e.vars && a) {
      const o = `vars.${n}`
        .split(".")
        .reduce((s, u) => (s && s[u] ? s[u] : null), e);
      if (o != null) return o;
    }
    return n.split(".").reduce((o, s) => (o && o[s] != null ? o[s] : null), e);
  }
  function Pl(e, n, a, o = a) {
    let s;
    return (
      typeof e == "function"
        ? (s = e(a))
        : Array.isArray(e)
          ? (s = e[a] || o)
          : (s = Hl(e, a) || o),
      n && (s = n(s, o, e)),
      s
    );
  }
  function wt(e) {
    const { prop: n, cssProperty: a = e.prop, themeKey: o, transform: s } = e,
      u = (c) => {
        if (c[n] == null) return null;
        const d = c[n],
          h = c.theme,
          m = Hl(h, o) || {};
        return Vn(c, d, (b) => {
          let x = Pl(m, s, b);
          return (
            b === x &&
              typeof b == "string" &&
              (x = Pl(m, s, `${n}${b === "default" ? "" : _e(b)}`, b)),
            a === !1 ? x : { [a]: x }
          );
        });
      };
    return ((u.propTypes = {}), (u.filterProps = [n]), u);
  }
  function SO(e) {
    const n = {};
    return (a) => (n[a] === void 0 && (n[a] = e(a)), n[a]);
  }
  const EO = { m: "margin", p: "padding" },
    _O = {
      t: "Top",
      r: "Right",
      b: "Bottom",
      l: "Left",
      x: ["Left", "Right"],
      y: ["Top", "Bottom"],
    },
    Qb = { marginX: "mx", marginY: "my", paddingX: "px", paddingY: "py" },
    TO = SO((e) => {
      if (e.length > 2)
        if (Qb[e]) e = Qb[e];
        else return [e];
      const [n, a] = e.split(""),
        o = EO[n],
        s = _O[a] || "";
      return Array.isArray(s) ? s.map((u) => o + u) : [o + s];
    }),
    cd = [
      "m",
      "mt",
      "mr",
      "mb",
      "ml",
      "mx",
      "my",
      "margin",
      "marginTop",
      "marginRight",
      "marginBottom",
      "marginLeft",
      "marginX",
      "marginY",
      "marginInline",
      "marginInlineStart",
      "marginInlineEnd",
      "marginBlock",
      "marginBlockStart",
      "marginBlockEnd",
    ],
    fd = [
      "p",
      "pt",
      "pr",
      "pb",
      "pl",
      "px",
      "py",
      "padding",
      "paddingTop",
      "paddingRight",
      "paddingBottom",
      "paddingLeft",
      "paddingX",
      "paddingY",
      "paddingInline",
      "paddingInlineStart",
      "paddingInlineEnd",
      "paddingBlock",
      "paddingBlockStart",
      "paddingBlockEnd",
    ];
  [...cd, ...fd];
  function Li(e, n, a, o) {
    const s = Hl(e, n, !0) ?? a;
    return typeof s == "number" || typeof s == "string"
      ? (u) =>
          typeof u == "string"
            ? u
            : typeof s == "string"
              ? s.startsWith("var(") && u === 0
                ? 0
                : s.startsWith("var(") && u === 1
                  ? s
                  : `calc(${u} * ${s})`
              : s * u
      : Array.isArray(s)
        ? (u) => {
            if (typeof u == "string") return u;
            const c = Math.abs(u),
              d = s[c];
            return u >= 0
              ? d
              : typeof d == "number"
                ? -d
                : typeof d == "string" && d.startsWith("var(")
                  ? `calc(-1 * ${d})`
                  : `-${d}`;
          }
        : typeof s == "function"
          ? s
          : () => {};
  }
  function ql(e) {
    return Li(e, "spacing", 8);
  }
  function Ma(e, n) {
    return typeof n == "string" || n == null ? n : e(n);
  }
  function xO(e, n) {
    return (a) => e.reduce((o, s) => ((o[s] = Ma(n, a)), o), {});
  }
  function CO(e, n, a, o) {
    if (!n.includes(a)) return null;
    const s = TO(a),
      u = xO(s, o),
      c = e[a];
    return Vn(e, c, u);
  }
  function Zb(e, n) {
    const a = ql(e.theme);
    return Object.keys(e)
      .map((o) => CO(e, n, o, a))
      .reduce(Bi, {});
  }
  function St(e) {
    return Zb(e, cd);
  }
  ((St.propTypes = {}), (St.filterProps = cd));
  function Et(e) {
    return Zb(e, fd);
  }
  ((Et.propTypes = {}), (Et.filterProps = fd));
  function Jb(e = 8, n = ql({ spacing: e })) {
    if (e.mui) return e;
    const a = (...o) =>
      (o.length === 0 ? [1] : o)
        .map((u) => {
          const c = n(u);
          return typeof c == "number" ? `${c}px` : c;
        })
        .join(" ");
    return ((a.mui = !0), a);
  }
  function Fl(...e) {
    const n = e.reduce(
        (o, s) => (
          s.filterProps.forEach((u) => {
            o[u] = s;
          }),
          o
        ),
        {},
      ),
      a = (o) =>
        Object.keys(o).reduce((s, u) => (n[u] ? Bi(s, n[u](o)) : s), {});
    return (
      (a.propTypes = {}),
      (a.filterProps = e.reduce((o, s) => o.concat(s.filterProps), [])),
      a
    );
  }
  function Dn(e) {
    return typeof e != "number" ? e : `${e}px solid`;
  }
  function Nn(e, n) {
    return wt({ prop: e, themeKey: "borders", transform: n });
  }
  const wO = Nn("border", Dn),
    RO = Nn("borderTop", Dn),
    AO = Nn("borderRight", Dn),
    OO = Nn("borderBottom", Dn),
    MO = Nn("borderLeft", Dn),
    DO = Nn("borderColor"),
    NO = Nn("borderTopColor"),
    kO = Nn("borderRightColor"),
    zO = Nn("borderBottomColor"),
    BO = Nn("borderLeftColor"),
    LO = Nn("outline", Dn),
    UO = Nn("outlineColor"),
    Gl = (e) => {
      if (e.borderRadius !== void 0 && e.borderRadius !== null) {
        const n = Li(e.theme, "shape.borderRadius", 4),
          a = (o) => ({ borderRadius: Ma(n, o) });
        return Vn(e, e.borderRadius, a);
      }
      return null;
    };
  ((Gl.propTypes = {}),
    (Gl.filterProps = ["borderRadius"]),
    Fl(wO, RO, AO, OO, MO, DO, NO, kO, zO, BO, Gl, LO, UO));
  const Vl = (e) => {
    if (e.gap !== void 0 && e.gap !== null) {
      const n = Li(e.theme, "spacing", 8),
        a = (o) => ({ gap: Ma(n, o) });
      return Vn(e, e.gap, a);
    }
    return null;
  };
  ((Vl.propTypes = {}), (Vl.filterProps = ["gap"]));
  const Kl = (e) => {
    if (e.columnGap !== void 0 && e.columnGap !== null) {
      const n = Li(e.theme, "spacing", 8),
        a = (o) => ({ columnGap: Ma(n, o) });
      return Vn(e, e.columnGap, a);
    }
    return null;
  };
  ((Kl.propTypes = {}), (Kl.filterProps = ["columnGap"]));
  const Yl = (e) => {
    if (e.rowGap !== void 0 && e.rowGap !== null) {
      const n = Li(e.theme, "spacing", 8),
        a = (o) => ({ rowGap: Ma(n, o) });
      return Vn(e, e.rowGap, a);
    }
    return null;
  };
  ((Yl.propTypes = {}), (Yl.filterProps = ["rowGap"]));
  const jO = wt({ prop: "gridColumn" }),
    $O = wt({ prop: "gridRow" }),
    IO = wt({ prop: "gridAutoFlow" }),
    HO = wt({ prop: "gridAutoColumns" }),
    PO = wt({ prop: "gridAutoRows" }),
    qO = wt({ prop: "gridTemplateColumns" }),
    FO = wt({ prop: "gridTemplateRows" }),
    GO = wt({ prop: "gridTemplateAreas" }),
    VO = wt({ prop: "gridArea" });
  Fl(Vl, Kl, Yl, jO, $O, IO, HO, PO, qO, FO, GO, VO);
  function Eo(e, n) {
    return n === "grey" ? n : e;
  }
  const KO = wt({ prop: "color", themeKey: "palette", transform: Eo }),
    YO = wt({
      prop: "bgcolor",
      cssProperty: "backgroundColor",
      themeKey: "palette",
      transform: Eo,
    }),
    XO = wt({ prop: "backgroundColor", themeKey: "palette", transform: Eo });
  Fl(KO, YO, XO);
  function vn(e) {
    return e <= 1 && e !== 0 ? `${e * 100}%` : e;
  }
  const WO = wt({ prop: "width", transform: vn }),
    dd = (e) => {
      if (e.maxWidth !== void 0 && e.maxWidth !== null) {
        const n = (a) => {
          var s, u, c, d, h;
          const o =
            ((c =
              (u = (s = e.theme) == null ? void 0 : s.breakpoints) == null
                ? void 0
                : u.values) == null
              ? void 0
              : c[a]) || Il[a];
          return o
            ? ((h = (d = e.theme) == null ? void 0 : d.breakpoints) == null
                ? void 0
                : h.unit) !== "px"
              ? { maxWidth: `${o}${e.theme.breakpoints.unit}` }
              : { maxWidth: o }
            : { maxWidth: vn(a) };
        };
        return Vn(e, e.maxWidth, n);
      }
      return null;
    };
  dd.filterProps = ["maxWidth"];
  const QO = wt({ prop: "minWidth", transform: vn }),
    ZO = wt({ prop: "height", transform: vn }),
    JO = wt({ prop: "maxHeight", transform: vn }),
    eM = wt({ prop: "minHeight", transform: vn });
  (wt({ prop: "size", cssProperty: "width", transform: vn }),
    wt({ prop: "size", cssProperty: "height", transform: vn }));
  const tM = wt({ prop: "boxSizing" });
  Fl(WO, dd, QO, ZO, JO, eM, tM);
  const Ui = {
    border: { themeKey: "borders", transform: Dn },
    borderTop: { themeKey: "borders", transform: Dn },
    borderRight: { themeKey: "borders", transform: Dn },
    borderBottom: { themeKey: "borders", transform: Dn },
    borderLeft: { themeKey: "borders", transform: Dn },
    borderColor: { themeKey: "palette" },
    borderTopColor: { themeKey: "palette" },
    borderRightColor: { themeKey: "palette" },
    borderBottomColor: { themeKey: "palette" },
    borderLeftColor: { themeKey: "palette" },
    outline: { themeKey: "borders", transform: Dn },
    outlineColor: { themeKey: "palette" },
    borderRadius: { themeKey: "shape.borderRadius", style: Gl },
    color: { themeKey: "palette", transform: Eo },
    bgcolor: {
      themeKey: "palette",
      cssProperty: "backgroundColor",
      transform: Eo,
    },
    backgroundColor: { themeKey: "palette", transform: Eo },
    p: { style: Et },
    pt: { style: Et },
    pr: { style: Et },
    pb: { style: Et },
    pl: { style: Et },
    px: { style: Et },
    py: { style: Et },
    padding: { style: Et },
    paddingTop: { style: Et },
    paddingRight: { style: Et },
    paddingBottom: { style: Et },
    paddingLeft: { style: Et },
    paddingX: { style: Et },
    paddingY: { style: Et },
    paddingInline: { style: Et },
    paddingInlineStart: { style: Et },
    paddingInlineEnd: { style: Et },
    paddingBlock: { style: Et },
    paddingBlockStart: { style: Et },
    paddingBlockEnd: { style: Et },
    m: { style: St },
    mt: { style: St },
    mr: { style: St },
    mb: { style: St },
    ml: { style: St },
    mx: { style: St },
    my: { style: St },
    margin: { style: St },
    marginTop: { style: St },
    marginRight: { style: St },
    marginBottom: { style: St },
    marginLeft: { style: St },
    marginX: { style: St },
    marginY: { style: St },
    marginInline: { style: St },
    marginInlineStart: { style: St },
    marginInlineEnd: { style: St },
    marginBlock: { style: St },
    marginBlockStart: { style: St },
    marginBlockEnd: { style: St },
    displayPrint: {
      cssProperty: !1,
      transform: (e) => ({ "@media print": { display: e } }),
    },
    display: {},
    overflow: {},
    textOverflow: {},
    visibility: {},
    whiteSpace: {},
    flexBasis: {},
    flexDirection: {},
    flexWrap: {},
    justifyContent: {},
    alignItems: {},
    alignContent: {},
    order: {},
    flex: {},
    flexGrow: {},
    flexShrink: {},
    alignSelf: {},
    justifyItems: {},
    justifySelf: {},
    gap: { style: Vl },
    rowGap: { style: Yl },
    columnGap: { style: Kl },
    gridColumn: {},
    gridRow: {},
    gridAutoFlow: {},
    gridAutoColumns: {},
    gridAutoRows: {},
    gridTemplateColumns: {},
    gridTemplateRows: {},
    gridTemplateAreas: {},
    gridArea: {},
    position: {},
    zIndex: { themeKey: "zIndex" },
    top: {},
    right: {},
    bottom: {},
    left: {},
    boxShadow: { themeKey: "shadows" },
    width: { transform: vn },
    maxWidth: { style: dd },
    minWidth: { transform: vn },
    height: { transform: vn },
    maxHeight: { transform: vn },
    minHeight: { transform: vn },
    boxSizing: {},
    font: { themeKey: "font" },
    fontFamily: { themeKey: "typography" },
    fontSize: { themeKey: "typography" },
    fontStyle: { themeKey: "typography" },
    fontWeight: { themeKey: "typography" },
    letterSpacing: {},
    textTransform: {},
    lineHeight: {},
    textAlign: {},
    typography: { cssProperty: !1, themeKey: "typography" },
  };
  function nM(...e) {
    const n = e.reduce((o, s) => o.concat(Object.keys(s)), []),
      a = new Set(n);
    return e.every((o) => a.size === Object.keys(o).length);
  }
  function rM(e, n) {
    return typeof e == "function" ? e(n) : e;
  }
  function aM() {
    function e(a, o, s, u) {
      const c = { [a]: o, theme: s },
        d = u[a];
      if (!d) return { [a]: o };
      const { cssProperty: h = a, themeKey: m, transform: g, style: b } = d;
      if (o == null) return null;
      if (m === "typography" && o === "inherit") return { [a]: o };
      const x = Hl(s, m) || {};
      return b
        ? b(c)
        : Vn(c, o, (_) => {
            let v = Pl(x, g, _);
            return (
              _ === v &&
                typeof _ == "string" &&
                (v = Pl(x, g, `${a}${_ === "default" ? "" : _e(_)}`, _)),
              h === !1 ? v : { [h]: v }
            );
          });
    }
    function n(a) {
      const { sx: o, theme: s = {} } = a || {};
      if (!o) return null;
      const u = s.unstable_sxConfig ?? Ui;
      function c(d) {
        let h = d;
        if (typeof d == "function") h = d(s);
        else if (typeof d != "object") return d;
        if (!h) return null;
        const m = Xb(s.breakpoints),
          g = Object.keys(m);
        let b = m;
        return (
          Object.keys(h).forEach((x) => {
            const C = rM(h[x], s);
            if (C != null)
              if (typeof C == "object")
                if (u[x]) b = Bi(b, e(x, C, s, u));
                else {
                  const _ = Vn({ theme: s }, C, (v) => ({ [x]: v }));
                  nM(_, C) ? (b[x] = n({ sx: C, theme: s })) : (b = Bi(b, _));
                }
              else b = Bi(b, e(x, C, s, u));
          }),
          dO(s, Wb(g, b))
        );
      }
      return Array.isArray(o) ? o.map(c) : c(o);
    }
    return n;
  }
  const Da = aM();
  Da.filterProps = ["sx"];
  function oM(e, n) {
    var o;
    const a = this;
    if (a.vars) {
      if (
        !((o = a.colorSchemes) != null && o[e]) ||
        typeof a.getColorSchemeSelector != "function"
      )
        return {};
      let s = a.getColorSchemeSelector(e);
      return s === "&"
        ? n
        : ((s.includes("data-") || s.includes(".")) &&
            (s = `*:where(${s.replace(/\s*&$/, "")}) &`),
          { [s]: n });
    }
    return a.palette.mode === e ? n : {};
  }
  function Xl(e = {}, ...n) {
    const {
        breakpoints: a = {},
        palette: o = {},
        spacing: s,
        shape: u = {},
        ...c
      } = e,
      d = fO(a),
      h = Jb(s);
    let m = Ut(
      {
        breakpoints: d,
        direction: "ltr",
        components: {},
        palette: { mode: "light", ...o },
        spacing: h,
        shape: { ...gO, ...u },
      },
      c,
    );
    return (
      (m = mO(m)),
      (m.applyStyles = oM),
      (m = n.reduce((g, b) => Ut(g, b), m)),
      (m.unstable_sxConfig = {
        ...Ui,
        ...(c == null ? void 0 : c.unstable_sxConfig),
      }),
      (m.unstable_sx = function (b) {
        return Da({ sx: b, theme: this });
      }),
      m
    );
  }
  function iM(e) {
    return Object.keys(e).length === 0;
  }
  function e0(e = null) {
    const n = O.useContext(ki);
    return !n || iM(n) ? e : n;
  }
  const sM = Xl();
  function pd(e = sM) {
    return e0(e);
  }
  function lM({ styles: e, themeId: n, defaultTheme: a = {} }) {
    const o = pd(a),
      s = typeof e == "function" ? e((n && o[n]) || o) : e;
    return P.jsx(Hb, { styles: s });
  }
  const uM = (e) => {
    var o;
    const n = { systemProps: {}, otherProps: {} },
      a =
        ((o = e == null ? void 0 : e.theme) == null
          ? void 0
          : o.unstable_sxConfig) ?? Ui;
    return (
      Object.keys(e).forEach((s) => {
        a[s] ? (n.systemProps[s] = e[s]) : (n.otherProps[s] = e[s]);
      }),
      n
    );
  };
  function t0(e) {
    const { sx: n, ...a } = e,
      { systemProps: o, otherProps: s } = uM(a);
    let u;
    return (
      Array.isArray(n)
        ? (u = [o, ...n])
        : typeof n == "function"
          ? (u = (...c) => {
              const d = n(...c);
              return ir(d) ? { ...o, ...d } : o;
            })
          : (u = { ...o, ...n }),
      { ...s, sx: u }
    );
  }
  const n0 = (e) => e,
    cM = (() => {
      let e = n0;
      return {
        configure(n) {
          e = n;
        },
        generate(n) {
          return e(n);
        },
        reset() {
          e = n0;
        },
      };
    })();
  function r0(e) {
    var n,
      a,
      o = "";
    if (typeof e == "string" || typeof e == "number") o += e;
    else if (typeof e == "object")
      if (Array.isArray(e)) {
        var s = e.length;
        for (n = 0; n < s; n++)
          e[n] && (a = r0(e[n])) && (o && (o += " "), (o += a));
      } else for (a in e) e[a] && (o && (o += " "), (o += a));
    return o;
  }
  function Te() {
    for (var e, n, a = 0, o = "", s = arguments.length; a < s; a++)
      (e = arguments[a]) && (n = r0(e)) && (o && (o += " "), (o += n));
    return o;
  }
  const fM = {
    active: "active",
    checked: "checked",
    completed: "completed",
    disabled: "disabled",
    error: "error",
    expanded: "expanded",
    focused: "focused",
    focusVisible: "focusVisible",
    open: "open",
    readOnly: "readOnly",
    required: "required",
    selected: "selected",
  };
  function Ve(e, n, a = "Mui") {
    const o = fM[n];
    return o ? `${a}-${o}` : `${cM.generate(e)}-${n}`;
  }
  function et(e, n, a = "Mui") {
    const o = {};
    return (
      n.forEach((s) => {
        o[s] = Ve(e, s, a);
      }),
      o
    );
  }
  function a0(e) {
    const { variants: n, ...a } = e,
      o = { variants: n, style: qb(a), isProcessed: !0 };
    return (
      o.style === a ||
        (n &&
          n.forEach((s) => {
            typeof s.style != "function" && (s.style = qb(s.style));
          })),
      o
    );
  }
  const dM = Xl();
  function hd(e) {
    return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
  }
  function pM(e) {
    return e ? (n, a) => a[e] : null;
  }
  function hM(e, n, a) {
    e.theme = gM(e.theme) ? a : e.theme[n] || e.theme;
  }
  function Wl(e, n) {
    const a = typeof n == "function" ? n(e) : n;
    if (Array.isArray(a)) return a.flatMap((o) => Wl(e, o));
    if (Array.isArray(a == null ? void 0 : a.variants)) {
      let o;
      if (a.isProcessed) o = a.style;
      else {
        const { variants: s, ...u } = a;
        o = u;
      }
      return o0(e, a.variants, [o]);
    }
    return a != null && a.isProcessed ? a.style : a;
  }
  function o0(e, n, a = []) {
    var s;
    let o;
    e: for (let u = 0; u < n.length; u += 1) {
      const c = n[u];
      if (typeof c.props == "function") {
        if (
          (o ?? (o = { ...e, ...e.ownerState, ownerState: e.ownerState }),
          !c.props(o))
        )
          continue;
      } else
        for (const d in c.props)
          if (
            e[d] !== c.props[d] &&
            ((s = e.ownerState) == null ? void 0 : s[d]) !== c.props[d]
          )
            continue e;
      typeof c.style == "function"
        ? (o ?? (o = { ...e, ...e.ownerState, ownerState: e.ownerState }),
          a.push(c.style(o)))
        : a.push(c.style);
    }
    return a;
  }
  function i0(e = {}) {
    const {
      themeId: n,
      defaultTheme: a = dM,
      rootShouldForwardProp: o = hd,
      slotShouldForwardProp: s = hd,
    } = e;
    function u(d) {
      hM(d, n, a);
    }
    return (d, h = {}) => {
      sO(d, (A) => A.filter((L) => L !== Da));
      const {
          name: m,
          slot: g,
          skipVariantsResolver: b,
          skipSx: x,
          overridesResolver: C = pM(bM(g)),
          ..._
        } = h,
        v = b !== void 0 ? b : (g && g !== "Root" && g !== "root") || !1,
        E = x || !1;
      let w = hd;
      g === "Root" || g === "root"
        ? (w = o)
        : g
          ? (w = s)
          : yM(d) && (w = void 0);
      const D = iO(d, { shouldForwardProp: w, label: mM(), ..._ }),
        R = (A) => {
          if (typeof A == "function" && A.__emotion_real !== A)
            return function (G) {
              return Wl(G, A);
            };
          if (ir(A)) {
            const L = a0(A);
            return L.variants
              ? function (q) {
                  return Wl(q, L);
                }
              : L.style;
          }
          return A;
        },
        M = (...A) => {
          const L = [],
            G = A.map(R),
            q = [];
          if (
            (L.push(u),
            m &&
              C &&
              q.push(function (X) {
                var z, Y;
                const se =
                  (Y = (z = X.theme.components) == null ? void 0 : z[m]) == null
                    ? void 0
                    : Y.styleOverrides;
                if (!se) return null;
                const J = {};
                for (const ie in se) J[ie] = Wl(X, se[ie]);
                return C(X, J);
              }),
            m &&
              !v &&
              q.push(function (X) {
                var J, z;
                const oe = X.theme,
                  se =
                    (z =
                      (J = oe == null ? void 0 : oe.components) == null
                        ? void 0
                        : J[m]) == null
                      ? void 0
                      : z.variants;
                return se ? o0(X, se) : null;
              }),
            E || q.push(Da),
            Array.isArray(G[0]))
          ) {
            const I = G.shift(),
              X = new Array(L.length).fill(""),
              oe = new Array(q.length).fill("");
            let se;
            ((se = [...X, ...I, ...oe]),
              (se.raw = [...X, ...I.raw, ...oe]),
              L.unshift(se));
          }
          const W = [...L, ...G, ...q],
            S = D(...W);
          return (d.muiName && (S.muiName = d.muiName), S);
        };
      return (D.withConfig && (M.withConfig = D.withConfig), M);
    };
  }
  function mM(e, n) {
    return void 0;
  }
  function gM(e) {
    for (const n in e) return !1;
    return !0;
  }
  function yM(e) {
    return typeof e == "string" && e.charCodeAt(0) > 96;
  }
  function bM(e) {
    return e && e.charAt(0).toLowerCase() + e.slice(1);
  }
  const vM = i0();
  function ji(e, n) {
    const a = { ...n };
    for (const o in e)
      if (Object.prototype.hasOwnProperty.call(e, o)) {
        const s = o;
        if (s === "components" || s === "slots") a[s] = { ...e[s], ...a[s] };
        else if (s === "componentsProps" || s === "slotProps") {
          const u = e[s],
            c = n[s];
          if (!c) a[s] = u || {};
          else if (!u) a[s] = c;
          else {
            a[s] = { ...c };
            for (const d in u)
              if (Object.prototype.hasOwnProperty.call(u, d)) {
                const h = d;
                a[s][h] = ji(u[h], c[h]);
              }
          }
        } else a[s] === void 0 && (a[s] = e[s]);
      }
    return a;
  }
  function SM(e) {
    const { theme: n, name: a, props: o } = e;
    return !n ||
      !n.components ||
      !n.components[a] ||
      !n.components[a].defaultProps
      ? o
      : ji(n.components[a].defaultProps, o);
  }
  function EM({ props: e, name: n, defaultTheme: a, themeId: o }) {
    let s = pd(a);
    return (o && (s = s[o] || s), SM({ theme: s, name: n, props: e }));
  }
  const qr = typeof window < "u" ? O.useLayoutEffect : O.useEffect;
  function _M(e, n = Number.MIN_SAFE_INTEGER, a = Number.MAX_SAFE_INTEGER) {
    return Math.max(n, Math.min(e, a));
  }
  function md(e, n = 0, a = 1) {
    return _M(e, n, a);
  }
  function TM(e) {
    e = e.slice(1);
    const n = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
    let a = e.match(n);
    return (
      a && a[0].length === 1 && (a = a.map((o) => o + o)),
      a
        ? `rgb${a.length === 4 ? "a" : ""}(${a.map((o, s) => (s < 3 ? parseInt(o, 16) : Math.round((parseInt(o, 16) / 255) * 1e3) / 1e3)).join(", ")})`
        : ""
    );
  }
  function Fr(e) {
    if (e.type) return e;
    if (e.charAt(0) === "#") return Fr(TM(e));
    const n = e.indexOf("("),
      a = e.substring(0, n);
    if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(a))
      throw new Error(vr(9, e));
    let o = e.substring(n + 1, e.length - 1),
      s;
    if (a === "color") {
      if (
        ((o = o.split(" ")),
        (s = o.shift()),
        o.length === 4 && o[3].charAt(0) === "/" && (o[3] = o[3].slice(1)),
        !["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].includes(
          s,
        ))
      )
        throw new Error(vr(10, s));
    } else o = o.split(",");
    return (
      (o = o.map((u) => parseFloat(u))),
      { type: a, values: o, colorSpace: s }
    );
  }
  const xM = (e) => {
      const n = Fr(e);
      return n.values
        .slice(0, 3)
        .map((a, o) => (n.type.includes("hsl") && o !== 0 ? `${a}%` : a))
        .join(" ");
    },
    $i = (e, n) => {
      try {
        return xM(e);
      } catch {
        return e;
      }
    };
  function Ql(e) {
    const { type: n, colorSpace: a } = e;
    let { values: o } = e;
    return (
      n.includes("rgb")
        ? (o = o.map((s, u) => (u < 3 ? parseInt(s, 10) : s)))
        : n.includes("hsl") && ((o[1] = `${o[1]}%`), (o[2] = `${o[2]}%`)),
      n.includes("color")
        ? (o = `${a} ${o.join(" ")}`)
        : (o = `${o.join(", ")}`),
      `${n}(${o})`
    );
  }
  function s0(e) {
    e = Fr(e);
    const { values: n } = e,
      a = n[0],
      o = n[1] / 100,
      s = n[2] / 100,
      u = o * Math.min(s, 1 - s),
      c = (m, g = (m + a / 30) % 12) =>
        s - u * Math.max(Math.min(g - 3, 9 - g, 1), -1);
    let d = "rgb";
    const h = [
      Math.round(c(0) * 255),
      Math.round(c(8) * 255),
      Math.round(c(4) * 255),
    ];
    return (
      e.type === "hsla" && ((d += "a"), h.push(n[3])),
      Ql({ type: d, values: h })
    );
  }
  function gd(e) {
    e = Fr(e);
    let n = e.type === "hsl" || e.type === "hsla" ? Fr(s0(e)).values : e.values;
    return (
      (n = n.map(
        (a) => (
          e.type !== "color" && (a /= 255),
          a <= 0.03928 ? a / 12.92 : ((a + 0.055) / 1.055) ** 2.4
        ),
      )),
      Number((0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2]).toFixed(3))
    );
  }
  function CM(e, n) {
    const a = gd(e),
      o = gd(n);
    return (Math.max(a, o) + 0.05) / (Math.min(a, o) + 0.05);
  }
  function Gr(e, n) {
    return (
      (e = Fr(e)),
      (n = md(n)),
      (e.type === "rgb" || e.type === "hsl") && (e.type += "a"),
      e.type === "color" ? (e.values[3] = `/${n}`) : (e.values[3] = n),
      Ql(e)
    );
  }
  function Zl(e, n, a) {
    try {
      return Gr(e, n);
    } catch {
      return e;
    }
  }
  function yd(e, n) {
    if (((e = Fr(e)), (n = md(n)), e.type.includes("hsl")))
      e.values[2] *= 1 - n;
    else if (e.type.includes("rgb") || e.type.includes("color"))
      for (let a = 0; a < 3; a += 1) e.values[a] *= 1 - n;
    return Ql(e);
  }
  function ot(e, n, a) {
    try {
      return yd(e, n);
    } catch {
      return e;
    }
  }
  function bd(e, n) {
    if (((e = Fr(e)), (n = md(n)), e.type.includes("hsl")))
      e.values[2] += (100 - e.values[2]) * n;
    else if (e.type.includes("rgb"))
      for (let a = 0; a < 3; a += 1) e.values[a] += (255 - e.values[a]) * n;
    else if (e.type.includes("color"))
      for (let a = 0; a < 3; a += 1) e.values[a] += (1 - e.values[a]) * n;
    return Ql(e);
  }
  function it(e, n, a) {
    try {
      return bd(e, n);
    } catch {
      return e;
    }
  }
  function wM(e, n = 0.15) {
    return gd(e) > 0.5 ? yd(e, n) : bd(e, n);
  }
  function Jl(e, n, a) {
    try {
      return wM(e, n);
    } catch {
      return e;
    }
  }
  const l0 = O.createContext(null);
  function vd() {
    return O.useContext(l0);
  }
  const RM =
    typeof Symbol == "function" && Symbol.for
      ? Symbol.for("mui.nested")
      : "__THEME_NESTED__";
  function AM(e, n) {
    return typeof n == "function" ? n(e) : { ...e, ...n };
  }
  function OM(e) {
    const { children: n, theme: a } = e,
      o = vd(),
      s = O.useMemo(() => {
        const u = o === null ? { ...a } : AM(o, a);
        return (u != null && (u[RM] = o !== null), u);
      }, [a, o]);
    return P.jsx(l0.Provider, { value: s, children: n });
  }
  const u0 = O.createContext();
  function MM({ value: e, ...n }) {
    return P.jsx(u0.Provider, { value: e ?? !0, ...n });
  }
  const DM = () => O.useContext(u0) ?? !1,
    c0 = O.createContext(void 0);
  function NM({ value: e, children: n }) {
    return P.jsx(c0.Provider, { value: e, children: n });
  }
  function kM(e) {
    const { theme: n, name: a, props: o } = e;
    if (!n || !n.components || !n.components[a]) return o;
    const s = n.components[a];
    return s.defaultProps
      ? ji(s.defaultProps, o)
      : !s.styleOverrides && !s.variants
        ? ji(s, o)
        : o;
  }
  function zM({ props: e, name: n }) {
    const a = O.useContext(c0);
    return kM({ props: e, name: n, theme: { components: a } });
  }
  const f0 = {};
  function d0(e, n, a, o = !1) {
    return O.useMemo(() => {
      const s = (e && n[e]) || n;
      if (typeof a == "function") {
        const u = a(s),
          c = e ? { ...n, [e]: u } : u;
        return o ? () => c : c;
      }
      return e ? { ...n, [e]: a } : { ...n, ...a };
    }, [e, n, a, o]);
  }
  function p0(e) {
    const { children: n, theme: a, themeId: o } = e,
      s = e0(f0),
      u = vd() || f0,
      c = d0(o, s, a),
      d = d0(o, u, a, !0),
      h = (o ? c[o] : c).direction === "rtl";
    return P.jsx(OM, {
      theme: d,
      children: P.jsx(ki.Provider, {
        value: c,
        children: P.jsx(MM, {
          value: h,
          children: P.jsx(NM, {
            value: o ? c[o].components : c.components,
            children: n,
          }),
        }),
      }),
    });
  }
  const h0 = { theme: void 0 };
  function BM(e) {
    let n, a;
    return function (s) {
      let u = n;
      return (
        (u === void 0 || s.theme !== a) &&
          ((h0.theme = s.theme), (u = a0(e(h0))), (n = u), (a = s.theme)),
        u
      );
    };
  }
  const Sd = "mode",
    Ed = "color-scheme",
    LM = "data-color-scheme";
  function UM(e) {
    const {
      defaultMode: n = "system",
      defaultLightColorScheme: a = "light",
      defaultDarkColorScheme: o = "dark",
      modeStorageKey: s = Sd,
      colorSchemeStorageKey: u = Ed,
      attribute: c = LM,
      colorSchemeNode: d = "document.documentElement",
      nonce: h,
    } = e || {};
    let m = "",
      g = c;
    if (
      (c === "class" && (g = ".%s"),
      c === "data" && (g = "[data-%s]"),
      g.startsWith("."))
    ) {
      const x = g.substring(1);
      m += `${d}.classList.remove('${x}'.replace('%s', light), '${x}'.replace('%s', dark));
      ${d}.classList.add('${x}'.replace('%s', colorScheme));`;
    }
    const b = g.match(/\[([^\]]+)\]/);
    if (b) {
      const [x, C] = b[1].split("=");
      (C ||
        (m += `${d}.removeAttribute('${x}'.replace('%s', light));
      ${d}.removeAttribute('${x}'.replace('%s', dark));`),
        (m += `
      ${d}.setAttribute('${x}'.replace('%s', colorScheme), ${C ? `${C}.replace('%s', colorScheme)` : '""'});`));
    } else m += `${d}.setAttribute('${g}', colorScheme);`;
    return P.jsx(
      "script",
      {
        suppressHydrationWarning: !0,
        nonce: typeof window > "u" ? h : "",
        dangerouslySetInnerHTML: {
          __html: `(function() {
try {
  let colorScheme = '';
  const mode = localStorage.getItem('${s}') || '${n}';
  const dark = localStorage.getItem('${u}-dark') || '${o}';
  const light = localStorage.getItem('${u}-light') || '${a}';
  if (mode === 'system') {
    // handle system mode
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      colorScheme = dark
    } else {
      colorScheme = light
    }
  }
  if (mode === 'light') {
    colorScheme = light;
  }
  if (mode === 'dark') {
    colorScheme = dark;
  }
  if (colorScheme) {
    ${m}
  }
} catch(e){}})();`,
        },
      },
      "mui-color-scheme-init",
    );
  }
  function jM() {}
  const $M = ({ key: e, storageWindow: n }) => (
    !n && typeof window < "u" && (n = window),
    {
      get(a) {
        if (typeof window > "u") return;
        if (!n) return a;
        let o;
        try {
          o = n.localStorage.getItem(e);
        } catch {}
        return o || a;
      },
      set: (a) => {
        if (n)
          try {
            n.localStorage.setItem(e, a);
          } catch {}
      },
      subscribe: (a) => {
        if (!n) return jM;
        const o = (s) => {
          const u = s.newValue;
          s.key === e && a(u);
        };
        return (
          n.addEventListener("storage", o),
          () => {
            n.removeEventListener("storage", o);
          }
        );
      },
    }
  );
  function _d() {}
  function m0(e) {
    if (
      typeof window < "u" &&
      typeof window.matchMedia == "function" &&
      e === "system"
    )
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  }
  function g0(e, n) {
    if (e.mode === "light" || (e.mode === "system" && e.systemMode === "light"))
      return n("light");
    if (e.mode === "dark" || (e.mode === "system" && e.systemMode === "dark"))
      return n("dark");
  }
  function IM(e) {
    return g0(e, (n) => {
      if (n === "light") return e.lightColorScheme;
      if (n === "dark") return e.darkColorScheme;
    });
  }
  function HM(e) {
    const {
        defaultMode: n = "light",
        defaultLightColorScheme: a,
        defaultDarkColorScheme: o,
        supportedColorSchemes: s = [],
        modeStorageKey: u = Sd,
        colorSchemeStorageKey: c = Ed,
        storageWindow: d = typeof window > "u" ? void 0 : window,
        storageManager: h = $M,
        noSsr: m = !1,
      } = e,
      g = s.join(","),
      b = s.length > 1,
      x = O.useMemo(
        () => (h == null ? void 0 : h({ key: u, storageWindow: d })),
        [h, u, d],
      ),
      C = O.useMemo(
        () => (h == null ? void 0 : h({ key: `${c}-light`, storageWindow: d })),
        [h, c, d],
      ),
      _ = O.useMemo(
        () => (h == null ? void 0 : h({ key: `${c}-dark`, storageWindow: d })),
        [h, c, d],
      ),
      [v, E] = O.useState(() => {
        const q = (x == null ? void 0 : x.get(n)) || n,
          W = (C == null ? void 0 : C.get(a)) || a,
          S = (_ == null ? void 0 : _.get(o)) || o;
        return {
          mode: q,
          systemMode: m0(q),
          lightColorScheme: W,
          darkColorScheme: S,
        };
      }),
      [w, D] = O.useState(m || !b);
    O.useEffect(() => {
      D(!0);
    }, []);
    const R = IM(v),
      M = O.useCallback(
        (q) => {
          E((W) => {
            if (q === W.mode) return W;
            const S = q ?? n;
            return (
              x == null || x.set(S),
              { ...W, mode: S, systemMode: m0(S) }
            );
          });
        },
        [x, n],
      ),
      A = O.useCallback(
        (q) => {
          q
            ? typeof q == "string"
              ? q && !g.includes(q)
                ? console.error(
                    `\`${q}\` does not exist in \`theme.colorSchemes\`.`,
                  )
                : E((W) => {
                    const S = { ...W };
                    return (
                      g0(W, (I) => {
                        (I === "light" &&
                          (C == null || C.set(q), (S.lightColorScheme = q)),
                          I === "dark" &&
                            (_ == null || _.set(q), (S.darkColorScheme = q)));
                      }),
                      S
                    );
                  })
              : E((W) => {
                  const S = { ...W },
                    I = q.light === null ? a : q.light,
                    X = q.dark === null ? o : q.dark;
                  return (
                    I &&
                      (g.includes(I)
                        ? ((S.lightColorScheme = I), C == null || C.set(I))
                        : console.error(
                            `\`${I}\` does not exist in \`theme.colorSchemes\`.`,
                          )),
                    X &&
                      (g.includes(X)
                        ? ((S.darkColorScheme = X), _ == null || _.set(X))
                        : console.error(
                            `\`${X}\` does not exist in \`theme.colorSchemes\`.`,
                          )),
                    S
                  );
                })
            : E(
                (W) => (
                  C == null || C.set(a),
                  _ == null || _.set(o),
                  { ...W, lightColorScheme: a, darkColorScheme: o }
                ),
              );
        },
        [g, C, _, a, o],
      ),
      L = O.useCallback(
        (q) => {
          v.mode === "system" &&
            E((W) => {
              const S = q != null && q.matches ? "dark" : "light";
              return W.systemMode === S ? W : { ...W, systemMode: S };
            });
        },
        [v.mode],
      ),
      G = O.useRef(L);
    return (
      (G.current = L),
      O.useEffect(() => {
        if (typeof window.matchMedia != "function" || !b) return;
        const q = (...S) => G.current(...S),
          W = window.matchMedia("(prefers-color-scheme: dark)");
        return (
          W.addListener(q),
          q(W),
          () => {
            W.removeListener(q);
          }
        );
      }, [b]),
      O.useEffect(() => {
        if (b) {
          const q =
              (x == null
                ? void 0
                : x.subscribe((I) => {
                    (!I || ["light", "dark", "system"].includes(I)) &&
                      M(I || n);
                  })) || _d,
            W =
              (C == null
                ? void 0
                : C.subscribe((I) => {
                    (!I || g.match(I)) && A({ light: I });
                  })) || _d,
            S =
              (_ == null
                ? void 0
                : _.subscribe((I) => {
                    (!I || g.match(I)) && A({ dark: I });
                  })) || _d;
          return () => {
            (q(), W(), S());
          };
        }
      }, [A, M, g, n, d, b, x, C, _]),
      {
        ...v,
        mode: w ? v.mode : void 0,
        systemMode: w ? v.systemMode : void 0,
        colorScheme: w ? R : void 0,
        setMode: M,
        setColorScheme: A,
      }
    );
  }
  const PM =
    "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
  function qM(e) {
    const {
        themeId: n,
        theme: a = {},
        modeStorageKey: o = Sd,
        colorSchemeStorageKey: s = Ed,
        disableTransitionOnChange: u = !1,
        defaultColorScheme: c,
        resolveTheme: d,
      } = e,
      h = {
        allColorSchemes: [],
        colorScheme: void 0,
        darkColorScheme: void 0,
        lightColorScheme: void 0,
        mode: void 0,
        setColorScheme: () => {},
        setMode: () => {},
        systemMode: void 0,
      },
      m = O.createContext(void 0),
      g = () => O.useContext(m) || h,
      b = {},
      x = {};
    function C(w) {
      var fn, Tt, jt, gt;
      const {
          children: D,
          theme: R,
          modeStorageKey: M = o,
          colorSchemeStorageKey: A = s,
          disableTransitionOnChange: L = u,
          storageManager: G,
          storageWindow: q = typeof window > "u" ? void 0 : window,
          documentNode: W = typeof document > "u" ? void 0 : document,
          colorSchemeNode: S = typeof document > "u"
            ? void 0
            : document.documentElement,
          disableNestedContext: I = !1,
          disableStyleSheetGeneration: X = !1,
          defaultMode: oe = "system",
          forceThemeRerender: se = !1,
          noSsr: J,
        } = w,
        z = O.useRef(!1),
        Y = vd(),
        ie = O.useContext(m),
        re = !!ie && !I,
        N = O.useMemo(() => R || (typeof a == "function" ? a() : a), [R]),
        K = N[n],
        ae = K || N,
        { colorSchemes: te = b, components: le = x, cssVarPrefix: ce } = ae,
        fe = Object.keys(te)
          .filter((dt) => !!te[dt])
          .join(","),
        Ae = O.useMemo(() => fe.split(","), [fe]),
        xe = typeof c == "string" ? c : c.light,
        ke = typeof c == "string" ? c : c.dark,
        ge =
          te[xe] && te[ke]
            ? oe
            : ((Tt =
                (fn = te[ae.defaultColorScheme]) == null
                  ? void 0
                  : fn.palette) == null
                ? void 0
                : Tt.mode) || ((jt = ae.palette) == null ? void 0 : jt.mode),
        {
          mode: Oe,
          setMode: Me,
          systemMode: Ie,
          lightColorScheme: Re,
          darkColorScheme: Xe,
          colorScheme: Gt,
          setColorScheme: We,
        } = HM({
          supportedColorSchemes: Ae,
          defaultLightColorScheme: xe,
          defaultDarkColorScheme: ke,
          modeStorageKey: M,
          colorSchemeStorageKey: A,
          defaultMode: ge,
          storageManager: G,
          storageWindow: q,
          noSsr: J,
        });
      let ft = Oe,
        ut = Gt;
      re && ((ft = ie.mode), (ut = ie.colorScheme));
      let mt = ut || ae.defaultColorScheme;
      ae.vars && !se && (mt = ae.defaultColorScheme);
      const Fe = O.useMemo(() => {
          var Jt;
          const dt =
              ((Jt = ae.generateThemeVars) == null ? void 0 : Jt.call(ae)) ||
              ae.vars,
            ve = {
              ...ae,
              components: le,
              colorSchemes: te,
              cssVarPrefix: ce,
              vars: dt,
            };
          if (
            (typeof ve.generateSpacing == "function" &&
              (ve.spacing = ve.generateSpacing()),
            mt)
          ) {
            const At = te[mt];
            At &&
              typeof At == "object" &&
              Object.keys(At).forEach((zt) => {
                At[zt] && typeof At[zt] == "object"
                  ? (ve[zt] = { ...ve[zt], ...At[zt] })
                  : (ve[zt] = At[zt]);
              });
          }
          return d ? d(ve) : ve;
        }, [ae, mt, le, te, ce]),
        pe = ae.colorSchemeSelector;
      (qr(() => {
        if (ut && S && pe && pe !== "media") {
          const dt = pe;
          let ve = pe;
          if (
            (dt === "class" && (ve = ".%s"),
            dt === "data" && (ve = "[data-%s]"),
            dt != null &&
              dt.startsWith("data-") &&
              !dt.includes("%s") &&
              (ve = `[${dt}="%s"]`),
            ve.startsWith("."))
          )
            (S.classList.remove(
              ...Ae.map((Jt) => ve.substring(1).replace("%s", Jt)),
            ),
              S.classList.add(ve.substring(1).replace("%s", ut)));
          else {
            const Jt = ve.replace("%s", ut).match(/\[([^\]]+)\]/);
            if (Jt) {
              const [At, zt] = Jt[1].split("=");
              (zt ||
                Ae.forEach((he) => {
                  S.removeAttribute(At.replace(ut, he));
                }),
                S.setAttribute(At, zt ? zt.replace(/"|'/g, "") : ""));
            } else S.setAttribute(ve, ut);
          }
        }
      }, [ut, pe, S, Ae]),
        O.useEffect(() => {
          let dt;
          if (L && z.current && W) {
            const ve = W.createElement("style");
            (ve.appendChild(W.createTextNode(PM)),
              W.head.appendChild(ve),
              window.getComputedStyle(W.body),
              (dt = setTimeout(() => {
                W.head.removeChild(ve);
              }, 1)));
          }
          return () => {
            clearTimeout(dt);
          };
        }, [ut, L, W]),
        O.useEffect(
          () => (
            (z.current = !0),
            () => {
              z.current = !1;
            }
          ),
          [],
        ));
      const Sn = O.useMemo(
        () => ({
          allColorSchemes: Ae,
          colorScheme: ut,
          darkColorScheme: Xe,
          lightColorScheme: Re,
          mode: ft,
          setColorScheme: We,
          setMode: Me,
          systemMode: Ie,
        }),
        [Ae, ut, Xe, Re, ft, We, Me, Ie, Fe.colorSchemeSelector],
      );
      let _t = !0;
      (X ||
        ae.cssVariables === !1 ||
        (re && (Y == null ? void 0 : Y.cssVarPrefix) === ce)) &&
        (_t = !1);
      const Xn = P.jsxs(O.Fragment, {
        children: [
          P.jsx(p0, { themeId: K ? n : void 0, theme: Fe, children: D }),
          _t &&
            P.jsx(Hb, {
              styles:
                ((gt = Fe.generateStyleSheets) == null
                  ? void 0
                  : gt.call(Fe)) || [],
            }),
        ],
      });
      return re ? Xn : P.jsx(m.Provider, { value: Sn, children: Xn });
    }
    const _ = typeof c == "string" ? c : c.light,
      v = typeof c == "string" ? c : c.dark;
    return {
      CssVarsProvider: C,
      useColorScheme: g,
      getInitColorSchemeScript: (w) =>
        UM({
          colorSchemeStorageKey: s,
          defaultLightColorScheme: _,
          defaultDarkColorScheme: v,
          modeStorageKey: o,
          ...w,
        }),
    };
  }
  function FM(e = "") {
    function n(...o) {
      if (!o.length) return "";
      const s = o[0];
      return typeof s == "string" &&
        !s.match(
          /(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/,
        )
        ? `, var(--${e ? `${e}-` : ""}${s}${n(...o.slice(1))})`
        : `, ${s}`;
    }
    return (o, ...s) => `var(--${e ? `${e}-` : ""}${o}${n(...s)})`;
  }
  const y0 = (e, n, a, o = []) => {
      let s = e;
      n.forEach((u, c) => {
        c === n.length - 1
          ? Array.isArray(s)
            ? (s[Number(u)] = a)
            : s && typeof s == "object" && (s[u] = a)
          : s &&
            typeof s == "object" &&
            (s[u] || (s[u] = o.includes(u) ? [] : {}), (s = s[u]));
      });
    },
    GM = (e, n, a) => {
      function o(s, u = [], c = []) {
        Object.entries(s).forEach(([d, h]) => {
          (!a || (a && !a([...u, d]))) &&
            h != null &&
            (typeof h == "object" && Object.keys(h).length > 0
              ? o(h, [...u, d], Array.isArray(h) ? [...c, d] : c)
              : n([...u, d], h, c));
        });
      }
      o(e);
    },
    VM = (e, n) =>
      typeof n == "number"
        ? ["lineHeight", "fontWeight", "opacity", "zIndex"].some((o) =>
            e.includes(o),
          ) || e[e.length - 1].toLowerCase().includes("opacity")
          ? n
          : `${n}px`
        : n;
  function Td(e, n) {
    const { prefix: a, shouldSkipGeneratingVar: o } = n || {},
      s = {},
      u = {},
      c = {};
    return (
      GM(
        e,
        (d, h, m) => {
          if (
            (typeof h == "string" || typeof h == "number") &&
            (!o || !o(d, h))
          ) {
            const g = `--${a ? `${a}-` : ""}${d.join("-")}`,
              b = VM(d, h);
            (Object.assign(s, { [g]: b }),
              y0(u, d, `var(${g})`, m),
              y0(c, d, `var(${g}, ${b})`, m));
          }
        },
        (d) => d[0] === "vars",
      ),
      { css: s, vars: u, varsWithDefaults: c }
    );
  }
  function KM(e, n = {}) {
    const {
        getSelector: a = E,
        disableCssColorScheme: o,
        colorSchemeSelector: s,
      } = n,
      {
        colorSchemes: u = {},
        components: c,
        defaultColorScheme: d = "light",
        ...h
      } = e,
      { vars: m, css: g, varsWithDefaults: b } = Td(h, n);
    let x = b;
    const C = {},
      { [d]: _, ...v } = u;
    if (
      (Object.entries(v || {}).forEach(([R, M]) => {
        const { vars: A, css: L, varsWithDefaults: G } = Td(M, n);
        ((x = Ut(x, G)), (C[R] = { css: L, vars: A }));
      }),
      _)
    ) {
      const { css: R, vars: M, varsWithDefaults: A } = Td(_, n);
      ((x = Ut(x, A)), (C[d] = { css: R, vars: M }));
    }
    function E(R, M) {
      var L, G;
      let A = s;
      if (
        (s === "class" && (A = ".%s"),
        s === "data" && (A = "[data-%s]"),
        s != null &&
          s.startsWith("data-") &&
          !s.includes("%s") &&
          (A = `[${s}="%s"]`),
        R)
      ) {
        if (A === "media")
          return e.defaultColorScheme === R
            ? ":root"
            : {
                [`@media (prefers-color-scheme: ${((G = (L = u[R]) == null ? void 0 : L.palette) == null ? void 0 : G.mode) || R})`]:
                  { ":root": M },
              };
        if (A)
          return e.defaultColorScheme === R
            ? `:root, ${A.replace("%s", String(R))}`
            : A.replace("%s", String(R));
      }
      return ":root";
    }
    return {
      vars: x,
      generateThemeVars: () => {
        let R = { ...m };
        return (
          Object.entries(C).forEach(([, { vars: M }]) => {
            R = Ut(R, M);
          }),
          R
        );
      },
      generateStyleSheets: () => {
        var q, W;
        const R = [],
          M = e.defaultColorScheme || "light";
        function A(S, I) {
          Object.keys(I).length &&
            R.push(typeof S == "string" ? { [S]: { ...I } } : S);
        }
        A(a(void 0, { ...g }), g);
        const { [M]: L, ...G } = C;
        if (L) {
          const { css: S } = L,
            I =
              (W = (q = u[M]) == null ? void 0 : q.palette) == null
                ? void 0
                : W.mode,
            X = !o && I ? { colorScheme: I, ...S } : { ...S };
          A(a(M, { ...X }), X);
        }
        return (
          Object.entries(G).forEach(([S, { css: I }]) => {
            var se, J;
            const X =
                (J = (se = u[S]) == null ? void 0 : se.palette) == null
                  ? void 0
                  : J.mode,
              oe = !o && X ? { colorScheme: X, ...I } : { ...I };
            A(a(S, { ...oe }), oe);
          }),
          R
        );
      },
    };
  }
  function YM(e) {
    return function (a) {
      return e === "media"
        ? `@media (prefers-color-scheme: ${a})`
        : e
          ? e.startsWith("data-") && !e.includes("%s")
            ? `[${e}="${a}"] &`
            : e === "class"
              ? `.${a} &`
              : e === "data"
                ? `[data-${a}] &`
                : `${e.replace("%s", a)} &`
          : "&";
    };
  }
  function Ke(e, n, a = void 0) {
    const o = {};
    for (const s in e) {
      const u = e[s];
      let c = "",
        d = !0;
      for (let h = 0; h < u.length; h += 1) {
        const m = u[h];
        m &&
          ((c += (d === !0 ? "" : " ") + n(m)),
          (d = !1),
          a && a[m] && (c += " " + a[m]));
      }
      o[s] = c;
    }
    return o;
  }
  function xd(e, n) {
    var a, o, s;
    return (
      O.isValidElement(e) &&
      n.indexOf(
        e.type.muiName ??
          ((s =
            (o = (a = e.type) == null ? void 0 : a._payload) == null
              ? void 0
              : o.value) == null
            ? void 0
            : s.muiName),
      ) !== -1
    );
  }
  const XM = Xl(),
    WM = vM("div", { name: "MuiStack", slot: "Root" });
  function QM(e) {
    return EM({ props: e, name: "MuiStack", defaultTheme: XM });
  }
  function ZM(e, n) {
    const a = O.Children.toArray(e).filter(Boolean);
    return a.reduce(
      (o, s, u) => (
        o.push(s),
        u < a.length - 1 &&
          o.push(O.cloneElement(n, { key: `separator-${u}` })),
        o
      ),
      [],
    );
  }
  const JM = (e) =>
      ({
        row: "Left",
        "row-reverse": "Right",
        column: "Top",
        "column-reverse": "Bottom",
      })[e],
    eD = ({ ownerState: e, theme: n }) => {
      let a = {
        display: "flex",
        flexDirection: "column",
        ...Vn(
          { theme: n },
          ud({ values: e.direction, breakpoints: n.breakpoints.values }),
          (o) => ({ flexDirection: o }),
        ),
      };
      if (e.spacing) {
        const o = ql(n),
          s = Object.keys(n.breakpoints.values).reduce(
            (h, m) => (
              ((typeof e.spacing == "object" && e.spacing[m] != null) ||
                (typeof e.direction == "object" && e.direction[m] != null)) &&
                (h[m] = !0),
              h
            ),
            {},
          ),
          u = ud({ values: e.direction, base: s }),
          c = ud({ values: e.spacing, base: s });
        (typeof u == "object" &&
          Object.keys(u).forEach((h, m, g) => {
            if (!u[h]) {
              const x = m > 0 ? u[g[m - 1]] : "column";
              u[h] = x;
            }
          }),
          (a = Ut(
            a,
            Vn({ theme: n }, c, (h, m) =>
              e.useFlexGap
                ? { gap: Ma(o, h) }
                : {
                    "& > :not(style):not(style)": { margin: 0 },
                    "& > :not(style) ~ :not(style)": {
                      [`margin${JM(m ? u[m] : e.direction)}`]: Ma(o, h),
                    },
                  },
            ),
          )));
      }
      return ((a = bO(n.breakpoints, a)), a);
    };
  function tD(e = {}) {
    const {
        createStyledComponent: n = WM,
        useThemeProps: a = QM,
        componentName: o = "MuiStack",
      } = e,
      s = () => Ke({ root: ["root"] }, (h) => Ve(o, h), {}),
      u = n(eD);
    return O.forwardRef(function (h, m) {
      const g = a(h),
        b = t0(g),
        {
          component: x = "div",
          direction: C = "column",
          spacing: _ = 0,
          divider: v,
          children: E,
          className: w,
          useFlexGap: D = !1,
          ...R
        } = b,
        M = { direction: C, spacing: _, useFlexGap: D },
        A = s();
      return P.jsx(u, {
        as: x,
        ownerState: M,
        ref: m,
        className: Te(A.root, w),
        ...R,
        children: v ? ZM(E, v) : E,
      });
    });
  }
  function b0() {
    return {
      text: {
        primary: "rgba(0, 0, 0, 0.87)",
        secondary: "rgba(0, 0, 0, 0.6)",
        disabled: "rgba(0, 0, 0, 0.38)",
      },
      divider: "rgba(0, 0, 0, 0.12)",
      background: { paper: Ci.white, default: Ci.white },
      action: {
        active: "rgba(0, 0, 0, 0.54)",
        hover: "rgba(0, 0, 0, 0.04)",
        hoverOpacity: 0.04,
        selected: "rgba(0, 0, 0, 0.08)",
        selectedOpacity: 0.08,
        disabled: "rgba(0, 0, 0, 0.26)",
        disabledBackground: "rgba(0, 0, 0, 0.12)",
        disabledOpacity: 0.38,
        focus: "rgba(0, 0, 0, 0.12)",
        focusOpacity: 0.12,
        activatedOpacity: 0.12,
      },
    };
  }
  const nD = b0();
  function v0() {
    return {
      text: {
        primary: Ci.white,
        secondary: "rgba(255, 255, 255, 0.7)",
        disabled: "rgba(255, 255, 255, 0.5)",
        icon: "rgba(255, 255, 255, 0.5)",
      },
      divider: "rgba(255, 255, 255, 0.12)",
      background: { paper: "#121212", default: "#121212" },
      action: {
        active: Ci.white,
        hover: "rgba(255, 255, 255, 0.08)",
        hoverOpacity: 0.08,
        selected: "rgba(255, 255, 255, 0.16)",
        selectedOpacity: 0.16,
        disabled: "rgba(255, 255, 255, 0.3)",
        disabledBackground: "rgba(255, 255, 255, 0.12)",
        disabledOpacity: 0.38,
        focus: "rgba(255, 255, 255, 0.12)",
        focusOpacity: 0.12,
        activatedOpacity: 0.24,
      },
    };
  }
  const S0 = v0();
  function E0(e, n, a, o) {
    const s = o.light || o,
      u = o.dark || o * 1.5;
    e[n] ||
      (e.hasOwnProperty(a)
        ? (e[n] = e[a])
        : n === "light"
          ? (e.light = bd(e.main, s))
          : n === "dark" && (e.dark = yd(e.main, u)));
  }
  function rD(e = "light") {
    return e === "dark"
      ? { main: mo[200], light: mo[50], dark: mo[400] }
      : { main: mo[700], light: mo[400], dark: mo[800] };
  }
  function aD(e = "light") {
    return e === "dark"
      ? { main: ho[200], light: ho[50], dark: ho[400] }
      : { main: ho[500], light: ho[300], dark: ho[700] };
  }
  function oD(e = "light") {
    return e === "dark"
      ? { main: po[500], light: po[300], dark: po[700] }
      : { main: po[700], light: po[400], dark: po[800] };
  }
  function iD(e = "light") {
    return e === "dark"
      ? { main: go[400], light: go[300], dark: go[700] }
      : { main: go[700], light: go[500], dark: go[900] };
  }
  function sD(e = "light") {
    return e === "dark"
      ? { main: yo[400], light: yo[300], dark: yo[700] }
      : { main: yo[800], light: yo[500], dark: yo[900] };
  }
  function lD(e = "light") {
    return e === "dark"
      ? { main: wi[400], light: wi[300], dark: wi[700] }
      : { main: "#ed6c02", light: wi[500], dark: wi[900] };
  }
  function Cd(e) {
    const {
        mode: n = "light",
        contrastThreshold: a = 3,
        tonalOffset: o = 0.2,
        ...s
      } = e,
      u = e.primary || rD(n),
      c = e.secondary || aD(n),
      d = e.error || oD(n),
      h = e.info || iD(n),
      m = e.success || sD(n),
      g = e.warning || lD(n);
    function b(v) {
      return CM(v, S0.text.primary) >= a ? S0.text.primary : nD.text.primary;
    }
    const x = ({
      color: v,
      name: E,
      mainShade: w = 500,
      lightShade: D = 300,
      darkShade: R = 700,
    }) => {
      if (
        ((v = { ...v }),
        !v.main && v[w] && (v.main = v[w]),
        !v.hasOwnProperty("main"))
      )
        throw new Error(vr(11, E ? ` (${E})` : "", w));
      if (typeof v.main != "string")
        throw new Error(vr(12, E ? ` (${E})` : "", JSON.stringify(v.main)));
      return (
        E0(v, "light", D, o),
        E0(v, "dark", R, o),
        v.contrastText || (v.contrastText = b(v.main)),
        v
      );
    };
    let C;
    return (
      n === "light" ? (C = b0()) : n === "dark" && (C = v0()),
      Ut(
        {
          common: { ...Ci },
          mode: n,
          primary: x({ color: u, name: "primary" }),
          secondary: x({
            color: c,
            name: "secondary",
            mainShade: "A400",
            lightShade: "A200",
            darkShade: "A700",
          }),
          error: x({ color: d, name: "error" }),
          warning: x({ color: g, name: "warning" }),
          info: x({ color: h, name: "info" }),
          success: x({ color: m, name: "success" }),
          grey: sA,
          contrastThreshold: a,
          getContrastText: b,
          augmentColor: x,
          tonalOffset: o,
          ...C,
        },
        s,
      )
    );
  }
  function uD(e) {
    const n = {};
    return (
      Object.entries(e).forEach((o) => {
        const [s, u] = o;
        typeof u == "object" &&
          (n[s] =
            `${u.fontStyle ? `${u.fontStyle} ` : ""}${u.fontVariant ? `${u.fontVariant} ` : ""}${u.fontWeight ? `${u.fontWeight} ` : ""}${u.fontStretch ? `${u.fontStretch} ` : ""}${u.fontSize || ""}${u.lineHeight ? `/${u.lineHeight} ` : ""}${u.fontFamily || ""}`);
      }),
      n
    );
  }
  function cD(e, n) {
    return {
      toolbar: {
        minHeight: 56,
        [e.up("xs")]: { "@media (orientation: landscape)": { minHeight: 48 } },
        [e.up("sm")]: { minHeight: 64 },
      },
      ...n,
    };
  }
  function fD(e) {
    return Math.round(e * 1e5) / 1e5;
  }
  const _0 = { textTransform: "uppercase" },
    T0 = '"Roboto", "Helvetica", "Arial", sans-serif';
  function x0(e, n) {
    const {
        fontFamily: a = T0,
        fontSize: o = 14,
        fontWeightLight: s = 300,
        fontWeightRegular: u = 400,
        fontWeightMedium: c = 500,
        fontWeightBold: d = 700,
        htmlFontSize: h = 16,
        allVariants: m,
        pxToRem: g,
        ...b
      } = typeof n == "function" ? n(e) : n,
      x = o / 14,
      C = g || ((E) => `${(E / h) * x}rem`),
      _ = (E, w, D, R, M) => ({
        fontFamily: a,
        fontWeight: E,
        fontSize: C(w),
        lineHeight: D,
        ...(a === T0 ? { letterSpacing: `${fD(R / w)}em` } : {}),
        ...M,
        ...m,
      }),
      v = {
        h1: _(s, 96, 1.167, -1.5),
        h2: _(s, 60, 1.2, -0.5),
        h3: _(u, 48, 1.167, 0),
        h4: _(u, 34, 1.235, 0.25),
        h5: _(u, 24, 1.334, 0),
        h6: _(c, 20, 1.6, 0.15),
        subtitle1: _(u, 16, 1.75, 0.15),
        subtitle2: _(c, 14, 1.57, 0.1),
        body1: _(u, 16, 1.5, 0.15),
        body2: _(u, 14, 1.43, 0.15),
        button: _(c, 14, 1.75, 0.4, _0),
        caption: _(u, 12, 1.66, 0.4),
        overline: _(u, 12, 2.66, 1, _0),
        inherit: {
          fontFamily: "inherit",
          fontWeight: "inherit",
          fontSize: "inherit",
          lineHeight: "inherit",
          letterSpacing: "inherit",
        },
      };
    return Ut(
      {
        htmlFontSize: h,
        pxToRem: C,
        fontFamily: a,
        fontSize: o,
        fontWeightLight: s,
        fontWeightRegular: u,
        fontWeightMedium: c,
        fontWeightBold: d,
        ...v,
      },
      b,
      { clone: !1 },
    );
  }
  const dD = 0.2,
    pD = 0.14,
    hD = 0.12;
  function ct(...e) {
    return [
      `${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${dD})`,
      `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${pD})`,
      `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${hD})`,
    ].join(",");
  }
  const mD = [
      "none",
      ct(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
      ct(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
      ct(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
      ct(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
      ct(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
      ct(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
      ct(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
      ct(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
      ct(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
      ct(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
      ct(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
      ct(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
      ct(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
      ct(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
      ct(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
      ct(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
      ct(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
      ct(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
      ct(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
      ct(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
      ct(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
      ct(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
      ct(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
      ct(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
    ],
    gD = {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
    yD = {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    };
  function C0(e) {
    return `${Math.round(e)}ms`;
  }
  function bD(e) {
    if (!e) return 0;
    const n = e / 36;
    return Math.min(Math.round((4 + 15 * n ** 0.25 + n / 5) * 10), 3e3);
  }
  function vD(e) {
    const n = { ...gD, ...e.easing },
      a = { ...yD, ...e.duration };
    return {
      getAutoHeightDuration: bD,
      create: (s = ["all"], u = {}) => {
        const {
          duration: c = a.standard,
          easing: d = n.easeInOut,
          delay: h = 0,
          ...m
        } = u;
        return (Array.isArray(s) ? s : [s])
          .map(
            (g) =>
              `${g} ${typeof c == "string" ? c : C0(c)} ${d} ${typeof h == "string" ? h : C0(h)}`,
          )
          .join(",");
      },
      ...e,
      easing: n,
      duration: a,
    };
  }
  const SD = {
    mobileStepper: 1e3,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  };
  function ED(e) {
    return (
      ir(e) ||
      typeof e > "u" ||
      typeof e == "string" ||
      typeof e == "boolean" ||
      typeof e == "number" ||
      Array.isArray(e)
    );
  }
  function w0(e = {}) {
    const n = { ...e };
    function a(o) {
      const s = Object.entries(o);
      for (let u = 0; u < s.length; u++) {
        const [c, d] = s[u];
        !ED(d) || c.startsWith("unstable_")
          ? delete o[c]
          : ir(d) && ((o[c] = { ...d }), a(o[c]));
      }
    }
    return (
      a(n),
      `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(n, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`
    );
  }
  function wd(e = {}, ...n) {
    const {
      breakpoints: a,
      mixins: o = {},
      spacing: s,
      palette: u = {},
      transitions: c = {},
      typography: d = {},
      shape: h,
      ...m
    } = e;
    if (e.vars && e.generateThemeVars === void 0) throw new Error(vr(20));
    const g = Cd(u),
      b = Xl(e);
    let x = Ut(b, {
      mixins: cD(b.breakpoints, o),
      palette: g,
      shadows: mD.slice(),
      typography: x0(g, d),
      transitions: vD(c),
      zIndex: { ...SD },
    });
    return (
      (x = Ut(x, m)),
      (x = n.reduce((C, _) => Ut(C, _), x)),
      (x.unstable_sxConfig = {
        ...Ui,
        ...(m == null ? void 0 : m.unstable_sxConfig),
      }),
      (x.unstable_sx = function (_) {
        return Da({ sx: _, theme: this });
      }),
      (x.toRuntimeSource = w0),
      x
    );
  }
  function Rd(e) {
    let n;
    return (
      e < 1 ? (n = 5.11916 * e ** 2) : (n = 4.5 * Math.log(e + 1) + 2),
      Math.round(n * 10) / 1e3
    );
  }
  const _D = [...Array(25)].map((e, n) => {
    if (n === 0) return "none";
    const a = Rd(n);
    return `linear-gradient(rgba(255 255 255 / ${a}), rgba(255 255 255 / ${a}))`;
  });
  function R0(e) {
    return {
      inputPlaceholder: e === "dark" ? 0.5 : 0.42,
      inputUnderline: e === "dark" ? 0.7 : 0.42,
      switchTrackDisabled: e === "dark" ? 0.2 : 0.12,
      switchTrack: e === "dark" ? 0.3 : 0.38,
    };
  }
  function A0(e) {
    return e === "dark" ? _D : [];
  }
  function TD(e) {
    const { palette: n = { mode: "light" }, opacity: a, overlays: o, ...s } = e,
      u = Cd(n);
    return {
      palette: u,
      opacity: { ...R0(u.mode), ...a },
      overlays: o || A0(u.mode),
      ...s,
    };
  }
  function xD(e) {
    var n;
    return (
      !!e[0].match(
        /(cssVarPrefix|colorSchemeSelector|rootSelector|typography|mixins|breakpoints|direction|transitions)/,
      ) ||
      !!e[0].match(/sxConfig$/) ||
      (e[0] === "palette" &&
        !!(
          (n = e[1]) != null && n.match(/(mode|contrastThreshold|tonalOffset)/)
        ))
    );
  }
  const CD = (e) => [
      ...[...Array(25)].map((n, a) => `--${e ? `${e}-` : ""}overlays-${a}`),
      `--${e ? `${e}-` : ""}palette-AppBar-darkBg`,
      `--${e ? `${e}-` : ""}palette-AppBar-darkColor`,
    ],
    wD = (e) => (n, a) => {
      const o = e.rootSelector || ":root",
        s = e.colorSchemeSelector;
      let u = s;
      if (
        (s === "class" && (u = ".%s"),
        s === "data" && (u = "[data-%s]"),
        s != null &&
          s.startsWith("data-") &&
          !s.includes("%s") &&
          (u = `[${s}="%s"]`),
        e.defaultColorScheme === n)
      ) {
        if (n === "dark") {
          const c = {};
          return (
            CD(e.cssVarPrefix).forEach((d) => {
              ((c[d] = a[d]), delete a[d]);
            }),
            u === "media"
              ? { [o]: a, "@media (prefers-color-scheme: dark)": { [o]: c } }
              : u
                ? {
                    [u.replace("%s", n)]: c,
                    [`${o}, ${u.replace("%s", n)}`]: a,
                  }
                : { [o]: { ...a, ...c } }
          );
        }
        if (u && u !== "media") return `${o}, ${u.replace("%s", String(n))}`;
      } else if (n) {
        if (u === "media")
          return {
            [`@media (prefers-color-scheme: ${String(n)})`]: { [o]: a },
          };
        if (u) return u.replace("%s", String(n));
      }
      return o;
    };
  function RD(e, n) {
    n.forEach((a) => {
      e[a] || (e[a] = {});
    });
  }
  function Q(e, n, a) {
    !e[n] && a && (e[n] = a);
  }
  function Ii(e) {
    return typeof e != "string" || !e.startsWith("hsl") ? e : s0(e);
  }
  function Er(e, n) {
    `${n}Channel` in e || (e[`${n}Channel`] = $i(Ii(e[n])));
  }
  function AD(e) {
    return typeof e == "number"
      ? `${e}px`
      : typeof e == "string" || typeof e == "function" || Array.isArray(e)
        ? e
        : "8px";
  }
  const sr = (e) => {
      try {
        return e();
      } catch {}
    },
    OD = (e = "mui") => FM(e);
  function Ad(e, n, a, o) {
    if (!n) return;
    n = n === !0 ? {} : n;
    const s = o === "dark" ? "dark" : "light";
    if (!a) {
      e[o] = TD({
        ...n,
        palette: { mode: s, ...(n == null ? void 0 : n.palette) },
      });
      return;
    }
    const { palette: u, ...c } = wd({
      ...a,
      palette: { mode: s, ...(n == null ? void 0 : n.palette) },
    });
    return (
      (e[o] = {
        ...n,
        palette: u,
        opacity: { ...R0(s), ...(n == null ? void 0 : n.opacity) },
        overlays: (n == null ? void 0 : n.overlays) || A0(s),
      }),
      c
    );
  }
  function MD(e = {}, ...n) {
    const {
        colorSchemes: a = { light: !0 },
        defaultColorScheme: o,
        disableCssColorScheme: s = !1,
        cssVarPrefix: u = "mui",
        shouldSkipGeneratingVar: c = xD,
        colorSchemeSelector: d = a.light && a.dark ? "media" : void 0,
        rootSelector: h = ":root",
        ...m
      } = e,
      g = Object.keys(a)[0],
      b = o || (a.light && g !== "light" ? "light" : g),
      x = OD(u),
      { [b]: C, light: _, dark: v, ...E } = a,
      w = { ...E };
    let D = C;
    if (
      (((b === "dark" && !("dark" in a)) ||
        (b === "light" && !("light" in a))) &&
        (D = !0),
      !D)
    )
      throw new Error(vr(21, b));
    const R = Ad(w, D, m, b);
    (_ && !w.light && Ad(w, _, void 0, "light"),
      v && !w.dark && Ad(w, v, void 0, "dark"));
    let M = {
      defaultColorScheme: b,
      ...R,
      cssVarPrefix: u,
      colorSchemeSelector: d,
      rootSelector: h,
      getCssVar: x,
      colorSchemes: w,
      font: { ...uD(R.typography), ...R.font },
      spacing: AD(m.spacing),
    };
    (Object.keys(M.colorSchemes).forEach((W) => {
      const S = M.colorSchemes[W].palette,
        I = (X) => {
          const oe = X.split("-"),
            se = oe[1],
            J = oe[2];
          return x(X, S[se][J]);
        };
      if (
        (S.mode === "light" &&
          (Q(S.common, "background", "#fff"),
          Q(S.common, "onBackground", "#000")),
        S.mode === "dark" &&
          (Q(S.common, "background", "#000"),
          Q(S.common, "onBackground", "#fff")),
        RD(S, [
          "Alert",
          "AppBar",
          "Avatar",
          "Button",
          "Chip",
          "FilledInput",
          "LinearProgress",
          "Skeleton",
          "Slider",
          "SnackbarContent",
          "SpeedDialAction",
          "StepConnector",
          "StepContent",
          "Switch",
          "TableCell",
          "Tooltip",
        ]),
        S.mode === "light")
      ) {
        (Q(S.Alert, "errorColor", ot(S.error.light, 0.6)),
          Q(S.Alert, "infoColor", ot(S.info.light, 0.6)),
          Q(S.Alert, "successColor", ot(S.success.light, 0.6)),
          Q(S.Alert, "warningColor", ot(S.warning.light, 0.6)),
          Q(S.Alert, "errorFilledBg", I("palette-error-main")),
          Q(S.Alert, "infoFilledBg", I("palette-info-main")),
          Q(S.Alert, "successFilledBg", I("palette-success-main")),
          Q(S.Alert, "warningFilledBg", I("palette-warning-main")),
          Q(
            S.Alert,
            "errorFilledColor",
            sr(() => S.getContrastText(S.error.main)),
          ),
          Q(
            S.Alert,
            "infoFilledColor",
            sr(() => S.getContrastText(S.info.main)),
          ),
          Q(
            S.Alert,
            "successFilledColor",
            sr(() => S.getContrastText(S.success.main)),
          ),
          Q(
            S.Alert,
            "warningFilledColor",
            sr(() => S.getContrastText(S.warning.main)),
          ),
          Q(S.Alert, "errorStandardBg", it(S.error.light, 0.9)),
          Q(S.Alert, "infoStandardBg", it(S.info.light, 0.9)),
          Q(S.Alert, "successStandardBg", it(S.success.light, 0.9)),
          Q(S.Alert, "warningStandardBg", it(S.warning.light, 0.9)),
          Q(S.Alert, "errorIconColor", I("palette-error-main")),
          Q(S.Alert, "infoIconColor", I("palette-info-main")),
          Q(S.Alert, "successIconColor", I("palette-success-main")),
          Q(S.Alert, "warningIconColor", I("palette-warning-main")),
          Q(S.AppBar, "defaultBg", I("palette-grey-100")),
          Q(S.Avatar, "defaultBg", I("palette-grey-400")),
          Q(S.Button, "inheritContainedBg", I("palette-grey-300")),
          Q(S.Button, "inheritContainedHoverBg", I("palette-grey-A100")),
          Q(S.Chip, "defaultBorder", I("palette-grey-400")),
          Q(S.Chip, "defaultAvatarColor", I("palette-grey-700")),
          Q(S.Chip, "defaultIconColor", I("palette-grey-700")),
          Q(S.FilledInput, "bg", "rgba(0, 0, 0, 0.06)"),
          Q(S.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)"),
          Q(S.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)"),
          Q(S.LinearProgress, "primaryBg", it(S.primary.main, 0.62)),
          Q(S.LinearProgress, "secondaryBg", it(S.secondary.main, 0.62)),
          Q(S.LinearProgress, "errorBg", it(S.error.main, 0.62)),
          Q(S.LinearProgress, "infoBg", it(S.info.main, 0.62)),
          Q(S.LinearProgress, "successBg", it(S.success.main, 0.62)),
          Q(S.LinearProgress, "warningBg", it(S.warning.main, 0.62)),
          Q(
            S.Skeleton,
            "bg",
            `rgba(${I("palette-text-primaryChannel")} / 0.11)`,
          ),
          Q(S.Slider, "primaryTrack", it(S.primary.main, 0.62)),
          Q(S.Slider, "secondaryTrack", it(S.secondary.main, 0.62)),
          Q(S.Slider, "errorTrack", it(S.error.main, 0.62)),
          Q(S.Slider, "infoTrack", it(S.info.main, 0.62)),
          Q(S.Slider, "successTrack", it(S.success.main, 0.62)),
          Q(S.Slider, "warningTrack", it(S.warning.main, 0.62)));
        const X = Jl(S.background.default, 0.8);
        (Q(S.SnackbarContent, "bg", X),
          Q(
            S.SnackbarContent,
            "color",
            sr(() => S.getContrastText(X)),
          ),
          Q(S.SpeedDialAction, "fabHoverBg", Jl(S.background.paper, 0.15)),
          Q(S.StepConnector, "border", I("palette-grey-400")),
          Q(S.StepContent, "border", I("palette-grey-400")),
          Q(S.Switch, "defaultColor", I("palette-common-white")),
          Q(S.Switch, "defaultDisabledColor", I("palette-grey-100")),
          Q(S.Switch, "primaryDisabledColor", it(S.primary.main, 0.62)),
          Q(S.Switch, "secondaryDisabledColor", it(S.secondary.main, 0.62)),
          Q(S.Switch, "errorDisabledColor", it(S.error.main, 0.62)),
          Q(S.Switch, "infoDisabledColor", it(S.info.main, 0.62)),
          Q(S.Switch, "successDisabledColor", it(S.success.main, 0.62)),
          Q(S.Switch, "warningDisabledColor", it(S.warning.main, 0.62)),
          Q(S.TableCell, "border", it(Zl(S.divider, 1), 0.88)),
          Q(S.Tooltip, "bg", Zl(S.grey[700], 0.92)));
      }
      if (S.mode === "dark") {
        (Q(S.Alert, "errorColor", it(S.error.light, 0.6)),
          Q(S.Alert, "infoColor", it(S.info.light, 0.6)),
          Q(S.Alert, "successColor", it(S.success.light, 0.6)),
          Q(S.Alert, "warningColor", it(S.warning.light, 0.6)),
          Q(S.Alert, "errorFilledBg", I("palette-error-dark")),
          Q(S.Alert, "infoFilledBg", I("palette-info-dark")),
          Q(S.Alert, "successFilledBg", I("palette-success-dark")),
          Q(S.Alert, "warningFilledBg", I("palette-warning-dark")),
          Q(
            S.Alert,
            "errorFilledColor",
            sr(() => S.getContrastText(S.error.dark)),
          ),
          Q(
            S.Alert,
            "infoFilledColor",
            sr(() => S.getContrastText(S.info.dark)),
          ),
          Q(
            S.Alert,
            "successFilledColor",
            sr(() => S.getContrastText(S.success.dark)),
          ),
          Q(
            S.Alert,
            "warningFilledColor",
            sr(() => S.getContrastText(S.warning.dark)),
          ),
          Q(S.Alert, "errorStandardBg", ot(S.error.light, 0.9)),
          Q(S.Alert, "infoStandardBg", ot(S.info.light, 0.9)),
          Q(S.Alert, "successStandardBg", ot(S.success.light, 0.9)),
          Q(S.Alert, "warningStandardBg", ot(S.warning.light, 0.9)),
          Q(S.Alert, "errorIconColor", I("palette-error-main")),
          Q(S.Alert, "infoIconColor", I("palette-info-main")),
          Q(S.Alert, "successIconColor", I("palette-success-main")),
          Q(S.Alert, "warningIconColor", I("palette-warning-main")),
          Q(S.AppBar, "defaultBg", I("palette-grey-900")),
          Q(S.AppBar, "darkBg", I("palette-background-paper")),
          Q(S.AppBar, "darkColor", I("palette-text-primary")),
          Q(S.Avatar, "defaultBg", I("palette-grey-600")),
          Q(S.Button, "inheritContainedBg", I("palette-grey-800")),
          Q(S.Button, "inheritContainedHoverBg", I("palette-grey-700")),
          Q(S.Chip, "defaultBorder", I("palette-grey-700")),
          Q(S.Chip, "defaultAvatarColor", I("palette-grey-300")),
          Q(S.Chip, "defaultIconColor", I("palette-grey-300")),
          Q(S.FilledInput, "bg", "rgba(255, 255, 255, 0.09)"),
          Q(S.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)"),
          Q(S.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)"),
          Q(S.LinearProgress, "primaryBg", ot(S.primary.main, 0.5)),
          Q(S.LinearProgress, "secondaryBg", ot(S.secondary.main, 0.5)),
          Q(S.LinearProgress, "errorBg", ot(S.error.main, 0.5)),
          Q(S.LinearProgress, "infoBg", ot(S.info.main, 0.5)),
          Q(S.LinearProgress, "successBg", ot(S.success.main, 0.5)),
          Q(S.LinearProgress, "warningBg", ot(S.warning.main, 0.5)),
          Q(
            S.Skeleton,
            "bg",
            `rgba(${I("palette-text-primaryChannel")} / 0.13)`,
          ),
          Q(S.Slider, "primaryTrack", ot(S.primary.main, 0.5)),
          Q(S.Slider, "secondaryTrack", ot(S.secondary.main, 0.5)),
          Q(S.Slider, "errorTrack", ot(S.error.main, 0.5)),
          Q(S.Slider, "infoTrack", ot(S.info.main, 0.5)),
          Q(S.Slider, "successTrack", ot(S.success.main, 0.5)),
          Q(S.Slider, "warningTrack", ot(S.warning.main, 0.5)));
        const X = Jl(S.background.default, 0.98);
        (Q(S.SnackbarContent, "bg", X),
          Q(
            S.SnackbarContent,
            "color",
            sr(() => S.getContrastText(X)),
          ),
          Q(S.SpeedDialAction, "fabHoverBg", Jl(S.background.paper, 0.15)),
          Q(S.StepConnector, "border", I("palette-grey-600")),
          Q(S.StepContent, "border", I("palette-grey-600")),
          Q(S.Switch, "defaultColor", I("palette-grey-300")),
          Q(S.Switch, "defaultDisabledColor", I("palette-grey-600")),
          Q(S.Switch, "primaryDisabledColor", ot(S.primary.main, 0.55)),
          Q(S.Switch, "secondaryDisabledColor", ot(S.secondary.main, 0.55)),
          Q(S.Switch, "errorDisabledColor", ot(S.error.main, 0.55)),
          Q(S.Switch, "infoDisabledColor", ot(S.info.main, 0.55)),
          Q(S.Switch, "successDisabledColor", ot(S.success.main, 0.55)),
          Q(S.Switch, "warningDisabledColor", ot(S.warning.main, 0.55)),
          Q(S.TableCell, "border", ot(Zl(S.divider, 1), 0.68)),
          Q(S.Tooltip, "bg", Zl(S.grey[700], 0.92)));
      }
      (Er(S.background, "default"),
        Er(S.background, "paper"),
        Er(S.common, "background"),
        Er(S.common, "onBackground"),
        Er(S, "divider"),
        Object.keys(S).forEach((X) => {
          const oe = S[X];
          X !== "tonalOffset" &&
            oe &&
            typeof oe == "object" &&
            (oe.main && Q(S[X], "mainChannel", $i(Ii(oe.main))),
            oe.light && Q(S[X], "lightChannel", $i(Ii(oe.light))),
            oe.dark && Q(S[X], "darkChannel", $i(Ii(oe.dark))),
            oe.contrastText &&
              Q(S[X], "contrastTextChannel", $i(Ii(oe.contrastText))),
            X === "text" && (Er(S[X], "primary"), Er(S[X], "secondary")),
            X === "action" &&
              (oe.active && Er(S[X], "active"),
              oe.selected && Er(S[X], "selected")));
        }));
    }),
      (M = n.reduce((W, S) => Ut(W, S), M)));
    const A = {
        prefix: u,
        disableCssColorScheme: s,
        shouldSkipGeneratingVar: c,
        getSelector: wD(M),
      },
      { vars: L, generateThemeVars: G, generateStyleSheets: q } = KM(M, A);
    return (
      (M.vars = L),
      Object.entries(M.colorSchemes[M.defaultColorScheme]).forEach(([W, S]) => {
        M[W] = S;
      }),
      (M.generateThemeVars = G),
      (M.generateStyleSheets = q),
      (M.generateSpacing = function () {
        return Jb(m.spacing, ql(this));
      }),
      (M.getColorSchemeSelector = YM(d)),
      (M.spacing = M.generateSpacing()),
      (M.shouldSkipGeneratingVar = c),
      (M.unstable_sxConfig = {
        ...Ui,
        ...(m == null ? void 0 : m.unstable_sxConfig),
      }),
      (M.unstable_sx = function (S) {
        return Da({ sx: S, theme: this });
      }),
      (M.toRuntimeSource = w0),
      M
    );
  }
  function O0(e, n, a) {
    e.colorSchemes &&
      a &&
      (e.colorSchemes[n] = {
        ...(a !== !0 && a),
        palette: Cd({ ...(a === !0 ? {} : a.palette), mode: n }),
      });
  }
  function Od(e = {}, ...n) {
    const {
        palette: a,
        cssVariables: o = !1,
        colorSchemes: s = a ? void 0 : { light: !0 },
        defaultColorScheme: u = a == null ? void 0 : a.mode,
        ...c
      } = e,
      d = u || "light",
      h = s == null ? void 0 : s[d],
      m = {
        ...s,
        ...(a
          ? { [d]: { ...(typeof h != "boolean" && h), palette: a } }
          : void 0),
      };
    if (o === !1) {
      if (!("colorSchemes" in e)) return wd(e, ...n);
      let g = a;
      "palette" in e ||
        (m[d] &&
          (m[d] !== !0
            ? (g = m[d].palette)
            : d === "dark" && (g = { mode: "dark" })));
      const b = wd({ ...e, palette: g }, ...n);
      return (
        (b.defaultColorScheme = d),
        (b.colorSchemes = m),
        b.palette.mode === "light" &&
          ((b.colorSchemes.light = {
            ...(m.light !== !0 && m.light),
            palette: b.palette,
          }),
          O0(b, "dark", m.dark)),
        b.palette.mode === "dark" &&
          ((b.colorSchemes.dark = {
            ...(m.dark !== !0 && m.dark),
            palette: b.palette,
          }),
          O0(b, "light", m.light)),
        b
      );
    }
    return (
      !a && !("light" in m) && d === "light" && (m.light = !0),
      MD(
        {
          ...c,
          colorSchemes: m,
          defaultColorScheme: d,
          ...(typeof o != "boolean" && o),
        },
        ...n,
      )
    );
  }
  const Md = Od();
  function eu() {
    const e = pd(Md);
    return e[Sr] || e;
  }
  function M0(e) {
    return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
  }
  const Kn = (e) => M0(e) && e !== "classes",
    de = i0({ themeId: Sr, defaultTheme: Md, rootShouldForwardProp: Kn });
  function DD({ theme: e, ...n }) {
    const a = Sr in e ? e[Sr] : void 0;
    return P.jsx(p0, { ...n, themeId: a ? Sr : void 0, theme: a || e });
  }
  const tu = {
      colorSchemeStorageKey: "mui-color-scheme",
      defaultLightColorScheme: "light",
      defaultDarkColorScheme: "dark",
      modeStorageKey: "mui-mode",
    },
    { CssVarsProvider: ND } = qM({
      themeId: Sr,
      theme: () => Od({ cssVariables: !0 }),
      colorSchemeStorageKey: tu.colorSchemeStorageKey,
      modeStorageKey: tu.modeStorageKey,
      defaultColorScheme: {
        light: tu.defaultLightColorScheme,
        dark: tu.defaultDarkColorScheme,
      },
      resolveTheme: (e) => {
        const n = { ...e, typography: x0(e.palette, e.typography) };
        return (
          (n.unstable_sx = function (o) {
            return Da({ sx: o, theme: this });
          }),
          n
        );
      },
    }),
    kD = ND;
  function zD({ theme: e, ...n }) {
    const a = O.useMemo(() => {
      if (typeof e == "function") return e;
      const o = Sr in e ? e[Sr] : e;
      return "colorSchemes" in o
        ? null
        : "vars" in o
          ? e
          : { ...e, vars: null };
    }, [e]);
    return a ? P.jsx(DD, { theme: a, ...n }) : P.jsx(kD, { theme: e, ...n });
  }
  function D0(...e) {
    return e.reduce(
      (n, a) =>
        a == null
          ? n
          : function (...s) {
              (n.apply(this, s), a.apply(this, s));
            },
      () => {},
    );
  }
  function BD(e) {
    return P.jsx(lM, { ...e, defaultTheme: Md, themeId: Sr });
  }
  function Dd(e) {
    return function (a) {
      return P.jsx(BD, {
        styles: typeof e == "function" ? (o) => e({ theme: o, ...a }) : e,
      });
    };
  }
  function LD() {
    return t0;
  }
  const ht = BM;
  function Ye(e) {
    return zM(e);
  }
  function UD(e) {
    return Ve("MuiSvgIcon", e);
  }
  et("MuiSvgIcon", [
    "root",
    "colorPrimary",
    "colorSecondary",
    "colorAction",
    "colorError",
    "colorDisabled",
    "fontSizeInherit",
    "fontSizeSmall",
    "fontSizeMedium",
    "fontSizeLarge",
  ]);
  const jD = (e) => {
      const { color: n, fontSize: a, classes: o } = e,
        s = {
          root: [
            "root",
            n !== "inherit" && `color${_e(n)}`,
            `fontSize${_e(a)}`,
          ],
        };
      return Ke(s, UD, o);
    },
    $D = de("svg", {
      name: "MuiSvgIcon",
      slot: "Root",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [
          n.root,
          a.color !== "inherit" && n[`color${_e(a.color)}`],
          n[`fontSize${_e(a.fontSize)}`],
        ];
      },
    })(
      ht(({ theme: e }) => {
        var n, a, o, s, u, c, d, h, m, g, b, x, C, _;
        return {
          userSelect: "none",
          width: "1em",
          height: "1em",
          display: "inline-block",
          flexShrink: 0,
          transition:
            (s = (n = e.transitions) == null ? void 0 : n.create) == null
              ? void 0
              : s.call(n, "fill", {
                  duration:
                    (o =
                      (a = (e.vars ?? e).transitions) == null
                        ? void 0
                        : a.duration) == null
                      ? void 0
                      : o.shorter,
                }),
          variants: [
            { props: (v) => !v.hasSvgAsChild, style: { fill: "currentColor" } },
            { props: { fontSize: "inherit" }, style: { fontSize: "inherit" } },
            {
              props: { fontSize: "small" },
              style: {
                fontSize:
                  ((c = (u = e.typography) == null ? void 0 : u.pxToRem) == null
                    ? void 0
                    : c.call(u, 20)) || "1.25rem",
              },
            },
            {
              props: { fontSize: "medium" },
              style: {
                fontSize:
                  ((h = (d = e.typography) == null ? void 0 : d.pxToRem) == null
                    ? void 0
                    : h.call(d, 24)) || "1.5rem",
              },
            },
            {
              props: { fontSize: "large" },
              style: {
                fontSize:
                  ((g = (m = e.typography) == null ? void 0 : m.pxToRem) == null
                    ? void 0
                    : g.call(m, 35)) || "2.1875rem",
              },
            },
            ...Object.entries((e.vars ?? e).palette)
              .filter(([, v]) => v && v.main)
              .map(([v]) => {
                var E, w;
                return {
                  props: { color: v },
                  style: {
                    color:
                      (w =
                        (E = (e.vars ?? e).palette) == null ? void 0 : E[v]) ==
                      null
                        ? void 0
                        : w.main,
                  },
                };
              }),
            {
              props: { color: "action" },
              style: {
                color:
                  (x =
                    (b = (e.vars ?? e).palette) == null ? void 0 : b.action) ==
                  null
                    ? void 0
                    : x.active,
              },
            },
            {
              props: { color: "disabled" },
              style: {
                color:
                  (_ =
                    (C = (e.vars ?? e).palette) == null ? void 0 : C.action) ==
                  null
                    ? void 0
                    : _.disabled,
              },
            },
            { props: { color: "inherit" }, style: { color: void 0 } },
          ],
        };
      }),
    ),
    Nd = O.forwardRef(function (n, a) {
      const o = Ye({ props: n, name: "MuiSvgIcon" }),
        {
          children: s,
          className: u,
          color: c = "inherit",
          component: d = "svg",
          fontSize: h = "medium",
          htmlColor: m,
          inheritViewBox: g = !1,
          titleAccess: b,
          viewBox: x = "0 0 24 24",
          ...C
        } = o,
        _ = O.isValidElement(s) && s.type === "svg",
        v = {
          ...o,
          color: c,
          component: d,
          fontSize: h,
          instanceFontSize: n.fontSize,
          inheritViewBox: g,
          viewBox: x,
          hasSvgAsChild: _,
        },
        E = {};
      g || (E.viewBox = x);
      const w = jD(v);
      return P.jsxs($D, {
        as: d,
        className: Te(w.root, u),
        focusable: "false",
        color: m,
        "aria-hidden": b ? void 0 : !0,
        role: b ? "img" : void 0,
        ref: a,
        ...E,
        ...C,
        ...(_ && s.props),
        ownerState: v,
        children: [
          _ ? s.props.children : s,
          b ? P.jsx("title", { children: b }) : null,
        ],
      });
    });
  Nd.muiName = "SvgIcon";
  function N0(e, n) {
    function a(o, s) {
      return P.jsx(Nd, { "data-testid": void 0, ref: s, ...o, children: e });
    }
    return ((a.muiName = Nd.muiName), O.memo(O.forwardRef(a)));
  }
  function k0(e, n = 166) {
    let a;
    function o(...s) {
      const u = () => {
        e.apply(this, s);
      };
      (clearTimeout(a), (a = setTimeout(u, n)));
    }
    return (
      (o.clear = () => {
        clearTimeout(a);
      }),
      o
    );
  }
  function Yn(e) {
    return (e && e.ownerDocument) || document;
  }
  function _r(e) {
    return Yn(e).defaultView || window;
  }
  function z0(e, n) {
    typeof e == "function" ? e(n) : e && (e.current = n);
  }
  let B0 = 0;
  function ID(e) {
    const [n, a] = O.useState(e),
      o = e || n;
    return (
      O.useEffect(() => {
        n == null && ((B0 += 1), a(`mui-${B0}`));
      }, [n]),
      o
    );
  }
  const L0 = { ...Uc }.useId;
  function nu(e) {
    if (L0 !== void 0) {
      const n = L0();
      return e ?? n;
    }
    return ID(e);
  }
  function U0(e) {
    const { controlled: n, default: a, name: o, state: s = "value" } = e,
      { current: u } = O.useRef(n !== void 0),
      [c, d] = O.useState(a),
      h = u ? n : c,
      m = O.useCallback((g) => {
        u || d(g);
      }, []);
    return [h, m];
  }
  function Na(e) {
    const n = O.useRef(e);
    return (
      qr(() => {
        n.current = e;
      }),
      O.useRef((...a) => (0, n.current)(...a)).current
    );
  }
  function cn(...e) {
    const n = O.useRef(void 0),
      a = O.useCallback((o) => {
        const s = e.map((u) => {
          if (u == null) return null;
          if (typeof u == "function") {
            const c = u,
              d = c(o);
            return typeof d == "function"
              ? d
              : () => {
                  c(null);
                };
          }
          return (
            (u.current = o),
            () => {
              u.current = null;
            }
          );
        });
        return () => {
          s.forEach((u) => (u == null ? void 0 : u()));
        };
      }, e);
    return O.useMemo(
      () =>
        e.every((o) => o == null)
          ? null
          : (o) => {
              (n.current && (n.current(), (n.current = void 0)),
                o != null && (n.current = a(o)));
            },
      e,
    );
  }
  function HD(e, n) {
    const a = e.charCodeAt(2);
    return (
      e[0] === "o" &&
      e[1] === "n" &&
      a >= 65 &&
      a <= 90 &&
      typeof n == "function"
    );
  }
  function PD(e, n) {
    if (!e) return n;
    function a(c, d) {
      const h = {};
      return (
        Object.keys(d).forEach((m) => {
          HD(m, d[m]) &&
            typeof c[m] == "function" &&
            (h[m] = (...g) => {
              (c[m](...g), d[m](...g));
            });
        }),
        h
      );
    }
    if (typeof e == "function" || typeof n == "function")
      return (c) => {
        const d = typeof n == "function" ? n(c) : n,
          h = typeof e == "function" ? e({ ...c, ...d }) : e,
          m = Te(
            c == null ? void 0 : c.className,
            d == null ? void 0 : d.className,
            h == null ? void 0 : h.className,
          ),
          g = a(h, d);
        return {
          ...d,
          ...h,
          ...g,
          ...(!!m && { className: m }),
          ...((d == null ? void 0 : d.style) &&
            (h == null ? void 0 : h.style) && {
              style: { ...d.style, ...h.style },
            }),
          ...((d == null ? void 0 : d.sx) &&
            (h == null ? void 0 : h.sx) && {
              sx: [
                ...(Array.isArray(d.sx) ? d.sx : [d.sx]),
                ...(Array.isArray(h.sx) ? h.sx : [h.sx]),
              ],
            }),
        };
      };
    const o = n,
      s = a(e, o),
      u = Te(
        o == null ? void 0 : o.className,
        e == null ? void 0 : e.className,
      );
    return {
      ...n,
      ...e,
      ...s,
      ...(!!u && { className: u }),
      ...((o == null ? void 0 : o.style) &&
        (e == null ? void 0 : e.style) && {
          style: { ...o.style, ...e.style },
        }),
      ...((o == null ? void 0 : o.sx) &&
        (e == null ? void 0 : e.sx) && {
          sx: [
            ...(Array.isArray(o.sx) ? o.sx : [o.sx]),
            ...(Array.isArray(e.sx) ? e.sx : [e.sx]),
          ],
        }),
    };
  }
  function j0(e, n) {
    if (e == null) return {};
    var a = {};
    for (var o in e)
      if ({}.hasOwnProperty.call(e, o)) {
        if (n.indexOf(o) !== -1) continue;
        a[o] = e[o];
      }
    return a;
  }
  function kd(e, n) {
    return (
      (kd = Object.setPrototypeOf
        ? Object.setPrototypeOf.bind()
        : function (a, o) {
            return ((a.__proto__ = o), a);
          }),
      kd(e, n)
    );
  }
  function $0(e, n) {
    ((e.prototype = Object.create(n.prototype)),
      (e.prototype.constructor = e),
      kd(e, n));
  }
  var zd = { exports: {} },
    Zt = {};
  /**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var I0;
  function qD() {
    if (I0) return Zt;
    I0 = 1;
    var e = Lc();
    function n(h) {
      var m = "https://react.dev/errors/" + h;
      if (1 < arguments.length) {
        m += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var g = 2; g < arguments.length; g++)
          m += "&args[]=" + encodeURIComponent(arguments[g]);
      }
      return (
        "Minified React error #" +
        h +
        "; visit " +
        m +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      );
    }
    function a() {}
    var o = {
        d: {
          f: a,
          r: function () {
            throw Error(n(522));
          },
          D: a,
          C: a,
          L: a,
          m: a,
          X: a,
          S: a,
          M: a,
        },
        p: 0,
        findDOMNode: null,
      },
      s = Symbol.for("react.portal");
    function u(h, m, g) {
      var b =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: s,
        key: b == null ? null : "" + b,
        children: h,
        containerInfo: m,
        implementation: g,
      };
    }
    var c = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function d(h, m) {
      if (h === "font") return "";
      if (typeof m == "string") return m === "use-credentials" ? m : "";
    }
    return (
      (Zt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
      (Zt.createPortal = function (h, m) {
        var g =
          2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!m || (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11))
          throw Error(n(299));
        return u(h, m, null, g);
      }),
      (Zt.flushSync = function (h) {
        var m = c.T,
          g = o.p;
        try {
          if (((c.T = null), (o.p = 2), h)) return h();
        } finally {
          ((c.T = m), (o.p = g), o.d.f());
        }
      }),
      (Zt.preconnect = function (h, m) {
        typeof h == "string" &&
          (m
            ? ((m = m.crossOrigin),
              (m =
                typeof m == "string"
                  ? m === "use-credentials"
                    ? m
                    : ""
                  : void 0))
            : (m = null),
          o.d.C(h, m));
      }),
      (Zt.prefetchDNS = function (h) {
        typeof h == "string" && o.d.D(h);
      }),
      (Zt.preinit = function (h, m) {
        if (typeof h == "string" && m && typeof m.as == "string") {
          var g = m.as,
            b = d(g, m.crossOrigin),
            x = typeof m.integrity == "string" ? m.integrity : void 0,
            C = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
          g === "style"
            ? o.d.S(
                h,
                typeof m.precedence == "string" ? m.precedence : void 0,
                { crossOrigin: b, integrity: x, fetchPriority: C },
              )
            : g === "script" &&
              o.d.X(h, {
                crossOrigin: b,
                integrity: x,
                fetchPriority: C,
                nonce: typeof m.nonce == "string" ? m.nonce : void 0,
              });
        }
      }),
      (Zt.preinitModule = function (h, m) {
        if (typeof h == "string")
          if (typeof m == "object" && m !== null) {
            if (m.as == null || m.as === "script") {
              var g = d(m.as, m.crossOrigin);
              o.d.M(h, {
                crossOrigin: g,
                integrity:
                  typeof m.integrity == "string" ? m.integrity : void 0,
                nonce: typeof m.nonce == "string" ? m.nonce : void 0,
              });
            }
          } else m == null && o.d.M(h);
      }),
      (Zt.preload = function (h, m) {
        if (
          typeof h == "string" &&
          typeof m == "object" &&
          m !== null &&
          typeof m.as == "string"
        ) {
          var g = m.as,
            b = d(g, m.crossOrigin);
          o.d.L(h, g, {
            crossOrigin: b,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
            nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            type: typeof m.type == "string" ? m.type : void 0,
            fetchPriority:
              typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
            referrerPolicy:
              typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
            imageSrcSet:
              typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
            imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
            media: typeof m.media == "string" ? m.media : void 0,
          });
        }
      }),
      (Zt.preloadModule = function (h, m) {
        if (typeof h == "string")
          if (m) {
            var g = d(m.as, m.crossOrigin);
            o.d.m(h, {
              as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
              crossOrigin: g,
              integrity: typeof m.integrity == "string" ? m.integrity : void 0,
            });
          } else o.d.m(h);
      }),
      (Zt.requestFormReset = function (h) {
        o.d.r(h);
      }),
      (Zt.unstable_batchedUpdates = function (h, m) {
        return h(m);
      }),
      (Zt.useFormState = function (h, m, g) {
        return c.H.useFormState(h, m, g);
      }),
      (Zt.useFormStatus = function () {
        return c.H.useHostTransitionStatus();
      }),
      (Zt.version = "19.1.0"),
      Zt
    );
  }
  var H0;
  function P0() {
    if (H0) return zd.exports;
    H0 = 1;
    function e() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
        } catch (n) {
          console.error(n);
        }
    }
    return (e(), (zd.exports = qD()), zd.exports);
  }
  var q0 = P0();
  const ru = di(q0),
    F0 = { disabled: !1 },
    au = er.createContext(null);
  var FD = function (n) {
      return n.scrollTop;
    },
    Hi = "unmounted",
    ka = "exited",
    za = "entering",
    _o = "entered",
    Bd = "exiting",
    lr = (function (e) {
      $0(n, e);
      function n(o, s) {
        var u;
        u = e.call(this, o, s) || this;
        var c = s,
          d = c && !c.isMounting ? o.enter : o.appear,
          h;
        return (
          (u.appearStatus = null),
          o.in
            ? d
              ? ((h = ka), (u.appearStatus = za))
              : (h = _o)
            : o.unmountOnExit || o.mountOnEnter
              ? (h = Hi)
              : (h = ka),
          (u.state = { status: h }),
          (u.nextCallback = null),
          u
        );
      }
      n.getDerivedStateFromProps = function (s, u) {
        var c = s.in;
        return c && u.status === Hi ? { status: ka } : null;
      };
      var a = n.prototype;
      return (
        (a.componentDidMount = function () {
          this.updateStatus(!0, this.appearStatus);
        }),
        (a.componentDidUpdate = function (s) {
          var u = null;
          if (s !== this.props) {
            var c = this.state.status;
            this.props.in
              ? c !== za && c !== _o && (u = za)
              : (c === za || c === _o) && (u = Bd);
          }
          this.updateStatus(!1, u);
        }),
        (a.componentWillUnmount = function () {
          this.cancelNextCallback();
        }),
        (a.getTimeouts = function () {
          var s = this.props.timeout,
            u,
            c,
            d;
          return (
            (u = c = d = s),
            s != null &&
              typeof s != "number" &&
              ((u = s.exit),
              (c = s.enter),
              (d = s.appear !== void 0 ? s.appear : c)),
            { exit: u, enter: c, appear: d }
          );
        }),
        (a.updateStatus = function (s, u) {
          if ((s === void 0 && (s = !1), u !== null))
            if ((this.cancelNextCallback(), u === za)) {
              if (this.props.unmountOnExit || this.props.mountOnEnter) {
                var c = this.props.nodeRef
                  ? this.props.nodeRef.current
                  : ru.findDOMNode(this);
                c && FD(c);
              }
              this.performEnter(s);
            } else this.performExit();
          else
            this.props.unmountOnExit &&
              this.state.status === ka &&
              this.setState({ status: Hi });
        }),
        (a.performEnter = function (s) {
          var u = this,
            c = this.props.enter,
            d = this.context ? this.context.isMounting : s,
            h = this.props.nodeRef ? [d] : [ru.findDOMNode(this), d],
            m = h[0],
            g = h[1],
            b = this.getTimeouts(),
            x = d ? b.appear : b.enter;
          if ((!s && !c) || F0.disabled) {
            this.safeSetState({ status: _o }, function () {
              u.props.onEntered(m);
            });
            return;
          }
          (this.props.onEnter(m, g),
            this.safeSetState({ status: za }, function () {
              (u.props.onEntering(m, g),
                u.onTransitionEnd(x, function () {
                  u.safeSetState({ status: _o }, function () {
                    u.props.onEntered(m, g);
                  });
                }));
            }));
        }),
        (a.performExit = function () {
          var s = this,
            u = this.props.exit,
            c = this.getTimeouts(),
            d = this.props.nodeRef ? void 0 : ru.findDOMNode(this);
          if (!u || F0.disabled) {
            this.safeSetState({ status: ka }, function () {
              s.props.onExited(d);
            });
            return;
          }
          (this.props.onExit(d),
            this.safeSetState({ status: Bd }, function () {
              (s.props.onExiting(d),
                s.onTransitionEnd(c.exit, function () {
                  s.safeSetState({ status: ka }, function () {
                    s.props.onExited(d);
                  });
                }));
            }));
        }),
        (a.cancelNextCallback = function () {
          this.nextCallback !== null &&
            (this.nextCallback.cancel(), (this.nextCallback = null));
        }),
        (a.safeSetState = function (s, u) {
          ((u = this.setNextCallback(u)), this.setState(s, u));
        }),
        (a.setNextCallback = function (s) {
          var u = this,
            c = !0;
          return (
            (this.nextCallback = function (d) {
              c && ((c = !1), (u.nextCallback = null), s(d));
            }),
            (this.nextCallback.cancel = function () {
              c = !1;
            }),
            this.nextCallback
          );
        }),
        (a.onTransitionEnd = function (s, u) {
          this.setNextCallback(u);
          var c = this.props.nodeRef
              ? this.props.nodeRef.current
              : ru.findDOMNode(this),
            d = s == null && !this.props.addEndListener;
          if (!c || d) {
            setTimeout(this.nextCallback, 0);
            return;
          }
          if (this.props.addEndListener) {
            var h = this.props.nodeRef
                ? [this.nextCallback]
                : [c, this.nextCallback],
              m = h[0],
              g = h[1];
            this.props.addEndListener(m, g);
          }
          s != null && setTimeout(this.nextCallback, s);
        }),
        (a.render = function () {
          var s = this.state.status;
          if (s === Hi) return null;
          var u = this.props,
            c = u.children;
          (u.in,
            u.mountOnEnter,
            u.unmountOnExit,
            u.appear,
            u.enter,
            u.exit,
            u.timeout,
            u.addEndListener,
            u.onEnter,
            u.onEntering,
            u.onEntered,
            u.onExit,
            u.onExiting,
            u.onExited,
            u.nodeRef);
          var d = j0(u, [
            "children",
            "in",
            "mountOnEnter",
            "unmountOnExit",
            "appear",
            "enter",
            "exit",
            "timeout",
            "addEndListener",
            "onEnter",
            "onEntering",
            "onEntered",
            "onExit",
            "onExiting",
            "onExited",
            "nodeRef",
          ]);
          return er.createElement(
            au.Provider,
            { value: null },
            typeof c == "function"
              ? c(s, d)
              : er.cloneElement(er.Children.only(c), d),
          );
        }),
        n
      );
    })(er.Component);
  ((lr.contextType = au), (lr.propTypes = {}));
  function To() {}
  ((lr.defaultProps = {
    in: !1,
    mountOnEnter: !1,
    unmountOnExit: !1,
    appear: !1,
    enter: !0,
    exit: !0,
    onEnter: To,
    onEntering: To,
    onEntered: To,
    onExit: To,
    onExiting: To,
    onExited: To,
  }),
    (lr.UNMOUNTED = Hi),
    (lr.EXITED = ka),
    (lr.ENTERING = za),
    (lr.ENTERED = _o),
    (lr.EXITING = Bd));
  function GD(e) {
    if (e === void 0)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return e;
  }
  function Ld(e, n) {
    var a = function (u) {
        return n && O.isValidElement(u) ? n(u) : u;
      },
      o = Object.create(null);
    return (
      e &&
        O.Children.map(e, function (s) {
          return s;
        }).forEach(function (s) {
          o[s.key] = a(s);
        }),
      o
    );
  }
  function VD(e, n) {
    ((e = e || {}), (n = n || {}));
    function a(g) {
      return g in n ? n[g] : e[g];
    }
    var o = Object.create(null),
      s = [];
    for (var u in e) u in n ? s.length && ((o[u] = s), (s = [])) : s.push(u);
    var c,
      d = {};
    for (var h in n) {
      if (o[h])
        for (c = 0; c < o[h].length; c++) {
          var m = o[h][c];
          d[o[h][c]] = a(m);
        }
      d[h] = a(h);
    }
    for (c = 0; c < s.length; c++) d[s[c]] = a(s[c]);
    return d;
  }
  function Ba(e, n, a) {
    return a[n] != null ? a[n] : e.props[n];
  }
  function KD(e, n) {
    return Ld(e.children, function (a) {
      return O.cloneElement(a, {
        onExited: n.bind(null, a),
        in: !0,
        appear: Ba(a, "appear", e),
        enter: Ba(a, "enter", e),
        exit: Ba(a, "exit", e),
      });
    });
  }
  function YD(e, n, a) {
    var o = Ld(e.children),
      s = VD(n, o);
    return (
      Object.keys(s).forEach(function (u) {
        var c = s[u];
        if (O.isValidElement(c)) {
          var d = u in n,
            h = u in o,
            m = n[u],
            g = O.isValidElement(m) && !m.props.in;
          h && (!d || g)
            ? (s[u] = O.cloneElement(c, {
                onExited: a.bind(null, c),
                in: !0,
                exit: Ba(c, "exit", e),
                enter: Ba(c, "enter", e),
              }))
            : !h && d && !g
              ? (s[u] = O.cloneElement(c, { in: !1 }))
              : h &&
                d &&
                O.isValidElement(m) &&
                (s[u] = O.cloneElement(c, {
                  onExited: a.bind(null, c),
                  in: m.props.in,
                  exit: Ba(c, "exit", e),
                  enter: Ba(c, "enter", e),
                }));
        }
      }),
      s
    );
  }
  var XD =
      Object.values ||
      function (e) {
        return Object.keys(e).map(function (n) {
          return e[n];
        });
      },
    WD = {
      component: "div",
      childFactory: function (n) {
        return n;
      },
    },
    Ud = (function (e) {
      $0(n, e);
      function n(o, s) {
        var u;
        u = e.call(this, o, s) || this;
        var c = u.handleExited.bind(GD(u));
        return (
          (u.state = {
            contextValue: { isMounting: !0 },
            handleExited: c,
            firstRender: !0,
          }),
          u
        );
      }
      var a = n.prototype;
      return (
        (a.componentDidMount = function () {
          ((this.mounted = !0),
            this.setState({ contextValue: { isMounting: !1 } }));
        }),
        (a.componentWillUnmount = function () {
          this.mounted = !1;
        }),
        (n.getDerivedStateFromProps = function (s, u) {
          var c = u.children,
            d = u.handleExited,
            h = u.firstRender;
          return { children: h ? KD(s, d) : YD(s, c, d), firstRender: !1 };
        }),
        (a.handleExited = function (s, u) {
          var c = Ld(this.props.children);
          s.key in c ||
            (s.props.onExited && s.props.onExited(u),
            this.mounted &&
              this.setState(function (d) {
                var h = Dl({}, d.children);
                return (delete h[s.key], { children: h });
              }));
        }),
        (a.render = function () {
          var s = this.props,
            u = s.component,
            c = s.childFactory,
            d = j0(s, ["component", "childFactory"]),
            h = this.state.contextValue,
            m = XD(this.state.children).map(c);
          return (
            delete d.appear,
            delete d.enter,
            delete d.exit,
            u === null
              ? er.createElement(au.Provider, { value: h }, m)
              : er.createElement(
                  au.Provider,
                  { value: h },
                  er.createElement(u, d, m),
                )
          );
        }),
        n
      );
    })(er.Component);
  ((Ud.propTypes = {}), (Ud.defaultProps = WD));
  const G0 = {};
  function V0(e, n) {
    const a = O.useRef(G0);
    return (a.current === G0 && (a.current = e(n)), a);
  }
  const QD = [];
  function ZD(e) {
    O.useEffect(e, QD);
  }
  class jd {
    constructor() {
      Jn(this, "currentId", null);
      Jn(this, "clear", () => {
        this.currentId !== null &&
          (clearTimeout(this.currentId), (this.currentId = null));
      });
      Jn(this, "disposeEffect", () => this.clear);
    }
    static create() {
      return new jd();
    }
    start(n, a) {
      (this.clear(),
        (this.currentId = setTimeout(() => {
          ((this.currentId = null), a());
        }, n)));
    }
  }
  function K0() {
    const e = V0(jd.create).current;
    return (ZD(e.disposeEffect), e);
  }
  const Y0 = (e) => e.scrollTop;
  function ou(e, n) {
    const { timeout: a, easing: o, style: s = {} } = e;
    return {
      duration:
        s.transitionDuration ?? (typeof a == "number" ? a : a[n.mode] || 0),
      easing:
        s.transitionTimingFunction ?? (typeof o == "object" ? o[n.mode] : o),
      delay: s.transitionDelay,
    };
  }
  function JD(e) {
    return Ve("MuiPaper", e);
  }
  et("MuiPaper", [
    "root",
    "rounded",
    "outlined",
    "elevation",
    "elevation0",
    "elevation1",
    "elevation2",
    "elevation3",
    "elevation4",
    "elevation5",
    "elevation6",
    "elevation7",
    "elevation8",
    "elevation9",
    "elevation10",
    "elevation11",
    "elevation12",
    "elevation13",
    "elevation14",
    "elevation15",
    "elevation16",
    "elevation17",
    "elevation18",
    "elevation19",
    "elevation20",
    "elevation21",
    "elevation22",
    "elevation23",
    "elevation24",
  ]);
  const eN = (e) => {
      const { square: n, elevation: a, variant: o, classes: s } = e,
        u = {
          root: [
            "root",
            o,
            !n && "rounded",
            o === "elevation" && `elevation${a}`,
          ],
        };
      return Ke(u, JD, s);
    },
    tN = de("div", {
      name: "MuiPaper",
      slot: "Root",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [
          n.root,
          n[a.variant],
          !a.square && n.rounded,
          a.variant === "elevation" && n[`elevation${a.elevation}`],
        ];
      },
    })(
      ht(({ theme: e }) => ({
        backgroundColor: (e.vars || e).palette.background.paper,
        color: (e.vars || e).palette.text.primary,
        transition: e.transitions.create("box-shadow"),
        variants: [
          {
            props: ({ ownerState: n }) => !n.square,
            style: { borderRadius: e.shape.borderRadius },
          },
          {
            props: { variant: "outlined" },
            style: { border: `1px solid ${(e.vars || e).palette.divider}` },
          },
          {
            props: { variant: "elevation" },
            style: {
              boxShadow: "var(--Paper-shadow)",
              backgroundImage: "var(--Paper-overlay)",
            },
          },
        ],
      })),
    ),
    $d = O.forwardRef(function (n, a) {
      var C;
      const o = Ye({ props: n, name: "MuiPaper" }),
        s = eu(),
        {
          className: u,
          component: c = "div",
          elevation: d = 1,
          square: h = !1,
          variant: m = "elevation",
          ...g
        } = o,
        b = { ...o, component: c, elevation: d, square: h, variant: m },
        x = eN(b);
      return P.jsx(tN, {
        as: c,
        ownerState: b,
        className: Te(x.root, u),
        ref: a,
        ...g,
        style: {
          ...(m === "elevation" && {
            "--Paper-shadow": (s.vars || s).shadows[d],
            ...(s.vars && {
              "--Paper-overlay": (C = s.vars.overlays) == null ? void 0 : C[d],
            }),
            ...(!s.vars &&
              s.palette.mode === "dark" && {
                "--Paper-overlay": `linear-gradient(${Gr("#fff", Rd(d))}, ${Gr("#fff", Rd(d))})`,
              }),
          }),
          ...g.style,
        },
      });
    });
  function nN(e) {
    return typeof e == "string";
  }
  function X0(e, n, a) {
    return e === void 0 || nN(e)
      ? n
      : { ...n, ownerState: { ...n.ownerState, ...a } };
  }
  function W0(e, n, a) {
    return typeof e == "function" ? e(n, a) : e;
  }
  function Q0(e, n = []) {
    if (e === void 0) return {};
    const a = {};
    return (
      Object.keys(e)
        .filter(
          (o) =>
            o.match(/^on[A-Z]/) && typeof e[o] == "function" && !n.includes(o),
        )
        .forEach((o) => {
          a[o] = e[o];
        }),
      a
    );
  }
  function Z0(e) {
    if (e === void 0) return {};
    const n = {};
    return (
      Object.keys(e)
        .filter((a) => !(a.match(/^on[A-Z]/) && typeof e[a] == "function"))
        .forEach((a) => {
          n[a] = e[a];
        }),
      n
    );
  }
  function J0(e) {
    const {
      getSlotProps: n,
      additionalProps: a,
      externalSlotProps: o,
      externalForwardedProps: s,
      className: u,
    } = e;
    if (!n) {
      const C = Te(
          a == null ? void 0 : a.className,
          u,
          s == null ? void 0 : s.className,
          o == null ? void 0 : o.className,
        ),
        _ = {
          ...(a == null ? void 0 : a.style),
          ...(s == null ? void 0 : s.style),
          ...(o == null ? void 0 : o.style),
        },
        v = { ...a, ...s, ...o };
      return (
        C.length > 0 && (v.className = C),
        Object.keys(_).length > 0 && (v.style = _),
        { props: v, internalRef: void 0 }
      );
    }
    const c = Q0({ ...s, ...o }),
      d = Z0(o),
      h = Z0(s),
      m = n(c),
      g = Te(
        m == null ? void 0 : m.className,
        a == null ? void 0 : a.className,
        u,
        s == null ? void 0 : s.className,
        o == null ? void 0 : o.className,
      ),
      b = {
        ...(m == null ? void 0 : m.style),
        ...(a == null ? void 0 : a.style),
        ...(s == null ? void 0 : s.style),
        ...(o == null ? void 0 : o.style),
      },
      x = { ...m, ...a, ...h, ...d };
    return (
      g.length > 0 && (x.className = g),
      Object.keys(b).length > 0 && (x.style = b),
      { props: x, internalRef: m.ref }
    );
  }
  function Rt(e, n) {
    const {
        className: a,
        elementType: o,
        ownerState: s,
        externalForwardedProps: u,
        internalForwardedProps: c,
        shouldForwardComponentProp: d = !1,
        ...h
      } = n,
      {
        component: m,
        slots: g = { [e]: void 0 },
        slotProps: b = { [e]: void 0 },
        ...x
      } = u,
      C = g[e] || o,
      _ = W0(b[e], s),
      {
        props: { component: v, ...E },
        internalRef: w,
      } = J0({
        className: a,
        ...h,
        externalForwardedProps: e === "root" ? x : void 0,
        externalSlotProps: _,
      }),
      D = cn(w, _ == null ? void 0 : _.ref, n.ref),
      R = e === "root" ? v || m : v,
      M = X0(
        C,
        {
          ...(e === "root" && !m && !g[e] && c),
          ...(e !== "root" && !g[e] && c),
          ...E,
          ...(R && !d && { as: R }),
          ...(R && d && { component: R }),
          ref: D,
        },
        s,
      );
    return [C, M];
  }
  function ev(e) {
    try {
      return e.matches(":focus-visible");
    } catch {}
    return !1;
  }
  class iu {
    constructor() {
      Jn(this, "mountEffect", () => {
        this.shouldMount &&
          !this.didMount &&
          this.ref.current !== null &&
          ((this.didMount = !0), this.mounted.resolve());
      });
      ((this.ref = { current: null }),
        (this.mounted = null),
        (this.didMount = !1),
        (this.shouldMount = !1),
        (this.setShouldMount = null));
    }
    static create() {
      return new iu();
    }
    static use() {
      const n = V0(iu.create).current,
        [a, o] = O.useState(!1);
      return (
        (n.shouldMount = a),
        (n.setShouldMount = o),
        O.useEffect(n.mountEffect, [a]),
        n
      );
    }
    mount() {
      return (
        this.mounted ||
          ((this.mounted = aN()),
          (this.shouldMount = !0),
          this.setShouldMount(this.shouldMount)),
        this.mounted
      );
    }
    start(...n) {
      this.mount().then(() => {
        var a;
        return (a = this.ref.current) == null ? void 0 : a.start(...n);
      });
    }
    stop(...n) {
      this.mount().then(() => {
        var a;
        return (a = this.ref.current) == null ? void 0 : a.stop(...n);
      });
    }
    pulsate(...n) {
      this.mount().then(() => {
        var a;
        return (a = this.ref.current) == null ? void 0 : a.pulsate(...n);
      });
    }
  }
  function rN() {
    return iu.use();
  }
  function aN() {
    let e, n;
    const a = new Promise((o, s) => {
      ((e = o), (n = s));
    });
    return ((a.resolve = e), (a.reject = n), a);
  }
  function oN(e) {
    const {
        className: n,
        classes: a,
        pulsate: o = !1,
        rippleX: s,
        rippleY: u,
        rippleSize: c,
        in: d,
        onExited: h,
        timeout: m,
      } = e,
      [g, b] = O.useState(!1),
      x = Te(n, a.ripple, a.rippleVisible, o && a.ripplePulsate),
      C = { width: c, height: c, top: -(c / 2) + u, left: -(c / 2) + s },
      _ = Te(a.child, g && a.childLeaving, o && a.childPulsate);
    return (
      !d && !g && b(!0),
      O.useEffect(() => {
        if (!d && h != null) {
          const v = setTimeout(h, m);
          return () => {
            clearTimeout(v);
          };
        }
      }, [h, d, m]),
      P.jsx("span", {
        className: x,
        style: C,
        children: P.jsx("span", { className: _ }),
      })
    );
  }
  const kn = et("MuiTouchRipple", [
      "root",
      "ripple",
      "rippleVisible",
      "ripplePulsate",
      "child",
      "childLeaving",
      "childPulsate",
    ]),
    Id = 550,
    iN = 80,
    sN = zi`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,
    lN = zi`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,
    uN = zi`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,
    cN = de("span", { name: "MuiTouchRipple", slot: "Root" })({
      overflow: "hidden",
      pointerEvents: "none",
      position: "absolute",
      zIndex: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      borderRadius: "inherit",
    }),
    fN = de(oN, { name: "MuiTouchRipple", slot: "Ripple" })`
  opacity: 0;
  position: absolute;

  &.${kn.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${sN};
    animation-duration: ${Id}ms;
    animation-timing-function: ${({ theme: e }) => e.transitions.easing.easeInOut};
  }

  &.${kn.ripplePulsate} {
    animation-duration: ${({ theme: e }) => e.transitions.duration.shorter}ms;
  }

  & .${kn.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${kn.childLeaving} {
    opacity: 0;
    animation-name: ${lN};
    animation-duration: ${Id}ms;
    animation-timing-function: ${({ theme: e }) => e.transitions.easing.easeInOut};
  }

  & .${kn.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${uN};
    animation-duration: 2500ms;
    animation-timing-function: ${({ theme: e }) => e.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,
    dN = O.forwardRef(function (n, a) {
      const o = Ye({ props: n, name: "MuiTouchRipple" }),
        { center: s = !1, classes: u = {}, className: c, ...d } = o,
        [h, m] = O.useState([]),
        g = O.useRef(0),
        b = O.useRef(null);
      O.useEffect(() => {
        b.current && (b.current(), (b.current = null));
      }, [h]);
      const x = O.useRef(!1),
        C = K0(),
        _ = O.useRef(null),
        v = O.useRef(null),
        E = O.useCallback(
          (M) => {
            const {
              pulsate: A,
              rippleX: L,
              rippleY: G,
              rippleSize: q,
              cb: W,
            } = M;
            (m((S) => [
              ...S,
              P.jsx(
                fN,
                {
                  classes: {
                    ripple: Te(u.ripple, kn.ripple),
                    rippleVisible: Te(u.rippleVisible, kn.rippleVisible),
                    ripplePulsate: Te(u.ripplePulsate, kn.ripplePulsate),
                    child: Te(u.child, kn.child),
                    childLeaving: Te(u.childLeaving, kn.childLeaving),
                    childPulsate: Te(u.childPulsate, kn.childPulsate),
                  },
                  timeout: Id,
                  pulsate: A,
                  rippleX: L,
                  rippleY: G,
                  rippleSize: q,
                },
                g.current,
              ),
            ]),
              (g.current += 1),
              (b.current = W));
          },
          [u],
        ),
        w = O.useCallback(
          (M = {}, A = {}, L = () => {}) => {
            const {
              pulsate: G = !1,
              center: q = s || A.pulsate,
              fakeElement: W = !1,
            } = A;
            if ((M == null ? void 0 : M.type) === "mousedown" && x.current) {
              x.current = !1;
              return;
            }
            (M == null ? void 0 : M.type) === "touchstart" && (x.current = !0);
            const S = W ? null : v.current,
              I = S
                ? S.getBoundingClientRect()
                : { width: 0, height: 0, left: 0, top: 0 };
            let X, oe, se;
            if (
              q ||
              M === void 0 ||
              (M.clientX === 0 && M.clientY === 0) ||
              (!M.clientX && !M.touches)
            )
              ((X = Math.round(I.width / 2)), (oe = Math.round(I.height / 2)));
            else {
              const { clientX: J, clientY: z } =
                M.touches && M.touches.length > 0 ? M.touches[0] : M;
              ((X = Math.round(J - I.left)), (oe = Math.round(z - I.top)));
            }
            if (q)
              ((se = Math.sqrt((2 * I.width ** 2 + I.height ** 2) / 3)),
                se % 2 === 0 && (se += 1));
            else {
              const J =
                  Math.max(Math.abs((S ? S.clientWidth : 0) - X), X) * 2 + 2,
                z =
                  Math.max(Math.abs((S ? S.clientHeight : 0) - oe), oe) * 2 + 2;
              se = Math.sqrt(J ** 2 + z ** 2);
            }
            M != null && M.touches
              ? _.current === null &&
                ((_.current = () => {
                  E({
                    pulsate: G,
                    rippleX: X,
                    rippleY: oe,
                    rippleSize: se,
                    cb: L,
                  });
                }),
                C.start(iN, () => {
                  _.current && (_.current(), (_.current = null));
                }))
              : E({
                  pulsate: G,
                  rippleX: X,
                  rippleY: oe,
                  rippleSize: se,
                  cb: L,
                });
          },
          [s, E, C],
        ),
        D = O.useCallback(() => {
          w({}, { pulsate: !0 });
        }, [w]),
        R = O.useCallback(
          (M, A) => {
            if (
              (C.clear(),
              (M == null ? void 0 : M.type) === "touchend" && _.current)
            ) {
              (_.current(),
                (_.current = null),
                C.start(0, () => {
                  R(M, A);
                }));
              return;
            }
            ((_.current = null),
              m((L) => (L.length > 0 ? L.slice(1) : L)),
              (b.current = A));
          },
          [C],
        );
      return (
        O.useImperativeHandle(a, () => ({ pulsate: D, start: w, stop: R }), [
          D,
          w,
          R,
        ]),
        P.jsx(cN, {
          className: Te(kn.root, u.root, c),
          ref: v,
          ...d,
          children: P.jsx(Ud, { component: null, exit: !0, children: h }),
        })
      );
    });
  function pN(e) {
    return Ve("MuiButtonBase", e);
  }
  const hN = et("MuiButtonBase", ["root", "disabled", "focusVisible"]),
    mN = (e) => {
      const {
          disabled: n,
          focusVisible: a,
          focusVisibleClassName: o,
          classes: s,
        } = e,
        c = Ke({ root: ["root", n && "disabled", a && "focusVisible"] }, pN, s);
      return (a && o && (c.root += ` ${o}`), c);
    },
    gN = de("button", { name: "MuiButtonBase", slot: "Root" })({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      boxSizing: "border-box",
      WebkitTapHighlightColor: "transparent",
      backgroundColor: "transparent",
      outline: 0,
      border: 0,
      margin: 0,
      borderRadius: 0,
      padding: 0,
      cursor: "pointer",
      userSelect: "none",
      verticalAlign: "middle",
      MozAppearance: "none",
      WebkitAppearance: "none",
      textDecoration: "none",
      color: "inherit",
      "&::-moz-focus-inner": { borderStyle: "none" },
      [`&.${hN.disabled}`]: { pointerEvents: "none", cursor: "default" },
      "@media print": { colorAdjust: "exact" },
    }),
    yN = O.forwardRef(function (n, a) {
      const o = Ye({ props: n, name: "MuiButtonBase" }),
        {
          action: s,
          centerRipple: u = !1,
          children: c,
          className: d,
          component: h = "button",
          disabled: m = !1,
          disableRipple: g = !1,
          disableTouchRipple: b = !1,
          focusRipple: x = !1,
          focusVisibleClassName: C,
          LinkComponent: _ = "a",
          onBlur: v,
          onClick: E,
          onContextMenu: w,
          onDragLeave: D,
          onFocus: R,
          onFocusVisible: M,
          onKeyDown: A,
          onKeyUp: L,
          onMouseDown: G,
          onMouseLeave: q,
          onMouseUp: W,
          onTouchEnd: S,
          onTouchMove: I,
          onTouchStart: X,
          tabIndex: oe = 0,
          TouchRippleProps: se,
          touchRippleRef: J,
          type: z,
          ...Y
        } = o,
        ie = O.useRef(null),
        re = rN(),
        N = cn(re.ref, J),
        [K, ae] = O.useState(!1);
      (m && K && ae(!1),
        O.useImperativeHandle(
          s,
          () => ({
            focusVisible: () => {
              (ae(!0), ie.current.focus());
            },
          }),
          [],
        ));
      const te = re.shouldMount && !g && !m;
      O.useEffect(() => {
        K && x && !g && re.pulsate();
      }, [g, x, K, re]);
      const le = Tr(re, "start", G, b),
        ce = Tr(re, "stop", w, b),
        fe = Tr(re, "stop", D, b),
        Ae = Tr(re, "stop", W, b),
        xe = Tr(
          re,
          "stop",
          (pe) => {
            (K && pe.preventDefault(), q && q(pe));
          },
          b,
        ),
        ke = Tr(re, "start", X, b),
        ge = Tr(re, "stop", S, b),
        Oe = Tr(re, "stop", I, b),
        Me = Tr(
          re,
          "stop",
          (pe) => {
            (ev(pe.target) || ae(!1), v && v(pe));
          },
          !1,
        ),
        Ie = Na((pe) => {
          (ie.current || (ie.current = pe.currentTarget),
            ev(pe.target) && (ae(!0), M && M(pe)),
            R && R(pe));
        }),
        Re = () => {
          const pe = ie.current;
          return h && h !== "button" && !(pe.tagName === "A" && pe.href);
        },
        Xe = Na((pe) => {
          (x &&
            !pe.repeat &&
            K &&
            pe.key === " " &&
            re.stop(pe, () => {
              re.start(pe);
            }),
            pe.target === pe.currentTarget &&
              Re() &&
              pe.key === " " &&
              pe.preventDefault(),
            A && A(pe),
            pe.target === pe.currentTarget &&
              Re() &&
              pe.key === "Enter" &&
              !m &&
              (pe.preventDefault(), E && E(pe)));
        }),
        Gt = Na((pe) => {
          (x &&
            pe.key === " " &&
            K &&
            !pe.defaultPrevented &&
            re.stop(pe, () => {
              re.pulsate(pe);
            }),
            L && L(pe),
            E &&
              pe.target === pe.currentTarget &&
              Re() &&
              pe.key === " " &&
              !pe.defaultPrevented &&
              E(pe));
        });
      let We = h;
      We === "button" && (Y.href || Y.to) && (We = _);
      const ft = {};
      We === "button"
        ? ((ft.type = z === void 0 ? "button" : z), (ft.disabled = m))
        : (!Y.href && !Y.to && (ft.role = "button"),
          m && (ft["aria-disabled"] = m));
      const ut = cn(a, ie),
        mt = {
          ...o,
          centerRipple: u,
          component: h,
          disabled: m,
          disableRipple: g,
          disableTouchRipple: b,
          focusRipple: x,
          tabIndex: oe,
          focusVisible: K,
        },
        Fe = mN(mt);
      return P.jsxs(gN, {
        as: We,
        className: Te(Fe.root, d),
        ownerState: mt,
        onBlur: Me,
        onClick: E,
        onContextMenu: ce,
        onFocus: Ie,
        onKeyDown: Xe,
        onKeyUp: Gt,
        onMouseDown: le,
        onMouseLeave: xe,
        onMouseUp: Ae,
        onDragLeave: fe,
        onTouchEnd: ge,
        onTouchMove: Oe,
        onTouchStart: ke,
        ref: ut,
        tabIndex: m ? -1 : oe,
        type: z,
        ...ft,
        ...Y,
        children: [c, te ? P.jsx(dN, { ref: N, center: u, ...se }) : null],
      });
    });
  function Tr(e, n, a, o = !1) {
    return Na((s) => (a && a(s), o || e[n](s), !0));
  }
  function bN(e) {
    return typeof e.main == "string";
  }
  function vN(e, n = []) {
    if (!bN(e)) return !1;
    for (const a of n)
      if (!e.hasOwnProperty(a) || typeof e[a] != "string") return !1;
    return !0;
  }
  function La(e = []) {
    return ([, n]) => n && vN(n, e);
  }
  function SN(e) {
    return Ve("MuiCircularProgress", e);
  }
  et("MuiCircularProgress", [
    "root",
    "determinate",
    "indeterminate",
    "colorPrimary",
    "colorSecondary",
    "svg",
    "circle",
    "circleDeterminate",
    "circleIndeterminate",
    "circleDisableShrink",
  ]);
  const Vr = 44,
    Hd = zi`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,
    Pd = zi`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`,
    EN =
      typeof Hd != "string"
        ? id`
        animation: ${Hd} 1.4s linear infinite;
      `
        : null,
    _N =
      typeof Pd != "string"
        ? id`
        animation: ${Pd} 1.4s ease-in-out infinite;
      `
        : null,
    TN = (e) => {
      const { classes: n, variant: a, color: o, disableShrink: s } = e,
        u = {
          root: ["root", a, `color${_e(o)}`],
          svg: ["svg"],
          circle: ["circle", `circle${_e(a)}`, s && "circleDisableShrink"],
        };
      return Ke(u, SN, n);
    },
    xN = de("span", {
      name: "MuiCircularProgress",
      slot: "Root",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [n.root, n[a.variant], n[`color${_e(a.color)}`]];
      },
    })(
      ht(({ theme: e }) => ({
        display: "inline-block",
        variants: [
          {
            props: { variant: "determinate" },
            style: { transition: e.transitions.create("transform") },
          },
          {
            props: { variant: "indeterminate" },
            style: EN || { animation: `${Hd} 1.4s linear infinite` },
          },
          ...Object.entries(e.palette)
            .filter(La())
            .map(([n]) => ({
              props: { color: n },
              style: { color: (e.vars || e).palette[n].main },
            })),
        ],
      })),
    ),
    CN = de("svg", { name: "MuiCircularProgress", slot: "Svg" })({
      display: "block",
    }),
    wN = de("circle", {
      name: "MuiCircularProgress",
      slot: "Circle",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [
          n.circle,
          n[`circle${_e(a.variant)}`],
          a.disableShrink && n.circleDisableShrink,
        ];
      },
    })(
      ht(({ theme: e }) => ({
        stroke: "currentColor",
        variants: [
          {
            props: { variant: "determinate" },
            style: { transition: e.transitions.create("stroke-dashoffset") },
          },
          {
            props: { variant: "indeterminate" },
            style: { strokeDasharray: "80px, 200px", strokeDashoffset: 0 },
          },
          {
            props: ({ ownerState: n }) =>
              n.variant === "indeterminate" && !n.disableShrink,
            style: _N || { animation: `${Pd} 1.4s ease-in-out infinite` },
          },
        ],
      })),
    ),
    RN = O.forwardRef(function (n, a) {
      const o = Ye({ props: n, name: "MuiCircularProgress" }),
        {
          className: s,
          color: u = "primary",
          disableShrink: c = !1,
          size: d = 40,
          style: h,
          thickness: m = 3.6,
          value: g = 0,
          variant: b = "indeterminate",
          ...x
        } = o,
        C = {
          ...o,
          color: u,
          disableShrink: c,
          size: d,
          thickness: m,
          value: g,
          variant: b,
        },
        _ = TN(C),
        v = {},
        E = {},
        w = {};
      if (b === "determinate") {
        const D = 2 * Math.PI * ((Vr - m) / 2);
        ((v.strokeDasharray = D.toFixed(3)),
          (w["aria-valuenow"] = Math.round(g)),
          (v.strokeDashoffset = `${(((100 - g) / 100) * D).toFixed(3)}px`),
          (E.transform = "rotate(-90deg)"));
      }
      return P.jsx(xN, {
        className: Te(_.root, s),
        style: { width: d, height: d, ...E, ...h },
        ownerState: C,
        ref: a,
        role: "progressbar",
        ...w,
        ...x,
        children: P.jsx(CN, {
          className: _.svg,
          ownerState: C,
          viewBox: `${Vr / 2} ${Vr / 2} ${Vr} ${Vr}`,
          children: P.jsx(wN, {
            className: _.circle,
            style: v,
            ownerState: C,
            cx: Vr,
            cy: Vr,
            r: (Vr - m) / 2,
            fill: "none",
            strokeWidth: m,
          }),
        }),
      });
    });
  function AN(e) {
    return Ve("MuiTypography", e);
  }
  et("MuiTypography", [
    "root",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "subtitle1",
    "subtitle2",
    "body1",
    "body2",
    "inherit",
    "button",
    "caption",
    "overline",
    "alignLeft",
    "alignRight",
    "alignCenter",
    "alignJustify",
    "noWrap",
    "gutterBottom",
    "paragraph",
  ]);
  const ON = {
      primary: !0,
      secondary: !0,
      error: !0,
      info: !0,
      success: !0,
      warning: !0,
      textPrimary: !0,
      textSecondary: !0,
      textDisabled: !0,
    },
    MN = LD(),
    DN = (e) => {
      const {
          align: n,
          gutterBottom: a,
          noWrap: o,
          paragraph: s,
          variant: u,
          classes: c,
        } = e,
        d = {
          root: [
            "root",
            u,
            e.align !== "inherit" && `align${_e(n)}`,
            a && "gutterBottom",
            o && "noWrap",
            s && "paragraph",
          ],
        };
      return Ke(d, AN, c);
    },
    NN = de("span", {
      name: "MuiTypography",
      slot: "Root",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [
          n.root,
          a.variant && n[a.variant],
          a.align !== "inherit" && n[`align${_e(a.align)}`],
          a.noWrap && n.noWrap,
          a.gutterBottom && n.gutterBottom,
          a.paragraph && n.paragraph,
        ];
      },
    })(
      ht(({ theme: e }) => {
        var n;
        return {
          margin: 0,
          variants: [
            {
              props: { variant: "inherit" },
              style: {
                font: "inherit",
                lineHeight: "inherit",
                letterSpacing: "inherit",
              },
            },
            ...Object.entries(e.typography)
              .filter(([a, o]) => a !== "inherit" && o && typeof o == "object")
              .map(([a, o]) => ({ props: { variant: a }, style: o })),
            ...Object.entries(e.palette)
              .filter(La())
              .map(([a]) => ({
                props: { color: a },
                style: { color: (e.vars || e).palette[a].main },
              })),
            ...Object.entries(((n = e.palette) == null ? void 0 : n.text) || {})
              .filter(([, a]) => typeof a == "string")
              .map(([a]) => ({
                props: { color: `text${_e(a)}` },
                style: { color: (e.vars || e).palette.text[a] },
              })),
            {
              props: ({ ownerState: a }) => a.align !== "inherit",
              style: { textAlign: "var(--Typography-textAlign)" },
            },
            {
              props: ({ ownerState: a }) => a.noWrap,
              style: {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              },
            },
            {
              props: ({ ownerState: a }) => a.gutterBottom,
              style: { marginBottom: "0.35em" },
            },
            {
              props: ({ ownerState: a }) => a.paragraph,
              style: { marginBottom: 16 },
            },
          ],
        };
      }),
    ),
    tv = {
      h1: "h1",
      h2: "h2",
      h3: "h3",
      h4: "h4",
      h5: "h5",
      h6: "h6",
      subtitle1: "h6",
      subtitle2: "h6",
      body1: "p",
      body2: "p",
      inherit: "p",
    },
    qd = O.forwardRef(function (n, a) {
      const { color: o, ...s } = Ye({ props: n, name: "MuiTypography" }),
        u = !ON[o],
        c = MN({ ...s, ...(u && { color: o }) }),
        {
          align: d = "inherit",
          className: h,
          component: m,
          gutterBottom: g = !1,
          noWrap: b = !1,
          paragraph: x = !1,
          variant: C = "body1",
          variantMapping: _ = tv,
          ...v
        } = c,
        E = {
          ...c,
          align: d,
          color: o,
          className: h,
          component: m,
          gutterBottom: g,
          noWrap: b,
          paragraph: x,
          variant: C,
          variantMapping: _,
        },
        w = m || (x ? "p" : _[C] || tv[C]) || "span",
        D = DN(E);
      return P.jsx(NN, {
        as: w,
        ref: a,
        className: Te(D.root, h),
        ...v,
        ownerState: E,
        style: {
          ...(d !== "inherit" && { "--Typography-textAlign": d }),
          ...v.style,
        },
      });
    });
  function kN(e) {
    var b;
    const {
        elementType: n,
        externalSlotProps: a,
        ownerState: o,
        skipResolvingSlotProps: s = !1,
        ...u
      } = e,
      c = s ? {} : W0(a, o),
      { props: d, internalRef: h } = J0({ ...u, externalSlotProps: c }),
      m = cn(
        h,
        c == null ? void 0 : c.ref,
        (b = e.additionalProps) == null ? void 0 : b.ref,
      );
    return X0(n, { ...d, ref: m }, o);
  }
  function Pi(e) {
    var n;
    return parseInt(O.version, 10) >= 19
      ? ((n = e == null ? void 0 : e.props) == null ? void 0 : n.ref) || null
      : (e == null ? void 0 : e.ref) || null;
  }
  function zN(e) {
    return typeof e == "function" ? e() : e;
  }
  const BN = O.forwardRef(function (n, a) {
    const { children: o, container: s, disablePortal: u = !1 } = n,
      [c, d] = O.useState(null),
      h = cn(O.isValidElement(o) ? Pi(o) : null, a);
    if (
      (qr(() => {
        u || d(zN(s) || document.body);
      }, [s, u]),
      qr(() => {
        if (c && !u)
          return (
            z0(a, c),
            () => {
              z0(a, null);
            }
          );
      }, [a, c, u]),
      u)
    ) {
      if (O.isValidElement(o)) {
        const m = { ref: h };
        return O.cloneElement(o, m);
      }
      return o;
    }
    return c && q0.createPortal(o, c);
  });
  function su(e) {
    return parseInt(e, 10) || 0;
  }
  const LN = {
    shadow: {
      visibility: "hidden",
      position: "absolute",
      overflow: "hidden",
      height: 0,
      top: 0,
      left: 0,
      transform: "translateZ(0)",
    },
  };
  function UN(e) {
    for (const n in e) return !1;
    return !0;
  }
  function nv(e) {
    return UN(e) || (e.outerHeightStyle === 0 && !e.overflowing);
  }
  const jN = O.forwardRef(function (n, a) {
    const {
        onChange: o,
        maxRows: s,
        minRows: u = 1,
        style: c,
        value: d,
        ...h
      } = n,
      { current: m } = O.useRef(d != null),
      g = O.useRef(null),
      b = cn(a, g),
      x = O.useRef(null),
      C = O.useRef(null),
      _ = O.useCallback(() => {
        const R = g.current,
          M = C.current;
        if (!R || !M) return;
        const L = _r(R).getComputedStyle(R);
        if (L.width === "0px") return { outerHeightStyle: 0, overflowing: !1 };
        ((M.style.width = L.width),
          (M.value = R.value || n.placeholder || "x"),
          M.value.slice(-1) ===
            `
` && (M.value += " "));
        const G = L.boxSizing,
          q = su(L.paddingBottom) + su(L.paddingTop),
          W = su(L.borderBottomWidth) + su(L.borderTopWidth),
          S = M.scrollHeight;
        M.value = "x";
        const I = M.scrollHeight;
        let X = S;
        (u && (X = Math.max(Number(u) * I, X)),
          s && (X = Math.min(Number(s) * I, X)),
          (X = Math.max(X, I)));
        const oe = X + (G === "border-box" ? q + W : 0),
          se = Math.abs(X - S) <= 1;
        return { outerHeightStyle: oe, overflowing: se };
      }, [s, u, n.placeholder]),
      v = Na(() => {
        const R = g.current,
          M = _();
        if (!R || !M || nv(M)) return !1;
        const A = M.outerHeightStyle;
        return x.current != null && x.current !== A;
      }),
      E = O.useCallback(() => {
        const R = g.current,
          M = _();
        if (!R || !M || nv(M)) return;
        const A = M.outerHeightStyle;
        (x.current !== A && ((x.current = A), (R.style.height = `${A}px`)),
          (R.style.overflow = M.overflowing ? "hidden" : ""));
      }, [_]),
      w = O.useRef(-1);
    (qr(() => {
      const R = k0(E),
        M = g == null ? void 0 : g.current;
      if (!M) return;
      const A = _r(M);
      A.addEventListener("resize", R);
      let L;
      return (
        typeof ResizeObserver < "u" &&
          ((L = new ResizeObserver(() => {
            v() &&
              (L.unobserve(M),
              cancelAnimationFrame(w.current),
              E(),
              (w.current = requestAnimationFrame(() => {
                L.observe(M);
              })));
          })),
          L.observe(M)),
        () => {
          (R.clear(),
            cancelAnimationFrame(w.current),
            A.removeEventListener("resize", R),
            L && L.disconnect());
        }
      );
    }, [_, E, v]),
      qr(() => {
        E();
      }));
    const D = (R) => {
      m || E();
      const M = R.target,
        A = M.value.length,
        L = M.value.endsWith(`
`),
        G = M.selectionStart === A;
      (L && G && M.setSelectionRange(A, A), o && o(R));
    };
    return P.jsxs(O.Fragment, {
      children: [
        P.jsx("textarea", {
          value: d,
          onChange: D,
          ref: b,
          rows: u,
          style: c,
          ...h,
        }),
        P.jsx("textarea", {
          "aria-hidden": !0,
          className: n.className,
          readOnly: !0,
          ref: C,
          tabIndex: -1,
          style: { ...LN.shadow, ...c, paddingTop: 0, paddingBottom: 0 },
        }),
      ],
    });
  });
  function Fd(e) {
    return typeof e == "string";
  }
  function xo({ props: e, states: n, muiFormControl: a }) {
    return n.reduce(
      (o, s) => ((o[s] = e[s]), a && typeof e[s] > "u" && (o[s] = a[s]), o),
      {},
    );
  }
  const Gd = O.createContext(void 0);
  function Co() {
    return O.useContext(Gd);
  }
  function rv(e) {
    return e != null && !(Array.isArray(e) && e.length === 0);
  }
  function lu(e, n = !1) {
    return (
      e &&
      ((rv(e.value) && e.value !== "") ||
        (n && rv(e.defaultValue) && e.defaultValue !== ""))
    );
  }
  function $N(e) {
    return e.startAdornment;
  }
  function IN(e) {
    return Ve("MuiInputBase", e);
  }
  const wo = et("MuiInputBase", [
    "root",
    "formControl",
    "focused",
    "disabled",
    "adornedStart",
    "adornedEnd",
    "error",
    "sizeSmall",
    "multiline",
    "colorSecondary",
    "fullWidth",
    "hiddenLabel",
    "readOnly",
    "input",
    "inputSizeSmall",
    "inputMultiline",
    "inputTypeSearch",
    "inputAdornedStart",
    "inputAdornedEnd",
    "inputHiddenLabel",
  ]);
  var av;
  const uu = (e, n) => {
      const { ownerState: a } = e;
      return [
        n.root,
        a.formControl && n.formControl,
        a.startAdornment && n.adornedStart,
        a.endAdornment && n.adornedEnd,
        a.error && n.error,
        a.size === "small" && n.sizeSmall,
        a.multiline && n.multiline,
        a.color && n[`color${_e(a.color)}`],
        a.fullWidth && n.fullWidth,
        a.hiddenLabel && n.hiddenLabel,
      ];
    },
    cu = (e, n) => {
      const { ownerState: a } = e;
      return [
        n.input,
        a.size === "small" && n.inputSizeSmall,
        a.multiline && n.inputMultiline,
        a.type === "search" && n.inputTypeSearch,
        a.startAdornment && n.inputAdornedStart,
        a.endAdornment && n.inputAdornedEnd,
        a.hiddenLabel && n.inputHiddenLabel,
      ];
    },
    HN = (e) => {
      const {
          classes: n,
          color: a,
          disabled: o,
          error: s,
          endAdornment: u,
          focused: c,
          formControl: d,
          fullWidth: h,
          hiddenLabel: m,
          multiline: g,
          readOnly: b,
          size: x,
          startAdornment: C,
          type: _,
        } = e,
        v = {
          root: [
            "root",
            `color${_e(a)}`,
            o && "disabled",
            s && "error",
            h && "fullWidth",
            c && "focused",
            d && "formControl",
            x && x !== "medium" && `size${_e(x)}`,
            g && "multiline",
            C && "adornedStart",
            u && "adornedEnd",
            m && "hiddenLabel",
            b && "readOnly",
          ],
          input: [
            "input",
            o && "disabled",
            _ === "search" && "inputTypeSearch",
            g && "inputMultiline",
            x === "small" && "inputSizeSmall",
            m && "inputHiddenLabel",
            C && "inputAdornedStart",
            u && "inputAdornedEnd",
            b && "readOnly",
          ],
        };
      return Ke(v, IN, n);
    },
    fu = de("div", {
      name: "MuiInputBase",
      slot: "Root",
      overridesResolver: uu,
    })(
      ht(({ theme: e }) => ({
        ...e.typography.body1,
        color: (e.vars || e).palette.text.primary,
        lineHeight: "1.4375em",
        boxSizing: "border-box",
        position: "relative",
        cursor: "text",
        display: "inline-flex",
        alignItems: "center",
        [`&.${wo.disabled}`]: {
          color: (e.vars || e).palette.text.disabled,
          cursor: "default",
        },
        variants: [
          {
            props: ({ ownerState: n }) => n.multiline,
            style: { padding: "4px 0 5px" },
          },
          {
            props: ({ ownerState: n, size: a }) => n.multiline && a === "small",
            style: { paddingTop: 1 },
          },
          {
            props: ({ ownerState: n }) => n.fullWidth,
            style: { width: "100%" },
          },
        ],
      })),
    ),
    du = de("input", {
      name: "MuiInputBase",
      slot: "Input",
      overridesResolver: cu,
    })(
      ht(({ theme: e }) => {
        const n = e.palette.mode === "light",
          a = {
            color: "currentColor",
            ...(e.vars
              ? { opacity: e.vars.opacity.inputPlaceholder }
              : { opacity: n ? 0.42 : 0.5 }),
            transition: e.transitions.create("opacity", {
              duration: e.transitions.duration.shorter,
            }),
          },
          o = { opacity: "0 !important" },
          s = e.vars
            ? { opacity: e.vars.opacity.inputPlaceholder }
            : { opacity: n ? 0.42 : 0.5 };
        return {
          font: "inherit",
          letterSpacing: "inherit",
          color: "currentColor",
          padding: "4px 0 5px",
          border: 0,
          boxSizing: "content-box",
          background: "none",
          height: "1.4375em",
          margin: 0,
          WebkitTapHighlightColor: "transparent",
          display: "block",
          minWidth: 0,
          width: "100%",
          "&::-webkit-input-placeholder": a,
          "&::-moz-placeholder": a,
          "&::-ms-input-placeholder": a,
          "&:focus": { outline: 0 },
          "&:invalid": { boxShadow: "none" },
          "&::-webkit-search-decoration": { WebkitAppearance: "none" },
          [`label[data-shrink=false] + .${wo.formControl} &`]: {
            "&::-webkit-input-placeholder": o,
            "&::-moz-placeholder": o,
            "&::-ms-input-placeholder": o,
            "&:focus::-webkit-input-placeholder": s,
            "&:focus::-moz-placeholder": s,
            "&:focus::-ms-input-placeholder": s,
          },
          [`&.${wo.disabled}`]: {
            opacity: 1,
            WebkitTextFillColor: (e.vars || e).palette.text.disabled,
          },
          variants: [
            {
              props: ({ ownerState: u }) => !u.disableInjectingGlobalStyles,
              style: {
                animationName: "mui-auto-fill-cancel",
                animationDuration: "10ms",
                "&:-webkit-autofill": {
                  animationDuration: "5000s",
                  animationName: "mui-auto-fill",
                },
              },
            },
            { props: { size: "small" }, style: { paddingTop: 1 } },
            {
              props: ({ ownerState: u }) => u.multiline,
              style: {
                height: "auto",
                resize: "none",
                padding: 0,
                paddingTop: 0,
              },
            },
            {
              props: { type: "search" },
              style: { MozAppearance: "textfield" },
            },
          ],
        };
      }),
    ),
    ov = Dd({
      "@keyframes mui-auto-fill": { from: { display: "block" } },
      "@keyframes mui-auto-fill-cancel": { from: { display: "block" } },
    }),
    Vd = O.forwardRef(function (n, a) {
      const o = Ye({ props: n, name: "MuiInputBase" }),
        {
          "aria-describedby": s,
          autoComplete: u,
          autoFocus: c,
          className: d,
          color: h,
          components: m = {},
          componentsProps: g = {},
          defaultValue: b,
          disabled: x,
          disableInjectingGlobalStyles: C,
          endAdornment: _,
          error: v,
          fullWidth: E = !1,
          id: w,
          inputComponent: D = "input",
          inputProps: R = {},
          inputRef: M,
          margin: A,
          maxRows: L,
          minRows: G,
          multiline: q = !1,
          name: W,
          onBlur: S,
          onChange: I,
          onClick: X,
          onFocus: oe,
          onKeyDown: se,
          onKeyUp: J,
          placeholder: z,
          readOnly: Y,
          renderSuffix: ie,
          rows: re,
          size: N,
          slotProps: K = {},
          slots: ae = {},
          startAdornment: te,
          type: le = "text",
          value: ce,
          ...fe
        } = o,
        Ae = R.value != null ? R.value : ce,
        { current: xe } = O.useRef(Ae != null),
        ke = O.useRef(),
        ge = O.useCallback((ve) => {}, []),
        Oe = cn(ke, M, R.ref, ge),
        [Me, Ie] = O.useState(!1),
        Re = Co(),
        Xe = xo({
          props: o,
          muiFormControl: Re,
          states: [
            "color",
            "disabled",
            "error",
            "hiddenLabel",
            "size",
            "required",
            "filled",
          ],
        });
      ((Xe.focused = Re ? Re.focused : Me),
        O.useEffect(() => {
          !Re && x && Me && (Ie(!1), S && S());
        }, [Re, x, Me, S]));
      const Gt = Re && Re.onFilled,
        We = Re && Re.onEmpty,
        ft = O.useCallback(
          (ve) => {
            lu(ve) ? Gt && Gt() : We && We();
          },
          [Gt, We],
        );
      qr(() => {
        xe && ft({ value: Ae });
      }, [Ae, ft, xe]);
      const ut = (ve) => {
          (oe && oe(ve),
            R.onFocus && R.onFocus(ve),
            Re && Re.onFocus ? Re.onFocus(ve) : Ie(!0));
        },
        mt = (ve) => {
          (S && S(ve),
            R.onBlur && R.onBlur(ve),
            Re && Re.onBlur ? Re.onBlur(ve) : Ie(!1));
        },
        Fe = (ve, ...Jt) => {
          if (!xe) {
            const At = ve.target || ke.current;
            if (At == null) throw new Error(vr(1));
            ft({ value: At.value });
          }
          (R.onChange && R.onChange(ve, ...Jt), I && I(ve, ...Jt));
        };
      O.useEffect(() => {
        ft(ke.current);
      }, []);
      const pe = (ve) => {
        (ke.current && ve.currentTarget === ve.target && ke.current.focus(),
          X && X(ve));
      };
      let Sn = D,
        _t = R;
      q &&
        Sn === "input" &&
        (re
          ? (_t = { type: void 0, minRows: re, maxRows: re, ..._t })
          : (_t = { type: void 0, maxRows: L, minRows: G, ..._t }),
        (Sn = jN));
      const Xn = (ve) => {
        ft(
          ve.animationName === "mui-auto-fill-cancel"
            ? ke.current
            : { value: "x" },
        );
      };
      O.useEffect(() => {
        Re && Re.setAdornedStart(!!te);
      }, [Re, te]);
      const fn = {
          ...o,
          color: Xe.color || "primary",
          disabled: Xe.disabled,
          endAdornment: _,
          error: Xe.error,
          focused: Xe.focused,
          formControl: Re,
          fullWidth: E,
          hiddenLabel: Xe.hiddenLabel,
          multiline: q,
          size: Xe.size,
          startAdornment: te,
          type: le,
        },
        Tt = HN(fn),
        jt = ae.root || m.Root || fu,
        gt = K.root || g.root || {},
        dt = ae.input || m.Input || du;
      return (
        (_t = { ..._t, ...(K.input ?? g.input) }),
        P.jsxs(O.Fragment, {
          children: [
            !C && typeof ov == "function" && (av || (av = P.jsx(ov, {}))),
            P.jsxs(jt, {
              ...gt,
              ref: a,
              onClick: pe,
              ...fe,
              ...(!Fd(jt) && { ownerState: { ...fn, ...gt.ownerState } }),
              className: Te(
                Tt.root,
                gt.className,
                d,
                Y && "MuiInputBase-readOnly",
              ),
              children: [
                te,
                P.jsx(Gd.Provider, {
                  value: null,
                  children: P.jsx(dt, {
                    "aria-invalid": Xe.error,
                    "aria-describedby": s,
                    autoComplete: u,
                    autoFocus: c,
                    defaultValue: b,
                    disabled: Xe.disabled,
                    id: w,
                    onAnimationStart: Xn,
                    name: W,
                    placeholder: z,
                    readOnly: Y,
                    required: Xe.required,
                    rows: re,
                    value: Ae,
                    onKeyDown: se,
                    onKeyUp: J,
                    type: le,
                    ..._t,
                    ...(!Fd(dt) && {
                      as: Sn,
                      ownerState: { ...fn, ..._t.ownerState },
                    }),
                    ref: Oe,
                    className: Te(
                      Tt.input,
                      _t.className,
                      Y && "MuiInputBase-readOnly",
                    ),
                    onBlur: mt,
                    onChange: Fe,
                    onFocus: ut,
                  }),
                }),
                _,
                ie ? ie({ ...Xe, startAdornment: te }) : null,
              ],
            }),
          ],
        })
      );
    });
  function PN(e) {
    return Ve("MuiInput", e);
  }
  const qi = { ...wo, ...et("MuiInput", ["root", "underline", "input"]) };
  function qN(e) {
    return Ve("MuiOutlinedInput", e);
  }
  const ur = {
    ...wo,
    ...et("MuiOutlinedInput", ["root", "notchedOutline", "input"]),
  };
  function FN(e) {
    return Ve("MuiFilledInput", e);
  }
  const Ua = {
      ...wo,
      ...et("MuiFilledInput", [
        "root",
        "underline",
        "input",
        "adornedStart",
        "adornedEnd",
        "sizeSmall",
        "multiline",
        "hiddenLabel",
      ]),
    },
    GN = N0(P.jsx("path", { d: "M7 10l5 5 5-5z" })),
    VN = { entering: { opacity: 1 }, entered: { opacity: 1 } },
    Kd = O.forwardRef(function (n, a) {
      const o = eu(),
        s = {
          enter: o.transitions.duration.enteringScreen,
          exit: o.transitions.duration.leavingScreen,
        },
        {
          addEndListener: u,
          appear: c = !0,
          children: d,
          easing: h,
          in: m,
          onEnter: g,
          onEntered: b,
          onEntering: x,
          onExit: C,
          onExited: _,
          onExiting: v,
          style: E,
          timeout: w = s,
          TransitionComponent: D = lr,
          ...R
        } = n,
        M = O.useRef(null),
        A = cn(M, Pi(d), a),
        L = (se) => (J) => {
          if (se) {
            const z = M.current;
            J === void 0 ? se(z) : se(z, J);
          }
        },
        G = L(x),
        q = L((se, J) => {
          Y0(se);
          const z = ou({ style: E, timeout: w, easing: h }, { mode: "enter" });
          ((se.style.webkitTransition = o.transitions.create("opacity", z)),
            (se.style.transition = o.transitions.create("opacity", z)),
            g && g(se, J));
        }),
        W = L(b),
        S = L(v),
        I = L((se) => {
          const J = ou({ style: E, timeout: w, easing: h }, { mode: "exit" });
          ((se.style.webkitTransition = o.transitions.create("opacity", J)),
            (se.style.transition = o.transitions.create("opacity", J)),
            C && C(se));
        }),
        X = L(_),
        oe = (se) => {
          u && u(M.current, se);
        };
      return P.jsx(D, {
        appear: c,
        in: m,
        nodeRef: M,
        onEnter: q,
        onEntered: W,
        onEntering: G,
        onExit: I,
        onExited: X,
        onExiting: S,
        addEndListener: oe,
        timeout: w,
        ...R,
        children: (se, { ownerState: J, ...z }) =>
          O.cloneElement(d, {
            style: {
              opacity: 0,
              visibility: se === "exited" && !m ? "hidden" : void 0,
              ...VN[se],
              ...E,
              ...d.props.style,
            },
            ref: A,
            ...z,
          }),
      });
    });
  function KN(e) {
    return Ve("MuiBackdrop", e);
  }
  et("MuiBackdrop", ["root", "invisible"]);
  const YN = (e) => {
      const { classes: n, invisible: a } = e;
      return Ke({ root: ["root", a && "invisible"] }, KN, n);
    },
    XN = de("div", {
      name: "MuiBackdrop",
      slot: "Root",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [n.root, a.invisible && n.invisible];
      },
    })({
      position: "fixed",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      right: 0,
      bottom: 0,
      top: 0,
      left: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      WebkitTapHighlightColor: "transparent",
      variants: [
        { props: { invisible: !0 }, style: { backgroundColor: "transparent" } },
      ],
    }),
    iv = O.forwardRef(function (n, a) {
      const o = Ye({ props: n, name: "MuiBackdrop" }),
        {
          children: s,
          className: u,
          component: c = "div",
          invisible: d = !1,
          open: h,
          components: m = {},
          componentsProps: g = {},
          slotProps: b = {},
          slots: x = {},
          TransitionComponent: C,
          transitionDuration: _,
          ...v
        } = o,
        E = { ...o, component: c, invisible: d },
        w = YN(E),
        D = { transition: C, root: m.Root, ...x },
        R = { ...g, ...b },
        M = { slots: D, slotProps: R },
        [A, L] = Rt("root", {
          elementType: XN,
          externalForwardedProps: M,
          className: Te(w.root, u),
          ownerState: E,
        }),
        [G, q] = Rt("transition", {
          elementType: Kd,
          externalForwardedProps: M,
          ownerState: E,
        });
      return P.jsx(G, {
        in: h,
        timeout: _,
        ...v,
        ...q,
        children: P.jsx(A, {
          "aria-hidden": !0,
          ...L,
          classes: w,
          ref: a,
          children: s,
        }),
      });
    });
  function WN(e) {
    return Ve("MuiButton", e);
  }
  const ja = et("MuiButton", [
      "root",
      "text",
      "textInherit",
      "textPrimary",
      "textSecondary",
      "textSuccess",
      "textError",
      "textInfo",
      "textWarning",
      "outlined",
      "outlinedInherit",
      "outlinedPrimary",
      "outlinedSecondary",
      "outlinedSuccess",
      "outlinedError",
      "outlinedInfo",
      "outlinedWarning",
      "contained",
      "containedInherit",
      "containedPrimary",
      "containedSecondary",
      "containedSuccess",
      "containedError",
      "containedInfo",
      "containedWarning",
      "disableElevation",
      "focusVisible",
      "disabled",
      "colorInherit",
      "colorPrimary",
      "colorSecondary",
      "colorSuccess",
      "colorError",
      "colorInfo",
      "colorWarning",
      "textSizeSmall",
      "textSizeMedium",
      "textSizeLarge",
      "outlinedSizeSmall",
      "outlinedSizeMedium",
      "outlinedSizeLarge",
      "containedSizeSmall",
      "containedSizeMedium",
      "containedSizeLarge",
      "sizeMedium",
      "sizeSmall",
      "sizeLarge",
      "fullWidth",
      "startIcon",
      "endIcon",
      "icon",
      "iconSizeSmall",
      "iconSizeMedium",
      "iconSizeLarge",
      "loading",
      "loadingWrapper",
      "loadingIconPlaceholder",
      "loadingIndicator",
      "loadingPositionCenter",
      "loadingPositionStart",
      "loadingPositionEnd",
    ]),
    QN = O.createContext({}),
    ZN = O.createContext(void 0),
    JN = (e) => {
      const {
          color: n,
          disableElevation: a,
          fullWidth: o,
          size: s,
          variant: u,
          loading: c,
          loadingPosition: d,
          classes: h,
        } = e,
        m = {
          root: [
            "root",
            c && "loading",
            u,
            `${u}${_e(n)}`,
            `size${_e(s)}`,
            `${u}Size${_e(s)}`,
            `color${_e(n)}`,
            a && "disableElevation",
            o && "fullWidth",
            c && `loadingPosition${_e(d)}`,
          ],
          startIcon: ["icon", "startIcon", `iconSize${_e(s)}`],
          endIcon: ["icon", "endIcon", `iconSize${_e(s)}`],
          loadingIndicator: ["loadingIndicator"],
          loadingWrapper: ["loadingWrapper"],
        },
        g = Ke(m, WN, h);
      return { ...h, ...g };
    },
    sv = [
      {
        props: { size: "small" },
        style: { "& > *:nth-of-type(1)": { fontSize: 18 } },
      },
      {
        props: { size: "medium" },
        style: { "& > *:nth-of-type(1)": { fontSize: 20 } },
      },
      {
        props: { size: "large" },
        style: { "& > *:nth-of-type(1)": { fontSize: 22 } },
      },
    ],
    e3 = de(yN, {
      shouldForwardProp: (e) => Kn(e) || e === "classes",
      name: "MuiButton",
      slot: "Root",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [
          n.root,
          n[a.variant],
          n[`${a.variant}${_e(a.color)}`],
          n[`size${_e(a.size)}`],
          n[`${a.variant}Size${_e(a.size)}`],
          a.color === "inherit" && n.colorInherit,
          a.disableElevation && n.disableElevation,
          a.fullWidth && n.fullWidth,
          a.loading && n.loading,
        ];
      },
    })(
      ht(({ theme: e }) => {
        const n =
            e.palette.mode === "light"
              ? e.palette.grey[300]
              : e.palette.grey[800],
          a =
            e.palette.mode === "light"
              ? e.palette.grey.A100
              : e.palette.grey[700];
        return {
          ...e.typography.button,
          minWidth: 64,
          padding: "6px 16px",
          border: 0,
          borderRadius: (e.vars || e).shape.borderRadius,
          transition: e.transitions.create(
            ["background-color", "box-shadow", "border-color", "color"],
            { duration: e.transitions.duration.short },
          ),
          "&:hover": { textDecoration: "none" },
          [`&.${ja.disabled}`]: {
            color: (e.vars || e).palette.action.disabled,
          },
          variants: [
            {
              props: { variant: "contained" },
              style: {
                color: "var(--variant-containedColor)",
                backgroundColor: "var(--variant-containedBg)",
                boxShadow: (e.vars || e).shadows[2],
                "&:hover": {
                  boxShadow: (e.vars || e).shadows[4],
                  "@media (hover: none)": {
                    boxShadow: (e.vars || e).shadows[2],
                  },
                },
                "&:active": { boxShadow: (e.vars || e).shadows[8] },
                [`&.${ja.focusVisible}`]: {
                  boxShadow: (e.vars || e).shadows[6],
                },
                [`&.${ja.disabled}`]: {
                  color: (e.vars || e).palette.action.disabled,
                  boxShadow: (e.vars || e).shadows[0],
                  backgroundColor: (e.vars || e).palette.action
                    .disabledBackground,
                },
              },
            },
            {
              props: { variant: "outlined" },
              style: {
                padding: "5px 15px",
                border: "1px solid currentColor",
                borderColor: "var(--variant-outlinedBorder, currentColor)",
                backgroundColor: "var(--variant-outlinedBg)",
                color: "var(--variant-outlinedColor)",
                [`&.${ja.disabled}`]: {
                  border: `1px solid ${(e.vars || e).palette.action.disabledBackground}`,
                },
              },
            },
            {
              props: { variant: "text" },
              style: {
                padding: "6px 8px",
                color: "var(--variant-textColor)",
                backgroundColor: "var(--variant-textBg)",
              },
            },
            ...Object.entries(e.palette)
              .filter(La())
              .map(([o]) => ({
                props: { color: o },
                style: {
                  "--variant-textColor": (e.vars || e).palette[o].main,
                  "--variant-outlinedColor": (e.vars || e).palette[o].main,
                  "--variant-outlinedBorder": e.vars
                    ? `rgba(${e.vars.palette[o].mainChannel} / 0.5)`
                    : Gr(e.palette[o].main, 0.5),
                  "--variant-containedColor": (e.vars || e).palette[o]
                    .contrastText,
                  "--variant-containedBg": (e.vars || e).palette[o].main,
                  "@media (hover: hover)": {
                    "&:hover": {
                      "--variant-containedBg": (e.vars || e).palette[o].dark,
                      "--variant-textBg": e.vars
                        ? `rgba(${e.vars.palette[o].mainChannel} / ${e.vars.palette.action.hoverOpacity})`
                        : Gr(e.palette[o].main, e.palette.action.hoverOpacity),
                      "--variant-outlinedBorder": (e.vars || e).palette[o].main,
                      "--variant-outlinedBg": e.vars
                        ? `rgba(${e.vars.palette[o].mainChannel} / ${e.vars.palette.action.hoverOpacity})`
                        : Gr(e.palette[o].main, e.palette.action.hoverOpacity),
                    },
                  },
                },
              })),
            {
              props: { color: "inherit" },
              style: {
                color: "inherit",
                borderColor: "currentColor",
                "--variant-containedBg": e.vars
                  ? e.vars.palette.Button.inheritContainedBg
                  : n,
                "@media (hover: hover)": {
                  "&:hover": {
                    "--variant-containedBg": e.vars
                      ? e.vars.palette.Button.inheritContainedHoverBg
                      : a,
                    "--variant-textBg": e.vars
                      ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})`
                      : Gr(
                          e.palette.text.primary,
                          e.palette.action.hoverOpacity,
                        ),
                    "--variant-outlinedBg": e.vars
                      ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})`
                      : Gr(
                          e.palette.text.primary,
                          e.palette.action.hoverOpacity,
                        ),
                  },
                },
              },
            },
            {
              props: { size: "small", variant: "text" },
              style: { padding: "4px 5px", fontSize: e.typography.pxToRem(13) },
            },
            {
              props: { size: "large", variant: "text" },
              style: {
                padding: "8px 11px",
                fontSize: e.typography.pxToRem(15),
              },
            },
            {
              props: { size: "small", variant: "outlined" },
              style: { padding: "3px 9px", fontSize: e.typography.pxToRem(13) },
            },
            {
              props: { size: "large", variant: "outlined" },
              style: {
                padding: "7px 21px",
                fontSize: e.typography.pxToRem(15),
              },
            },
            {
              props: { size: "small", variant: "contained" },
              style: {
                padding: "4px 10px",
                fontSize: e.typography.pxToRem(13),
              },
            },
            {
              props: { size: "large", variant: "contained" },
              style: {
                padding: "8px 22px",
                fontSize: e.typography.pxToRem(15),
              },
            },
            {
              props: { disableElevation: !0 },
              style: {
                boxShadow: "none",
                "&:hover": { boxShadow: "none" },
                [`&.${ja.focusVisible}`]: { boxShadow: "none" },
                "&:active": { boxShadow: "none" },
                [`&.${ja.disabled}`]: { boxShadow: "none" },
              },
            },
            { props: { fullWidth: !0 }, style: { width: "100%" } },
            {
              props: { loadingPosition: "center" },
              style: {
                transition: e.transitions.create(
                  ["background-color", "box-shadow", "border-color"],
                  { duration: e.transitions.duration.short },
                ),
                [`&.${ja.loading}`]: { color: "transparent" },
              },
            },
          ],
        };
      }),
    ),
    t3 = de("span", {
      name: "MuiButton",
      slot: "StartIcon",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [
          n.startIcon,
          a.loading && n.startIconLoadingStart,
          n[`iconSize${_e(a.size)}`],
        ];
      },
    })(({ theme: e }) => ({
      display: "inherit",
      marginRight: 8,
      marginLeft: -4,
      variants: [
        { props: { size: "small" }, style: { marginLeft: -2 } },
        {
          props: { loadingPosition: "start", loading: !0 },
          style: {
            transition: e.transitions.create(["opacity"], {
              duration: e.transitions.duration.short,
            }),
            opacity: 0,
          },
        },
        {
          props: { loadingPosition: "start", loading: !0, fullWidth: !0 },
          style: { marginRight: -8 },
        },
        ...sv,
      ],
    })),
    n3 = de("span", {
      name: "MuiButton",
      slot: "EndIcon",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [
          n.endIcon,
          a.loading && n.endIconLoadingEnd,
          n[`iconSize${_e(a.size)}`],
        ];
      },
    })(({ theme: e }) => ({
      display: "inherit",
      marginRight: -4,
      marginLeft: 8,
      variants: [
        { props: { size: "small" }, style: { marginRight: -2 } },
        {
          props: { loadingPosition: "end", loading: !0 },
          style: {
            transition: e.transitions.create(["opacity"], {
              duration: e.transitions.duration.short,
            }),
            opacity: 0,
          },
        },
        {
          props: { loadingPosition: "end", loading: !0, fullWidth: !0 },
          style: { marginLeft: -8 },
        },
        ...sv,
      ],
    })),
    r3 = de("span", { name: "MuiButton", slot: "LoadingIndicator" })(
      ({ theme: e }) => ({
        display: "none",
        position: "absolute",
        visibility: "visible",
        variants: [
          { props: { loading: !0 }, style: { display: "flex" } },
          { props: { loadingPosition: "start" }, style: { left: 14 } },
          {
            props: { loadingPosition: "start", size: "small" },
            style: { left: 10 },
          },
          {
            props: { variant: "text", loadingPosition: "start" },
            style: { left: 6 },
          },
          {
            props: { loadingPosition: "center" },
            style: {
              left: "50%",
              transform: "translate(-50%)",
              color: (e.vars || e).palette.action.disabled,
            },
          },
          { props: { loadingPosition: "end" }, style: { right: 14 } },
          {
            props: { loadingPosition: "end", size: "small" },
            style: { right: 10 },
          },
          {
            props: { variant: "text", loadingPosition: "end" },
            style: { right: 6 },
          },
          {
            props: { loadingPosition: "start", fullWidth: !0 },
            style: { position: "relative", left: -10 },
          },
          {
            props: { loadingPosition: "end", fullWidth: !0 },
            style: { position: "relative", right: -10 },
          },
        ],
      }),
    ),
    lv = de("span", { name: "MuiButton", slot: "LoadingIconPlaceholder" })({
      display: "inline-block",
      width: "1em",
      height: "1em",
    }),
    Kr = O.forwardRef(function (n, a) {
      const o = O.useContext(QN),
        s = O.useContext(ZN),
        u = ji(o, n),
        c = Ye({ props: u, name: "MuiButton" }),
        {
          children: d,
          color: h = "primary",
          component: m = "button",
          className: g,
          disabled: b = !1,
          disableElevation: x = !1,
          disableFocusRipple: C = !1,
          endIcon: _,
          focusVisibleClassName: v,
          fullWidth: E = !1,
          id: w,
          loading: D = null,
          loadingIndicator: R,
          loadingPosition: M = "center",
          size: A = "medium",
          startIcon: L,
          type: G,
          variant: q = "text",
          ...W
        } = c,
        S = nu(w),
        I =
          R ?? P.jsx(RN, { "aria-labelledby": S, color: "inherit", size: 16 }),
        X = {
          ...c,
          color: h,
          component: m,
          disabled: b,
          disableElevation: x,
          disableFocusRipple: C,
          fullWidth: E,
          loading: D,
          loadingIndicator: I,
          loadingPosition: M,
          size: A,
          type: G,
          variant: q,
        },
        oe = JN(X),
        se =
          (L || (D && M === "start")) &&
          P.jsx(t3, {
            className: oe.startIcon,
            ownerState: X,
            children:
              L ||
              P.jsx(lv, {
                className: oe.loadingIconPlaceholder,
                ownerState: X,
              }),
          }),
        J =
          (_ || (D && M === "end")) &&
          P.jsx(n3, {
            className: oe.endIcon,
            ownerState: X,
            children:
              _ ||
              P.jsx(lv, {
                className: oe.loadingIconPlaceholder,
                ownerState: X,
              }),
          }),
        z = s || "",
        Y =
          typeof D == "boolean"
            ? P.jsx("span", {
                className: oe.loadingWrapper,
                style: { display: "contents" },
                children:
                  D &&
                  P.jsx(r3, {
                    className: oe.loadingIndicator,
                    ownerState: X,
                    children: I,
                  }),
              })
            : null;
      return P.jsxs(e3, {
        ownerState: X,
        className: Te(o.className, oe.root, g, z),
        component: m,
        disabled: b || D,
        focusRipple: !C,
        focusVisibleClassName: Te(oe.focusVisible, v),
        ref: a,
        type: G,
        id: D ? S : w,
        ...W,
        classes: oe,
        children: [se, M !== "end" && Y, d, M === "end" && Y, J],
      });
    }),
    Yd = typeof Dd({}) == "function",
    uv = (e, n) => ({
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      boxSizing: "border-box",
      WebkitTextSizeAdjust: "100%",
      ...(n && !e.vars && { colorScheme: e.palette.mode }),
    }),
    cv = (e) => ({
      color: (e.vars || e).palette.text.primary,
      ...e.typography.body1,
      backgroundColor: (e.vars || e).palette.background.default,
      "@media print": { backgroundColor: (e.vars || e).palette.common.white },
    }),
    fv = (e, n = !1) => {
      var u, c;
      const a = {};
      n &&
        e.colorSchemes &&
        typeof e.getColorSchemeSelector == "function" &&
        Object.entries(e.colorSchemes).forEach(([d, h]) => {
          var g, b;
          const m = e.getColorSchemeSelector(d);
          m.startsWith("@")
            ? (a[m] = {
                ":root": {
                  colorScheme: (g = h.palette) == null ? void 0 : g.mode,
                },
              })
            : (a[m.replace(/\s*&/, "")] = {
                colorScheme: (b = h.palette) == null ? void 0 : b.mode,
              });
        });
      let o = {
        html: uv(e, n),
        "*, *::before, *::after": { boxSizing: "inherit" },
        "strong, b": { fontWeight: e.typography.fontWeightBold },
        body: {
          margin: 0,
          ...cv(e),
          "&::backdrop": {
            backgroundColor: (e.vars || e).palette.background.default,
          },
        },
        ...a,
      };
      const s =
        (c = (u = e.components) == null ? void 0 : u.MuiCssBaseline) == null
          ? void 0
          : c.styleOverrides;
      return (s && (o = [o, s]), o);
    },
    pu = "mui-ecs",
    a3 = (e) => {
      const n = fv(e, !1),
        a = Array.isArray(n) ? n[0] : n;
      return (
        !e.vars &&
          a &&
          (a.html[`:root:has(${pu})`] = { colorScheme: e.palette.mode }),
        e.colorSchemes &&
          Object.entries(e.colorSchemes).forEach(([o, s]) => {
            var c, d;
            const u = e.getColorSchemeSelector(o);
            u.startsWith("@")
              ? (a[u] = {
                  [`:root:not(:has(.${pu}))`]: {
                    colorScheme: (c = s.palette) == null ? void 0 : c.mode,
                  },
                })
              : (a[u.replace(/\s*&/, "")] = {
                  [`&:not(:has(.${pu}))`]: {
                    colorScheme: (d = s.palette) == null ? void 0 : d.mode,
                  },
                });
          }),
        n
      );
    },
    o3 = Dd(
      Yd
        ? ({ theme: e, enableColorScheme: n }) => fv(e, n)
        : ({ theme: e }) => a3(e),
    );
  function i3(e) {
    const n = Ye({ props: e, name: "MuiCssBaseline" }),
      { children: a, enableColorScheme: o = !1 } = n;
    return P.jsxs(O.Fragment, {
      children: [
        Yd && P.jsx(o3, { enableColorScheme: o }),
        !Yd &&
          !o &&
          P.jsx("span", { className: pu, style: { display: "none" } }),
        a,
      ],
    });
  }
  function dv(e = window) {
    const n = e.document.documentElement.clientWidth;
    return e.innerWidth - n;
  }
  function s3(e) {
    const n = Yn(e);
    return n.body === e
      ? _r(e).innerWidth > n.documentElement.clientWidth
      : e.scrollHeight > e.clientHeight;
  }
  function Fi(e, n) {
    n
      ? e.setAttribute("aria-hidden", "true")
      : e.removeAttribute("aria-hidden");
  }
  function pv(e) {
    return parseInt(_r(e).getComputedStyle(e).paddingRight, 10) || 0;
  }
  function l3(e) {
    const a = [
        "TEMPLATE",
        "SCRIPT",
        "STYLE",
        "LINK",
        "MAP",
        "META",
        "NOSCRIPT",
        "PICTURE",
        "COL",
        "COLGROUP",
        "PARAM",
        "SLOT",
        "SOURCE",
        "TRACK",
      ].includes(e.tagName),
      o = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
    return a || o;
  }
  function hv(e, n, a, o, s) {
    const u = [n, a, ...o];
    [].forEach.call(e.children, (c) => {
      const d = !u.includes(c),
        h = !l3(c);
      d && h && Fi(c, s);
    });
  }
  function Xd(e, n) {
    let a = -1;
    return (e.some((o, s) => (n(o) ? ((a = s), !0) : !1)), a);
  }
  function u3(e, n) {
    const a = [],
      o = e.container;
    if (!n.disableScrollLock) {
      if (s3(o)) {
        const c = dv(_r(o));
        (a.push({
          value: o.style.paddingRight,
          property: "padding-right",
          el: o,
        }),
          (o.style.paddingRight = `${pv(o) + c}px`));
        const d = Yn(o).querySelectorAll(".mui-fixed");
        [].forEach.call(d, (h) => {
          (a.push({
            value: h.style.paddingRight,
            property: "padding-right",
            el: h,
          }),
            (h.style.paddingRight = `${pv(h) + c}px`));
        });
      }
      let u;
      if (o.parentNode instanceof DocumentFragment) u = Yn(o).body;
      else {
        const c = o.parentElement,
          d = _r(o);
        u =
          (c == null ? void 0 : c.nodeName) === "HTML" &&
          d.getComputedStyle(c).overflowY === "scroll"
            ? c
            : o;
      }
      (a.push(
        { value: u.style.overflow, property: "overflow", el: u },
        { value: u.style.overflowX, property: "overflow-x", el: u },
        { value: u.style.overflowY, property: "overflow-y", el: u },
      ),
        (u.style.overflow = "hidden"));
    }
    return () => {
      a.forEach(({ value: u, el: c, property: d }) => {
        u ? c.style.setProperty(d, u) : c.style.removeProperty(d);
      });
    };
  }
  function c3(e) {
    const n = [];
    return (
      [].forEach.call(e.children, (a) => {
        a.getAttribute("aria-hidden") === "true" && n.push(a);
      }),
      n
    );
  }
  class f3 {
    constructor() {
      ((this.modals = []), (this.containers = []));
    }
    add(n, a) {
      let o = this.modals.indexOf(n);
      if (o !== -1) return o;
      ((o = this.modals.length),
        this.modals.push(n),
        n.modalRef && Fi(n.modalRef, !1));
      const s = c3(a);
      hv(a, n.mount, n.modalRef, s, !0);
      const u = Xd(this.containers, (c) => c.container === a);
      return u !== -1
        ? (this.containers[u].modals.push(n), o)
        : (this.containers.push({
            modals: [n],
            container: a,
            restore: null,
            hiddenSiblings: s,
          }),
          o);
    }
    mount(n, a) {
      const o = Xd(this.containers, (u) => u.modals.includes(n)),
        s = this.containers[o];
      s.restore || (s.restore = u3(s, a));
    }
    remove(n, a = !0) {
      const o = this.modals.indexOf(n);
      if (o === -1) return o;
      const s = Xd(this.containers, (c) => c.modals.includes(n)),
        u = this.containers[s];
      if (
        (u.modals.splice(u.modals.indexOf(n), 1),
        this.modals.splice(o, 1),
        u.modals.length === 0)
      )
        (u.restore && u.restore(),
          n.modalRef && Fi(n.modalRef, a),
          hv(u.container, n.mount, n.modalRef, u.hiddenSiblings, !1),
          this.containers.splice(s, 1));
      else {
        const c = u.modals[u.modals.length - 1];
        c.modalRef && Fi(c.modalRef, !1);
      }
      return o;
    }
    isTopModal(n) {
      return (
        this.modals.length > 0 && this.modals[this.modals.length - 1] === n
      );
    }
  }
  const d3 = [
    "input",
    "select",
    "textarea",
    "a[href]",
    "button",
    "[tabindex]",
    "audio[controls]",
    "video[controls]",
    '[contenteditable]:not([contenteditable="false"])',
  ].join(",");
  function p3(e) {
    const n = parseInt(e.getAttribute("tabindex") || "", 10);
    return Number.isNaN(n)
      ? e.contentEditable === "true" ||
        ((e.nodeName === "AUDIO" ||
          e.nodeName === "VIDEO" ||
          e.nodeName === "DETAILS") &&
          e.getAttribute("tabindex") === null)
        ? 0
        : e.tabIndex
      : n;
  }
  function h3(e) {
    if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name) return !1;
    const n = (o) => e.ownerDocument.querySelector(`input[type="radio"]${o}`);
    let a = n(`[name="${e.name}"]:checked`);
    return (a || (a = n(`[name="${e.name}"]`)), a !== e);
  }
  function m3(e) {
    return !(
      e.disabled ||
      (e.tagName === "INPUT" && e.type === "hidden") ||
      h3(e)
    );
  }
  function g3(e) {
    const n = [],
      a = [];
    return (
      Array.from(e.querySelectorAll(d3)).forEach((o, s) => {
        const u = p3(o);
        u === -1 ||
          !m3(o) ||
          (u === 0
            ? n.push(o)
            : a.push({ documentOrder: s, tabIndex: u, node: o }));
      }),
      a
        .sort((o, s) =>
          o.tabIndex === s.tabIndex
            ? o.documentOrder - s.documentOrder
            : o.tabIndex - s.tabIndex,
        )
        .map((o) => o.node)
        .concat(n)
    );
  }
  function y3() {
    return !0;
  }
  function b3(e) {
    const {
        children: n,
        disableAutoFocus: a = !1,
        disableEnforceFocus: o = !1,
        disableRestoreFocus: s = !1,
        getTabbable: u = g3,
        isEnabled: c = y3,
        open: d,
      } = e,
      h = O.useRef(!1),
      m = O.useRef(null),
      g = O.useRef(null),
      b = O.useRef(null),
      x = O.useRef(null),
      C = O.useRef(!1),
      _ = O.useRef(null),
      v = cn(Pi(n), _),
      E = O.useRef(null);
    (O.useEffect(() => {
      !d || !_.current || (C.current = !a);
    }, [a, d]),
      O.useEffect(() => {
        if (!d || !_.current) return;
        const R = Yn(_.current);
        return (
          _.current.contains(R.activeElement) ||
            (_.current.hasAttribute("tabIndex") ||
              _.current.setAttribute("tabIndex", "-1"),
            C.current && _.current.focus()),
          () => {
            s ||
              (b.current &&
                b.current.focus &&
                ((h.current = !0), b.current.focus()),
              (b.current = null));
          }
        );
      }, [d]),
      O.useEffect(() => {
        if (!d || !_.current) return;
        const R = Yn(_.current),
          M = (G) => {
            ((E.current = G),
              !(o || !c() || G.key !== "Tab") &&
                R.activeElement === _.current &&
                G.shiftKey &&
                ((h.current = !0), g.current && g.current.focus()));
          },
          A = () => {
            var W, S;
            const G = _.current;
            if (G === null) return;
            if (!R.hasFocus() || !c() || h.current) {
              h.current = !1;
              return;
            }
            if (
              G.contains(R.activeElement) ||
              (o &&
                R.activeElement !== m.current &&
                R.activeElement !== g.current)
            )
              return;
            if (R.activeElement !== x.current) x.current = null;
            else if (x.current !== null) return;
            if (!C.current) return;
            let q = [];
            if (
              ((R.activeElement === m.current ||
                R.activeElement === g.current) &&
                (q = u(_.current)),
              q.length > 0)
            ) {
              const I = !!(
                  (W = E.current) != null &&
                  W.shiftKey &&
                  ((S = E.current) == null ? void 0 : S.key) === "Tab"
                ),
                X = q[0],
                oe = q[q.length - 1];
              typeof X != "string" &&
                typeof oe != "string" &&
                (I ? oe.focus() : X.focus());
            } else G.focus();
          };
        (R.addEventListener("focusin", A),
          R.addEventListener("keydown", M, !0));
        const L = setInterval(() => {
          R.activeElement && R.activeElement.tagName === "BODY" && A();
        }, 50);
        return () => {
          (clearInterval(L),
            R.removeEventListener("focusin", A),
            R.removeEventListener("keydown", M, !0));
        };
      }, [a, o, s, c, d, u]));
    const w = (R) => {
        (b.current === null && (b.current = R.relatedTarget),
          (C.current = !0),
          (x.current = R.target));
        const M = n.props.onFocus;
        M && M(R);
      },
      D = (R) => {
        (b.current === null && (b.current = R.relatedTarget), (C.current = !0));
      };
    return P.jsxs(O.Fragment, {
      children: [
        P.jsx("div", {
          tabIndex: d ? 0 : -1,
          onFocus: D,
          ref: m,
          "data-testid": "sentinelStart",
        }),
        O.cloneElement(n, { ref: v, onFocus: w }),
        P.jsx("div", {
          tabIndex: d ? 0 : -1,
          onFocus: D,
          ref: g,
          "data-testid": "sentinelEnd",
        }),
      ],
    });
  }
  function v3(e) {
    return typeof e == "function" ? e() : e;
  }
  function S3(e) {
    return e ? e.props.hasOwnProperty("in") : !1;
  }
  const mv = () => {},
    hu = new f3();
  function E3(e) {
    const {
        container: n,
        disableEscapeKeyDown: a = !1,
        disableScrollLock: o = !1,
        closeAfterTransition: s = !1,
        onTransitionEnter: u,
        onTransitionExited: c,
        children: d,
        onClose: h,
        open: m,
        rootRef: g,
      } = e,
      b = O.useRef({}),
      x = O.useRef(null),
      C = O.useRef(null),
      _ = cn(C, g),
      [v, E] = O.useState(!m),
      w = S3(d);
    let D = !0;
    (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (D = !1);
    const R = () => Yn(x.current),
      M = () => (
        (b.current.modalRef = C.current),
        (b.current.mount = x.current),
        b.current
      ),
      A = () => {
        (hu.mount(M(), { disableScrollLock: o }),
          C.current && (C.current.scrollTop = 0));
      },
      L = Na(() => {
        const J = v3(n) || R().body;
        (hu.add(M(), J), C.current && A());
      }),
      G = () => hu.isTopModal(M()),
      q = Na((J) => {
        ((x.current = J),
          J && (m && G() ? A() : C.current && Fi(C.current, D)));
      }),
      W = O.useCallback(() => {
        hu.remove(M(), D);
      }, [D]);
    (O.useEffect(
      () => () => {
        W();
      },
      [W],
    ),
      O.useEffect(() => {
        m ? L() : (!w || !s) && W();
      }, [m, W, w, s, L]));
    const S = (J) => (z) => {
        var Y;
        ((Y = J.onKeyDown) == null || Y.call(J, z),
          !(z.key !== "Escape" || z.which === 229 || !G()) &&
            (a || (z.stopPropagation(), h && h(z, "escapeKeyDown"))));
      },
      I = (J) => (z) => {
        var Y;
        ((Y = J.onClick) == null || Y.call(J, z),
          z.target === z.currentTarget && h && h(z, "backdropClick"));
      };
    return {
      getRootProps: (J = {}) => {
        const z = Q0(e);
        (delete z.onTransitionEnter, delete z.onTransitionExited);
        const Y = { ...z, ...J };
        return { role: "presentation", ...Y, onKeyDown: S(Y), ref: _ };
      },
      getBackdropProps: (J = {}) => {
        const z = J;
        return { "aria-hidden": !0, ...z, onClick: I(z), open: m };
      },
      getTransitionProps: () => {
        const J = () => {
            (E(!1), u && u());
          },
          z = () => {
            (E(!0), c && c(), s && W());
          };
        return {
          onEnter: D0(J, (d == null ? void 0 : d.props.onEnter) ?? mv),
          onExited: D0(z, (d == null ? void 0 : d.props.onExited) ?? mv),
        };
      },
      rootRef: _,
      portalRef: q,
      isTopModal: G,
      exited: v,
      hasTransition: w,
    };
  }
  function _3(e) {
    return Ve("MuiModal", e);
  }
  et("MuiModal", ["root", "hidden", "backdrop"]);
  const T3 = (e) => {
      const { open: n, exited: a, classes: o } = e;
      return Ke(
        { root: ["root", !n && a && "hidden"], backdrop: ["backdrop"] },
        _3,
        o,
      );
    },
    x3 = de("div", {
      name: "MuiModal",
      slot: "Root",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [n.root, !a.open && a.exited && n.hidden];
      },
    })(
      ht(({ theme: e }) => ({
        position: "fixed",
        zIndex: (e.vars || e).zIndex.modal,
        right: 0,
        bottom: 0,
        top: 0,
        left: 0,
        variants: [
          {
            props: ({ ownerState: n }) => !n.open && n.exited,
            style: { visibility: "hidden" },
          },
        ],
      })),
    ),
    C3 = de(iv, { name: "MuiModal", slot: "Backdrop" })({ zIndex: -1 }),
    gv = O.forwardRef(function (n, a) {
      const o = Ye({ name: "MuiModal", props: n }),
        {
          BackdropComponent: s = C3,
          BackdropProps: u,
          classes: c,
          className: d,
          closeAfterTransition: h = !1,
          children: m,
          container: g,
          component: b,
          components: x = {},
          componentsProps: C = {},
          disableAutoFocus: _ = !1,
          disableEnforceFocus: v = !1,
          disableEscapeKeyDown: E = !1,
          disablePortal: w = !1,
          disableRestoreFocus: D = !1,
          disableScrollLock: R = !1,
          hideBackdrop: M = !1,
          keepMounted: A = !1,
          onClose: L,
          onTransitionEnter: G,
          onTransitionExited: q,
          open: W,
          slotProps: S = {},
          slots: I = {},
          theme: X,
          ...oe
        } = o,
        se = {
          ...o,
          closeAfterTransition: h,
          disableAutoFocus: _,
          disableEnforceFocus: v,
          disableEscapeKeyDown: E,
          disablePortal: w,
          disableRestoreFocus: D,
          disableScrollLock: R,
          hideBackdrop: M,
          keepMounted: A,
        },
        {
          getRootProps: J,
          getBackdropProps: z,
          getTransitionProps: Y,
          portalRef: ie,
          isTopModal: re,
          exited: N,
          hasTransition: K,
        } = E3({ ...se, rootRef: a }),
        ae = { ...se, exited: N },
        te = T3(ae),
        le = {};
      if ((m.props.tabIndex === void 0 && (le.tabIndex = "-1"), K)) {
        const { onEnter: ge, onExited: Oe } = Y();
        ((le.onEnter = ge), (le.onExited = Oe));
      }
      const ce = {
          slots: { root: x.Root, backdrop: x.Backdrop, ...I },
          slotProps: { ...C, ...S },
        },
        [fe, Ae] = Rt("root", {
          ref: a,
          elementType: x3,
          externalForwardedProps: { ...ce, ...oe, component: b },
          getSlotProps: J,
          ownerState: ae,
          className: Te(
            d,
            te == null ? void 0 : te.root,
            !ae.open && ae.exited && (te == null ? void 0 : te.hidden),
          ),
        }),
        [xe, ke] = Rt("backdrop", {
          ref: u == null ? void 0 : u.ref,
          elementType: s,
          externalForwardedProps: ce,
          shouldForwardComponentProp: !0,
          additionalProps: u,
          getSlotProps: (ge) =>
            z({
              ...ge,
              onClick: (Oe) => {
                ge != null && ge.onClick && ge.onClick(Oe);
              },
            }),
          className: Te(
            u == null ? void 0 : u.className,
            te == null ? void 0 : te.backdrop,
          ),
          ownerState: ae,
        });
      return !A && !W && (!K || N)
        ? null
        : P.jsx(BN, {
            ref: ie,
            container: g,
            disablePortal: w,
            children: P.jsxs(fe, {
              ...Ae,
              children: [
                !M && s ? P.jsx(xe, { ...ke }) : null,
                P.jsx(b3, {
                  disableEnforceFocus: v,
                  disableAutoFocus: _,
                  disableRestoreFocus: D,
                  isEnabled: re,
                  open: W,
                  children: O.cloneElement(m, le),
                }),
              ],
            }),
          });
    });
  function w3(e) {
    return Ve("MuiDialog", e);
  }
  const Wd = et("MuiDialog", [
      "root",
      "scrollPaper",
      "scrollBody",
      "container",
      "paper",
      "paperScrollPaper",
      "paperScrollBody",
      "paperWidthFalse",
      "paperWidthXs",
      "paperWidthSm",
      "paperWidthMd",
      "paperWidthLg",
      "paperWidthXl",
      "paperFullWidth",
      "paperFullScreen",
    ]),
    yv = O.createContext({}),
    R3 = de(iv, {
      name: "MuiDialog",
      slot: "Backdrop",
      overrides: (e, n) => n.backdrop,
    })({ zIndex: -1 }),
    A3 = (e) => {
      const {
          classes: n,
          scroll: a,
          maxWidth: o,
          fullWidth: s,
          fullScreen: u,
        } = e,
        c = {
          root: ["root"],
          container: ["container", `scroll${_e(a)}`],
          paper: [
            "paper",
            `paperScroll${_e(a)}`,
            `paperWidth${_e(String(o))}`,
            s && "paperFullWidth",
            u && "paperFullScreen",
          ],
        };
      return Ke(c, w3, n);
    },
    O3 = de(gv, { name: "MuiDialog", slot: "Root" })({
      "@media print": { position: "absolute !important" },
    }),
    M3 = de("div", {
      name: "MuiDialog",
      slot: "Container",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [n.container, n[`scroll${_e(a.scroll)}`]];
      },
    })({
      height: "100%",
      "@media print": { height: "auto" },
      outline: 0,
      variants: [
        {
          props: { scroll: "paper" },
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          props: { scroll: "body" },
          style: {
            overflowY: "auto",
            overflowX: "hidden",
            textAlign: "center",
            "&::after": {
              content: '""',
              display: "inline-block",
              verticalAlign: "middle",
              height: "100%",
              width: "0",
            },
          },
        },
      ],
    }),
    D3 = de($d, {
      name: "MuiDialog",
      slot: "Paper",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [
          n.paper,
          n[`scrollPaper${_e(a.scroll)}`],
          n[`paperWidth${_e(String(a.maxWidth))}`],
          a.fullWidth && n.paperFullWidth,
          a.fullScreen && n.paperFullScreen,
        ];
      },
    })(
      ht(({ theme: e }) => ({
        margin: 32,
        position: "relative",
        overflowY: "auto",
        "@media print": { overflowY: "visible", boxShadow: "none" },
        variants: [
          {
            props: { scroll: "paper" },
            style: {
              display: "flex",
              flexDirection: "column",
              maxHeight: "calc(100% - 64px)",
            },
          },
          {
            props: { scroll: "body" },
            style: {
              display: "inline-block",
              verticalAlign: "middle",
              textAlign: "initial",
            },
          },
          {
            props: ({ ownerState: n }) => !n.maxWidth,
            style: { maxWidth: "calc(100% - 64px)" },
          },
          {
            props: { maxWidth: "xs" },
            style: {
              maxWidth:
                e.breakpoints.unit === "px"
                  ? Math.max(e.breakpoints.values.xs, 444)
                  : `max(${e.breakpoints.values.xs}${e.breakpoints.unit}, 444px)`,
              [`&.${Wd.paperScrollBody}`]: {
                [e.breakpoints.down(
                  Math.max(e.breakpoints.values.xs, 444) + 32 * 2,
                )]: { maxWidth: "calc(100% - 64px)" },
              },
            },
          },
          ...Object.keys(e.breakpoints.values)
            .filter((n) => n !== "xs")
            .map((n) => ({
              props: { maxWidth: n },
              style: {
                maxWidth: `${e.breakpoints.values[n]}${e.breakpoints.unit}`,
                [`&.${Wd.paperScrollBody}`]: {
                  [e.breakpoints.down(e.breakpoints.values[n] + 32 * 2)]: {
                    maxWidth: "calc(100% - 64px)",
                  },
                },
              },
            })),
          {
            props: ({ ownerState: n }) => n.fullWidth,
            style: { width: "calc(100% - 64px)" },
          },
          {
            props: ({ ownerState: n }) => n.fullScreen,
            style: {
              margin: 0,
              width: "100%",
              maxWidth: "100%",
              height: "100%",
              maxHeight: "none",
              borderRadius: 0,
              [`&.${Wd.paperScrollBody}`]: { margin: 0, maxWidth: "100%" },
            },
          },
        ],
      })),
    ),
    bv = O.forwardRef(function (n, a) {
      const o = Ye({ props: n, name: "MuiDialog" }),
        s = eu(),
        u = {
          enter: s.transitions.duration.enteringScreen,
          exit: s.transitions.duration.leavingScreen,
        },
        {
          "aria-describedby": c,
          "aria-labelledby": d,
          "aria-modal": h = !0,
          BackdropComponent: m,
          BackdropProps: g,
          children: b,
          className: x,
          disableEscapeKeyDown: C = !1,
          fullScreen: _ = !1,
          fullWidth: v = !1,
          maxWidth: E = "sm",
          onClick: w,
          onClose: D,
          open: R,
          PaperComponent: M = $d,
          PaperProps: A = {},
          scroll: L = "paper",
          slots: G = {},
          slotProps: q = {},
          TransitionComponent: W = Kd,
          transitionDuration: S = u,
          TransitionProps: I,
          ...X
        } = o,
        oe = {
          ...o,
          disableEscapeKeyDown: C,
          fullScreen: _,
          fullWidth: v,
          maxWidth: E,
          scroll: L,
        },
        se = A3(oe),
        J = O.useRef(),
        z = (Ie) => {
          J.current = Ie.target === Ie.currentTarget;
        },
        Y = (Ie) => {
          (w && w(Ie),
            J.current && ((J.current = null), D && D(Ie, "backdropClick")));
        },
        ie = nu(d),
        re = O.useMemo(() => ({ titleId: ie }), [ie]),
        N = { transition: W, ...G },
        K = { transition: I, paper: A, backdrop: g, ...q },
        ae = { slots: N, slotProps: K },
        [te, le] = Rt("root", {
          elementType: O3,
          shouldForwardComponentProp: !0,
          externalForwardedProps: ae,
          ownerState: oe,
          className: Te(se.root, x),
          ref: a,
        }),
        [ce, fe] = Rt("backdrop", {
          elementType: R3,
          shouldForwardComponentProp: !0,
          externalForwardedProps: ae,
          ownerState: oe,
        }),
        [Ae, xe] = Rt("paper", {
          elementType: D3,
          shouldForwardComponentProp: !0,
          externalForwardedProps: ae,
          ownerState: oe,
          className: Te(se.paper, A.className),
        }),
        [ke, ge] = Rt("container", {
          elementType: M3,
          externalForwardedProps: ae,
          ownerState: oe,
          className: se.container,
        }),
        [Oe, Me] = Rt("transition", {
          elementType: Kd,
          externalForwardedProps: ae,
          ownerState: oe,
          additionalProps: {
            appear: !0,
            in: R,
            timeout: S,
            role: "presentation",
          },
        });
      return P.jsx(te, {
        closeAfterTransition: !0,
        slots: { backdrop: ce },
        slotProps: { backdrop: { transitionDuration: S, as: m, ...fe } },
        disableEscapeKeyDown: C,
        onClose: D,
        open: R,
        onClick: Y,
        ...le,
        ...X,
        children: P.jsx(Oe, {
          ...Me,
          children: P.jsx(ke, {
            onMouseDown: z,
            ...ge,
            children: P.jsx(Ae, {
              as: M,
              elevation: 24,
              role: "dialog",
              "aria-describedby": c,
              "aria-labelledby": ie,
              "aria-modal": h,
              ...xe,
              children: P.jsx(yv.Provider, { value: re, children: b }),
            }),
          }),
        }),
      });
    });
  function N3(e) {
    return Ve("MuiDialogActions", e);
  }
  et("MuiDialogActions", ["root", "spacing"]);
  const k3 = (e) => {
      const { classes: n, disableSpacing: a } = e;
      return Ke({ root: ["root", !a && "spacing"] }, N3, n);
    },
    z3 = de("div", {
      name: "MuiDialogActions",
      slot: "Root",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [n.root, !a.disableSpacing && n.spacing];
      },
    })({
      display: "flex",
      alignItems: "center",
      padding: 8,
      justifyContent: "flex-end",
      flex: "0 0 auto",
      variants: [
        {
          props: ({ ownerState: e }) => !e.disableSpacing,
          style: { "& > :not(style) ~ :not(style)": { marginLeft: 8 } },
        },
      ],
    }),
    vv = O.forwardRef(function (n, a) {
      const o = Ye({ props: n, name: "MuiDialogActions" }),
        { className: s, disableSpacing: u = !1, ...c } = o,
        d = { ...o, disableSpacing: u },
        h = k3(d);
      return P.jsx(z3, {
        className: Te(h.root, s),
        ownerState: d,
        ref: a,
        ...c,
      });
    });
  function B3(e) {
    return Ve("MuiDialogContent", e);
  }
  et("MuiDialogContent", ["root", "dividers"]);
  function L3(e) {
    return Ve("MuiDialogTitle", e);
  }
  const U3 = et("MuiDialogTitle", ["root"]),
    j3 = (e) => {
      const { classes: n, dividers: a } = e;
      return Ke({ root: ["root", a && "dividers"] }, B3, n);
    },
    $3 = de("div", {
      name: "MuiDialogContent",
      slot: "Root",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [n.root, a.dividers && n.dividers];
      },
    })(
      ht(({ theme: e }) => ({
        flex: "1 1 auto",
        WebkitOverflowScrolling: "touch",
        overflowY: "auto",
        padding: "20px 24px",
        variants: [
          {
            props: ({ ownerState: n }) => n.dividers,
            style: {
              padding: "16px 24px",
              borderTop: `1px solid ${(e.vars || e).palette.divider}`,
              borderBottom: `1px solid ${(e.vars || e).palette.divider}`,
            },
          },
          {
            props: ({ ownerState: n }) => !n.dividers,
            style: { [`.${U3.root} + &`]: { paddingTop: 0 } },
          },
        ],
      })),
    ),
    Sv = O.forwardRef(function (n, a) {
      const o = Ye({ props: n, name: "MuiDialogContent" }),
        { className: s, dividers: u = !1, ...c } = o,
        d = { ...o, dividers: u },
        h = j3(d);
      return P.jsx($3, {
        className: Te(h.root, s),
        ownerState: d,
        ref: a,
        ...c,
      });
    }),
    I3 = (e) => {
      const { classes: n } = e;
      return Ke({ root: ["root"] }, L3, n);
    },
    H3 = de(qd, { name: "MuiDialogTitle", slot: "Root" })({
      padding: "16px 24px",
      flex: "0 0 auto",
    }),
    Ev = O.forwardRef(function (n, a) {
      const o = Ye({ props: n, name: "MuiDialogTitle" }),
        { className: s, id: u, ...c } = o,
        d = o,
        h = I3(d),
        { titleId: m = u } = O.useContext(yv);
      return P.jsx(H3, {
        component: "h2",
        className: Te(h.root, s),
        ownerState: d,
        ref: a,
        variant: "h6",
        id: u ?? m,
        ...c,
      });
    }),
    P3 = (e) => {
      const {
          classes: n,
          disableUnderline: a,
          startAdornment: o,
          endAdornment: s,
          size: u,
          hiddenLabel: c,
          multiline: d,
        } = e,
        h = {
          root: [
            "root",
            !a && "underline",
            o && "adornedStart",
            s && "adornedEnd",
            u === "small" && `size${_e(u)}`,
            c && "hiddenLabel",
            d && "multiline",
          ],
          input: ["input"],
        },
        m = Ke(h, FN, n);
      return { ...n, ...m };
    },
    q3 = de(fu, {
      shouldForwardProp: (e) => Kn(e) || e === "classes",
      name: "MuiFilledInput",
      slot: "Root",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [...uu(e, n), !a.disableUnderline && n.underline];
      },
    })(
      ht(({ theme: e }) => {
        const n = e.palette.mode === "light",
          a = n ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)",
          o = n ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.09)",
          s = n ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.13)",
          u = n ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)";
        return {
          position: "relative",
          backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : o,
          borderTopLeftRadius: (e.vars || e).shape.borderRadius,
          borderTopRightRadius: (e.vars || e).shape.borderRadius,
          transition: e.transitions.create("background-color", {
            duration: e.transitions.duration.shorter,
            easing: e.transitions.easing.easeOut,
          }),
          "&:hover": {
            backgroundColor: e.vars ? e.vars.palette.FilledInput.hoverBg : s,
            "@media (hover: none)": {
              backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : o,
            },
          },
          [`&.${Ua.focused}`]: {
            backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : o,
          },
          [`&.${Ua.disabled}`]: {
            backgroundColor: e.vars ? e.vars.palette.FilledInput.disabledBg : u,
          },
          variants: [
            {
              props: ({ ownerState: c }) => !c.disableUnderline,
              style: {
                "&::after": {
                  left: 0,
                  bottom: 0,
                  content: '""',
                  position: "absolute",
                  right: 0,
                  transform: "scaleX(0)",
                  transition: e.transitions.create("transform", {
                    duration: e.transitions.duration.shorter,
                    easing: e.transitions.easing.easeOut,
                  }),
                  pointerEvents: "none",
                },
                [`&.${Ua.focused}:after`]: {
                  transform: "scaleX(1) translateX(0)",
                },
                [`&.${Ua.error}`]: {
                  "&::before, &::after": {
                    borderBottomColor: (e.vars || e).palette.error.main,
                  },
                },
                "&::before": {
                  borderBottom: `1px solid ${e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / ${e.vars.opacity.inputUnderline})` : a}`,
                  left: 0,
                  bottom: 0,
                  content: '"\\00a0"',
                  position: "absolute",
                  right: 0,
                  transition: e.transitions.create("border-bottom-color", {
                    duration: e.transitions.duration.shorter,
                  }),
                  pointerEvents: "none",
                },
                [`&:hover:not(.${Ua.disabled}, .${Ua.error}):before`]: {
                  borderBottom: `1px solid ${(e.vars || e).palette.text.primary}`,
                },
                [`&.${Ua.disabled}:before`]: { borderBottomStyle: "dotted" },
              },
            },
            ...Object.entries(e.palette)
              .filter(La())
              .map(([c]) => {
                var d;
                return {
                  props: { disableUnderline: !1, color: c },
                  style: {
                    "&::after": {
                      borderBottom: `2px solid ${(d = (e.vars || e).palette[c]) == null ? void 0 : d.main}`,
                    },
                  },
                };
              }),
            {
              props: ({ ownerState: c }) => c.startAdornment,
              style: { paddingLeft: 12 },
            },
            {
              props: ({ ownerState: c }) => c.endAdornment,
              style: { paddingRight: 12 },
            },
            {
              props: ({ ownerState: c }) => c.multiline,
              style: { padding: "25px 12px 8px" },
            },
            {
              props: ({ ownerState: c, size: d }) =>
                c.multiline && d === "small",
              style: { paddingTop: 21, paddingBottom: 4 },
            },
            {
              props: ({ ownerState: c }) => c.multiline && c.hiddenLabel,
              style: { paddingTop: 16, paddingBottom: 17 },
            },
            {
              props: ({ ownerState: c }) =>
                c.multiline && c.hiddenLabel && c.size === "small",
              style: { paddingTop: 8, paddingBottom: 9 },
            },
          ],
        };
      }),
    ),
    F3 = de(du, {
      name: "MuiFilledInput",
      slot: "Input",
      overridesResolver: cu,
    })(
      ht(({ theme: e }) => ({
        paddingTop: 25,
        paddingRight: 12,
        paddingBottom: 8,
        paddingLeft: 12,
        ...(!e.vars && {
          "&:-webkit-autofill": {
            WebkitBoxShadow:
              e.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
            WebkitTextFillColor: e.palette.mode === "light" ? null : "#fff",
            caretColor: e.palette.mode === "light" ? null : "#fff",
            borderTopLeftRadius: "inherit",
            borderTopRightRadius: "inherit",
          },
        }),
        ...(e.vars && {
          "&:-webkit-autofill": {
            borderTopLeftRadius: "inherit",
            borderTopRightRadius: "inherit",
          },
          [e.getColorSchemeSelector("dark")]: {
            "&:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 100px #266798 inset",
              WebkitTextFillColor: "#fff",
              caretColor: "#fff",
            },
          },
        }),
        variants: [
          {
            props: { size: "small" },
            style: { paddingTop: 21, paddingBottom: 4 },
          },
          {
            props: ({ ownerState: n }) => n.hiddenLabel,
            style: { paddingTop: 16, paddingBottom: 17 },
          },
          {
            props: ({ ownerState: n }) => n.startAdornment,
            style: { paddingLeft: 0 },
          },
          {
            props: ({ ownerState: n }) => n.endAdornment,
            style: { paddingRight: 0 },
          },
          {
            props: ({ ownerState: n }) => n.hiddenLabel && n.size === "small",
            style: { paddingTop: 8, paddingBottom: 9 },
          },
          {
            props: ({ ownerState: n }) => n.multiline,
            style: {
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 0,
              paddingRight: 0,
            },
          },
        ],
      })),
    ),
    Qd = O.forwardRef(function (n, a) {
      const o = Ye({ props: n, name: "MuiFilledInput" }),
        {
          disableUnderline: s = !1,
          components: u = {},
          componentsProps: c,
          fullWidth: d = !1,
          hiddenLabel: h,
          inputComponent: m = "input",
          multiline: g = !1,
          slotProps: b,
          slots: x = {},
          type: C = "text",
          ..._
        } = o,
        v = {
          ...o,
          disableUnderline: s,
          fullWidth: d,
          inputComponent: m,
          multiline: g,
          type: C,
        },
        E = P3(o),
        w = { root: { ownerState: v }, input: { ownerState: v } },
        D = (b ?? c) ? Ut(w, b ?? c) : w,
        R = x.root ?? u.Root ?? q3,
        M = x.input ?? u.Input ?? F3;
      return P.jsx(Vd, {
        slots: { root: R, input: M },
        slotProps: D,
        fullWidth: d,
        inputComponent: m,
        multiline: g,
        ref: a,
        type: C,
        ..._,
        classes: E,
      });
    });
  Qd.muiName = "Input";
  function G3(e) {
    return Ve("MuiFormControl", e);
  }
  et("MuiFormControl", [
    "root",
    "marginNone",
    "marginNormal",
    "marginDense",
    "fullWidth",
    "disabled",
  ]);
  const V3 = (e) => {
      const { classes: n, margin: a, fullWidth: o } = e,
        s = {
          root: ["root", a !== "none" && `margin${_e(a)}`, o && "fullWidth"],
        };
      return Ke(s, G3, n);
    },
    K3 = de("div", {
      name: "MuiFormControl",
      slot: "Root",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [n.root, n[`margin${_e(a.margin)}`], a.fullWidth && n.fullWidth];
      },
    })({
      display: "inline-flex",
      flexDirection: "column",
      position: "relative",
      minWidth: 0,
      padding: 0,
      margin: 0,
      border: 0,
      verticalAlign: "top",
      variants: [
        {
          props: { margin: "normal" },
          style: { marginTop: 16, marginBottom: 8 },
        },
        {
          props: { margin: "dense" },
          style: { marginTop: 8, marginBottom: 4 },
        },
        { props: { fullWidth: !0 }, style: { width: "100%" } },
      ],
    }),
    Y3 = O.forwardRef(function (n, a) {
      const o = Ye({ props: n, name: "MuiFormControl" }),
        {
          children: s,
          className: u,
          color: c = "primary",
          component: d = "div",
          disabled: h = !1,
          error: m = !1,
          focused: g,
          fullWidth: b = !1,
          hiddenLabel: x = !1,
          margin: C = "none",
          required: _ = !1,
          size: v = "medium",
          variant: E = "outlined",
          ...w
        } = o,
        D = {
          ...o,
          color: c,
          component: d,
          disabled: h,
          error: m,
          fullWidth: b,
          hiddenLabel: x,
          margin: C,
          required: _,
          size: v,
          variant: E,
        },
        R = V3(D),
        [M, A] = O.useState(() => {
          let J = !1;
          return (
            s &&
              O.Children.forEach(s, (z) => {
                if (!xd(z, ["Input", "Select"])) return;
                const Y = xd(z, ["Select"]) ? z.props.input : z;
                Y && $N(Y.props) && (J = !0);
              }),
            J
          );
        }),
        [L, G] = O.useState(() => {
          let J = !1;
          return (
            s &&
              O.Children.forEach(s, (z) => {
                xd(z, ["Input", "Select"]) &&
                  (lu(z.props, !0) || lu(z.props.inputProps, !0)) &&
                  (J = !0);
              }),
            J
          );
        }),
        [q, W] = O.useState(!1);
      h && q && W(!1);
      const S = g !== void 0 && !h ? g : q;
      let I;
      O.useRef(!1);
      const X = O.useCallback(() => {
          G(!0);
        }, []),
        oe = O.useCallback(() => {
          G(!1);
        }, []),
        se = O.useMemo(
          () => ({
            adornedStart: M,
            setAdornedStart: A,
            color: c,
            disabled: h,
            error: m,
            filled: L,
            focused: S,
            fullWidth: b,
            hiddenLabel: x,
            size: v,
            onBlur: () => {
              W(!1);
            },
            onFocus: () => {
              W(!0);
            },
            onEmpty: oe,
            onFilled: X,
            registerEffect: I,
            required: _,
            variant: E,
          }),
          [M, c, h, m, L, S, b, x, I, oe, X, _, v, E],
        );
      return P.jsx(Gd.Provider, {
        value: se,
        children: P.jsx(K3, {
          as: d,
          ownerState: D,
          className: Te(R.root, u),
          ref: a,
          ...w,
          children: s,
        }),
      });
    });
  function X3(e) {
    return Ve("MuiFormHelperText", e);
  }
  const _v = et("MuiFormHelperText", [
    "root",
    "error",
    "disabled",
    "sizeSmall",
    "sizeMedium",
    "contained",
    "focused",
    "filled",
    "required",
  ]);
  var Tv;
  const W3 = (e) => {
      const {
          classes: n,
          contained: a,
          size: o,
          disabled: s,
          error: u,
          filled: c,
          focused: d,
          required: h,
        } = e,
        m = {
          root: [
            "root",
            s && "disabled",
            u && "error",
            o && `size${_e(o)}`,
            a && "contained",
            d && "focused",
            c && "filled",
            h && "required",
          ],
        };
      return Ke(m, X3, n);
    },
    Q3 = de("p", {
      name: "MuiFormHelperText",
      slot: "Root",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [
          n.root,
          a.size && n[`size${_e(a.size)}`],
          a.contained && n.contained,
          a.filled && n.filled,
        ];
      },
    })(
      ht(({ theme: e }) => ({
        color: (e.vars || e).palette.text.secondary,
        ...e.typography.caption,
        textAlign: "left",
        marginTop: 3,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        [`&.${_v.disabled}`]: { color: (e.vars || e).palette.text.disabled },
        [`&.${_v.error}`]: { color: (e.vars || e).palette.error.main },
        variants: [
          { props: { size: "small" }, style: { marginTop: 4 } },
          {
            props: ({ ownerState: n }) => n.contained,
            style: { marginLeft: 14, marginRight: 14 },
          },
        ],
      })),
    ),
    Z3 = O.forwardRef(function (n, a) {
      const o = Ye({ props: n, name: "MuiFormHelperText" }),
        {
          children: s,
          className: u,
          component: c = "p",
          disabled: d,
          error: h,
          filled: m,
          focused: g,
          margin: b,
          required: x,
          variant: C,
          ..._
        } = o,
        v = Co(),
        E = xo({
          props: o,
          muiFormControl: v,
          states: [
            "variant",
            "size",
            "disabled",
            "error",
            "filled",
            "focused",
            "required",
          ],
        }),
        w = {
          ...o,
          component: c,
          contained: E.variant === "filled" || E.variant === "outlined",
          variant: E.variant,
          size: E.size,
          disabled: E.disabled,
          error: E.error,
          filled: E.filled,
          focused: E.focused,
          required: E.required,
        };
      delete w.ownerState;
      const D = W3(w);
      return P.jsx(Q3, {
        as: c,
        className: Te(D.root, u),
        ref: a,
        ..._,
        ownerState: w,
        children:
          s === " "
            ? Tv ||
              (Tv = P.jsx("span", {
                className: "notranslate",
                "aria-hidden": !0,
                children: "​",
              }))
            : s,
      });
    });
  function J3(e) {
    return Ve("MuiFormLabel", e);
  }
  const Gi = et("MuiFormLabel", [
      "root",
      "colorSecondary",
      "focused",
      "disabled",
      "error",
      "filled",
      "required",
      "asterisk",
    ]),
    e5 = (e) => {
      const {
          classes: n,
          color: a,
          focused: o,
          disabled: s,
          error: u,
          filled: c,
          required: d,
        } = e,
        h = {
          root: [
            "root",
            `color${_e(a)}`,
            s && "disabled",
            u && "error",
            c && "filled",
            o && "focused",
            d && "required",
          ],
          asterisk: ["asterisk", u && "error"],
        };
      return Ke(h, J3, n);
    },
    t5 = de("label", {
      name: "MuiFormLabel",
      slot: "Root",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [
          n.root,
          a.color === "secondary" && n.colorSecondary,
          a.filled && n.filled,
        ];
      },
    })(
      ht(({ theme: e }) => ({
        color: (e.vars || e).palette.text.secondary,
        ...e.typography.body1,
        lineHeight: "1.4375em",
        padding: 0,
        position: "relative",
        variants: [
          ...Object.entries(e.palette)
            .filter(La())
            .map(([n]) => ({
              props: { color: n },
              style: {
                [`&.${Gi.focused}`]: { color: (e.vars || e).palette[n].main },
              },
            })),
          {
            props: {},
            style: {
              [`&.${Gi.disabled}`]: {
                color: (e.vars || e).palette.text.disabled,
              },
              [`&.${Gi.error}`]: { color: (e.vars || e).palette.error.main },
            },
          },
        ],
      })),
    ),
    n5 = de("span", { name: "MuiFormLabel", slot: "Asterisk" })(
      ht(({ theme: e }) => ({
        [`&.${Gi.error}`]: { color: (e.vars || e).palette.error.main },
      })),
    ),
    r5 = O.forwardRef(function (n, a) {
      const o = Ye({ props: n, name: "MuiFormLabel" }),
        {
          children: s,
          className: u,
          color: c,
          component: d = "label",
          disabled: h,
          error: m,
          filled: g,
          focused: b,
          required: x,
          ...C
        } = o,
        _ = Co(),
        v = xo({
          props: o,
          muiFormControl: _,
          states: [
            "color",
            "required",
            "focused",
            "disabled",
            "error",
            "filled",
          ],
        }),
        E = {
          ...o,
          color: v.color || "primary",
          component: d,
          disabled: v.disabled,
          error: v.error,
          filled: v.filled,
          focused: v.focused,
          required: v.required,
        },
        w = e5(E);
      return P.jsxs(t5, {
        as: d,
        ownerState: E,
        className: Te(w.root, u),
        ref: a,
        ...C,
        children: [
          s,
          v.required &&
            P.jsxs(n5, {
              ownerState: E,
              "aria-hidden": !0,
              className: w.asterisk,
              children: [" ", "*"],
            }),
        ],
      });
    });
  function Zd(e) {
    return `scale(${e}, ${e ** 2})`;
  }
  const a5 = {
      entering: { opacity: 1, transform: Zd(1) },
      entered: { opacity: 1, transform: "none" },
    },
    Jd =
      typeof navigator < "u" &&
      /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) &&
      /(os |version\/)15(.|_)4/i.test(navigator.userAgent),
    ep = O.forwardRef(function (n, a) {
      const {
          addEndListener: o,
          appear: s = !0,
          children: u,
          easing: c,
          in: d,
          onEnter: h,
          onEntered: m,
          onEntering: g,
          onExit: b,
          onExited: x,
          onExiting: C,
          style: _,
          timeout: v = "auto",
          TransitionComponent: E = lr,
          ...w
        } = n,
        D = K0(),
        R = O.useRef(),
        M = eu(),
        A = O.useRef(null),
        L = cn(A, Pi(u), a),
        G = (J) => (z) => {
          if (J) {
            const Y = A.current;
            z === void 0 ? J(Y) : J(Y, z);
          }
        },
        q = G(g),
        W = G((J, z) => {
          Y0(J);
          const {
            duration: Y,
            delay: ie,
            easing: re,
          } = ou({ style: _, timeout: v, easing: c }, { mode: "enter" });
          let N;
          (v === "auto"
            ? ((N = M.transitions.getAutoHeightDuration(J.clientHeight)),
              (R.current = N))
            : (N = Y),
            (J.style.transition = [
              M.transitions.create("opacity", { duration: N, delay: ie }),
              M.transitions.create("transform", {
                duration: Jd ? N : N * 0.666,
                delay: ie,
                easing: re,
              }),
            ].join(",")),
            h && h(J, z));
        }),
        S = G(m),
        I = G(C),
        X = G((J) => {
          const {
            duration: z,
            delay: Y,
            easing: ie,
          } = ou({ style: _, timeout: v, easing: c }, { mode: "exit" });
          let re;
          (v === "auto"
            ? ((re = M.transitions.getAutoHeightDuration(J.clientHeight)),
              (R.current = re))
            : (re = z),
            (J.style.transition = [
              M.transitions.create("opacity", { duration: re, delay: Y }),
              M.transitions.create("transform", {
                duration: Jd ? re : re * 0.666,
                delay: Jd ? Y : Y || re * 0.333,
                easing: ie,
              }),
            ].join(",")),
            (J.style.opacity = 0),
            (J.style.transform = Zd(0.75)),
            b && b(J));
        }),
        oe = G(x),
        se = (J) => {
          (v === "auto" && D.start(R.current || 0, J), o && o(A.current, J));
        };
      return P.jsx(E, {
        appear: s,
        in: d,
        nodeRef: A,
        onEnter: W,
        onEntered: S,
        onEntering: q,
        onExit: X,
        onExited: oe,
        onExiting: I,
        addEndListener: se,
        timeout: v === "auto" ? null : v,
        ...w,
        children: (J, { ownerState: z, ...Y }) =>
          O.cloneElement(u, {
            style: {
              opacity: 0,
              transform: Zd(0.75),
              visibility: J === "exited" && !d ? "hidden" : void 0,
              ...a5[J],
              ..._,
              ...u.props.style,
            },
            ref: L,
            ...Y,
          }),
      });
    });
  ep && (ep.muiSupportAuto = !0);
  const o5 = (e) => {
      const { classes: n, disableUnderline: a } = e,
        s = Ke({ root: ["root", !a && "underline"], input: ["input"] }, PN, n);
      return { ...n, ...s };
    },
    i5 = de(fu, {
      shouldForwardProp: (e) => Kn(e) || e === "classes",
      name: "MuiInput",
      slot: "Root",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [...uu(e, n), !a.disableUnderline && n.underline];
      },
    })(
      ht(({ theme: e }) => {
        let a =
          e.palette.mode === "light"
            ? "rgba(0, 0, 0, 0.42)"
            : "rgba(255, 255, 255, 0.7)";
        return (
          e.vars &&
            (a = `rgba(${e.vars.palette.common.onBackgroundChannel} / ${e.vars.opacity.inputUnderline})`),
          {
            position: "relative",
            variants: [
              {
                props: ({ ownerState: o }) => o.formControl,
                style: { "label + &": { marginTop: 16 } },
              },
              {
                props: ({ ownerState: o }) => !o.disableUnderline,
                style: {
                  "&::after": {
                    left: 0,
                    bottom: 0,
                    content: '""',
                    position: "absolute",
                    right: 0,
                    transform: "scaleX(0)",
                    transition: e.transitions.create("transform", {
                      duration: e.transitions.duration.shorter,
                      easing: e.transitions.easing.easeOut,
                    }),
                    pointerEvents: "none",
                  },
                  [`&.${qi.focused}:after`]: {
                    transform: "scaleX(1) translateX(0)",
                  },
                  [`&.${qi.error}`]: {
                    "&::before, &::after": {
                      borderBottomColor: (e.vars || e).palette.error.main,
                    },
                  },
                  "&::before": {
                    borderBottom: `1px solid ${a}`,
                    left: 0,
                    bottom: 0,
                    content: '"\\00a0"',
                    position: "absolute",
                    right: 0,
                    transition: e.transitions.create("border-bottom-color", {
                      duration: e.transitions.duration.shorter,
                    }),
                    pointerEvents: "none",
                  },
                  [`&:hover:not(.${qi.disabled}, .${qi.error}):before`]: {
                    borderBottom: `2px solid ${(e.vars || e).palette.text.primary}`,
                    "@media (hover: none)": { borderBottom: `1px solid ${a}` },
                  },
                  [`&.${qi.disabled}:before`]: { borderBottomStyle: "dotted" },
                },
              },
              ...Object.entries(e.palette)
                .filter(La())
                .map(([o]) => ({
                  props: { color: o, disableUnderline: !1 },
                  style: {
                    "&::after": {
                      borderBottom: `2px solid ${(e.vars || e).palette[o].main}`,
                    },
                  },
                })),
            ],
          }
        );
      }),
    ),
    s5 = de(du, { name: "MuiInput", slot: "Input", overridesResolver: cu })({}),
    tp = O.forwardRef(function (n, a) {
      const o = Ye({ props: n, name: "MuiInput" }),
        {
          disableUnderline: s = !1,
          components: u = {},
          componentsProps: c,
          fullWidth: d = !1,
          inputComponent: h = "input",
          multiline: m = !1,
          slotProps: g,
          slots: b = {},
          type: x = "text",
          ...C
        } = o,
        _ = o5(o),
        E = { root: { ownerState: { disableUnderline: s } } },
        w = (g ?? c) ? Ut(g ?? c, E) : E,
        D = b.root ?? u.Root ?? i5,
        R = b.input ?? u.Input ?? s5;
      return P.jsx(Vd, {
        slots: { root: D, input: R },
        slotProps: w,
        fullWidth: d,
        inputComponent: h,
        multiline: m,
        ref: a,
        type: x,
        ...C,
        classes: _,
      });
    });
  tp.muiName = "Input";
  function l5(e) {
    return Ve("MuiInputLabel", e);
  }
  et("MuiInputLabel", [
    "root",
    "focused",
    "disabled",
    "error",
    "required",
    "asterisk",
    "formControl",
    "sizeSmall",
    "shrink",
    "animated",
    "standard",
    "filled",
    "outlined",
  ]);
  const u5 = (e) => {
      const {
          classes: n,
          formControl: a,
          size: o,
          shrink: s,
          disableAnimation: u,
          variant: c,
          required: d,
        } = e,
        h = {
          root: [
            "root",
            a && "formControl",
            !u && "animated",
            s && "shrink",
            o && o !== "medium" && `size${_e(o)}`,
            c,
          ],
          asterisk: [d && "asterisk"],
        },
        m = Ke(h, l5, n);
      return { ...n, ...m };
    },
    c5 = de(r5, {
      shouldForwardProp: (e) => Kn(e) || e === "classes",
      name: "MuiInputLabel",
      slot: "Root",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [
          { [`& .${Gi.asterisk}`]: n.asterisk },
          n.root,
          a.formControl && n.formControl,
          a.size === "small" && n.sizeSmall,
          a.shrink && n.shrink,
          !a.disableAnimation && n.animated,
          a.focused && n.focused,
          n[a.variant],
        ];
      },
    })(
      ht(({ theme: e }) => ({
        display: "block",
        transformOrigin: "top left",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "100%",
        variants: [
          {
            props: ({ ownerState: n }) => n.formControl,
            style: {
              position: "absolute",
              left: 0,
              top: 0,
              transform: "translate(0, 20px) scale(1)",
            },
          },
          {
            props: { size: "small" },
            style: { transform: "translate(0, 17px) scale(1)" },
          },
          {
            props: ({ ownerState: n }) => n.shrink,
            style: {
              transform: "translate(0, -1.5px) scale(0.75)",
              transformOrigin: "top left",
              maxWidth: "133%",
            },
          },
          {
            props: ({ ownerState: n }) => !n.disableAnimation,
            style: {
              transition: e.transitions.create(
                ["color", "transform", "max-width"],
                {
                  duration: e.transitions.duration.shorter,
                  easing: e.transitions.easing.easeOut,
                },
              ),
            },
          },
          {
            props: { variant: "filled" },
            style: {
              zIndex: 1,
              pointerEvents: "none",
              transform: "translate(12px, 16px) scale(1)",
              maxWidth: "calc(100% - 24px)",
            },
          },
          {
            props: { variant: "filled", size: "small" },
            style: { transform: "translate(12px, 13px) scale(1)" },
          },
          {
            props: ({ variant: n, ownerState: a }) =>
              n === "filled" && a.shrink,
            style: {
              userSelect: "none",
              pointerEvents: "auto",
              transform: "translate(12px, 7px) scale(0.75)",
              maxWidth: "calc(133% - 24px)",
            },
          },
          {
            props: ({ variant: n, ownerState: a, size: o }) =>
              n === "filled" && a.shrink && o === "small",
            style: { transform: "translate(12px, 4px) scale(0.75)" },
          },
          {
            props: { variant: "outlined" },
            style: {
              zIndex: 1,
              pointerEvents: "none",
              transform: "translate(14px, 16px) scale(1)",
              maxWidth: "calc(100% - 24px)",
            },
          },
          {
            props: { variant: "outlined", size: "small" },
            style: { transform: "translate(14px, 9px) scale(1)" },
          },
          {
            props: ({ variant: n, ownerState: a }) =>
              n === "outlined" && a.shrink,
            style: {
              userSelect: "none",
              pointerEvents: "auto",
              maxWidth: "calc(133% - 32px)",
              transform: "translate(14px, -9px) scale(0.75)",
            },
          },
        ],
      })),
    ),
    f5 = O.forwardRef(function (n, a) {
      const o = Ye({ name: "MuiInputLabel", props: n }),
        {
          disableAnimation: s = !1,
          margin: u,
          shrink: c,
          variant: d,
          className: h,
          ...m
        } = o,
        g = Co();
      let b = c;
      typeof b > "u" && g && (b = g.filled || g.focused || g.adornedStart);
      const x = xo({
          props: o,
          muiFormControl: g,
          states: ["size", "variant", "required", "focused"],
        }),
        C = {
          ...o,
          disableAnimation: s,
          formControl: g,
          shrink: b,
          size: x.size,
          variant: x.variant,
          required: x.required,
          focused: x.focused,
        },
        _ = u5(C);
      return P.jsx(c5, {
        "data-shrink": b,
        ref: a,
        className: Te(_.root, h),
        ...m,
        ownerState: C,
        classes: _,
      });
    }),
    d5 = O.createContext({});
  function p5(e) {
    return Ve("MuiList", e);
  }
  et("MuiList", ["root", "padding", "dense", "subheader"]);
  const h5 = (e) => {
      const { classes: n, disablePadding: a, dense: o, subheader: s } = e;
      return Ke(
        { root: ["root", !a && "padding", o && "dense", s && "subheader"] },
        p5,
        n,
      );
    },
    m5 = de("ul", {
      name: "MuiList",
      slot: "Root",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [
          n.root,
          !a.disablePadding && n.padding,
          a.dense && n.dense,
          a.subheader && n.subheader,
        ];
      },
    })({
      listStyle: "none",
      margin: 0,
      padding: 0,
      position: "relative",
      variants: [
        {
          props: ({ ownerState: e }) => !e.disablePadding,
          style: { paddingTop: 8, paddingBottom: 8 },
        },
        { props: ({ ownerState: e }) => e.subheader, style: { paddingTop: 0 } },
      ],
    }),
    g5 = O.forwardRef(function (n, a) {
      const o = Ye({ props: n, name: "MuiList" }),
        {
          children: s,
          className: u,
          component: c = "ul",
          dense: d = !1,
          disablePadding: h = !1,
          subheader: m,
          ...g
        } = o,
        b = O.useMemo(() => ({ dense: d }), [d]),
        x = { ...o, component: c, dense: d, disablePadding: h },
        C = h5(x);
      return P.jsx(d5.Provider, {
        value: b,
        children: P.jsxs(m5, {
          as: c,
          className: Te(C.root, u),
          ref: a,
          ownerState: x,
          ...g,
          children: [m, s],
        }),
      });
    });
  function np(e, n, a) {
    return e === n
      ? e.firstChild
      : n && n.nextElementSibling
        ? n.nextElementSibling
        : a
          ? null
          : e.firstChild;
  }
  function xv(e, n, a) {
    return e === n
      ? a
        ? e.firstChild
        : e.lastChild
      : n && n.previousElementSibling
        ? n.previousElementSibling
        : a
          ? null
          : e.lastChild;
  }
  function Cv(e, n) {
    if (n === void 0) return !0;
    let a = e.innerText;
    return (
      a === void 0 && (a = e.textContent),
      (a = a.trim().toLowerCase()),
      a.length === 0
        ? !1
        : n.repeating
          ? a[0] === n.keys[0]
          : a.startsWith(n.keys.join(""))
    );
  }
  function Vi(e, n, a, o, s, u) {
    let c = !1,
      d = s(e, n, n ? a : !1);
    for (; d; ) {
      if (d === e.firstChild) {
        if (c) return !1;
        c = !0;
      }
      const h = o
        ? !1
        : d.disabled || d.getAttribute("aria-disabled") === "true";
      if (!d.hasAttribute("tabindex") || !Cv(d, u) || h) d = s(e, d, a);
      else return (d.focus(), !0);
    }
    return !1;
  }
  const y5 = O.forwardRef(function (n, a) {
    const {
        actions: o,
        autoFocus: s = !1,
        autoFocusItem: u = !1,
        children: c,
        className: d,
        disabledItemsFocusable: h = !1,
        disableListWrap: m = !1,
        onKeyDown: g,
        variant: b = "selectedMenu",
        ...x
      } = n,
      C = O.useRef(null),
      _ = O.useRef({
        keys: [],
        repeating: !0,
        previousKeyMatched: !0,
        lastTime: null,
      });
    (qr(() => {
      s && C.current.focus();
    }, [s]),
      O.useImperativeHandle(
        o,
        () => ({
          adjustStyleForScrollbar: (R, { direction: M }) => {
            const A = !C.current.style.width;
            if (R.clientHeight < C.current.clientHeight && A) {
              const L = `${dv(_r(R))}px`;
              ((C.current.style[M === "rtl" ? "paddingLeft" : "paddingRight"] =
                L),
                (C.current.style.width = `calc(100% + ${L})`));
            }
            return C.current;
          },
        }),
        [],
      ));
    const v = (R) => {
        const M = C.current,
          A = R.key;
        if (R.ctrlKey || R.metaKey || R.altKey) {
          g && g(R);
          return;
        }
        const G = Yn(M).activeElement;
        if (A === "ArrowDown") (R.preventDefault(), Vi(M, G, m, h, np));
        else if (A === "ArrowUp") (R.preventDefault(), Vi(M, G, m, h, xv));
        else if (A === "Home") (R.preventDefault(), Vi(M, null, m, h, np));
        else if (A === "End") (R.preventDefault(), Vi(M, null, m, h, xv));
        else if (A.length === 1) {
          const q = _.current,
            W = A.toLowerCase(),
            S = performance.now();
          (q.keys.length > 0 &&
            (S - q.lastTime > 500
              ? ((q.keys = []), (q.repeating = !0), (q.previousKeyMatched = !0))
              : q.repeating && W !== q.keys[0] && (q.repeating = !1)),
            (q.lastTime = S),
            q.keys.push(W));
          const I = G && !q.repeating && Cv(G, q);
          q.previousKeyMatched && (I || Vi(M, G, !1, h, np, q))
            ? R.preventDefault()
            : (q.previousKeyMatched = !1);
        }
        g && g(R);
      },
      E = cn(C, a);
    let w = -1;
    O.Children.forEach(c, (R, M) => {
      if (!O.isValidElement(R)) {
        w === M && ((w += 1), w >= c.length && (w = -1));
        return;
      }
      (R.props.disabled ||
        (((b === "selectedMenu" && R.props.selected) || w === -1) && (w = M)),
        w === M &&
          (R.props.disabled ||
            R.props.muiSkipListHighlight ||
            R.type.muiSkipListHighlight) &&
          ((w += 1), w >= c.length && (w = -1)));
    });
    const D = O.Children.map(c, (R, M) => {
      if (M === w) {
        const A = {};
        return (
          u && (A.autoFocus = !0),
          R.props.tabIndex === void 0 &&
            b === "selectedMenu" &&
            (A.tabIndex = 0),
          O.cloneElement(R, A)
        );
      }
      return R;
    });
    return P.jsx(g5, {
      role: "menu",
      ref: E,
      className: d,
      onKeyDown: v,
      tabIndex: s ? 0 : -1,
      ...x,
      children: D,
    });
  });
  function b5(e) {
    return Ve("MuiPopover", e);
  }
  et("MuiPopover", ["root", "paper"]);
  function wv(e, n) {
    let a = 0;
    return (
      typeof n == "number"
        ? (a = n)
        : n === "center"
          ? (a = e.height / 2)
          : n === "bottom" && (a = e.height),
      a
    );
  }
  function Rv(e, n) {
    let a = 0;
    return (
      typeof n == "number"
        ? (a = n)
        : n === "center"
          ? (a = e.width / 2)
          : n === "right" && (a = e.width),
      a
    );
  }
  function Av(e) {
    return [e.horizontal, e.vertical]
      .map((n) => (typeof n == "number" ? `${n}px` : n))
      .join(" ");
  }
  function mu(e) {
    return typeof e == "function" ? e() : e;
  }
  const v5 = (e) => {
      const { classes: n } = e;
      return Ke({ root: ["root"], paper: ["paper"] }, b5, n);
    },
    S5 = de(gv, { name: "MuiPopover", slot: "Root" })({}),
    Ov = de($d, { name: "MuiPopover", slot: "Paper" })({
      position: "absolute",
      overflowY: "auto",
      overflowX: "hidden",
      minWidth: 16,
      minHeight: 16,
      maxWidth: "calc(100% - 32px)",
      maxHeight: "calc(100% - 32px)",
      outline: 0,
    }),
    E5 = O.forwardRef(function (n, a) {
      const o = Ye({ props: n, name: "MuiPopover" }),
        {
          action: s,
          anchorEl: u,
          anchorOrigin: c = { vertical: "top", horizontal: "left" },
          anchorPosition: d,
          anchorReference: h = "anchorEl",
          children: m,
          className: g,
          container: b,
          elevation: x = 8,
          marginThreshold: C = 16,
          open: _,
          PaperProps: v = {},
          slots: E = {},
          slotProps: w = {},
          transformOrigin: D = { vertical: "top", horizontal: "left" },
          TransitionComponent: R,
          transitionDuration: M = "auto",
          TransitionProps: A = {},
          disableScrollLock: L = !1,
          ...G
        } = o,
        q = O.useRef(),
        W = {
          ...o,
          anchorOrigin: c,
          anchorReference: h,
          elevation: x,
          marginThreshold: C,
          transformOrigin: D,
          TransitionComponent: R,
          transitionDuration: M,
          TransitionProps: A,
        },
        S = v5(W),
        I = O.useCallback(() => {
          if (h === "anchorPosition") return d;
          const ge = mu(u),
            Me = (
              ge && ge.nodeType === 1 ? ge : Yn(q.current).body
            ).getBoundingClientRect();
          return {
            top: Me.top + wv(Me, c.vertical),
            left: Me.left + Rv(Me, c.horizontal),
          };
        }, [u, c.horizontal, c.vertical, d, h]),
        X = O.useCallback(
          (ge) => ({
            vertical: wv(ge, D.vertical),
            horizontal: Rv(ge, D.horizontal),
          }),
          [D.horizontal, D.vertical],
        ),
        oe = O.useCallback(
          (ge) => {
            const Oe = { width: ge.offsetWidth, height: ge.offsetHeight },
              Me = X(Oe);
            if (h === "none")
              return { top: null, left: null, transformOrigin: Av(Me) };
            const Ie = I();
            let Re = Ie.top - Me.vertical,
              Xe = Ie.left - Me.horizontal;
            const Gt = Re + Oe.height,
              We = Xe + Oe.width,
              ft = _r(mu(u)),
              ut = ft.innerHeight - C,
              mt = ft.innerWidth - C;
            if (C !== null && Re < C) {
              const Fe = Re - C;
              ((Re -= Fe), (Me.vertical += Fe));
            } else if (C !== null && Gt > ut) {
              const Fe = Gt - ut;
              ((Re -= Fe), (Me.vertical += Fe));
            }
            if (C !== null && Xe < C) {
              const Fe = Xe - C;
              ((Xe -= Fe), (Me.horizontal += Fe));
            } else if (We > mt) {
              const Fe = We - mt;
              ((Xe -= Fe), (Me.horizontal += Fe));
            }
            return {
              top: `${Math.round(Re)}px`,
              left: `${Math.round(Xe)}px`,
              transformOrigin: Av(Me),
            };
          },
          [u, h, I, X, C],
        ),
        [se, J] = O.useState(_),
        z = O.useCallback(() => {
          const ge = q.current;
          if (!ge) return;
          const Oe = oe(ge);
          (Oe.top !== null && ge.style.setProperty("top", Oe.top),
            Oe.left !== null && (ge.style.left = Oe.left),
            (ge.style.transformOrigin = Oe.transformOrigin),
            J(!0));
        }, [oe]);
      O.useEffect(
        () => (
          L && window.addEventListener("scroll", z),
          () => window.removeEventListener("scroll", z)
        ),
        [u, L, z],
      );
      const Y = () => {
          z();
        },
        ie = () => {
          J(!1);
        };
      (O.useEffect(() => {
        _ && z();
      }),
        O.useImperativeHandle(
          s,
          () =>
            _
              ? {
                  updatePosition: () => {
                    z();
                  },
                }
              : null,
          [_, z],
        ),
        O.useEffect(() => {
          if (!_) return;
          const ge = k0(() => {
              z();
            }),
            Oe = _r(mu(u));
          return (
            Oe.addEventListener("resize", ge),
            () => {
              (ge.clear(), Oe.removeEventListener("resize", ge));
            }
          );
        }, [u, _, z]));
      let re = M;
      const N = {
          slots: { transition: R, ...E },
          slotProps: { transition: A, paper: v, ...w },
        },
        [K, ae] = Rt("transition", {
          elementType: ep,
          externalForwardedProps: N,
          ownerState: W,
          getSlotProps: (ge) => ({
            ...ge,
            onEntering: (Oe, Me) => {
              var Ie;
              ((Ie = ge.onEntering) == null || Ie.call(ge, Oe, Me), Y());
            },
            onExited: (Oe) => {
              var Me;
              ((Me = ge.onExited) == null || Me.call(ge, Oe), ie());
            },
          }),
          additionalProps: { appear: !0, in: _ },
        });
      M === "auto" && !K.muiSupportAuto && (re = void 0);
      const te = b || (u ? Yn(mu(u)).body : void 0),
        [le, { slots: ce, slotProps: fe, ...Ae }] = Rt("root", {
          ref: a,
          elementType: S5,
          externalForwardedProps: { ...N, ...G },
          shouldForwardComponentProp: !0,
          additionalProps: {
            slots: { backdrop: E.backdrop },
            slotProps: {
              backdrop: PD(
                typeof w.backdrop == "function" ? w.backdrop(W) : w.backdrop,
                { invisible: !0 },
              ),
            },
            container: te,
            open: _,
          },
          ownerState: W,
          className: Te(S.root, g),
        }),
        [xe, ke] = Rt("paper", {
          ref: q,
          className: S.paper,
          elementType: Ov,
          externalForwardedProps: N,
          shouldForwardComponentProp: !0,
          additionalProps: {
            elevation: x,
            style: se ? void 0 : { opacity: 0 },
          },
          ownerState: W,
        });
      return P.jsx(le, {
        ...Ae,
        ...(!Fd(le) && { slots: ce, slotProps: fe, disableScrollLock: L }),
        children: P.jsx(K, {
          ...ae,
          timeout: re,
          children: P.jsx(xe, { ...ke, children: m }),
        }),
      });
    });
  function _5(e) {
    return Ve("MuiMenu", e);
  }
  et("MuiMenu", ["root", "paper", "list"]);
  const T5 = { vertical: "top", horizontal: "right" },
    x5 = { vertical: "top", horizontal: "left" },
    C5 = (e) => {
      const { classes: n } = e;
      return Ke({ root: ["root"], paper: ["paper"], list: ["list"] }, _5, n);
    },
    w5 = de(E5, {
      shouldForwardProp: (e) => Kn(e) || e === "classes",
      name: "MuiMenu",
      slot: "Root",
    })({}),
    R5 = de(Ov, { name: "MuiMenu", slot: "Paper" })({
      maxHeight: "calc(100% - 96px)",
      WebkitOverflowScrolling: "touch",
    }),
    A5 = de(y5, { name: "MuiMenu", slot: "List" })({ outline: 0 }),
    O5 = O.forwardRef(function (n, a) {
      const o = Ye({ props: n, name: "MuiMenu" }),
        {
          autoFocus: s = !0,
          children: u,
          className: c,
          disableAutoFocusItem: d = !1,
          MenuListProps: h = {},
          onClose: m,
          open: g,
          PaperProps: b = {},
          PopoverClasses: x,
          transitionDuration: C = "auto",
          TransitionProps: { onEntering: _, ...v } = {},
          variant: E = "selectedMenu",
          slots: w = {},
          slotProps: D = {},
          ...R
        } = o,
        M = DM(),
        A = {
          ...o,
          autoFocus: s,
          disableAutoFocusItem: d,
          MenuListProps: h,
          onEntering: _,
          PaperProps: b,
          transitionDuration: C,
          TransitionProps: v,
          variant: E,
        },
        L = C5(A),
        G = s && !d && g,
        q = O.useRef(null),
        W = (re, N) => {
          (q.current &&
            q.current.adjustStyleForScrollbar(re, {
              direction: M ? "rtl" : "ltr",
            }),
            _ && _(re, N));
        },
        S = (re) => {
          re.key === "Tab" && (re.preventDefault(), m && m(re, "tabKeyDown"));
        };
      let I = -1;
      O.Children.map(u, (re, N) => {
        O.isValidElement(re) &&
          (re.props.disabled ||
            (((E === "selectedMenu" && re.props.selected) || I === -1) &&
              (I = N)));
      });
      const X = {
          slots: w,
          slotProps: { list: h, transition: v, paper: b, ...D },
        },
        oe = kN({
          elementType: w.root,
          externalSlotProps: D.root,
          ownerState: A,
          className: [L.root, c],
        }),
        [se, J] = Rt("paper", {
          className: L.paper,
          elementType: R5,
          externalForwardedProps: X,
          shouldForwardComponentProp: !0,
          ownerState: A,
        }),
        [z, Y] = Rt("list", {
          className: Te(L.list, h.className),
          elementType: A5,
          shouldForwardComponentProp: !0,
          externalForwardedProps: X,
          getSlotProps: (re) => ({
            ...re,
            onKeyDown: (N) => {
              var K;
              (S(N), (K = re.onKeyDown) == null || K.call(re, N));
            },
          }),
          ownerState: A,
        }),
        ie =
          typeof X.slotProps.transition == "function"
            ? X.slotProps.transition(A)
            : X.slotProps.transition;
      return P.jsx(w5, {
        onClose: m,
        anchorOrigin: { vertical: "bottom", horizontal: M ? "right" : "left" },
        transformOrigin: M ? T5 : x5,
        slots: {
          root: w.root,
          paper: se,
          backdrop: w.backdrop,
          ...(w.transition && { transition: w.transition }),
        },
        slotProps: {
          root: oe,
          paper: J,
          backdrop:
            typeof D.backdrop == "function" ? D.backdrop(A) : D.backdrop,
          transition: {
            ...ie,
            onEntering: (...re) => {
              var N;
              (W(...re),
                (N = ie == null ? void 0 : ie.onEntering) == null ||
                  N.call(ie, ...re));
            },
          },
        },
        open: g,
        ref: a,
        transitionDuration: C,
        ownerState: A,
        ...R,
        classes: x,
        children: P.jsx(z, {
          actions: q,
          autoFocus: s && (I === -1 || d),
          autoFocusItem: G,
          variant: E,
          ...Y,
          children: u,
        }),
      });
    });
  function M5(e) {
    return Ve("MuiNativeSelect", e);
  }
  const rp = et("MuiNativeSelect", [
      "root",
      "select",
      "multiple",
      "filled",
      "outlined",
      "standard",
      "disabled",
      "icon",
      "iconOpen",
      "iconFilled",
      "iconOutlined",
      "iconStandard",
      "nativeInput",
      "error",
    ]),
    D5 = (e) => {
      const {
          classes: n,
          variant: a,
          disabled: o,
          multiple: s,
          open: u,
          error: c,
        } = e,
        d = {
          select: ["select", a, o && "disabled", s && "multiple", c && "error"],
          icon: ["icon", `icon${_e(a)}`, u && "iconOpen", o && "disabled"],
        };
      return Ke(d, M5, n);
    },
    Mv = de("select")(({ theme: e }) => ({
      MozAppearance: "none",
      WebkitAppearance: "none",
      userSelect: "none",
      borderRadius: 0,
      cursor: "pointer",
      "&:focus": { borderRadius: 0 },
      [`&.${rp.disabled}`]: { cursor: "default" },
      "&[multiple]": { height: "auto" },
      "&:not([multiple]) option, &:not([multiple]) optgroup": {
        backgroundColor: (e.vars || e).palette.background.paper,
      },
      variants: [
        {
          props: ({ ownerState: n }) =>
            n.variant !== "filled" && n.variant !== "outlined",
          style: { "&&&": { paddingRight: 24, minWidth: 16 } },
        },
        {
          props: { variant: "filled" },
          style: { "&&&": { paddingRight: 32 } },
        },
        {
          props: { variant: "outlined" },
          style: {
            borderRadius: (e.vars || e).shape.borderRadius,
            "&:focus": { borderRadius: (e.vars || e).shape.borderRadius },
            "&&&": { paddingRight: 32 },
          },
        },
      ],
    })),
    N5 = de(Mv, {
      name: "MuiNativeSelect",
      slot: "Select",
      shouldForwardProp: Kn,
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [
          n.select,
          n[a.variant],
          a.error && n.error,
          { [`&.${rp.multiple}`]: n.multiple },
        ];
      },
    })({}),
    Dv = de("svg")(({ theme: e }) => ({
      position: "absolute",
      right: 0,
      top: "calc(50% - .5em)",
      pointerEvents: "none",
      color: (e.vars || e).palette.action.active,
      [`&.${rp.disabled}`]: { color: (e.vars || e).palette.action.disabled },
      variants: [
        {
          props: ({ ownerState: n }) => n.open,
          style: { transform: "rotate(180deg)" },
        },
        { props: { variant: "filled" }, style: { right: 7 } },
        { props: { variant: "outlined" }, style: { right: 7 } },
      ],
    })),
    k5 = de(Dv, {
      name: "MuiNativeSelect",
      slot: "Icon",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [
          n.icon,
          a.variant && n[`icon${_e(a.variant)}`],
          a.open && n.iconOpen,
        ];
      },
    })({}),
    z5 = O.forwardRef(function (n, a) {
      const {
          className: o,
          disabled: s,
          error: u,
          IconComponent: c,
          inputRef: d,
          variant: h = "standard",
          ...m
        } = n,
        g = { ...n, disabled: s, variant: h, error: u },
        b = D5(g);
      return P.jsxs(O.Fragment, {
        children: [
          P.jsx(N5, {
            ownerState: g,
            className: Te(b.select, o),
            disabled: s,
            ref: d || a,
            ...m,
          }),
          n.multiple
            ? null
            : P.jsx(k5, { as: c, ownerState: g, className: b.icon }),
        ],
      });
    });
  var Nv;
  const B5 = de("fieldset", { shouldForwardProp: Kn })({
      textAlign: "left",
      position: "absolute",
      bottom: 0,
      right: 0,
      top: -5,
      left: 0,
      margin: 0,
      padding: "0 8px",
      pointerEvents: "none",
      borderRadius: "inherit",
      borderStyle: "solid",
      borderWidth: 1,
      overflow: "hidden",
      minWidth: "0%",
    }),
    L5 = de("legend", { shouldForwardProp: Kn })(
      ht(({ theme: e }) => ({
        float: "unset",
        width: "auto",
        overflow: "hidden",
        variants: [
          {
            props: ({ ownerState: n }) => !n.withLabel,
            style: {
              padding: 0,
              lineHeight: "11px",
              transition: e.transitions.create("width", {
                duration: 150,
                easing: e.transitions.easing.easeOut,
              }),
            },
          },
          {
            props: ({ ownerState: n }) => n.withLabel,
            style: {
              display: "block",
              padding: 0,
              height: 11,
              fontSize: "0.75em",
              visibility: "hidden",
              maxWidth: 0.01,
              transition: e.transitions.create("max-width", {
                duration: 50,
                easing: e.transitions.easing.easeOut,
              }),
              whiteSpace: "nowrap",
              "& > span": {
                paddingLeft: 5,
                paddingRight: 5,
                display: "inline-block",
                opacity: 0,
                visibility: "visible",
              },
            },
          },
          {
            props: ({ ownerState: n }) => n.withLabel && n.notched,
            style: {
              maxWidth: "100%",
              transition: e.transitions.create("max-width", {
                duration: 100,
                easing: e.transitions.easing.easeOut,
                delay: 50,
              }),
            },
          },
        ],
      })),
    );
  function U5(e) {
    const {
        children: n,
        classes: a,
        className: o,
        label: s,
        notched: u,
        ...c
      } = e,
      d = s != null && s !== "",
      h = { ...e, notched: u, withLabel: d };
    return P.jsx(B5, {
      "aria-hidden": !0,
      className: o,
      ownerState: h,
      ...c,
      children: P.jsx(L5, {
        ownerState: h,
        children: d
          ? P.jsx("span", { children: s })
          : Nv ||
            (Nv = P.jsx("span", {
              className: "notranslate",
              "aria-hidden": !0,
              children: "​",
            })),
      }),
    });
  }
  const j5 = (e) => {
      const { classes: n } = e,
        o = Ke(
          {
            root: ["root"],
            notchedOutline: ["notchedOutline"],
            input: ["input"],
          },
          qN,
          n,
        );
      return { ...n, ...o };
    },
    $5 = de(fu, {
      shouldForwardProp: (e) => Kn(e) || e === "classes",
      name: "MuiOutlinedInput",
      slot: "Root",
      overridesResolver: uu,
    })(
      ht(({ theme: e }) => {
        const n =
          e.palette.mode === "light"
            ? "rgba(0, 0, 0, 0.23)"
            : "rgba(255, 255, 255, 0.23)";
        return {
          position: "relative",
          borderRadius: (e.vars || e).shape.borderRadius,
          [`&:hover .${ur.notchedOutline}`]: {
            borderColor: (e.vars || e).palette.text.primary,
          },
          "@media (hover: none)": {
            [`&:hover .${ur.notchedOutline}`]: {
              borderColor: e.vars
                ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)`
                : n,
            },
          },
          [`&.${ur.focused} .${ur.notchedOutline}`]: { borderWidth: 2 },
          variants: [
            ...Object.entries(e.palette)
              .filter(La())
              .map(([a]) => ({
                props: { color: a },
                style: {
                  [`&.${ur.focused} .${ur.notchedOutline}`]: {
                    borderColor: (e.vars || e).palette[a].main,
                  },
                },
              })),
            {
              props: {},
              style: {
                [`&.${ur.error} .${ur.notchedOutline}`]: {
                  borderColor: (e.vars || e).palette.error.main,
                },
                [`&.${ur.disabled} .${ur.notchedOutline}`]: {
                  borderColor: (e.vars || e).palette.action.disabled,
                },
              },
            },
            {
              props: ({ ownerState: a }) => a.startAdornment,
              style: { paddingLeft: 14 },
            },
            {
              props: ({ ownerState: a }) => a.endAdornment,
              style: { paddingRight: 14 },
            },
            {
              props: ({ ownerState: a }) => a.multiline,
              style: { padding: "16.5px 14px" },
            },
            {
              props: ({ ownerState: a, size: o }) =>
                a.multiline && o === "small",
              style: { padding: "8.5px 14px" },
            },
          ],
        };
      }),
    ),
    I5 = de(U5, { name: "MuiOutlinedInput", slot: "NotchedOutline" })(
      ht(({ theme: e }) => {
        const n =
          e.palette.mode === "light"
            ? "rgba(0, 0, 0, 0.23)"
            : "rgba(255, 255, 255, 0.23)";
        return {
          borderColor: e.vars
            ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)`
            : n,
        };
      }),
    ),
    H5 = de(du, {
      name: "MuiOutlinedInput",
      slot: "Input",
      overridesResolver: cu,
    })(
      ht(({ theme: e }) => ({
        padding: "16.5px 14px",
        ...(!e.vars && {
          "&:-webkit-autofill": {
            WebkitBoxShadow:
              e.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
            WebkitTextFillColor: e.palette.mode === "light" ? null : "#fff",
            caretColor: e.palette.mode === "light" ? null : "#fff",
            borderRadius: "inherit",
          },
        }),
        ...(e.vars && {
          "&:-webkit-autofill": { borderRadius: "inherit" },
          [e.getColorSchemeSelector("dark")]: {
            "&:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 100px #266798 inset",
              WebkitTextFillColor: "#fff",
              caretColor: "#fff",
            },
          },
        }),
        variants: [
          { props: { size: "small" }, style: { padding: "8.5px 14px" } },
          { props: ({ ownerState: n }) => n.multiline, style: { padding: 0 } },
          {
            props: ({ ownerState: n }) => n.startAdornment,
            style: { paddingLeft: 0 },
          },
          {
            props: ({ ownerState: n }) => n.endAdornment,
            style: { paddingRight: 0 },
          },
        ],
      })),
    ),
    ap = O.forwardRef(function (n, a) {
      const o = Ye({ props: n, name: "MuiOutlinedInput" }),
        {
          components: s = {},
          fullWidth: u = !1,
          inputComponent: c = "input",
          label: d,
          multiline: h = !1,
          notched: m,
          slots: g = {},
          slotProps: b = {},
          type: x = "text",
          ...C
        } = o,
        _ = j5(o),
        v = Co(),
        E = xo({
          props: o,
          muiFormControl: v,
          states: [
            "color",
            "disabled",
            "error",
            "focused",
            "hiddenLabel",
            "size",
            "required",
          ],
        }),
        w = {
          ...o,
          color: E.color || "primary",
          disabled: E.disabled,
          error: E.error,
          focused: E.focused,
          formControl: v,
          fullWidth: u,
          hiddenLabel: E.hiddenLabel,
          multiline: h,
          size: E.size,
          type: x,
        },
        D = g.root ?? s.Root ?? $5,
        R = g.input ?? s.Input ?? H5,
        [M, A] = Rt("notchedOutline", {
          elementType: I5,
          className: _.notchedOutline,
          shouldForwardComponentProp: !0,
          ownerState: w,
          externalForwardedProps: { slots: g, slotProps: b },
          additionalProps: {
            label:
              d != null && d !== "" && E.required
                ? P.jsxs(O.Fragment, { children: [d, " ", "*"] })
                : d,
          },
        });
      return P.jsx(Vd, {
        slots: { root: D, input: R },
        slotProps: b,
        renderSuffix: (L) =>
          P.jsx(M, {
            ...A,
            notched:
              typeof m < "u"
                ? m
                : !!(L.startAdornment || L.filled || L.focused),
          }),
        fullWidth: u,
        inputComponent: c,
        multiline: h,
        ref: a,
        type: x,
        ...C,
        classes: { ..._, notchedOutline: null },
      });
    });
  ap.muiName = "Input";
  function P5(e) {
    return Ve("MuiScopedCssBaseline", e);
  }
  et("MuiScopedCssBaseline", ["root"]);
  const q5 = (e) => {
      const { classes: n } = e;
      return Ke({ root: ["root"] }, P5, n);
    },
    F5 = de("div", { name: "MuiScopedCssBaseline", slot: "Root" })(
      ht(({ theme: e }) => {
        const n = {};
        return (
          e.colorSchemes &&
            Object.entries(e.colorSchemes).forEach(([a, o]) => {
              var u, c;
              const s = e.getColorSchemeSelector(a);
              s.startsWith("@")
                ? (n[s] = {
                    colorScheme: (u = o.palette) == null ? void 0 : u.mode,
                  })
                : (n[`&${s.replace(/\s*&/, "")}`] = {
                    colorScheme: (c = o.palette) == null ? void 0 : c.mode,
                  });
            }),
          {
            ...uv(e, !1),
            ...cv(e),
            "& *, & *::before, & *::after": { boxSizing: "inherit" },
            "& strong, & b": { fontWeight: e.typography.fontWeightBold },
            variants: [
              {
                props: { enableColorScheme: !0 },
                style: e.vars ? n : { colorScheme: e.palette.mode },
              },
            ],
          }
        );
      }),
    ),
    G5 = O.forwardRef(function (n, a) {
      const o = Ye({ props: n, name: "MuiScopedCssBaseline" }),
        { className: s, component: u = "div", enableColorScheme: c, ...d } = o,
        h = { ...o, component: u },
        m = q5(h);
      return P.jsx(F5, {
        as: u,
        className: Te(m.root, s),
        ref: a,
        ownerState: h,
        ...d,
      });
    });
  function kv(e) {
    return Ve("MuiSelect", e);
  }
  const Ki = et("MuiSelect", [
    "root",
    "select",
    "multiple",
    "filled",
    "outlined",
    "standard",
    "disabled",
    "focused",
    "icon",
    "iconOpen",
    "iconFilled",
    "iconOutlined",
    "iconStandard",
    "nativeInput",
    "error",
  ]);
  var zv;
  const V5 = de(Mv, {
      name: "MuiSelect",
      slot: "Select",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [
          { [`&.${Ki.select}`]: n.select },
          { [`&.${Ki.select}`]: n[a.variant] },
          { [`&.${Ki.error}`]: n.error },
          { [`&.${Ki.multiple}`]: n.multiple },
        ];
      },
    })({
      [`&.${Ki.select}`]: {
        height: "auto",
        minHeight: "1.4375em",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
      },
    }),
    K5 = de(Dv, {
      name: "MuiSelect",
      slot: "Icon",
      overridesResolver: (e, n) => {
        const { ownerState: a } = e;
        return [
          n.icon,
          a.variant && n[`icon${_e(a.variant)}`],
          a.open && n.iconOpen,
        ];
      },
    })({}),
    Y5 = de("input", {
      shouldForwardProp: (e) => M0(e) && e !== "classes",
      name: "MuiSelect",
      slot: "NativeInput",
    })({
      bottom: 0,
      left: 0,
      position: "absolute",
      opacity: 0,
      pointerEvents: "none",
      width: "100%",
      boxSizing: "border-box",
    });
  function Bv(e, n) {
    return typeof n == "object" && n !== null
      ? e === n
      : String(e) === String(n);
  }
  function X5(e) {
    return e == null || (typeof e == "string" && !e.trim());
  }
  const W5 = (e) => {
      const {
          classes: n,
          variant: a,
          disabled: o,
          multiple: s,
          open: u,
          error: c,
        } = e,
        d = {
          select: ["select", a, o && "disabled", s && "multiple", c && "error"],
          icon: ["icon", `icon${_e(a)}`, u && "iconOpen", o && "disabled"],
          nativeInput: ["nativeInput"],
        };
      return Ke(d, kv, n);
    },
    Q5 = O.forwardRef(function (n, a) {
      var zt;
      const {
          "aria-describedby": o,
          "aria-label": s,
          autoFocus: u,
          autoWidth: c,
          children: d,
          className: h,
          defaultOpen: m,
          defaultValue: g,
          disabled: b,
          displayEmpty: x,
          error: C = !1,
          IconComponent: _,
          inputRef: v,
          labelId: E,
          MenuProps: w = {},
          multiple: D,
          name: R,
          onBlur: M,
          onChange: A,
          onClose: L,
          onFocus: G,
          onOpen: q,
          open: W,
          readOnly: S,
          renderValue: I,
          required: X,
          SelectDisplayProps: oe = {},
          tabIndex: se,
          type: J,
          value: z,
          variant: Y = "standard",
          ...ie
        } = n,
        [re, N] = U0({ controlled: z, default: g, name: "Select" }),
        [K, ae] = U0({ controlled: W, default: m, name: "Select" }),
        te = O.useRef(null),
        le = O.useRef(null),
        [ce, fe] = O.useState(null),
        { current: Ae } = O.useRef(W != null),
        [xe, ke] = O.useState(),
        ge = cn(a, v),
        Oe = O.useCallback((he) => {
          ((le.current = he), he && fe(he));
        }, []),
        Me = ce == null ? void 0 : ce.parentNode;
      (O.useImperativeHandle(
        ge,
        () => ({
          focus: () => {
            le.current.focus();
          },
          node: te.current,
          value: re,
        }),
        [re],
      ),
        O.useEffect(() => {
          m &&
            K &&
            ce &&
            !Ae &&
            (ke(c ? null : Me.clientWidth), le.current.focus());
        }, [ce, c]),
        O.useEffect(() => {
          u && le.current.focus();
        }, [u]),
        O.useEffect(() => {
          if (!E) return;
          const he = Yn(le.current).getElementById(E);
          if (he) {
            const Ge = () => {
              getSelection().isCollapsed && le.current.focus();
            };
            return (
              he.addEventListener("click", Ge),
              () => {
                he.removeEventListener("click", Ge);
              }
            );
          }
        }, [E]));
      const Ie = (he, Ge) => {
          (he ? q && q(Ge) : L && L(Ge),
            Ae || (ke(c ? null : Me.clientWidth), ae(he)));
        },
        Re = (he) => {
          he.button === 0 &&
            (he.preventDefault(), le.current.focus(), Ie(!0, he));
        },
        Xe = (he) => {
          Ie(!1, he);
        },
        Gt = O.Children.toArray(d),
        We = (he) => {
          const Ge = Gt.find((yt) => yt.props.value === he.target.value);
          Ge !== void 0 && (N(Ge.props.value), A && A(he, Ge));
        },
        ft = (he) => (Ge) => {
          let yt;
          if (Ge.currentTarget.hasAttribute("tabindex")) {
            if (D) {
              yt = Array.isArray(re) ? re.slice() : [];
              const Yr = re.indexOf(he.props.value);
              Yr === -1 ? yt.push(he.props.value) : yt.splice(Yr, 1);
            } else yt = he.props.value;
            if (
              (he.props.onClick && he.props.onClick(Ge),
              re !== yt && (N(yt), A))
            ) {
              const Yr = Ge.nativeEvent || Ge,
                Qi = new Yr.constructor(Yr.type, Yr);
              (Object.defineProperty(Qi, "target", {
                writable: !0,
                value: { value: yt, name: R },
              }),
                A(Qi, he));
            }
            D || Ie(!1, Ge);
          }
        },
        ut = (he) => {
          S ||
            ([" ", "ArrowUp", "ArrowDown", "Enter"].includes(he.key) &&
              (he.preventDefault(), Ie(!0, he)));
        },
        mt = ce !== null && K,
        Fe = (he) => {
          !mt &&
            M &&
            (Object.defineProperty(he, "target", {
              writable: !0,
              value: { value: re, name: R },
            }),
            M(he));
        };
      delete ie["aria-invalid"];
      let pe, Sn;
      const _t = [];
      let Xn = !1;
      (lu({ value: re }) || x) && (I ? (pe = I(re)) : (Xn = !0));
      const fn = Gt.map((he) => {
        if (!O.isValidElement(he)) return null;
        let Ge;
        if (D) {
          if (!Array.isArray(re)) throw new Error(vr(2));
          ((Ge = re.some((yt) => Bv(yt, he.props.value))),
            Ge && Xn && _t.push(he.props.children));
        } else
          ((Ge = Bv(re, he.props.value)), Ge && Xn && (Sn = he.props.children));
        return O.cloneElement(he, {
          "aria-selected": Ge ? "true" : "false",
          onClick: ft(he),
          onKeyUp: (yt) => {
            (yt.key === " " && yt.preventDefault(),
              he.props.onKeyUp && he.props.onKeyUp(yt));
          },
          role: "option",
          selected: Ge,
          value: void 0,
          "data-value": he.props.value,
        });
      });
      Xn &&
        (D
          ? _t.length === 0
            ? (pe = null)
            : (pe = _t.reduce(
                (he, Ge, yt) => (
                  he.push(Ge),
                  yt < _t.length - 1 && he.push(", "),
                  he
                ),
                [],
              ))
          : (pe = Sn));
      let Tt = xe;
      !c && Ae && ce && (Tt = Me.clientWidth);
      let jt;
      typeof se < "u" ? (jt = se) : (jt = b ? null : 0);
      const gt = oe.id || (R ? `mui-component-select-${R}` : void 0),
        dt = { ...n, variant: Y, value: re, open: mt, error: C },
        ve = W5(dt),
        Jt = {
          ...w.PaperProps,
          ...((zt = w.slotProps) == null ? void 0 : zt.paper),
        },
        At = nu();
      return P.jsxs(O.Fragment, {
        children: [
          P.jsx(V5, {
            as: "div",
            ref: Oe,
            tabIndex: jt,
            role: "combobox",
            "aria-controls": mt ? At : void 0,
            "aria-disabled": b ? "true" : void 0,
            "aria-expanded": mt ? "true" : "false",
            "aria-haspopup": "listbox",
            "aria-label": s,
            "aria-labelledby": [E, gt].filter(Boolean).join(" ") || void 0,
            "aria-describedby": o,
            "aria-required": X ? "true" : void 0,
            "aria-invalid": C ? "true" : void 0,
            onKeyDown: ut,
            onMouseDown: b || S ? null : Re,
            onBlur: Fe,
            onFocus: G,
            ...oe,
            ownerState: dt,
            className: Te(oe.className, ve.select, h),
            id: gt,
            children: X5(pe)
              ? zv ||
                (zv = P.jsx("span", {
                  className: "notranslate",
                  "aria-hidden": !0,
                  children: "​",
                }))
              : pe,
          }),
          P.jsx(Y5, {
            "aria-invalid": C,
            value: Array.isArray(re) ? re.join(",") : re,
            name: R,
            ref: te,
            "aria-hidden": !0,
            onChange: We,
            tabIndex: -1,
            disabled: b,
            className: ve.nativeInput,
            autoFocus: u,
            required: X,
            ...ie,
            ownerState: dt,
          }),
          P.jsx(K5, { as: _, className: ve.icon, ownerState: dt }),
          P.jsx(O5, {
            id: `menu-${R || ""}`,
            anchorEl: Me,
            open: mt,
            onClose: Xe,
            anchorOrigin: { vertical: "bottom", horizontal: "center" },
            transformOrigin: { vertical: "top", horizontal: "center" },
            ...w,
            slotProps: {
              ...w.slotProps,
              list: {
                "aria-labelledby": E,
                role: "listbox",
                "aria-multiselectable": D ? "true" : void 0,
                disableListWrap: !0,
                id: At,
                ...w.MenuListProps,
              },
              paper: {
                ...Jt,
                style: { minWidth: Tt, ...(Jt != null ? Jt.style : null) },
              },
            },
            children: fn,
          }),
        ],
      });
    }),
    Z5 = (e) => {
      const { classes: n } = e,
        o = Ke({ root: ["root"] }, kv, n);
      return { ...n, ...o };
    },
    op = {
      name: "MuiSelect",
      slot: "Root",
      shouldForwardProp: (e) => Kn(e) && e !== "variant",
    },
    J5 = de(tp, op)(""),
    e4 = de(ap, op)(""),
    t4 = de(Qd, op)(""),
    Lv = O.forwardRef(function (n, a) {
      const o = Ye({ name: "MuiSelect", props: n }),
        {
          autoWidth: s = !1,
          children: u,
          classes: c = {},
          className: d,
          defaultOpen: h = !1,
          displayEmpty: m = !1,
          IconComponent: g = GN,
          id: b,
          input: x,
          inputProps: C,
          label: _,
          labelId: v,
          MenuProps: E,
          multiple: w = !1,
          native: D = !1,
          onClose: R,
          onOpen: M,
          open: A,
          renderValue: L,
          SelectDisplayProps: G,
          variant: q = "outlined",
          ...W
        } = o,
        S = D ? z5 : Q5,
        I = Co(),
        X = xo({ props: o, muiFormControl: I, states: ["variant", "error"] }),
        oe = X.variant || q,
        se = { ...o, variant: oe, classes: c },
        J = Z5(se),
        { root: z, ...Y } = J,
        ie =
          x ||
          {
            standard: P.jsx(J5, { ownerState: se }),
            outlined: P.jsx(e4, { label: _, ownerState: se }),
            filled: P.jsx(t4, { ownerState: se }),
          }[oe],
        re = cn(a, Pi(ie));
      return P.jsx(O.Fragment, {
        children: O.cloneElement(ie, {
          inputComponent: S,
          inputProps: {
            children: u,
            error: X.error,
            IconComponent: g,
            variant: oe,
            type: void 0,
            multiple: w,
            ...(D
              ? { id: b }
              : {
                  autoWidth: s,
                  defaultOpen: h,
                  displayEmpty: m,
                  labelId: v,
                  MenuProps: E,
                  onClose: R,
                  onOpen: M,
                  open: A,
                  renderValue: L,
                  SelectDisplayProps: { id: b, ...G },
                }),
            ...C,
            classes: C ? Ut(Y, C.classes) : Y,
            ...(x ? x.props.inputProps : {}),
          },
          ...(((w && D) || m) && oe === "outlined" ? { notched: !0 } : {}),
          ref: re,
          className: Te(ie.props.className, d, J.root),
          ...(!x && { variant: oe }),
          ...W,
        }),
      });
    });
  Lv.muiName = "Select";
  const n4 = tD({
    createStyledComponent: de("div", { name: "MuiStack", slot: "Root" }),
    useThemeProps: (e) => Ye({ props: e, name: "MuiStack" }),
  });
  function r4(e) {
    return Ve("MuiTextField", e);
  }
  et("MuiTextField", ["root"]);
  const a4 = { standard: tp, filled: Qd, outlined: ap },
    o4 = (e) => {
      const { classes: n } = e;
      return Ke({ root: ["root"] }, r4, n);
    },
    i4 = de(Y3, { name: "MuiTextField", slot: "Root" })({}),
    Uv = O.forwardRef(function (n, a) {
      const o = Ye({ props: n, name: "MuiTextField" }),
        {
          autoComplete: s,
          autoFocus: u = !1,
          children: c,
          className: d,
          color: h = "primary",
          defaultValue: m,
          disabled: g = !1,
          error: b = !1,
          FormHelperTextProps: x,
          fullWidth: C = !1,
          helperText: _,
          id: v,
          InputLabelProps: E,
          inputProps: w,
          InputProps: D,
          inputRef: R,
          label: M,
          maxRows: A,
          minRows: L,
          multiline: G = !1,
          name: q,
          onBlur: W,
          onChange: S,
          onFocus: I,
          placeholder: X,
          required: oe = !1,
          rows: se,
          select: J = !1,
          SelectProps: z,
          slots: Y = {},
          slotProps: ie = {},
          type: re,
          value: N,
          variant: K = "outlined",
          ...ae
        } = o,
        te = {
          ...o,
          autoFocus: u,
          color: h,
          disabled: g,
          error: b,
          fullWidth: C,
          multiline: G,
          required: oe,
          select: J,
          variant: K,
        },
        le = o4(te),
        ce = nu(v),
        fe = _ && ce ? `${ce}-helper-text` : void 0,
        Ae = M && ce ? `${ce}-label` : void 0,
        xe = a4[K],
        ke = {
          slots: Y,
          slotProps: {
            input: D,
            inputLabel: E,
            htmlInput: w,
            formHelperText: x,
            select: z,
            ...ie,
          },
        },
        ge = {},
        Oe = ke.slotProps.inputLabel;
      (K === "outlined" &&
        (Oe && typeof Oe.shrink < "u" && (ge.notched = Oe.shrink),
        (ge.label = M)),
        J &&
          ((!z || !z.native) && (ge.id = void 0),
          (ge["aria-describedby"] = void 0)));
      const [Me, Ie] = Rt("root", {
          elementType: i4,
          shouldForwardComponentProp: !0,
          externalForwardedProps: { ...ke, ...ae },
          ownerState: te,
          className: Te(le.root, d),
          ref: a,
          additionalProps: {
            disabled: g,
            error: b,
            fullWidth: C,
            required: oe,
            color: h,
            variant: K,
          },
        }),
        [Re, Xe] = Rt("input", {
          elementType: xe,
          externalForwardedProps: ke,
          additionalProps: ge,
          ownerState: te,
        }),
        [Gt, We] = Rt("inputLabel", {
          elementType: f5,
          externalForwardedProps: ke,
          ownerState: te,
        }),
        [ft, ut] = Rt("htmlInput", {
          elementType: "input",
          externalForwardedProps: ke,
          ownerState: te,
        }),
        [mt, Fe] = Rt("formHelperText", {
          elementType: Z3,
          externalForwardedProps: ke,
          ownerState: te,
        }),
        [pe, Sn] = Rt("select", {
          elementType: Lv,
          externalForwardedProps: ke,
          ownerState: te,
        }),
        _t = P.jsx(Re, {
          "aria-describedby": fe,
          autoComplete: s,
          autoFocus: u,
          defaultValue: m,
          fullWidth: C,
          multiline: G,
          name: q,
          rows: se,
          maxRows: A,
          minRows: L,
          type: re,
          value: N,
          id: ce,
          inputRef: R,
          onBlur: W,
          onChange: S,
          onFocus: I,
          placeholder: X,
          inputProps: ut,
          slots: { input: Y.htmlInput ? ft : void 0 },
          ...Xe,
        });
      return P.jsxs(Me, {
        ...Ie,
        children: [
          M != null &&
            M !== "" &&
            P.jsx(Gt, { htmlFor: ce, id: Ae, ...We, children: M }),
          J
            ? P.jsx(pe, {
                "aria-describedby": fe,
                id: ce,
                labelId: Ae,
                value: N,
                input: _t,
                ...Sn,
                children: c,
              })
            : _t,
          _ && P.jsx(mt, { id: fe, ...Fe, children: _ }),
        ],
      });
    }),
    s4 = { main: "#000", contrastText: "#fff" },
    jv = { main: "#fff", contrastText: "#000" },
    l4 = (e) =>
      Od({
        breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1e3, xl: 1536 } },
        typography: {
          fontWeightBold: 600,
          fontFamily: "Inter, sans-serif",
          h1: { fontWeight: 600 },
          h2: { fontWeight: 600 },
          h3: { fontWeight: 600 },
          h4: { fontWeight: 600 },
          h5: { fontWeight: 600 },
          h6: { fontWeight: 600 },
        },
        palette: {
          mode: e.darkMode ? "dark" : "light",
          primary: e.darkMode ? jv : s4,
          secondary: jv,
          background: {
            paper: e.darkMode ? "#11171f" : "#fff",
            default: e.appInitialized
              ? e.darkMode
                ? "#0d1117"
                : "#f6f6f6"
              : "#000",
          },
          success: { main: "#43a047", contrastText: "#fff" },
          info: { main: "#0290d1", contrastText: "#fff" },
        },
        components: {
          MuiLink: { styleOverrides: { root: { color: "inherit" } } },
          MuiAlert: {
            defaultProps: { variant: e.darkMode ? "outlined" : "standard" },
            styleOverrides: { standardWarning: { background: "#ffe1b9" } },
          },
          MuiButton: {
            defaultProps: { disableElevation: !0 },
            styleOverrides: {
              root: {
                fontWeight: 600,
                fontSize: "105%",
                borderRadius: "2rem",
                textTransform: "none",
                padding: "0.5rem 1rem",
              },
              sizeSmall: { fontSize: "95%", padding: "0.25rem 0.75rem" },
            },
          },
          MuiSelect: { defaultProps: { size: "small" } },
          MuiAppBar: {
            styleOverrides: {
              root: { borderBottom: e.darkMode ? "1px solid #212121" : void 0 },
            },
          },
          MuiAccordion: {
            styleOverrides: {
              root: { "&:not(:last-child)": { borderBottom: "none" } },
            },
          },
          MuiTooltip: { styleOverrides: { tooltip: { fontSize: "0.875rem" } } },
          MuiSkeleton: {
            styleOverrides: { root: { borderRadius: "0.25rem" } },
          },
        },
      }),
    u4 =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    ip = navigator.platform.toLowerCase().includes("mac") ? "CMD" : "CTRL",
    c4 = (e) => {
      const n = O.useContext(Vf),
        [a, o] = O.useState(u4),
        s = e.scopedCssBaseline ? G5 : i3;
      return (
        O.useEffect(
          () =>
            window
              .matchMedia("(prefers-color-scheme: dark)")
              .addEventListener("change", (u) => o(u.matches)),
          [],
        ),
        P.jsx(zD, {
          theme: l4({
            appInitialized: n.initialized,
            darkMode:
              n.initialized &&
              !e.disableDarkMode &&
              (n.globalState.darkMode === "true" ||
                (n.globalState.darkMode === "system" && a)),
          }),
          children: P.jsx(s, {
            sx: {
              backgroundColor: e.scopedCssBaseline ? "transparent" : void 0,
            },
            children: e.children,
          }),
        })
      );
    },
    sp = "local:__JOBS",
    $v = () => On.getItem(sp),
    lp = {
      addEventListener: (e) => On.watch(sp, e),
      getAll: $v,
      save: async (e) => {
        const n = pb(e) ? e((await $v()) ?? []) : e;
        return (await On.setItem(sp, n), n);
      },
    },
    Iv = "sync:__COVER_LETTER_PROMPT";
  var Yi = ((e) => (
    (e.TITLE = "#{title}"),
    (e.JOB_DESCRIPTION = "#{job_description}"),
    e
  ))(Yi || {});
  const f4 = () => On.getItem(Iv, { fallback: Hv }),
    d4 = async (e) => (await On.setItem(Iv, e), e),
    Hv = `Create a cover letter for this job which has title:
#{title}

and job description:
#{job_description}

Mention my experience with relevant technologies.
Use less than 300 words.`,
    up = { get: f4, save: d4, defaultPrompt: Hv },
    p4 = (e) => {
      const [n, a] = O.useState([]),
        [o, s] = O.useState(""),
        [u, c] = O.useState(!1),
        [d, h] = O.useState(Pr.getDefaultState),
        m = {
          jobs: n,
          prompt: o,
          initialized: u,
          globalState: d,
          setJobs: lp.save,
          setState: Pr.save,
          setPrompt: up.save,
        };
      return (
        O.useEffect(() => {
          (async () => {
            const [b, x, C] = await Promise.all([
              Pr.get(),
              lp.getAll(),
              up.get(),
            ]);
            (a(x ?? []),
              h(b),
              s(C),
              lp.addEventListener((_) => a(_ ?? [])),
              Pr.addEventListener((_) => h(_ ?? Pr.getDefaultState())),
              c(!0));
          })();
        }, []),
        u ? P.jsx(Vf.Provider, { value: m, children: e.children }) : null
      );
    },
    Pv = "sync:__COVER_LETTER",
    h4 = {
      get: () => On.getItem(Pv, { fallback: "" }),
      save: async (e) => (await On.setItem(Pv, e), e),
    };
  function m4(e) {
    return {
      all: (e = e || new Map()),
      on: function (n, a) {
        var o = e.get(n);
        o ? o.push(a) : e.set(n, [a]);
      },
      off: function (n, a) {
        var o = e.get(n);
        o && (a ? o.splice(o.indexOf(a) >>> 0, 1) : e.set(n, []));
      },
      emit: function (n, a) {
        var o = e.get(n);
        (o &&
          o.slice().map(function (s) {
            s(a);
          }),
          (o = e.get("*")) &&
            o.slice().map(function (s) {
              s(n, a);
            }));
      },
    };
  }
  var $a = ((e) => (
    (e.GENERATE_COVER_LETTER_CLICK = "generate_cover_letter_click"),
    (e.JOB_DETAILS_RECEIVED = "job_details_received"),
    (e.DEBUG_MODE_TRIGGERED = "debug_mode_triggered"),
    (e.UNSEEN_IDS_UPDATED = "unseen_ids_updated"),
    e
  ))($a || {});
  const g4 = m4();
  var cp = { exports: {} },
    Xi = {},
    fp = { exports: {} },
    dp = {};
  /**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var qv;
  function y4() {
    return (
      qv ||
        ((qv = 1),
        (function (e) {
          function n(z, Y) {
            var ie = z.length;
            z.push(Y);
            e: for (; 0 < ie; ) {
              var re = (ie - 1) >>> 1,
                N = z[re];
              if (0 < s(N, Y)) ((z[re] = Y), (z[ie] = N), (ie = re));
              else break e;
            }
          }
          function a(z) {
            return z.length === 0 ? null : z[0];
          }
          function o(z) {
            if (z.length === 0) return null;
            var Y = z[0],
              ie = z.pop();
            if (ie !== Y) {
              z[0] = ie;
              e: for (var re = 0, N = z.length, K = N >>> 1; re < K; ) {
                var ae = 2 * (re + 1) - 1,
                  te = z[ae],
                  le = ae + 1,
                  ce = z[le];
                if (0 > s(te, ie))
                  le < N && 0 > s(ce, te)
                    ? ((z[re] = ce), (z[le] = ie), (re = le))
                    : ((z[re] = te), (z[ae] = ie), (re = ae));
                else if (le < N && 0 > s(ce, ie))
                  ((z[re] = ce), (z[le] = ie), (re = le));
                else break e;
              }
            }
            return Y;
          }
          function s(z, Y) {
            var ie = z.sortIndex - Y.sortIndex;
            return ie !== 0 ? ie : z.id - Y.id;
          }
          if (
            ((e.unstable_now = void 0),
            typeof performance == "object" &&
              typeof performance.now == "function")
          ) {
            var u = performance;
            e.unstable_now = function () {
              return u.now();
            };
          } else {
            var c = Date,
              d = c.now();
            e.unstable_now = function () {
              return c.now() - d;
            };
          }
          var h = [],
            m = [],
            g = 1,
            b = null,
            x = 3,
            C = !1,
            _ = !1,
            v = !1,
            E = !1,
            w = typeof setTimeout == "function" ? setTimeout : null,
            D = typeof clearTimeout == "function" ? clearTimeout : null,
            R = typeof setImmediate < "u" ? setImmediate : null;
          function M(z) {
            for (var Y = a(m); Y !== null; ) {
              if (Y.callback === null) o(m);
              else if (Y.startTime <= z)
                (o(m), (Y.sortIndex = Y.expirationTime), n(h, Y));
              else break;
              Y = a(m);
            }
          }
          function A(z) {
            if (((v = !1), M(z), !_))
              if (a(h) !== null) ((_ = !0), L || ((L = !0), X()));
              else {
                var Y = a(m);
                Y !== null && J(A, Y.startTime - z);
              }
          }
          var L = !1,
            G = -1,
            q = 5,
            W = -1;
          function S() {
            return E ? !0 : !(e.unstable_now() - W < q);
          }
          function I() {
            if (((E = !1), L)) {
              var z = e.unstable_now();
              W = z;
              var Y = !0;
              try {
                e: {
                  ((_ = !1), v && ((v = !1), D(G), (G = -1)), (C = !0));
                  var ie = x;
                  try {
                    t: {
                      for (
                        M(z), b = a(h);
                        b !== null && !(b.expirationTime > z && S());
                      ) {
                        var re = b.callback;
                        if (typeof re == "function") {
                          ((b.callback = null), (x = b.priorityLevel));
                          var N = re(b.expirationTime <= z);
                          if (
                            ((z = e.unstable_now()), typeof N == "function")
                          ) {
                            ((b.callback = N), M(z), (Y = !0));
                            break t;
                          }
                          (b === a(h) && o(h), M(z));
                        } else o(h);
                        b = a(h);
                      }
                      if (b !== null) Y = !0;
                      else {
                        var K = a(m);
                        (K !== null && J(A, K.startTime - z), (Y = !1));
                      }
                    }
                    break e;
                  } finally {
                    ((b = null), (x = ie), (C = !1));
                  }
                  Y = void 0;
                }
              } finally {
                Y ? X() : (L = !1);
              }
            }
          }
          var X;
          if (typeof R == "function")
            X = function () {
              R(I);
            };
          else if (typeof MessageChannel < "u") {
            var oe = new MessageChannel(),
              se = oe.port2;
            ((oe.port1.onmessage = I),
              (X = function () {
                se.postMessage(null);
              }));
          } else
            X = function () {
              w(I, 0);
            };
          function J(z, Y) {
            G = w(function () {
              z(e.unstable_now());
            }, Y);
          }
          ((e.unstable_IdlePriority = 5),
            (e.unstable_ImmediatePriority = 1),
            (e.unstable_LowPriority = 4),
            (e.unstable_NormalPriority = 3),
            (e.unstable_Profiling = null),
            (e.unstable_UserBlockingPriority = 2),
            (e.unstable_cancelCallback = function (z) {
              z.callback = null;
            }),
            (e.unstable_forceFrameRate = function (z) {
              0 > z || 125 < z
                ? console.error(
                    "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                  )
                : (q = 0 < z ? Math.floor(1e3 / z) : 5);
            }),
            (e.unstable_getCurrentPriorityLevel = function () {
              return x;
            }),
            (e.unstable_next = function (z) {
              switch (x) {
                case 1:
                case 2:
                case 3:
                  var Y = 3;
                  break;
                default:
                  Y = x;
              }
              var ie = x;
              x = Y;
              try {
                return z();
              } finally {
                x = ie;
              }
            }),
            (e.unstable_requestPaint = function () {
              E = !0;
            }),
            (e.unstable_runWithPriority = function (z, Y) {
              switch (z) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                  break;
                default:
                  z = 3;
              }
              var ie = x;
              x = z;
              try {
                return Y();
              } finally {
                x = ie;
              }
            }),
            (e.unstable_scheduleCallback = function (z, Y, ie) {
              var re = e.unstable_now();
              switch (
                (typeof ie == "object" && ie !== null
                  ? ((ie = ie.delay),
                    (ie = typeof ie == "number" && 0 < ie ? re + ie : re))
                  : (ie = re),
                z)
              ) {
                case 1:
                  var N = -1;
                  break;
                case 2:
                  N = 250;
                  break;
                case 5:
                  N = 1073741823;
                  break;
                case 4:
                  N = 1e4;
                  break;
                default:
                  N = 5e3;
              }
              return (
                (N = ie + N),
                (z = {
                  id: g++,
                  callback: Y,
                  priorityLevel: z,
                  startTime: ie,
                  expirationTime: N,
                  sortIndex: -1,
                }),
                ie > re
                  ? ((z.sortIndex = ie),
                    n(m, z),
                    a(h) === null &&
                      z === a(m) &&
                      (v ? (D(G), (G = -1)) : (v = !0), J(A, ie - re)))
                  : ((z.sortIndex = N),
                    n(h, z),
                    _ || C || ((_ = !0), L || ((L = !0), X()))),
                z
              );
            }),
            (e.unstable_shouldYield = S),
            (e.unstable_wrapCallback = function (z) {
              var Y = x;
              return function () {
                var ie = x;
                x = Y;
                try {
                  return z.apply(this, arguments);
                } finally {
                  x = ie;
                }
              };
            }));
        })(dp)),
      dp
    );
  }
  var Fv;
  function b4() {
    return (Fv || ((Fv = 1), (fp.exports = y4())), fp.exports);
  }
  /**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var Gv;
  function v4() {
    if (Gv) return Xi;
    Gv = 1;
    var e = b4(),
      n = Lc(),
      a = P0();
    function o(t) {
      var r = "https://react.dev/errors/" + t;
      if (1 < arguments.length) {
        r += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var i = 2; i < arguments.length; i++)
          r += "&args[]=" + encodeURIComponent(arguments[i]);
      }
      return (
        "Minified React error #" +
        t +
        "; visit " +
        r +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      );
    }
    function s(t) {
      return !(
        !t ||
        (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11)
      );
    }
    function u(t) {
      var r = t,
        i = t;
      if (t.alternate) for (; r.return; ) r = r.return;
      else {
        t = r;
        do ((r = t), (r.flags & 4098) !== 0 && (i = r.return), (t = r.return));
        while (t);
      }
      return r.tag === 3 ? i : null;
    }
    function c(t) {
      if (t.tag === 13) {
        var r = t.memoizedState;
        if (
          (r === null &&
            ((t = t.alternate), t !== null && (r = t.memoizedState)),
          r !== null)
        )
          return r.dehydrated;
      }
      return null;
    }
    function d(t) {
      if (u(t) !== t) throw Error(o(188));
    }
    function h(t) {
      var r = t.alternate;
      if (!r) {
        if (((r = u(t)), r === null)) throw Error(o(188));
        return r !== t ? null : t;
      }
      for (var i = t, l = r; ; ) {
        var f = i.return;
        if (f === null) break;
        var p = f.alternate;
        if (p === null) {
          if (((l = f.return), l !== null)) {
            i = l;
            continue;
          }
          break;
        }
        if (f.child === p.child) {
          for (p = f.child; p; ) {
            if (p === i) return (d(f), t);
            if (p === l) return (d(f), r);
            p = p.sibling;
          }
          throw Error(o(188));
        }
        if (i.return !== l.return) ((i = f), (l = p));
        else {
          for (var y = !1, T = f.child; T; ) {
            if (T === i) {
              ((y = !0), (i = f), (l = p));
              break;
            }
            if (T === l) {
              ((y = !0), (l = f), (i = p));
              break;
            }
            T = T.sibling;
          }
          if (!y) {
            for (T = p.child; T; ) {
              if (T === i) {
                ((y = !0), (i = p), (l = f));
                break;
              }
              if (T === l) {
                ((y = !0), (l = p), (i = f));
                break;
              }
              T = T.sibling;
            }
            if (!y) throw Error(o(189));
          }
        }
        if (i.alternate !== l) throw Error(o(190));
      }
      if (i.tag !== 3) throw Error(o(188));
      return i.stateNode.current === i ? t : r;
    }
    function m(t) {
      var r = t.tag;
      if (r === 5 || r === 26 || r === 27 || r === 6) return t;
      for (t = t.child; t !== null; ) {
        if (((r = m(t)), r !== null)) return r;
        t = t.sibling;
      }
      return null;
    }
    var g = Object.assign,
      b = Symbol.for("react.element"),
      x = Symbol.for("react.transitional.element"),
      C = Symbol.for("react.portal"),
      _ = Symbol.for("react.fragment"),
      v = Symbol.for("react.strict_mode"),
      E = Symbol.for("react.profiler"),
      w = Symbol.for("react.provider"),
      D = Symbol.for("react.consumer"),
      R = Symbol.for("react.context"),
      M = Symbol.for("react.forward_ref"),
      A = Symbol.for("react.suspense"),
      L = Symbol.for("react.suspense_list"),
      G = Symbol.for("react.memo"),
      q = Symbol.for("react.lazy"),
      W = Symbol.for("react.activity"),
      S = Symbol.for("react.memo_cache_sentinel"),
      I = Symbol.iterator;
    function X(t) {
      return t === null || typeof t != "object"
        ? null
        : ((t = (I && t[I]) || t["@@iterator"]),
          typeof t == "function" ? t : null);
    }
    var oe = Symbol.for("react.client.reference");
    function se(t) {
      if (t == null) return null;
      if (typeof t == "function")
        return t.$$typeof === oe ? null : t.displayName || t.name || null;
      if (typeof t == "string") return t;
      switch (t) {
        case _:
          return "Fragment";
        case E:
          return "Profiler";
        case v:
          return "StrictMode";
        case A:
          return "Suspense";
        case L:
          return "SuspenseList";
        case W:
          return "Activity";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case C:
            return "Portal";
          case R:
            return (t.displayName || "Context") + ".Provider";
          case D:
            return (t._context.displayName || "Context") + ".Consumer";
          case M:
            var r = t.render;
            return (
              (t = t.displayName),
              t ||
                ((t = r.displayName || r.name || ""),
                (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
              t
            );
          case G:
            return (
              (r = t.displayName || null),
              r !== null ? r : se(t.type) || "Memo"
            );
          case q:
            ((r = t._payload), (t = t._init));
            try {
              return se(t(r));
            } catch {}
        }
      return null;
    }
    var J = Array.isArray,
      z = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      Y = a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      ie = { pending: !1, data: null, method: null, action: null },
      re = [],
      N = -1;
    function K(t) {
      return { current: t };
    }
    function ae(t) {
      0 > N || ((t.current = re[N]), (re[N] = null), N--);
    }
    function te(t, r) {
      (N++, (re[N] = t.current), (t.current = r));
    }
    var le = K(null),
      ce = K(null),
      fe = K(null),
      Ae = K(null);
    function xe(t, r) {
      switch ((te(fe, r), te(ce, t), te(le, null), r.nodeType)) {
        case 9:
        case 11:
          t = (t = r.documentElement) && (t = t.namespaceURI) ? m_(t) : 0;
          break;
        default:
          if (((t = r.tagName), (r = r.namespaceURI)))
            ((r = m_(r)), (t = g_(r, t)));
          else
            switch (t) {
              case "svg":
                t = 1;
                break;
              case "math":
                t = 2;
                break;
              default:
                t = 0;
            }
      }
      (ae(le), te(le, t));
    }
    function ke() {
      (ae(le), ae(ce), ae(fe));
    }
    function ge(t) {
      t.memoizedState !== null && te(Ae, t);
      var r = le.current,
        i = g_(r, t.type);
      r !== i && (te(ce, t), te(le, i));
    }
    function Oe(t) {
      (ce.current === t && (ae(le), ae(ce)),
        Ae.current === t && (ae(Ae), (Ps._currentValue = ie)));
    }
    var Me = Object.prototype.hasOwnProperty,
      Ie = e.unstable_scheduleCallback,
      Re = e.unstable_cancelCallback,
      Xe = e.unstable_shouldYield,
      Gt = e.unstable_requestPaint,
      We = e.unstable_now,
      ft = e.unstable_getCurrentPriorityLevel,
      ut = e.unstable_ImmediatePriority,
      mt = e.unstable_UserBlockingPriority,
      Fe = e.unstable_NormalPriority,
      pe = e.unstable_LowPriority,
      Sn = e.unstable_IdlePriority,
      _t = e.log,
      Xn = e.unstable_setDisableYieldValue,
      fn = null,
      Tt = null;
    function jt(t) {
      if (
        (typeof _t == "function" && Xn(t),
        Tt && typeof Tt.setStrictMode == "function")
      )
        try {
          Tt.setStrictMode(fn, t);
        } catch {}
    }
    var gt = Math.clz32 ? Math.clz32 : Jt,
      dt = Math.log,
      ve = Math.LN2;
    function Jt(t) {
      return ((t >>>= 0), t === 0 ? 32 : (31 - ((dt(t) / ve) | 0)) | 0);
    }
    var At = 256,
      zt = 4194304;
    function he(t) {
      var r = t & 42;
      if (r !== 0) return r;
      switch (t & -t) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
          return 64;
        case 128:
          return 128;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t & 4194048;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return t & 62914560;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return t;
      }
    }
    function Ge(t, r, i) {
      var l = t.pendingLanes;
      if (l === 0) return 0;
      var f = 0,
        p = t.suspendedLanes,
        y = t.pingedLanes;
      t = t.warmLanes;
      var T = l & 134217727;
      return (
        T !== 0
          ? ((l = T & ~p),
            l !== 0
              ? (f = he(l))
              : ((y &= T),
                y !== 0
                  ? (f = he(y))
                  : i || ((i = T & ~t), i !== 0 && (f = he(i)))))
          : ((T = l & ~p),
            T !== 0
              ? (f = he(T))
              : y !== 0
                ? (f = he(y))
                : i || ((i = l & ~t), i !== 0 && (f = he(i)))),
        f === 0
          ? 0
          : r !== 0 &&
              r !== f &&
              (r & p) === 0 &&
              ((p = f & -f),
              (i = r & -r),
              p >= i || (p === 32 && (i & 4194048) !== 0))
            ? r
            : f
      );
    }
    function yt(t, r) {
      return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & r) === 0;
    }
    function Yr(t, r) {
      switch (t) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return r + 250;
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return r + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function Qi() {
      var t = At;
      return ((At <<= 1), (At & 4194048) === 0 && (At = 256), t);
    }
    function Jv() {
      var t = zt;
      return ((zt <<= 1), (zt & 62914560) === 0 && (zt = 4194304), t);
    }
    function yp(t) {
      for (var r = [], i = 0; 31 > i; i++) r.push(t);
      return r;
    }
    function Zi(t, r) {
      ((t.pendingLanes |= r),
        r !== 268435456 &&
          ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
    }
    function D4(t, r, i, l, f, p) {
      var y = t.pendingLanes;
      ((t.pendingLanes = i),
        (t.suspendedLanes = 0),
        (t.pingedLanes = 0),
        (t.warmLanes = 0),
        (t.expiredLanes &= i),
        (t.entangledLanes &= i),
        (t.errorRecoveryDisabledLanes &= i),
        (t.shellSuspendCounter = 0));
      var T = t.entanglements,
        k = t.expirationTimes,
        $ = t.hiddenUpdates;
      for (i = y & ~i; 0 < i; ) {
        var Z = 31 - gt(i),
          ne = 1 << Z;
        ((T[Z] = 0), (k[Z] = -1));
        var H = $[Z];
        if (H !== null)
          for ($[Z] = null, Z = 0; Z < H.length; Z++) {
            var F = H[Z];
            F !== null && (F.lane &= -536870913);
          }
        i &= ~ne;
      }
      (l !== 0 && eS(t, l, 0),
        p !== 0 &&
          f === 0 &&
          t.tag !== 0 &&
          (t.suspendedLanes |= p & ~(y & ~r)));
    }
    function eS(t, r, i) {
      ((t.pendingLanes |= r), (t.suspendedLanes &= ~r));
      var l = 31 - gt(r);
      ((t.entangledLanes |= r),
        (t.entanglements[l] = t.entanglements[l] | 1073741824 | (i & 4194090)));
    }
    function tS(t, r) {
      var i = (t.entangledLanes |= r);
      for (t = t.entanglements; i; ) {
        var l = 31 - gt(i),
          f = 1 << l;
        ((f & r) | (t[l] & r) && (t[l] |= r), (i &= ~f));
      }
    }
    function bp(t) {
      switch (t) {
        case 2:
          t = 1;
          break;
        case 8:
          t = 4;
          break;
        case 32:
          t = 16;
          break;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          t = 128;
          break;
        case 268435456:
          t = 134217728;
          break;
        default:
          t = 0;
      }
      return t;
    }
    function vp(t) {
      return (
        (t &= -t),
        2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
      );
    }
    function nS() {
      var t = Y.p;
      return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : B_(t.type));
    }
    function N4(t, r) {
      var i = Y.p;
      try {
        return ((Y.p = t), r());
      } finally {
        Y.p = i;
      }
    }
    var Xr = Math.random().toString(36).slice(2),
      en = "__reactFiber$" + Xr,
      dn = "__reactProps$" + Xr,
      Ro = "__reactContainer$" + Xr,
      Sp = "__reactEvents$" + Xr,
      k4 = "__reactListeners$" + Xr,
      z4 = "__reactHandles$" + Xr,
      rS = "__reactResources$" + Xr,
      Ji = "__reactMarker$" + Xr;
    function Ep(t) {
      (delete t[en], delete t[dn], delete t[Sp], delete t[k4], delete t[z4]);
    }
    function Ao(t) {
      var r = t[en];
      if (r) return r;
      for (var i = t.parentNode; i; ) {
        if ((r = i[Ro] || i[en])) {
          if (
            ((i = r.alternate),
            r.child !== null || (i !== null && i.child !== null))
          )
            for (t = S_(t); t !== null; ) {
              if ((i = t[en])) return i;
              t = S_(t);
            }
          return r;
        }
        ((t = i), (i = t.parentNode));
      }
      return null;
    }
    function Oo(t) {
      if ((t = t[en] || t[Ro])) {
        var r = t.tag;
        if (r === 5 || r === 6 || r === 13 || r === 26 || r === 27 || r === 3)
          return t;
      }
      return null;
    }
    function es(t) {
      var r = t.tag;
      if (r === 5 || r === 26 || r === 27 || r === 6) return t.stateNode;
      throw Error(o(33));
    }
    function Mo(t) {
      var r = t[rS];
      return (
        r ||
          (r = t[rS] =
            { hoistableStyles: new Map(), hoistableScripts: new Map() }),
        r
      );
    }
    function $t(t) {
      t[Ji] = !0;
    }
    var aS = new Set(),
      oS = {};
    function Ha(t, r) {
      (Do(t, r), Do(t + "Capture", r));
    }
    function Do(t, r) {
      for (oS[t] = r, t = 0; t < r.length; t++) aS.add(r[t]);
    }
    var B4 = RegExp(
        "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
      ),
      iS = {},
      sS = {};
    function L4(t) {
      return Me.call(sS, t)
        ? !0
        : Me.call(iS, t)
          ? !1
          : B4.test(t)
            ? (sS[t] = !0)
            : ((iS[t] = !0), !1);
    }
    function bu(t, r, i) {
      if (L4(r))
        if (i === null) t.removeAttribute(r);
        else {
          switch (typeof i) {
            case "undefined":
            case "function":
            case "symbol":
              t.removeAttribute(r);
              return;
            case "boolean":
              var l = r.toLowerCase().slice(0, 5);
              if (l !== "data-" && l !== "aria-") {
                t.removeAttribute(r);
                return;
              }
          }
          t.setAttribute(r, "" + i);
        }
    }
    function vu(t, r, i) {
      if (i === null) t.removeAttribute(r);
      else {
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            t.removeAttribute(r);
            return;
        }
        t.setAttribute(r, "" + i);
      }
    }
    function xr(t, r, i, l) {
      if (l === null) t.removeAttribute(i);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            t.removeAttribute(i);
            return;
        }
        t.setAttributeNS(r, i, "" + l);
      }
    }
    var _p, lS;
    function No(t) {
      if (_p === void 0)
        try {
          throw Error();
        } catch (i) {
          var r = i.stack.trim().match(/\n( *(at )?)/);
          ((_p = (r && r[1]) || ""),
            (lS =
              -1 <
              i.stack.indexOf(`
    at`)
                ? " (<anonymous>)"
                : -1 < i.stack.indexOf("@")
                  ? "@unknown:0:0"
                  : ""));
        }
      return (
        `
` +
        _p +
        t +
        lS
      );
    }
    var Tp = !1;
    function xp(t, r) {
      if (!t || Tp) return "";
      Tp = !0;
      var i = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var l = {
          DetermineComponentFrameRoot: function () {
            try {
              if (r) {
                var ne = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(ne.prototype, "props", {
                    set: function () {
                      throw Error();
                    },
                  }),
                  typeof Reflect == "object" && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(ne, []);
                  } catch (F) {
                    var H = F;
                  }
                  Reflect.construct(t, [], ne);
                } else {
                  try {
                    ne.call();
                  } catch (F) {
                    H = F;
                  }
                  t.call(ne.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (F) {
                  H = F;
                }
                (ne = t()) &&
                  typeof ne.catch == "function" &&
                  ne.catch(function () {});
              }
            } catch (F) {
              if (F && H && typeof F.stack == "string")
                return [F.stack, H.stack];
            }
            return [null, null];
          },
        };
        l.DetermineComponentFrameRoot.displayName =
          "DetermineComponentFrameRoot";
        var f = Object.getOwnPropertyDescriptor(
          l.DetermineComponentFrameRoot,
          "name",
        );
        f &&
          f.configurable &&
          Object.defineProperty(l.DetermineComponentFrameRoot, "name", {
            value: "DetermineComponentFrameRoot",
          });
        var p = l.DetermineComponentFrameRoot(),
          y = p[0],
          T = p[1];
        if (y && T) {
          var k = y.split(`
`),
            $ = T.split(`
`);
          for (
            f = l = 0;
            l < k.length && !k[l].includes("DetermineComponentFrameRoot");
          )
            l++;
          for (
            ;
            f < $.length && !$[f].includes("DetermineComponentFrameRoot");
          )
            f++;
          if (l === k.length || f === $.length)
            for (
              l = k.length - 1, f = $.length - 1;
              1 <= l && 0 <= f && k[l] !== $[f];
            )
              f--;
          for (; 1 <= l && 0 <= f; l--, f--)
            if (k[l] !== $[f]) {
              if (l !== 1 || f !== 1)
                do
                  if ((l--, f--, 0 > f || k[l] !== $[f])) {
                    var Z =
                      `
` + k[l].replace(" at new ", " at ");
                    return (
                      t.displayName &&
                        Z.includes("<anonymous>") &&
                        (Z = Z.replace("<anonymous>", t.displayName)),
                      Z
                    );
                  }
                while (1 <= l && 0 <= f);
              break;
            }
        }
      } finally {
        ((Tp = !1), (Error.prepareStackTrace = i));
      }
      return (i = t ? t.displayName || t.name : "") ? No(i) : "";
    }
    function U4(t) {
      switch (t.tag) {
        case 26:
        case 27:
        case 5:
          return No(t.type);
        case 16:
          return No("Lazy");
        case 13:
          return No("Suspense");
        case 19:
          return No("SuspenseList");
        case 0:
        case 15:
          return xp(t.type, !1);
        case 11:
          return xp(t.type.render, !1);
        case 1:
          return xp(t.type, !0);
        case 31:
          return No("Activity");
        default:
          return "";
      }
    }
    function uS(t) {
      try {
        var r = "";
        do ((r += U4(t)), (t = t.return));
        while (t);
        return r;
      } catch (i) {
        return (
          `
Error generating stack: ` +
          i.message +
          `
` +
          i.stack
        );
      }
    }
    function zn(t) {
      switch (typeof t) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return t;
        case "object":
          return t;
        default:
          return "";
      }
    }
    function cS(t) {
      var r = t.type;
      return (
        (t = t.nodeName) &&
        t.toLowerCase() === "input" &&
        (r === "checkbox" || r === "radio")
      );
    }
    function j4(t) {
      var r = cS(t) ? "checked" : "value",
        i = Object.getOwnPropertyDescriptor(t.constructor.prototype, r),
        l = "" + t[r];
      if (
        !t.hasOwnProperty(r) &&
        typeof i < "u" &&
        typeof i.get == "function" &&
        typeof i.set == "function"
      ) {
        var f = i.get,
          p = i.set;
        return (
          Object.defineProperty(t, r, {
            configurable: !0,
            get: function () {
              return f.call(this);
            },
            set: function (y) {
              ((l = "" + y), p.call(this, y));
            },
          }),
          Object.defineProperty(t, r, { enumerable: i.enumerable }),
          {
            getValue: function () {
              return l;
            },
            setValue: function (y) {
              l = "" + y;
            },
            stopTracking: function () {
              ((t._valueTracker = null), delete t[r]);
            },
          }
        );
      }
    }
    function Su(t) {
      t._valueTracker || (t._valueTracker = j4(t));
    }
    function fS(t) {
      if (!t) return !1;
      var r = t._valueTracker;
      if (!r) return !0;
      var i = r.getValue(),
        l = "";
      return (
        t && (l = cS(t) ? (t.checked ? "true" : "false") : t.value),
        (t = l),
        t !== i ? (r.setValue(t), !0) : !1
      );
    }
    function Eu(t) {
      if (
        ((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")
      )
        return null;
      try {
        return t.activeElement || t.body;
      } catch {
        return t.body;
      }
    }
    var $4 = /[\n"\\]/g;
    function Bn(t) {
      return t.replace($4, function (r) {
        return "\\" + r.charCodeAt(0).toString(16) + " ";
      });
    }
    function Cp(t, r, i, l, f, p, y, T) {
      ((t.name = ""),
        y != null &&
        typeof y != "function" &&
        typeof y != "symbol" &&
        typeof y != "boolean"
          ? (t.type = y)
          : t.removeAttribute("type"),
        r != null
          ? y === "number"
            ? ((r === 0 && t.value === "") || t.value != r) &&
              (t.value = "" + zn(r))
            : t.value !== "" + zn(r) && (t.value = "" + zn(r))
          : (y !== "submit" && y !== "reset") || t.removeAttribute("value"),
        r != null
          ? wp(t, y, zn(r))
          : i != null
            ? wp(t, y, zn(i))
            : l != null && t.removeAttribute("value"),
        f == null && p != null && (t.defaultChecked = !!p),
        f != null &&
          (t.checked = f && typeof f != "function" && typeof f != "symbol"),
        T != null &&
        typeof T != "function" &&
        typeof T != "symbol" &&
        typeof T != "boolean"
          ? (t.name = "" + zn(T))
          : t.removeAttribute("name"));
    }
    function dS(t, r, i, l, f, p, y, T) {
      if (
        (p != null &&
          typeof p != "function" &&
          typeof p != "symbol" &&
          typeof p != "boolean" &&
          (t.type = p),
        r != null || i != null)
      ) {
        if (!((p !== "submit" && p !== "reset") || r != null)) return;
        ((i = i != null ? "" + zn(i) : ""),
          (r = r != null ? "" + zn(r) : i),
          T || r === t.value || (t.value = r),
          (t.defaultValue = r));
      }
      ((l = l ?? f),
        (l = typeof l != "function" && typeof l != "symbol" && !!l),
        (t.checked = T ? t.checked : !!l),
        (t.defaultChecked = !!l),
        y != null &&
          typeof y != "function" &&
          typeof y != "symbol" &&
          typeof y != "boolean" &&
          (t.name = y));
    }
    function wp(t, r, i) {
      (r === "number" && Eu(t.ownerDocument) === t) ||
        t.defaultValue === "" + i ||
        (t.defaultValue = "" + i);
    }
    function ko(t, r, i, l) {
      if (((t = t.options), r)) {
        r = {};
        for (var f = 0; f < i.length; f++) r["$" + i[f]] = !0;
        for (i = 0; i < t.length; i++)
          ((f = r.hasOwnProperty("$" + t[i].value)),
            t[i].selected !== f && (t[i].selected = f),
            f && l && (t[i].defaultSelected = !0));
      } else {
        for (i = "" + zn(i), r = null, f = 0; f < t.length; f++) {
          if (t[f].value === i) {
            ((t[f].selected = !0), l && (t[f].defaultSelected = !0));
            return;
          }
          r !== null || t[f].disabled || (r = t[f]);
        }
        r !== null && (r.selected = !0);
      }
    }
    function pS(t, r, i) {
      if (
        r != null &&
        ((r = "" + zn(r)), r !== t.value && (t.value = r), i == null)
      ) {
        t.defaultValue !== r && (t.defaultValue = r);
        return;
      }
      t.defaultValue = i != null ? "" + zn(i) : "";
    }
    function hS(t, r, i, l) {
      if (r == null) {
        if (l != null) {
          if (i != null) throw Error(o(92));
          if (J(l)) {
            if (1 < l.length) throw Error(o(93));
            l = l[0];
          }
          i = l;
        }
        (i == null && (i = ""), (r = i));
      }
      ((i = zn(r)),
        (t.defaultValue = i),
        (l = t.textContent),
        l === i && l !== "" && l !== null && (t.value = l));
    }
    function zo(t, r) {
      if (r) {
        var i = t.firstChild;
        if (i && i === t.lastChild && i.nodeType === 3) {
          i.nodeValue = r;
          return;
        }
      }
      t.textContent = r;
    }
    var I4 = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
        " ",
      ),
    );
    function mS(t, r, i) {
      var l = r.indexOf("--") === 0;
      i == null || typeof i == "boolean" || i === ""
        ? l
          ? t.setProperty(r, "")
          : r === "float"
            ? (t.cssFloat = "")
            : (t[r] = "")
        : l
          ? t.setProperty(r, i)
          : typeof i != "number" || i === 0 || I4.has(r)
            ? r === "float"
              ? (t.cssFloat = i)
              : (t[r] = ("" + i).trim())
            : (t[r] = i + "px");
    }
    function gS(t, r, i) {
      if (r != null && typeof r != "object") throw Error(o(62));
      if (((t = t.style), i != null)) {
        for (var l in i)
          !i.hasOwnProperty(l) ||
            (r != null && r.hasOwnProperty(l)) ||
            (l.indexOf("--") === 0
              ? t.setProperty(l, "")
              : l === "float"
                ? (t.cssFloat = "")
                : (t[l] = ""));
        for (var f in r)
          ((l = r[f]), r.hasOwnProperty(f) && i[f] !== l && mS(t, f, l));
      } else for (var p in r) r.hasOwnProperty(p) && mS(t, p, r[p]);
    }
    function Rp(t) {
      if (t.indexOf("-") === -1) return !1;
      switch (t) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var H4 = new Map([
        ["acceptCharset", "accept-charset"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"],
        ["crossOrigin", "crossorigin"],
        ["accentHeight", "accent-height"],
        ["alignmentBaseline", "alignment-baseline"],
        ["arabicForm", "arabic-form"],
        ["baselineShift", "baseline-shift"],
        ["capHeight", "cap-height"],
        ["clipPath", "clip-path"],
        ["clipRule", "clip-rule"],
        ["colorInterpolation", "color-interpolation"],
        ["colorInterpolationFilters", "color-interpolation-filters"],
        ["colorProfile", "color-profile"],
        ["colorRendering", "color-rendering"],
        ["dominantBaseline", "dominant-baseline"],
        ["enableBackground", "enable-background"],
        ["fillOpacity", "fill-opacity"],
        ["fillRule", "fill-rule"],
        ["floodColor", "flood-color"],
        ["floodOpacity", "flood-opacity"],
        ["fontFamily", "font-family"],
        ["fontSize", "font-size"],
        ["fontSizeAdjust", "font-size-adjust"],
        ["fontStretch", "font-stretch"],
        ["fontStyle", "font-style"],
        ["fontVariant", "font-variant"],
        ["fontWeight", "font-weight"],
        ["glyphName", "glyph-name"],
        ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
        ["glyphOrientationVertical", "glyph-orientation-vertical"],
        ["horizAdvX", "horiz-adv-x"],
        ["horizOriginX", "horiz-origin-x"],
        ["imageRendering", "image-rendering"],
        ["letterSpacing", "letter-spacing"],
        ["lightingColor", "lighting-color"],
        ["markerEnd", "marker-end"],
        ["markerMid", "marker-mid"],
        ["markerStart", "marker-start"],
        ["overlinePosition", "overline-position"],
        ["overlineThickness", "overline-thickness"],
        ["paintOrder", "paint-order"],
        ["panose-1", "panose-1"],
        ["pointerEvents", "pointer-events"],
        ["renderingIntent", "rendering-intent"],
        ["shapeRendering", "shape-rendering"],
        ["stopColor", "stop-color"],
        ["stopOpacity", "stop-opacity"],
        ["strikethroughPosition", "strikethrough-position"],
        ["strikethroughThickness", "strikethrough-thickness"],
        ["strokeDasharray", "stroke-dasharray"],
        ["strokeDashoffset", "stroke-dashoffset"],
        ["strokeLinecap", "stroke-linecap"],
        ["strokeLinejoin", "stroke-linejoin"],
        ["strokeMiterlimit", "stroke-miterlimit"],
        ["strokeOpacity", "stroke-opacity"],
        ["strokeWidth", "stroke-width"],
        ["textAnchor", "text-anchor"],
        ["textDecoration", "text-decoration"],
        ["textRendering", "text-rendering"],
        ["transformOrigin", "transform-origin"],
        ["underlinePosition", "underline-position"],
        ["underlineThickness", "underline-thickness"],
        ["unicodeBidi", "unicode-bidi"],
        ["unicodeRange", "unicode-range"],
        ["unitsPerEm", "units-per-em"],
        ["vAlphabetic", "v-alphabetic"],
        ["vHanging", "v-hanging"],
        ["vIdeographic", "v-ideographic"],
        ["vMathematical", "v-mathematical"],
        ["vectorEffect", "vector-effect"],
        ["vertAdvY", "vert-adv-y"],
        ["vertOriginX", "vert-origin-x"],
        ["vertOriginY", "vert-origin-y"],
        ["wordSpacing", "word-spacing"],
        ["writingMode", "writing-mode"],
        ["xmlnsXlink", "xmlns:xlink"],
        ["xHeight", "x-height"],
      ]),
      P4 =
        /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function _u(t) {
      return P4.test("" + t)
        ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        : t;
    }
    var Ap = null;
    function Op(t) {
      return (
        (t = t.target || t.srcElement || window),
        t.correspondingUseElement && (t = t.correspondingUseElement),
        t.nodeType === 3 ? t.parentNode : t
      );
    }
    var Bo = null,
      Lo = null;
    function yS(t) {
      var r = Oo(t);
      if (r && (t = r.stateNode)) {
        var i = t[dn] || null;
        e: switch (((t = r.stateNode), r.type)) {
          case "input":
            if (
              (Cp(
                t,
                i.value,
                i.defaultValue,
                i.defaultValue,
                i.checked,
                i.defaultChecked,
                i.type,
                i.name,
              ),
              (r = i.name),
              i.type === "radio" && r != null)
            ) {
              for (i = t; i.parentNode; ) i = i.parentNode;
              for (
                i = i.querySelectorAll(
                  'input[name="' + Bn("" + r) + '"][type="radio"]',
                ),
                  r = 0;
                r < i.length;
                r++
              ) {
                var l = i[r];
                if (l !== t && l.form === t.form) {
                  var f = l[dn] || null;
                  if (!f) throw Error(o(90));
                  Cp(
                    l,
                    f.value,
                    f.defaultValue,
                    f.defaultValue,
                    f.checked,
                    f.defaultChecked,
                    f.type,
                    f.name,
                  );
                }
              }
              for (r = 0; r < i.length; r++)
                ((l = i[r]), l.form === t.form && fS(l));
            }
            break e;
          case "textarea":
            pS(t, i.value, i.defaultValue);
            break e;
          case "select":
            ((r = i.value), r != null && ko(t, !!i.multiple, r, !1));
        }
      }
    }
    var Mp = !1;
    function bS(t, r, i) {
      if (Mp) return t(r, i);
      Mp = !0;
      try {
        var l = t(r);
        return l;
      } finally {
        if (
          ((Mp = !1),
          (Bo !== null || Lo !== null) &&
            (sc(), Bo && ((r = Bo), (t = Lo), (Lo = Bo = null), yS(r), t)))
        )
          for (r = 0; r < t.length; r++) yS(t[r]);
      }
    }
    function ts(t, r) {
      var i = t.stateNode;
      if (i === null) return null;
      var l = i[dn] || null;
      if (l === null) return null;
      i = l[r];
      e: switch (r) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          ((l = !l.disabled) ||
            ((t = t.type),
            (l = !(
              t === "button" ||
              t === "input" ||
              t === "select" ||
              t === "textarea"
            ))),
            (t = !l));
          break e;
        default:
          t = !1;
      }
      if (t) return null;
      if (i && typeof i != "function") throw Error(o(231, r, typeof i));
      return i;
    }
    var Cr = !(
        typeof window > "u" ||
        typeof window.document > "u" ||
        typeof window.document.createElement > "u"
      ),
      Dp = !1;
    if (Cr)
      try {
        var ns = {};
        (Object.defineProperty(ns, "passive", {
          get: function () {
            Dp = !0;
          },
        }),
          window.addEventListener("test", ns, ns),
          window.removeEventListener("test", ns, ns));
      } catch {
        Dp = !1;
      }
    var Wr = null,
      Np = null,
      Tu = null;
    function vS() {
      if (Tu) return Tu;
      var t,
        r = Np,
        i = r.length,
        l,
        f = "value" in Wr ? Wr.value : Wr.textContent,
        p = f.length;
      for (t = 0; t < i && r[t] === f[t]; t++);
      var y = i - t;
      for (l = 1; l <= y && r[i - l] === f[p - l]; l++);
      return (Tu = f.slice(t, 1 < l ? 1 - l : void 0));
    }
    function xu(t) {
      var r = t.keyCode;
      return (
        "charCode" in t
          ? ((t = t.charCode), t === 0 && r === 13 && (t = 13))
          : (t = r),
        t === 10 && (t = 13),
        32 <= t || t === 13 ? t : 0
      );
    }
    function Cu() {
      return !0;
    }
    function SS() {
      return !1;
    }
    function pn(t) {
      function r(i, l, f, p, y) {
        ((this._reactName = i),
          (this._targetInst = f),
          (this.type = l),
          (this.nativeEvent = p),
          (this.target = y),
          (this.currentTarget = null));
        for (var T in t)
          t.hasOwnProperty(T) && ((i = t[T]), (this[T] = i ? i(p) : p[T]));
        return (
          (this.isDefaultPrevented = (
            p.defaultPrevented != null
              ? p.defaultPrevented
              : p.returnValue === !1
          )
            ? Cu
            : SS),
          (this.isPropagationStopped = SS),
          this
        );
      }
      return (
        g(r.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0;
            var i = this.nativeEvent;
            i &&
              (i.preventDefault
                ? i.preventDefault()
                : typeof i.returnValue != "unknown" && (i.returnValue = !1),
              (this.isDefaultPrevented = Cu));
          },
          stopPropagation: function () {
            var i = this.nativeEvent;
            i &&
              (i.stopPropagation
                ? i.stopPropagation()
                : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0),
              (this.isPropagationStopped = Cu));
          },
          persist: function () {},
          isPersistent: Cu,
        }),
        r
      );
    }
    var Pa = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (t) {
          return t.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      wu = pn(Pa),
      rs = g({}, Pa, { view: 0, detail: 0 }),
      q4 = pn(rs),
      kp,
      zp,
      as,
      Ru = g({}, rs, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: Lp,
        button: 0,
        buttons: 0,
        relatedTarget: function (t) {
          return t.relatedTarget === void 0
            ? t.fromElement === t.srcElement
              ? t.toElement
              : t.fromElement
            : t.relatedTarget;
        },
        movementX: function (t) {
          return "movementX" in t
            ? t.movementX
            : (t !== as &&
                (as && t.type === "mousemove"
                  ? ((kp = t.screenX - as.screenX),
                    (zp = t.screenY - as.screenY))
                  : (zp = kp = 0),
                (as = t)),
              kp);
        },
        movementY: function (t) {
          return "movementY" in t ? t.movementY : zp;
        },
      }),
      ES = pn(Ru),
      F4 = g({}, Ru, { dataTransfer: 0 }),
      G4 = pn(F4),
      V4 = g({}, rs, { relatedTarget: 0 }),
      Bp = pn(V4),
      K4 = g({}, Pa, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
      Y4 = pn(K4),
      X4 = g({}, Pa, {
        clipboardData: function (t) {
          return "clipboardData" in t ? t.clipboardData : window.clipboardData;
        },
      }),
      W4 = pn(X4),
      Q4 = g({}, Pa, { data: 0 }),
      _S = pn(Q4),
      Z4 = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified",
      },
      J4 = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta",
      },
      ek = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
      };
    function tk(t) {
      var r = this.nativeEvent;
      return r.getModifierState
        ? r.getModifierState(t)
        : (t = ek[t])
          ? !!r[t]
          : !1;
    }
    function Lp() {
      return tk;
    }
    var nk = g({}, rs, {
        key: function (t) {
          if (t.key) {
            var r = Z4[t.key] || t.key;
            if (r !== "Unidentified") return r;
          }
          return t.type === "keypress"
            ? ((t = xu(t)), t === 13 ? "Enter" : String.fromCharCode(t))
            : t.type === "keydown" || t.type === "keyup"
              ? J4[t.keyCode] || "Unidentified"
              : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: Lp,
        charCode: function (t) {
          return t.type === "keypress" ? xu(t) : 0;
        },
        keyCode: function (t) {
          return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
        },
        which: function (t) {
          return t.type === "keypress"
            ? xu(t)
            : t.type === "keydown" || t.type === "keyup"
              ? t.keyCode
              : 0;
        },
      }),
      rk = pn(nk),
      ak = g({}, Ru, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0,
      }),
      TS = pn(ak),
      ok = g({}, rs, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: Lp,
      }),
      ik = pn(ok),
      sk = g({}, Pa, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
      lk = pn(sk),
      uk = g({}, Ru, {
        deltaX: function (t) {
          return "deltaX" in t
            ? t.deltaX
            : "wheelDeltaX" in t
              ? -t.wheelDeltaX
              : 0;
        },
        deltaY: function (t) {
          return "deltaY" in t
            ? t.deltaY
            : "wheelDeltaY" in t
              ? -t.wheelDeltaY
              : "wheelDelta" in t
                ? -t.wheelDelta
                : 0;
        },
        deltaZ: 0,
        deltaMode: 0,
      }),
      ck = pn(uk),
      fk = g({}, Pa, { newState: 0, oldState: 0 }),
      dk = pn(fk),
      pk = [9, 13, 27, 32],
      Up = Cr && "CompositionEvent" in window,
      os = null;
    Cr && "documentMode" in document && (os = document.documentMode);
    var hk = Cr && "TextEvent" in window && !os,
      xS = Cr && (!Up || (os && 8 < os && 11 >= os)),
      CS = " ",
      wS = !1;
    function RS(t, r) {
      switch (t) {
        case "keyup":
          return pk.indexOf(r.keyCode) !== -1;
        case "keydown":
          return r.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function AS(t) {
      return (
        (t = t.detail),
        typeof t == "object" && "data" in t ? t.data : null
      );
    }
    var Uo = !1;
    function mk(t, r) {
      switch (t) {
        case "compositionend":
          return AS(r);
        case "keypress":
          return r.which !== 32 ? null : ((wS = !0), CS);
        case "textInput":
          return ((t = r.data), t === CS && wS ? null : t);
        default:
          return null;
      }
    }
    function gk(t, r) {
      if (Uo)
        return t === "compositionend" || (!Up && RS(t, r))
          ? ((t = vS()), (Tu = Np = Wr = null), (Uo = !1), t)
          : null;
      switch (t) {
        case "paste":
          return null;
        case "keypress":
          if (
            !(r.ctrlKey || r.altKey || r.metaKey) ||
            (r.ctrlKey && r.altKey)
          ) {
            if (r.char && 1 < r.char.length) return r.char;
            if (r.which) return String.fromCharCode(r.which);
          }
          return null;
        case "compositionend":
          return xS && r.locale !== "ko" ? null : r.data;
        default:
          return null;
      }
    }
    var yk = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0,
    };
    function OS(t) {
      var r = t && t.nodeName && t.nodeName.toLowerCase();
      return r === "input" ? !!yk[t.type] : r === "textarea";
    }
    function MS(t, r, i, l) {
      (Bo ? (Lo ? Lo.push(l) : (Lo = [l])) : (Bo = l),
        (r = pc(r, "onChange")),
        0 < r.length &&
          ((i = new wu("onChange", "change", null, i, l)),
          t.push({ event: i, listeners: r })));
    }
    var is = null,
      ss = null;
    function bk(t) {
      c_(t, 0);
    }
    function Au(t) {
      var r = es(t);
      if (fS(r)) return t;
    }
    function DS(t, r) {
      if (t === "change") return r;
    }
    var NS = !1;
    if (Cr) {
      var jp;
      if (Cr) {
        var $p = "oninput" in document;
        if (!$p) {
          var kS = document.createElement("div");
          (kS.setAttribute("oninput", "return;"),
            ($p = typeof kS.oninput == "function"));
        }
        jp = $p;
      } else jp = !1;
      NS = jp && (!document.documentMode || 9 < document.documentMode);
    }
    function zS() {
      is && (is.detachEvent("onpropertychange", BS), (ss = is = null));
    }
    function BS(t) {
      if (t.propertyName === "value" && Au(ss)) {
        var r = [];
        (MS(r, ss, t, Op(t)), bS(bk, r));
      }
    }
    function vk(t, r, i) {
      t === "focusin"
        ? (zS(), (is = r), (ss = i), is.attachEvent("onpropertychange", BS))
        : t === "focusout" && zS();
    }
    function Sk(t) {
      if (t === "selectionchange" || t === "keyup" || t === "keydown")
        return Au(ss);
    }
    function Ek(t, r) {
      if (t === "click") return Au(r);
    }
    function _k(t, r) {
      if (t === "input" || t === "change") return Au(r);
    }
    function Tk(t, r) {
      return (t === r && (t !== 0 || 1 / t === 1 / r)) || (t !== t && r !== r);
    }
    var En = typeof Object.is == "function" ? Object.is : Tk;
    function ls(t, r) {
      if (En(t, r)) return !0;
      if (
        typeof t != "object" ||
        t === null ||
        typeof r != "object" ||
        r === null
      )
        return !1;
      var i = Object.keys(t),
        l = Object.keys(r);
      if (i.length !== l.length) return !1;
      for (l = 0; l < i.length; l++) {
        var f = i[l];
        if (!Me.call(r, f) || !En(t[f], r[f])) return !1;
      }
      return !0;
    }
    function LS(t) {
      for (; t && t.firstChild; ) t = t.firstChild;
      return t;
    }
    function US(t, r) {
      var i = LS(t);
      t = 0;
      for (var l; i; ) {
        if (i.nodeType === 3) {
          if (((l = t + i.textContent.length), t <= r && l >= r))
            return { node: i, offset: r - t };
          t = l;
        }
        e: {
          for (; i; ) {
            if (i.nextSibling) {
              i = i.nextSibling;
              break e;
            }
            i = i.parentNode;
          }
          i = void 0;
        }
        i = LS(i);
      }
    }
    function jS(t, r) {
      return t && r
        ? t === r
          ? !0
          : t && t.nodeType === 3
            ? !1
            : r && r.nodeType === 3
              ? jS(t, r.parentNode)
              : "contains" in t
                ? t.contains(r)
                : t.compareDocumentPosition
                  ? !!(t.compareDocumentPosition(r) & 16)
                  : !1
        : !1;
    }
    function $S(t) {
      t =
        t != null &&
        t.ownerDocument != null &&
        t.ownerDocument.defaultView != null
          ? t.ownerDocument.defaultView
          : window;
      for (var r = Eu(t.document); r instanceof t.HTMLIFrameElement; ) {
        try {
          var i = typeof r.contentWindow.location.href == "string";
        } catch {
          i = !1;
        }
        if (i) t = r.contentWindow;
        else break;
        r = Eu(t.document);
      }
      return r;
    }
    function Ip(t) {
      var r = t && t.nodeName && t.nodeName.toLowerCase();
      return (
        r &&
        ((r === "input" &&
          (t.type === "text" ||
            t.type === "search" ||
            t.type === "tel" ||
            t.type === "url" ||
            t.type === "password")) ||
          r === "textarea" ||
          t.contentEditable === "true")
      );
    }
    var xk = Cr && "documentMode" in document && 11 >= document.documentMode,
      jo = null,
      Hp = null,
      us = null,
      Pp = !1;
    function IS(t, r, i) {
      var l =
        i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
      Pp ||
        jo == null ||
        jo !== Eu(l) ||
        ((l = jo),
        "selectionStart" in l && Ip(l)
          ? (l = { start: l.selectionStart, end: l.selectionEnd })
          : ((l = (
              (l.ownerDocument && l.ownerDocument.defaultView) ||
              window
            ).getSelection()),
            (l = {
              anchorNode: l.anchorNode,
              anchorOffset: l.anchorOffset,
              focusNode: l.focusNode,
              focusOffset: l.focusOffset,
            })),
        (us && ls(us, l)) ||
          ((us = l),
          (l = pc(Hp, "onSelect")),
          0 < l.length &&
            ((r = new wu("onSelect", "select", null, r, i)),
            t.push({ event: r, listeners: l }),
            (r.target = jo))));
    }
    function qa(t, r) {
      var i = {};
      return (
        (i[t.toLowerCase()] = r.toLowerCase()),
        (i["Webkit" + t] = "webkit" + r),
        (i["Moz" + t] = "moz" + r),
        i
      );
    }
    var $o = {
        animationend: qa("Animation", "AnimationEnd"),
        animationiteration: qa("Animation", "AnimationIteration"),
        animationstart: qa("Animation", "AnimationStart"),
        transitionrun: qa("Transition", "TransitionRun"),
        transitionstart: qa("Transition", "TransitionStart"),
        transitioncancel: qa("Transition", "TransitionCancel"),
        transitionend: qa("Transition", "TransitionEnd"),
      },
      qp = {},
      HS = {};
    Cr &&
      ((HS = document.createElement("div").style),
      "AnimationEvent" in window ||
        (delete $o.animationend.animation,
        delete $o.animationiteration.animation,
        delete $o.animationstart.animation),
      "TransitionEvent" in window || delete $o.transitionend.transition);
    function Fa(t) {
      if (qp[t]) return qp[t];
      if (!$o[t]) return t;
      var r = $o[t],
        i;
      for (i in r) if (r.hasOwnProperty(i) && i in HS) return (qp[t] = r[i]);
      return t;
    }
    var PS = Fa("animationend"),
      qS = Fa("animationiteration"),
      FS = Fa("animationstart"),
      Ck = Fa("transitionrun"),
      wk = Fa("transitionstart"),
      Rk = Fa("transitioncancel"),
      GS = Fa("transitionend"),
      VS = new Map(),
      Fp =
        "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
          " ",
        );
    Fp.push("scrollEnd");
    function Wn(t, r) {
      (VS.set(t, r), Ha(r, [t]));
    }
    var KS = new WeakMap();
    function Ln(t, r) {
      if (typeof t == "object" && t !== null) {
        var i = KS.get(t);
        return i !== void 0
          ? i
          : ((r = { value: t, source: r, stack: uS(r) }), KS.set(t, r), r);
      }
      return { value: t, source: r, stack: uS(r) };
    }
    var Un = [],
      Io = 0,
      Gp = 0;
    function Ou() {
      for (var t = Io, r = (Gp = Io = 0); r < t; ) {
        var i = Un[r];
        Un[r++] = null;
        var l = Un[r];
        Un[r++] = null;
        var f = Un[r];
        Un[r++] = null;
        var p = Un[r];
        if (((Un[r++] = null), l !== null && f !== null)) {
          var y = l.pending;
          (y === null ? (f.next = f) : ((f.next = y.next), (y.next = f)),
            (l.pending = f));
        }
        p !== 0 && YS(i, f, p);
      }
    }
    function Mu(t, r, i, l) {
      ((Un[Io++] = t),
        (Un[Io++] = r),
        (Un[Io++] = i),
        (Un[Io++] = l),
        (Gp |= l),
        (t.lanes |= l),
        (t = t.alternate),
        t !== null && (t.lanes |= l));
    }
    function Vp(t, r, i, l) {
      return (Mu(t, r, i, l), Du(t));
    }
    function Ho(t, r) {
      return (Mu(t, null, null, r), Du(t));
    }
    function YS(t, r, i) {
      t.lanes |= i;
      var l = t.alternate;
      l !== null && (l.lanes |= i);
      for (var f = !1, p = t.return; p !== null; )
        ((p.childLanes |= i),
          (l = p.alternate),
          l !== null && (l.childLanes |= i),
          p.tag === 22 &&
            ((t = p.stateNode), t === null || t._visibility & 1 || (f = !0)),
          (t = p),
          (p = p.return));
      return t.tag === 3
        ? ((p = t.stateNode),
          f &&
            r !== null &&
            ((f = 31 - gt(i)),
            (t = p.hiddenUpdates),
            (l = t[f]),
            l === null ? (t[f] = [r]) : l.push(r),
            (r.lane = i | 536870912)),
          p)
        : null;
    }
    function Du(t) {
      if (50 < zs) throw ((zs = 0), (Zh = null), Error(o(185)));
      for (var r = t.return; r !== null; ) ((t = r), (r = t.return));
      return t.tag === 3 ? t.stateNode : null;
    }
    var Po = {};
    function Ak(t, r, i, l) {
      ((this.tag = t),
        (this.key = i),
        (this.sibling =
          this.child =
          this.return =
          this.stateNode =
          this.type =
          this.elementType =
            null),
        (this.index = 0),
        (this.refCleanup = this.ref = null),
        (this.pendingProps = r),
        (this.dependencies =
          this.memoizedState =
          this.updateQueue =
          this.memoizedProps =
            null),
        (this.mode = l),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null));
    }
    function _n(t, r, i, l) {
      return new Ak(t, r, i, l);
    }
    function Kp(t) {
      return ((t = t.prototype), !(!t || !t.isReactComponent));
    }
    function wr(t, r) {
      var i = t.alternate;
      return (
        i === null
          ? ((i = _n(t.tag, r, t.key, t.mode)),
            (i.elementType = t.elementType),
            (i.type = t.type),
            (i.stateNode = t.stateNode),
            (i.alternate = t),
            (t.alternate = i))
          : ((i.pendingProps = r),
            (i.type = t.type),
            (i.flags = 0),
            (i.subtreeFlags = 0),
            (i.deletions = null)),
        (i.flags = t.flags & 65011712),
        (i.childLanes = t.childLanes),
        (i.lanes = t.lanes),
        (i.child = t.child),
        (i.memoizedProps = t.memoizedProps),
        (i.memoizedState = t.memoizedState),
        (i.updateQueue = t.updateQueue),
        (r = t.dependencies),
        (i.dependencies =
          r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }),
        (i.sibling = t.sibling),
        (i.index = t.index),
        (i.ref = t.ref),
        (i.refCleanup = t.refCleanup),
        i
      );
    }
    function XS(t, r) {
      t.flags &= 65011714;
      var i = t.alternate;
      return (
        i === null
          ? ((t.childLanes = 0),
            (t.lanes = r),
            (t.child = null),
            (t.subtreeFlags = 0),
            (t.memoizedProps = null),
            (t.memoizedState = null),
            (t.updateQueue = null),
            (t.dependencies = null),
            (t.stateNode = null))
          : ((t.childLanes = i.childLanes),
            (t.lanes = i.lanes),
            (t.child = i.child),
            (t.subtreeFlags = 0),
            (t.deletions = null),
            (t.memoizedProps = i.memoizedProps),
            (t.memoizedState = i.memoizedState),
            (t.updateQueue = i.updateQueue),
            (t.type = i.type),
            (r = i.dependencies),
            (t.dependencies =
              r === null
                ? null
                : { lanes: r.lanes, firstContext: r.firstContext })),
        t
      );
    }
    function Nu(t, r, i, l, f, p) {
      var y = 0;
      if (((l = t), typeof t == "function")) Kp(t) && (y = 1);
      else if (typeof t == "string")
        y = M6(t, i, le.current)
          ? 26
          : t === "html" || t === "head" || t === "body"
            ? 27
            : 5;
      else
        e: switch (t) {
          case W:
            return (
              (t = _n(31, i, r, f)),
              (t.elementType = W),
              (t.lanes = p),
              t
            );
          case _:
            return Ga(i.children, f, p, r);
          case v:
            ((y = 8), (f |= 24));
            break;
          case E:
            return (
              (t = _n(12, i, r, f | 2)),
              (t.elementType = E),
              (t.lanes = p),
              t
            );
          case A:
            return (
              (t = _n(13, i, r, f)),
              (t.elementType = A),
              (t.lanes = p),
              t
            );
          case L:
            return (
              (t = _n(19, i, r, f)),
              (t.elementType = L),
              (t.lanes = p),
              t
            );
          default:
            if (typeof t == "object" && t !== null)
              switch (t.$$typeof) {
                case w:
                case R:
                  y = 10;
                  break e;
                case D:
                  y = 9;
                  break e;
                case M:
                  y = 11;
                  break e;
                case G:
                  y = 14;
                  break e;
                case q:
                  ((y = 16), (l = null));
                  break e;
              }
            ((y = 29),
              (i = Error(o(130, t === null ? "null" : typeof t, ""))),
              (l = null));
        }
      return (
        (r = _n(y, i, r, f)),
        (r.elementType = t),
        (r.type = l),
        (r.lanes = p),
        r
      );
    }
    function Ga(t, r, i, l) {
      return ((t = _n(7, t, l, r)), (t.lanes = i), t);
    }
    function Yp(t, r, i) {
      return ((t = _n(6, t, null, r)), (t.lanes = i), t);
    }
    function Xp(t, r, i) {
      return (
        (r = _n(4, t.children !== null ? t.children : [], t.key, r)),
        (r.lanes = i),
        (r.stateNode = {
          containerInfo: t.containerInfo,
          pendingChildren: null,
          implementation: t.implementation,
        }),
        r
      );
    }
    var qo = [],
      Fo = 0,
      ku = null,
      zu = 0,
      jn = [],
      $n = 0,
      Va = null,
      Rr = 1,
      Ar = "";
    function Ka(t, r) {
      ((qo[Fo++] = zu), (qo[Fo++] = ku), (ku = t), (zu = r));
    }
    function WS(t, r, i) {
      ((jn[$n++] = Rr), (jn[$n++] = Ar), (jn[$n++] = Va), (Va = t));
      var l = Rr;
      t = Ar;
      var f = 32 - gt(l) - 1;
      ((l &= ~(1 << f)), (i += 1));
      var p = 32 - gt(r) + f;
      if (30 < p) {
        var y = f - (f % 5);
        ((p = (l & ((1 << y) - 1)).toString(32)),
          (l >>= y),
          (f -= y),
          (Rr = (1 << (32 - gt(r) + f)) | (i << f) | l),
          (Ar = p + t));
      } else ((Rr = (1 << p) | (i << f) | l), (Ar = t));
    }
    function Wp(t) {
      t.return !== null && (Ka(t, 1), WS(t, 1, 0));
    }
    function Qp(t) {
      for (; t === ku; )
        ((ku = qo[--Fo]), (qo[Fo] = null), (zu = qo[--Fo]), (qo[Fo] = null));
      for (; t === Va; )
        ((Va = jn[--$n]),
          (jn[$n] = null),
          (Ar = jn[--$n]),
          (jn[$n] = null),
          (Rr = jn[--$n]),
          (jn[$n] = null));
    }
    var rn = null,
      xt = null,
      He = !1,
      Ya = null,
      cr = !1,
      Zp = Error(o(519));
    function Xa(t) {
      var r = Error(o(418, ""));
      throw (ds(Ln(r, t)), Zp);
    }
    function QS(t) {
      var r = t.stateNode,
        i = t.type,
        l = t.memoizedProps;
      switch (((r[en] = t), (r[dn] = l), i)) {
        case "dialog":
          (Be("cancel", r), Be("close", r));
          break;
        case "iframe":
        case "object":
        case "embed":
          Be("load", r);
          break;
        case "video":
        case "audio":
          for (i = 0; i < Ls.length; i++) Be(Ls[i], r);
          break;
        case "source":
          Be("error", r);
          break;
        case "img":
        case "image":
        case "link":
          (Be("error", r), Be("load", r));
          break;
        case "details":
          Be("toggle", r);
          break;
        case "input":
          (Be("invalid", r),
            dS(
              r,
              l.value,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name,
              !0,
            ),
            Su(r));
          break;
        case "select":
          Be("invalid", r);
          break;
        case "textarea":
          (Be("invalid", r), hS(r, l.value, l.defaultValue, l.children), Su(r));
      }
      ((i = l.children),
        (typeof i != "string" &&
          typeof i != "number" &&
          typeof i != "bigint") ||
        r.textContent === "" + i ||
        l.suppressHydrationWarning === !0 ||
        h_(r.textContent, i)
          ? (l.popover != null && (Be("beforetoggle", r), Be("toggle", r)),
            l.onScroll != null && Be("scroll", r),
            l.onScrollEnd != null && Be("scrollend", r),
            l.onClick != null && (r.onclick = hc),
            (r = !0))
          : (r = !1),
        r || Xa(t));
    }
    function ZS(t) {
      for (rn = t.return; rn; )
        switch (rn.tag) {
          case 5:
          case 13:
            cr = !1;
            return;
          case 27:
          case 3:
            cr = !0;
            return;
          default:
            rn = rn.return;
        }
    }
    function cs(t) {
      if (t !== rn) return !1;
      if (!He) return (ZS(t), (He = !0), !1);
      var r = t.tag,
        i;
      if (
        ((i = r !== 3 && r !== 27) &&
          ((i = r === 5) &&
            ((i = t.type),
            (i =
              !(i !== "form" && i !== "button") ||
              hm(t.type, t.memoizedProps))),
          (i = !i)),
        i && xt && Xa(t),
        ZS(t),
        r === 13)
      ) {
        if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
          throw Error(o(317));
        e: {
          for (t = t.nextSibling, r = 0; t; ) {
            if (t.nodeType === 8)
              if (((i = t.data), i === "/$")) {
                if (r === 0) {
                  xt = Zn(t.nextSibling);
                  break e;
                }
                r--;
              } else (i !== "$" && i !== "$!" && i !== "$?") || r++;
            t = t.nextSibling;
          }
          xt = null;
        }
      } else
        r === 27
          ? ((r = xt),
            da(t.type) ? ((t = bm), (bm = null), (xt = t)) : (xt = r))
          : (xt = rn ? Zn(t.stateNode.nextSibling) : null);
      return !0;
    }
    function fs() {
      ((xt = rn = null), (He = !1));
    }
    function JS() {
      var t = Ya;
      return (
        t !== null &&
          (gn === null ? (gn = t) : gn.push.apply(gn, t), (Ya = null)),
        t
      );
    }
    function ds(t) {
      Ya === null ? (Ya = [t]) : Ya.push(t);
    }
    var Jp = K(null),
      Wa = null,
      Or = null;
    function Qr(t, r, i) {
      (te(Jp, r._currentValue), (r._currentValue = i));
    }
    function Mr(t) {
      ((t._currentValue = Jp.current), ae(Jp));
    }
    function eh(t, r, i) {
      for (; t !== null; ) {
        var l = t.alternate;
        if (
          ((t.childLanes & r) !== r
            ? ((t.childLanes |= r), l !== null && (l.childLanes |= r))
            : l !== null && (l.childLanes & r) !== r && (l.childLanes |= r),
          t === i)
        )
          break;
        t = t.return;
      }
    }
    function th(t, r, i, l) {
      var f = t.child;
      for (f !== null && (f.return = t); f !== null; ) {
        var p = f.dependencies;
        if (p !== null) {
          var y = f.child;
          p = p.firstContext;
          e: for (; p !== null; ) {
            var T = p;
            p = f;
            for (var k = 0; k < r.length; k++)
              if (T.context === r[k]) {
                ((p.lanes |= i),
                  (T = p.alternate),
                  T !== null && (T.lanes |= i),
                  eh(p.return, i, t),
                  l || (y = null));
                break e;
              }
            p = T.next;
          }
        } else if (f.tag === 18) {
          if (((y = f.return), y === null)) throw Error(o(341));
          ((y.lanes |= i),
            (p = y.alternate),
            p !== null && (p.lanes |= i),
            eh(y, i, t),
            (y = null));
        } else y = f.child;
        if (y !== null) y.return = f;
        else
          for (y = f; y !== null; ) {
            if (y === t) {
              y = null;
              break;
            }
            if (((f = y.sibling), f !== null)) {
              ((f.return = y.return), (y = f));
              break;
            }
            y = y.return;
          }
        f = y;
      }
    }
    function ps(t, r, i, l) {
      t = null;
      for (var f = r, p = !1; f !== null; ) {
        if (!p) {
          if ((f.flags & 524288) !== 0) p = !0;
          else if ((f.flags & 262144) !== 0) break;
        }
        if (f.tag === 10) {
          var y = f.alternate;
          if (y === null) throw Error(o(387));
          if (((y = y.memoizedProps), y !== null)) {
            var T = f.type;
            En(f.pendingProps.value, y.value) ||
              (t !== null ? t.push(T) : (t = [T]));
          }
        } else if (f === Ae.current) {
          if (((y = f.alternate), y === null)) throw Error(o(387));
          y.memoizedState.memoizedState !== f.memoizedState.memoizedState &&
            (t !== null ? t.push(Ps) : (t = [Ps]));
        }
        f = f.return;
      }
      (t !== null && th(r, t, i, l), (r.flags |= 262144));
    }
    function Bu(t) {
      for (t = t.firstContext; t !== null; ) {
        if (!En(t.context._currentValue, t.memoizedValue)) return !0;
        t = t.next;
      }
      return !1;
    }
    function Qa(t) {
      ((Wa = t),
        (Or = null),
        (t = t.dependencies),
        t !== null && (t.firstContext = null));
    }
    function tn(t) {
      return eE(Wa, t);
    }
    function Lu(t, r) {
      return (Wa === null && Qa(t), eE(t, r));
    }
    function eE(t, r) {
      var i = r._currentValue;
      if (((r = { context: r, memoizedValue: i, next: null }), Or === null)) {
        if (t === null) throw Error(o(308));
        ((Or = r),
          (t.dependencies = { lanes: 0, firstContext: r }),
          (t.flags |= 524288));
      } else Or = Or.next = r;
      return i;
    }
    var Ok =
        typeof AbortController < "u"
          ? AbortController
          : function () {
              var t = [],
                r = (this.signal = {
                  aborted: !1,
                  addEventListener: function (i, l) {
                    t.push(l);
                  },
                });
              this.abort = function () {
                ((r.aborted = !0),
                  t.forEach(function (i) {
                    return i();
                  }));
              };
            },
      Mk = e.unstable_scheduleCallback,
      Dk = e.unstable_NormalPriority,
      Bt = {
        $$typeof: R,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0,
      };
    function nh() {
      return { controller: new Ok(), data: new Map(), refCount: 0 };
    }
    function hs(t) {
      (t.refCount--,
        t.refCount === 0 &&
          Mk(Dk, function () {
            t.controller.abort();
          }));
    }
    var ms = null,
      rh = 0,
      Go = 0,
      Vo = null;
    function Nk(t, r) {
      if (ms === null) {
        var i = (ms = []);
        ((rh = 0),
          (Go = om()),
          (Vo = {
            status: "pending",
            value: void 0,
            then: function (l) {
              i.push(l);
            },
          }));
      }
      return (rh++, r.then(tE, tE), r);
    }
    function tE() {
      if (--rh === 0 && ms !== null) {
        Vo !== null && (Vo.status = "fulfilled");
        var t = ms;
        ((ms = null), (Go = 0), (Vo = null));
        for (var r = 0; r < t.length; r++) (0, t[r])();
      }
    }
    function kk(t, r) {
      var i = [],
        l = {
          status: "pending",
          value: null,
          reason: null,
          then: function (f) {
            i.push(f);
          },
        };
      return (
        t.then(
          function () {
            ((l.status = "fulfilled"), (l.value = r));
            for (var f = 0; f < i.length; f++) (0, i[f])(r);
          },
          function (f) {
            for (l.status = "rejected", l.reason = f, f = 0; f < i.length; f++)
              (0, i[f])(void 0);
          },
        ),
        l
      );
    }
    var nE = z.S;
    z.S = function (t, r) {
      (typeof r == "object" &&
        r !== null &&
        typeof r.then == "function" &&
        Nk(t, r),
        nE !== null && nE(t, r));
    };
    var Za = K(null);
    function ah() {
      var t = Za.current;
      return t !== null ? t : lt.pooledCache;
    }
    function Uu(t, r) {
      r === null ? te(Za, Za.current) : te(Za, r.pool);
    }
    function rE() {
      var t = ah();
      return t === null ? null : { parent: Bt._currentValue, pool: t };
    }
    var gs = Error(o(460)),
      aE = Error(o(474)),
      ju = Error(o(542)),
      oh = { then: function () {} };
    function oE(t) {
      return ((t = t.status), t === "fulfilled" || t === "rejected");
    }
    function $u() {}
    function iE(t, r, i) {
      switch (
        ((i = t[i]),
        i === void 0 ? t.push(r) : i !== r && (r.then($u, $u), (r = i)),
        r.status)
      ) {
        case "fulfilled":
          return r.value;
        case "rejected":
          throw ((t = r.reason), lE(t), t);
        default:
          if (typeof r.status == "string") r.then($u, $u);
          else {
            if (((t = lt), t !== null && 100 < t.shellSuspendCounter))
              throw Error(o(482));
            ((t = r),
              (t.status = "pending"),
              t.then(
                function (l) {
                  if (r.status === "pending") {
                    var f = r;
                    ((f.status = "fulfilled"), (f.value = l));
                  }
                },
                function (l) {
                  if (r.status === "pending") {
                    var f = r;
                    ((f.status = "rejected"), (f.reason = l));
                  }
                },
              ));
          }
          switch (r.status) {
            case "fulfilled":
              return r.value;
            case "rejected":
              throw ((t = r.reason), lE(t), t);
          }
          throw ((ys = r), gs);
      }
    }
    var ys = null;
    function sE() {
      if (ys === null) throw Error(o(459));
      var t = ys;
      return ((ys = null), t);
    }
    function lE(t) {
      if (t === gs || t === ju) throw Error(o(483));
    }
    var Zr = !1;
    function ih(t) {
      t.updateQueue = {
        baseState: t.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null,
      };
    }
    function sh(t, r) {
      ((t = t.updateQueue),
        r.updateQueue === t &&
          (r.updateQueue = {
            baseState: t.baseState,
            firstBaseUpdate: t.firstBaseUpdate,
            lastBaseUpdate: t.lastBaseUpdate,
            shared: t.shared,
            callbacks: null,
          }));
    }
    function Jr(t) {
      return { lane: t, tag: 0, payload: null, callback: null, next: null };
    }
    function ea(t, r, i) {
      var l = t.updateQueue;
      if (l === null) return null;
      if (((l = l.shared), (Qe & 2) !== 0)) {
        var f = l.pending;
        return (
          f === null ? (r.next = r) : ((r.next = f.next), (f.next = r)),
          (l.pending = r),
          (r = Du(t)),
          YS(t, null, i),
          r
        );
      }
      return (Mu(t, l, r, i), Du(t));
    }
    function bs(t, r, i) {
      if (
        ((r = r.updateQueue),
        r !== null && ((r = r.shared), (i & 4194048) !== 0))
      ) {
        var l = r.lanes;
        ((l &= t.pendingLanes), (i |= l), (r.lanes = i), tS(t, i));
      }
    }
    function lh(t, r) {
      var i = t.updateQueue,
        l = t.alternate;
      if (l !== null && ((l = l.updateQueue), i === l)) {
        var f = null,
          p = null;
        if (((i = i.firstBaseUpdate), i !== null)) {
          do {
            var y = {
              lane: i.lane,
              tag: i.tag,
              payload: i.payload,
              callback: null,
              next: null,
            };
            (p === null ? (f = p = y) : (p = p.next = y), (i = i.next));
          } while (i !== null);
          p === null ? (f = p = r) : (p = p.next = r);
        } else f = p = r;
        ((i = {
          baseState: l.baseState,
          firstBaseUpdate: f,
          lastBaseUpdate: p,
          shared: l.shared,
          callbacks: l.callbacks,
        }),
          (t.updateQueue = i));
        return;
      }
      ((t = i.lastBaseUpdate),
        t === null ? (i.firstBaseUpdate = r) : (t.next = r),
        (i.lastBaseUpdate = r));
    }
    var uh = !1;
    function vs() {
      if (uh) {
        var t = Vo;
        if (t !== null) throw t;
      }
    }
    function Ss(t, r, i, l) {
      uh = !1;
      var f = t.updateQueue;
      Zr = !1;
      var p = f.firstBaseUpdate,
        y = f.lastBaseUpdate,
        T = f.shared.pending;
      if (T !== null) {
        f.shared.pending = null;
        var k = T,
          $ = k.next;
        ((k.next = null), y === null ? (p = $) : (y.next = $), (y = k));
        var Z = t.alternate;
        Z !== null &&
          ((Z = Z.updateQueue),
          (T = Z.lastBaseUpdate),
          T !== y &&
            (T === null ? (Z.firstBaseUpdate = $) : (T.next = $),
            (Z.lastBaseUpdate = k)));
      }
      if (p !== null) {
        var ne = f.baseState;
        ((y = 0), (Z = $ = k = null), (T = p));
        do {
          var H = T.lane & -536870913,
            F = H !== T.lane;
          if (F ? (Le & H) === H : (l & H) === H) {
            (H !== 0 && H === Go && (uh = !0),
              Z !== null &&
                (Z = Z.next =
                  {
                    lane: 0,
                    tag: T.tag,
                    payload: T.payload,
                    callback: null,
                    next: null,
                  }));
            e: {
              var Se = t,
                ye = T;
              H = r;
              var rt = i;
              switch (ye.tag) {
                case 1:
                  if (((Se = ye.payload), typeof Se == "function")) {
                    ne = Se.call(rt, ne, H);
                    break e;
                  }
                  ne = Se;
                  break e;
                case 3:
                  Se.flags = (Se.flags & -65537) | 128;
                case 0:
                  if (
                    ((Se = ye.payload),
                    (H = typeof Se == "function" ? Se.call(rt, ne, H) : Se),
                    H == null)
                  )
                    break e;
                  ne = g({}, ne, H);
                  break e;
                case 2:
                  Zr = !0;
              }
            }
            ((H = T.callback),
              H !== null &&
                ((t.flags |= 64),
                F && (t.flags |= 8192),
                (F = f.callbacks),
                F === null ? (f.callbacks = [H]) : F.push(H)));
          } else
            ((F = {
              lane: H,
              tag: T.tag,
              payload: T.payload,
              callback: T.callback,
              next: null,
            }),
              Z === null ? (($ = Z = F), (k = ne)) : (Z = Z.next = F),
              (y |= H));
          if (((T = T.next), T === null)) {
            if (((T = f.shared.pending), T === null)) break;
            ((F = T),
              (T = F.next),
              (F.next = null),
              (f.lastBaseUpdate = F),
              (f.shared.pending = null));
          }
        } while (!0);
        (Z === null && (k = ne),
          (f.baseState = k),
          (f.firstBaseUpdate = $),
          (f.lastBaseUpdate = Z),
          p === null && (f.shared.lanes = 0),
          (la |= y),
          (t.lanes = y),
          (t.memoizedState = ne));
      }
    }
    function uE(t, r) {
      if (typeof t != "function") throw Error(o(191, t));
      t.call(r);
    }
    function cE(t, r) {
      var i = t.callbacks;
      if (i !== null)
        for (t.callbacks = null, t = 0; t < i.length; t++) uE(i[t], r);
    }
    var Ko = K(null),
      Iu = K(0);
    function fE(t, r) {
      ((t = Ur), te(Iu, t), te(Ko, r), (Ur = t | r.baseLanes));
    }
    function ch() {
      (te(Iu, Ur), te(Ko, Ko.current));
    }
    function fh() {
      ((Ur = Iu.current), ae(Ko), ae(Iu));
    }
    var ta = 0,
      De = null,
      tt = null,
      Nt = null,
      Hu = !1,
      Yo = !1,
      Ja = !1,
      Pu = 0,
      Es = 0,
      Xo = null,
      zk = 0;
    function Ot() {
      throw Error(o(321));
    }
    function dh(t, r) {
      if (r === null) return !1;
      for (var i = 0; i < r.length && i < t.length; i++)
        if (!En(t[i], r[i])) return !1;
      return !0;
    }
    function ph(t, r, i, l, f, p) {
      return (
        (ta = p),
        (De = r),
        (r.memoizedState = null),
        (r.updateQueue = null),
        (r.lanes = 0),
        (z.H = t === null || t.memoizedState === null ? YE : XE),
        (Ja = !1),
        (p = i(l, f)),
        (Ja = !1),
        Yo && (p = pE(r, i, l, f)),
        dE(t),
        p
      );
    }
    function dE(t) {
      z.H = Yu;
      var r = tt !== null && tt.next !== null;
      if (
        ((ta = 0), (Nt = tt = De = null), (Hu = !1), (Es = 0), (Xo = null), r)
      )
        throw Error(o(300));
      t === null ||
        It ||
        ((t = t.dependencies), t !== null && Bu(t) && (It = !0));
    }
    function pE(t, r, i, l) {
      De = t;
      var f = 0;
      do {
        if ((Yo && (Xo = null), (Es = 0), (Yo = !1), 25 <= f))
          throw Error(o(301));
        if (((f += 1), (Nt = tt = null), t.updateQueue != null)) {
          var p = t.updateQueue;
          ((p.lastEffect = null),
            (p.events = null),
            (p.stores = null),
            p.memoCache != null && (p.memoCache.index = 0));
        }
        ((z.H = Hk), (p = r(i, l)));
      } while (Yo);
      return p;
    }
    function Bk() {
      var t = z.H,
        r = t.useState()[0];
      return (
        (r = typeof r.then == "function" ? _s(r) : r),
        (t = t.useState()[0]),
        (tt !== null ? tt.memoizedState : null) !== t && (De.flags |= 1024),
        r
      );
    }
    function hh() {
      var t = Pu !== 0;
      return ((Pu = 0), t);
    }
    function mh(t, r, i) {
      ((r.updateQueue = t.updateQueue), (r.flags &= -2053), (t.lanes &= ~i));
    }
    function gh(t) {
      if (Hu) {
        for (t = t.memoizedState; t !== null; ) {
          var r = t.queue;
          (r !== null && (r.pending = null), (t = t.next));
        }
        Hu = !1;
      }
      ((ta = 0), (Nt = tt = De = null), (Yo = !1), (Es = Pu = 0), (Xo = null));
    }
    function hn() {
      var t = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
      };
      return (
        Nt === null ? (De.memoizedState = Nt = t) : (Nt = Nt.next = t),
        Nt
      );
    }
    function kt() {
      if (tt === null) {
        var t = De.alternate;
        t = t !== null ? t.memoizedState : null;
      } else t = tt.next;
      var r = Nt === null ? De.memoizedState : Nt.next;
      if (r !== null) ((Nt = r), (tt = t));
      else {
        if (t === null)
          throw De.alternate === null ? Error(o(467)) : Error(o(310));
        ((tt = t),
          (t = {
            memoizedState: tt.memoizedState,
            baseState: tt.baseState,
            baseQueue: tt.baseQueue,
            queue: tt.queue,
            next: null,
          }),
          Nt === null ? (De.memoizedState = Nt = t) : (Nt = Nt.next = t));
      }
      return Nt;
    }
    function yh() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function _s(t) {
      var r = Es;
      return (
        (Es += 1),
        Xo === null && (Xo = []),
        (t = iE(Xo, t, r)),
        (r = De),
        (Nt === null ? r.memoizedState : Nt.next) === null &&
          ((r = r.alternate),
          (z.H = r === null || r.memoizedState === null ? YE : XE)),
        t
      );
    }
    function qu(t) {
      if (t !== null && typeof t == "object") {
        if (typeof t.then == "function") return _s(t);
        if (t.$$typeof === R) return tn(t);
      }
      throw Error(o(438, String(t)));
    }
    function bh(t) {
      var r = null,
        i = De.updateQueue;
      if ((i !== null && (r = i.memoCache), r == null)) {
        var l = De.alternate;
        l !== null &&
          ((l = l.updateQueue),
          l !== null &&
            ((l = l.memoCache),
            l != null &&
              (r = {
                data: l.data.map(function (f) {
                  return f.slice();
                }),
                index: 0,
              })));
      }
      if (
        (r == null && (r = { data: [], index: 0 }),
        i === null && ((i = yh()), (De.updateQueue = i)),
        (i.memoCache = r),
        (i = r.data[r.index]),
        i === void 0)
      )
        for (i = r.data[r.index] = Array(t), l = 0; l < t; l++) i[l] = S;
      return (r.index++, i);
    }
    function Dr(t, r) {
      return typeof r == "function" ? r(t) : r;
    }
    function Fu(t) {
      var r = kt();
      return vh(r, tt, t);
    }
    function vh(t, r, i) {
      var l = t.queue;
      if (l === null) throw Error(o(311));
      l.lastRenderedReducer = i;
      var f = t.baseQueue,
        p = l.pending;
      if (p !== null) {
        if (f !== null) {
          var y = f.next;
          ((f.next = p.next), (p.next = y));
        }
        ((r.baseQueue = f = p), (l.pending = null));
      }
      if (((p = t.baseState), f === null)) t.memoizedState = p;
      else {
        r = f.next;
        var T = (y = null),
          k = null,
          $ = r,
          Z = !1;
        do {
          var ne = $.lane & -536870913;
          if (ne !== $.lane ? (Le & ne) === ne : (ta & ne) === ne) {
            var H = $.revertLane;
            if (H === 0)
              (k !== null &&
                (k = k.next =
                  {
                    lane: 0,
                    revertLane: 0,
                    action: $.action,
                    hasEagerState: $.hasEagerState,
                    eagerState: $.eagerState,
                    next: null,
                  }),
                ne === Go && (Z = !0));
            else if ((ta & H) === H) {
              (($ = $.next), H === Go && (Z = !0));
              continue;
            } else
              ((ne = {
                lane: 0,
                revertLane: $.revertLane,
                action: $.action,
                hasEagerState: $.hasEagerState,
                eagerState: $.eagerState,
                next: null,
              }),
                k === null ? ((T = k = ne), (y = p)) : (k = k.next = ne),
                (De.lanes |= H),
                (la |= H));
            ((ne = $.action),
              Ja && i(p, ne),
              (p = $.hasEagerState ? $.eagerState : i(p, ne)));
          } else
            ((H = {
              lane: ne,
              revertLane: $.revertLane,
              action: $.action,
              hasEagerState: $.hasEagerState,
              eagerState: $.eagerState,
              next: null,
            }),
              k === null ? ((T = k = H), (y = p)) : (k = k.next = H),
              (De.lanes |= ne),
              (la |= ne));
          $ = $.next;
        } while ($ !== null && $ !== r);
        if (
          (k === null ? (y = p) : (k.next = T),
          !En(p, t.memoizedState) && ((It = !0), Z && ((i = Vo), i !== null)))
        )
          throw i;
        ((t.memoizedState = p),
          (t.baseState = y),
          (t.baseQueue = k),
          (l.lastRenderedState = p));
      }
      return (f === null && (l.lanes = 0), [t.memoizedState, l.dispatch]);
    }
    function Sh(t) {
      var r = kt(),
        i = r.queue;
      if (i === null) throw Error(o(311));
      i.lastRenderedReducer = t;
      var l = i.dispatch,
        f = i.pending,
        p = r.memoizedState;
      if (f !== null) {
        i.pending = null;
        var y = (f = f.next);
        do ((p = t(p, y.action)), (y = y.next));
        while (y !== f);
        (En(p, r.memoizedState) || (It = !0),
          (r.memoizedState = p),
          r.baseQueue === null && (r.baseState = p),
          (i.lastRenderedState = p));
      }
      return [p, l];
    }
    function hE(t, r, i) {
      var l = De,
        f = kt(),
        p = He;
      if (p) {
        if (i === void 0) throw Error(o(407));
        i = i();
      } else i = r();
      var y = !En((tt || f).memoizedState, i);
      (y && ((f.memoizedState = i), (It = !0)), (f = f.queue));
      var T = yE.bind(null, l, f, t);
      if (
        (Ts(2048, 8, T, [t]),
        f.getSnapshot !== r || y || (Nt !== null && Nt.memoizedState.tag & 1))
      ) {
        if (
          ((l.flags |= 2048),
          Wo(9, Gu(), gE.bind(null, l, f, i, r), null),
          lt === null)
        )
          throw Error(o(349));
        p || (ta & 124) !== 0 || mE(l, r, i);
      }
      return i;
    }
    function mE(t, r, i) {
      ((t.flags |= 16384),
        (t = { getSnapshot: r, value: i }),
        (r = De.updateQueue),
        r === null
          ? ((r = yh()), (De.updateQueue = r), (r.stores = [t]))
          : ((i = r.stores), i === null ? (r.stores = [t]) : i.push(t)));
    }
    function gE(t, r, i, l) {
      ((r.value = i), (r.getSnapshot = l), bE(r) && vE(t));
    }
    function yE(t, r, i) {
      return i(function () {
        bE(r) && vE(t);
      });
    }
    function bE(t) {
      var r = t.getSnapshot;
      t = t.value;
      try {
        var i = r();
        return !En(t, i);
      } catch {
        return !0;
      }
    }
    function vE(t) {
      var r = Ho(t, 2);
      r !== null && Rn(r, t, 2);
    }
    function Eh(t) {
      var r = hn();
      if (typeof t == "function") {
        var i = t;
        if (((t = i()), Ja)) {
          jt(!0);
          try {
            i();
          } finally {
            jt(!1);
          }
        }
      }
      return (
        (r.memoizedState = r.baseState = t),
        (r.queue = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Dr,
          lastRenderedState: t,
        }),
        r
      );
    }
    function SE(t, r, i, l) {
      return ((t.baseState = i), vh(t, tt, typeof l == "function" ? l : Dr));
    }
    function Lk(t, r, i, l, f) {
      if (Ku(t)) throw Error(o(485));
      if (((t = r.action), t !== null)) {
        var p = {
          payload: f,
          action: t,
          next: null,
          isTransition: !0,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function (y) {
            p.listeners.push(y);
          },
        };
        (z.T !== null ? i(!0) : (p.isTransition = !1),
          l(p),
          (i = r.pending),
          i === null
            ? ((p.next = r.pending = p), EE(r, p))
            : ((p.next = i.next), (r.pending = i.next = p)));
      }
    }
    function EE(t, r) {
      var i = r.action,
        l = r.payload,
        f = t.state;
      if (r.isTransition) {
        var p = z.T,
          y = {};
        z.T = y;
        try {
          var T = i(f, l),
            k = z.S;
          (k !== null && k(y, T), _E(t, r, T));
        } catch ($) {
          _h(t, r, $);
        } finally {
          z.T = p;
        }
      } else
        try {
          ((p = i(f, l)), _E(t, r, p));
        } catch ($) {
          _h(t, r, $);
        }
    }
    function _E(t, r, i) {
      i !== null && typeof i == "object" && typeof i.then == "function"
        ? i.then(
            function (l) {
              TE(t, r, l);
            },
            function (l) {
              return _h(t, r, l);
            },
          )
        : TE(t, r, i);
    }
    function TE(t, r, i) {
      ((r.status = "fulfilled"),
        (r.value = i),
        xE(r),
        (t.state = i),
        (r = t.pending),
        r !== null &&
          ((i = r.next),
          i === r
            ? (t.pending = null)
            : ((i = i.next), (r.next = i), EE(t, i))));
    }
    function _h(t, r, i) {
      var l = t.pending;
      if (((t.pending = null), l !== null)) {
        l = l.next;
        do ((r.status = "rejected"), (r.reason = i), xE(r), (r = r.next));
        while (r !== l);
      }
      t.action = null;
    }
    function xE(t) {
      t = t.listeners;
      for (var r = 0; r < t.length; r++) (0, t[r])();
    }
    function CE(t, r) {
      return r;
    }
    function wE(t, r) {
      if (He) {
        var i = lt.formState;
        if (i !== null) {
          e: {
            var l = De;
            if (He) {
              if (xt) {
                t: {
                  for (var f = xt, p = cr; f.nodeType !== 8; ) {
                    if (!p) {
                      f = null;
                      break t;
                    }
                    if (((f = Zn(f.nextSibling)), f === null)) {
                      f = null;
                      break t;
                    }
                  }
                  ((p = f.data), (f = p === "F!" || p === "F" ? f : null));
                }
                if (f) {
                  ((xt = Zn(f.nextSibling)), (l = f.data === "F!"));
                  break e;
                }
              }
              Xa(l);
            }
            l = !1;
          }
          l && (r = i[0]);
        }
      }
      return (
        (i = hn()),
        (i.memoizedState = i.baseState = r),
        (l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: CE,
          lastRenderedState: r,
        }),
        (i.queue = l),
        (i = GE.bind(null, De, l)),
        (l.dispatch = i),
        (l = Eh(!1)),
        (p = Rh.bind(null, De, !1, l.queue)),
        (l = hn()),
        (f = { state: r, dispatch: null, action: t, pending: null }),
        (l.queue = f),
        (i = Lk.bind(null, De, f, p, i)),
        (f.dispatch = i),
        (l.memoizedState = t),
        [r, i, !1]
      );
    }
    function RE(t) {
      var r = kt();
      return AE(r, tt, t);
    }
    function AE(t, r, i) {
      if (
        ((r = vh(t, r, CE)[0]),
        (t = Fu(Dr)[0]),
        typeof r == "object" && r !== null && typeof r.then == "function")
      )
        try {
          var l = _s(r);
        } catch (y) {
          throw y === gs ? ju : y;
        }
      else l = r;
      r = kt();
      var f = r.queue,
        p = f.dispatch;
      return (
        i !== r.memoizedState &&
          ((De.flags |= 2048), Wo(9, Gu(), Uk.bind(null, f, i), null)),
        [l, p, t]
      );
    }
    function Uk(t, r) {
      t.action = r;
    }
    function OE(t) {
      var r = kt(),
        i = tt;
      if (i !== null) return AE(r, i, t);
      (kt(), (r = r.memoizedState), (i = kt()));
      var l = i.queue.dispatch;
      return ((i.memoizedState = t), [r, l, !1]);
    }
    function Wo(t, r, i, l) {
      return (
        (t = { tag: t, create: i, deps: l, inst: r, next: null }),
        (r = De.updateQueue),
        r === null && ((r = yh()), (De.updateQueue = r)),
        (i = r.lastEffect),
        i === null
          ? (r.lastEffect = t.next = t)
          : ((l = i.next), (i.next = t), (t.next = l), (r.lastEffect = t)),
        t
      );
    }
    function Gu() {
      return { destroy: void 0, resource: void 0 };
    }
    function ME() {
      return kt().memoizedState;
    }
    function Vu(t, r, i, l) {
      var f = hn();
      ((l = l === void 0 ? null : l),
        (De.flags |= t),
        (f.memoizedState = Wo(1 | r, Gu(), i, l)));
    }
    function Ts(t, r, i, l) {
      var f = kt();
      l = l === void 0 ? null : l;
      var p = f.memoizedState.inst;
      tt !== null && l !== null && dh(l, tt.memoizedState.deps)
        ? (f.memoizedState = Wo(r, p, i, l))
        : ((De.flags |= t), (f.memoizedState = Wo(1 | r, p, i, l)));
    }
    function DE(t, r) {
      Vu(8390656, 8, t, r);
    }
    function NE(t, r) {
      Ts(2048, 8, t, r);
    }
    function kE(t, r) {
      return Ts(4, 2, t, r);
    }
    function zE(t, r) {
      return Ts(4, 4, t, r);
    }
    function BE(t, r) {
      if (typeof r == "function") {
        t = t();
        var i = r(t);
        return function () {
          typeof i == "function" ? i() : r(null);
        };
      }
      if (r != null)
        return (
          (t = t()),
          (r.current = t),
          function () {
            r.current = null;
          }
        );
    }
    function LE(t, r, i) {
      ((i = i != null ? i.concat([t]) : null),
        Ts(4, 4, BE.bind(null, r, t), i));
    }
    function Th() {}
    function UE(t, r) {
      var i = kt();
      r = r === void 0 ? null : r;
      var l = i.memoizedState;
      return r !== null && dh(r, l[1]) ? l[0] : ((i.memoizedState = [t, r]), t);
    }
    function jE(t, r) {
      var i = kt();
      r = r === void 0 ? null : r;
      var l = i.memoizedState;
      if (r !== null && dh(r, l[1])) return l[0];
      if (((l = t()), Ja)) {
        jt(!0);
        try {
          t();
        } finally {
          jt(!1);
        }
      }
      return ((i.memoizedState = [l, r]), l);
    }
    function xh(t, r, i) {
      return i === void 0 || (ta & 1073741824) !== 0
        ? (t.memoizedState = r)
        : ((t.memoizedState = i), (t = H1()), (De.lanes |= t), (la |= t), i);
    }
    function $E(t, r, i, l) {
      return En(i, r)
        ? i
        : Ko.current !== null
          ? ((t = xh(t, i, l)), En(t, r) || (It = !0), t)
          : (ta & 42) === 0
            ? ((It = !0), (t.memoizedState = i))
            : ((t = H1()), (De.lanes |= t), (la |= t), r);
    }
    function IE(t, r, i, l, f) {
      var p = Y.p;
      Y.p = p !== 0 && 8 > p ? p : 8;
      var y = z.T,
        T = {};
      ((z.T = T), Rh(t, !1, r, i));
      try {
        var k = f(),
          $ = z.S;
        if (
          ($ !== null && $(T, k),
          k !== null && typeof k == "object" && typeof k.then == "function")
        ) {
          var Z = kk(k, l);
          xs(t, r, Z, wn(t));
        } else xs(t, r, l, wn(t));
      } catch (ne) {
        xs(
          t,
          r,
          { then: function () {}, status: "rejected", reason: ne },
          wn(),
        );
      } finally {
        ((Y.p = p), (z.T = y));
      }
    }
    function jk() {}
    function Ch(t, r, i, l) {
      if (t.tag !== 5) throw Error(o(476));
      var f = HE(t).queue;
      IE(
        t,
        f,
        r,
        ie,
        i === null
          ? jk
          : function () {
              return (PE(t), i(l));
            },
      );
    }
    function HE(t) {
      var r = t.memoizedState;
      if (r !== null) return r;
      r = {
        memoizedState: ie,
        baseState: ie,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Dr,
          lastRenderedState: ie,
        },
        next: null,
      };
      var i = {};
      return (
        (r.next = {
          memoizedState: i,
          baseState: i,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Dr,
            lastRenderedState: i,
          },
          next: null,
        }),
        (t.memoizedState = r),
        (t = t.alternate),
        t !== null && (t.memoizedState = r),
        r
      );
    }
    function PE(t) {
      var r = HE(t).next.queue;
      xs(t, r, {}, wn());
    }
    function wh() {
      return tn(Ps);
    }
    function qE() {
      return kt().memoizedState;
    }
    function FE() {
      return kt().memoizedState;
    }
    function $k(t) {
      for (var r = t.return; r !== null; ) {
        switch (r.tag) {
          case 24:
          case 3:
            var i = wn();
            t = Jr(i);
            var l = ea(r, t, i);
            (l !== null && (Rn(l, r, i), bs(l, r, i)),
              (r = { cache: nh() }),
              (t.payload = r));
            return;
        }
        r = r.return;
      }
    }
    function Ik(t, r, i) {
      var l = wn();
      ((i = {
        lane: l,
        revertLane: 0,
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
        Ku(t)
          ? VE(r, i)
          : ((i = Vp(t, r, i, l)), i !== null && (Rn(i, t, l), KE(i, r, l))));
    }
    function GE(t, r, i) {
      var l = wn();
      xs(t, r, i, l);
    }
    function xs(t, r, i, l) {
      var f = {
        lane: l,
        revertLane: 0,
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
      if (Ku(t)) VE(r, f);
      else {
        var p = t.alternate;
        if (
          t.lanes === 0 &&
          (p === null || p.lanes === 0) &&
          ((p = r.lastRenderedReducer), p !== null)
        )
          try {
            var y = r.lastRenderedState,
              T = p(y, i);
            if (((f.hasEagerState = !0), (f.eagerState = T), En(T, y)))
              return (Mu(t, r, f, 0), lt === null && Ou(), !1);
          } catch {
          } finally {
          }
        if (((i = Vp(t, r, f, l)), i !== null))
          return (Rn(i, t, l), KE(i, r, l), !0);
      }
      return !1;
    }
    function Rh(t, r, i, l) {
      if (
        ((l = {
          lane: 2,
          revertLane: om(),
          action: l,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        Ku(t))
      ) {
        if (r) throw Error(o(479));
      } else ((r = Vp(t, i, l, 2)), r !== null && Rn(r, t, 2));
    }
    function Ku(t) {
      var r = t.alternate;
      return t === De || (r !== null && r === De);
    }
    function VE(t, r) {
      Yo = Hu = !0;
      var i = t.pending;
      (i === null ? (r.next = r) : ((r.next = i.next), (i.next = r)),
        (t.pending = r));
    }
    function KE(t, r, i) {
      if ((i & 4194048) !== 0) {
        var l = r.lanes;
        ((l &= t.pendingLanes), (i |= l), (r.lanes = i), tS(t, i));
      }
    }
    var Yu = {
        readContext: tn,
        use: qu,
        useCallback: Ot,
        useContext: Ot,
        useEffect: Ot,
        useImperativeHandle: Ot,
        useLayoutEffect: Ot,
        useInsertionEffect: Ot,
        useMemo: Ot,
        useReducer: Ot,
        useRef: Ot,
        useState: Ot,
        useDebugValue: Ot,
        useDeferredValue: Ot,
        useTransition: Ot,
        useSyncExternalStore: Ot,
        useId: Ot,
        useHostTransitionStatus: Ot,
        useFormState: Ot,
        useActionState: Ot,
        useOptimistic: Ot,
        useMemoCache: Ot,
        useCacheRefresh: Ot,
      },
      YE = {
        readContext: tn,
        use: qu,
        useCallback: function (t, r) {
          return ((hn().memoizedState = [t, r === void 0 ? null : r]), t);
        },
        useContext: tn,
        useEffect: DE,
        useImperativeHandle: function (t, r, i) {
          ((i = i != null ? i.concat([t]) : null),
            Vu(4194308, 4, BE.bind(null, r, t), i));
        },
        useLayoutEffect: function (t, r) {
          return Vu(4194308, 4, t, r);
        },
        useInsertionEffect: function (t, r) {
          Vu(4, 2, t, r);
        },
        useMemo: function (t, r) {
          var i = hn();
          r = r === void 0 ? null : r;
          var l = t();
          if (Ja) {
            jt(!0);
            try {
              t();
            } finally {
              jt(!1);
            }
          }
          return ((i.memoizedState = [l, r]), l);
        },
        useReducer: function (t, r, i) {
          var l = hn();
          if (i !== void 0) {
            var f = i(r);
            if (Ja) {
              jt(!0);
              try {
                i(r);
              } finally {
                jt(!1);
              }
            }
          } else f = r;
          return (
            (l.memoizedState = l.baseState = f),
            (t = {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: t,
              lastRenderedState: f,
            }),
            (l.queue = t),
            (t = t.dispatch = Ik.bind(null, De, t)),
            [l.memoizedState, t]
          );
        },
        useRef: function (t) {
          var r = hn();
          return ((t = { current: t }), (r.memoizedState = t));
        },
        useState: function (t) {
          t = Eh(t);
          var r = t.queue,
            i = GE.bind(null, De, r);
          return ((r.dispatch = i), [t.memoizedState, i]);
        },
        useDebugValue: Th,
        useDeferredValue: function (t, r) {
          var i = hn();
          return xh(i, t, r);
        },
        useTransition: function () {
          var t = Eh(!1);
          return (
            (t = IE.bind(null, De, t.queue, !0, !1)),
            (hn().memoizedState = t),
            [!1, t]
          );
        },
        useSyncExternalStore: function (t, r, i) {
          var l = De,
            f = hn();
          if (He) {
            if (i === void 0) throw Error(o(407));
            i = i();
          } else {
            if (((i = r()), lt === null)) throw Error(o(349));
            (Le & 124) !== 0 || mE(l, r, i);
          }
          f.memoizedState = i;
          var p = { value: i, getSnapshot: r };
          return (
            (f.queue = p),
            DE(yE.bind(null, l, p, t), [t]),
            (l.flags |= 2048),
            Wo(9, Gu(), gE.bind(null, l, p, i, r), null),
            i
          );
        },
        useId: function () {
          var t = hn(),
            r = lt.identifierPrefix;
          if (He) {
            var i = Ar,
              l = Rr;
            ((i = (l & ~(1 << (32 - gt(l) - 1))).toString(32) + i),
              (r = "«" + r + "R" + i),
              (i = Pu++),
              0 < i && (r += "H" + i.toString(32)),
              (r += "»"));
          } else ((i = zk++), (r = "«" + r + "r" + i.toString(32) + "»"));
          return (t.memoizedState = r);
        },
        useHostTransitionStatus: wh,
        useFormState: wE,
        useActionState: wE,
        useOptimistic: function (t) {
          var r = hn();
          r.memoizedState = r.baseState = t;
          var i = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: null,
            lastRenderedState: null,
          };
          return (
            (r.queue = i),
            (r = Rh.bind(null, De, !0, i)),
            (i.dispatch = r),
            [t, r]
          );
        },
        useMemoCache: bh,
        useCacheRefresh: function () {
          return (hn().memoizedState = $k.bind(null, De));
        },
      },
      XE = {
        readContext: tn,
        use: qu,
        useCallback: UE,
        useContext: tn,
        useEffect: NE,
        useImperativeHandle: LE,
        useInsertionEffect: kE,
        useLayoutEffect: zE,
        useMemo: jE,
        useReducer: Fu,
        useRef: ME,
        useState: function () {
          return Fu(Dr);
        },
        useDebugValue: Th,
        useDeferredValue: function (t, r) {
          var i = kt();
          return $E(i, tt.memoizedState, t, r);
        },
        useTransition: function () {
          var t = Fu(Dr)[0],
            r = kt().memoizedState;
          return [typeof t == "boolean" ? t : _s(t), r];
        },
        useSyncExternalStore: hE,
        useId: qE,
        useHostTransitionStatus: wh,
        useFormState: RE,
        useActionState: RE,
        useOptimistic: function (t, r) {
          var i = kt();
          return SE(i, tt, t, r);
        },
        useMemoCache: bh,
        useCacheRefresh: FE,
      },
      Hk = {
        readContext: tn,
        use: qu,
        useCallback: UE,
        useContext: tn,
        useEffect: NE,
        useImperativeHandle: LE,
        useInsertionEffect: kE,
        useLayoutEffect: zE,
        useMemo: jE,
        useReducer: Sh,
        useRef: ME,
        useState: function () {
          return Sh(Dr);
        },
        useDebugValue: Th,
        useDeferredValue: function (t, r) {
          var i = kt();
          return tt === null ? xh(i, t, r) : $E(i, tt.memoizedState, t, r);
        },
        useTransition: function () {
          var t = Sh(Dr)[0],
            r = kt().memoizedState;
          return [typeof t == "boolean" ? t : _s(t), r];
        },
        useSyncExternalStore: hE,
        useId: qE,
        useHostTransitionStatus: wh,
        useFormState: OE,
        useActionState: OE,
        useOptimistic: function (t, r) {
          var i = kt();
          return tt !== null
            ? SE(i, tt, t, r)
            : ((i.baseState = t), [t, i.queue.dispatch]);
        },
        useMemoCache: bh,
        useCacheRefresh: FE,
      },
      Qo = null,
      Cs = 0;
    function Xu(t) {
      var r = Cs;
      return ((Cs += 1), Qo === null && (Qo = []), iE(Qo, t, r));
    }
    function ws(t, r) {
      ((r = r.props.ref), (t.ref = r !== void 0 ? r : null));
    }
    function Wu(t, r) {
      throw r.$$typeof === b
        ? Error(o(525))
        : ((t = Object.prototype.toString.call(r)),
          Error(
            o(
              31,
              t === "[object Object]"
                ? "object with keys {" + Object.keys(r).join(", ") + "}"
                : t,
            ),
          ));
    }
    function WE(t) {
      var r = t._init;
      return r(t._payload);
    }
    function QE(t) {
      function r(U, B) {
        if (t) {
          var j = U.deletions;
          j === null ? ((U.deletions = [B]), (U.flags |= 16)) : j.push(B);
        }
      }
      function i(U, B) {
        if (!t) return null;
        for (; B !== null; ) (r(U, B), (B = B.sibling));
        return null;
      }
      function l(U) {
        for (var B = new Map(); U !== null; )
          (U.key !== null ? B.set(U.key, U) : B.set(U.index, U),
            (U = U.sibling));
        return B;
      }
      function f(U, B) {
        return ((U = wr(U, B)), (U.index = 0), (U.sibling = null), U);
      }
      function p(U, B, j) {
        return (
          (U.index = j),
          t
            ? ((j = U.alternate),
              j !== null
                ? ((j = j.index), j < B ? ((U.flags |= 67108866), B) : j)
                : ((U.flags |= 67108866), B))
            : ((U.flags |= 1048576), B)
        );
      }
      function y(U) {
        return (t && U.alternate === null && (U.flags |= 67108866), U);
      }
      function T(U, B, j, ee) {
        return B === null || B.tag !== 6
          ? ((B = Yp(j, U.mode, ee)), (B.return = U), B)
          : ((B = f(B, j)), (B.return = U), B);
      }
      function k(U, B, j, ee) {
        var ue = j.type;
        return ue === _
          ? Z(U, B, j.props.children, ee, j.key)
          : B !== null &&
              (B.elementType === ue ||
                (typeof ue == "object" &&
                  ue !== null &&
                  ue.$$typeof === q &&
                  WE(ue) === B.type))
            ? ((B = f(B, j.props)), ws(B, j), (B.return = U), B)
            : ((B = Nu(j.type, j.key, j.props, null, U.mode, ee)),
              ws(B, j),
              (B.return = U),
              B);
      }
      function $(U, B, j, ee) {
        return B === null ||
          B.tag !== 4 ||
          B.stateNode.containerInfo !== j.containerInfo ||
          B.stateNode.implementation !== j.implementation
          ? ((B = Xp(j, U.mode, ee)), (B.return = U), B)
          : ((B = f(B, j.children || [])), (B.return = U), B);
      }
      function Z(U, B, j, ee, ue) {
        return B === null || B.tag !== 7
          ? ((B = Ga(j, U.mode, ee, ue)), (B.return = U), B)
          : ((B = f(B, j)), (B.return = U), B);
      }
      function ne(U, B, j) {
        if (
          (typeof B == "string" && B !== "") ||
          typeof B == "number" ||
          typeof B == "bigint"
        )
          return ((B = Yp("" + B, U.mode, j)), (B.return = U), B);
        if (typeof B == "object" && B !== null) {
          switch (B.$$typeof) {
            case x:
              return (
                (j = Nu(B.type, B.key, B.props, null, U.mode, j)),
                ws(j, B),
                (j.return = U),
                j
              );
            case C:
              return ((B = Xp(B, U.mode, j)), (B.return = U), B);
            case q:
              var ee = B._init;
              return ((B = ee(B._payload)), ne(U, B, j));
          }
          if (J(B) || X(B))
            return ((B = Ga(B, U.mode, j, null)), (B.return = U), B);
          if (typeof B.then == "function") return ne(U, Xu(B), j);
          if (B.$$typeof === R) return ne(U, Lu(U, B), j);
          Wu(U, B);
        }
        return null;
      }
      function H(U, B, j, ee) {
        var ue = B !== null ? B.key : null;
        if (
          (typeof j == "string" && j !== "") ||
          typeof j == "number" ||
          typeof j == "bigint"
        )
          return ue !== null ? null : T(U, B, "" + j, ee);
        if (typeof j == "object" && j !== null) {
          switch (j.$$typeof) {
            case x:
              return j.key === ue ? k(U, B, j, ee) : null;
            case C:
              return j.key === ue ? $(U, B, j, ee) : null;
            case q:
              return ((ue = j._init), (j = ue(j._payload)), H(U, B, j, ee));
          }
          if (J(j) || X(j)) return ue !== null ? null : Z(U, B, j, ee, null);
          if (typeof j.then == "function") return H(U, B, Xu(j), ee);
          if (j.$$typeof === R) return H(U, B, Lu(U, j), ee);
          Wu(U, j);
        }
        return null;
      }
      function F(U, B, j, ee, ue) {
        if (
          (typeof ee == "string" && ee !== "") ||
          typeof ee == "number" ||
          typeof ee == "bigint"
        )
          return ((U = U.get(j) || null), T(B, U, "" + ee, ue));
        if (typeof ee == "object" && ee !== null) {
          switch (ee.$$typeof) {
            case x:
              return (
                (U = U.get(ee.key === null ? j : ee.key) || null),
                k(B, U, ee, ue)
              );
            case C:
              return (
                (U = U.get(ee.key === null ? j : ee.key) || null),
                $(B, U, ee, ue)
              );
            case q:
              var Ne = ee._init;
              return ((ee = Ne(ee._payload)), F(U, B, j, ee, ue));
          }
          if (J(ee) || X(ee))
            return ((U = U.get(j) || null), Z(B, U, ee, ue, null));
          if (typeof ee.then == "function") return F(U, B, j, Xu(ee), ue);
          if (ee.$$typeof === R) return F(U, B, j, Lu(B, ee), ue);
          Wu(B, ee);
        }
        return null;
      }
      function Se(U, B, j, ee) {
        for (
          var ue = null, Ne = null, me = B, be = (B = 0), Pt = null;
          me !== null && be < j.length;
          be++
        ) {
          me.index > be ? ((Pt = me), (me = null)) : (Pt = me.sibling);
          var Ue = H(U, me, j[be], ee);
          if (Ue === null) {
            me === null && (me = Pt);
            break;
          }
          (t && me && Ue.alternate === null && r(U, me),
            (B = p(Ue, B, be)),
            Ne === null ? (ue = Ue) : (Ne.sibling = Ue),
            (Ne = Ue),
            (me = Pt));
        }
        if (be === j.length) return (i(U, me), He && Ka(U, be), ue);
        if (me === null) {
          for (; be < j.length; be++)
            ((me = ne(U, j[be], ee)),
              me !== null &&
                ((B = p(me, B, be)),
                Ne === null ? (ue = me) : (Ne.sibling = me),
                (Ne = me)));
          return (He && Ka(U, be), ue);
        }
        for (me = l(me); be < j.length; be++)
          ((Pt = F(me, U, be, j[be], ee)),
            Pt !== null &&
              (t &&
                Pt.alternate !== null &&
                me.delete(Pt.key === null ? be : Pt.key),
              (B = p(Pt, B, be)),
              Ne === null ? (ue = Pt) : (Ne.sibling = Pt),
              (Ne = Pt)));
        return (
          t &&
            me.forEach(function (ya) {
              return r(U, ya);
            }),
          He && Ka(U, be),
          ue
        );
      }
      function ye(U, B, j, ee) {
        if (j == null) throw Error(o(151));
        for (
          var ue = null,
            Ne = null,
            me = B,
            be = (B = 0),
            Pt = null,
            Ue = j.next();
          me !== null && !Ue.done;
          be++, Ue = j.next()
        ) {
          me.index > be ? ((Pt = me), (me = null)) : (Pt = me.sibling);
          var ya = H(U, me, Ue.value, ee);
          if (ya === null) {
            me === null && (me = Pt);
            break;
          }
          (t && me && ya.alternate === null && r(U, me),
            (B = p(ya, B, be)),
            Ne === null ? (ue = ya) : (Ne.sibling = ya),
            (Ne = ya),
            (me = Pt));
        }
        if (Ue.done) return (i(U, me), He && Ka(U, be), ue);
        if (me === null) {
          for (; !Ue.done; be++, Ue = j.next())
            ((Ue = ne(U, Ue.value, ee)),
              Ue !== null &&
                ((B = p(Ue, B, be)),
                Ne === null ? (ue = Ue) : (Ne.sibling = Ue),
                (Ne = Ue)));
          return (He && Ka(U, be), ue);
        }
        for (me = l(me); !Ue.done; be++, Ue = j.next())
          ((Ue = F(me, U, be, Ue.value, ee)),
            Ue !== null &&
              (t &&
                Ue.alternate !== null &&
                me.delete(Ue.key === null ? be : Ue.key),
              (B = p(Ue, B, be)),
              Ne === null ? (ue = Ue) : (Ne.sibling = Ue),
              (Ne = Ue)));
        return (
          t &&
            me.forEach(function (P6) {
              return r(U, P6);
            }),
          He && Ka(U, be),
          ue
        );
      }
      function rt(U, B, j, ee) {
        if (
          (typeof j == "object" &&
            j !== null &&
            j.type === _ &&
            j.key === null &&
            (j = j.props.children),
          typeof j == "object" && j !== null)
        ) {
          switch (j.$$typeof) {
            case x:
              e: {
                for (var ue = j.key; B !== null; ) {
                  if (B.key === ue) {
                    if (((ue = j.type), ue === _)) {
                      if (B.tag === 7) {
                        (i(U, B.sibling),
                          (ee = f(B, j.props.children)),
                          (ee.return = U),
                          (U = ee));
                        break e;
                      }
                    } else if (
                      B.elementType === ue ||
                      (typeof ue == "object" &&
                        ue !== null &&
                        ue.$$typeof === q &&
                        WE(ue) === B.type)
                    ) {
                      (i(U, B.sibling),
                        (ee = f(B, j.props)),
                        ws(ee, j),
                        (ee.return = U),
                        (U = ee));
                      break e;
                    }
                    i(U, B);
                    break;
                  } else r(U, B);
                  B = B.sibling;
                }
                j.type === _
                  ? ((ee = Ga(j.props.children, U.mode, ee, j.key)),
                    (ee.return = U),
                    (U = ee))
                  : ((ee = Nu(j.type, j.key, j.props, null, U.mode, ee)),
                    ws(ee, j),
                    (ee.return = U),
                    (U = ee));
              }
              return y(U);
            case C:
              e: {
                for (ue = j.key; B !== null; ) {
                  if (B.key === ue)
                    if (
                      B.tag === 4 &&
                      B.stateNode.containerInfo === j.containerInfo &&
                      B.stateNode.implementation === j.implementation
                    ) {
                      (i(U, B.sibling),
                        (ee = f(B, j.children || [])),
                        (ee.return = U),
                        (U = ee));
                      break e;
                    } else {
                      i(U, B);
                      break;
                    }
                  else r(U, B);
                  B = B.sibling;
                }
                ((ee = Xp(j, U.mode, ee)), (ee.return = U), (U = ee));
              }
              return y(U);
            case q:
              return ((ue = j._init), (j = ue(j._payload)), rt(U, B, j, ee));
          }
          if (J(j)) return Se(U, B, j, ee);
          if (X(j)) {
            if (((ue = X(j)), typeof ue != "function")) throw Error(o(150));
            return ((j = ue.call(j)), ye(U, B, j, ee));
          }
          if (typeof j.then == "function") return rt(U, B, Xu(j), ee);
          if (j.$$typeof === R) return rt(U, B, Lu(U, j), ee);
          Wu(U, j);
        }
        return (typeof j == "string" && j !== "") ||
          typeof j == "number" ||
          typeof j == "bigint"
          ? ((j = "" + j),
            B !== null && B.tag === 6
              ? (i(U, B.sibling), (ee = f(B, j)), (ee.return = U), (U = ee))
              : (i(U, B), (ee = Yp(j, U.mode, ee)), (ee.return = U), (U = ee)),
            y(U))
          : i(U, B);
      }
      return function (U, B, j, ee) {
        try {
          Cs = 0;
          var ue = rt(U, B, j, ee);
          return ((Qo = null), ue);
        } catch (me) {
          if (me === gs || me === ju) throw me;
          var Ne = _n(29, me, null, U.mode);
          return ((Ne.lanes = ee), (Ne.return = U), Ne);
        } finally {
        }
      };
    }
    var Zo = QE(!0),
      ZE = QE(!1),
      In = K(null),
      fr = null;
    function na(t) {
      var r = t.alternate;
      (te(Lt, Lt.current & 1),
        te(In, t),
        fr === null &&
          (r === null || Ko.current !== null || r.memoizedState !== null) &&
          (fr = t));
    }
    function JE(t) {
      if (t.tag === 22) {
        if ((te(Lt, Lt.current), te(In, t), fr === null)) {
          var r = t.alternate;
          r !== null && r.memoizedState !== null && (fr = t);
        }
      } else ra();
    }
    function ra() {
      (te(Lt, Lt.current), te(In, In.current));
    }
    function Nr(t) {
      (ae(In), fr === t && (fr = null), ae(Lt));
    }
    var Lt = K(0);
    function Qu(t) {
      for (var r = t; r !== null; ) {
        if (r.tag === 13) {
          var i = r.memoizedState;
          if (
            i !== null &&
            ((i = i.dehydrated), i === null || i.data === "$?" || ym(i))
          )
            return r;
        } else if (r.tag === 19 && r.memoizedProps.revealOrder !== void 0) {
          if ((r.flags & 128) !== 0) return r;
        } else if (r.child !== null) {
          ((r.child.return = r), (r = r.child));
          continue;
        }
        if (r === t) break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === t) return null;
          r = r.return;
        }
        ((r.sibling.return = r.return), (r = r.sibling));
      }
      return null;
    }
    function Ah(t, r, i, l) {
      ((r = t.memoizedState),
        (i = i(l, r)),
        (i = i == null ? r : g({}, r, i)),
        (t.memoizedState = i),
        t.lanes === 0 && (t.updateQueue.baseState = i));
    }
    var Oh = {
      enqueueSetState: function (t, r, i) {
        t = t._reactInternals;
        var l = wn(),
          f = Jr(l);
        ((f.payload = r),
          i != null && (f.callback = i),
          (r = ea(t, f, l)),
          r !== null && (Rn(r, t, l), bs(r, t, l)));
      },
      enqueueReplaceState: function (t, r, i) {
        t = t._reactInternals;
        var l = wn(),
          f = Jr(l);
        ((f.tag = 1),
          (f.payload = r),
          i != null && (f.callback = i),
          (r = ea(t, f, l)),
          r !== null && (Rn(r, t, l), bs(r, t, l)));
      },
      enqueueForceUpdate: function (t, r) {
        t = t._reactInternals;
        var i = wn(),
          l = Jr(i);
        ((l.tag = 2),
          r != null && (l.callback = r),
          (r = ea(t, l, i)),
          r !== null && (Rn(r, t, i), bs(r, t, i)));
      },
    };
    function e1(t, r, i, l, f, p, y) {
      return (
        (t = t.stateNode),
        typeof t.shouldComponentUpdate == "function"
          ? t.shouldComponentUpdate(l, p, y)
          : r.prototype && r.prototype.isPureReactComponent
            ? !ls(i, l) || !ls(f, p)
            : !0
      );
    }
    function t1(t, r, i, l) {
      ((t = r.state),
        typeof r.componentWillReceiveProps == "function" &&
          r.componentWillReceiveProps(i, l),
        typeof r.UNSAFE_componentWillReceiveProps == "function" &&
          r.UNSAFE_componentWillReceiveProps(i, l),
        r.state !== t && Oh.enqueueReplaceState(r, r.state, null));
    }
    function eo(t, r) {
      var i = r;
      if ("ref" in r) {
        i = {};
        for (var l in r) l !== "ref" && (i[l] = r[l]);
      }
      if ((t = t.defaultProps)) {
        i === r && (i = g({}, i));
        for (var f in t) i[f] === void 0 && (i[f] = t[f]);
      }
      return i;
    }
    var Zu =
      typeof reportError == "function"
        ? reportError
        : function (t) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var r = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof t == "object" &&
                  t !== null &&
                  typeof t.message == "string"
                    ? String(t.message)
                    : String(t),
                error: t,
              });
              if (!window.dispatchEvent(r)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", t);
              return;
            }
            console.error(t);
          };
    function n1(t) {
      Zu(t);
    }
    function r1(t) {
      console.error(t);
    }
    function a1(t) {
      Zu(t);
    }
    function Ju(t, r) {
      try {
        var i = t.onUncaughtError;
        i(r.value, { componentStack: r.stack });
      } catch (l) {
        setTimeout(function () {
          throw l;
        });
      }
    }
    function o1(t, r, i) {
      try {
        var l = t.onCaughtError;
        l(i.value, {
          componentStack: i.stack,
          errorBoundary: r.tag === 1 ? r.stateNode : null,
        });
      } catch (f) {
        setTimeout(function () {
          throw f;
        });
      }
    }
    function Mh(t, r, i) {
      return (
        (i = Jr(i)),
        (i.tag = 3),
        (i.payload = { element: null }),
        (i.callback = function () {
          Ju(t, r);
        }),
        i
      );
    }
    function i1(t) {
      return ((t = Jr(t)), (t.tag = 3), t);
    }
    function s1(t, r, i, l) {
      var f = i.type.getDerivedStateFromError;
      if (typeof f == "function") {
        var p = l.value;
        ((t.payload = function () {
          return f(p);
        }),
          (t.callback = function () {
            o1(r, i, l);
          }));
      }
      var y = i.stateNode;
      y !== null &&
        typeof y.componentDidCatch == "function" &&
        (t.callback = function () {
          (o1(r, i, l),
            typeof f != "function" &&
              (ua === null ? (ua = new Set([this])) : ua.add(this)));
          var T = l.stack;
          this.componentDidCatch(l.value, {
            componentStack: T !== null ? T : "",
          });
        });
    }
    function Pk(t, r, i, l, f) {
      if (
        ((i.flags |= 32768),
        l !== null && typeof l == "object" && typeof l.then == "function")
      ) {
        if (
          ((r = i.alternate),
          r !== null && ps(r, i, f, !0),
          (i = In.current),
          i !== null)
        ) {
          switch (i.tag) {
            case 13:
              return (
                fr === null
                  ? em()
                  : i.alternate === null && Ct === 0 && (Ct = 3),
                (i.flags &= -257),
                (i.flags |= 65536),
                (i.lanes = f),
                l === oh
                  ? (i.flags |= 16384)
                  : ((r = i.updateQueue),
                    r === null ? (i.updateQueue = new Set([l])) : r.add(l),
                    nm(t, l, f)),
                !1
              );
            case 22:
              return (
                (i.flags |= 65536),
                l === oh
                  ? (i.flags |= 16384)
                  : ((r = i.updateQueue),
                    r === null
                      ? ((r = {
                          transitions: null,
                          markerInstances: null,
                          retryQueue: new Set([l]),
                        }),
                        (i.updateQueue = r))
                      : ((i = r.retryQueue),
                        i === null ? (r.retryQueue = new Set([l])) : i.add(l)),
                    nm(t, l, f)),
                !1
              );
          }
          throw Error(o(435, i.tag));
        }
        return (nm(t, l, f), em(), !1);
      }
      if (He)
        return (
          (r = In.current),
          r !== null
            ? ((r.flags & 65536) === 0 && (r.flags |= 256),
              (r.flags |= 65536),
              (r.lanes = f),
              l !== Zp && ((t = Error(o(422), { cause: l })), ds(Ln(t, i))))
            : (l !== Zp && ((r = Error(o(423), { cause: l })), ds(Ln(r, i))),
              (t = t.current.alternate),
              (t.flags |= 65536),
              (f &= -f),
              (t.lanes |= f),
              (l = Ln(l, i)),
              (f = Mh(t.stateNode, l, f)),
              lh(t, f),
              Ct !== 4 && (Ct = 2)),
          !1
        );
      var p = Error(o(520), { cause: l });
      if (
        ((p = Ln(p, i)),
        ks === null ? (ks = [p]) : ks.push(p),
        Ct !== 4 && (Ct = 2),
        r === null)
      )
        return !0;
      ((l = Ln(l, i)), (i = r));
      do {
        switch (i.tag) {
          case 3:
            return (
              (i.flags |= 65536),
              (t = f & -f),
              (i.lanes |= t),
              (t = Mh(i.stateNode, l, t)),
              lh(i, t),
              !1
            );
          case 1:
            if (
              ((r = i.type),
              (p = i.stateNode),
              (i.flags & 128) === 0 &&
                (typeof r.getDerivedStateFromError == "function" ||
                  (p !== null &&
                    typeof p.componentDidCatch == "function" &&
                    (ua === null || !ua.has(p)))))
            )
              return (
                (i.flags |= 65536),
                (f &= -f),
                (i.lanes |= f),
                (f = i1(f)),
                s1(f, t, i, l),
                lh(i, f),
                !1
              );
        }
        i = i.return;
      } while (i !== null);
      return !1;
    }
    var l1 = Error(o(461)),
      It = !1;
    function Vt(t, r, i, l) {
      r.child = t === null ? ZE(r, null, i, l) : Zo(r, t.child, i, l);
    }
    function u1(t, r, i, l, f) {
      i = i.render;
      var p = r.ref;
      if ("ref" in l) {
        var y = {};
        for (var T in l) T !== "ref" && (y[T] = l[T]);
      } else y = l;
      return (
        Qa(r),
        (l = ph(t, r, i, y, p, f)),
        (T = hh()),
        t !== null && !It
          ? (mh(t, r, f), kr(t, r, f))
          : (He && T && Wp(r), (r.flags |= 1), Vt(t, r, l, f), r.child)
      );
    }
    function c1(t, r, i, l, f) {
      if (t === null) {
        var p = i.type;
        return typeof p == "function" &&
          !Kp(p) &&
          p.defaultProps === void 0 &&
          i.compare === null
          ? ((r.tag = 15), (r.type = p), f1(t, r, p, l, f))
          : ((t = Nu(i.type, null, l, r, r.mode, f)),
            (t.ref = r.ref),
            (t.return = r),
            (r.child = t));
      }
      if (((p = t.child), !jh(t, f))) {
        var y = p.memoizedProps;
        if (
          ((i = i.compare),
          (i = i !== null ? i : ls),
          i(y, l) && t.ref === r.ref)
        )
          return kr(t, r, f);
      }
      return (
        (r.flags |= 1),
        (t = wr(p, l)),
        (t.ref = r.ref),
        (t.return = r),
        (r.child = t)
      );
    }
    function f1(t, r, i, l, f) {
      if (t !== null) {
        var p = t.memoizedProps;
        if (ls(p, l) && t.ref === r.ref)
          if (((It = !1), (r.pendingProps = l = p), jh(t, f)))
            (t.flags & 131072) !== 0 && (It = !0);
          else return ((r.lanes = t.lanes), kr(t, r, f));
      }
      return Dh(t, r, i, l, f);
    }
    function d1(t, r, i) {
      var l = r.pendingProps,
        f = l.children,
        p = t !== null ? t.memoizedState : null;
      if (l.mode === "hidden") {
        if ((r.flags & 128) !== 0) {
          if (((l = p !== null ? p.baseLanes | i : i), t !== null)) {
            for (f = r.child = t.child, p = 0; f !== null; )
              ((p = p | f.lanes | f.childLanes), (f = f.sibling));
            r.childLanes = p & ~l;
          } else ((r.childLanes = 0), (r.child = null));
          return p1(t, r, l, i);
        }
        if ((i & 536870912) !== 0)
          ((r.memoizedState = { baseLanes: 0, cachePool: null }),
            t !== null && Uu(r, p !== null ? p.cachePool : null),
            p !== null ? fE(r, p) : ch(),
            JE(r));
        else
          return (
            (r.lanes = r.childLanes = 536870912),
            p1(t, r, p !== null ? p.baseLanes | i : i, i)
          );
      } else
        p !== null
          ? (Uu(r, p.cachePool), fE(r, p), ra(), (r.memoizedState = null))
          : (t !== null && Uu(r, null), ch(), ra());
      return (Vt(t, r, f, i), r.child);
    }
    function p1(t, r, i, l) {
      var f = ah();
      return (
        (f = f === null ? null : { parent: Bt._currentValue, pool: f }),
        (r.memoizedState = { baseLanes: i, cachePool: f }),
        t !== null && Uu(r, null),
        ch(),
        JE(r),
        t !== null && ps(t, r, l, !0),
        null
      );
    }
    function ec(t, r) {
      var i = r.ref;
      if (i === null) t !== null && t.ref !== null && (r.flags |= 4194816);
      else {
        if (typeof i != "function" && typeof i != "object") throw Error(o(284));
        (t === null || t.ref !== i) && (r.flags |= 4194816);
      }
    }
    function Dh(t, r, i, l, f) {
      return (
        Qa(r),
        (i = ph(t, r, i, l, void 0, f)),
        (l = hh()),
        t !== null && !It
          ? (mh(t, r, f), kr(t, r, f))
          : (He && l && Wp(r), (r.flags |= 1), Vt(t, r, i, f), r.child)
      );
    }
    function h1(t, r, i, l, f, p) {
      return (
        Qa(r),
        (r.updateQueue = null),
        (i = pE(r, l, i, f)),
        dE(t),
        (l = hh()),
        t !== null && !It
          ? (mh(t, r, p), kr(t, r, p))
          : (He && l && Wp(r), (r.flags |= 1), Vt(t, r, i, p), r.child)
      );
    }
    function m1(t, r, i, l, f) {
      if ((Qa(r), r.stateNode === null)) {
        var p = Po,
          y = i.contextType;
        (typeof y == "object" && y !== null && (p = tn(y)),
          (p = new i(l, p)),
          (r.memoizedState =
            p.state !== null && p.state !== void 0 ? p.state : null),
          (p.updater = Oh),
          (r.stateNode = p),
          (p._reactInternals = r),
          (p = r.stateNode),
          (p.props = l),
          (p.state = r.memoizedState),
          (p.refs = {}),
          ih(r),
          (y = i.contextType),
          (p.context = typeof y == "object" && y !== null ? tn(y) : Po),
          (p.state = r.memoizedState),
          (y = i.getDerivedStateFromProps),
          typeof y == "function" &&
            (Ah(r, i, y, l), (p.state = r.memoizedState)),
          typeof i.getDerivedStateFromProps == "function" ||
            typeof p.getSnapshotBeforeUpdate == "function" ||
            (typeof p.UNSAFE_componentWillMount != "function" &&
              typeof p.componentWillMount != "function") ||
            ((y = p.state),
            typeof p.componentWillMount == "function" && p.componentWillMount(),
            typeof p.UNSAFE_componentWillMount == "function" &&
              p.UNSAFE_componentWillMount(),
            y !== p.state && Oh.enqueueReplaceState(p, p.state, null),
            Ss(r, l, p, f),
            vs(),
            (p.state = r.memoizedState)),
          typeof p.componentDidMount == "function" && (r.flags |= 4194308),
          (l = !0));
      } else if (t === null) {
        p = r.stateNode;
        var T = r.memoizedProps,
          k = eo(i, T);
        p.props = k;
        var $ = p.context,
          Z = i.contextType;
        ((y = Po), typeof Z == "object" && Z !== null && (y = tn(Z)));
        var ne = i.getDerivedStateFromProps;
        ((Z =
          typeof ne == "function" ||
          typeof p.getSnapshotBeforeUpdate == "function"),
          (T = r.pendingProps !== T),
          Z ||
            (typeof p.UNSAFE_componentWillReceiveProps != "function" &&
              typeof p.componentWillReceiveProps != "function") ||
            ((T || $ !== y) && t1(r, p, l, y)),
          (Zr = !1));
        var H = r.memoizedState;
        ((p.state = H),
          Ss(r, l, p, f),
          vs(),
          ($ = r.memoizedState),
          T || H !== $ || Zr
            ? (typeof ne == "function" &&
                (Ah(r, i, ne, l), ($ = r.memoizedState)),
              (k = Zr || e1(r, i, k, l, H, $, y))
                ? (Z ||
                    (typeof p.UNSAFE_componentWillMount != "function" &&
                      typeof p.componentWillMount != "function") ||
                    (typeof p.componentWillMount == "function" &&
                      p.componentWillMount(),
                    typeof p.UNSAFE_componentWillMount == "function" &&
                      p.UNSAFE_componentWillMount()),
                  typeof p.componentDidMount == "function" &&
                    (r.flags |= 4194308))
                : (typeof p.componentDidMount == "function" &&
                    (r.flags |= 4194308),
                  (r.memoizedProps = l),
                  (r.memoizedState = $)),
              (p.props = l),
              (p.state = $),
              (p.context = y),
              (l = k))
            : (typeof p.componentDidMount == "function" && (r.flags |= 4194308),
              (l = !1)));
      } else {
        ((p = r.stateNode),
          sh(t, r),
          (y = r.memoizedProps),
          (Z = eo(i, y)),
          (p.props = Z),
          (ne = r.pendingProps),
          (H = p.context),
          ($ = i.contextType),
          (k = Po),
          typeof $ == "object" && $ !== null && (k = tn($)),
          (T = i.getDerivedStateFromProps),
          ($ =
            typeof T == "function" ||
            typeof p.getSnapshotBeforeUpdate == "function") ||
            (typeof p.UNSAFE_componentWillReceiveProps != "function" &&
              typeof p.componentWillReceiveProps != "function") ||
            ((y !== ne || H !== k) && t1(r, p, l, k)),
          (Zr = !1),
          (H = r.memoizedState),
          (p.state = H),
          Ss(r, l, p, f),
          vs());
        var F = r.memoizedState;
        y !== ne ||
        H !== F ||
        Zr ||
        (t !== null && t.dependencies !== null && Bu(t.dependencies))
          ? (typeof T == "function" && (Ah(r, i, T, l), (F = r.memoizedState)),
            (Z =
              Zr ||
              e1(r, i, Z, l, H, F, k) ||
              (t !== null && t.dependencies !== null && Bu(t.dependencies)))
              ? ($ ||
                  (typeof p.UNSAFE_componentWillUpdate != "function" &&
                    typeof p.componentWillUpdate != "function") ||
                  (typeof p.componentWillUpdate == "function" &&
                    p.componentWillUpdate(l, F, k),
                  typeof p.UNSAFE_componentWillUpdate == "function" &&
                    p.UNSAFE_componentWillUpdate(l, F, k)),
                typeof p.componentDidUpdate == "function" && (r.flags |= 4),
                typeof p.getSnapshotBeforeUpdate == "function" &&
                  (r.flags |= 1024))
              : (typeof p.componentDidUpdate != "function" ||
                  (y === t.memoizedProps && H === t.memoizedState) ||
                  (r.flags |= 4),
                typeof p.getSnapshotBeforeUpdate != "function" ||
                  (y === t.memoizedProps && H === t.memoizedState) ||
                  (r.flags |= 1024),
                (r.memoizedProps = l),
                (r.memoizedState = F)),
            (p.props = l),
            (p.state = F),
            (p.context = k),
            (l = Z))
          : (typeof p.componentDidUpdate != "function" ||
              (y === t.memoizedProps && H === t.memoizedState) ||
              (r.flags |= 4),
            typeof p.getSnapshotBeforeUpdate != "function" ||
              (y === t.memoizedProps && H === t.memoizedState) ||
              (r.flags |= 1024),
            (l = !1));
      }
      return (
        (p = l),
        ec(t, r),
        (l = (r.flags & 128) !== 0),
        p || l
          ? ((p = r.stateNode),
            (i =
              l && typeof i.getDerivedStateFromError != "function"
                ? null
                : p.render()),
            (r.flags |= 1),
            t !== null && l
              ? ((r.child = Zo(r, t.child, null, f)),
                (r.child = Zo(r, null, i, f)))
              : Vt(t, r, i, f),
            (r.memoizedState = p.state),
            (t = r.child))
          : (t = kr(t, r, f)),
        t
      );
    }
    function g1(t, r, i, l) {
      return (fs(), (r.flags |= 256), Vt(t, r, i, l), r.child);
    }
    var Nh = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null,
    };
    function kh(t) {
      return { baseLanes: t, cachePool: rE() };
    }
    function zh(t, r, i) {
      return ((t = t !== null ? t.childLanes & ~i : 0), r && (t |= Hn), t);
    }
    function y1(t, r, i) {
      var l = r.pendingProps,
        f = !1,
        p = (r.flags & 128) !== 0,
        y;
      if (
        ((y = p) ||
          (y =
            t !== null && t.memoizedState === null
              ? !1
              : (Lt.current & 2) !== 0),
        y && ((f = !0), (r.flags &= -129)),
        (y = (r.flags & 32) !== 0),
        (r.flags &= -33),
        t === null)
      ) {
        if (He) {
          if ((f ? na(r) : ra(), He)) {
            var T = xt,
              k;
            if ((k = T)) {
              e: {
                for (k = T, T = cr; k.nodeType !== 8; ) {
                  if (!T) {
                    T = null;
                    break e;
                  }
                  if (((k = Zn(k.nextSibling)), k === null)) {
                    T = null;
                    break e;
                  }
                }
                T = k;
              }
              T !== null
                ? ((r.memoizedState = {
                    dehydrated: T,
                    treeContext: Va !== null ? { id: Rr, overflow: Ar } : null,
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  (k = _n(18, null, null, 0)),
                  (k.stateNode = T),
                  (k.return = r),
                  (r.child = k),
                  (rn = r),
                  (xt = null),
                  (k = !0))
                : (k = !1);
            }
            k || Xa(r);
          }
          if (
            ((T = r.memoizedState),
            T !== null && ((T = T.dehydrated), T !== null))
          )
            return (ym(T) ? (r.lanes = 32) : (r.lanes = 536870912), null);
          Nr(r);
        }
        return (
          (T = l.children),
          (l = l.fallback),
          f
            ? (ra(),
              (f = r.mode),
              (T = tc({ mode: "hidden", children: T }, f)),
              (l = Ga(l, f, i, null)),
              (T.return = r),
              (l.return = r),
              (T.sibling = l),
              (r.child = T),
              (f = r.child),
              (f.memoizedState = kh(i)),
              (f.childLanes = zh(t, y, i)),
              (r.memoizedState = Nh),
              l)
            : (na(r), Bh(r, T))
        );
      }
      if (
        ((k = t.memoizedState), k !== null && ((T = k.dehydrated), T !== null))
      ) {
        if (p)
          r.flags & 256
            ? (na(r), (r.flags &= -257), (r = Lh(t, r, i)))
            : r.memoizedState !== null
              ? (ra(), (r.child = t.child), (r.flags |= 128), (r = null))
              : (ra(),
                (f = l.fallback),
                (T = r.mode),
                (l = tc({ mode: "visible", children: l.children }, T)),
                (f = Ga(f, T, i, null)),
                (f.flags |= 2),
                (l.return = r),
                (f.return = r),
                (l.sibling = f),
                (r.child = l),
                Zo(r, t.child, null, i),
                (l = r.child),
                (l.memoizedState = kh(i)),
                (l.childLanes = zh(t, y, i)),
                (r.memoizedState = Nh),
                (r = f));
        else if ((na(r), ym(T))) {
          if (((y = T.nextSibling && T.nextSibling.dataset), y)) var $ = y.dgst;
          ((y = $),
            (l = Error(o(419))),
            (l.stack = ""),
            (l.digest = y),
            ds({ value: l, source: null, stack: null }),
            (r = Lh(t, r, i)));
        } else if (
          (It || ps(t, r, i, !1), (y = (i & t.childLanes) !== 0), It || y)
        ) {
          if (
            ((y = lt),
            y !== null &&
              ((l = i & -i),
              (l = (l & 42) !== 0 ? 1 : bp(l)),
              (l = (l & (y.suspendedLanes | i)) !== 0 ? 0 : l),
              l !== 0 && l !== k.retryLane))
          )
            throw ((k.retryLane = l), Ho(t, l), Rn(y, t, l), l1);
          (T.data === "$?" || em(), (r = Lh(t, r, i)));
        } else
          T.data === "$?"
            ? ((r.flags |= 192), (r.child = t.child), (r = null))
            : ((t = k.treeContext),
              (xt = Zn(T.nextSibling)),
              (rn = r),
              (He = !0),
              (Ya = null),
              (cr = !1),
              t !== null &&
                ((jn[$n++] = Rr),
                (jn[$n++] = Ar),
                (jn[$n++] = Va),
                (Rr = t.id),
                (Ar = t.overflow),
                (Va = r)),
              (r = Bh(r, l.children)),
              (r.flags |= 4096));
        return r;
      }
      return f
        ? (ra(),
          (f = l.fallback),
          (T = r.mode),
          (k = t.child),
          ($ = k.sibling),
          (l = wr(k, { mode: "hidden", children: l.children })),
          (l.subtreeFlags = k.subtreeFlags & 65011712),
          $ !== null
            ? (f = wr($, f))
            : ((f = Ga(f, T, i, null)), (f.flags |= 2)),
          (f.return = r),
          (l.return = r),
          (l.sibling = f),
          (r.child = l),
          (l = f),
          (f = r.child),
          (T = t.child.memoizedState),
          T === null
            ? (T = kh(i))
            : ((k = T.cachePool),
              k !== null
                ? (($ = Bt._currentValue),
                  (k = k.parent !== $ ? { parent: $, pool: $ } : k))
                : (k = rE()),
              (T = { baseLanes: T.baseLanes | i, cachePool: k })),
          (f.memoizedState = T),
          (f.childLanes = zh(t, y, i)),
          (r.memoizedState = Nh),
          l)
        : (na(r),
          (i = t.child),
          (t = i.sibling),
          (i = wr(i, { mode: "visible", children: l.children })),
          (i.return = r),
          (i.sibling = null),
          t !== null &&
            ((y = r.deletions),
            y === null ? ((r.deletions = [t]), (r.flags |= 16)) : y.push(t)),
          (r.child = i),
          (r.memoizedState = null),
          i);
    }
    function Bh(t, r) {
      return (
        (r = tc({ mode: "visible", children: r }, t.mode)),
        (r.return = t),
        (t.child = r)
      );
    }
    function tc(t, r) {
      return (
        (t = _n(22, t, null, r)),
        (t.lanes = 0),
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
        t
      );
    }
    function Lh(t, r, i) {
      return (
        Zo(r, t.child, null, i),
        (t = Bh(r, r.pendingProps.children)),
        (t.flags |= 2),
        (r.memoizedState = null),
        t
      );
    }
    function b1(t, r, i) {
      t.lanes |= r;
      var l = t.alternate;
      (l !== null && (l.lanes |= r), eh(t.return, r, i));
    }
    function Uh(t, r, i, l, f) {
      var p = t.memoizedState;
      p === null
        ? (t.memoizedState = {
            isBackwards: r,
            rendering: null,
            renderingStartTime: 0,
            last: l,
            tail: i,
            tailMode: f,
          })
        : ((p.isBackwards = r),
          (p.rendering = null),
          (p.renderingStartTime = 0),
          (p.last = l),
          (p.tail = i),
          (p.tailMode = f));
    }
    function v1(t, r, i) {
      var l = r.pendingProps,
        f = l.revealOrder,
        p = l.tail;
      if ((Vt(t, r, l.children, i), (l = Lt.current), (l & 2) !== 0))
        ((l = (l & 1) | 2), (r.flags |= 128));
      else {
        if (t !== null && (t.flags & 128) !== 0)
          e: for (t = r.child; t !== null; ) {
            if (t.tag === 13) t.memoizedState !== null && b1(t, i, r);
            else if (t.tag === 19) b1(t, i, r);
            else if (t.child !== null) {
              ((t.child.return = t), (t = t.child));
              continue;
            }
            if (t === r) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === r) break e;
              t = t.return;
            }
            ((t.sibling.return = t.return), (t = t.sibling));
          }
        l &= 1;
      }
      switch ((te(Lt, l), f)) {
        case "forwards":
          for (i = r.child, f = null; i !== null; )
            ((t = i.alternate),
              t !== null && Qu(t) === null && (f = i),
              (i = i.sibling));
          ((i = f),
            i === null
              ? ((f = r.child), (r.child = null))
              : ((f = i.sibling), (i.sibling = null)),
            Uh(r, !1, f, i, p));
          break;
        case "backwards":
          for (i = null, f = r.child, r.child = null; f !== null; ) {
            if (((t = f.alternate), t !== null && Qu(t) === null)) {
              r.child = f;
              break;
            }
            ((t = f.sibling), (f.sibling = i), (i = f), (f = t));
          }
          Uh(r, !0, i, null, p);
          break;
        case "together":
          Uh(r, !1, null, null, void 0);
          break;
        default:
          r.memoizedState = null;
      }
      return r.child;
    }
    function kr(t, r, i) {
      if (
        (t !== null && (r.dependencies = t.dependencies),
        (la |= r.lanes),
        (i & r.childLanes) === 0)
      )
        if (t !== null) {
          if ((ps(t, r, i, !1), (i & r.childLanes) === 0)) return null;
        } else return null;
      if (t !== null && r.child !== t.child) throw Error(o(153));
      if (r.child !== null) {
        for (
          t = r.child, i = wr(t, t.pendingProps), r.child = i, i.return = r;
          t.sibling !== null;
        )
          ((t = t.sibling),
            (i = i.sibling = wr(t, t.pendingProps)),
            (i.return = r));
        i.sibling = null;
      }
      return r.child;
    }
    function jh(t, r) {
      return (t.lanes & r) !== 0
        ? !0
        : ((t = t.dependencies), !!(t !== null && Bu(t)));
    }
    function qk(t, r, i) {
      switch (r.tag) {
        case 3:
          (xe(r, r.stateNode.containerInfo),
            Qr(r, Bt, t.memoizedState.cache),
            fs());
          break;
        case 27:
        case 5:
          ge(r);
          break;
        case 4:
          xe(r, r.stateNode.containerInfo);
          break;
        case 10:
          Qr(r, r.type, r.memoizedProps.value);
          break;
        case 13:
          var l = r.memoizedState;
          if (l !== null)
            return l.dehydrated !== null
              ? (na(r), (r.flags |= 128), null)
              : (i & r.child.childLanes) !== 0
                ? y1(t, r, i)
                : (na(r), (t = kr(t, r, i)), t !== null ? t.sibling : null);
          na(r);
          break;
        case 19:
          var f = (t.flags & 128) !== 0;
          if (
            ((l = (i & r.childLanes) !== 0),
            l || (ps(t, r, i, !1), (l = (i & r.childLanes) !== 0)),
            f)
          ) {
            if (l) return v1(t, r, i);
            r.flags |= 128;
          }
          if (
            ((f = r.memoizedState),
            f !== null &&
              ((f.rendering = null), (f.tail = null), (f.lastEffect = null)),
            te(Lt, Lt.current),
            l)
          )
            break;
          return null;
        case 22:
        case 23:
          return ((r.lanes = 0), d1(t, r, i));
        case 24:
          Qr(r, Bt, t.memoizedState.cache);
      }
      return kr(t, r, i);
    }
    function S1(t, r, i) {
      if (t !== null)
        if (t.memoizedProps !== r.pendingProps) It = !0;
        else {
          if (!jh(t, i) && (r.flags & 128) === 0)
            return ((It = !1), qk(t, r, i));
          It = (t.flags & 131072) !== 0;
        }
      else ((It = !1), He && (r.flags & 1048576) !== 0 && WS(r, zu, r.index));
      switch (((r.lanes = 0), r.tag)) {
        case 16:
          e: {
            t = r.pendingProps;
            var l = r.elementType,
              f = l._init;
            if (((l = f(l._payload)), (r.type = l), typeof l == "function"))
              Kp(l)
                ? ((t = eo(l, t)), (r.tag = 1), (r = m1(null, r, l, t, i)))
                : ((r.tag = 0), (r = Dh(null, r, l, t, i)));
            else {
              if (l != null) {
                if (((f = l.$$typeof), f === M)) {
                  ((r.tag = 11), (r = u1(null, r, l, t, i)));
                  break e;
                } else if (f === G) {
                  ((r.tag = 14), (r = c1(null, r, l, t, i)));
                  break e;
                }
              }
              throw ((r = se(l) || l), Error(o(306, r, "")));
            }
          }
          return r;
        case 0:
          return Dh(t, r, r.type, r.pendingProps, i);
        case 1:
          return ((l = r.type), (f = eo(l, r.pendingProps)), m1(t, r, l, f, i));
        case 3:
          e: {
            if ((xe(r, r.stateNode.containerInfo), t === null))
              throw Error(o(387));
            l = r.pendingProps;
            var p = r.memoizedState;
            ((f = p.element), sh(t, r), Ss(r, l, null, i));
            var y = r.memoizedState;
            if (
              ((l = y.cache),
              Qr(r, Bt, l),
              l !== p.cache && th(r, [Bt], i, !0),
              vs(),
              (l = y.element),
              p.isDehydrated)
            )
              if (
                ((p = { element: l, isDehydrated: !1, cache: y.cache }),
                (r.updateQueue.baseState = p),
                (r.memoizedState = p),
                r.flags & 256)
              ) {
                r = g1(t, r, l, i);
                break e;
              } else if (l !== f) {
                ((f = Ln(Error(o(424)), r)), ds(f), (r = g1(t, r, l, i)));
                break e;
              } else {
                switch (((t = r.stateNode.containerInfo), t.nodeType)) {
                  case 9:
                    t = t.body;
                    break;
                  default:
                    t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
                }
                for (
                  xt = Zn(t.firstChild),
                    rn = r,
                    He = !0,
                    Ya = null,
                    cr = !0,
                    i = ZE(r, null, l, i),
                    r.child = i;
                  i;
                )
                  ((i.flags = (i.flags & -3) | 4096), (i = i.sibling));
              }
            else {
              if ((fs(), l === f)) {
                r = kr(t, r, i);
                break e;
              }
              Vt(t, r, l, i);
            }
            r = r.child;
          }
          return r;
        case 26:
          return (
            ec(t, r),
            t === null
              ? (i = x_(r.type, null, r.pendingProps, null))
                ? (r.memoizedState = i)
                : He ||
                  ((i = r.type),
                  (t = r.pendingProps),
                  (l = mc(fe.current).createElement(i)),
                  (l[en] = r),
                  (l[dn] = t),
                  Yt(l, i, t),
                  $t(l),
                  (r.stateNode = l))
              : (r.memoizedState = x_(
                  r.type,
                  t.memoizedProps,
                  r.pendingProps,
                  t.memoizedState,
                )),
            null
          );
        case 27:
          return (
            ge(r),
            t === null &&
              He &&
              ((l = r.stateNode = E_(r.type, r.pendingProps, fe.current)),
              (rn = r),
              (cr = !0),
              (f = xt),
              da(r.type) ? ((bm = f), (xt = Zn(l.firstChild))) : (xt = f)),
            Vt(t, r, r.pendingProps.children, i),
            ec(t, r),
            t === null && (r.flags |= 4194304),
            r.child
          );
        case 5:
          return (
            t === null &&
              He &&
              ((f = l = xt) &&
                ((l = y6(l, r.type, r.pendingProps, cr)),
                l !== null
                  ? ((r.stateNode = l),
                    (rn = r),
                    (xt = Zn(l.firstChild)),
                    (cr = !1),
                    (f = !0))
                  : (f = !1)),
              f || Xa(r)),
            ge(r),
            (f = r.type),
            (p = r.pendingProps),
            (y = t !== null ? t.memoizedProps : null),
            (l = p.children),
            hm(f, p) ? (l = null) : y !== null && hm(f, y) && (r.flags |= 32),
            r.memoizedState !== null &&
              ((f = ph(t, r, Bk, null, null, i)), (Ps._currentValue = f)),
            ec(t, r),
            Vt(t, r, l, i),
            r.child
          );
        case 6:
          return (
            t === null &&
              He &&
              ((t = i = xt) &&
                ((i = b6(i, r.pendingProps, cr)),
                i !== null
                  ? ((r.stateNode = i), (rn = r), (xt = null), (t = !0))
                  : (t = !1)),
              t || Xa(r)),
            null
          );
        case 13:
          return y1(t, r, i);
        case 4:
          return (
            xe(r, r.stateNode.containerInfo),
            (l = r.pendingProps),
            t === null ? (r.child = Zo(r, null, l, i)) : Vt(t, r, l, i),
            r.child
          );
        case 11:
          return u1(t, r, r.type, r.pendingProps, i);
        case 7:
          return (Vt(t, r, r.pendingProps, i), r.child);
        case 8:
          return (Vt(t, r, r.pendingProps.children, i), r.child);
        case 12:
          return (Vt(t, r, r.pendingProps.children, i), r.child);
        case 10:
          return (
            (l = r.pendingProps),
            Qr(r, r.type, l.value),
            Vt(t, r, l.children, i),
            r.child
          );
        case 9:
          return (
            (f = r.type._context),
            (l = r.pendingProps.children),
            Qa(r),
            (f = tn(f)),
            (l = l(f)),
            (r.flags |= 1),
            Vt(t, r, l, i),
            r.child
          );
        case 14:
          return c1(t, r, r.type, r.pendingProps, i);
        case 15:
          return f1(t, r, r.type, r.pendingProps, i);
        case 19:
          return v1(t, r, i);
        case 31:
          return (
            (l = r.pendingProps),
            (i = r.mode),
            (l = { mode: l.mode, children: l.children }),
            t === null
              ? ((i = tc(l, i)),
                (i.ref = r.ref),
                (r.child = i),
                (i.return = r),
                (r = i))
              : ((i = wr(t.child, l)),
                (i.ref = r.ref),
                (r.child = i),
                (i.return = r),
                (r = i)),
            r
          );
        case 22:
          return d1(t, r, i);
        case 24:
          return (
            Qa(r),
            (l = tn(Bt)),
            t === null
              ? ((f = ah()),
                f === null &&
                  ((f = lt),
                  (p = nh()),
                  (f.pooledCache = p),
                  p.refCount++,
                  p !== null && (f.pooledCacheLanes |= i),
                  (f = p)),
                (r.memoizedState = { parent: l, cache: f }),
                ih(r),
                Qr(r, Bt, f))
              : ((t.lanes & i) !== 0 && (sh(t, r), Ss(r, null, null, i), vs()),
                (f = t.memoizedState),
                (p = r.memoizedState),
                f.parent !== l
                  ? ((f = { parent: l, cache: l }),
                    (r.memoizedState = f),
                    r.lanes === 0 &&
                      (r.memoizedState = r.updateQueue.baseState = f),
                    Qr(r, Bt, l))
                  : ((l = p.cache),
                    Qr(r, Bt, l),
                    l !== f.cache && th(r, [Bt], i, !0))),
            Vt(t, r, r.pendingProps.children, i),
            r.child
          );
        case 29:
          throw r.pendingProps;
      }
      throw Error(o(156, r.tag));
    }
    function zr(t) {
      t.flags |= 4;
    }
    function E1(t, r) {
      if (r.type !== "stylesheet" || (r.state.loading & 4) !== 0)
        t.flags &= -16777217;
      else if (((t.flags |= 16777216), !O_(r))) {
        if (
          ((r = In.current),
          r !== null &&
            ((Le & 4194048) === Le
              ? fr !== null
              : ((Le & 62914560) !== Le && (Le & 536870912) === 0) || r !== fr))
        )
          throw ((ys = oh), aE);
        t.flags |= 8192;
      }
    }
    function nc(t, r) {
      (r !== null && (t.flags |= 4),
        t.flags & 16384 &&
          ((r = t.tag !== 22 ? Jv() : 536870912), (t.lanes |= r), (ni |= r)));
    }
    function Rs(t, r) {
      if (!He)
        switch (t.tailMode) {
          case "hidden":
            r = t.tail;
            for (var i = null; r !== null; )
              (r.alternate !== null && (i = r), (r = r.sibling));
            i === null ? (t.tail = null) : (i.sibling = null);
            break;
          case "collapsed":
            i = t.tail;
            for (var l = null; i !== null; )
              (i.alternate !== null && (l = i), (i = i.sibling));
            l === null
              ? r || t.tail === null
                ? (t.tail = null)
                : (t.tail.sibling = null)
              : (l.sibling = null);
        }
    }
    function bt(t) {
      var r = t.alternate !== null && t.alternate.child === t.child,
        i = 0,
        l = 0;
      if (r)
        for (var f = t.child; f !== null; )
          ((i |= f.lanes | f.childLanes),
            (l |= f.subtreeFlags & 65011712),
            (l |= f.flags & 65011712),
            (f.return = t),
            (f = f.sibling));
      else
        for (f = t.child; f !== null; )
          ((i |= f.lanes | f.childLanes),
            (l |= f.subtreeFlags),
            (l |= f.flags),
            (f.return = t),
            (f = f.sibling));
      return ((t.subtreeFlags |= l), (t.childLanes = i), r);
    }
    function Fk(t, r, i) {
      var l = r.pendingProps;
      switch ((Qp(r), r.tag)) {
        case 31:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return (bt(r), null);
        case 1:
          return (bt(r), null);
        case 3:
          return (
            (i = r.stateNode),
            (l = null),
            t !== null && (l = t.memoizedState.cache),
            r.memoizedState.cache !== l && (r.flags |= 2048),
            Mr(Bt),
            ke(),
            i.pendingContext &&
              ((i.context = i.pendingContext), (i.pendingContext = null)),
            (t === null || t.child === null) &&
              (cs(r)
                ? zr(r)
                : t === null ||
                  (t.memoizedState.isDehydrated && (r.flags & 256) === 0) ||
                  ((r.flags |= 1024), JS())),
            bt(r),
            null
          );
        case 26:
          return (
            (i = r.memoizedState),
            t === null
              ? (zr(r),
                i !== null
                  ? (bt(r), E1(r, i))
                  : (bt(r), (r.flags &= -16777217)))
              : i
                ? i !== t.memoizedState
                  ? (zr(r), bt(r), E1(r, i))
                  : (bt(r), (r.flags &= -16777217))
                : (t.memoizedProps !== l && zr(r),
                  bt(r),
                  (r.flags &= -16777217)),
            null
          );
        case 27:
          (Oe(r), (i = fe.current));
          var f = r.type;
          if (t !== null && r.stateNode != null) t.memoizedProps !== l && zr(r);
          else {
            if (!l) {
              if (r.stateNode === null) throw Error(o(166));
              return (bt(r), null);
            }
            ((t = le.current),
              cs(r) ? QS(r) : ((t = E_(f, l, i)), (r.stateNode = t), zr(r)));
          }
          return (bt(r), null);
        case 5:
          if ((Oe(r), (i = r.type), t !== null && r.stateNode != null))
            t.memoizedProps !== l && zr(r);
          else {
            if (!l) {
              if (r.stateNode === null) throw Error(o(166));
              return (bt(r), null);
            }
            if (((t = le.current), cs(r))) QS(r);
            else {
              switch (((f = mc(fe.current)), t)) {
                case 1:
                  t = f.createElementNS("http://www.w3.org/2000/svg", i);
                  break;
                case 2:
                  t = f.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    i,
                  );
                  break;
                default:
                  switch (i) {
                    case "svg":
                      t = f.createElementNS("http://www.w3.org/2000/svg", i);
                      break;
                    case "math":
                      t = f.createElementNS(
                        "http://www.w3.org/1998/Math/MathML",
                        i,
                      );
                      break;
                    case "script":
                      ((t = f.createElement("div")),
                        (t.innerHTML = "<script><\/script>"),
                        (t = t.removeChild(t.firstChild)));
                      break;
                    case "select":
                      ((t =
                        typeof l.is == "string"
                          ? f.createElement("select", { is: l.is })
                          : f.createElement("select")),
                        l.multiple
                          ? (t.multiple = !0)
                          : l.size && (t.size = l.size));
                      break;
                    default:
                      t =
                        typeof l.is == "string"
                          ? f.createElement(i, { is: l.is })
                          : f.createElement(i);
                  }
              }
              ((t[en] = r), (t[dn] = l));
              e: for (f = r.child; f !== null; ) {
                if (f.tag === 5 || f.tag === 6) t.appendChild(f.stateNode);
                else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                  ((f.child.return = f), (f = f.child));
                  continue;
                }
                if (f === r) break e;
                for (; f.sibling === null; ) {
                  if (f.return === null || f.return === r) break e;
                  f = f.return;
                }
                ((f.sibling.return = f.return), (f = f.sibling));
              }
              r.stateNode = t;
              e: switch ((Yt(t, i, l), i)) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  t = !!l.autoFocus;
                  break e;
                case "img":
                  t = !0;
                  break e;
                default:
                  t = !1;
              }
              t && zr(r);
            }
          }
          return (bt(r), (r.flags &= -16777217), null);
        case 6:
          if (t && r.stateNode != null) t.memoizedProps !== l && zr(r);
          else {
            if (typeof l != "string" && r.stateNode === null)
              throw Error(o(166));
            if (((t = fe.current), cs(r))) {
              if (
                ((t = r.stateNode),
                (i = r.memoizedProps),
                (l = null),
                (f = rn),
                f !== null)
              )
                switch (f.tag) {
                  case 27:
                  case 5:
                    l = f.memoizedProps;
                }
              ((t[en] = r),
                (t = !!(
                  t.nodeValue === i ||
                  (l !== null && l.suppressHydrationWarning === !0) ||
                  h_(t.nodeValue, i)
                )),
                t || Xa(r));
            } else
              ((t = mc(t).createTextNode(l)), (t[en] = r), (r.stateNode = t));
          }
          return (bt(r), null);
        case 13:
          if (
            ((l = r.memoizedState),
            t === null ||
              (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
          ) {
            if (((f = cs(r)), l !== null && l.dehydrated !== null)) {
              if (t === null) {
                if (!f) throw Error(o(318));
                if (
                  ((f = r.memoizedState),
                  (f = f !== null ? f.dehydrated : null),
                  !f)
                )
                  throw Error(o(317));
                f[en] = r;
              } else
                (fs(),
                  (r.flags & 128) === 0 && (r.memoizedState = null),
                  (r.flags |= 4));
              (bt(r), (f = !1));
            } else
              ((f = JS()),
                t !== null &&
                  t.memoizedState !== null &&
                  (t.memoizedState.hydrationErrors = f),
                (f = !0));
            if (!f) return r.flags & 256 ? (Nr(r), r) : (Nr(r), null);
          }
          if ((Nr(r), (r.flags & 128) !== 0)) return ((r.lanes = i), r);
          if (
            ((i = l !== null), (t = t !== null && t.memoizedState !== null), i)
          ) {
            ((l = r.child),
              (f = null),
              l.alternate !== null &&
                l.alternate.memoizedState !== null &&
                l.alternate.memoizedState.cachePool !== null &&
                (f = l.alternate.memoizedState.cachePool.pool));
            var p = null;
            (l.memoizedState !== null &&
              l.memoizedState.cachePool !== null &&
              (p = l.memoizedState.cachePool.pool),
              p !== f && (l.flags |= 2048));
          }
          return (
            i !== t && i && (r.child.flags |= 8192),
            nc(r, r.updateQueue),
            bt(r),
            null
          );
        case 4:
          return (
            ke(),
            t === null && um(r.stateNode.containerInfo),
            bt(r),
            null
          );
        case 10:
          return (Mr(r.type), bt(r), null);
        case 19:
          if ((ae(Lt), (f = r.memoizedState), f === null)) return (bt(r), null);
          if (((l = (r.flags & 128) !== 0), (p = f.rendering), p === null))
            if (l) Rs(f, !1);
            else {
              if (Ct !== 0 || (t !== null && (t.flags & 128) !== 0))
                for (t = r.child; t !== null; ) {
                  if (((p = Qu(t)), p !== null)) {
                    for (
                      r.flags |= 128,
                        Rs(f, !1),
                        t = p.updateQueue,
                        r.updateQueue = t,
                        nc(r, t),
                        r.subtreeFlags = 0,
                        t = i,
                        i = r.child;
                      i !== null;
                    )
                      (XS(i, t), (i = i.sibling));
                    return (te(Lt, (Lt.current & 1) | 2), r.child);
                  }
                  t = t.sibling;
                }
              f.tail !== null &&
                We() > oc &&
                ((r.flags |= 128), (l = !0), Rs(f, !1), (r.lanes = 4194304));
            }
          else {
            if (!l)
              if (((t = Qu(p)), t !== null)) {
                if (
                  ((r.flags |= 128),
                  (l = !0),
                  (t = t.updateQueue),
                  (r.updateQueue = t),
                  nc(r, t),
                  Rs(f, !0),
                  f.tail === null &&
                    f.tailMode === "hidden" &&
                    !p.alternate &&
                    !He)
                )
                  return (bt(r), null);
              } else
                2 * We() - f.renderingStartTime > oc &&
                  i !== 536870912 &&
                  ((r.flags |= 128), (l = !0), Rs(f, !1), (r.lanes = 4194304));
            f.isBackwards
              ? ((p.sibling = r.child), (r.child = p))
              : ((t = f.last),
                t !== null ? (t.sibling = p) : (r.child = p),
                (f.last = p));
          }
          return f.tail !== null
            ? ((r = f.tail),
              (f.rendering = r),
              (f.tail = r.sibling),
              (f.renderingStartTime = We()),
              (r.sibling = null),
              (t = Lt.current),
              te(Lt, l ? (t & 1) | 2 : t & 1),
              r)
            : (bt(r), null);
        case 22:
        case 23:
          return (
            Nr(r),
            fh(),
            (l = r.memoizedState !== null),
            t !== null
              ? (t.memoizedState !== null) !== l && (r.flags |= 8192)
              : l && (r.flags |= 8192),
            l
              ? (i & 536870912) !== 0 &&
                (r.flags & 128) === 0 &&
                (bt(r), r.subtreeFlags & 6 && (r.flags |= 8192))
              : bt(r),
            (i = r.updateQueue),
            i !== null && nc(r, i.retryQueue),
            (i = null),
            t !== null &&
              t.memoizedState !== null &&
              t.memoizedState.cachePool !== null &&
              (i = t.memoizedState.cachePool.pool),
            (l = null),
            r.memoizedState !== null &&
              r.memoizedState.cachePool !== null &&
              (l = r.memoizedState.cachePool.pool),
            l !== i && (r.flags |= 2048),
            t !== null && ae(Za),
            null
          );
        case 24:
          return (
            (i = null),
            t !== null && (i = t.memoizedState.cache),
            r.memoizedState.cache !== i && (r.flags |= 2048),
            Mr(Bt),
            bt(r),
            null
          );
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(o(156, r.tag));
    }
    function Gk(t, r) {
      switch ((Qp(r), r.tag)) {
        case 1:
          return (
            (t = r.flags),
            t & 65536 ? ((r.flags = (t & -65537) | 128), r) : null
          );
        case 3:
          return (
            Mr(Bt),
            ke(),
            (t = r.flags),
            (t & 65536) !== 0 && (t & 128) === 0
              ? ((r.flags = (t & -65537) | 128), r)
              : null
          );
        case 26:
        case 27:
        case 5:
          return (Oe(r), null);
        case 13:
          if (
            (Nr(r), (t = r.memoizedState), t !== null && t.dehydrated !== null)
          ) {
            if (r.alternate === null) throw Error(o(340));
            fs();
          }
          return (
            (t = r.flags),
            t & 65536 ? ((r.flags = (t & -65537) | 128), r) : null
          );
        case 19:
          return (ae(Lt), null);
        case 4:
          return (ke(), null);
        case 10:
          return (Mr(r.type), null);
        case 22:
        case 23:
          return (
            Nr(r),
            fh(),
            t !== null && ae(Za),
            (t = r.flags),
            t & 65536 ? ((r.flags = (t & -65537) | 128), r) : null
          );
        case 24:
          return (Mr(Bt), null);
        case 25:
          return null;
        default:
          return null;
      }
    }
    function _1(t, r) {
      switch ((Qp(r), r.tag)) {
        case 3:
          (Mr(Bt), ke());
          break;
        case 26:
        case 27:
        case 5:
          Oe(r);
          break;
        case 4:
          ke();
          break;
        case 13:
          Nr(r);
          break;
        case 19:
          ae(Lt);
          break;
        case 10:
          Mr(r.type);
          break;
        case 22:
        case 23:
          (Nr(r), fh(), t !== null && ae(Za));
          break;
        case 24:
          Mr(Bt);
      }
    }
    function As(t, r) {
      try {
        var i = r.updateQueue,
          l = i !== null ? i.lastEffect : null;
        if (l !== null) {
          var f = l.next;
          i = f;
          do {
            if ((i.tag & t) === t) {
              l = void 0;
              var p = i.create,
                y = i.inst;
              ((l = p()), (y.destroy = l));
            }
            i = i.next;
          } while (i !== f);
        }
      } catch (T) {
        st(r, r.return, T);
      }
    }
    function aa(t, r, i) {
      try {
        var l = r.updateQueue,
          f = l !== null ? l.lastEffect : null;
        if (f !== null) {
          var p = f.next;
          l = p;
          do {
            if ((l.tag & t) === t) {
              var y = l.inst,
                T = y.destroy;
              if (T !== void 0) {
                ((y.destroy = void 0), (f = r));
                var k = i,
                  $ = T;
                try {
                  $();
                } catch (Z) {
                  st(f, k, Z);
                }
              }
            }
            l = l.next;
          } while (l !== p);
        }
      } catch (Z) {
        st(r, r.return, Z);
      }
    }
    function T1(t) {
      var r = t.updateQueue;
      if (r !== null) {
        var i = t.stateNode;
        try {
          cE(r, i);
        } catch (l) {
          st(t, t.return, l);
        }
      }
    }
    function x1(t, r, i) {
      ((i.props = eo(t.type, t.memoizedProps)), (i.state = t.memoizedState));
      try {
        i.componentWillUnmount();
      } catch (l) {
        st(t, r, l);
      }
    }
    function Os(t, r) {
      try {
        var i = t.ref;
        if (i !== null) {
          switch (t.tag) {
            case 26:
            case 27:
            case 5:
              var l = t.stateNode;
              break;
            case 30:
              l = t.stateNode;
              break;
            default:
              l = t.stateNode;
          }
          typeof i == "function" ? (t.refCleanup = i(l)) : (i.current = l);
        }
      } catch (f) {
        st(t, r, f);
      }
    }
    function dr(t, r) {
      var i = t.ref,
        l = t.refCleanup;
      if (i !== null)
        if (typeof l == "function")
          try {
            l();
          } catch (f) {
            st(t, r, f);
          } finally {
            ((t.refCleanup = null),
              (t = t.alternate),
              t != null && (t.refCleanup = null));
          }
        else if (typeof i == "function")
          try {
            i(null);
          } catch (f) {
            st(t, r, f);
          }
        else i.current = null;
    }
    function C1(t) {
      var r = t.type,
        i = t.memoizedProps,
        l = t.stateNode;
      try {
        e: switch (r) {
          case "button":
          case "input":
          case "select":
          case "textarea":
            i.autoFocus && l.focus();
            break e;
          case "img":
            i.src ? (l.src = i.src) : i.srcSet && (l.srcset = i.srcSet);
        }
      } catch (f) {
        st(t, t.return, f);
      }
    }
    function $h(t, r, i) {
      try {
        var l = t.stateNode;
        (d6(l, t.type, i, r), (l[dn] = r));
      } catch (f) {
        st(t, t.return, f);
      }
    }
    function w1(t) {
      return (
        t.tag === 5 ||
        t.tag === 3 ||
        t.tag === 26 ||
        (t.tag === 27 && da(t.type)) ||
        t.tag === 4
      );
    }
    function Ih(t) {
      e: for (;;) {
        for (; t.sibling === null; ) {
          if (t.return === null || w1(t.return)) return null;
          t = t.return;
        }
        for (
          t.sibling.return = t.return, t = t.sibling;
          t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
        ) {
          if (
            (t.tag === 27 && da(t.type)) ||
            t.flags & 2 ||
            t.child === null ||
            t.tag === 4
          )
            continue e;
          ((t.child.return = t), (t = t.child));
        }
        if (!(t.flags & 2)) return t.stateNode;
      }
    }
    function Hh(t, r, i) {
      var l = t.tag;
      if (l === 5 || l === 6)
        ((t = t.stateNode),
          r
            ? (i.nodeType === 9
                ? i.body
                : i.nodeName === "HTML"
                  ? i.ownerDocument.body
                  : i
              ).insertBefore(t, r)
            : ((r =
                i.nodeType === 9
                  ? i.body
                  : i.nodeName === "HTML"
                    ? i.ownerDocument.body
                    : i),
              r.appendChild(t),
              (i = i._reactRootContainer),
              i != null || r.onclick !== null || (r.onclick = hc)));
      else if (
        l !== 4 &&
        (l === 27 && da(t.type) && ((i = t.stateNode), (r = null)),
        (t = t.child),
        t !== null)
      )
        for (Hh(t, r, i), t = t.sibling; t !== null; )
          (Hh(t, r, i), (t = t.sibling));
    }
    function rc(t, r, i) {
      var l = t.tag;
      if (l === 5 || l === 6)
        ((t = t.stateNode), r ? i.insertBefore(t, r) : i.appendChild(t));
      else if (
        l !== 4 &&
        (l === 27 && da(t.type) && (i = t.stateNode), (t = t.child), t !== null)
      )
        for (rc(t, r, i), t = t.sibling; t !== null; )
          (rc(t, r, i), (t = t.sibling));
    }
    function R1(t) {
      var r = t.stateNode,
        i = t.memoizedProps;
      try {
        for (var l = t.type, f = r.attributes; f.length; )
          r.removeAttributeNode(f[0]);
        (Yt(r, l, i), (r[en] = t), (r[dn] = i));
      } catch (p) {
        st(t, t.return, p);
      }
    }
    var Br = !1,
      Mt = !1,
      Ph = !1,
      A1 = typeof WeakSet == "function" ? WeakSet : Set,
      Ht = null;
    function Vk(t, r) {
      if (((t = t.containerInfo), (dm = Ec), (t = $S(t)), Ip(t))) {
        if ("selectionStart" in t)
          var i = { start: t.selectionStart, end: t.selectionEnd };
        else
          e: {
            i = ((i = t.ownerDocument) && i.defaultView) || window;
            var l = i.getSelection && i.getSelection();
            if (l && l.rangeCount !== 0) {
              i = l.anchorNode;
              var f = l.anchorOffset,
                p = l.focusNode;
              l = l.focusOffset;
              try {
                (i.nodeType, p.nodeType);
              } catch {
                i = null;
                break e;
              }
              var y = 0,
                T = -1,
                k = -1,
                $ = 0,
                Z = 0,
                ne = t,
                H = null;
              t: for (;;) {
                for (
                  var F;
                  ne !== i || (f !== 0 && ne.nodeType !== 3) || (T = y + f),
                    ne !== p || (l !== 0 && ne.nodeType !== 3) || (k = y + l),
                    ne.nodeType === 3 && (y += ne.nodeValue.length),
                    (F = ne.firstChild) !== null;
                )
                  ((H = ne), (ne = F));
                for (;;) {
                  if (ne === t) break t;
                  if (
                    (H === i && ++$ === f && (T = y),
                    H === p && ++Z === l && (k = y),
                    (F = ne.nextSibling) !== null)
                  )
                    break;
                  ((ne = H), (H = ne.parentNode));
                }
                ne = F;
              }
              i = T === -1 || k === -1 ? null : { start: T, end: k };
            } else i = null;
          }
        i = i || { start: 0, end: 0 };
      } else i = null;
      for (
        pm = { focusedElem: t, selectionRange: i }, Ec = !1, Ht = r;
        Ht !== null;
      )
        if (
          ((r = Ht), (t = r.child), (r.subtreeFlags & 1024) !== 0 && t !== null)
        )
          ((t.return = r), (Ht = t));
        else
          for (; Ht !== null; ) {
            switch (((r = Ht), (p = r.alternate), (t = r.flags), r.tag)) {
              case 0:
                break;
              case 11:
              case 15:
                break;
              case 1:
                if ((t & 1024) !== 0 && p !== null) {
                  ((t = void 0),
                    (i = r),
                    (f = p.memoizedProps),
                    (p = p.memoizedState),
                    (l = i.stateNode));
                  try {
                    var Se = eo(i.type, f, i.elementType === i.type);
                    ((t = l.getSnapshotBeforeUpdate(Se, p)),
                      (l.__reactInternalSnapshotBeforeUpdate = t));
                  } catch (ye) {
                    st(i, i.return, ye);
                  }
                }
                break;
              case 3:
                if ((t & 1024) !== 0) {
                  if (
                    ((t = r.stateNode.containerInfo), (i = t.nodeType), i === 9)
                  )
                    gm(t);
                  else if (i === 1)
                    switch (t.nodeName) {
                      case "HEAD":
                      case "HTML":
                      case "BODY":
                        gm(t);
                        break;
                      default:
                        t.textContent = "";
                    }
                }
                break;
              case 5:
              case 26:
              case 27:
              case 6:
              case 4:
              case 17:
                break;
              default:
                if ((t & 1024) !== 0) throw Error(o(163));
            }
            if (((t = r.sibling), t !== null)) {
              ((t.return = r.return), (Ht = t));
              break;
            }
            Ht = r.return;
          }
    }
    function O1(t, r, i) {
      var l = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          (oa(t, i), l & 4 && As(5, i));
          break;
        case 1:
          if ((oa(t, i), l & 4))
            if (((t = i.stateNode), r === null))
              try {
                t.componentDidMount();
              } catch (y) {
                st(i, i.return, y);
              }
            else {
              var f = eo(i.type, r.memoizedProps);
              r = r.memoizedState;
              try {
                t.componentDidUpdate(
                  f,
                  r,
                  t.__reactInternalSnapshotBeforeUpdate,
                );
              } catch (y) {
                st(i, i.return, y);
              }
            }
          (l & 64 && T1(i), l & 512 && Os(i, i.return));
          break;
        case 3:
          if ((oa(t, i), l & 64 && ((t = i.updateQueue), t !== null))) {
            if (((r = null), i.child !== null))
              switch (i.child.tag) {
                case 27:
                case 5:
                  r = i.child.stateNode;
                  break;
                case 1:
                  r = i.child.stateNode;
              }
            try {
              cE(t, r);
            } catch (y) {
              st(i, i.return, y);
            }
          }
          break;
        case 27:
          r === null && l & 4 && R1(i);
        case 26:
        case 5:
          (oa(t, i), r === null && l & 4 && C1(i), l & 512 && Os(i, i.return));
          break;
        case 12:
          oa(t, i);
          break;
        case 13:
          (oa(t, i),
            l & 4 && N1(t, i),
            l & 64 &&
              ((t = i.memoizedState),
              t !== null &&
                ((t = t.dehydrated),
                t !== null && ((i = t6.bind(null, i)), v6(t, i)))));
          break;
        case 22:
          if (((l = i.memoizedState !== null || Br), !l)) {
            ((r = (r !== null && r.memoizedState !== null) || Mt), (f = Br));
            var p = Mt;
            ((Br = l),
              (Mt = r) && !p
                ? ia(t, i, (i.subtreeFlags & 8772) !== 0)
                : oa(t, i),
              (Br = f),
              (Mt = p));
          }
          break;
        case 30:
          break;
        default:
          oa(t, i);
      }
    }
    function M1(t) {
      var r = t.alternate;
      (r !== null && ((t.alternate = null), M1(r)),
        (t.child = null),
        (t.deletions = null),
        (t.sibling = null),
        t.tag === 5 && ((r = t.stateNode), r !== null && Ep(r)),
        (t.stateNode = null),
        (t.return = null),
        (t.dependencies = null),
        (t.memoizedProps = null),
        (t.memoizedState = null),
        (t.pendingProps = null),
        (t.stateNode = null),
        (t.updateQueue = null));
    }
    var pt = null,
      mn = !1;
    function Lr(t, r, i) {
      for (i = i.child; i !== null; ) (D1(t, r, i), (i = i.sibling));
    }
    function D1(t, r, i) {
      if (Tt && typeof Tt.onCommitFiberUnmount == "function")
        try {
          Tt.onCommitFiberUnmount(fn, i);
        } catch {}
      switch (i.tag) {
        case 26:
          (Mt || dr(i, r),
            Lr(t, r, i),
            i.memoizedState
              ? i.memoizedState.count--
              : i.stateNode &&
                ((i = i.stateNode), i.parentNode.removeChild(i)));
          break;
        case 27:
          Mt || dr(i, r);
          var l = pt,
            f = mn;
          (da(i.type) && ((pt = i.stateNode), (mn = !1)),
            Lr(t, r, i),
            js(i.stateNode),
            (pt = l),
            (mn = f));
          break;
        case 5:
          Mt || dr(i, r);
        case 6:
          if (
            ((l = pt),
            (f = mn),
            (pt = null),
            Lr(t, r, i),
            (pt = l),
            (mn = f),
            pt !== null)
          )
            if (mn)
              try {
                (pt.nodeType === 9
                  ? pt.body
                  : pt.nodeName === "HTML"
                    ? pt.ownerDocument.body
                    : pt
                ).removeChild(i.stateNode);
              } catch (p) {
                st(i, r, p);
              }
            else
              try {
                pt.removeChild(i.stateNode);
              } catch (p) {
                st(i, r, p);
              }
          break;
        case 18:
          pt !== null &&
            (mn
              ? ((t = pt),
                v_(
                  t.nodeType === 9
                    ? t.body
                    : t.nodeName === "HTML"
                      ? t.ownerDocument.body
                      : t,
                  i.stateNode,
                ),
                Vs(t))
              : v_(pt, i.stateNode));
          break;
        case 4:
          ((l = pt),
            (f = mn),
            (pt = i.stateNode.containerInfo),
            (mn = !0),
            Lr(t, r, i),
            (pt = l),
            (mn = f));
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          (Mt || aa(2, i, r), Mt || aa(4, i, r), Lr(t, r, i));
          break;
        case 1:
          (Mt ||
            (dr(i, r),
            (l = i.stateNode),
            typeof l.componentWillUnmount == "function" && x1(i, r, l)),
            Lr(t, r, i));
          break;
        case 21:
          Lr(t, r, i);
          break;
        case 22:
          ((Mt = (l = Mt) || i.memoizedState !== null), Lr(t, r, i), (Mt = l));
          break;
        default:
          Lr(t, r, i);
      }
    }
    function N1(t, r) {
      if (
        r.memoizedState === null &&
        ((t = r.alternate),
        t !== null &&
          ((t = t.memoizedState),
          t !== null && ((t = t.dehydrated), t !== null)))
      )
        try {
          Vs(t);
        } catch (i) {
          st(r, r.return, i);
        }
    }
    function Kk(t) {
      switch (t.tag) {
        case 13:
        case 19:
          var r = t.stateNode;
          return (r === null && (r = t.stateNode = new A1()), r);
        case 22:
          return (
            (t = t.stateNode),
            (r = t._retryCache),
            r === null && (r = t._retryCache = new A1()),
            r
          );
        default:
          throw Error(o(435, t.tag));
      }
    }
    function qh(t, r) {
      var i = Kk(t);
      r.forEach(function (l) {
        var f = n6.bind(null, t, l);
        i.has(l) || (i.add(l), l.then(f, f));
      });
    }
    function Tn(t, r) {
      var i = r.deletions;
      if (i !== null)
        for (var l = 0; l < i.length; l++) {
          var f = i[l],
            p = t,
            y = r,
            T = y;
          e: for (; T !== null; ) {
            switch (T.tag) {
              case 27:
                if (da(T.type)) {
                  ((pt = T.stateNode), (mn = !1));
                  break e;
                }
                break;
              case 5:
                ((pt = T.stateNode), (mn = !1));
                break e;
              case 3:
              case 4:
                ((pt = T.stateNode.containerInfo), (mn = !0));
                break e;
            }
            T = T.return;
          }
          if (pt === null) throw Error(o(160));
          (D1(p, y, f),
            (pt = null),
            (mn = !1),
            (p = f.alternate),
            p !== null && (p.return = null),
            (f.return = null));
        }
      if (r.subtreeFlags & 13878)
        for (r = r.child; r !== null; ) (k1(r, t), (r = r.sibling));
    }
    var Qn = null;
    function k1(t, r) {
      var i = t.alternate,
        l = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Tn(r, t),
            xn(t),
            l & 4 && (aa(3, t, t.return), As(3, t), aa(5, t, t.return)));
          break;
        case 1:
          (Tn(r, t),
            xn(t),
            l & 512 && (Mt || i === null || dr(i, i.return)),
            l & 64 &&
              Br &&
              ((t = t.updateQueue),
              t !== null &&
                ((l = t.callbacks),
                l !== null &&
                  ((i = t.shared.hiddenCallbacks),
                  (t.shared.hiddenCallbacks = i === null ? l : i.concat(l))))));
          break;
        case 26:
          var f = Qn;
          if (
            (Tn(r, t),
            xn(t),
            l & 512 && (Mt || i === null || dr(i, i.return)),
            l & 4)
          ) {
            var p = i !== null ? i.memoizedState : null;
            if (((l = t.memoizedState), i === null))
              if (l === null)
                if (t.stateNode === null) {
                  e: {
                    ((l = t.type),
                      (i = t.memoizedProps),
                      (f = f.ownerDocument || f));
                    t: switch (l) {
                      case "title":
                        ((p = f.getElementsByTagName("title")[0]),
                          (!p ||
                            p[Ji] ||
                            p[en] ||
                            p.namespaceURI === "http://www.w3.org/2000/svg" ||
                            p.hasAttribute("itemprop")) &&
                            ((p = f.createElement(l)),
                            f.head.insertBefore(
                              p,
                              f.querySelector("head > title"),
                            )),
                          Yt(p, l, i),
                          (p[en] = t),
                          $t(p),
                          (l = p));
                        break e;
                      case "link":
                        var y = R_("link", "href", f).get(l + (i.href || ""));
                        if (y) {
                          for (var T = 0; T < y.length; T++)
                            if (
                              ((p = y[T]),
                              p.getAttribute("href") ===
                                (i.href == null || i.href === ""
                                  ? null
                                  : i.href) &&
                                p.getAttribute("rel") ===
                                  (i.rel == null ? null : i.rel) &&
                                p.getAttribute("title") ===
                                  (i.title == null ? null : i.title) &&
                                p.getAttribute("crossorigin") ===
                                  (i.crossOrigin == null
                                    ? null
                                    : i.crossOrigin))
                            ) {
                              y.splice(T, 1);
                              break t;
                            }
                        }
                        ((p = f.createElement(l)),
                          Yt(p, l, i),
                          f.head.appendChild(p));
                        break;
                      case "meta":
                        if (
                          (y = R_("meta", "content", f).get(
                            l + (i.content || ""),
                          ))
                        ) {
                          for (T = 0; T < y.length; T++)
                            if (
                              ((p = y[T]),
                              p.getAttribute("content") ===
                                (i.content == null ? null : "" + i.content) &&
                                p.getAttribute("name") ===
                                  (i.name == null ? null : i.name) &&
                                p.getAttribute("property") ===
                                  (i.property == null ? null : i.property) &&
                                p.getAttribute("http-equiv") ===
                                  (i.httpEquiv == null ? null : i.httpEquiv) &&
                                p.getAttribute("charset") ===
                                  (i.charSet == null ? null : i.charSet))
                            ) {
                              y.splice(T, 1);
                              break t;
                            }
                        }
                        ((p = f.createElement(l)),
                          Yt(p, l, i),
                          f.head.appendChild(p));
                        break;
                      default:
                        throw Error(o(468, l));
                    }
                    ((p[en] = t), $t(p), (l = p));
                  }
                  t.stateNode = l;
                } else A_(f, t.type, t.stateNode);
              else t.stateNode = w_(f, l, t.memoizedProps);
            else
              p !== l
                ? (p === null
                    ? i.stateNode !== null &&
                      ((i = i.stateNode), i.parentNode.removeChild(i))
                    : p.count--,
                  l === null
                    ? A_(f, t.type, t.stateNode)
                    : w_(f, l, t.memoizedProps))
                : l === null &&
                  t.stateNode !== null &&
                  $h(t, t.memoizedProps, i.memoizedProps);
          }
          break;
        case 27:
          (Tn(r, t),
            xn(t),
            l & 512 && (Mt || i === null || dr(i, i.return)),
            i !== null && l & 4 && $h(t, t.memoizedProps, i.memoizedProps));
          break;
        case 5:
          if (
            (Tn(r, t),
            xn(t),
            l & 512 && (Mt || i === null || dr(i, i.return)),
            t.flags & 32)
          ) {
            f = t.stateNode;
            try {
              zo(f, "");
            } catch (F) {
              st(t, t.return, F);
            }
          }
          (l & 4 &&
            t.stateNode != null &&
            ((f = t.memoizedProps), $h(t, f, i !== null ? i.memoizedProps : f)),
            l & 1024 && (Ph = !0));
          break;
        case 6:
          if ((Tn(r, t), xn(t), l & 4)) {
            if (t.stateNode === null) throw Error(o(162));
            ((l = t.memoizedProps), (i = t.stateNode));
            try {
              i.nodeValue = l;
            } catch (F) {
              st(t, t.return, F);
            }
          }
          break;
        case 3:
          if (
            ((bc = null),
            (f = Qn),
            (Qn = gc(r.containerInfo)),
            Tn(r, t),
            (Qn = f),
            xn(t),
            l & 4 && i !== null && i.memoizedState.isDehydrated)
          )
            try {
              Vs(r.containerInfo);
            } catch (F) {
              st(t, t.return, F);
            }
          Ph && ((Ph = !1), z1(t));
          break;
        case 4:
          ((l = Qn),
            (Qn = gc(t.stateNode.containerInfo)),
            Tn(r, t),
            xn(t),
            (Qn = l));
          break;
        case 12:
          (Tn(r, t), xn(t));
          break;
        case 13:
          (Tn(r, t),
            xn(t),
            t.child.flags & 8192 &&
              (t.memoizedState !== null) !=
                (i !== null && i.memoizedState !== null) &&
              (Xh = We()),
            l & 4 &&
              ((l = t.updateQueue),
              l !== null && ((t.updateQueue = null), qh(t, l))));
          break;
        case 22:
          f = t.memoizedState !== null;
          var k = i !== null && i.memoizedState !== null,
            $ = Br,
            Z = Mt;
          if (
            ((Br = $ || f),
            (Mt = Z || k),
            Tn(r, t),
            (Mt = Z),
            (Br = $),
            xn(t),
            l & 8192)
          )
            e: for (
              r = t.stateNode,
                r._visibility = f ? r._visibility & -2 : r._visibility | 1,
                f && (i === null || k || Br || Mt || to(t)),
                i = null,
                r = t;
              ;
            ) {
              if (r.tag === 5 || r.tag === 26) {
                if (i === null) {
                  k = i = r;
                  try {
                    if (((p = k.stateNode), f))
                      ((y = p.style),
                        typeof y.setProperty == "function"
                          ? y.setProperty("display", "none", "important")
                          : (y.display = "none"));
                    else {
                      T = k.stateNode;
                      var ne = k.memoizedProps.style,
                        H =
                          ne != null && ne.hasOwnProperty("display")
                            ? ne.display
                            : null;
                      T.style.display =
                        H == null || typeof H == "boolean"
                          ? ""
                          : ("" + H).trim();
                    }
                  } catch (F) {
                    st(k, k.return, F);
                  }
                }
              } else if (r.tag === 6) {
                if (i === null) {
                  k = r;
                  try {
                    k.stateNode.nodeValue = f ? "" : k.memoizedProps;
                  } catch (F) {
                    st(k, k.return, F);
                  }
                }
              } else if (
                ((r.tag !== 22 && r.tag !== 23) ||
                  r.memoizedState === null ||
                  r === t) &&
                r.child !== null
              ) {
                ((r.child.return = r), (r = r.child));
                continue;
              }
              if (r === t) break e;
              for (; r.sibling === null; ) {
                if (r.return === null || r.return === t) break e;
                (i === r && (i = null), (r = r.return));
              }
              (i === r && (i = null),
                (r.sibling.return = r.return),
                (r = r.sibling));
            }
          l & 4 &&
            ((l = t.updateQueue),
            l !== null &&
              ((i = l.retryQueue),
              i !== null && ((l.retryQueue = null), qh(t, i))));
          break;
        case 19:
          (Tn(r, t),
            xn(t),
            l & 4 &&
              ((l = t.updateQueue),
              l !== null && ((t.updateQueue = null), qh(t, l))));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          (Tn(r, t), xn(t));
      }
    }
    function xn(t) {
      var r = t.flags;
      if (r & 2) {
        try {
          for (var i, l = t.return; l !== null; ) {
            if (w1(l)) {
              i = l;
              break;
            }
            l = l.return;
          }
          if (i == null) throw Error(o(160));
          switch (i.tag) {
            case 27:
              var f = i.stateNode,
                p = Ih(t);
              rc(t, p, f);
              break;
            case 5:
              var y = i.stateNode;
              i.flags & 32 && (zo(y, ""), (i.flags &= -33));
              var T = Ih(t);
              rc(t, T, y);
              break;
            case 3:
            case 4:
              var k = i.stateNode.containerInfo,
                $ = Ih(t);
              Hh(t, $, k);
              break;
            default:
              throw Error(o(161));
          }
        } catch (Z) {
          st(t, t.return, Z);
        }
        t.flags &= -3;
      }
      r & 4096 && (t.flags &= -4097);
    }
    function z1(t) {
      if (t.subtreeFlags & 1024)
        for (t = t.child; t !== null; ) {
          var r = t;
          (z1(r),
            r.tag === 5 && r.flags & 1024 && r.stateNode.reset(),
            (t = t.sibling));
        }
    }
    function oa(t, r) {
      if (r.subtreeFlags & 8772)
        for (r = r.child; r !== null; )
          (O1(t, r.alternate, r), (r = r.sibling));
    }
    function to(t) {
      for (t = t.child; t !== null; ) {
        var r = t;
        switch (r.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            (aa(4, r, r.return), to(r));
            break;
          case 1:
            dr(r, r.return);
            var i = r.stateNode;
            (typeof i.componentWillUnmount == "function" && x1(r, r.return, i),
              to(r));
            break;
          case 27:
            js(r.stateNode);
          case 26:
          case 5:
            (dr(r, r.return), to(r));
            break;
          case 22:
            r.memoizedState === null && to(r);
            break;
          case 30:
            to(r);
            break;
          default:
            to(r);
        }
        t = t.sibling;
      }
    }
    function ia(t, r, i) {
      for (i = i && (r.subtreeFlags & 8772) !== 0, r = r.child; r !== null; ) {
        var l = r.alternate,
          f = t,
          p = r,
          y = p.flags;
        switch (p.tag) {
          case 0:
          case 11:
          case 15:
            (ia(f, p, i), As(4, p));
            break;
          case 1:
            if (
              (ia(f, p, i),
              (l = p),
              (f = l.stateNode),
              typeof f.componentDidMount == "function")
            )
              try {
                f.componentDidMount();
              } catch ($) {
                st(l, l.return, $);
              }
            if (((l = p), (f = l.updateQueue), f !== null)) {
              var T = l.stateNode;
              try {
                var k = f.shared.hiddenCallbacks;
                if (k !== null)
                  for (
                    f.shared.hiddenCallbacks = null, f = 0;
                    f < k.length;
                    f++
                  )
                    uE(k[f], T);
              } catch ($) {
                st(l, l.return, $);
              }
            }
            (i && y & 64 && T1(p), Os(p, p.return));
            break;
          case 27:
            R1(p);
          case 26:
          case 5:
            (ia(f, p, i), i && l === null && y & 4 && C1(p), Os(p, p.return));
            break;
          case 12:
            ia(f, p, i);
            break;
          case 13:
            (ia(f, p, i), i && y & 4 && N1(f, p));
            break;
          case 22:
            (p.memoizedState === null && ia(f, p, i), Os(p, p.return));
            break;
          case 30:
            break;
          default:
            ia(f, p, i);
        }
        r = r.sibling;
      }
    }
    function Fh(t, r) {
      var i = null;
      (t !== null &&
        t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (i = t.memoizedState.cachePool.pool),
        (t = null),
        r.memoizedState !== null &&
          r.memoizedState.cachePool !== null &&
          (t = r.memoizedState.cachePool.pool),
        t !== i && (t != null && t.refCount++, i != null && hs(i)));
    }
    function Gh(t, r) {
      ((t = null),
        r.alternate !== null && (t = r.alternate.memoizedState.cache),
        (r = r.memoizedState.cache),
        r !== t && (r.refCount++, t != null && hs(t)));
    }
    function pr(t, r, i, l) {
      if (r.subtreeFlags & 10256)
        for (r = r.child; r !== null; ) (B1(t, r, i, l), (r = r.sibling));
    }
    function B1(t, r, i, l) {
      var f = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          (pr(t, r, i, l), f & 2048 && As(9, r));
          break;
        case 1:
          pr(t, r, i, l);
          break;
        case 3:
          (pr(t, r, i, l),
            f & 2048 &&
              ((t = null),
              r.alternate !== null && (t = r.alternate.memoizedState.cache),
              (r = r.memoizedState.cache),
              r !== t && (r.refCount++, t != null && hs(t))));
          break;
        case 12:
          if (f & 2048) {
            (pr(t, r, i, l), (t = r.stateNode));
            try {
              var p = r.memoizedProps,
                y = p.id,
                T = p.onPostCommit;
              typeof T == "function" &&
                T(
                  y,
                  r.alternate === null ? "mount" : "update",
                  t.passiveEffectDuration,
                  -0,
                );
            } catch (k) {
              st(r, r.return, k);
            }
          } else pr(t, r, i, l);
          break;
        case 13:
          pr(t, r, i, l);
          break;
        case 23:
          break;
        case 22:
          ((p = r.stateNode),
            (y = r.alternate),
            r.memoizedState !== null
              ? p._visibility & 2
                ? pr(t, r, i, l)
                : Ms(t, r)
              : p._visibility & 2
                ? pr(t, r, i, l)
                : ((p._visibility |= 2),
                  Jo(t, r, i, l, (r.subtreeFlags & 10256) !== 0)),
            f & 2048 && Fh(y, r));
          break;
        case 24:
          (pr(t, r, i, l), f & 2048 && Gh(r.alternate, r));
          break;
        default:
          pr(t, r, i, l);
      }
    }
    function Jo(t, r, i, l, f) {
      for (f = f && (r.subtreeFlags & 10256) !== 0, r = r.child; r !== null; ) {
        var p = t,
          y = r,
          T = i,
          k = l,
          $ = y.flags;
        switch (y.tag) {
          case 0:
          case 11:
          case 15:
            (Jo(p, y, T, k, f), As(8, y));
            break;
          case 23:
            break;
          case 22:
            var Z = y.stateNode;
            (y.memoizedState !== null
              ? Z._visibility & 2
                ? Jo(p, y, T, k, f)
                : Ms(p, y)
              : ((Z._visibility |= 2), Jo(p, y, T, k, f)),
              f && $ & 2048 && Fh(y.alternate, y));
            break;
          case 24:
            (Jo(p, y, T, k, f), f && $ & 2048 && Gh(y.alternate, y));
            break;
          default:
            Jo(p, y, T, k, f);
        }
        r = r.sibling;
      }
    }
    function Ms(t, r) {
      if (r.subtreeFlags & 10256)
        for (r = r.child; r !== null; ) {
          var i = t,
            l = r,
            f = l.flags;
          switch (l.tag) {
            case 22:
              (Ms(i, l), f & 2048 && Fh(l.alternate, l));
              break;
            case 24:
              (Ms(i, l), f & 2048 && Gh(l.alternate, l));
              break;
            default:
              Ms(i, l);
          }
          r = r.sibling;
        }
    }
    var Ds = 8192;
    function ei(t) {
      if (t.subtreeFlags & Ds)
        for (t = t.child; t !== null; ) (L1(t), (t = t.sibling));
    }
    function L1(t) {
      switch (t.tag) {
        case 26:
          (ei(t),
            t.flags & Ds &&
              t.memoizedState !== null &&
              N6(Qn, t.memoizedState, t.memoizedProps));
          break;
        case 5:
          ei(t);
          break;
        case 3:
        case 4:
          var r = Qn;
          ((Qn = gc(t.stateNode.containerInfo)), ei(t), (Qn = r));
          break;
        case 22:
          t.memoizedState === null &&
            ((r = t.alternate),
            r !== null && r.memoizedState !== null
              ? ((r = Ds), (Ds = 16777216), ei(t), (Ds = r))
              : ei(t));
          break;
        default:
          ei(t);
      }
    }
    function U1(t) {
      var r = t.alternate;
      if (r !== null && ((t = r.child), t !== null)) {
        r.child = null;
        do ((r = t.sibling), (t.sibling = null), (t = r));
        while (t !== null);
      }
    }
    function Ns(t) {
      var r = t.deletions;
      if ((t.flags & 16) !== 0) {
        if (r !== null)
          for (var i = 0; i < r.length; i++) {
            var l = r[i];
            ((Ht = l), $1(l, t));
          }
        U1(t);
      }
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; ) (j1(t), (t = t.sibling));
    }
    function j1(t) {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          (Ns(t), t.flags & 2048 && aa(9, t, t.return));
          break;
        case 3:
          Ns(t);
          break;
        case 12:
          Ns(t);
          break;
        case 22:
          var r = t.stateNode;
          t.memoizedState !== null &&
          r._visibility & 2 &&
          (t.return === null || t.return.tag !== 13)
            ? ((r._visibility &= -3), ac(t))
            : Ns(t);
          break;
        default:
          Ns(t);
      }
    }
    function ac(t) {
      var r = t.deletions;
      if ((t.flags & 16) !== 0) {
        if (r !== null)
          for (var i = 0; i < r.length; i++) {
            var l = r[i];
            ((Ht = l), $1(l, t));
          }
        U1(t);
      }
      for (t = t.child; t !== null; ) {
        switch (((r = t), r.tag)) {
          case 0:
          case 11:
          case 15:
            (aa(8, r, r.return), ac(r));
            break;
          case 22:
            ((i = r.stateNode),
              i._visibility & 2 && ((i._visibility &= -3), ac(r)));
            break;
          default:
            ac(r);
        }
        t = t.sibling;
      }
    }
    function $1(t, r) {
      for (; Ht !== null; ) {
        var i = Ht;
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            aa(8, i, r);
            break;
          case 23:
          case 22:
            if (
              i.memoizedState !== null &&
              i.memoizedState.cachePool !== null
            ) {
              var l = i.memoizedState.cachePool.pool;
              l != null && l.refCount++;
            }
            break;
          case 24:
            hs(i.memoizedState.cache);
        }
        if (((l = i.child), l !== null)) ((l.return = i), (Ht = l));
        else
          e: for (i = t; Ht !== null; ) {
            l = Ht;
            var f = l.sibling,
              p = l.return;
            if ((M1(l), l === i)) {
              Ht = null;
              break e;
            }
            if (f !== null) {
              ((f.return = p), (Ht = f));
              break e;
            }
            Ht = p;
          }
      }
    }
    var Yk = {
        getCacheForType: function (t) {
          var r = tn(Bt),
            i = r.data.get(t);
          return (i === void 0 && ((i = t()), r.data.set(t, i)), i);
        },
      },
      Xk = typeof WeakMap == "function" ? WeakMap : Map,
      Qe = 0,
      lt = null,
      ze = null,
      Le = 0,
      Ze = 0,
      Cn = null,
      sa = !1,
      ti = !1,
      Vh = !1,
      Ur = 0,
      Ct = 0,
      la = 0,
      no = 0,
      Kh = 0,
      Hn = 0,
      ni = 0,
      ks = null,
      gn = null,
      Yh = !1,
      Xh = 0,
      oc = 1 / 0,
      ic = null,
      ua = null,
      Kt = 0,
      ca = null,
      ri = null,
      ai = 0,
      Wh = 0,
      Qh = null,
      I1 = null,
      zs = 0,
      Zh = null;
    function wn() {
      if ((Qe & 2) !== 0 && Le !== 0) return Le & -Le;
      if (z.T !== null) {
        var t = Go;
        return t !== 0 ? t : om();
      }
      return nS();
    }
    function H1() {
      Hn === 0 && (Hn = (Le & 536870912) === 0 || He ? Qi() : 536870912);
      var t = In.current;
      return (t !== null && (t.flags |= 32), Hn);
    }
    function Rn(t, r, i) {
      (((t === lt && (Ze === 2 || Ze === 9)) ||
        t.cancelPendingCommit !== null) &&
        (oi(t, 0), fa(t, Le, Hn, !1)),
        Zi(t, i),
        ((Qe & 2) === 0 || t !== lt) &&
          (t === lt &&
            ((Qe & 2) === 0 && (no |= i), Ct === 4 && fa(t, Le, Hn, !1)),
          hr(t)));
    }
    function P1(t, r, i) {
      if ((Qe & 6) !== 0) throw Error(o(327));
      var l = (!i && (r & 124) === 0 && (r & t.expiredLanes) === 0) || yt(t, r),
        f = l ? Zk(t, r) : tm(t, r, !0),
        p = l;
      do {
        if (f === 0) {
          ti && !l && fa(t, r, 0, !1);
          break;
        } else {
          if (((i = t.current.alternate), p && !Wk(i))) {
            ((f = tm(t, r, !1)), (p = !1));
            continue;
          }
          if (f === 2) {
            if (((p = r), t.errorRecoveryDisabledLanes & p)) var y = 0;
            else
              ((y = t.pendingLanes & -536870913),
                (y = y !== 0 ? y : y & 536870912 ? 536870912 : 0));
            if (y !== 0) {
              r = y;
              e: {
                var T = t;
                f = ks;
                var k = T.current.memoizedState.isDehydrated;
                if (
                  (k && (oi(T, y).flags |= 256), (y = tm(T, y, !1)), y !== 2)
                ) {
                  if (Vh && !k) {
                    ((T.errorRecoveryDisabledLanes |= p), (no |= p), (f = 4));
                    break e;
                  }
                  ((p = gn),
                    (gn = f),
                    p !== null &&
                      (gn === null ? (gn = p) : gn.push.apply(gn, p)));
                }
                f = y;
              }
              if (((p = !1), f !== 2)) continue;
            }
          }
          if (f === 1) {
            (oi(t, 0), fa(t, r, 0, !0));
            break;
          }
          e: {
            switch (((l = t), (p = f), p)) {
              case 0:
              case 1:
                throw Error(o(345));
              case 4:
                if ((r & 4194048) !== r) break;
              case 6:
                fa(l, r, Hn, !sa);
                break e;
              case 2:
                gn = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(o(329));
            }
            if ((r & 62914560) === r && ((f = Xh + 300 - We()), 10 < f)) {
              if ((fa(l, r, Hn, !sa), Ge(l, 0, !0) !== 0)) break e;
              l.timeoutHandle = y_(
                q1.bind(null, l, i, gn, ic, Yh, r, Hn, no, ni, sa, p, 2, -0, 0),
                f,
              );
              break e;
            }
            q1(l, i, gn, ic, Yh, r, Hn, no, ni, sa, p, 0, -0, 0);
          }
        }
        break;
      } while (!0);
      hr(t);
    }
    function q1(t, r, i, l, f, p, y, T, k, $, Z, ne, H, F) {
      if (
        ((t.timeoutHandle = -1),
        (ne = r.subtreeFlags),
        (ne & 8192 || (ne & 16785408) === 16785408) &&
          ((Hs = { stylesheets: null, count: 0, unsuspend: D6 }),
          L1(r),
          (ne = k6()),
          ne !== null))
      ) {
        ((t.cancelPendingCommit = ne(
          W1.bind(null, t, r, p, i, l, f, y, T, k, Z, 1, H, F),
        )),
          fa(t, p, y, !$));
        return;
      }
      W1(t, r, p, i, l, f, y, T, k);
    }
    function Wk(t) {
      for (var r = t; ; ) {
        var i = r.tag;
        if (
          (i === 0 || i === 11 || i === 15) &&
          r.flags & 16384 &&
          ((i = r.updateQueue), i !== null && ((i = i.stores), i !== null))
        )
          for (var l = 0; l < i.length; l++) {
            var f = i[l],
              p = f.getSnapshot;
            f = f.value;
            try {
              if (!En(p(), f)) return !1;
            } catch {
              return !1;
            }
          }
        if (((i = r.child), r.subtreeFlags & 16384 && i !== null))
          ((i.return = r), (r = i));
        else {
          if (r === t) break;
          for (; r.sibling === null; ) {
            if (r.return === null || r.return === t) return !0;
            r = r.return;
          }
          ((r.sibling.return = r.return), (r = r.sibling));
        }
      }
      return !0;
    }
    function fa(t, r, i, l) {
      ((r &= ~Kh),
        (r &= ~no),
        (t.suspendedLanes |= r),
        (t.pingedLanes &= ~r),
        l && (t.warmLanes |= r),
        (l = t.expirationTimes));
      for (var f = r; 0 < f; ) {
        var p = 31 - gt(f),
          y = 1 << p;
        ((l[p] = -1), (f &= ~y));
      }
      i !== 0 && eS(t, i, r);
    }
    function sc() {
      return (Qe & 6) === 0 ? (Bs(0), !1) : !0;
    }
    function Jh() {
      if (ze !== null) {
        if (Ze === 0) var t = ze.return;
        else
          ((t = ze), (Or = Wa = null), gh(t), (Qo = null), (Cs = 0), (t = ze));
        for (; t !== null; ) (_1(t.alternate, t), (t = t.return));
        ze = null;
      }
    }
    function oi(t, r) {
      var i = t.timeoutHandle;
      (i !== -1 && ((t.timeoutHandle = -1), h6(i)),
        (i = t.cancelPendingCommit),
        i !== null && ((t.cancelPendingCommit = null), i()),
        Jh(),
        (lt = t),
        (ze = i = wr(t.current, null)),
        (Le = r),
        (Ze = 0),
        (Cn = null),
        (sa = !1),
        (ti = yt(t, r)),
        (Vh = !1),
        (ni = Hn = Kh = no = la = Ct = 0),
        (gn = ks = null),
        (Yh = !1),
        (r & 8) !== 0 && (r |= r & 32));
      var l = t.entangledLanes;
      if (l !== 0)
        for (t = t.entanglements, l &= r; 0 < l; ) {
          var f = 31 - gt(l),
            p = 1 << f;
          ((r |= t[f]), (l &= ~p));
        }
      return ((Ur = r), Ou(), i);
    }
    function F1(t, r) {
      ((De = null),
        (z.H = Yu),
        r === gs || r === ju
          ? ((r = sE()), (Ze = 3))
          : r === aE
            ? ((r = sE()), (Ze = 4))
            : (Ze =
                r === l1
                  ? 8
                  : r !== null &&
                      typeof r == "object" &&
                      typeof r.then == "function"
                    ? 6
                    : 1),
        (Cn = r),
        ze === null && ((Ct = 1), Ju(t, Ln(r, t.current))));
    }
    function G1() {
      var t = z.H;
      return ((z.H = Yu), t === null ? Yu : t);
    }
    function V1() {
      var t = z.A;
      return ((z.A = Yk), t);
    }
    function em() {
      ((Ct = 4),
        sa || ((Le & 4194048) !== Le && In.current !== null) || (ti = !0),
        ((la & 134217727) === 0 && (no & 134217727) === 0) ||
          lt === null ||
          fa(lt, Le, Hn, !1));
    }
    function tm(t, r, i) {
      var l = Qe;
      Qe |= 2;
      var f = G1(),
        p = V1();
      ((lt !== t || Le !== r) && ((ic = null), oi(t, r)), (r = !1));
      var y = Ct;
      e: do
        try {
          if (Ze !== 0 && ze !== null) {
            var T = ze,
              k = Cn;
            switch (Ze) {
              case 8:
                (Jh(), (y = 6));
                break e;
              case 3:
              case 2:
              case 9:
              case 6:
                In.current === null && (r = !0);
                var $ = Ze;
                if (((Ze = 0), (Cn = null), ii(t, T, k, $), i && ti)) {
                  y = 0;
                  break e;
                }
                break;
              default:
                (($ = Ze), (Ze = 0), (Cn = null), ii(t, T, k, $));
            }
          }
          (Qk(), (y = Ct));
          break;
        } catch (Z) {
          F1(t, Z);
        }
      while (!0);
      return (
        r && t.shellSuspendCounter++,
        (Or = Wa = null),
        (Qe = l),
        (z.H = f),
        (z.A = p),
        ze === null && ((lt = null), (Le = 0), Ou()),
        y
      );
    }
    function Qk() {
      for (; ze !== null; ) K1(ze);
    }
    function Zk(t, r) {
      var i = Qe;
      Qe |= 2;
      var l = G1(),
        f = V1();
      lt !== t || Le !== r
        ? ((ic = null), (oc = We() + 500), oi(t, r))
        : (ti = yt(t, r));
      e: do
        try {
          if (Ze !== 0 && ze !== null) {
            r = ze;
            var p = Cn;
            t: switch (Ze) {
              case 1:
                ((Ze = 0), (Cn = null), ii(t, r, p, 1));
                break;
              case 2:
              case 9:
                if (oE(p)) {
                  ((Ze = 0), (Cn = null), Y1(r));
                  break;
                }
                ((r = function () {
                  ((Ze !== 2 && Ze !== 9) || lt !== t || (Ze = 7), hr(t));
                }),
                  p.then(r, r));
                break e;
              case 3:
                Ze = 7;
                break e;
              case 4:
                Ze = 5;
                break e;
              case 7:
                oE(p)
                  ? ((Ze = 0), (Cn = null), Y1(r))
                  : ((Ze = 0), (Cn = null), ii(t, r, p, 7));
                break;
              case 5:
                var y = null;
                switch (ze.tag) {
                  case 26:
                    y = ze.memoizedState;
                  case 5:
                  case 27:
                    var T = ze;
                    if (!y || O_(y)) {
                      ((Ze = 0), (Cn = null));
                      var k = T.sibling;
                      if (k !== null) ze = k;
                      else {
                        var $ = T.return;
                        $ !== null ? ((ze = $), lc($)) : (ze = null);
                      }
                      break t;
                    }
                }
                ((Ze = 0), (Cn = null), ii(t, r, p, 5));
                break;
              case 6:
                ((Ze = 0), (Cn = null), ii(t, r, p, 6));
                break;
              case 8:
                (Jh(), (Ct = 6));
                break e;
              default:
                throw Error(o(462));
            }
          }
          Jk();
          break;
        } catch (Z) {
          F1(t, Z);
        }
      while (!0);
      return (
        (Or = Wa = null),
        (z.H = l),
        (z.A = f),
        (Qe = i),
        ze !== null ? 0 : ((lt = null), (Le = 0), Ou(), Ct)
      );
    }
    function Jk() {
      for (; ze !== null && !Xe(); ) K1(ze);
    }
    function K1(t) {
      var r = S1(t.alternate, t, Ur);
      ((t.memoizedProps = t.pendingProps), r === null ? lc(t) : (ze = r));
    }
    function Y1(t) {
      var r = t,
        i = r.alternate;
      switch (r.tag) {
        case 15:
        case 0:
          r = h1(i, r, r.pendingProps, r.type, void 0, Le);
          break;
        case 11:
          r = h1(i, r, r.pendingProps, r.type.render, r.ref, Le);
          break;
        case 5:
          gh(r);
        default:
          (_1(i, r), (r = ze = XS(r, Ur)), (r = S1(i, r, Ur)));
      }
      ((t.memoizedProps = t.pendingProps), r === null ? lc(t) : (ze = r));
    }
    function ii(t, r, i, l) {
      ((Or = Wa = null), gh(r), (Qo = null), (Cs = 0));
      var f = r.return;
      try {
        if (Pk(t, f, r, i, Le)) {
          ((Ct = 1), Ju(t, Ln(i, t.current)), (ze = null));
          return;
        }
      } catch (p) {
        if (f !== null) throw ((ze = f), p);
        ((Ct = 1), Ju(t, Ln(i, t.current)), (ze = null));
        return;
      }
      r.flags & 32768
        ? (He || l === 1
            ? (t = !0)
            : ti || (Le & 536870912) !== 0
              ? (t = !1)
              : ((sa = t = !0),
                (l === 2 || l === 9 || l === 3 || l === 6) &&
                  ((l = In.current),
                  l !== null && l.tag === 13 && (l.flags |= 16384))),
          X1(r, t))
        : lc(r);
    }
    function lc(t) {
      var r = t;
      do {
        if ((r.flags & 32768) !== 0) {
          X1(r, sa);
          return;
        }
        t = r.return;
        var i = Fk(r.alternate, r, Ur);
        if (i !== null) {
          ze = i;
          return;
        }
        if (((r = r.sibling), r !== null)) {
          ze = r;
          return;
        }
        ze = r = t;
      } while (r !== null);
      Ct === 0 && (Ct = 5);
    }
    function X1(t, r) {
      do {
        var i = Gk(t.alternate, t);
        if (i !== null) {
          ((i.flags &= 32767), (ze = i));
          return;
        }
        if (
          ((i = t.return),
          i !== null &&
            ((i.flags |= 32768), (i.subtreeFlags = 0), (i.deletions = null)),
          !r && ((t = t.sibling), t !== null))
        ) {
          ze = t;
          return;
        }
        ze = t = i;
      } while (t !== null);
      ((Ct = 6), (ze = null));
    }
    function W1(t, r, i, l, f, p, y, T, k) {
      t.cancelPendingCommit = null;
      do uc();
      while (Kt !== 0);
      if ((Qe & 6) !== 0) throw Error(o(327));
      if (r !== null) {
        if (r === t.current) throw Error(o(177));
        if (
          ((p = r.lanes | r.childLanes),
          (p |= Gp),
          D4(t, i, p, y, T, k),
          t === lt && ((ze = lt = null), (Le = 0)),
          (ri = r),
          (ca = t),
          (ai = i),
          (Wh = p),
          (Qh = f),
          (I1 = l),
          (r.subtreeFlags & 10256) !== 0 || (r.flags & 10256) !== 0
            ? ((t.callbackNode = null),
              (t.callbackPriority = 0),
              r6(Fe, function () {
                return (t_(), null);
              }))
            : ((t.callbackNode = null), (t.callbackPriority = 0)),
          (l = (r.flags & 13878) !== 0),
          (r.subtreeFlags & 13878) !== 0 || l)
        ) {
          ((l = z.T), (z.T = null), (f = Y.p), (Y.p = 2), (y = Qe), (Qe |= 4));
          try {
            Vk(t, r, i);
          } finally {
            ((Qe = y), (Y.p = f), (z.T = l));
          }
        }
        ((Kt = 1), Q1(), Z1(), J1());
      }
    }
    function Q1() {
      if (Kt === 1) {
        Kt = 0;
        var t = ca,
          r = ri,
          i = (r.flags & 13878) !== 0;
        if ((r.subtreeFlags & 13878) !== 0 || i) {
          ((i = z.T), (z.T = null));
          var l = Y.p;
          Y.p = 2;
          var f = Qe;
          Qe |= 4;
          try {
            k1(r, t);
            var p = pm,
              y = $S(t.containerInfo),
              T = p.focusedElem,
              k = p.selectionRange;
            if (
              y !== T &&
              T &&
              T.ownerDocument &&
              jS(T.ownerDocument.documentElement, T)
            ) {
              if (k !== null && Ip(T)) {
                var $ = k.start,
                  Z = k.end;
                if ((Z === void 0 && (Z = $), "selectionStart" in T))
                  ((T.selectionStart = $),
                    (T.selectionEnd = Math.min(Z, T.value.length)));
                else {
                  var ne = T.ownerDocument || document,
                    H = (ne && ne.defaultView) || window;
                  if (H.getSelection) {
                    var F = H.getSelection(),
                      Se = T.textContent.length,
                      ye = Math.min(k.start, Se),
                      rt = k.end === void 0 ? ye : Math.min(k.end, Se);
                    !F.extend && ye > rt && ((y = rt), (rt = ye), (ye = y));
                    var U = US(T, ye),
                      B = US(T, rt);
                    if (
                      U &&
                      B &&
                      (F.rangeCount !== 1 ||
                        F.anchorNode !== U.node ||
                        F.anchorOffset !== U.offset ||
                        F.focusNode !== B.node ||
                        F.focusOffset !== B.offset)
                    ) {
                      var j = ne.createRange();
                      (j.setStart(U.node, U.offset),
                        F.removeAllRanges(),
                        ye > rt
                          ? (F.addRange(j), F.extend(B.node, B.offset))
                          : (j.setEnd(B.node, B.offset), F.addRange(j)));
                    }
                  }
                }
              }
              for (ne = [], F = T; (F = F.parentNode); )
                F.nodeType === 1 &&
                  ne.push({ element: F, left: F.scrollLeft, top: F.scrollTop });
              for (
                typeof T.focus == "function" && T.focus(), T = 0;
                T < ne.length;
                T++
              ) {
                var ee = ne[T];
                ((ee.element.scrollLeft = ee.left),
                  (ee.element.scrollTop = ee.top));
              }
            }
            ((Ec = !!dm), (pm = dm = null));
          } finally {
            ((Qe = f), (Y.p = l), (z.T = i));
          }
        }
        ((t.current = r), (Kt = 2));
      }
    }
    function Z1() {
      if (Kt === 2) {
        Kt = 0;
        var t = ca,
          r = ri,
          i = (r.flags & 8772) !== 0;
        if ((r.subtreeFlags & 8772) !== 0 || i) {
          ((i = z.T), (z.T = null));
          var l = Y.p;
          Y.p = 2;
          var f = Qe;
          Qe |= 4;
          try {
            O1(t, r.alternate, r);
          } finally {
            ((Qe = f), (Y.p = l), (z.T = i));
          }
        }
        Kt = 3;
      }
    }
    function J1() {
      if (Kt === 4 || Kt === 3) {
        ((Kt = 0), Gt());
        var t = ca,
          r = ri,
          i = ai,
          l = I1;
        (r.subtreeFlags & 10256) !== 0 || (r.flags & 10256) !== 0
          ? (Kt = 5)
          : ((Kt = 0), (ri = ca = null), e_(t, t.pendingLanes));
        var f = t.pendingLanes;
        if (
          (f === 0 && (ua = null),
          vp(i),
          (r = r.stateNode),
          Tt && typeof Tt.onCommitFiberRoot == "function")
        )
          try {
            Tt.onCommitFiberRoot(
              fn,
              r,
              void 0,
              (r.current.flags & 128) === 128,
            );
          } catch {}
        if (l !== null) {
          ((r = z.T), (f = Y.p), (Y.p = 2), (z.T = null));
          try {
            for (var p = t.onRecoverableError, y = 0; y < l.length; y++) {
              var T = l[y];
              p(T.value, { componentStack: T.stack });
            }
          } finally {
            ((z.T = r), (Y.p = f));
          }
        }
        ((ai & 3) !== 0 && uc(),
          hr(t),
          (f = t.pendingLanes),
          (i & 4194090) !== 0 && (f & 42) !== 0
            ? t === Zh
              ? zs++
              : ((zs = 0), (Zh = t))
            : (zs = 0),
          Bs(0));
      }
    }
    function e_(t, r) {
      (t.pooledCacheLanes &= r) === 0 &&
        ((r = t.pooledCache), r != null && ((t.pooledCache = null), hs(r)));
    }
    function uc(t) {
      return (Q1(), Z1(), J1(), t_());
    }
    function t_() {
      if (Kt !== 5) return !1;
      var t = ca,
        r = Wh;
      Wh = 0;
      var i = vp(ai),
        l = z.T,
        f = Y.p;
      try {
        ((Y.p = 32 > i ? 32 : i), (z.T = null), (i = Qh), (Qh = null));
        var p = ca,
          y = ai;
        if (((Kt = 0), (ri = ca = null), (ai = 0), (Qe & 6) !== 0))
          throw Error(o(331));
        var T = Qe;
        if (
          ((Qe |= 4),
          j1(p.current),
          B1(p, p.current, y, i),
          (Qe = T),
          Bs(0, !1),
          Tt && typeof Tt.onPostCommitFiberRoot == "function")
        )
          try {
            Tt.onPostCommitFiberRoot(fn, p);
          } catch {}
        return !0;
      } finally {
        ((Y.p = f), (z.T = l), e_(t, r));
      }
    }
    function n_(t, r, i) {
      ((r = Ln(i, r)),
        (r = Mh(t.stateNode, r, 2)),
        (t = ea(t, r, 2)),
        t !== null && (Zi(t, 2), hr(t)));
    }
    function st(t, r, i) {
      if (t.tag === 3) n_(t, t, i);
      else
        for (; r !== null; ) {
          if (r.tag === 3) {
            n_(r, t, i);
            break;
          } else if (r.tag === 1) {
            var l = r.stateNode;
            if (
              typeof r.type.getDerivedStateFromError == "function" ||
              (typeof l.componentDidCatch == "function" &&
                (ua === null || !ua.has(l)))
            ) {
              ((t = Ln(i, t)),
                (i = i1(2)),
                (l = ea(r, i, 2)),
                l !== null && (s1(i, l, r, t), Zi(l, 2), hr(l)));
              break;
            }
          }
          r = r.return;
        }
    }
    function nm(t, r, i) {
      var l = t.pingCache;
      if (l === null) {
        l = t.pingCache = new Xk();
        var f = new Set();
        l.set(r, f);
      } else ((f = l.get(r)), f === void 0 && ((f = new Set()), l.set(r, f)));
      f.has(i) ||
        ((Vh = !0), f.add(i), (t = e6.bind(null, t, r, i)), r.then(t, t));
    }
    function e6(t, r, i) {
      var l = t.pingCache;
      (l !== null && l.delete(r),
        (t.pingedLanes |= t.suspendedLanes & i),
        (t.warmLanes &= ~i),
        lt === t &&
          (Le & i) === i &&
          (Ct === 4 || (Ct === 3 && (Le & 62914560) === Le && 300 > We() - Xh)
            ? (Qe & 2) === 0 && oi(t, 0)
            : (Kh |= i),
          ni === Le && (ni = 0)),
        hr(t));
    }
    function r_(t, r) {
      (r === 0 && (r = Jv()), (t = Ho(t, r)), t !== null && (Zi(t, r), hr(t)));
    }
    function t6(t) {
      var r = t.memoizedState,
        i = 0;
      (r !== null && (i = r.retryLane), r_(t, i));
    }
    function n6(t, r) {
      var i = 0;
      switch (t.tag) {
        case 13:
          var l = t.stateNode,
            f = t.memoizedState;
          f !== null && (i = f.retryLane);
          break;
        case 19:
          l = t.stateNode;
          break;
        case 22:
          l = t.stateNode._retryCache;
          break;
        default:
          throw Error(o(314));
      }
      (l !== null && l.delete(r), r_(t, i));
    }
    function r6(t, r) {
      return Ie(t, r);
    }
    var cc = null,
      si = null,
      rm = !1,
      fc = !1,
      am = !1,
      ro = 0;
    function hr(t) {
      (t !== si &&
        t.next === null &&
        (si === null ? (cc = si = t) : (si = si.next = t)),
        (fc = !0),
        rm || ((rm = !0), o6()));
    }
    function Bs(t, r) {
      if (!am && fc) {
        am = !0;
        do
          for (var i = !1, l = cc; l !== null; ) {
            if (t !== 0) {
              var f = l.pendingLanes;
              if (f === 0) var p = 0;
              else {
                var y = l.suspendedLanes,
                  T = l.pingedLanes;
                ((p = (1 << (31 - gt(42 | t) + 1)) - 1),
                  (p &= f & ~(y & ~T)),
                  (p = p & 201326741 ? (p & 201326741) | 1 : p ? p | 2 : 0));
              }
              p !== 0 && ((i = !0), s_(l, p));
            } else
              ((p = Le),
                (p = Ge(
                  l,
                  l === lt ? p : 0,
                  l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
                )),
                (p & 3) === 0 || yt(l, p) || ((i = !0), s_(l, p)));
            l = l.next;
          }
        while (i);
        am = !1;
      }
    }
    function a6() {
      a_();
    }
    function a_() {
      fc = rm = !1;
      var t = 0;
      ro !== 0 && (p6() && (t = ro), (ro = 0));
      for (var r = We(), i = null, l = cc; l !== null; ) {
        var f = l.next,
          p = o_(l, r);
        (p === 0
          ? ((l.next = null),
            i === null ? (cc = f) : (i.next = f),
            f === null && (si = i))
          : ((i = l), (t !== 0 || (p & 3) !== 0) && (fc = !0)),
          (l = f));
      }
      Bs(t);
    }
    function o_(t, r) {
      for (
        var i = t.suspendedLanes,
          l = t.pingedLanes,
          f = t.expirationTimes,
          p = t.pendingLanes & -62914561;
        0 < p;
      ) {
        var y = 31 - gt(p),
          T = 1 << y,
          k = f[y];
        (k === -1
          ? ((T & i) === 0 || (T & l) !== 0) && (f[y] = Yr(T, r))
          : k <= r && (t.expiredLanes |= T),
          (p &= ~T));
      }
      if (
        ((r = lt),
        (i = Le),
        (i = Ge(
          t,
          t === r ? i : 0,
          t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
        )),
        (l = t.callbackNode),
        i === 0 ||
          (t === r && (Ze === 2 || Ze === 9)) ||
          t.cancelPendingCommit !== null)
      )
        return (
          l !== null && l !== null && Re(l),
          (t.callbackNode = null),
          (t.callbackPriority = 0)
        );
      if ((i & 3) === 0 || yt(t, i)) {
        if (((r = i & -i), r === t.callbackPriority)) return r;
        switch ((l !== null && Re(l), vp(i))) {
          case 2:
          case 8:
            i = mt;
            break;
          case 32:
            i = Fe;
            break;
          case 268435456:
            i = Sn;
            break;
          default:
            i = Fe;
        }
        return (
          (l = i_.bind(null, t)),
          (i = Ie(i, l)),
          (t.callbackPriority = r),
          (t.callbackNode = i),
          r
        );
      }
      return (
        l !== null && l !== null && Re(l),
        (t.callbackPriority = 2),
        (t.callbackNode = null),
        2
      );
    }
    function i_(t, r) {
      if (Kt !== 0 && Kt !== 5)
        return ((t.callbackNode = null), (t.callbackPriority = 0), null);
      var i = t.callbackNode;
      if (uc() && t.callbackNode !== i) return null;
      var l = Le;
      return (
        (l = Ge(
          t,
          t === lt ? l : 0,
          t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
        )),
        l === 0
          ? null
          : (P1(t, l, r),
            o_(t, We()),
            t.callbackNode != null && t.callbackNode === i
              ? i_.bind(null, t)
              : null)
      );
    }
    function s_(t, r) {
      if (uc()) return null;
      P1(t, r, !0);
    }
    function o6() {
      m6(function () {
        (Qe & 6) !== 0 ? Ie(ut, a6) : a_();
      });
    }
    function om() {
      return (ro === 0 && (ro = Qi()), ro);
    }
    function l_(t) {
      return t == null || typeof t == "symbol" || typeof t == "boolean"
        ? null
        : typeof t == "function"
          ? t
          : _u("" + t);
    }
    function u_(t, r) {
      var i = r.ownerDocument.createElement("input");
      return (
        (i.name = r.name),
        (i.value = r.value),
        t.id && i.setAttribute("form", t.id),
        r.parentNode.insertBefore(i, r),
        (t = new FormData(t)),
        i.parentNode.removeChild(i),
        t
      );
    }
    function i6(t, r, i, l, f) {
      if (r === "submit" && i && i.stateNode === f) {
        var p = l_((f[dn] || null).action),
          y = l.submitter;
        y &&
          ((r = (r = y[dn] || null)
            ? l_(r.formAction)
            : y.getAttribute("formAction")),
          r !== null && ((p = r), (y = null)));
        var T = new wu("action", "action", null, l, f);
        t.push({
          event: T,
          listeners: [
            {
              instance: null,
              listener: function () {
                if (l.defaultPrevented) {
                  if (ro !== 0) {
                    var k = y ? u_(f, y) : new FormData(f);
                    Ch(
                      i,
                      { pending: !0, data: k, method: f.method, action: p },
                      null,
                      k,
                    );
                  }
                } else
                  typeof p == "function" &&
                    (T.preventDefault(),
                    (k = y ? u_(f, y) : new FormData(f)),
                    Ch(
                      i,
                      { pending: !0, data: k, method: f.method, action: p },
                      p,
                      k,
                    ));
              },
              currentTarget: f,
            },
          ],
        });
      }
    }
    for (var im = 0; im < Fp.length; im++) {
      var sm = Fp[im],
        s6 = sm.toLowerCase(),
        l6 = sm[0].toUpperCase() + sm.slice(1);
      Wn(s6, "on" + l6);
    }
    (Wn(PS, "onAnimationEnd"),
      Wn(qS, "onAnimationIteration"),
      Wn(FS, "onAnimationStart"),
      Wn("dblclick", "onDoubleClick"),
      Wn("focusin", "onFocus"),
      Wn("focusout", "onBlur"),
      Wn(Ck, "onTransitionRun"),
      Wn(wk, "onTransitionStart"),
      Wn(Rk, "onTransitionCancel"),
      Wn(GS, "onTransitionEnd"),
      Do("onMouseEnter", ["mouseout", "mouseover"]),
      Do("onMouseLeave", ["mouseout", "mouseover"]),
      Do("onPointerEnter", ["pointerout", "pointerover"]),
      Do("onPointerLeave", ["pointerout", "pointerover"]),
      Ha(
        "onChange",
        "change click focusin focusout input keydown keyup selectionchange".split(
          " ",
        ),
      ),
      Ha(
        "onSelect",
        "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
          " ",
        ),
      ),
      Ha("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
      Ha(
        "onCompositionEnd",
        "compositionend focusout keydown keypress keyup mousedown".split(" "),
      ),
      Ha(
        "onCompositionStart",
        "compositionstart focusout keydown keypress keyup mousedown".split(" "),
      ),
      Ha(
        "onCompositionUpdate",
        "compositionupdate focusout keydown keypress keyup mousedown".split(
          " ",
        ),
      ));
    var Ls =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
          " ",
        ),
      u6 = new Set(
        "beforetoggle cancel close invalid load scroll scrollend toggle"
          .split(" ")
          .concat(Ls),
      );
    function c_(t, r) {
      r = (r & 4) !== 0;
      for (var i = 0; i < t.length; i++) {
        var l = t[i],
          f = l.event;
        l = l.listeners;
        e: {
          var p = void 0;
          if (r)
            for (var y = l.length - 1; 0 <= y; y--) {
              var T = l[y],
                k = T.instance,
                $ = T.currentTarget;
              if (((T = T.listener), k !== p && f.isPropagationStopped()))
                break e;
              ((p = T), (f.currentTarget = $));
              try {
                p(f);
              } catch (Z) {
                Zu(Z);
              }
              ((f.currentTarget = null), (p = k));
            }
          else
            for (y = 0; y < l.length; y++) {
              if (
                ((T = l[y]),
                (k = T.instance),
                ($ = T.currentTarget),
                (T = T.listener),
                k !== p && f.isPropagationStopped())
              )
                break e;
              ((p = T), (f.currentTarget = $));
              try {
                p(f);
              } catch (Z) {
                Zu(Z);
              }
              ((f.currentTarget = null), (p = k));
            }
        }
      }
    }
    function Be(t, r) {
      var i = r[Sp];
      i === void 0 && (i = r[Sp] = new Set());
      var l = t + "__bubble";
      i.has(l) || (f_(r, t, 2, !1), i.add(l));
    }
    function lm(t, r, i) {
      var l = 0;
      (r && (l |= 4), f_(i, t, l, r));
    }
    var dc = "_reactListening" + Math.random().toString(36).slice(2);
    function um(t) {
      if (!t[dc]) {
        ((t[dc] = !0),
          aS.forEach(function (i) {
            i !== "selectionchange" &&
              (u6.has(i) || lm(i, !1, t), lm(i, !0, t));
          }));
        var r = t.nodeType === 9 ? t : t.ownerDocument;
        r === null || r[dc] || ((r[dc] = !0), lm("selectionchange", !1, r));
      }
    }
    function f_(t, r, i, l) {
      switch (B_(r)) {
        case 2:
          var f = L6;
          break;
        case 8:
          f = U6;
          break;
        default:
          f = Tm;
      }
      ((i = f.bind(null, r, i, t)),
        (f = void 0),
        !Dp ||
          (r !== "touchstart" && r !== "touchmove" && r !== "wheel") ||
          (f = !0),
        l
          ? f !== void 0
            ? t.addEventListener(r, i, { capture: !0, passive: f })
            : t.addEventListener(r, i, !0)
          : f !== void 0
            ? t.addEventListener(r, i, { passive: f })
            : t.addEventListener(r, i, !1));
    }
    function cm(t, r, i, l, f) {
      var p = l;
      if ((r & 1) === 0 && (r & 2) === 0 && l !== null)
        e: for (;;) {
          if (l === null) return;
          var y = l.tag;
          if (y === 3 || y === 4) {
            var T = l.stateNode.containerInfo;
            if (T === f) break;
            if (y === 4)
              for (y = l.return; y !== null; ) {
                var k = y.tag;
                if ((k === 3 || k === 4) && y.stateNode.containerInfo === f)
                  return;
                y = y.return;
              }
            for (; T !== null; ) {
              if (((y = Ao(T)), y === null)) return;
              if (((k = y.tag), k === 5 || k === 6 || k === 26 || k === 27)) {
                l = p = y;
                continue e;
              }
              T = T.parentNode;
            }
          }
          l = l.return;
        }
      bS(function () {
        var $ = p,
          Z = Op(i),
          ne = [];
        e: {
          var H = VS.get(t);
          if (H !== void 0) {
            var F = wu,
              Se = t;
            switch (t) {
              case "keypress":
                if (xu(i) === 0) break e;
              case "keydown":
              case "keyup":
                F = rk;
                break;
              case "focusin":
                ((Se = "focus"), (F = Bp));
                break;
              case "focusout":
                ((Se = "blur"), (F = Bp));
                break;
              case "beforeblur":
              case "afterblur":
                F = Bp;
                break;
              case "click":
                if (i.button === 2) break e;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                F = ES;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                F = G4;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                F = ik;
                break;
              case PS:
              case qS:
              case FS:
                F = Y4;
                break;
              case GS:
                F = lk;
                break;
              case "scroll":
              case "scrollend":
                F = q4;
                break;
              case "wheel":
                F = ck;
                break;
              case "copy":
              case "cut":
              case "paste":
                F = W4;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                F = TS;
                break;
              case "toggle":
              case "beforetoggle":
                F = dk;
            }
            var ye = (r & 4) !== 0,
              rt = !ye && (t === "scroll" || t === "scrollend"),
              U = ye ? (H !== null ? H + "Capture" : null) : H;
            ye = [];
            for (var B = $, j; B !== null; ) {
              var ee = B;
              if (
                ((j = ee.stateNode),
                (ee = ee.tag),
                (ee !== 5 && ee !== 26 && ee !== 27) ||
                  j === null ||
                  U === null ||
                  ((ee = ts(B, U)), ee != null && ye.push(Us(B, ee, j))),
                rt)
              )
                break;
              B = B.return;
            }
            0 < ye.length &&
              ((H = new F(H, Se, null, i, Z)),
              ne.push({ event: H, listeners: ye }));
          }
        }
        if ((r & 7) === 0) {
          e: {
            if (
              ((H = t === "mouseover" || t === "pointerover"),
              (F = t === "mouseout" || t === "pointerout"),
              H &&
                i !== Ap &&
                (Se = i.relatedTarget || i.fromElement) &&
                (Ao(Se) || Se[Ro]))
            )
              break e;
            if (
              (F || H) &&
              ((H =
                Z.window === Z
                  ? Z
                  : (H = Z.ownerDocument)
                    ? H.defaultView || H.parentWindow
                    : window),
              F
                ? ((Se = i.relatedTarget || i.toElement),
                  (F = $),
                  (Se = Se ? Ao(Se) : null),
                  Se !== null &&
                    ((rt = u(Se)),
                    (ye = Se.tag),
                    Se !== rt || (ye !== 5 && ye !== 27 && ye !== 6)) &&
                    (Se = null))
                : ((F = null), (Se = $)),
              F !== Se)
            ) {
              if (
                ((ye = ES),
                (ee = "onMouseLeave"),
                (U = "onMouseEnter"),
                (B = "mouse"),
                (t === "pointerout" || t === "pointerover") &&
                  ((ye = TS),
                  (ee = "onPointerLeave"),
                  (U = "onPointerEnter"),
                  (B = "pointer")),
                (rt = F == null ? H : es(F)),
                (j = Se == null ? H : es(Se)),
                (H = new ye(ee, B + "leave", F, i, Z)),
                (H.target = rt),
                (H.relatedTarget = j),
                (ee = null),
                Ao(Z) === $ &&
                  ((ye = new ye(U, B + "enter", Se, i, Z)),
                  (ye.target = j),
                  (ye.relatedTarget = rt),
                  (ee = ye)),
                (rt = ee),
                F && Se)
              )
                t: {
                  for (ye = F, U = Se, B = 0, j = ye; j; j = li(j)) B++;
                  for (j = 0, ee = U; ee; ee = li(ee)) j++;
                  for (; 0 < B - j; ) ((ye = li(ye)), B--);
                  for (; 0 < j - B; ) ((U = li(U)), j--);
                  for (; B--; ) {
                    if (ye === U || (U !== null && ye === U.alternate)) break t;
                    ((ye = li(ye)), (U = li(U)));
                  }
                  ye = null;
                }
              else ye = null;
              (F !== null && d_(ne, H, F, ye, !1),
                Se !== null && rt !== null && d_(ne, rt, Se, ye, !0));
            }
          }
          e: {
            if (
              ((H = $ ? es($) : window),
              (F = H.nodeName && H.nodeName.toLowerCase()),
              F === "select" || (F === "input" && H.type === "file"))
            )
              var ue = DS;
            else if (OS(H))
              if (NS) ue = _k;
              else {
                ue = Sk;
                var Ne = vk;
              }
            else
              ((F = H.nodeName),
                !F ||
                F.toLowerCase() !== "input" ||
                (H.type !== "checkbox" && H.type !== "radio")
                  ? $ && Rp($.elementType) && (ue = DS)
                  : (ue = Ek));
            if (ue && (ue = ue(t, $))) {
              MS(ne, ue, i, Z);
              break e;
            }
            (Ne && Ne(t, H, $),
              t === "focusout" &&
                $ &&
                H.type === "number" &&
                $.memoizedProps.value != null &&
                wp(H, "number", H.value));
          }
          switch (((Ne = $ ? es($) : window), t)) {
            case "focusin":
              (OS(Ne) || Ne.contentEditable === "true") &&
                ((jo = Ne), (Hp = $), (us = null));
              break;
            case "focusout":
              us = Hp = jo = null;
              break;
            case "mousedown":
              Pp = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              ((Pp = !1), IS(ne, i, Z));
              break;
            case "selectionchange":
              if (xk) break;
            case "keydown":
            case "keyup":
              IS(ne, i, Z);
          }
          var me;
          if (Up)
            e: {
              switch (t) {
                case "compositionstart":
                  var be = "onCompositionStart";
                  break e;
                case "compositionend":
                  be = "onCompositionEnd";
                  break e;
                case "compositionupdate":
                  be = "onCompositionUpdate";
                  break e;
              }
              be = void 0;
            }
          else
            Uo
              ? RS(t, i) && (be = "onCompositionEnd")
              : t === "keydown" &&
                i.keyCode === 229 &&
                (be = "onCompositionStart");
          (be &&
            (xS &&
              i.locale !== "ko" &&
              (Uo || be !== "onCompositionStart"
                ? be === "onCompositionEnd" && Uo && (me = vS())
                : ((Wr = Z),
                  (Np = "value" in Wr ? Wr.value : Wr.textContent),
                  (Uo = !0))),
            (Ne = pc($, be)),
            0 < Ne.length &&
              ((be = new _S(be, t, null, i, Z)),
              ne.push({ event: be, listeners: Ne }),
              me
                ? (be.data = me)
                : ((me = AS(i)), me !== null && (be.data = me)))),
            (me = hk ? mk(t, i) : gk(t, i)) &&
              ((be = pc($, "onBeforeInput")),
              0 < be.length &&
                ((Ne = new _S("onBeforeInput", "beforeinput", null, i, Z)),
                ne.push({ event: Ne, listeners: be }),
                (Ne.data = me))),
            i6(ne, t, $, i, Z));
        }
        c_(ne, r);
      });
    }
    function Us(t, r, i) {
      return { instance: t, listener: r, currentTarget: i };
    }
    function pc(t, r) {
      for (var i = r + "Capture", l = []; t !== null; ) {
        var f = t,
          p = f.stateNode;
        if (
          ((f = f.tag),
          (f !== 5 && f !== 26 && f !== 27) ||
            p === null ||
            ((f = ts(t, i)),
            f != null && l.unshift(Us(t, f, p)),
            (f = ts(t, r)),
            f != null && l.push(Us(t, f, p))),
          t.tag === 3)
        )
          return l;
        t = t.return;
      }
      return [];
    }
    function li(t) {
      if (t === null) return null;
      do t = t.return;
      while (t && t.tag !== 5 && t.tag !== 27);
      return t || null;
    }
    function d_(t, r, i, l, f) {
      for (var p = r._reactName, y = []; i !== null && i !== l; ) {
        var T = i,
          k = T.alternate,
          $ = T.stateNode;
        if (((T = T.tag), k !== null && k === l)) break;
        ((T !== 5 && T !== 26 && T !== 27) ||
          $ === null ||
          ((k = $),
          f
            ? (($ = ts(i, p)), $ != null && y.unshift(Us(i, $, k)))
            : f || (($ = ts(i, p)), $ != null && y.push(Us(i, $, k)))),
          (i = i.return));
      }
      y.length !== 0 && t.push({ event: r, listeners: y });
    }
    var c6 = /\r\n?/g,
      f6 = /\u0000|\uFFFD/g;
    function p_(t) {
      return (typeof t == "string" ? t : "" + t)
        .replace(
          c6,
          `
`,
        )
        .replace(f6, "");
    }
    function h_(t, r) {
      return ((r = p_(r)), p_(t) === r);
    }
    function hc() {}
    function nt(t, r, i, l, f, p) {
      switch (i) {
        case "children":
          typeof l == "string"
            ? r === "body" || (r === "textarea" && l === "") || zo(t, l)
            : (typeof l == "number" || typeof l == "bigint") &&
              r !== "body" &&
              zo(t, "" + l);
          break;
        case "className":
          vu(t, "class", l);
          break;
        case "tabIndex":
          vu(t, "tabindex", l);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          vu(t, i, l);
          break;
        case "style":
          gS(t, l, p);
          break;
        case "data":
          if (r !== "object") {
            vu(t, "data", l);
            break;
          }
        case "src":
        case "href":
          if (l === "" && (r !== "a" || i !== "href")) {
            t.removeAttribute(i);
            break;
          }
          if (
            l == null ||
            typeof l == "function" ||
            typeof l == "symbol" ||
            typeof l == "boolean"
          ) {
            t.removeAttribute(i);
            break;
          }
          ((l = _u("" + l)), t.setAttribute(i, l));
          break;
        case "action":
        case "formAction":
          if (typeof l == "function") {
            t.setAttribute(
              i,
              "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
            );
            break;
          } else
            typeof p == "function" &&
              (i === "formAction"
                ? (r !== "input" && nt(t, r, "name", f.name, f, null),
                  nt(t, r, "formEncType", f.formEncType, f, null),
                  nt(t, r, "formMethod", f.formMethod, f, null),
                  nt(t, r, "formTarget", f.formTarget, f, null))
                : (nt(t, r, "encType", f.encType, f, null),
                  nt(t, r, "method", f.method, f, null),
                  nt(t, r, "target", f.target, f, null)));
          if (l == null || typeof l == "symbol" || typeof l == "boolean") {
            t.removeAttribute(i);
            break;
          }
          ((l = _u("" + l)), t.setAttribute(i, l));
          break;
        case "onClick":
          l != null && (t.onclick = hc);
          break;
        case "onScroll":
          l != null && Be("scroll", t);
          break;
        case "onScrollEnd":
          l != null && Be("scrollend", t);
          break;
        case "dangerouslySetInnerHTML":
          if (l != null) {
            if (typeof l != "object" || !("__html" in l)) throw Error(o(61));
            if (((i = l.__html), i != null)) {
              if (f.children != null) throw Error(o(60));
              t.innerHTML = i;
            }
          }
          break;
        case "multiple":
          t.multiple = l && typeof l != "function" && typeof l != "symbol";
          break;
        case "muted":
          t.muted = l && typeof l != "function" && typeof l != "symbol";
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          break;
        case "autoFocus":
          break;
        case "xlinkHref":
          if (
            l == null ||
            typeof l == "function" ||
            typeof l == "boolean" ||
            typeof l == "symbol"
          ) {
            t.removeAttribute("xlink:href");
            break;
          }
          ((i = _u("" + l)),
            t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", i));
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          l != null && typeof l != "function" && typeof l != "symbol"
            ? t.setAttribute(i, "" + l)
            : t.removeAttribute(i);
          break;
        case "inert":
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          l && typeof l != "function" && typeof l != "symbol"
            ? t.setAttribute(i, "")
            : t.removeAttribute(i);
          break;
        case "capture":
        case "download":
          l === !0
            ? t.setAttribute(i, "")
            : l !== !1 &&
                l != null &&
                typeof l != "function" &&
                typeof l != "symbol"
              ? t.setAttribute(i, l)
              : t.removeAttribute(i);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          l != null &&
          typeof l != "function" &&
          typeof l != "symbol" &&
          !isNaN(l) &&
          1 <= l
            ? t.setAttribute(i, l)
            : t.removeAttribute(i);
          break;
        case "rowSpan":
        case "start":
          l == null ||
          typeof l == "function" ||
          typeof l == "symbol" ||
          isNaN(l)
            ? t.removeAttribute(i)
            : t.setAttribute(i, l);
          break;
        case "popover":
          (Be("beforetoggle", t), Be("toggle", t), bu(t, "popover", l));
          break;
        case "xlinkActuate":
          xr(t, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
          break;
        case "xlinkArcrole":
          xr(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
          break;
        case "xlinkRole":
          xr(t, "http://www.w3.org/1999/xlink", "xlink:role", l);
          break;
        case "xlinkShow":
          xr(t, "http://www.w3.org/1999/xlink", "xlink:show", l);
          break;
        case "xlinkTitle":
          xr(t, "http://www.w3.org/1999/xlink", "xlink:title", l);
          break;
        case "xlinkType":
          xr(t, "http://www.w3.org/1999/xlink", "xlink:type", l);
          break;
        case "xmlBase":
          xr(t, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
          break;
        case "xmlLang":
          xr(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
          break;
        case "xmlSpace":
          xr(t, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
          break;
        case "is":
          bu(t, "is", l);
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          (!(2 < i.length) ||
            (i[0] !== "o" && i[0] !== "O") ||
            (i[1] !== "n" && i[1] !== "N")) &&
            ((i = H4.get(i) || i), bu(t, i, l));
      }
    }
    function fm(t, r, i, l, f, p) {
      switch (i) {
        case "style":
          gS(t, l, p);
          break;
        case "dangerouslySetInnerHTML":
          if (l != null) {
            if (typeof l != "object" || !("__html" in l)) throw Error(o(61));
            if (((i = l.__html), i != null)) {
              if (f.children != null) throw Error(o(60));
              t.innerHTML = i;
            }
          }
          break;
        case "children":
          typeof l == "string"
            ? zo(t, l)
            : (typeof l == "number" || typeof l == "bigint") && zo(t, "" + l);
          break;
        case "onScroll":
          l != null && Be("scroll", t);
          break;
        case "onScrollEnd":
          l != null && Be("scrollend", t);
          break;
        case "onClick":
          l != null && (t.onclick = hc);
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          if (!oS.hasOwnProperty(i))
            e: {
              if (
                i[0] === "o" &&
                i[1] === "n" &&
                ((f = i.endsWith("Capture")),
                (r = i.slice(2, f ? i.length - 7 : void 0)),
                (p = t[dn] || null),
                (p = p != null ? p[i] : null),
                typeof p == "function" && t.removeEventListener(r, p, f),
                typeof l == "function")
              ) {
                (typeof p != "function" &&
                  p !== null &&
                  (i in t
                    ? (t[i] = null)
                    : t.hasAttribute(i) && t.removeAttribute(i)),
                  t.addEventListener(r, l, f));
                break e;
              }
              i in t
                ? (t[i] = l)
                : l === !0
                  ? t.setAttribute(i, "")
                  : bu(t, i, l);
            }
      }
    }
    function Yt(t, r, i) {
      switch (r) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "img":
          (Be("error", t), Be("load", t));
          var l = !1,
            f = !1,
            p;
          for (p in i)
            if (i.hasOwnProperty(p)) {
              var y = i[p];
              if (y != null)
                switch (p) {
                  case "src":
                    l = !0;
                    break;
                  case "srcSet":
                    f = !0;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(o(137, r));
                  default:
                    nt(t, r, p, y, i, null);
                }
            }
          (f && nt(t, r, "srcSet", i.srcSet, i, null),
            l && nt(t, r, "src", i.src, i, null));
          return;
        case "input":
          Be("invalid", t);
          var T = (p = y = f = null),
            k = null,
            $ = null;
          for (l in i)
            if (i.hasOwnProperty(l)) {
              var Z = i[l];
              if (Z != null)
                switch (l) {
                  case "name":
                    f = Z;
                    break;
                  case "type":
                    y = Z;
                    break;
                  case "checked":
                    k = Z;
                    break;
                  case "defaultChecked":
                    $ = Z;
                    break;
                  case "value":
                    p = Z;
                    break;
                  case "defaultValue":
                    T = Z;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (Z != null) throw Error(o(137, r));
                    break;
                  default:
                    nt(t, r, l, Z, i, null);
                }
            }
          (dS(t, p, T, k, $, y, f, !1), Su(t));
          return;
        case "select":
          (Be("invalid", t), (l = y = p = null));
          for (f in i)
            if (i.hasOwnProperty(f) && ((T = i[f]), T != null))
              switch (f) {
                case "value":
                  p = T;
                  break;
                case "defaultValue":
                  y = T;
                  break;
                case "multiple":
                  l = T;
                default:
                  nt(t, r, f, T, i, null);
              }
          ((r = p),
            (i = y),
            (t.multiple = !!l),
            r != null ? ko(t, !!l, r, !1) : i != null && ko(t, !!l, i, !0));
          return;
        case "textarea":
          (Be("invalid", t), (p = f = l = null));
          for (y in i)
            if (i.hasOwnProperty(y) && ((T = i[y]), T != null))
              switch (y) {
                case "value":
                  l = T;
                  break;
                case "defaultValue":
                  f = T;
                  break;
                case "children":
                  p = T;
                  break;
                case "dangerouslySetInnerHTML":
                  if (T != null) throw Error(o(91));
                  break;
                default:
                  nt(t, r, y, T, i, null);
              }
          (hS(t, l, f, p), Su(t));
          return;
        case "option":
          for (k in i)
            if (i.hasOwnProperty(k) && ((l = i[k]), l != null))
              switch (k) {
                case "selected":
                  t.selected =
                    l && typeof l != "function" && typeof l != "symbol";
                  break;
                default:
                  nt(t, r, k, l, i, null);
              }
          return;
        case "dialog":
          (Be("beforetoggle", t),
            Be("toggle", t),
            Be("cancel", t),
            Be("close", t));
          break;
        case "iframe":
        case "object":
          Be("load", t);
          break;
        case "video":
        case "audio":
          for (l = 0; l < Ls.length; l++) Be(Ls[l], t);
          break;
        case "image":
          (Be("error", t), Be("load", t));
          break;
        case "details":
          Be("toggle", t);
          break;
        case "embed":
        case "source":
        case "link":
          (Be("error", t), Be("load", t));
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
          for ($ in i)
            if (i.hasOwnProperty($) && ((l = i[$]), l != null))
              switch ($) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, r));
                default:
                  nt(t, r, $, l, i, null);
              }
          return;
        default:
          if (Rp(r)) {
            for (Z in i)
              i.hasOwnProperty(Z) &&
                ((l = i[Z]), l !== void 0 && fm(t, r, Z, l, i, void 0));
            return;
          }
      }
      for (T in i)
        i.hasOwnProperty(T) &&
          ((l = i[T]), l != null && nt(t, r, T, l, i, null));
    }
    function d6(t, r, i, l) {
      switch (r) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "input":
          var f = null,
            p = null,
            y = null,
            T = null,
            k = null,
            $ = null,
            Z = null;
          for (F in i) {
            var ne = i[F];
            if (i.hasOwnProperty(F) && ne != null)
              switch (F) {
                case "checked":
                  break;
                case "value":
                  break;
                case "defaultValue":
                  k = ne;
                default:
                  l.hasOwnProperty(F) || nt(t, r, F, null, l, ne);
              }
          }
          for (var H in l) {
            var F = l[H];
            if (((ne = i[H]), l.hasOwnProperty(H) && (F != null || ne != null)))
              switch (H) {
                case "type":
                  p = F;
                  break;
                case "name":
                  f = F;
                  break;
                case "checked":
                  $ = F;
                  break;
                case "defaultChecked":
                  Z = F;
                  break;
                case "value":
                  y = F;
                  break;
                case "defaultValue":
                  T = F;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (F != null) throw Error(o(137, r));
                  break;
                default:
                  F !== ne && nt(t, r, H, F, l, ne);
              }
          }
          Cp(t, y, T, k, $, Z, p, f);
          return;
        case "select":
          F = y = T = H = null;
          for (p in i)
            if (((k = i[p]), i.hasOwnProperty(p) && k != null))
              switch (p) {
                case "value":
                  break;
                case "multiple":
                  F = k;
                default:
                  l.hasOwnProperty(p) || nt(t, r, p, null, l, k);
              }
          for (f in l)
            if (
              ((p = l[f]),
              (k = i[f]),
              l.hasOwnProperty(f) && (p != null || k != null))
            )
              switch (f) {
                case "value":
                  H = p;
                  break;
                case "defaultValue":
                  T = p;
                  break;
                case "multiple":
                  y = p;
                default:
                  p !== k && nt(t, r, f, p, l, k);
              }
          ((r = T),
            (i = y),
            (l = F),
            H != null
              ? ko(t, !!i, H, !1)
              : !!l != !!i &&
                (r != null ? ko(t, !!i, r, !0) : ko(t, !!i, i ? [] : "", !1)));
          return;
        case "textarea":
          F = H = null;
          for (T in i)
            if (
              ((f = i[T]),
              i.hasOwnProperty(T) && f != null && !l.hasOwnProperty(T))
            )
              switch (T) {
                case "value":
                  break;
                case "children":
                  break;
                default:
                  nt(t, r, T, null, l, f);
              }
          for (y in l)
            if (
              ((f = l[y]),
              (p = i[y]),
              l.hasOwnProperty(y) && (f != null || p != null))
            )
              switch (y) {
                case "value":
                  H = f;
                  break;
                case "defaultValue":
                  F = f;
                  break;
                case "children":
                  break;
                case "dangerouslySetInnerHTML":
                  if (f != null) throw Error(o(91));
                  break;
                default:
                  f !== p && nt(t, r, y, f, l, p);
              }
          pS(t, H, F);
          return;
        case "option":
          for (var Se in i)
            if (
              ((H = i[Se]),
              i.hasOwnProperty(Se) && H != null && !l.hasOwnProperty(Se))
            )
              switch (Se) {
                case "selected":
                  t.selected = !1;
                  break;
                default:
                  nt(t, r, Se, null, l, H);
              }
          for (k in l)
            if (
              ((H = l[k]),
              (F = i[k]),
              l.hasOwnProperty(k) && H !== F && (H != null || F != null))
            )
              switch (k) {
                case "selected":
                  t.selected =
                    H && typeof H != "function" && typeof H != "symbol";
                  break;
                default:
                  nt(t, r, k, H, l, F);
              }
          return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
          for (var ye in i)
            ((H = i[ye]),
              i.hasOwnProperty(ye) &&
                H != null &&
                !l.hasOwnProperty(ye) &&
                nt(t, r, ye, null, l, H));
          for ($ in l)
            if (
              ((H = l[$]),
              (F = i[$]),
              l.hasOwnProperty($) && H !== F && (H != null || F != null))
            )
              switch ($) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (H != null) throw Error(o(137, r));
                  break;
                default:
                  nt(t, r, $, H, l, F);
              }
          return;
        default:
          if (Rp(r)) {
            for (var rt in i)
              ((H = i[rt]),
                i.hasOwnProperty(rt) &&
                  H !== void 0 &&
                  !l.hasOwnProperty(rt) &&
                  fm(t, r, rt, void 0, l, H));
            for (Z in l)
              ((H = l[Z]),
                (F = i[Z]),
                !l.hasOwnProperty(Z) ||
                  H === F ||
                  (H === void 0 && F === void 0) ||
                  fm(t, r, Z, H, l, F));
            return;
          }
      }
      for (var U in i)
        ((H = i[U]),
          i.hasOwnProperty(U) &&
            H != null &&
            !l.hasOwnProperty(U) &&
            nt(t, r, U, null, l, H));
      for (ne in l)
        ((H = l[ne]),
          (F = i[ne]),
          !l.hasOwnProperty(ne) ||
            H === F ||
            (H == null && F == null) ||
            nt(t, r, ne, H, l, F));
    }
    var dm = null,
      pm = null;
    function mc(t) {
      return t.nodeType === 9 ? t : t.ownerDocument;
    }
    function m_(t) {
      switch (t) {
        case "http://www.w3.org/2000/svg":
          return 1;
        case "http://www.w3.org/1998/Math/MathML":
          return 2;
        default:
          return 0;
      }
    }
    function g_(t, r) {
      if (t === 0)
        switch (r) {
          case "svg":
            return 1;
          case "math":
            return 2;
          default:
            return 0;
        }
      return t === 1 && r === "foreignObject" ? 0 : t;
    }
    function hm(t, r) {
      return (
        t === "textarea" ||
        t === "noscript" ||
        typeof r.children == "string" ||
        typeof r.children == "number" ||
        typeof r.children == "bigint" ||
        (typeof r.dangerouslySetInnerHTML == "object" &&
          r.dangerouslySetInnerHTML !== null &&
          r.dangerouslySetInnerHTML.__html != null)
      );
    }
    var mm = null;
    function p6() {
      var t = window.event;
      return t && t.type === "popstate"
        ? t === mm
          ? !1
          : ((mm = t), !0)
        : ((mm = null), !1);
    }
    var y_ = typeof setTimeout == "function" ? setTimeout : void 0,
      h6 = typeof clearTimeout == "function" ? clearTimeout : void 0,
      b_ = typeof Promise == "function" ? Promise : void 0,
      m6 =
        typeof queueMicrotask == "function"
          ? queueMicrotask
          : typeof b_ < "u"
            ? function (t) {
                return b_.resolve(null).then(t).catch(g6);
              }
            : y_;
    function g6(t) {
      setTimeout(function () {
        throw t;
      });
    }
    function da(t) {
      return t === "head";
    }
    function v_(t, r) {
      var i = r,
        l = 0,
        f = 0;
      do {
        var p = i.nextSibling;
        if ((t.removeChild(i), p && p.nodeType === 8))
          if (((i = p.data), i === "/$")) {
            if (0 < l && 8 > l) {
              i = l;
              var y = t.ownerDocument;
              if ((i & 1 && js(y.documentElement), i & 2 && js(y.body), i & 4))
                for (i = y.head, js(i), y = i.firstChild; y; ) {
                  var T = y.nextSibling,
                    k = y.nodeName;
                  (y[Ji] ||
                    k === "SCRIPT" ||
                    k === "STYLE" ||
                    (k === "LINK" && y.rel.toLowerCase() === "stylesheet") ||
                    i.removeChild(y),
                    (y = T));
                }
            }
            if (f === 0) {
              (t.removeChild(p), Vs(r));
              return;
            }
            f--;
          } else
            i === "$" || i === "$?" || i === "$!"
              ? f++
              : (l = i.charCodeAt(0) - 48);
        else l = 0;
        i = p;
      } while (i);
      Vs(r);
    }
    function gm(t) {
      var r = t.firstChild;
      for (r && r.nodeType === 10 && (r = r.nextSibling); r; ) {
        var i = r;
        switch (((r = r.nextSibling), i.nodeName)) {
          case "HTML":
          case "HEAD":
          case "BODY":
            (gm(i), Ep(i));
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (i.rel.toLowerCase() === "stylesheet") continue;
        }
        t.removeChild(i);
      }
    }
    function y6(t, r, i, l) {
      for (; t.nodeType === 1; ) {
        var f = i;
        if (t.nodeName.toLowerCase() !== r.toLowerCase()) {
          if (!l && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
        } else if (l) {
          if (!t[Ji])
            switch (r) {
              case "meta":
                if (!t.hasAttribute("itemprop")) break;
                return t;
              case "link":
                if (
                  ((p = t.getAttribute("rel")),
                  p === "stylesheet" && t.hasAttribute("data-precedence"))
                )
                  break;
                if (
                  p !== f.rel ||
                  t.getAttribute("href") !==
                    (f.href == null || f.href === "" ? null : f.href) ||
                  t.getAttribute("crossorigin") !==
                    (f.crossOrigin == null ? null : f.crossOrigin) ||
                  t.getAttribute("title") !== (f.title == null ? null : f.title)
                )
                  break;
                return t;
              case "style":
                if (t.hasAttribute("data-precedence")) break;
                return t;
              case "script":
                if (
                  ((p = t.getAttribute("src")),
                  (p !== (f.src == null ? null : f.src) ||
                    t.getAttribute("type") !==
                      (f.type == null ? null : f.type) ||
                    t.getAttribute("crossorigin") !==
                      (f.crossOrigin == null ? null : f.crossOrigin)) &&
                    p &&
                    t.hasAttribute("async") &&
                    !t.hasAttribute("itemprop"))
                )
                  break;
                return t;
              default:
                return t;
            }
        } else if (r === "input" && t.type === "hidden") {
          var p = f.name == null ? null : "" + f.name;
          if (f.type === "hidden" && t.getAttribute("name") === p) return t;
        } else return t;
        if (((t = Zn(t.nextSibling)), t === null)) break;
      }
      return null;
    }
    function b6(t, r, i) {
      if (r === "") return null;
      for (; t.nodeType !== 3; )
        if (
          ((t.nodeType !== 1 ||
            t.nodeName !== "INPUT" ||
            t.type !== "hidden") &&
            !i) ||
          ((t = Zn(t.nextSibling)), t === null)
        )
          return null;
      return t;
    }
    function ym(t) {
      return (
        t.data === "$!" ||
        (t.data === "$?" && t.ownerDocument.readyState === "complete")
      );
    }
    function v6(t, r) {
      var i = t.ownerDocument;
      if (t.data !== "$?" || i.readyState === "complete") r();
      else {
        var l = function () {
          (r(), i.removeEventListener("DOMContentLoaded", l));
        };
        (i.addEventListener("DOMContentLoaded", l), (t._reactRetry = l));
      }
    }
    function Zn(t) {
      for (; t != null; t = t.nextSibling) {
        var r = t.nodeType;
        if (r === 1 || r === 3) break;
        if (r === 8) {
          if (
            ((r = t.data),
            r === "$" || r === "$!" || r === "$?" || r === "F!" || r === "F")
          )
            break;
          if (r === "/$") return null;
        }
      }
      return t;
    }
    var bm = null;
    function S_(t) {
      t = t.previousSibling;
      for (var r = 0; t; ) {
        if (t.nodeType === 8) {
          var i = t.data;
          if (i === "$" || i === "$!" || i === "$?") {
            if (r === 0) return t;
            r--;
          } else i === "/$" && r++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function E_(t, r, i) {
      switch (((r = mc(i)), t)) {
        case "html":
          if (((t = r.documentElement), !t)) throw Error(o(452));
          return t;
        case "head":
          if (((t = r.head), !t)) throw Error(o(453));
          return t;
        case "body":
          if (((t = r.body), !t)) throw Error(o(454));
          return t;
        default:
          throw Error(o(451));
      }
    }
    function js(t) {
      for (var r = t.attributes; r.length; ) t.removeAttributeNode(r[0]);
      Ep(t);
    }
    var Pn = new Map(),
      __ = new Set();
    function gc(t) {
      return typeof t.getRootNode == "function"
        ? t.getRootNode()
        : t.nodeType === 9
          ? t
          : t.ownerDocument;
    }
    var jr = Y.d;
    Y.d = { f: S6, r: E6, D: _6, C: T6, L: x6, m: C6, X: R6, S: w6, M: A6 };
    function S6() {
      var t = jr.f(),
        r = sc();
      return t || r;
    }
    function E6(t) {
      var r = Oo(t);
      r !== null && r.tag === 5 && r.type === "form" ? PE(r) : jr.r(t);
    }
    var ui = typeof document > "u" ? null : document;
    function T_(t, r, i) {
      var l = ui;
      if (l && typeof r == "string" && r) {
        var f = Bn(r);
        ((f = 'link[rel="' + t + '"][href="' + f + '"]'),
          typeof i == "string" && (f += '[crossorigin="' + i + '"]'),
          __.has(f) ||
            (__.add(f),
            (t = { rel: t, crossOrigin: i, href: r }),
            l.querySelector(f) === null &&
              ((r = l.createElement("link")),
              Yt(r, "link", t),
              $t(r),
              l.head.appendChild(r))));
      }
    }
    function _6(t) {
      (jr.D(t), T_("dns-prefetch", t, null));
    }
    function T6(t, r) {
      (jr.C(t, r), T_("preconnect", t, r));
    }
    function x6(t, r, i) {
      jr.L(t, r, i);
      var l = ui;
      if (l && t && r) {
        var f = 'link[rel="preload"][as="' + Bn(r) + '"]';
        r === "image" && i && i.imageSrcSet
          ? ((f += '[imagesrcset="' + Bn(i.imageSrcSet) + '"]'),
            typeof i.imageSizes == "string" &&
              (f += '[imagesizes="' + Bn(i.imageSizes) + '"]'))
          : (f += '[href="' + Bn(t) + '"]');
        var p = f;
        switch (r) {
          case "style":
            p = ci(t);
            break;
          case "script":
            p = fi(t);
        }
        Pn.has(p) ||
          ((t = g(
            {
              rel: "preload",
              href: r === "image" && i && i.imageSrcSet ? void 0 : t,
              as: r,
            },
            i,
          )),
          Pn.set(p, t),
          l.querySelector(f) !== null ||
            (r === "style" && l.querySelector($s(p))) ||
            (r === "script" && l.querySelector(Is(p))) ||
            ((r = l.createElement("link")),
            Yt(r, "link", t),
            $t(r),
            l.head.appendChild(r)));
      }
    }
    function C6(t, r) {
      jr.m(t, r);
      var i = ui;
      if (i && t) {
        var l = r && typeof r.as == "string" ? r.as : "script",
          f =
            'link[rel="modulepreload"][as="' +
            Bn(l) +
            '"][href="' +
            Bn(t) +
            '"]',
          p = f;
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            p = fi(t);
        }
        if (
          !Pn.has(p) &&
          ((t = g({ rel: "modulepreload", href: t }, r)),
          Pn.set(p, t),
          i.querySelector(f) === null)
        ) {
          switch (l) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              if (i.querySelector(Is(p))) return;
          }
          ((l = i.createElement("link")),
            Yt(l, "link", t),
            $t(l),
            i.head.appendChild(l));
        }
      }
    }
    function w6(t, r, i) {
      jr.S(t, r, i);
      var l = ui;
      if (l && t) {
        var f = Mo(l).hoistableStyles,
          p = ci(t);
        r = r || "default";
        var y = f.get(p);
        if (!y) {
          var T = { loading: 0, preload: null };
          if ((y = l.querySelector($s(p)))) T.loading = 5;
          else {
            ((t = g({ rel: "stylesheet", href: t, "data-precedence": r }, i)),
              (i = Pn.get(p)) && vm(t, i));
            var k = (y = l.createElement("link"));
            ($t(k),
              Yt(k, "link", t),
              (k._p = new Promise(function ($, Z) {
                ((k.onload = $), (k.onerror = Z));
              })),
              k.addEventListener("load", function () {
                T.loading |= 1;
              }),
              k.addEventListener("error", function () {
                T.loading |= 2;
              }),
              (T.loading |= 4),
              yc(y, r, l));
          }
          ((y = { type: "stylesheet", instance: y, count: 1, state: T }),
            f.set(p, y));
        }
      }
    }
    function R6(t, r) {
      jr.X(t, r);
      var i = ui;
      if (i && t) {
        var l = Mo(i).hoistableScripts,
          f = fi(t),
          p = l.get(f);
        p ||
          ((p = i.querySelector(Is(f))),
          p ||
            ((t = g({ src: t, async: !0 }, r)),
            (r = Pn.get(f)) && Sm(t, r),
            (p = i.createElement("script")),
            $t(p),
            Yt(p, "link", t),
            i.head.appendChild(p)),
          (p = { type: "script", instance: p, count: 1, state: null }),
          l.set(f, p));
      }
    }
    function A6(t, r) {
      jr.M(t, r);
      var i = ui;
      if (i && t) {
        var l = Mo(i).hoistableScripts,
          f = fi(t),
          p = l.get(f);
        p ||
          ((p = i.querySelector(Is(f))),
          p ||
            ((t = g({ src: t, async: !0, type: "module" }, r)),
            (r = Pn.get(f)) && Sm(t, r),
            (p = i.createElement("script")),
            $t(p),
            Yt(p, "link", t),
            i.head.appendChild(p)),
          (p = { type: "script", instance: p, count: 1, state: null }),
          l.set(f, p));
      }
    }
    function x_(t, r, i, l) {
      var f = (f = fe.current) ? gc(f) : null;
      if (!f) throw Error(o(446));
      switch (t) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof i.precedence == "string" && typeof i.href == "string"
            ? ((r = ci(i.href)),
              (i = Mo(f).hoistableStyles),
              (l = i.get(r)),
              l ||
                ((l = { type: "style", instance: null, count: 0, state: null }),
                i.set(r, l)),
              l)
            : { type: "void", instance: null, count: 0, state: null };
        case "link":
          if (
            i.rel === "stylesheet" &&
            typeof i.href == "string" &&
            typeof i.precedence == "string"
          ) {
            t = ci(i.href);
            var p = Mo(f).hoistableStyles,
              y = p.get(t);
            if (
              (y ||
                ((f = f.ownerDocument || f),
                (y = {
                  type: "stylesheet",
                  instance: null,
                  count: 0,
                  state: { loading: 0, preload: null },
                }),
                p.set(t, y),
                (p = f.querySelector($s(t))) &&
                  !p._p &&
                  ((y.instance = p), (y.state.loading = 5)),
                Pn.has(t) ||
                  ((i = {
                    rel: "preload",
                    as: "style",
                    href: i.href,
                    crossOrigin: i.crossOrigin,
                    integrity: i.integrity,
                    media: i.media,
                    hrefLang: i.hrefLang,
                    referrerPolicy: i.referrerPolicy,
                  }),
                  Pn.set(t, i),
                  p || O6(f, t, i, y.state))),
              r && l === null)
            )
              throw Error(o(528, ""));
            return y;
          }
          if (r && l !== null) throw Error(o(529, ""));
          return null;
        case "script":
          return (
            (r = i.async),
            (i = i.src),
            typeof i == "string" &&
            r &&
            typeof r != "function" &&
            typeof r != "symbol"
              ? ((r = fi(i)),
                (i = Mo(f).hoistableScripts),
                (l = i.get(r)),
                l ||
                  ((l = {
                    type: "script",
                    instance: null,
                    count: 0,
                    state: null,
                  }),
                  i.set(r, l)),
                l)
              : { type: "void", instance: null, count: 0, state: null }
          );
        default:
          throw Error(o(444, t));
      }
    }
    function ci(t) {
      return 'href="' + Bn(t) + '"';
    }
    function $s(t) {
      return 'link[rel="stylesheet"][' + t + "]";
    }
    function C_(t) {
      return g({}, t, { "data-precedence": t.precedence, precedence: null });
    }
    function O6(t, r, i, l) {
      t.querySelector('link[rel="preload"][as="style"][' + r + "]")
        ? (l.loading = 1)
        : ((r = t.createElement("link")),
          (l.preload = r),
          r.addEventListener("load", function () {
            return (l.loading |= 1);
          }),
          r.addEventListener("error", function () {
            return (l.loading |= 2);
          }),
          Yt(r, "link", i),
          $t(r),
          t.head.appendChild(r));
    }
    function fi(t) {
      return '[src="' + Bn(t) + '"]';
    }
    function Is(t) {
      return "script[async]" + t;
    }
    function w_(t, r, i) {
      if ((r.count++, r.instance === null))
        switch (r.type) {
          case "style":
            var l = t.querySelector('style[data-href~="' + Bn(i.href) + '"]');
            if (l) return ((r.instance = l), $t(l), l);
            var f = g({}, i, {
              "data-href": i.href,
              "data-precedence": i.precedence,
              href: null,
              precedence: null,
            });
            return (
              (l = (t.ownerDocument || t).createElement("style")),
              $t(l),
              Yt(l, "style", f),
              yc(l, i.precedence, t),
              (r.instance = l)
            );
          case "stylesheet":
            f = ci(i.href);
            var p = t.querySelector($s(f));
            if (p) return ((r.state.loading |= 4), (r.instance = p), $t(p), p);
            ((l = C_(i)),
              (f = Pn.get(f)) && vm(l, f),
              (p = (t.ownerDocument || t).createElement("link")),
              $t(p));
            var y = p;
            return (
              (y._p = new Promise(function (T, k) {
                ((y.onload = T), (y.onerror = k));
              })),
              Yt(p, "link", l),
              (r.state.loading |= 4),
              yc(p, i.precedence, t),
              (r.instance = p)
            );
          case "script":
            return (
              (p = fi(i.src)),
              (f = t.querySelector(Is(p)))
                ? ((r.instance = f), $t(f), f)
                : ((l = i),
                  (f = Pn.get(p)) && ((l = g({}, i)), Sm(l, f)),
                  (t = t.ownerDocument || t),
                  (f = t.createElement("script")),
                  $t(f),
                  Yt(f, "link", l),
                  t.head.appendChild(f),
                  (r.instance = f))
            );
          case "void":
            return null;
          default:
            throw Error(o(443, r.type));
        }
      else
        r.type === "stylesheet" &&
          (r.state.loading & 4) === 0 &&
          ((l = r.instance), (r.state.loading |= 4), yc(l, i.precedence, t));
      return r.instance;
    }
    function yc(t, r, i) {
      for (
        var l = i.querySelectorAll(
            'link[rel="stylesheet"][data-precedence],style[data-precedence]',
          ),
          f = l.length ? l[l.length - 1] : null,
          p = f,
          y = 0;
        y < l.length;
        y++
      ) {
        var T = l[y];
        if (T.dataset.precedence === r) p = T;
        else if (p !== f) break;
      }
      p
        ? p.parentNode.insertBefore(t, p.nextSibling)
        : ((r = i.nodeType === 9 ? i.head : i),
          r.insertBefore(t, r.firstChild));
    }
    function vm(t, r) {
      (t.crossOrigin == null && (t.crossOrigin = r.crossOrigin),
        t.referrerPolicy == null && (t.referrerPolicy = r.referrerPolicy),
        t.title == null && (t.title = r.title));
    }
    function Sm(t, r) {
      (t.crossOrigin == null && (t.crossOrigin = r.crossOrigin),
        t.referrerPolicy == null && (t.referrerPolicy = r.referrerPolicy),
        t.integrity == null && (t.integrity = r.integrity));
    }
    var bc = null;
    function R_(t, r, i) {
      if (bc === null) {
        var l = new Map(),
          f = (bc = new Map());
        f.set(i, l);
      } else ((f = bc), (l = f.get(i)), l || ((l = new Map()), f.set(i, l)));
      if (l.has(t)) return l;
      for (
        l.set(t, null), i = i.getElementsByTagName(t), f = 0;
        f < i.length;
        f++
      ) {
        var p = i[f];
        if (
          !(
            p[Ji] ||
            p[en] ||
            (t === "link" && p.getAttribute("rel") === "stylesheet")
          ) &&
          p.namespaceURI !== "http://www.w3.org/2000/svg"
        ) {
          var y = p.getAttribute(r) || "";
          y = t + y;
          var T = l.get(y);
          T ? T.push(p) : l.set(y, [p]);
        }
      }
      return l;
    }
    function A_(t, r, i) {
      ((t = t.ownerDocument || t),
        t.head.insertBefore(
          i,
          r === "title" ? t.querySelector("head > title") : null,
        ));
    }
    function M6(t, r, i) {
      if (i === 1 || r.itemProp != null) return !1;
      switch (t) {
        case "meta":
        case "title":
          return !0;
        case "style":
          if (
            typeof r.precedence != "string" ||
            typeof r.href != "string" ||
            r.href === ""
          )
            break;
          return !0;
        case "link":
          if (
            typeof r.rel != "string" ||
            typeof r.href != "string" ||
            r.href === "" ||
            r.onLoad ||
            r.onError
          )
            break;
          switch (r.rel) {
            case "stylesheet":
              return (
                (t = r.disabled),
                typeof r.precedence == "string" && t == null
              );
            default:
              return !0;
          }
        case "script":
          if (
            r.async &&
            typeof r.async != "function" &&
            typeof r.async != "symbol" &&
            !r.onLoad &&
            !r.onError &&
            r.src &&
            typeof r.src == "string"
          )
            return !0;
      }
      return !1;
    }
    function O_(t) {
      return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
    }
    var Hs = null;
    function D6() {}
    function N6(t, r, i) {
      if (Hs === null) throw Error(o(475));
      var l = Hs;
      if (
        r.type === "stylesheet" &&
        (typeof i.media != "string" || matchMedia(i.media).matches !== !1) &&
        (r.state.loading & 4) === 0
      ) {
        if (r.instance === null) {
          var f = ci(i.href),
            p = t.querySelector($s(f));
          if (p) {
            ((t = p._p),
              t !== null &&
                typeof t == "object" &&
                typeof t.then == "function" &&
                (l.count++, (l = vc.bind(l)), t.then(l, l)),
              (r.state.loading |= 4),
              (r.instance = p),
              $t(p));
            return;
          }
          ((p = t.ownerDocument || t),
            (i = C_(i)),
            (f = Pn.get(f)) && vm(i, f),
            (p = p.createElement("link")),
            $t(p));
          var y = p;
          ((y._p = new Promise(function (T, k) {
            ((y.onload = T), (y.onerror = k));
          })),
            Yt(p, "link", i),
            (r.instance = p));
        }
        (l.stylesheets === null && (l.stylesheets = new Map()),
          l.stylesheets.set(r, t),
          (t = r.state.preload) &&
            (r.state.loading & 3) === 0 &&
            (l.count++,
            (r = vc.bind(l)),
            t.addEventListener("load", r),
            t.addEventListener("error", r)));
      }
    }
    function k6() {
      if (Hs === null) throw Error(o(475));
      var t = Hs;
      return (
        t.stylesheets && t.count === 0 && Em(t, t.stylesheets),
        0 < t.count
          ? function (r) {
              var i = setTimeout(function () {
                if ((t.stylesheets && Em(t, t.stylesheets), t.unsuspend)) {
                  var l = t.unsuspend;
                  ((t.unsuspend = null), l());
                }
              }, 6e4);
              return (
                (t.unsuspend = r),
                function () {
                  ((t.unsuspend = null), clearTimeout(i));
                }
              );
            }
          : null
      );
    }
    function vc() {
      if ((this.count--, this.count === 0)) {
        if (this.stylesheets) Em(this, this.stylesheets);
        else if (this.unsuspend) {
          var t = this.unsuspend;
          ((this.unsuspend = null), t());
        }
      }
    }
    var Sc = null;
    function Em(t, r) {
      ((t.stylesheets = null),
        t.unsuspend !== null &&
          (t.count++,
          (Sc = new Map()),
          r.forEach(z6, t),
          (Sc = null),
          vc.call(t)));
    }
    function z6(t, r) {
      if (!(r.state.loading & 4)) {
        var i = Sc.get(t);
        if (i) var l = i.get(null);
        else {
          ((i = new Map()), Sc.set(t, i));
          for (
            var f = t.querySelectorAll(
                "link[data-precedence],style[data-precedence]",
              ),
              p = 0;
            p < f.length;
            p++
          ) {
            var y = f[p];
            (y.nodeName === "LINK" || y.getAttribute("media") !== "not all") &&
              (i.set(y.dataset.precedence, y), (l = y));
          }
          l && i.set(null, l);
        }
        ((f = r.instance),
          (y = f.getAttribute("data-precedence")),
          (p = i.get(y) || l),
          p === l && i.set(null, f),
          i.set(y, f),
          this.count++,
          (l = vc.bind(this)),
          f.addEventListener("load", l),
          f.addEventListener("error", l),
          p
            ? p.parentNode.insertBefore(f, p.nextSibling)
            : ((t = t.nodeType === 9 ? t.head : t),
              t.insertBefore(f, t.firstChild)),
          (r.state.loading |= 4));
      }
    }
    var Ps = {
      $$typeof: R,
      Provider: null,
      Consumer: null,
      _currentValue: ie,
      _currentValue2: ie,
      _threadCount: 0,
    };
    function B6(t, r, i, l, f, p, y, T) {
      ((this.tag = 1),
        (this.containerInfo = t),
        (this.pingCache = this.current = this.pendingChildren = null),
        (this.timeoutHandle = -1),
        (this.callbackNode =
          this.next =
          this.pendingContext =
          this.context =
          this.cancelPendingCommit =
            null),
        (this.callbackPriority = 0),
        (this.expirationTimes = yp(-1)),
        (this.entangledLanes =
          this.shellSuspendCounter =
          this.errorRecoveryDisabledLanes =
          this.expiredLanes =
          this.warmLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = yp(0)),
        (this.hiddenUpdates = yp(null)),
        (this.identifierPrefix = l),
        (this.onUncaughtError = f),
        (this.onCaughtError = p),
        (this.onRecoverableError = y),
        (this.pooledCache = null),
        (this.pooledCacheLanes = 0),
        (this.formState = T),
        (this.incompleteTransitions = new Map()));
    }
    function M_(t, r, i, l, f, p, y, T, k, $, Z, ne) {
      return (
        (t = new B6(t, r, i, y, T, k, $, ne)),
        (r = 1),
        p === !0 && (r |= 24),
        (p = _n(3, null, null, r)),
        (t.current = p),
        (p.stateNode = t),
        (r = nh()),
        r.refCount++,
        (t.pooledCache = r),
        r.refCount++,
        (p.memoizedState = { element: l, isDehydrated: i, cache: r }),
        ih(p),
        t
      );
    }
    function D_(t) {
      return t ? ((t = Po), t) : Po;
    }
    function N_(t, r, i, l, f, p) {
      ((f = D_(f)),
        l.context === null ? (l.context = f) : (l.pendingContext = f),
        (l = Jr(r)),
        (l.payload = { element: i }),
        (p = p === void 0 ? null : p),
        p !== null && (l.callback = p),
        (i = ea(t, l, r)),
        i !== null && (Rn(i, t, r), bs(i, t, r)));
    }
    function k_(t, r) {
      if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
        var i = t.retryLane;
        t.retryLane = i !== 0 && i < r ? i : r;
      }
    }
    function _m(t, r) {
      (k_(t, r), (t = t.alternate) && k_(t, r));
    }
    function z_(t) {
      if (t.tag === 13) {
        var r = Ho(t, 67108864);
        (r !== null && Rn(r, t, 67108864), _m(t, 67108864));
      }
    }
    var Ec = !0;
    function L6(t, r, i, l) {
      var f = z.T;
      z.T = null;
      var p = Y.p;
      try {
        ((Y.p = 2), Tm(t, r, i, l));
      } finally {
        ((Y.p = p), (z.T = f));
      }
    }
    function U6(t, r, i, l) {
      var f = z.T;
      z.T = null;
      var p = Y.p;
      try {
        ((Y.p = 8), Tm(t, r, i, l));
      } finally {
        ((Y.p = p), (z.T = f));
      }
    }
    function Tm(t, r, i, l) {
      if (Ec) {
        var f = xm(l);
        if (f === null) (cm(t, r, l, _c, i), L_(t, l));
        else if ($6(f, t, r, i, l)) l.stopPropagation();
        else if ((L_(t, l), r & 4 && -1 < j6.indexOf(t))) {
          for (; f !== null; ) {
            var p = Oo(f);
            if (p !== null)
              switch (p.tag) {
                case 3:
                  if (
                    ((p = p.stateNode), p.current.memoizedState.isDehydrated)
                  ) {
                    var y = he(p.pendingLanes);
                    if (y !== 0) {
                      var T = p;
                      for (T.pendingLanes |= 2, T.entangledLanes |= 2; y; ) {
                        var k = 1 << (31 - gt(y));
                        ((T.entanglements[1] |= k), (y &= ~k));
                      }
                      (hr(p), (Qe & 6) === 0 && ((oc = We() + 500), Bs(0)));
                    }
                  }
                  break;
                case 13:
                  ((T = Ho(p, 2)), T !== null && Rn(T, p, 2), sc(), _m(p, 2));
              }
            if (((p = xm(l)), p === null && cm(t, r, l, _c, i), p === f)) break;
            f = p;
          }
          f !== null && l.stopPropagation();
        } else cm(t, r, l, null, i);
      }
    }
    function xm(t) {
      return ((t = Op(t)), Cm(t));
    }
    var _c = null;
    function Cm(t) {
      if (((_c = null), (t = Ao(t)), t !== null)) {
        var r = u(t);
        if (r === null) t = null;
        else {
          var i = r.tag;
          if (i === 13) {
            if (((t = c(r)), t !== null)) return t;
            t = null;
          } else if (i === 3) {
            if (r.stateNode.current.memoizedState.isDehydrated)
              return r.tag === 3 ? r.stateNode.containerInfo : null;
            t = null;
          } else r !== t && (t = null);
        }
      }
      return ((_c = t), null);
    }
    function B_(t) {
      switch (t) {
        case "beforetoggle":
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "toggle":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 2;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 8;
        case "message":
          switch (ft()) {
            case ut:
              return 2;
            case mt:
              return 8;
            case Fe:
            case pe:
              return 32;
            case Sn:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var wm = !1,
      pa = null,
      ha = null,
      ma = null,
      qs = new Map(),
      Fs = new Map(),
      ga = [],
      j6 =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
          " ",
        );
    function L_(t, r) {
      switch (t) {
        case "focusin":
        case "focusout":
          pa = null;
          break;
        case "dragenter":
        case "dragleave":
          ha = null;
          break;
        case "mouseover":
        case "mouseout":
          ma = null;
          break;
        case "pointerover":
        case "pointerout":
          qs.delete(r.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          Fs.delete(r.pointerId);
      }
    }
    function Gs(t, r, i, l, f, p) {
      return t === null || t.nativeEvent !== p
        ? ((t = {
            blockedOn: r,
            domEventName: i,
            eventSystemFlags: l,
            nativeEvent: p,
            targetContainers: [f],
          }),
          r !== null && ((r = Oo(r)), r !== null && z_(r)),
          t)
        : ((t.eventSystemFlags |= l),
          (r = t.targetContainers),
          f !== null && r.indexOf(f) === -1 && r.push(f),
          t);
    }
    function $6(t, r, i, l, f) {
      switch (r) {
        case "focusin":
          return ((pa = Gs(pa, t, r, i, l, f)), !0);
        case "dragenter":
          return ((ha = Gs(ha, t, r, i, l, f)), !0);
        case "mouseover":
          return ((ma = Gs(ma, t, r, i, l, f)), !0);
        case "pointerover":
          var p = f.pointerId;
          return (qs.set(p, Gs(qs.get(p) || null, t, r, i, l, f)), !0);
        case "gotpointercapture":
          return (
            (p = f.pointerId),
            Fs.set(p, Gs(Fs.get(p) || null, t, r, i, l, f)),
            !0
          );
      }
      return !1;
    }
    function U_(t) {
      var r = Ao(t.target);
      if (r !== null) {
        var i = u(r);
        if (i !== null) {
          if (((r = i.tag), r === 13)) {
            if (((r = c(i)), r !== null)) {
              ((t.blockedOn = r),
                N4(t.priority, function () {
                  if (i.tag === 13) {
                    var l = wn();
                    l = bp(l);
                    var f = Ho(i, l);
                    (f !== null && Rn(f, i, l), _m(i, l));
                  }
                }));
              return;
            }
          } else if (
            r === 3 &&
            i.stateNode.current.memoizedState.isDehydrated
          ) {
            t.blockedOn = i.tag === 3 ? i.stateNode.containerInfo : null;
            return;
          }
        }
      }
      t.blockedOn = null;
    }
    function Tc(t) {
      if (t.blockedOn !== null) return !1;
      for (var r = t.targetContainers; 0 < r.length; ) {
        var i = xm(t.nativeEvent);
        if (i === null) {
          i = t.nativeEvent;
          var l = new i.constructor(i.type, i);
          ((Ap = l), i.target.dispatchEvent(l), (Ap = null));
        } else return ((r = Oo(i)), r !== null && z_(r), (t.blockedOn = i), !1);
        r.shift();
      }
      return !0;
    }
    function j_(t, r, i) {
      Tc(t) && i.delete(r);
    }
    function I6() {
      ((wm = !1),
        pa !== null && Tc(pa) && (pa = null),
        ha !== null && Tc(ha) && (ha = null),
        ma !== null && Tc(ma) && (ma = null),
        qs.forEach(j_),
        Fs.forEach(j_));
    }
    function xc(t, r) {
      t.blockedOn === r &&
        ((t.blockedOn = null),
        wm ||
          ((wm = !0),
          e.unstable_scheduleCallback(e.unstable_NormalPriority, I6)));
    }
    var Cc = null;
    function $_(t) {
      Cc !== t &&
        ((Cc = t),
        e.unstable_scheduleCallback(e.unstable_NormalPriority, function () {
          Cc === t && (Cc = null);
          for (var r = 0; r < t.length; r += 3) {
            var i = t[r],
              l = t[r + 1],
              f = t[r + 2];
            if (typeof l != "function") {
              if (Cm(l || i) === null) continue;
              break;
            }
            var p = Oo(i);
            p !== null &&
              (t.splice(r, 3),
              (r -= 3),
              Ch(
                p,
                { pending: !0, data: f, method: i.method, action: l },
                l,
                f,
              ));
          }
        }));
    }
    function Vs(t) {
      function r(k) {
        return xc(k, t);
      }
      (pa !== null && xc(pa, t),
        ha !== null && xc(ha, t),
        ma !== null && xc(ma, t),
        qs.forEach(r),
        Fs.forEach(r));
      for (var i = 0; i < ga.length; i++) {
        var l = ga[i];
        l.blockedOn === t && (l.blockedOn = null);
      }
      for (; 0 < ga.length && ((i = ga[0]), i.blockedOn === null); )
        (U_(i), i.blockedOn === null && ga.shift());
      if (((i = (t.ownerDocument || t).$$reactFormReplay), i != null))
        for (l = 0; l < i.length; l += 3) {
          var f = i[l],
            p = i[l + 1],
            y = f[dn] || null;
          if (typeof p == "function") y || $_(i);
          else if (y) {
            var T = null;
            if (p && p.hasAttribute("formAction")) {
              if (((f = p), (y = p[dn] || null))) T = y.formAction;
              else if (Cm(f) !== null) continue;
            } else T = y.action;
            (typeof T == "function"
              ? (i[l + 1] = T)
              : (i.splice(l, 3), (l -= 3)),
              $_(i));
          }
        }
    }
    function Rm(t) {
      this._internalRoot = t;
    }
    ((wc.prototype.render = Rm.prototype.render =
      function (t) {
        var r = this._internalRoot;
        if (r === null) throw Error(o(409));
        var i = r.current,
          l = wn();
        N_(i, l, t, r, null, null);
      }),
      (wc.prototype.unmount = Rm.prototype.unmount =
        function () {
          var t = this._internalRoot;
          if (t !== null) {
            this._internalRoot = null;
            var r = t.containerInfo;
            (N_(t.current, 2, null, t, null, null), sc(), (r[Ro] = null));
          }
        }));
    function wc(t) {
      this._internalRoot = t;
    }
    wc.prototype.unstable_scheduleHydration = function (t) {
      if (t) {
        var r = nS();
        t = { blockedOn: null, target: t, priority: r };
        for (var i = 0; i < ga.length && r !== 0 && r < ga[i].priority; i++);
        (ga.splice(i, 0, t), i === 0 && U_(t));
      }
    };
    var I_ = n.version;
    if (I_ !== "19.1.0") throw Error(o(527, I_, "19.1.0"));
    Y.findDOMNode = function (t) {
      var r = t._reactInternals;
      if (r === void 0)
        throw typeof t.render == "function"
          ? Error(o(188))
          : ((t = Object.keys(t).join(",")), Error(o(268, t)));
      return (
        (t = h(r)),
        (t = t !== null ? m(t) : null),
        (t = t === null ? null : t.stateNode),
        t
      );
    };
    var H6 = {
      bundleType: 0,
      version: "19.1.0",
      rendererPackageName: "react-dom",
      currentDispatcherRef: z,
      reconcilerVersion: "19.1.0",
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
      var Rc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!Rc.isDisabled && Rc.supportsFiber)
        try {
          ((fn = Rc.inject(H6)), (Tt = Rc));
        } catch {}
    }
    return (
      (Xi.createRoot = function (t, r) {
        if (!s(t)) throw Error(o(299));
        var i = !1,
          l = "",
          f = n1,
          p = r1,
          y = a1,
          T = null;
        return (
          r != null &&
            (r.unstable_strictMode === !0 && (i = !0),
            r.identifierPrefix !== void 0 && (l = r.identifierPrefix),
            r.onUncaughtError !== void 0 && (f = r.onUncaughtError),
            r.onCaughtError !== void 0 && (p = r.onCaughtError),
            r.onRecoverableError !== void 0 && (y = r.onRecoverableError),
            r.unstable_transitionCallbacks !== void 0 &&
              (T = r.unstable_transitionCallbacks)),
          (r = M_(t, 1, !1, null, null, i, l, f, p, y, T, null)),
          (t[Ro] = r.current),
          um(t),
          new Rm(r)
        );
      }),
      (Xi.hydrateRoot = function (t, r, i) {
        if (!s(t)) throw Error(o(299));
        var l = !1,
          f = "",
          p = n1,
          y = r1,
          T = a1,
          k = null,
          $ = null;
        return (
          i != null &&
            (i.unstable_strictMode === !0 && (l = !0),
            i.identifierPrefix !== void 0 && (f = i.identifierPrefix),
            i.onUncaughtError !== void 0 && (p = i.onUncaughtError),
            i.onCaughtError !== void 0 && (y = i.onCaughtError),
            i.onRecoverableError !== void 0 && (T = i.onRecoverableError),
            i.unstable_transitionCallbacks !== void 0 &&
              (k = i.unstable_transitionCallbacks),
            i.formState !== void 0 && ($ = i.formState)),
          (r = M_(t, 1, !0, r, i ?? null, l, f, p, y, T, k, $)),
          (r.context = D_(null)),
          (i = r.current),
          (l = wn()),
          (l = bp(l)),
          (f = Jr(l)),
          (f.callback = null),
          ea(i, f, l),
          (i = l),
          (r.current.lanes = i),
          Zi(r, i),
          hr(r),
          (t[Ro] = r.current),
          um(t),
          new wc(r)
        );
      }),
      (Xi.version = "19.1.0"),
      Xi
    );
  }
  var Vv;
  function S4() {
    if (Vv) return cp.exports;
    Vv = 1;
    function e() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
        } catch (n) {
          console.error(n);
        }
    }
    return (e(), (cp.exports = v4()), cp.exports);
  }
  var E4 = S4();
  const Kv = di(E4);
  var pp = ((e) => (
    (e.OPEN_PAGE = "OPEN_PAGE"),
    (e.PLAY_SOUND = "PLAY_SOUND"),
    (e.GET_JOB_DETAILS = "GET_JOB_DETAILS"),
    e
  ))(pp || {});
  const _4 = { Message: pp },
    Ia = vt.create({
      adapter: "fetch",
      baseURL: "https://www.uptoolkit.io/api",
    });
  Ia.interceptors.response.use(qm.logRequest);
  const T4 = {
      deactivate: async (e) =>
        (await Ia.delete("/subscription", { headers: { "X-License-Key": e } }))
          .data,
      getSubscription: async (e) =>
        (await Ia.get("/subscription", { headers: { "X-License-Key": e } }))
          .data,
      generateCoverLetter: async (e) => {
        const n = await Ia.post(
          "/subscription/generate",
          { prompt: e.prompt },
          {
            responseType: "stream",
            headers: { "X-License-Key": e.licenseKey },
          },
        );
        if (!n.data) throw new Error("No data");
        const a = new TextDecoder();
        let o = "";
        for await (const s of n.data) {
          const u = a.decode(s, { stream: !0 });
          o += u;
          let c = 0,
            d = 0;
          for (; d < o.length && ((c = o.indexOf("{", d)), c !== -1); ) {
            let h = 0,
              m = !1;
            for (let b = c; b < o.length; b++)
              if ((o[b] === "{" && h++, o[b] === "}" && h--, h === 0)) {
                ((d = b + 1), (m = !0));
                break;
              }
            if (!m) break;
            const g = o.substring(c, d);
            try {
              const b = JSON.parse(g);
              if (b.choices && b.choices[0] && b.choices[0].delta) {
                const x = b.choices[0].delta.content || "";
                e.onChunk(x);
              } else b.content ? e.onChunk(b.content) : e.onChunk(g);
            } catch (b) {
              (console.error("Error parsing JSON:", b), e.onChunk(g));
            }
          }
          o = o.substring(d);
        }
        o.trim() && e.onChunk(o);
      },
      getProducts: async () => (await Ia.get("/subscription/products")).data,
      reactivate: async (e) =>
        (
          await Ia.post(
            "/subscription/reactivate",
            {},
            { headers: { "X-License-Key": e } },
          )
        ).data,
      updateSubscription: async (e) =>
        (
          await Ia.put(
            "/subscription",
            {
              priceId: e.priceId,
              devices: e.devices,
              instanceId: e.instanceId,
            },
            { headers: { "X-License-Key": e.licenseKey } },
          )
        ).data,
    },
    x4 = (e) => {
      const n = O.useRef(null),
        a = (s) => {
          switch (s) {
            case Yi.TITLE:
              return e.jobTitle ?? s;
            case Yi.JOB_DESCRIPTION:
              return e.jobDescription ?? s;
            default:
              return s;
          }
        },
        o = (s) => {
          const u = n.current,
            c = a(s);
          if (!u) return;
          const d = u.selectionStart;
          (e.onPromptChange(e.prompt.slice(0, d) + c + e.prompt.slice(d)),
            setTimeout(() => {
              if (u) {
                u.focus();
                const h = d + c.length;
                u.setSelectionRange(h, h);
              }
            }, 0));
        };
      return P.jsxs(P.Fragment, {
        children: [
          P.jsxs(n4, {
            direction: "row",
            spacing: 1,
            sx: { mt: 2 },
            children: [
              P.jsx(Kr, {
                size: "small",
                variant: "outlined",
                onClick: () => o(Yi.TITLE),
                children: "Job title",
              }),
              P.jsx(Kr, {
                size: "small",
                variant: "outlined",
                onClick: () => o(Yi.JOB_DESCRIPTION),
                children: "Job description",
              }),
            ],
          }),
          P.jsx(Uv, {
            fullWidth: !0,
            multiline: !0,
            minRows: 5,
            maxRows: 20,
            sx: { mt: 2 },
            value: e.prompt,
            inputRef: n,
            disabled: e.disabled,
            placeholder: up.defaultPrompt,
            onChange: (s) => e.onPromptChange(s.target.value),
          }),
        ],
      });
    },
    Yv = (e) =>
      O.useEffect(() => {
        const n = (a) =>
          a.key === e.key &&
          (!e.ctrlKey || a.metaKey || a.ctrlKey) &&
          e.onKeyPress();
        return (
          window.addEventListener("keydown", n),
          () => window.removeEventListener("keydown", n)
        );
      }, [e.key, e.ctrlKey, e.onKeyPress]),
    C4 = N0(
      P.jsx("path", {
        d: "M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3z",
      }),
    ),
    w4 = (e) => {
      var _, v;
      const n = O.useContext(Vf),
        [a, o] = O.useState(""),
        [s, u] = O.useState(null),
        [c, d] = O.useState(!1),
        [h, m] = O.useState(() =>
          n.prompt
            .replace("#{title}", `<title>${e.jobTitle}</title>`)
            .replace(
              "#{job_description}",
              `<job_description>${e.jobDescription}</job_description>`,
            ),
        ),
        [g, b] = O.useState("writingPrompt"),
        x = async () => {
          var E, w;
          (u(null), b("generating"), d(!0));
          try {
            await T4.generateCoverLetter({
              prompt: h,
              licenseKey:
                (E = n.globalState.subscription) == null
                  ? void 0
                  : E.license_key,
              onChunk: (D) => o((R) => R + D),
            });
          } catch (D) {
            (u(D),
              D instanceof Q2 &&
                ((w = D.response) == null ? void 0 : w.status) !== 403 &&
                bl(D));
          }
          d(!1);
        },
        C = () => {
          (An.runtime.sendMessage({
            url: "options.html#/subscription?changePlan=true",
            type: _4.Message.OPEN_PAGE,
          }),
            e.onClose());
        };
      return (
        Yv({
          key: "Enter",
          ctrlKey: !0,
          onKeyPress: () => {
            (g === "writingPrompt" && x(),
              g === "generating" && !c && e.onInsert(a));
          },
        }),
        (s == null ? void 0 : s.status) === 403
          ? P.jsxs(bv, {
              open: !0,
              fullWidth: !0,
              maxWidth: "md",
              scroll: "paper",
              onClose: e.onClose,
              slotProps: {
                paper: { sx: { height: "auto", maxHeight: "90vh" } },
              },
              children: [
                P.jsx(Ev, {
                  children: "You have reached limit of your subscription plan",
                }),
                P.jsx(Sv, {
                  sx: { pb: 1.5 },
                  children: P.jsxs(qd, {
                    children: [
                      "Your subscription plan allows generating",
                      " ",
                      (v =
                        (_ = n.globalState.subscription) == null
                          ? void 0
                          : _.stripe.items.data[0].plan.metadata) == null
                        ? void 0
                        : v.cover_letters_limit,
                      " ",
                      "cover letters per day.",
                      P.jsx("br", {}),
                      "Please wait for the limit to reset or upgrade your plan to continue using the extension.",
                    ],
                  }),
                }),
                P.jsxs(vv, {
                  sx: { px: 2.5 },
                  children: [
                    P.jsx(Kr, {
                      variant: "outlined",
                      onClick: e.onClose,
                      children: "Cancel (Esc)",
                    }),
                    P.jsx(Kr, {
                      sx: { px: 2 },
                      variant: "contained",
                      onClick: C,
                      endIcon: P.jsx(C4, {}),
                      children: "Upgrade",
                    }),
                  ],
                }),
              ],
            })
          : P.jsxs(bv, {
              open: !0,
              fullWidth: !0,
              maxWidth: "md",
              scroll: "paper",
              onClose: e.onClose,
              slotProps: {
                paper: { sx: { height: "auto", maxHeight: "90vh" } },
              },
              children: [
                P.jsx(Ev, { children: "Generate cover letter" }),
                P.jsxs(Sv, {
                  sx: { pb: 1.5 },
                  children: [
                    P.jsx(qd, {
                      sx: { mb: 2 },
                      children:
                        "Insert job title & description variables into the prompt using buttons below.",
                    }),
                    g === "writingPrompt" &&
                      P.jsx(x4, {
                        prompt: h,
                        disabled: !1,
                        jobTitle: e.jobTitle,
                        jobDescription: e.jobDescription,
                        onPromptChange: m,
                      }),
                    g === "generating" &&
                      P.jsx(Uv, {
                        fullWidth: !0,
                        multiline: !0,
                        minRows: 10,
                        value: a,
                        onChange: (E) => o(E.target.value),
                      }),
                  ],
                }),
                P.jsxs(vv, {
                  sx: { px: 2.5 },
                  children: [
                    P.jsx(Kr, {
                      variant: "outlined",
                      onClick: e.onClose,
                      children: "Cancel (Esc)",
                    }),
                    g === "writingPrompt" &&
                      P.jsxs(Kr, {
                        variant: "contained",
                        onClick: x,
                        children: ["Generate (", ip, " + Enter)"],
                      }),
                    g === "generating" &&
                      P.jsxs(Kr, {
                        variant: "contained",
                        loading: c,
                        onClick: () => e.onInsert(a),
                        children: ["Insert (", ip, " + Enter)"],
                      }),
                  ],
                }),
              ],
            })
      );
    },
    R4 = (e) => {
      const [n, a] = O.useState(!1),
        [o, s] = O.useState(null),
        u = () => a(!0),
        c = o == null ? void 0 : o.payload.opening.opening.title,
        d = o == null ? void 0 : o.payload.opening.opening.description;
      return (
        O.useEffect(() => {
          const h = window.location.pathname.split("/"),
            m = h[h.length - 2];
          (async () => {
            const [b, x] = await An.runtime.sendMessage({
              jobId: m,
              type: pp.GET_JOB_DETAILS,
            });
            (s(x), e.eventEmitter.emit($a.JOB_DETAILS_RECEIVED, x));
          })();
        }, []),
        O.useEffect(
          () => (
            e.eventEmitter.on($a.GENERATE_COVER_LETTER_CLICK, u),
            () => {
              e.eventEmitter.off($a.GENERATE_COVER_LETTER_CLICK, u);
            }
          ),
          [],
        ),
        n && c && d
          ? P.jsx(w4, {
              onClose: () => a(!1),
              onInsert: (h) => {
                (e.onInsert(h), a(!1));
              },
              jobTitle: c,
              jobDescription: d,
            })
          : null
      );
    },
    Yz = (e) => {
      const [n, a] = O.useState(null),
        o = O.useCallback(() => {
          e.eventEmitter.emit($a.GENERATE_COVER_LETTER_CLICK);
        }, [e.eventEmitter]);
      return (
        O.useEffect(() => {
          const s = (u) => {
            a(u);
          };
          return (
            e.eventEmitter.on($a.JOB_DETAILS_RECEIVED, s),
            () => {
              e.eventEmitter.off($a.JOB_DETAILS_RECEIVED, s);
            }
          );
        }, [e.eventEmitter]),
        Yv({ key: "Enter", ctrlKey: !0, onKeyPress: o }),
        n
          ? P.jsxs(Kr, {
              variant: "contained",
              sx: { mb: 2 },
              onClick: o,
              children: ["Generate (", ip, " + Enter)"],
            })
          : null
      );
    },
    A4 = {
      allFrames: !0,
      runAt: "document_end",
      registration: "manifest",
      matches: ["https://*.upwork.com/nx/proposals/job/*/apply*"],
      async main(e) {
        const n = await Pr.get(),
          a = () =>
            new Promise((o, s) => {
              let u = 10;
              const c = setInterval(() => {
                if (u === 0)
                  return s(
                    new Error("Could not find cover letter textarea element"),
                  );
                const d = document.querySelector(
                  'textarea[aria-labelledby="cover_letter_label"]',
                );
                (d && (clearInterval(c), o(d)), --u);
              }, 500);
            });
        window.onload = async () => {
          var s, u;
          let o = null;
          try {
            o = await a();
          } catch (c) {
            bl(c, { data: { pathname: window.location.pathname } });
            return;
          }
          try {
            const c = await h4.get();
            ((o.value = c), o.dispatchEvent(new InputEvent("input")));
          } catch (c) {
            bl(c);
          }
          try {
            const c = "upwork-toolkit-root-container",
              d = "upwork-toolkit-button-container",
              h = document.querySelector(".cover-letter-area"),
              m =
                ((s = n.subscription) == null ? void 0 : s.stripe.status) ===
                  "active" ||
                ((u = n.subscription) == null ? void 0 : u.stripe.status) ===
                  "past_due";
            if (!h || !m) return;
            const g = Dm(e, {
                name: "dialog-container",
                anchor: "body",
                position: "inline",
                onMount: () => {
                  const _ = document.createElement("div");
                  ((_.id = c), document.body.appendChild(_));
                  const v = Kv.createRoot(document.getElementById(c));
                  return (
                    v.render(
                      P.jsx(p4, {
                        children: P.jsx(c4, {
                          disableDarkMode: !0,
                          scopedCssBaseline: !0,
                          children: P.jsx(R4, {
                            eventEmitter: g4,
                            onInsert: (E) => {
                              ((o.value = E),
                                o.dispatchEvent(new InputEvent("input")));
                            },
                          }),
                        }),
                      }),
                    ),
                    v
                  );
                },
                onRemove: (_) => {
                  _ == null || _.unmount();
                },
              }),
              b = Dm(e, {
                name: "button-container",
                anchor: h,
                position: "overlay",
                alignment: "bottom-right",
                onMount: () => {
                  const _ = document.createElement("div");
                  return (
                    (_.id = d),
                    h.appendChild(_),
                    Kv.createRoot(document.getElementById(d))
                  );
                },
                onRemove: (_) => {
                  _ == null || _.unmount();
                },
              }),
              [x, C] = await Promise.all([g, b]);
            (x.mount(), C.mount());
          } catch (c) {
            bl(c);
          }
        };
      },
    },
    yu = class yu extends Event {
      constructor(n, a) {
        (super(yu.EVENT_NAME, {}), (this.newUrl = n), (this.oldUrl = a));
      }
    };
  Jn(yu, "EVENT_NAME", mp("wxt:locationchange"));
  let hp = yu;
  function mp(e) {
    var n;
    return `${(n = An == null ? void 0 : An.runtime) == null ? void 0 : n.id}:content:${e}`;
  }
  function O4(e) {
    let n, a;
    return {
      run() {
        n == null &&
          ((a = new URL(location.href)),
          (n = e.setInterval(() => {
            let o = new URL(location.href);
            o.href !== a.href && (window.dispatchEvent(new hp(o, a)), (a = o));
          }, 1e3)));
      },
    };
  }
  const Wi = class Wi {
    constructor(n, a) {
      Jn(this, "isTopFrame", window.self === window.top);
      Jn(this, "abortController");
      Jn(this, "locationWatcher", O4(this));
      Jn(this, "receivedMessageIds", new Set());
      ((this.contentScriptName = n),
        (this.options = a),
        (this.abortController = new AbortController()),
        this.isTopFrame
          ? (this.listenForNewerScripts({ ignoreFirstEvent: !0 }),
            this.stopOldScripts())
          : this.listenForNewerScripts());
    }
    get signal() {
      return this.abortController.signal;
    }
    abort(n) {
      return this.abortController.abort(n);
    }
    get isInvalid() {
      return (
        An.runtime.id == null && this.notifyInvalidated(),
        this.signal.aborted
      );
    }
    get isValid() {
      return !this.isInvalid;
    }
    onInvalidated(n) {
      return (
        this.signal.addEventListener("abort", n),
        () => this.signal.removeEventListener("abort", n)
      );
    }
    block() {
      return new Promise(() => {});
    }
    setInterval(n, a) {
      const o = setInterval(() => {
        this.isValid && n();
      }, a);
      return (this.onInvalidated(() => clearInterval(o)), o);
    }
    setTimeout(n, a) {
      const o = setTimeout(() => {
        this.isValid && n();
      }, a);
      return (this.onInvalidated(() => clearTimeout(o)), o);
    }
    requestAnimationFrame(n) {
      const a = requestAnimationFrame((...o) => {
        this.isValid && n(...o);
      });
      return (this.onInvalidated(() => cancelAnimationFrame(a)), a);
    }
    requestIdleCallback(n, a) {
      const o = requestIdleCallback((...s) => {
        this.signal.aborted || n(...s);
      }, a);
      return (this.onInvalidated(() => cancelIdleCallback(o)), o);
    }
    addEventListener(n, a, o, s) {
      var u;
      (a === "wxt:locationchange" && this.isValid && this.locationWatcher.run(),
        (u = n.addEventListener) == null ||
          u.call(n, a.startsWith("wxt:") ? mp(a) : a, o, {
            ...s,
            signal: this.signal,
          }));
    }
    notifyInvalidated() {
      (this.abort("Content script context invalidated"),
        Nc.debug(
          `Content script "${this.contentScriptName}" context invalidated`,
        ));
    }
    stopOldScripts() {
      window.postMessage(
        {
          type: Wi.SCRIPT_STARTED_MESSAGE_TYPE,
          contentScriptName: this.contentScriptName,
          messageId: Math.random().toString(36).slice(2),
        },
        "*",
      );
    }
    verifyScriptStartedEvent(n) {
      var u, c, d;
      const a =
          ((u = n.data) == null ? void 0 : u.type) ===
          Wi.SCRIPT_STARTED_MESSAGE_TYPE,
        o =
          ((c = n.data) == null ? void 0 : c.contentScriptName) ===
          this.contentScriptName,
        s = !this.receivedMessageIds.has(
          (d = n.data) == null ? void 0 : d.messageId,
        );
      return a && o && s;
    }
    listenForNewerScripts(n) {
      let a = !0;
      const o = (s) => {
        if (this.verifyScriptStartedEvent(s)) {
          this.receivedMessageIds.add(s.data.messageId);
          const u = a;
          if (((a = !1), u && n != null && n.ignoreFirstEvent)) return;
          this.notifyInvalidated();
        }
      };
      (addEventListener("message", o),
        this.onInvalidated(() => removeEventListener("message", o)));
    }
  };
  Jn(Wi, "SCRIPT_STARTED_MESSAGE_TYPE", mp("wxt:content-script-started"));
  let gp = Wi;
  function Xz() {}
  function gu(e, ...n) {}
  const M4 = {
    debug: (...e) => gu(console.debug, ...e),
    log: (...e) => gu(console.log, ...e),
    warn: (...e) => gu(console.warn, ...e),
    error: (...e) => gu(console.error, ...e),
  };
  return (async () => {
    try {
      const { main: e, ...n } = A4,
        a = new gp("content", n);
      return await e(a);
    } catch (e) {
      throw (
        M4.error('The content script "content" crashed on startup!', e),
        e
      );
    }
  })();
})();
content;
//# sourceMappingURL=content.js.map
