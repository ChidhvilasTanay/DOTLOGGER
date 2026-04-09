import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx';
import { Toaster } from 'react-hot-toast';
import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1"
axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ style: { background: '#1c1c1c', color: '#fff', border: '1px solid #333' } }} />
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
