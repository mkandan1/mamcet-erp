import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Login } from './screens/Login'
<<<<<<< HEAD
import { ForgotPassword } from './screens/ForgotPasword'
=======
>>>>>>> 45f2467d37d243baf967ec4f067aa6a7593e6cff
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Authorization } from '../api/Auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isCheckingAuthCompleted, setIsCheckingAuthCompleted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.getItem('mamcet_auth') ? setIsLoggedIn(true) : setIsLoggedIn(false);

    Authorization.onAuthState(dispatch)
      .then(status => {
        setIsLoggedIn(true);
      })
      .catch(err => {
        localStorage.removeItem('mamcet_auth')
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsCheckingAuthCompleted(true)
      })
  }, [])

  if (!isCheckingAuthCompleted) {
    return
  }

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
