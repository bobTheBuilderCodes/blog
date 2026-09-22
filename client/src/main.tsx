import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import { AudioProvider } from './context/AudioContext'
import './index.css'
import './studio.css'
createRoot(document.getElementById('root')!).render(<StrictMode><HelmetProvider><BrowserRouter><AudioProvider><App/></AudioProvider></BrowserRouter></HelmetProvider></StrictMode>)
