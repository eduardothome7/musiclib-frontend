import React from "react"
import { Button, Card, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

function ArtistCard({ artist, onDelete }) {
  return (
    <Row>
      <Card className="mb-3">
        <Card.Body>
            <Card.Title>{artist.name}</Card.Title>
            <Link to={`/artists/${artist.id}`} className="btn btn-sm btn-primary me-2">
            <i className="bi bi-eye"></i> Ver
            </Link>
            <Button variant="outline-danger" size="sm" onClick={() => onDelete(artist.id)}>
            <i className="bi bi-trash"></i> Remover
            </Button>
        </Card.Body>
      </Card>
    </Row>
  )
}

export default ArtistCard
