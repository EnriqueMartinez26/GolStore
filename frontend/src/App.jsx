import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import SearchResults from './pages/SearchResults';
import RecoverPassword from './pages/RecoverPassword';
import AppProvider from './AppContext'; 
import Destacado from './pages/Destacado';

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
              <Route path="/recover-password" element={<RecoverPassword />} />
              <Route path="/featured" element={<Destacado />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;