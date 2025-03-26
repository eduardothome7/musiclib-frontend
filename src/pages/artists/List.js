import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"
import { Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";

function List() {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadArtists() {
      try {
        const data = await api.fetchArtists();
        setArtists(data);
      } catch (err) {
        setError("Erro ao buscar artistas");
      }
    }
    loadArtists();
  }, [])

  const handleDelete = (artistId) => {
    toast.success(`Artista #${artistId} removido com sucesso.`)
  }

  return (
    <div>
      <h3>Lista de Artistas</h3>
      {error && <p>{error}</p>}
      <Row>
        <Col className="text-end">
          <Link to="/artists/add" className="btn btn-primary">Cadastrar Artista</Link>
        </Col>
      </Row>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>{artist.name} 
            <Button variant="outline-danger" onClick={() => handleDelete(artist.id)}>
              <i className="bi bi-trash"></i> Remover
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List