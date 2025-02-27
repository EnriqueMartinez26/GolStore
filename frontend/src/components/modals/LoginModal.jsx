import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useAppContext } from '../../AppContextUtils';
import { Envelope, Lock } from 'react-bootstrap-icons'; 

function LoginModal({ show, handleClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      handleClose();
    } catch (err) {
      setError(err.message);
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
        backgroundColor: 'rgba(255, 255, 255, 0.6)', // Fondo semitransparente (90% opacidad)
        backdropFilter: 'blur(8px)', // Efecto de desenfoque en el fondo (opcional, soportado en navegadores modernos)
      }}
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="fw-bold text-dark" style={{ fontSize: '1.5rem' }}>
          Iniciar Sesión
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <Form onSubmit={handleSubmit}>
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
            <div className="mt-3 text-start">
              <Link 
                to="/recover-password" 
                onClick={handleClose}
                className="text-primary fw-medium text-decoration-none"
                style={{ fontSize: '0.9rem', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.color = '#0056b3'}
                onMouseLeave={(e) => e.target.style.color = '#007bff'}
              >
                Recuperar Contraseña
              </Link>
            </div>
          </Form.Group>
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
            Iniciar Sesión
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default LoginModal;