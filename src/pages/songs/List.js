import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"
import { Button, Col, Row } from "react-bootstrap"
import { toast } from "react-toastify"
// import ArtistCard from "../../components/artists/ArtistCard"

function List() {
  const [songs, setSongs] = useState([])

  useEffect(() => {
    async function loadSongs() {
      try {
        const data = await api.fetchSongs()
        setSongs(data)
      } catch (err) {
        //
      }
    }
    loadSongs();
  }, [])

  const handleDelete = (songId) => {
    try {
      api.deleteSong(songId)
      setSongs((prevSongs) => prevSongs.filter((song) => song.id !== songId))
      toast.success(`Artista #${songId} removido com sucesso.`)
    } catch (err) {
      toast.error("Erro ao remover artista")
    }
  }

  return (
    <div>
      <h3>Lista de Músicas</h3>
      <Row>
        <Col className="text-end">
          <Link to="/artists/add" className="btn btn-outline-primary me-2">Cadastrar Artista</Link>
          <Link to="/songs/add" className="btn btn-primary">Cadastrar Música</Link>
        </Col>
      </Row><br></br>
      <Row>
      </Row>
    </div>
  )
}

export default List