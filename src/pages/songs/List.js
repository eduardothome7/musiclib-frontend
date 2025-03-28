import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"
import Breadcrumb from "../../components/Breadcrumb";
import { Col, Row } from "react-bootstrap";

function List() {

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Músicas", path: "/songs" },
  ];

  const [songs, setSongs] = useState([])
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredSongs = songs.filter(
    (artist) =>
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.songs.some((song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />

      <Row>
        <Col>
          <input
            type="text"
            className="form-control"
            placeholder="Pesquisar por artista(s) ou música"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col className="text-end">
          <Link to="/artists/add" className="btn btn-outline-primary me-2">Cadastrar Artista</Link>
          <Link to="/songs/add" className="btn btn-primary">Cadastrar Música</Link>
        </Col>
      </Row><br></br>
      <Row>
      {filteredSongs.map((artist) => (
        <div key={artist.id}>
          <h4>{artist.name}</h4>
          {artist.songs.map((song) => (
            <p key={song.id}>{song.title}</p>
          ))}
          <br />
        </div>
      ))}
      </Row>
    </div>
  )
}

export default List