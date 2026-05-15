import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// In dev (Vite), there's no SSR-prerendered HTML, so use createRoot.
// In production, the HTML is pre-rendered by prerender.mjs, so use hydrateRoot.
if (root.childElementCount === 0) {
  createRoot(root).render(app)
} else {
  hydrateRoot(root, app)
}
