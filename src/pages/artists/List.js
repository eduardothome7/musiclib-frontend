import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"
import { Button, Col, Row } from "react-bootstrap"
import { toast } from "react-toastify"
import ArtistCard from "../../components/artists/ArtistCard"

function List() {
  const [artists, setArtists] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadArtists() {
      try {
        const data = await api.fetchArtists()
        setArtists(data)
      } catch (err) {
        setError("Erro ao buscar artistas")
      }
    }
    loadArtists();
  }, [])

  const handleDelete = (artistId) => {
    try {
      api.deleteArtist(artistId)
      setArtists((prevArtists) => prevArtists.filter((artist) => artist.id !== artistId))
      toast.success(`Artista #${artistId} removido com sucesso.`)
    } catch (err) {
      toast.error("Erro ao remover artista")
    }
  }

  return (
    <div>
      <h3>Lista de Artistas</h3>
      {error && <p>{error}</p>}
      <Row>
        <Col className="text-end">
          <Link to="/artists/add" className="btn btn-outline-primary me-2">Cadastrar Artista</Link>
          <Link to="/songs/add" className="btn btn-primary">Cadastrar Música</Link>
        </Col>
      </Row><br></br>
      <Row>
        {artists.map((artist) => (
           <Col key={artist.id} md={4}>
            <ArtistCard artist={artist} onDelete={handleDelete} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default List