import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/dashboard/Welcome'
import Navbar from './components/Navbar';
import api from "../src/services/api";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  )

  const handleLogin = (user, token) => {
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("authToken", token)
    localStorage.setItem("currentUser", JSON.stringify(user))
    setIsAuthenticated(true)
  }

  const handleRegister = (user, token) => {
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("authToken", token)
    localStorage.setItem("currentUser", JSON.stringify(user))
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    api.logout(localStorage.getItem("authToken"))
    .then(() => {
        localStorage.setItem("isAuthenticated", "false")
        localStorage.setItem("authToken", null)
        localStorage.setItem("currentUser", null)
        setIsAuthenticated(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <div class="container">
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          <Route 
            path="/dashboard/welcome" element={isAuthenticated ? <Dashboard/> : <Navigate to="/" /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
