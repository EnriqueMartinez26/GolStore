import { useState, useEffect } from 'react';
import { AppContext } from './AppContextUtils';
import PropTypes from 'prop-types';
import api from './api';

function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState('guest');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartResponse = await api.get(`/cart/${userId}`);
        const formattedCart = (cartResponse.data.items || []).map(item => ({
          productId: item.productId, 
          qty: item.qty
        }));
        setCart(formattedCart);
        const favResponse = await api.get(`/favorites/${userId}`);
        setFavorites(favResponse.data || []);
      } catch (err) {
        console.error('Error al cargar datos:', err);
      }
    };
    fetchData();
  }, [userId]);

  const addToCart = async (product) => {
    try {
      console.log('Agregando al carrito:', product); 
      const response = await api.post(`/cart/${userId}`, { productId: product._id, qty: 1 });
      setCart(response.data.items);
    } catch (err) {
      console.error('Error al agregar al carrito:', err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const response = await api.post(`/cart/${userId}`, { productId: id, qty: 0 });
      setCart(response.data.items);
    } catch (err) {
      console.error('Error al remover del carrito:', err);
    }
  };

  const updateCartQuantity = async (id, delta) => {
    try {
      const item = cart.find(i => i.productId._id === id);
      if (!item) {
        console.error('Item no encontrado en el carrito con id:', id);
        return; // Salir si no encontramos el ítem
      }
      const newQty = Math.max(1, item.qty + delta);
      const response = await api.post(`/cart/${userId}`, { productId: id, qty: newQty });
      setCart(response.data.items);
    } catch (err) {
      console.error('Error al actualizar cantidad:', err);
    }
  };

  const addToFavorites = async (product) => {
    try {
      console.log('Producto recibido en addToFavorites:', product); // Depuración
      const productId = product._id;
      if (!productId) {
        throw new Error('product._id es undefined');
      }
      console.log('Enviando a /favorites:', { productId }); // Depuración
      const response = await api.post(`/favorites/${userId}`, { productId });
      setFavorites(response.data);
    } catch (err) {
      console.error('Error al agregar favorito:', err);
    }
  };

  const removeFromFavorites = async (id) => {
    if (!id) {
      console.error('removeFromFavorites llamado con id undefined');
      return;
    }
    try {
      const response = await api.delete(`/favorites/${userId}/${id}`);
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

export default AppProvider; // Exportar como default