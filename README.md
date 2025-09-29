# Lalasia Next.js Store

Migrated the existing Vite storefront to a fully featured Next.js 15 application using the App Router. The app renders the product catalogue with ISR-backed data fetching, MobX-powered cart/account state, and SCSS module styling that mirrors the original UI.

## Scripts

Use your preferred package manager (pnpm recommended):

```bash
pnpm install          # install dependencies
pnpm dev              # run the dev server (http://localhost:3000)
pnpm build            # create a production build with Next.js
pnpm start            # serve the production build
pnpm lint             # run ESLint checks
```

## Architecture Notes

- **App Router & ISR** – Product, category, and detail routes are server components that fetch via `fetch` with cached revalidation (e.g. `revalidate = 300`). The home route parallelises category/product fetches with `Promise.all`.
- **MobX Client State** – A `RootStoreProvider` wraps the layout and exposes MobX stores for authentication and cart state. Only cart/user flows and other interactive widgets are client components.
- **SCSS Modules & Design Fidelity** – Existing component styles were migrated to SCSS modules; global styles live in `shared/styles/global.scss` and fonts load through `next/font` (Roboto).
- **Routing & Metadata** – React Router was removed in favour of Next routes under `app/`. Each page defines metadata (including dynamic product metadata), and the project includes `app/error.tsx` plus `app/not-found.tsx`.
- **Assets & Images** – Product imagery uses `next/image` with remote patterns covering the Strapi CDN. Local SVG assets are imported directly into components.

## Deployment

The project is configured for Vercel deployment out of the box. Run `pnpm build && pnpm start` locally to validate the production bundle before deploying.
🔍  Inspect: https://vercel.com/blackrules-projects/next/FMmcf5ktawF43jmAKipSj9qqduXL [6s]
✅  Preview: https://next-2hee9knej-blackrules-projects.vercel.app
Old (vite) version: https://github.com/BlackRule/KTS_25_08_frontend-hw-2_onwards