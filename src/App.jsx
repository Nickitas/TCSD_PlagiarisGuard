import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout  } from './components/Layout'
import { RequierAuth } from './components/hoc/RequireAuth'
import { AuthProvider } from './components/hoc/AuthProvider'
import { Loader } from './components/UI/Loader/Loader'

const Auth = lazy(() => import('./pages/Auth/Auth'))
const Reg = lazy(() => import('./pages/Reg/Reg'))
const About = lazy(() => import('./pages/About/About'))
const Home = lazy(() => import('./pages/Home/Home'))
const Cabinet = lazy(() => import('./pages/Cabinet/Cabinet'))
const Statistics = lazy(() => import('./pages/Satistics/Statistics'))
const Profile = lazy(() => import('./pages/Profile/Profile'))


const App = () => {

  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {

  }, [])

  return (
    <Suspense fallback={<Loader/>}>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={
              <RequierAuth>
                <Home />
              </RequierAuth>
            }/>
            <Route path='cabinet' element={
              <RequierAuth>
                <Cabinet />
              </RequierAuth>
            }/>
            <Route path='statistics' element={
              <RequierAuth>
                <Statistics />
              </RequierAuth>
            }/>
            <Route path='profile' element={
              <RequierAuth>
                <Profile />
              </RequierAuth>
            }/>
            <Route path={'about'} element={<About/>} />
            <Route path={'reg'} element={<Reg/>} />
            <Route path={'auth'} element={<Auth/>} />
            <Route path={'*'} element={<Navigate to={'/'} />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Suspense>
  )
}

export default App