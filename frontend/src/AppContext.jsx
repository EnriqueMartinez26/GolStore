import { useState } from 'react';
import { AppContext } from './AppContextUtils';
import PropTypes from 'prop-types';

function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id, delta) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  const addToFavorites = (product) => {
    if (!favorites.some(item => item.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart, updateCartQuantity, favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;