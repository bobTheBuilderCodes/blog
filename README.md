# The Margin

An editorial publishing platform built with React, TypeScript, Vite, Express, and MongoDB. It pairs a magazine-like public reading experience with an authenticated publishing studio.

## Start locally

1. Copy `.env.example` to `.env`, and `client/.env.example` to `client/.env`. Set `MONGODB_URI`, `COOKIE_SECRET`, `ADMIN_EMAIL`, and a **bcrypt hash** in `ADMIN_PASSWORD` (for example, generate one with `npx bcryptjs-cli hash 'your-password'`).
2. Install dependencies: `npm install`
3. Add the first editorial issue: `npm run seed`
4. Start client and API: `npm run dev`

For local development the client proxy reads `VITE_DEV_API_URL` from `client/.env`; set `VITE_API_URL` for a deployed client. `CLIENT_URL` must be the deployed client origin on the API. The studio login is at `/studio/login`.

## Deployment

- Deploy `client` to Vercel with build command `npm run build -w client` and output directory `client/dist`. Set `VITE_API_URL` to the deployed API origin.
- Deploy `server` to Render with build command `npm install && npm run build -w server` and start command `npm run start -w server`.
- Set `CLIENT_URL`, `PUBLIC_SITE_URL`, `MONGODB_URI`, `COOKIE_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and (for cover uploads) the three Cloudinary variables in the server environment.

`ADMIN_PASSWORD` is deliberately compared against a bcrypt hash. It is never sent to, stored by, or exposed to the frontend. Cookies are signed, HTTP-only, SameSite-protected, and secure in production.

## Features

- SEO-aware article routes, canonical metadata, Open Graph cards, `robots.txt`, and dynamic sitemap.
- Anonymous browser-scoped likes, moderated comments, rate limits, sanitization, and request validation.
- Draft/publish workflows, automatic reading-time calculation, article management, image upload endpoint for Cloudinary, and comment moderation.
- Optional non-autoplay ambient audio player. Add licensed MP3 files under `client/public/audio/` using the supplied track IDs to enable playback.
