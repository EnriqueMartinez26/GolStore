import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function LoginModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Iniciar Sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Correo</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu correo" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" />
            <div className="mt-2 text-start">
              <Link to="/recover-password" onClick={handleClose}>
                Recuperar Contraseña
              </Link>
            </div>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
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