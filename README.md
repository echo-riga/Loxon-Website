This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

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
