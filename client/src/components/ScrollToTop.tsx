import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Scrolls the window to the top on every route change.
 * Place this inside the Router so it fires on every navigation.
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location]);

  return null;
}
