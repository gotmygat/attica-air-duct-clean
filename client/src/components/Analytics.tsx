import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { trackPageView } from '@/lib/firebase';

/**
 * Logs a GA4 page_view on first load and on every client-side route change.
 *
 * Firebase's automatic page_view fires only once, when analytics initialises,
 * so on a single-page app every internal navigation would otherwise be
 * invisible to GA4. Mounted next to <ScrollToTop /> inside the Router.
 *
 * <SEO> sets document.title from a child effect that runs *after* this one —
 * later still when the route's chunk is lazy-loaded — so we wait for the
 * title to settle before logging. Without that wait, page_view would report
 * the previous page's title against the new page's path.
 */
export default function Analytics() {
  const [location] = useLocation();
  const lastLoggedTitle = useRef<string | null>(null);

  useEffect(() => {
    const previousTitle = lastLoggedTitle.current;
    const startedAt = Date.now();
    let cancelled = false;
    let timer = 0;

    const tick = () => {
      if (cancelled) return;

      const titleSettled = document.title !== previousTitle;
      if (titleSettled || Date.now() - startedAt > 1500) {
        lastLoggedTitle.current = document.title;
        void trackPageView(location);
        return;
      }

      timer = window.setTimeout(tick, 50);
    };

    timer = window.setTimeout(tick, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [location]);

  return null;
}
