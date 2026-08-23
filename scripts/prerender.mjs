/**
 * ATTICA CLEANERS — Static prerender step.
 *
 * Runs AFTER `vite build`. Boots the freshly built SPA in headless Chrome,
 * visits every URL listed in the generated sitemap, waits for the React app
 * (and its <SEO> component) to finish rendering, then writes a fully-rendered
 * static HTML snapshot for each route into dist/public/<route>/index.html.
 *
 * Why: the site is a client-rendered SPA. Without this, every URL serves the
 * same empty <div id="root"> with the homepage's <title>/description/canonical.
 * Search engines that render JS eventually recover, but AI answer engines,
 * social scrapers, and Bing do not — and the homepage-pointing canonical on
 * every page is a duplicate-content risk. This bakes each page's real head
 * tags + visible content into the HTML that crawlers receive first.
 *
 * Visual behaviour for real users is unchanged: main.tsx uses
 * createRoot().render(), so React re-renders the identical app on top of the
 * snapshot — the snapshot is just what's shown before/without JS.
 */
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'dist', 'public');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

/** Parse <loc> paths out of the built sitemap so routes stay in sync with it. */
async function routesFromSitemap() {
  const xml = await readFile(path.join(PUBLIC_DIR, 'sitemap.xml'), 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const paths = locs.map((u) => {
    try {
      return new URL(u).pathname;
    } catch {
      return null;
    }
  });
  // De-dupe, ensure "/" is present, drop empties.
  return [...new Set(['/', ...paths.filter(Boolean)])];
}

/** Minimal static file server with SPA fallback to the original index.html. */
function startServer() {
  const indexHtmlPromise = readFile(path.join(PUBLIC_DIR, 'index.html'));
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(req.url.split('?')[0]);
      let filePath = path.join(PUBLIC_DIR, urlPath);
      // Prevent path traversal outside PUBLIC_DIR.
      if (!filePath.startsWith(PUBLIC_DIR)) {
        res.writeHead(403).end();
        return;
      }
      const ext = path.extname(filePath);
      if (ext && existsSync(filePath)) {
        const body = await readFile(filePath);
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(body);
        return;
      }
      // No file extension or missing → SPA fallback to index.html.
      res.writeHead(200, { 'Content-Type': MIME['.html'] });
      res.end(await indexHtmlPromise);
    } catch (err) {
      res.writeHead(500).end(String(err));
    }
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

async function main() {
  /**
   * Routes that must exist as files but must NOT be in the sitemap.
   *
   * The sitemap is the right source for indexable pages, and both of these are
   * deliberately absent from it: /thank-you is a post-submission page nobody
   * should reach from search, and /404 is an error page.
   *
   * They still have to be prerendered, and the reason is the whole point of this
   * change. firebase.json used to rewrite every unmatched path to index.html, so
   * a URL that did not exist returned 200 with the SPA shell, carrying the home
   * page's title and `robots: index, follow`, and only became a 404 once
   * JavaScript ran. Verified against production on 2026-08-22:
   * /locations/made-up-zzz returned 200 with `index, follow` in the raw HTML.
   *
   * With that rewrite removed, Firebase serves 404.html with a genuine HTTP 404
   * for anything it has no file for, which is what a crawler needs to see on the
   * first pass rather than after rendering. That only works if every REAL route
   * has a file, so these two have to be here or removing the rewrite would 404
   * two working pages.
   */
  const EXTRA_ROUTES = ['/thank-you', '/404'];

  const sitemapRoutes = await routesFromSitemap();
  const routes = [...sitemapRoutes, ...EXTRA_ROUTES];
  console.log(
    `[prerender] ${sitemapRoutes.length} routes from sitemap, plus ${EXTRA_ROUTES.length} unlisted (${EXTRA_ROUTES.join(', ')})`
  );

  const { server, port } = await startServer();
  const base = `http://127.0.0.1:${port}`;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const snapshots = new Map(); // route -> html (captured first, written after)
  let failures = 0;

  for (const route of routes) {
    const page = await browser.newPage();
    try {
      await page.goto(base + route, { waitUntil: 'networkidle0', timeout: 45000 });
      // Wait until React has rendered content AND the <SEO> effect has run
      // (it always sets a canonical link and a non-empty <title>).
      await page.waitForFunction(
        () =>
          document.querySelector('#root') &&
          document.querySelector('#root').children.length > 0 &&
          document.querySelector('link[rel="canonical"]') &&
          document.title.trim().length > 0,
        { timeout: 20000 },
      );
      // Small settle for any trailing effects (JSON-LD, lazy content).
      await new Promise((r) => setTimeout(r, 400));

      // Strip every Google tag artefact that was injected at runtime.
      //
      // The inline GTM snippet in <head> re-injects what it needs on a real
      // visit, so anything left in the snapshot loads a SECOND time. Worse,
      // GTM/gtag also append conversion and remarketing pixels as <img> and
      // <script> elements whose query strings freeze this build's timestamp
      // and the prerender server's 127.0.0.1 URL — every visitor would then
      // re-fire a stale build-time pixel. Match on host so loaders and
      // pixels alike are removed.
      //
      // The <noscript> GTM iframe in the source HTML is untouched: with
      // scripting enabled its contents are parsed as text, not DOM.
      await page.evaluate(() => {
        const TAG_HOSTS =
          /googletagmanager\.com|google-analytics\.com|analytics\.google\.com|doubleclick\.net|googleadservices\.com|google\.[a-z.]+\/(ccm|pagead|rmkt)/;
        document
          .querySelectorAll('script[src], img[src], iframe[src], link[href]')
          .forEach((el) => {
            const url = el.getAttribute('src') || el.getAttribute('href') || '';
            if (TAG_HOSTS.test(url)) el.remove();
          });
      });

      // Restore the async-stylesheet pattern.
      //
      // <head> loads the Google Fonts sheet with media="print" plus an onload
      // that flips it to "all" once fetched, so it never blocks the first
      // paint. By the time this snapshot is taken that onload has already
      // fired, so serialising the live DOM would bake media="all" into the
      // static HTML and turn a deliberately non-blocking stylesheet into a
      // render-blocking one for every visitor. Put "print" back.
      await page.evaluate(() => {
        document
          .querySelectorAll('link[rel="stylesheet"][onload*="this.media"]')
          .forEach((el) => el.setAttribute('media', 'print'));
      });

      // Belt and braces on the hero video source.
      //
      // <HeroVideo> already declines to attach it under Puppeteer, so normally
      // there is nothing here to remove. This stays as a backstop: if that
      // guard ever regresses, the source would otherwise be serialised into
      // the static HTML and every visitor would fetch ~850 KB during initial
      // load — exactly what the deferral exists to prevent. The poster
      // attribute is untouched; it carries the visual.
      await page.evaluate(() => {
        document.querySelectorAll('video').forEach((v) => {
          v.querySelectorAll('source').forEach((el) => el.remove());
          v.removeAttribute('src');
        });
      });

      const html = '<!doctype html>\n' + (await page.evaluate(() => document.documentElement.outerHTML));
      snapshots.set(route, html);
      const title = await page.title();
      console.log(`[prerender] ✓ ${route}  —  ${title}`);
    } catch (err) {
      failures++;
      console.error(`[prerender] ✗ ${route}  —  ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  if (snapshots.size === 0) {
    throw new Error('[prerender] captured 0 pages — aborting so the build fails loudly');
  }

  // Write snapshots. "/" overwrites the root index.html; others become
  // <route>/index.html so Firebase serves them directly.
  for (const [route, html] of snapshots) {
    /* /404 is written as 404.html at the root, not /404/index.html. That exact
       filename is Firebase Hosting's convention for the page it serves, with a
       real 404 status, when nothing else matches. Writing it anywhere else means
       Firebase falls back to its own generic error page instead. */
    const outPath =
      route === '/'
        ? path.join(PUBLIC_DIR, 'index.html')
        : route === '/404'
          ? path.join(PUBLIC_DIR, '404.html')
          : path.join(PUBLIC_DIR, route.replace(/^\/+/, ''), 'index.html');
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, html, 'utf8');
  }

  console.log(
    `[prerender] wrote ${snapshots.size} static pages` +
      (failures ? `, ${failures} failed` : ''),
  );
  if (failures) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
