import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * RouteChangeLoader
 *
 * Triggers show/hide during React Router route transitions.
 * Since the legacy BrowserRouter doesn't support v6/v7 useNavigation data router hooks,
 * this uses pathname comparison to show the loading screen during transitions.
 */
export function RouteChangeLoader({ show, hide }) {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const prev = prevPathRef.current;
    if (prev === location.pathname) return;
    prevPathRef.current = location.pathname;

    // Show the loading screen on transition
    show();
    const t = setTimeout(() => {
      hide();
    }, 600); // 600ms loader screen display time on transition
    return () => clearTimeout(t);
  }, [location.pathname, show, hide]);

  return null;
}
