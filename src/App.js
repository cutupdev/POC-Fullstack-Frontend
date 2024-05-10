import { useContext } from 'react'
import { ThemeContext } from './contexts/theme'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import ResetPassword from './components/ResetPassword/ResetPassword'
import LangdingPage from './components/LandingPage/LandingPage'
import './App.css'

const App = () => {
  const [{ themeName }] = useContext(ThemeContext)

  return (
    <div id='top' className={`${themeName} app`}>
        <Routes>
            <Route exact path='/' element={<SignIn/>}/>
            <Route exact path='/sign-up' element={<SignUp/>}/>
            <Route exact path='/reset-password' element={<ResetPassword/>}/>
            <Route exact path='/dashboard' element={<LangdingPage/>}/>
        </Routes>
    </div>
  )
}

export default App
