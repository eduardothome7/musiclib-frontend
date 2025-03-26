import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/dashboard/Welcome'
import ArtistList from './pages/artists/List'
import ArtistAdd from './pages/artists/Add'
import api from "./services/auth";
import { toast, ToastContainer } from 'react-toastify';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("authToken"));

  const ToastAlert = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const toastSuccess = params.get("toast_success");
    const toastError = params.get("toast_error");

    useEffect(() => {
      if (toastSuccess) {
        toast.success(toastSuccess);
      }
      if (toastError) {
        toast.error(toastError);
      }
    }, [toastSuccess, toastError]);

    return <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop />;
  };

  const handleLogin = (user, token) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("currentUser", JSON.stringify(user));
    setIsAuthenticated(true);
  };

  const handleRegister = (user, token) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("currentUser", JSON.stringify(user));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    api.logout(localStorage.getItem("authToken"))
      .then(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("currentUser");
        setIsAuthenticated(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Router>
      <ToastAlert />
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <div className="container">
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
