import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../services/api"
import { Button, Form, ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";

function Add() {
  const currentUser = localStorage.getItem('currentUser')
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    user_id: JSON.parse(currentUser).id
  })

  if (!currentUser) {
    toast.error("Usuário não autenticado!");
    navigate("/");
    return;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      api.saveArtist(formData)
        .then(() => {
          navigate("/artists/index?toast_success=Cadastro realizado com sucesso")
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div>
      <h3>Cadastrar Artista</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nome *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Nome do artista/banda"
              required
              value={formData.name}
              onChange={handleChange}
            />
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