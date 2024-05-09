import { useContext } from 'react'
import { ThemeContext } from './contexts/theme'
import SignIn from './components/Login/SignIn'
import './App.css'

const App = () => {
  const [{ themeName }] = useContext(ThemeContext)

  return (
    <div id='top' className={`${themeName} app`}>
      <SignIn />
    </div>
  )
}

export default App
