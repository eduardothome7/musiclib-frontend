import React from "react";
import { Link } from "react-router-dom";

function Navbar({isAuthenticated, handleLogout}) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  return (
    <nav className="d-flex justify-content-between align-items-center p-3">
      { isAuthenticated ? (
        <div className="ms-auto">
          { currentUser.email } <a href="#!" onClick={handleLogout}>Sair</a>
        </div>
      ) : (
        <div className="ms-auto">
          <Link to="/">Login</Link> | <Link to="/register">Registrar</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar;