import { Container, Form, Button } from 'react-bootstrap';

function RecoverPassword() {
  return (
    <Container className="my-4">
      <h2>Recuperar Contraseña</h2>
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control type="email" placeholder="Ingresa tu correo" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Enviar Link de Recuperación
        </Button>
      </Form>
    </Container>
  );
}

export default RecoverPassword;