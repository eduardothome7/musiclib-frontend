import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"
import { Button, Col, Row } from "react-bootstrap";

function Add() {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);

  return (
    <div>
      <h3>Cadastrar Artista</h3>
      {error && <p>{error}</p>}
      <Row>
        <Col className="text-end">
          <Button type="submit" variant="primary">
            Salvar
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default Add