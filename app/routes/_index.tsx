import type { Route } from "./+types/_index";

export function meta({ params: _params }: Route.MetaArgs) {
  return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}

export const loader = async (args: Route.LoaderArgs) => {
  const extra = args.context.extra;
  const cloudflare = args.context.cloudflare;
  const isWaitUntilDefined = !!cloudflare.ctx.waitUntil;
  const users = await args.context.db.query.usersTable.findMany();
  try {
    const cache = await args.context.cloudflare.caches.default;
    console.log(cache.match);
  } catch (err) {
    console.log(err);
  }

  return { cloudflare, extra, isWaitUntilDefined, users };
};

export default function Home({ loaderData }: Route.ComponentProps) {
  const { cloudflare, extra, isWaitUntilDefined, users } = loaderData;
  return (
    <div>
      <main className="container mx-auto p-4 pt-16">
        <h1 className="text-4xl font-bold mb-8">React Router v7 with Cloudflare Workers using Drizzle ORM</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Environment Variables</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p>
              <span className="font-medium">MY_VAR value: </span>
              {cloudflare.env.MY_VAR}
              <span className="text-gray-600 text-sm ml-2">(Set in Cloudflare Workers environment variables)</span>
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Extra Context Data</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p>
              <span className="font-medium">Extra Value: </span>
              {extra}
              <span className="text-gray-600 text-sm ml-2">(Custom data passed through Worker context)</span>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Database Users</h2>
          <div className="bg-gray-100 p-4 rounded-lg overflow-auto">
            <pre className="text-sm">{JSON.stringify(users, null, 2)}</pre>
            <p className="text-gray-600 text-sm mt-2">(Data fetched from connected database using Drizzle ORM)</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Available Cloudflare Features</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p>
              <span className="font-medium">Cloudflare Runtime APIs: </span>
              {[cloudflare.cf && "CF (Country/Region info)", cloudflare.ctx && "CTX (Runtime context)", cloudflare.caches && "Caches API"]
                .filter(Boolean)
                .join(", ") || "None available"}
            </p>
            <p>
              <span className="font-medium">waitUntil Status: </span>
              <span className={isWaitUntilDefined ? "text-green-600" : "text-red-600"}>{isWaitUntilDefined ? "Available ✓" : "Not Available ✗"}</span>
              <span className="text-gray-600 text-sm ml-2">(Used for background tasks in Workers)</span>
            </p>
          </div>
          <section>
            <h3 className="text-xl font-semibold mb-2">CF</h3>
            <div className="bg-gray-100 p-4 rounded-lg overflow-auto">
              <pre className="text-sm h-[320px]">{JSON.stringify(cloudflare.cf, null, 2)}</pre>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
