import { useState, useCallback, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Header } from './assets/components/header/Header.jsx'
import { SpotlightNewDemo } from './assets/components/home page/Spotlight New/SpotlightNew.jsx'
import { WavyBackgroundDemo } from './assets/components/home page/Wavy Background/WavyBackground.jsx'
import { Team } from './assets/components/home page/Team/Team.jsx'
import { Testimonials } from './assets/components/home page/Testimonials/Testimonials.jsx'
import { ContactUs } from './assets/components/contact/ContactUs.jsx'
import { Footer } from './assets/components/footer/Footer.jsx'
import { CustomScrollbar } from './assets/components/CustomScrollbar.jsx'
import { LoadingScreen } from './assets/components/LoadingScreen.jsx'
import { RouteChangeLoader } from './assets/components/RouteChangeLoader.jsx'
import { MobileFooterDock } from './assets/components/MobileFooterDock.jsx'
import { useGlobalLoader } from './assets/hooks/useGlobalLoader.js'
import './App.css'

// Resets scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}


/**
 * AppInner lives inside <Router> so it can use router hooks.
 * It manages all global loading states:
 *   - initial page load (2s auto-dismiss)
 *   - route changes
 *   - fetch / XHR network requests
 *   - offline / slow network
 */
function AppInner() {
  // ── Initial boot loader (auto-dismiss after 2s) ──────────────
  const [initialLoading, setInitialLoading] = useState(true)

  // ── Network / route loader (persists until all requests done) ──
  const [networkLoading, setNetworkLoading] = useState(false)
  const [networkVisible, setNetworkVisible] = useState(false)

  const showNetworkLoader = useCallback(() => {
    setNetworkVisible(true)
    setNetworkLoading(true)
  }, [])

  const hideNetworkLoader = useCallback(() => {
    setNetworkVisible(false)
    // Give the fade-out time to complete before unmounting
    setTimeout(() => setNetworkLoading(false), 750)
  }, [])

  // Attach the global fetch / XHR / network interceptors
  useGlobalLoader(showNetworkLoader, hideNetworkLoader)

  return (
    <>
      {/* ── Initial boot loader ─────────────────────────────── */}
      {initialLoading && (
        <LoadingScreen onDone={() => setInitialLoading(false)} />
      )}

      {/* ── Network / route change loader ───────────────────── */}
      {networkLoading && (
        <LoadingScreen
          persistent
          visible={networkVisible}
          onDone={() => setNetworkLoading(false)}
        />
      )}

      {/* ── Route-change detector + scroll reset (inside Router) ─ */}
      <ScrollToTop />
      <RouteChangeLoader show={showNetworkLoader} hide={hideNetworkLoader} />

      <CustomScrollbar />
      <Header />
      <MobileFooterDock />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <SpotlightNewDemo />
              <Team />
              <Testimonials />
              {/* <ContactUs /> */}
              <WavyBackgroundDemo />
            </>
          }
        />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>

      <Footer />

      {/* Floating Buttons */}
      <div className="floating-buttons">
        <a
          href="mailto:hey@ornitech.com"
          className="float-btn float-mail"
          target="_blank"
          rel="noopener noreferrer"
          title="Send an Email"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#EA4335"/>
          </svg>
        </a>
        <a
          href="https://wa.me/919999999999"
          className="float-btn float-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.012 2C6.48 2 2 6.48 2 12.012c0 1.764.468 3.42 1.284 4.884L2 22l5.244-1.26c1.416.78 3.036 1.272 4.768 1.272 5.532 0 10.012-4.48 10.012-10.012A10.02 10.02 0 0 0 12.012 2Zm5.748 13.92c-.252.708-1.464 1.296-2.004 1.344-.504.048-1.02.264-3.216-.624-2.82-1.14-4.632-4.02-4.776-4.212-.132-.18-1.128-1.5-1.128-2.856 0-1.356.708-2.016.96-2.292.252-.276.552-.348.732-.348.18 0 .36 0 .516.012.168.012.396-.06.624.468.228.552.804 1.956.876 2.1.072.144.12.312.024.504-.096.192-.144.312-.288.48-.144.168-.312.384-.444.516-.144.144-.3.3-.132.588.168.288.756 1.248 1.62 2.016.9 1.008 1.836 1.236 2.064 1.368.228.132.36.108.492-.048.132-.156.576-.672.732-.9.156-.228.312-.192.528-.108.216.084 1.38.648 1.62.768.24.12.396.18.456.288.06.096.06.576-.192 1.284Z" fill="#25D366"/>
          </svg>
        </a>
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  )
}

export default App
