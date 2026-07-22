/**
 * Local static server that mimics Firebase Hosting resolution for verifying the
 * prerendered dist/public build: exact file → <path>/index.html → SPA fallback.
 * Dev/verification only; not deployed.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'dist', 'public');
const PORT = Number(process.env.PORT) || 8899;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
};

function send(res, filePath) {
  const ext = path.extname(filePath);
  readFile(filePath).then((body) => {
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(body);
  });
}

createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  let p = path.join(PUBLIC_DIR, urlPath);
  if (!p.startsWith(PUBLIC_DIR)) return res.writeHead(403).end();
  if (existsSync(p) && statSync(p).isFile()) return send(res, p);
  const asIndex = path.join(p, 'index.html');
  if (existsSync(asIndex)) return send(res, asIndex);
  return send(res, path.join(PUBLIC_DIR, 'index.html'));
}).listen(PORT, () => console.log(`serving dist/public on http://localhost:${PORT}`));
