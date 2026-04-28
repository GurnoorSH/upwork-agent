import "./_virtual_wxt-html-plugins-DkfCEB4M.js";
import { b as t, r, c as d } from "./_virtual_wxt-plugins-C1xRqpYK.js";
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
    n = new e.Error().stack;
  n &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[n] = "2e1edc99-5823-4b9d-8ea5-7f896433ca85"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-2e1edc99-5823-4b9d-8ea5-7f896433ca85"));
} catch {}
t.runtime.onMessage.addListener(async (e) => {
  try {
    if (!r.isPlaySoundMessage(e)) return;
    const n = new Audio(t.runtime.getURL("sound.mp3"));
    ((n.volume = e.volume / 100),
      n.addEventListener("ended", async () => {
        try {
          await t.offscreen.closeDocument();
        } catch {}
      }),
      await n.play());
  } catch (n) {
    d(n);
  }
});
//# sourceMappingURL=offscreen-DurcmbxY.js.map
