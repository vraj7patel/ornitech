import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Serve index.html for all routes so React Router (BrowserRouter) works
  // on hard refresh / direct URL access — fixes 404 on page reload
  appType: 'spa',
  preview: {
    port: 4173,
    historyApiFallback: true,
  },
})
