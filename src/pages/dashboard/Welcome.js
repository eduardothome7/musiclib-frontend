import React from "react"
import { Link } from "react-router-dom"

function Welcome() {
  return(
    <div>
      <h3>Dashboard</h3>
      <Link to="/artists/index">Artistas</Link>
    </div>
  )
}

export default Welcome;