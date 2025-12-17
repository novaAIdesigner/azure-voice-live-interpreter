import { Buffer } from 'buffer'

// Minimal polyfills for browser bundles that expect Node-like globals.
;(globalThis as any).Buffer ??= Buffer
;(globalThis as any).process ??= { env: {} }
;(globalThis as any).global ??= globalThis

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
