/**
 * ATTICA CLEANERS — Firebase bootstrap + Google Analytics (GA4).
 *
 * Why this config is inline rather than in env vars: a Firebase *web* config
 * is public by design. It ships in the client bundle however it is supplied,
 * and access is gated by Firebase security rules and the authorized-domain
 * list in the console — not by hiding these strings. Keeping them here means
 * the GitHub Actions deploy needs no additional secrets.
 *
 * The SDK is pulled in with dynamic import() so it lands in its own chunk and
 * stays off the critical path. This site preloads its LCP image and
 * code-splits every route; analytics should not undo that work.
 */

const firebaseConfig = {
  apiKey: 'AIzaSyAzwRDiYpnLSNcFOw-lbioqetQwnRLJhXw',
  authDomain: 'attica-cleaners.firebaseapp.com',
  projectId: 'attica-cleaners',
  storageBucket: 'attica-cleaners.firebasestorage.app',
  messagingSenderId: '390105692121',
  appId: '1:390105692121:web:d89416f03ba4c28bce8bc8',
  measurementId: 'G-2R7HFCTVTX',
};

type AnalyticsInstance = import('firebase/analytics').Analytics;

let analyticsPromise: Promise<AnalyticsInstance | null> | null = null;

/**
 * True only for a real visitor on the live site.
 *
 * - `navigator.webdriver` is set under Puppeteer, which is how
 *   `scripts/prerender.mjs` renders every route at build time. Without this
 *   guard each build would log a page_view for every route and bake the
 *   gtag loader into the static HTML.
 * - localhost and Firebase preview channels are excluded so dev and PR
 *   traffic never lands in the production property.
 */
function isRealVisit(): boolean {
  if (typeof window === 'undefined') return false;
  if (navigator.webdriver) return false;

  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1' || host === '::1') return false;
  if (host.endsWith('.local')) return false;
  // `pnpm dev --host` also serves on the LAN address, which is how the site
  // gets checked on a phone — that traffic is not real either.
  if (/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host)) return false;
  // Firebase preview channels look like <site>--<channel>-<hash>.web.app
  if (host.includes('--')) return false;

  return true;
}

/**
 * Initialises Firebase Analytics once and caches the instance.
 * Resolves to null whenever analytics should not run — a prerender pass, a
 * dev host, an unsupported browser, or an ad blocker taking out the SDK.
 */
export async function getAnalyticsInstance(): Promise<AnalyticsInstance | null> {
  if (!isRealVisit()) return null;
  if (analyticsPromise) return analyticsPromise;

  analyticsPromise = (async () => {
    try {
      const [{ initializeApp }, { initializeAnalytics, isSupported }] = await Promise.all([
        import('firebase/app'),
        import('firebase/analytics'),
      ]);

      if (!(await isSupported())) return null;

      const app = initializeApp(firebaseConfig);

      // send_page_view is off because <Analytics /> logs page_view itself, so
      // that client-side route changes are counted too. Leaving it on would
      // double-count the first page of every session.
      return initializeAnalytics(app, { config: { send_page_view: false } });
    } catch (err) {
      // Analytics must never take the site down with it.
      if (import.meta.env.DEV) console.warn('[analytics] init failed', err);
      return null;
    }
  })();

  return analyticsPromise;
}

/** Logs a GA4 page_view for the given client-side path. */
export async function trackPageView(path: string): Promise<void> {
  const analytics = await getAnalyticsInstance();
  if (!analytics) return;

  const { logEvent } = await import('firebase/analytics');
  logEvent(analytics, 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/**
 * Logs any other GA4 event — use for conversions such as phone-tap or
 * quote-form submit, e.g. trackEvent('generate_lead', { method: 'phone' }).
 */
export async function trackEvent(
  name: string,
  params: Record<string, unknown> = {},
): Promise<void> {
  const analytics = await getAnalyticsInstance();
  if (!analytics) return;

  const { logEvent } = await import('firebase/analytics');
  logEvent(analytics, name, params);
}
