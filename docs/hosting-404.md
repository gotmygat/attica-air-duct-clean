# Why firebase.json has no catch-all rewrite

Short version: so that a URL which does not exist returns a real HTTP 404 on the
first byte, instead of 200 carrying the home page's metadata.

## What it used to do

```json
"rewrites": [{ "source": "**", "destination": "/index.html" }]
```

That is the standard single-page-app config, and for an app that renders every
route in the browser it is correct. This site is no longer that. Every real
route is prerendered to a static file by scripts/prerender.mjs, so the catch-all
was only ever catching URLs that do not exist.

What it did to those was serve the SPA shell with a 200. Measured against
production on 2026-08-22:

```
GET /locations/made-up-zzz
200 OK
<title>Air Duct Cleaning Service Orlando | Attica Air Duct Cleaners</title>
<meta name="robots" content="index, follow">
```

Any URL anyone could type, or any crawler could invent, returned a complete
indexable page. LocationPage was separately fixed to render the 404 component
for an unknown city, but that fix runs in JavaScript, so the HTML above is still
what arrives first. Google renders JavaScript and would eventually see the
noindex. Bing, social scrapers and AI answer engines largely do not, and even
Google reads the raw response before it renders anything.

## What happens now

Firebase Hosting resolves a request in this order: reserved namespaces,
configured redirects, exact-match static content, configured rewrites, then the
404 page. With no rewrites configured, an unmatched path falls through to
`404.html` and is served with a genuine 404 status.

Two changes make that safe:

1. `scripts/prerender.mjs` now also renders `/thank-you` and `/404`, the only
   real routes absent from the sitemap. Without this, removing the rewrite would
   404 two working pages.
2. `/404` is written to `404.html` at the root rather than `404/index.html`,
   because that exact filename is the one Firebase looks for.

## The trade

Any route added to App.tsx in future must also be reachable by the prerenderer,
which in practice means it is either in the sitemap or listed in `EXTRA_ROUTES`.
A route that is neither will 404 in production while working fine in `vite dev`.

That is a real constraint and it is the intended one. The alternative is the
config this replaces, where a typo in a URL is indistinguishable from a real
page, and every mistake anyone makes becomes an indexable duplicate of the home
page.
