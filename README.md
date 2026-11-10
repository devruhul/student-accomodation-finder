# StudentStay UK

StudentStay helps students find a place to live by filtering sample UK
accommodation listings by city, monthly budget, room type, university distance,
and availability. Students can inspect a listing and save favourites in their
browser.

See [REQUIREMENTS.md](./REQUIREMENTS.md) for the MVP requirements and acceptance
criteria.

## Architecture

This is one repository with separate frontend and API code:

- `src/` is the React and Vite frontend.
- `backend/` is the Express API used during local development. It serves the
  sample listings without requiring a database.
- `netlify/functions/` exposes the same read-only API routes as a Netlify
  Function for production deployment.

Keeping both parts together makes the MVP simple to run and deploy. They remain
separate application layers, so the API can move to a dedicated server later if
the product needs long-running jobs, user accounts, or a database-backed
listing service.

## Run locally

Requirements: Node.js 20.19+ or 22.12+ and npm.

Install the frontend dependencies once:

```sh
npm install
```

Start the frontend:

```sh
npm run dev
```

The frontend runs at <http://localhost:5173>. It uses the Express API when
available and falls back to local sample listings when the API is offline.

To run the API as well, open another terminal:

```sh
npm install --prefix backend
npm run dev:backend
```

The API runs at <http://localhost:5000>. Check
<http://localhost:5000/api/health> to confirm it is responding.

## Build and deploy to Netlify

The root `netlify.toml` configures the Vite build, publishes `dist/`, routes
`/api/health` and `/api/properties` to a Netlify Function, and sends frontend
routes to the React app.

To deploy through Netlify's Git integration, import this repository in Netlify;
the build command and publish directory are read from `netlify.toml`. To deploy
from a terminal, install and sign in to the Netlify CLI, then run:

```sh
netlify init
netlify deploy --build --prod
```

No database or application secrets are required for the sample-data MVP.

## Current release boundaries

The MVP has public sample listings and browser-local favourites. Accounts,
landlord listing management, booking/payment, reviews, and a production listing
feed need their own requirements and persistent storage before implementation.
