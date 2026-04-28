import { i as d } from "./_virtual_wxt-plugins-C1xRqpYK.js";
try {
  let r =
      typeof window < "u"
        ? window
        : typeof global < "u"
          ? global
          : typeof globalThis < "u"
            ? globalThis
            : typeof self < "u"
              ? self
              : {},
    o = new r.Error().stack;
  o &&
    ((r._sentryDebugIds = r._sentryDebugIds || {}),
    (r._sentryDebugIds[o] = "315aaaa5-6d9b-402f-a459-35ae46716bc3"),
    (r._sentryDebugIdIdentifier =
      "sentry-dbid-315aaaa5-6d9b-402f-a459-35ae46716bc3"));
} catch {}
(function () {
  const o = document.createElement("link").relList;
  if (o && o.supports && o.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) n(e);
  new MutationObserver((e) => {
    for (const t of e)
      if (t.type === "childList")
        for (const i of t.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && n(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(e) {
    const t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === "use-credentials"
        ? (t.credentials = "include")
        : e.crossOrigin === "anonymous"
          ? (t.credentials = "omit")
          : (t.credentials = "same-origin"),
      t
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = s(e);
    fetch(e.href, t);
  }
})();
try {
  d();
} catch (r) {
  console.error("[wxt] Failed to initialize plugins", r);
}
//# sourceMappingURL=_virtual_wxt-html-plugins-DkfCEB4M.js.map
