# Loxon Website

The public website for Loxon Philippines, Inc., featuring the company, engineering and construction projects, products and services, clients and partners, careers, contact forms, and chat.

Built with Next.js 14, React 18, TypeScript, and Tailwind CSS. Content, form submissions, and chat use the separate [Loxon Admin](https://github.com/echo-riga/Loxon-Admin) API. The website exports static HTML for hosting without a Node.js server.

## Local setup

Use Node.js 20 or newer. Install dependencies:

```sh
npm ci
```

Create .env.local with the Admin API origin:

```dotenv
NEXT_PUBLIC_ADMIN_API_BASE=http://localhost:3001
```

Start Admin separately on port 3001 with its database and integrations configured, then start this website:

```sh
npm run dev
```

Open http://localhost:3000. The API must be reachable during static builds as well as by visitors' browsers.

## Build

```sh
npm run build
```

The export is written to out/. Use static hosting for that directory; next start is not the serving workflow for this export. The package includes a lint script, but no automated test script.

## Environment

The public website is a static export. Projects, products/services, jobs, memberships, and partners are fetched from Admin in the browser on page load, every 60 seconds while the page is visible, and when the tab regains focus. Admin content changes do not require rebuilding the website. Loading and API errors are shown separately from empty collections; failed refreshes retain previously loaded content.

Content caching is managed by Admin's CDN response headers with a 60-second shared TTL. The website does not force request cache bypass or maintain a separate browser content cache. The automatic refresh interval is separate from the CDN cache TTL.

Set `NEXT_PUBLIC_ADMIN_API_BASE` in `.env.local` before building, for example:

```dotenv
NEXT_PUBLIC_ADMIN_API_BASE=https://your-admin-domain.example
```

This is a public URL embedded in the JavaScript build. Changing the API URL requires rebuilding. Do not put database, Groq, Redis, Resend, or Cloudinary secrets in the public website. Contact forms, job applications, and chat POST directly to Admin; authentication, validation, email delivery, and rate limiting run there.

## Static hosting

Run `npm run build` and upload the contents of `out/` to your static host. Routes use directories such as `projects/index.html` so direct navigation works on hosts that serve directory indexes. Serve the folder over HTTP(S); opening HTML directly using `file://` is not supported. Images load directly from their source URLs without a Next.js image server.

Configure `ALLOWED_ORIGINS` in the deployed Admin environment to include the exact public website origin (scheme and hostname, plus port when applicable). Redeploy Admin after changing its environment. Local origins `http://localhost:3000` and `http://localhost:3001` are already allowed by Admin. JSON POST requests require Admin's OPTIONS/CORS support. Keep Admin's Redis and other server credentials configured.

Static HTML includes current projects, products/services, jobs, memberships, and partners fetched from Admin during the build. The browser starts with that snapshot and refreshes it on load and every 60 seconds. Crawlers and visitors without JavaScript can read the exported content. API failures during export stop the build instead of silently replacing the snapshot with empty lists.

SEO metadata, canonical URLs, Open Graph/Twitter previews, robots.txt, the sitemap, and Organization structured data use `https://new.loxon.com.ph`. New admin content remains live for visitors, but updating the HTML snapshot for crawlers requires running `npm run build` and uploading `out/` again. JavaScript-capable crawlers may also index live updates before a new export; indexing is controlled by the search engine.
