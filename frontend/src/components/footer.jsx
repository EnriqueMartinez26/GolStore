import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={3} className="text-center text-md-start">
            <img src="../assets/LOGO.png" alt="Logo" height="40" className="mb-3" />
          </Col>
          <Col md={3}>
            <h5>Enlaces</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Política de Privacidad</a></li>
              <li><a href="#" className="text-white">Términos</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Soporte</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Contacto</a></li>
              <li><a href="#" className="text-white">FAQ</a></li>
            </ul>
          </Col>
          <Col md={3} className="text-center">
            <div className="mb-3">
              <FaFacebook className="me-3" />
              <FaTwitter className="me-3" />
              <FaInstagram />
            </div>
            <p>info@golstore.com</p>
            <img src="https://via.placeholder.com/100" alt="QR Datos Fiscales" />
          </Col>
        </Row>
        <Row className="text-center mt-3">
          <Col>
            <p>&copy; 2025 GolStore. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;