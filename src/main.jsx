// @ts-nocheck
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from '@/App.jsx'
import '@fontsource-variable/oxanium'
import '@/index.css'
import { initConsent } from '@/lib/consent'
import { loadLocale, detectInitialLang } from '@/lib/LanguageContext'

// Loads analytics only if the visitor already agreed on an earlier visit.
initConsent()

// Render once the visitor's language is loaded, so Dutch/Greek pages never flash English.
loadLocale(detectInitialLang()).finally(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  )
})
