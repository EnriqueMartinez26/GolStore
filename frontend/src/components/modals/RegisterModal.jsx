import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import api from '../../api';
import { Person, Envelope, Lock } from 'react-bootstrap-icons';

function RegisterModal({ show, handleClose, openLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSwitchToLogin = () => {
    handleClose();
    openLogin();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password });
      handleClose();
      openLogin();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse');
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="md"
      className="shadow-lg"
      style={{ 
        borderRadius: '16px', 
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="fw-bold text-dark" style={{ fontSize: '1.5rem' }}>
          Registrarse
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="name">
            <Form.Label className="text-muted fw-semibold">Nombre</Form.Label>
            <div className="input-group">
              <span className="input-group-text bg-light border-0" style={{ borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>
                <Person className="text-muted" />
              </span>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-start-0 rounded-end"
                style={{ borderRadius: '0 8px 8px 0', boxShadow: 'none', paddingLeft: '0.5rem' }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-4" controlId="email">
            <Form.Label className="text-muted fw-semibold">Correo</Form.Label>
            <div className="input-group">
              <span className="input-group-text bg-light border-0" style={{ borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>
                <Envelope className="text-muted" />
              </span>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-start-0 rounded-end"
                style={{ borderRadius: '0 8px 8px 0', boxShadow: 'none', paddingLeft: '0.5rem' }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-4" controlId="password">
            <Form.Label className="text-muted fw-semibold">Contraseña</Form.Label>
            <div className="input-group">
              <span className="input-group-text bg-light border-0" style={{ borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>
                <Lock className="text-muted" />
              </span>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-start-0 rounded-end"
                style={{ borderRadius: '0 8px 8px 0', boxShadow: 'none', paddingLeft: '0.5rem' }}
              />
            </div>
          </Form.Group>
          <div className="mb-4 text-start">
            <span className="text-muted fw-medium">
              ¿Ya tenés cuenta?{' '}
              <Button 
                variant="link" 
                className="p-0 text-primary fw-medium text-decoration-none"
                onClick={handleSwitchToLogin}
                style={{ fontSize: '0.9rem', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.color = '#0056b3'}
                onMouseLeave={(e) => e.target.style.color = '#007bff'}
              >
                Iniciar Sesión
              </Button>
            </span>
          </div>
          {error && (
            <p className="text-danger fw-medium mb-4" style={{ fontSize: '0.9rem', lineHeight: '1.2' }}>
              {error}
            </p>
          )}
          <Button 
            variant="primary" 
            type="submit" 
            className="w-100 py-2 rounded-pill shadow-sm"
            style={{ 
              fontSize: '1.1rem', 
              fontWeight: 'bold', 
              backgroundColor: '#007bff', 
              border: 'none',
              transition: 'background-color 0.3s ease, transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#0056b3';
              e.target.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#007bff';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Registrarse
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

RegisterModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  openLogin: PropTypes.func.isRequired,
};

export default RegisterModal;