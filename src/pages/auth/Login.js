import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import api from "../../services/auth";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = formData;

    api.login(email, password)
    .then(data => {
        let token = null
        data.sessions.forEach(session => {
          token = session.token        
        });

        onLogin(data, token)

        navigate("/dashboard/welcome")
    })
    .catch(error => {
      //
    })
  }

  return (
    <div>
      <h3>Login</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Digite seu email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Senha *</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Digite sua senha"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Entrar
        </Button>
      </Form>
    </div>
  )
}

export default Login;