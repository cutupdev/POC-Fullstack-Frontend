import { useContext } from 'react'
import { ThemeContext } from './contexts/theme'
import { Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import ResetPassword from './components/ResetPassword/ResetPassword'
import LangdingPage from './components/LandingPage/LandingPage'
import Admin from './components/LandingPage/Admin';
import './App.css'
import './global.css'

const App = () => {
  const [{ themeName }] = useContext(ThemeContext)

  return (
    <div id='top' className={`${themeName} app`}>
        <Routes>
            <Route exact path='/' element={<SignIn/>}/>
            <Route exact path='/sign-up' element={<SignUp/>}/>
            <Route exact path='/reset-password' element={<ResetPassword/>}/>
            <Route exact path='/dashboard' element={<LangdingPage/>}/>
            <Route exact path='/admin' element={<Admin/>}/>
        </Routes>
    </div>
  )
}

export default App
