import { reactRouter } from "@react-router/dev/vite";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { getLoadContext } from "./load-context";

export default defineConfig({
  plugins: [cloudflareDevProxy({ getLoadContext }), tailwindcss(), reactRouter(), tsconfigPaths()],
  ssr: {
    resolve: {
      conditions: [
        "workerd", // Cloudflare Workers
        "worker", // General Web Workers
        "browser", // Browser
      ],
    },
  },
  resolve: {
    mainFields: ["browser", "module", "main"],
  },
});
