import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../services/api"
import { Button, Col, Form, Row, ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";
import Select from "react-select";

function Add() {
  const currentUser = localStorage.getItem('currentUser')
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    artist_id: [],
    title: '',
    release_date: null,
    services: [],
    file: [],
    user_id: JSON.parse(currentUser).id
  })

  useEffect(() => {
    api.fetchArtists()
      .then(response => {
        const artistOptions = response.map(artist => ({
          value: artist.id,
          label: artist.name,
        }))
        setArtists(artistOptions)
      })
      .catch(error => {
        toast.error("Erro ao carregar artistas")
      })
  }, [])

  const [artists, setArtists] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      api.saveSong(formData)
        .then(() => {
          navigate("/songs/list?toast_success=Cadastro realizado com sucesso")
        })
        .catch(error => {
          if (error.response !== undefined) {
            toast.error(error.response.data)
          } else {
            toast.error('Erro ao cadastrar')
          }
        });
    } catch (error) {
      toast.error(error);
    }
  }

  const handleChange = (e) => {
    const { name, value, checked, files } = e.target;

    if (name === "files") {
        setFormData({ ...formData, file: files[0] })
    } else if (name === "services") {
      setFormData((prevFormData) => {
        const updatedServices = checked
          ? [...prevFormData.services, value]
          : prevFormData.services.filter(service => service !== value);

        return { ...prevFormData, services: updatedServices };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  const handleArtistChange = (selectedArtists) => {
    setFormData({
      ...formData,
      artist_id: selectedArtists.map(artist => artist.value),
    })
  }

  return (
    <div>
      <h3>Cadastrar Música</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="artist" className="mb-3">
          <Form.Label className="form-label-sm">Artista *</Form.Label>
          <Select
            isMulti
            name="artist_id"
            options={artists}
            onChange={handleArtistChange}
            value={artists.filter(artist => formData.artist_id.includes(artist.value))}
            placeholder="Pesquise ou selecione artistas"
          />
        </Form.Group>

        <Form.Group controlId="title" className="mb-3">
          <Form.Label className="form-label-sm">Título *</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Título da canção"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="release_date" className="mb-3">
          <Form.Label className="form-label-sm">Data de Lançamento *</Form.Label>
          <Form.Control
            type="date"
            name="release_date"
            placeholder=""
            required
            value={formData.release_date}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="file" className="mb-3">
          <Form.Label className="form-label-sm">Arquivo * <small>apenas .wav ou .mp3</small></Form.Label>
          <Form.Control
            type="file"
            name="file"
            required
            accept=".wav, .mp3"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="file" className="mb-3">
          <Form.Label className="form-label-sm">Serviço *</Form.Label>
          <Row>
            {["Spotify", "YouTube", "Deezer"].map((service) => (
              <Col key={service} xs={12} md={12}>
                <Form.Check
                  type="checkbox"
                  label={service}
                  name="services"
                  value={service}
                  checked={formData.services?.includes(service)}
                  onChange={handleChange}
                />
              </Col>
            ))}
          </Row>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Salvar
        </Button>
      </Form>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar newestOnTop />
    </div>
  )
}

export default Add
