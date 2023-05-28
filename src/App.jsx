import React, { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout  } from './components/Layout'
import { RequierAuth } from './hoc/RequireAuth'
import { PersistLogin } from './hoc/PersistLogin'

const Auth = lazy(() => import('./pages/Auth/Auth'))
const Reg = lazy(() => import('./pages/Reg/Reg'))
const Home = lazy(() => import('./pages/Home/Home'))
const CheckDocument = lazy(() => import('./pages/CheckDocument/CheckDocument'))
const Report = lazy(() => import('./pages/Report/Report'))
const Statistics = lazy(() => import('./pages/Statistics/Statistics'))
const Profile = lazy(() => import('./pages/Profile/Profile'))
const About = lazy(() => import('./pages/About/About'))
const Сontacts = lazy(() => import('./pages/Сontacts/Сontacts'))
const TermsOfUse = lazy(() => import('./pages/TermsOfUse/TermsOfUse'))
// const AgreementOfPersonalData = lazy(() => import('./pages/AgreementOfPersonalData/AgreementOfPersonalData'))
const License = lazy(() => import('./pages/License/License'))
// const SecurityPolicy = lazy(() => import('./pages/SecurityPolicy/SecurityPolicy'))
// const HelpTheProject = lazy(() => import('./pages/HelpTheProject/HelpTheProject'))


const App = () => {

  return (
    <Routes>
      <Route path={'/'} element={<Layout />}>
        {/* public routes */}
        <Route path={'auth'} element={<Auth />} />
        <Route path={'reg'} element={<Reg />} />
        <Route path={'about'} element={<About />} />
        <Route path={'agreement_of_personal_data'} element={'AgreementOfPersonalData'} />
        <Route path={'security_policy'} element={'SecurityPolicy'} />

        {/* protected routes */}
        <Route index element={<Home/>} />
        <Route path={'check_document'} element={<CheckDocument/>} />
        <Route path={'report'} element={<Report />} />
        <Route path={'statistics'} element={<Statistics />} />
        <Route path={'profile'} element={<Profile />} />
        <Route path={'contacts'} element={<Сontacts />} />
        <Route path={'terms_of_use'} element={<TermsOfUse />} />
        <Route path={'license'} element={<License />} />
        <Route path={'help_the_project'} element={'HelpTheProject'} />

        {/* catch all */}
        <Route path={'*'} element={<Navigate to={'/'} />} />
      </Route>
    </Routes>
    // <Routes>
    //   <Route path='/' element={<Layout />}>
    //         <Route path='statistics' element={
    //           <RequierAuth>
    //             <Statistics />
    //           </RequierAuth>
    //         }/>
    //         <Route path='profile' element={
    //           <RequierAuth>
    //             <Profile />
    //           </RequierAuth>
    //         }/>
    //       </Route>
    // </Routes>
  )
}

export default App