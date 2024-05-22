import { render } from 'react-dom'
import App from './App'
import { ThemeProvider } from './context/theme'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
