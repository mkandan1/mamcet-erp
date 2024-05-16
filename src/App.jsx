import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Login } from './screens/Login'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<h1>Hello</h1>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App
