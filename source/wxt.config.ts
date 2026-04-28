import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "wxt";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  manifestVersion: 3,
  modules: ["@wxt-dev/module-react"],
  alias: {
    "@": resolve(rootDir, "src")
  },
  vite: () => ({
    resolve: {
      alias: {
        "@": resolve(rootDir, "src")
      }
    }
  }),
  manifest: {
    name: "Upwork Toolkit - Agent Edition",
    description: "Save time and earn more with Upwork toolkit.",
    version: "1.5.48",
    action: {
      default_icon: "icon/32.png"
    },
    icons: {
      16: "icon/16.png",
      24: "icon/24.png",
      32: "icon/32.png",
      48: "icon/48.png",
      128: "icon/128.png",
      500: "icon/500.png"
    },
    permissions: [
      "idle",
      "alarms",
      "storage",
      "cookies",
      "offscreen",
      "notifications",
      "declarativeNetRequest"
    ],
    host_permissions: ["https://*.upwork.com/", "https://generativelanguage.googleapis.com/*"],
    declarative_net_request: {
      rule_resources: [
        {
          id: "ruleset_1",
          enabled: true,
          path: "request_modifier.json"
        }
      ]
    }
  }
});
