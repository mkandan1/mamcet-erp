import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./screens/Login";
import { ForgotPassword } from "./screens/ForgotPasword";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Authorization } from "../api/Auth";
import { Dashboard } from "./screens/Dashboard";
import { Courses } from "./screens/Courses";
import { CreateCourse } from "./screens/CreateCourse";

function App() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state)=> (state.auth.loggedin))
  const isLoading = useSelector((state)=> (state.auth.loading))

  useEffect(()=> {
    Authorization.onAuthState(dispatch)
  }, [dispatch])

  if(isLoading){
    return 
  }
  return (
      <Router>
        <div className="relative">
          {isAuthenticated ? (
            <Routes>
              <Route path="/" element={<Dashboard/>} />
              <Route path="/course/all" element={<Courses/>} />
              <Route path="/course/create" element={<CreateCourse/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/*" element={<Login />} />
            </Routes>
          )}
        </div>
      </Router>
  );
}

export default App;
