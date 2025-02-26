import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, ListGroup, Image } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Contacto() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setError('');
      setFormData({ name: '', email: '', message: '' });
      // Aquí podrías agregar una llamada al backend para guardar el mensaje (opcional, por ahora es estático)
      console.log('Mensaje enviado:', formData);
    } else {
      setError('Por favor, completa todos los campos');
    }
  };

  return (
    <Container className="my-4 py-5" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
      <h1 className="text-center mb-4 text-primary fw-bold">Contáctanos</h1>
      <Row className="justify-content-center">
        <Col md={6} className="mb-4">
          <h3 className="mb-3 text-dark">Envíanos un mensaje</h3>
          {submitted && <Alert variant="success" className="mb-3">¡Gracias! Tu mensaje ha sido enviado con éxito. Te responderemos pronto.</Alert>}
          {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label className="text-dark">Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                className="rounded-pill"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className="text-dark">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className="rounded-pill"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label className="text-dark">Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Escribe tu mensaje aquí"
                className="rounded"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 rounded-pill py-2" size="lg">
              Enviar Mensaje
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h3 className="mb-3 text-dark">Información de Contacto</h3>
          <ListGroup variant="flush" className="shadow-sm">
            <ListGroup.Item className="d-flex align-items-center py-3">
              <FaEnvelope className="me-3 text-primary" size={20} />
              <span className="text-dark">info@golstore.com</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex align-items-center py-3">
              <FaPhone className="me-3 text-primary" size={20} />
              <span className="text-dark">+54 11 1234-5678</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex align-items-center py-3">
              <FaMapMarkerAlt className="me-3 text-primary" size={20} />
              <span className="text-dark">Av. Principal 123, Buenos Aires, Argentina</span>
            </ListGroup.Item>
          </ListGroup>
          <h5 className="mt-4 mb-3 text-dark">Horario de Atención</h5>
          <p className="text-dark">Lunes a Viernes: 9:00 - 18:00 (GMT-3)</p>
          <p className="text-dark">Respuesta promedio: 24 horas</p>
          <h5 className="mt-4 mb-3 text-dark">Siguenos en Redes Sociales</h5>
          <div className="d-flex gap-3">
            <Link to="https://facebook.com/golstore" target="_blank" rel="noopener noreferrer" className="text-dark">
              <FaFacebook size={24} />
            </Link>
            <Link to="https://twitter.com/golstore" target="_blank" rel="noopener noreferrer" className="text-dark">
              <FaTwitter size={24} />
            </Link>
            <Link to="https://instagram.com/golstore" target="_blank" rel="noopener noreferrer" className="text-dark">
              <FaInstagram size={24} />
            </Link>
          </div>
          <div className="mt-4">
            <Image src="https://via.placeholder.com/300x200" alt="Mapa de ubicación de GolStore" fluid rounded />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Contacto;