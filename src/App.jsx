import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./screens/Login";
import { ForgotPassword } from "./screens/ForgotPasword";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Authorization } from "./api/Auth";
import { Dashboard } from "./screens/Dashboard";
import { Courses } from "./screens/Courses";
import { CreateCourse } from "./screens/CreateCourse";
import { EditCourse } from "./screens/EditCourse";
import { ViewCourse } from "./screens/ViewCourse";
import { Subjects } from "./screens/Subjects";
import { CreateSubject } from "./screens/CreateSubject";
import { Batches } from "./screens/Batches";
import { EditSubject } from "./screens/EditSubject";
import { ViewSubject } from "./screens/ViewSubject";
import { CreateBatch } from "./screens/CreateBatch";
import { EditBatch } from "./screens/EditBatch";
import { ViewBatch } from "./screens/ViewBatch";

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
              <Route path="/course/edit/:id" element={<EditCourse/>} />
              <Route path="/course/:id" element={<ViewCourse/>} />
              <Route path="/course/subject" element={<Subjects/>} />
              <Route path="/course/subject/create" element={<CreateSubject/>} />
              <Route path="/course/subject/edit/:id" element={<EditSubject/>} />
              <Route path="/course/subject/:id" element={<ViewSubject/>} />
              <Route path="/course/batch" element={<Batches/>} />
              <Route path="/course/batch/create" element={<CreateBatch/>} />
              <Route path="/course/batch/edit/:id" element={<EditBatch/>} />
              <Route path="/course/batch/:id" element={<ViewBatch/>} />
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
