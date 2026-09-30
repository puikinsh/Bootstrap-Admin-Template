// scripts/smoke-test.mjs
//
// Loads every built page in a real browser and fails on anything a user would
// notice: uncaught exceptions, console errors, failed requests, pages that
// render no charts, and any request that leaves the origin.
//
// The template is a static bundle with no test suite, so a broken selector or a
// bad import surfaces only when someone opens the page. This closes that gap
// cheaply — it caught, among other things, six pages whose inline scripts had a
// syntax error and a chart library that was being loaded twice.
//
// Usage:  npm run build && node scripts/smoke-test.mjs
//
// Env:
//   PLAYWRIGHT_PATH=…   resolve playwright from elsewhere if not a local dep
//   HEADED=1            watch it run

import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SERVE_DIR = path.resolve(ROOT, 'dist-modern');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};

// Pages that are expected to render at least one chart.
const CHART_PAGES = new Set([
  'index.html',
  'analytics.html',
  'users.html',
  'orders.html',
  'products.html',
  'reports.html',
]);

// Pages that are expected to syntax-highlight code samples.
const PRISM_PAGES = new Set([
  'elements-alerts.html',
  'elements-badges.html',
  'elements-buttons.html',
  'elements-cards.html',
  'elements-forms.html',
  'elements-modals.html',
  'elements-tables.html',
]);

// Console noise that is intentional and not a failure.
const IGNORED_CONSOLE = [/favicon/i, /Failed to load resource.*manifest\.json/i];

function serve(dir) {
  const server = http.createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(req.url.split('?')[0]);
      let filePath = path.join(dir, urlPath);
      if (existsSync(filePath) && statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }
      if (!filePath.startsWith(dir) || !existsSync(filePath)) {
        res.writeHead(404).end('Not found');
        return;
      }
      const body = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
      res.end(body);
    } catch (error) {
      res.writeHead(500).end(String(error));
    }
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

async function main() {
  if (!existsSync(SERVE_DIR)) {
    console.error(`✗ ${path.relative(ROOT, SERVE_DIR)} not found — run \`npm run build\` first.`);
    process.exit(1);
  }

  const { readdir } = await import('node:fs/promises');
  const pages = (await readdir(SERVE_DIR)).filter((f) => f.endsWith('.html')).sort();
  if (pages.length === 0) {
    console.error('✗ No built pages found.');
    process.exit(1);
  }

  const { server, port } = await serve(SERVE_DIR);
  const browser = await chromium.launch({ headless: !process.env.HEADED });
  const results = [];

  for (const page of pages) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const tab = await ctx.newPage();

    const errors = [];
    const external = [];

    tab.on('pageerror', (e) => errors.push(`uncaught: ${e.message}`));
    tab.on('console', (msg) => {
      if (msg.type() !== 'error') return;
      const text = msg.text();
      if (IGNORED_CONSOLE.some((re) => re.test(text))) return;
      errors.push(`console: ${text}`);
    });
    tab.on('requestfailed', (req) => {
      const url = req.url();
      if (IGNORED_CONSOLE.some((re) => re.test(url))) return;
      errors.push(`request failed: ${url} (${req.failure()?.errorText})`);
    });
    tab.on('request', (req) => {
      const url = req.url();
      if (!url.startsWith(`http://127.0.0.1:${port}`) && !url.startsWith('data:') && !url.startsWith('blob:')) {
        external.push(url);
      }
    });

    await tab.goto(`http://127.0.0.1:${port}/${page}`, { waitUntil: 'networkidle', timeout: 30000 });
    // Charts and the lazily-imported highlighter settle a tick after load.
    await tab.waitForTimeout(1200);

    // A chart counts only once Chart.js has actually drawn into its canvas.
    const charts = await tab.evaluate(
      () => [...document.querySelectorAll('.chart-canvas-wrap > canvas')].filter((c) => c.width > 0 && c.height > 0).length
    );
    const highlighted = await tab.locator('code.language-html .token').count();
    const alpineErrors = errors.filter((e) => /alpine/i.test(e)).length;

    if (CHART_PAGES.has(page) && charts === 0) {
      errors.push('expected at least one rendered chart, found none');
    }
    if (PRISM_PAGES.has(page) && highlighted === 0) {
      errors.push('expected syntax-highlighted code, found none');
    }
    if (external.length) {
      errors.push(`external request(s): ${[...new Set(external)].join(', ')}`);
    }

    results.push({ page, charts, highlighted, errors, alpineErrors });
    await ctx.close();
  }

  await browser.close();
  server.close();

  // ── Report ──────────────────────────────────────────────────────────────
  const failed = results.filter((r) => r.errors.length);
  const pad = Math.max(...results.map((r) => r.page.length));

  console.log('\nPage                            charts  highlighted  status');
  console.log('─'.repeat(66));
  for (const r of results) {
    const status = r.errors.length ? '✗ FAIL' : '✓ ok';
    console.log(
      `${r.page.padEnd(pad)}  ${String(r.charts).padStart(6)}  ${String(r.highlighted).padStart(11)}  ${status}`
    );
  }

  if (failed.length) {
    console.log('\nFailures');
    console.log('─'.repeat(66));
    for (const r of failed) {
      console.log(`\n${r.page}`);
      for (const e of r.errors) console.log(`  • ${e}`);
    }
    console.log(`\n✗ ${failed.length}/${results.length} pages failed.`);
    process.exit(1);
  }

  console.log(`\n✓ All ${results.length} pages loaded clean — no errors, no external requests.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
