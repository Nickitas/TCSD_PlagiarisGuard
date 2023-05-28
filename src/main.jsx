import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Loader } from './components/UI/Loader/Loader'
import App from './App'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import './index.scss'

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Suspense fallback={<Loader/>}>
        <AuthProvider>
            <Routes>
                <Route path={'/*'} element={<App />} />
            </Routes>
        </AuthProvider>
    </Suspense>
  </BrowserRouter>
)