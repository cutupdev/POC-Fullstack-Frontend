import React, { useState, useEffect, useRef, useContext } from 'react';
import { ThemeContext } from './context/theme'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { AppProvider } from './context/appContext';
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import ResetPassword from './components/ResetPassword/ResetPassword'
import LangdingPage from './components/LandingPage/LandingPage'
import Admin from './components/LandingPage/Admin';
import EmailVerificationSuccess from './components/Verify/EmailVerificationSuccess';
import './App.css'

const App = () => {
  const [{ themeName }] = useContext(ThemeContext);

  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(localStorage.getItem('user'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);
  const timeoutRef = useRef(null);

  const scheduleLogout = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(logOut, 2 * 60 * 60 * 1000); // 2 hours
  };

  const resetLogoutTimer = () => {
    clearTimeout(timeoutRef.current);
    scheduleLogout();
  };

  const logOut = () => {
    localStorage.removeItem('user');
    navigate('/');
  }

  // Event listeners for activity tracking
  useEffect(() => {
    if (isAuthenticated) {
      window.addEventListener('mousemove', resetLogoutTimer);
      window.addEventListener('click', resetLogoutTimer);
      window.addEventListener('keypress', resetLogoutTimer);
      window.addEventListener('scroll', resetLogoutTimer);
      scheduleLogout();
    }

    return () => {
      clearTimeout(timeoutRef.current);
      window.removeEventListener('mousemove', resetLogoutTimer);
      window.removeEventListener('click', resetLogoutTimer);
      window.removeEventListener('keypress', resetLogoutTimer);
      window.removeEventListener('scroll', resetLogoutTimer);
    };
  }, [isAuthenticated]);

  return (
    <AppProvider>
      <AuthProvider>
        <div id='top' className={`${themeName} app`}>
          <Routes>
            <Route exact path='/' element={<SignIn />} />
            <Route exact path='/sign-up/' element={<SignUp />} />
            <Route exact path='/:email/reset-password/:id' element={<ResetPassword />} />
            <Route exact path='/dashboard' element={<LangdingPage />} />
            <Route exact path='/admin' element={<Admin />} />
            <Route exact path=':email/verify/:token' element={<EmailVerificationSuccess />} />
          </Routes>
        </div>
      </AuthProvider>
    </AppProvider>
  )
}

export default App
