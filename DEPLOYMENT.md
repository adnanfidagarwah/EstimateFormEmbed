# Deployment Guide

This project now ships as a static Vite client plus a set of lightweight serverless APIs. The same codebase can be deployed to either Vercel or Netlify without additional restructuring.

## Project layout

- `client/` - Vite React app. `npm run build` outputs static assets into `dist/public`.
- `backend/` - Shared server-only utilities (mailer + Google Places helpers).
- `api/` - Vercel serverless functions (`/api/...` routes).
- `netlify/functions/` - Netlify equivalents that import the exact same backend utilities.

## Environment variables

Populate `.env`/project settings with:

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `RECIPIENT_EMAIL`
- `GOOGLE_PLACES_API_KEY`

Both Vercel and Netlify functions read these variables at runtime.

## Local development

1. `npm install`
2. `npm run dev` to run the Vite dev server (served from `http://localhost:5173`).
3. To exercise the API locally use either `vercel dev` or `netlify dev` so that `/api/*` routes proxy to the corresponding serverless functions.

## Deploying to Vercel

- **Framework preset:** `Other`.
- **Build command:** `npm run build`
- **Output directory:** `dist/public`
- The default `api/**` folder automatically becomes serverless functions. The provided `vercel.json` adds a SPA fallback so client-side routing keeps working.

## Deploying to Netlify

- The included `netlify.toml` sets the build command/output folder and maps the `/api/*` routes to the generated functions.
- `npm run build` before deploying locally, or let Netlify run it in CI.

## Available endpoints

- `POST /api/cleaning-inquiry`
- `POST /api/commercial-inquiry`
- `GET /api/places/autocomplete`
- `GET /api/places/details`

These endpoints are identical on both hosting providers; client code continues to call `/api/...` regardless of the platform.
