import { useState } from 'react';
import { Navbar, Nav as BootstrapNav, Container, Badge, Offcanvas } from 'react-bootstrap';
import { FaHeart, FaShoppingCart, FaQuestionCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppContext } from '../AppContextUtils';

function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  const { cart, favorites } = useAppContext();

  return (
    <Navbar bg="secondary" variant="dark" expand="md" sticky="top">
      <Container>
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={() => setShowMenu(true)} />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          show={showMenu}
          onHide={() => setShowMenu(false)}
          className="w-75" 
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">GolStore</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <BootstrapNav className="flex-column flex-md-row me-auto">
              <BootstrapNav.Link as={Link} to="/" onClick={() => setShowMenu(false)}>
                Home
              </BootstrapNav.Link>
              <BootstrapNav.Link as={Link} to="/destacado" onClick={() => setShowMenu(false)}>
                Destacado
              </BootstrapNav.Link>
              <BootstrapNav.Link as={Link} to="/contacto" onClick={() => setShowMenu(false)}>
                Contacto
              </BootstrapNav.Link>
              <BootstrapNav.Link as={Link} to="/favorites" onClick={() => setShowMenu(false)}>
                <FaHeart className="me-1" /> Favoritos{' '}
                <Badge bg="danger">{favorites.length}</Badge>
              </BootstrapNav.Link>
              <BootstrapNav.Link as={Link} to="/cart" onClick={() => setShowMenu(false)}>
                <FaShoppingCart className="me-1" /> Carrito{' '}
                <Badge bg="danger">{cart.length}</Badge>
              </BootstrapNav.Link>
            </BootstrapNav>
            <FaQuestionCircle className="text-white mt-3 mt-md-0" />
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Nav;