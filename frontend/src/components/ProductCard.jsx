import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { useAppContext } from '../AppContextUtils';
import PropTypes from 'prop-types';

function ProductCard({ product }) {
  const { addToCart, addToFavorites, removeFromFavorites, favorites } = useAppContext();
  const [isFavorite, setIsFavorite] = useState(favorites.some(item => item._id === product._id));

  const handleFavorite = () => {
    if (!product._id) {
      console.error('product._id es undefined:', product);
      return;
    }
    if (isFavorite) {
      removeFromFavorites(product._id);
    } else {
      addToFavorites(product);
    }
    setIsFavorite(!isFavorite);
  };

  const formattedPrice = `$${product.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

  return (
    <Card className="h-100 d-flex flex-column" style={{ minHeight: '350px' }}>
      <Card.Img variant="top" src={product.image} className="card-img-top" style={{ height: '250px', objectFit: 'contain'  }} />
      <Card.Body className="d-flex flex-column justify-content-between flex-grow-1">
        <div className="d-flex flex-column" style={{ minHeight: '100px' }}>
          <Card.Title className="mb-2" style={{ wordBreak: 'break-word' }}>{product.name}</Card.Title>
          <Card.Text className="mb-0" style={{ marginTop: 'auto' }}>{formattedPrice}</Card.Text>
        </div>
        <div className="mt-auto">
          <div className="d-flex justify-content-between">
            <Button
              variant={isFavorite ? 'danger' : 'outline-danger'}
              onClick={handleFavorite}
              size="sm"
            >
              <FaHeart />
            </Button>
            <Button variant="primary" onClick={() => addToCart(product)} size="sm">
              Comprar
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;