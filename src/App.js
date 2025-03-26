import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/dashboard/Welcome'
import ArtistList from './pages/artists/List'
import ArtistAdd from './pages/artists/Add'
import api from "./services/auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("authToken"));

  const handleLogin = (user, token) => {
    localStorage.setItem("authToken", token)
    localStorage.setItem("currentUser", JSON.stringify(user))
    setIsAuthenticated(true)
  }

  const handleRegister = (user, token) => {
    localStorage.setItem("authToken", token)
    localStorage.setItem("currentUser", JSON.stringify(user))
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    api.logout(localStorage.getItem("authToken"))
    .then(() => {
        localStorage.removeItem("authToken")
        localStorage.removeItem("currentUser")
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
          <Route path="/" element={ isAuthenticated ? <Navigate to="/dashboard/welcome" /> : <Login onLogin={handleLogin} /> } />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          <Route path="/dashboard/welcome" element={isAuthenticated ? <Dashboard/> : <Navigate to="/" /> } />
          <Route path="/artists/index" element={isAuthenticated ? <ArtistList/> : <Navigate to="/" /> } />
          <Route path="/artists/add" element={isAuthenticated ? <ArtistAdd/> : <Navigate to="/" /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
