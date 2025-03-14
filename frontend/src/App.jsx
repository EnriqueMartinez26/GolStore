import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Nav from './components/nav';
import Footer from './components/footer';
import Home from './pages/home';
import Product from './pages/product';
import Cart from './pages/cart';
import Favorites from './pages/favorites';
import SearchResults from './pages/searchResults';
import RecoverPassword from './pages/recoverPassword';
import AppProvider from './AppContext'; 
import Destacado from './pages/destacado';
import LigaArgentina from './pages/Ligas/LigaArg';
import LaLiga from './pages/Ligas/LaLiga';
import Premier from './pages/Ligas/Premier';
import SerieA from './pages/Ligas/SerieA';
import Resto from './pages/Ligas/Resto';
import Contacto from './pages/contacto';

function App() {
  return (
    <Router>
      <AppProvider>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <Nav />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/recover-password" element={<RecoverPassword />} />
              <Route path="/destacado" element={<Destacado />} />
              <Route path="/liga-argentina" element={<LigaArgentina />} />
              <Route path="/laliga" element={<LaLiga />} />
              <Route path="/premier-league" element={<Premier />} />
              <Route path="/serie-a" element={<SerieA />} />
              <Route path="/resto" element={<Resto />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;