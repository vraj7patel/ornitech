import { useEffect, useRef, useCallback } from 'react';

/**
 * useGlobalLoader
 *
 * Calls `show()` whenever real network loading is detected and `hide()` when done.
 *
 * Detects:
 *  1. fetch() calls — filters out Vite HMR / local dev noise; only real network requests
 *  2. XMLHttpRequest — same filtering
 *  3. 'offline' / 'online' browser events
 *  4. Slow network via Network Information API (slow-2g / 2g)
 *
 * Smart features:
 *  - 200ms minimum delay before showing, so fast/cached requests don't flash the loader
 *  - 300ms grace period before hiding, so back-to-back requests don't flicker
 *  - Filters browser-extension URLs, Vite HMR websockets, and data: URLs
 */

// List of URL patterns to ignore (Vite HMR, devtools, browser internals)
const IGNORE_PATTERNS = [
  '/__vite',
  '/node_modules',
  'chrome-extension://',
  'moz-extension://',
  'data:',
  'blob:',
];

function shouldTrack(url) {
  if (!url) return false;
  const urlStr = typeof url === 'string' ? url : url.toString();
  // Ignore local Vite HMR and extension URLs
  if (IGNORE_PATTERNS.some(p => urlStr.includes(p))) return false;
  return true;
}

export function useGlobalLoader(show, hide) {
  const pendingRef = useRef(0);
  const showTimerRef = useRef(null);   // delay before showing (avoids flash on fast requests)
  const hideTimerRef = useRef(null);   // grace period before hiding
  const isVisibleRef = useRef(false);  // tracks whether loader is currently shown

  const increment = useCallback(() => {
    pendingRef.current += 1;

    if (pendingRef.current === 1 && !isVisibleRef.current) {
      // Clear any pending hide
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      // Wait 200ms before showing — fast/cached requests won't flash the loader
      if (!showTimerRef.current) {
        showTimerRef.current = setTimeout(() => {
          showTimerRef.current = null;
          if (pendingRef.current > 0 && !isVisibleRef.current) {
            isVisibleRef.current = true;
            show();
          }
        }, 200);
      }
    }
  }, [show]);

  const decrement = useCallback(() => {
    pendingRef.current = Math.max(0, pendingRef.current - 1);

    if (pendingRef.current === 0) {
      // Cancel the pending show if the request finished before 200ms threshold
      if (showTimerRef.current) {
        clearTimeout(showTimerRef.current);
        showTimerRef.current = null;
      }
      // Grace period before hiding — avoids flicker on back-to-back requests
      if (isVisibleRef.current && !hideTimerRef.current) {
        hideTimerRef.current = setTimeout(() => {
          hideTimerRef.current = null;
          if (pendingRef.current === 0) {
            isVisibleRef.current = false;
            hide();
          }
        }, 300);
      }
    }
  }, [hide]);

  useEffect(() => {
    // ── 1. Intercept fetch() ─────────────────────────────────────
    const originalFetch = window.fetch;

    window.fetch = async function (...args) {
      const url = args[0] instanceof Request ? args[0].url : args[0];
      const track = shouldTrack(url);

      if (track) increment();
      try {
        return await originalFetch.apply(this, args);
      } finally {
        if (track) decrement();
      }
    };

    // ── 2. Intercept XMLHttpRequest ──────────────────────────────
    const _open = XMLHttpRequest.prototype.open;
    const _send = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method, url, ...rest) {
      this._loaderShouldTrack = shouldTrack(url);
      return _open.call(this, method, url, ...rest);
    };

    XMLHttpRequest.prototype.send = function (...args) {
      if (this._loaderShouldTrack) {
        increment();
        const done = () => {
          if (this._loaderDone) return;
          this._loaderDone = true;
          decrement();
        };
        this.addEventListener('load', done);
        this.addEventListener('error', done);
        this.addEventListener('abort', done);
        this.addEventListener('timeout', done);
      }
      return _send.apply(this, args);
    };

    // ── 3. Offline / Online events ───────────────────────────────
    let offlineActive = false;

    const handleOffline = () => {
      if (!offlineActive) {
        offlineActive = true;
        increment();
      }
    };
    const handleOnline = () => {
      if (offlineActive) {
        offlineActive = false;
        decrement();
      }
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    // Already offline when mounted?
    if (!navigator.onLine) handleOffline();

    // ── 4. Slow network via Network Information API ───────────────
    const connection =
      navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    let slowNetworkActive = false;

    const checkSlowNetwork = () => {
      if (!connection) return;
      const isSlow = ['slow-2g', '2g'].includes(connection.effectiveType);
      const isSaveData = connection.saveData === true;

      if ((isSlow || isSaveData) && !slowNetworkActive) {
        slowNetworkActive = true;
        increment();
      } else if (!isSlow && !isSaveData && slowNetworkActive) {
        slowNetworkActive = false;
        decrement();
      }
    };

    if (connection) {
      checkSlowNetwork();
      connection.addEventListener('change', checkSlowNetwork);
    }

    // ── Cleanup ──────────────────────────────────────────────────
    return () => {
      window.fetch = originalFetch;
      XMLHttpRequest.prototype.open = _open;
      XMLHttpRequest.prototype.send = _send;
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
      if (connection) connection.removeEventListener('change', checkSlowNetwork);
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      // Clean up any stale state
      pendingRef.current = 0;
      isVisibleRef.current = false;
    };
  }, [increment, decrement]);
}
