import { Buffer } from 'buffer'
import process from 'process'

// Polyfills for browser
window.Buffer = Buffer
window.process = process
window.global = window.globalThis

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
