import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register({ onRegister }) {
  const navigate = useNavigate()

  const isAuthenticated = localStorage.getItem('authToken')
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    label: '',
    password_confirm: ''
  })
  
  if (isAuthenticated) {
    navigate('/dashboard/welcome')
    return null
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirm) {
      toast.error('As senhas devem ser iguais')
      return;
    }

    try {
      api.register(formData)
        .then(data => {
          let token = null;
          data.sessions.forEach(session => {
            token = session.token;        
          });

          onRegister(data, token);

          toast.success("Cadastro realizado com sucesso!");

          navigate("/dashboard/welcome");
        })
        .catch(error => {
          if (error.response !== undefined) {
            toast.error(error.response.data)
          } else {
            console.log(error)
            toast.error('Erro ao cadastrar')
          }
        });
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <div>
      <h3>Registrar</h3>
      <Form onSubmit={handleSubmit}>
        {/* Nome */}
        <Form.Group controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Digite seu nome"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Email */}
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Digite seu email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Label */}
        <Form.Group controlId="label">
          <Form.Label>Estúdio/Gravador/Selo</Form.Label>
          <Form.Control
            type="text"
            name="label"
            placeholder="Estúdio/Gravador/Selo"
            required
            value={formData.label}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Senha */}
        <Form.Group controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Senha"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Confirmação de Senha */}
        <Form.Group controlId="password_confirm">
          <Form.Label>Digite a senha novamente</Form.Label>
          <Form.Control
            type="password"
            name="password_confirm"
            placeholder="Digite a senha novamente"
            required
            value={formData.password_confirm}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Botão de Submit */}
        <Button type="submit" variant="primary" className="mt-3">
          Registrar
        </Button>

        {/* Toast Container */}
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar newestOnTop />
      </Form>
    </div>
  );
}

export default Register;
