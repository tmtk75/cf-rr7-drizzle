# README
* React Router v7
* Cloudflare Workers
* Tailwind CSS v4
* Drizzle

# dev
```
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```
To clean up,
```
rm -rf .wrangler
```

# prod
Make the database somehow. `main.tf` is prepared. You can use it.
Edit `wrangler.toml` with your own database id.

```
pnpm db:generate:[preview|production]
pnpm db:migrate:[preview|production]
pnpm db:seed:[preview|production]
```
```
pnpm deploy:[preview|production]
```
