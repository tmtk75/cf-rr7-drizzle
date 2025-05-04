import type { PlatformProxy } from "wrangler";
import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "./drizzle/schema";

type GetLoadContextArgs = {
  request: Request;
  context: {
    cloudflare: Omit<PlatformProxy<Env>, "dispose" | "caches" | "cf"> & {
      caches: PlatformProxy<Env>["caches"]; // | CacheStorage;
      cf: Request["cf"];
    };
  };
};

declare module "react-router" {
  interface AppLoadContext extends Awaited<ReturnType<typeof getLoadContext>> {
    extra: string;
  }
}

export async function getLoadContext({ context }: GetLoadContextArgs) {
  const db = drizzle(context.cloudflare.env.DB, { schema });
  return {
    ...context,
    extra: "stuff",
    db,
  };
}
