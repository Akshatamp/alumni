# Alumni Connect

The portal is a client-side React application built with Vite. It calls the
existing CampusOS API; Django remains responsible for authentication, data,
permissions, and uploads.

## Local development

Use Node.js 22 or a supported current Node.js release:

```bash
npm ci
npm run dev
```

Create `.env.local` in the project root to configure the API:

```dotenv
VITE_API_URL=https://campusos.haegl.in/api
```

Vite only exposes environment variables prefixed with `VITE_`. Set this value
before building because it is included in the generated browser assets.
The checked-in `.env.production` already selects the hosted CampusOS API for
production builds; `.env.local` can continue to point at a local API while
developing.

## Production build

```bash
npm ci --no-audit --no-fund --maxsockets=1
npm run build
```

Vite writes the static site to `dist/`. Upload the **contents** of `dist/` to
the document root configured for `alumni.haegl.in`. No Node.js application or
`server.js` is needed to serve the built site. The included `public/.htaccess`
supports direct navigation and refreshes on client-side routes when Apache
`mod_rewrite` is enabled.

If building on another machine, set `VITE_API_URL` in that build environment
and upload the resulting `dist/` directory. Do not upload `node_modules/`.

## API and CORS

The API remains at `https://campusos.haegl.in/api`. CampusOS must allow the
portal origin (`https://alumni.haegl.in`) in its CORS configuration. CORS
settings do not affect building the static portal.
# alumni
