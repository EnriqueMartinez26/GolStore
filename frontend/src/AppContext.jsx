import { useState, useEffect} from 'react';
import { AppContext } from './AppContextUtils';
import PropTypes from 'prop-types';
import api from './api';

function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const cartResponse = await api.get(`/cart/${userId}`);
          setCart(cartResponse.data.items || []);
          const favResponse = await api.get(`/favorites/${userId}`);
          setFavorites(favResponse.data || []);
        } catch (err) {
          console.error('Error al cargar datos:', err);
        }
      }
    };
    fetchData();
  }, [userId]);

  const addToCart = async (product) => {
    try {
      console.log('Agregando al carrito:', product); 
      const response = await api.post(`/cart/${userId || 'guest'}`, { productId: product._id, qty: 1 });
      setCart(response.data.items);
    } catch (err) {
      console.error('Error al agregar al carrito:', err);
    }
  };
  const removeFromCart = async (id) => {
    try {
      const response = await api.post(`/cart/${userId || 'guest'}`, { productId: id, qty: 0 });
      setCart(response.data.items);
    } catch (err) {
      console.error('Error al remover del carrito:', err);
    }
  };

  const updateCartQuantity = async (id, delta) => {
    try {
      const item = cart.find(i => i.productId === id);
      const newQty = Math.max(1, item.qty + delta);
      const response = await api.post(`/cart/${userId || 'guest'}`, { productId: id, qty: newQty });
      setCart(response.data.items);
    } catch (err) {
      console.error('Error al actualizar cantidad:', err);
    }
  };

  const addToFavorites = async (product) => {
    try {
      console.log('Producto recibido en addToFavorites:', product); 
      const productId = product._id;
      if (!productId) {
        throw new Error('product._id es undefined');
      }
      console.log('Enviando a /favorites:', { productId }); 
      const response = await api.post(`/favorites/${userId || 'guest'}`, { productId });
      setFavorites(response.data);
    } catch (err) {
      console.error('Error al agregar favorito:', err);
    }
  };
  const removeFromFavorites = async (id) => {
    try {
      const response = await api.delete(`/favorites/${userId || 'guest'}/${id}`);
      setFavorites(response.data);
    } catch (err) {
      console.error('Error al remover favorito:', err);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      setUserId(response.data.userId); 
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, updateCartQuantity,
      favorites, addToFavorites, removeFromFavorites,
      userId, login
    }}>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;