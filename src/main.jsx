import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './Navbar.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
