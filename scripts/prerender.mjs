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
  const routes = await routesFromSitemap();
  console.log(`[prerender] ${routes.length} routes from sitemap`);

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

      // Remove the GTM tag that the inline bootstrap injected at runtime, so it
      // does not load a SECOND time on a real visit (the inline snippet in
      // <head> re-injects it once on its own). Analytics fires exactly once.
      await page.evaluate(() => {
        document
          .querySelectorAll('script[src*="googletagmanager.com/gtm.js"]')
          .forEach((el) => el.remove());
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
    const outPath =
      route === '/'
        ? path.join(PUBLIC_DIR, 'index.html')
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
