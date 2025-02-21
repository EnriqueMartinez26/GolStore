import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

function RegisterModal({ show, handleClose, openLogin }) {
  const handleSwitchToLogin = () => {
    handleClose();
    openLogin();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrarse</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu nombre" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Correo</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu correo" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" />
          </Form.Group>
          <div className="mb-3 text-start">
            <span>
              ¿Ya tenés cuenta?{' '}
              <Button variant="link" className="p-0" onClick={handleSwitchToLogin}>
                Iniciar Sesión
              </Button>
            </span>
          </div>
          <Button variant="primary" type="submit" className="w-100">
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