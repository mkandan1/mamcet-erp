import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Login } from './screens/Login'
import { ForgotPassword } from './screens/ForgotPasword'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<h1>Hello</h1>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
      </Routes>
    </Router>
  )
}

export default App
