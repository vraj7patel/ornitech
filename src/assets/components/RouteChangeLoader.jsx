import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function RouteChangeLoader({ show, hide }) {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const isShowingRef = useRef(false);

  useEffect(() => {
    if (prevPathRef.current === location.pathname) return;
    prevPathRef.current = location.pathname;

    if (!isShowingRef.current) {
      isShowingRef.current = true;
      show();
      const t = setTimeout(() => {
        isShowingRef.current = false;
        hide();
      }, 600);
      return () => clearTimeout(t);
    }
  }, [location.pathname, show, hide]);

  return null;
}
