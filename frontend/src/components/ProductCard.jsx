import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { useAppContext } from '../AppContextUtils';
import PropTypes from 'prop-types';

function ProductCard({ product }) {
  const { addToCart, addToFavorites, removeFromFavorites, favorites } = useAppContext();
  const [isFavorite, setIsFavorite] = useState(favorites.some(item => item.id === product.id));

  const handleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <Card>
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        <div className="d-flex justify-content-between">
          <Button
            variant={isFavorite ? 'danger' : 'outline-danger'}
            onClick={handleFavorite}
          >
            <FaHeart />
          </Button>
          <Button variant="primary" onClick={() => addToCart(product)}>
            Comprar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;