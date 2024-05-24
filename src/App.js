import { useContext, useEffect } from 'react'
import { ThemeContext } from './context/theme'
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/authContext';
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import ResetPassword from './components/ResetPassword/ResetPassword'
import LangdingPage from './components/LandingPage/LandingPage'
import Admin from './components/LandingPage/Admin';
import EmailVerificationSuccess from './components/Verify/EmailVerificationSuccess';
import Test from './components/LandingPage/components/Test';
import './App.css'
import './global.css'

const App = () => {

  const [{ themeName }] = useContext(ThemeContext);

  return (
    <AuthProvider>
      <div id='top' className={`${themeName} app`}>
        <Routes>
          <Route exact path='/' element={<SignIn />} />
          <Route exact path='/sign-up/' element={<SignUp />} />
          <Route exact path='/:email/reset-password/:id' element={<ResetPassword />} />
          <Route exact path='/dashboard' element={<LangdingPage />} />
          <Route exact path='/admin' element={<Admin />} />
          <Route exact path='/verify/:id' element={<EmailVerificationSuccess />} />
          <Route exact path='/test' element={<Test />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
