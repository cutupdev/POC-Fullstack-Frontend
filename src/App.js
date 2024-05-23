import { useContext, useEffect } from 'react'
import { ThemeContext } from './context/theme'
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/authContext';
import { useAuth } from './hook/useAuth';
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import ResetPassword from './components/ResetPassword/ResetPassword'
import LangdingPage from './components/LandingPage/LandingPage'
import Admin from './components/LandingPage/Admin';
import EmailVerificationSuccess from './components/Verify/EmailVerificationSuccess';
import './App.css'
import './global.css'

const App = () => {

  const { user, login, logout, setUser, loginStatus, setLoginStatus } = useAuth();

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
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
