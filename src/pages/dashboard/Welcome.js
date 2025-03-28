import React from "react"
import { Link } from "react-router-dom"

function Welcome() {
  return(
    <div>
      <h3>Dashboard</h3>
      <p>
        <Link to="/artists/index">Artistas</Link>
      </p>
      <p>
        <Link to="/songs/list">Músicas</Link>
      </p>
    </div>
  )
}

export default Welcome;