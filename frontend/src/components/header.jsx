import { useState } from 'react';
import { Container, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/modals/LoginModal';
import RegisterModal from '../components/modals/RegisterModal';

function Header() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchActive(false);
      setSearchQuery('');
    }
  };

  const openLoginModal = () => {
    setShowRegister(false);
    setShowLogin(true);    
  };

  const openRegisterModal = () => {
    setShowLogin(false);   
    setShowRegister(true);  
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container>
        <Navbar.Brand href="/">
          <img src="../assets/LOGO.png" alt="GolStore" height="40" />
        </Navbar.Brand>
        <div className="d-flex align-items-center">
          {isSearchActive ? (
            <Form className="d-flex" onSubmit={handleSearchSubmit}>
              <FormControl
                type="search"
                placeholder="Buscar camisetas..."
                className="me-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => setIsSearchActive(false)}
                autoFocus
              />
            </Form>
          ) : (
            <FaSearch
              className="me-3 cursor-pointer text-white"
              onClick={() => setIsSearchActive(true)}
            />
          )}
          <Button variant="outline-light" className="me-2" onClick={openLoginModal}>
            Login
          </Button>
          <Button variant="outline-light" onClick={openRegisterModal}>
            Registro
          </Button>
        </div>
      </Container>
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
      <RegisterModal
        show={showRegister}
        handleClose={() => setShowRegister(false)}
        openLogin={openLoginModal}
      />
    </Navbar>
  );
}

export default Header;