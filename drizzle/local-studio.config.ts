import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./drizzle/schema.ts",
  dialect: "sqlite",
  // driver: "better-sqlite",
  //
  //
  // "@libsql/client": "^0.15.4", is needed
  //
  dbCredentials: {
    url: "file:./.wrangler/state/v3/d1/miniflare-D1DatabaseObject/b9c3008454c07803656d31db5071cb5e326bc657fce1e428d47862a4a1c842ca.sqlite",
  },
});
