import { useState } from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { Check } from 'react-bootstrap-icons';
import { useAppContext } from '../AppContextUtils';
import PropTypes from 'prop-types';

function ProductCard({ product }) {
  const { addToCart, addToFavorites, removeFromFavorites, favorites } = useAppContext();
  const [isFavorite, setIsFavorite] = useState(favorites.some(item => item._id === product._id));
  const [isPurchased, setIsPurchased] = useState(false); // Estado para "Comprar"

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

  const handlePurchase = () => {
    addToCart(product); // Llama a la función del contexto para agregar al carrito
    setIsPurchased(true); // Marca como comprado
    // Opcional: resetea el checkmark después de 2 segundos
    setTimeout(() => setIsPurchased(false), 2000); // Resetear después de 2 segundos
  };

  const formattedPrice = `$${product.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

  return (
    <Card className="h-100 d-flex flex-column shadow-sm" style={{ minHeight: '320px', borderRadius: '12px' }}>
      <Card.Img 
        variant="top" 
        src={product.image} 
        className="img-fluid" 
        style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} 
      />
      <ListGroup className="list-group-flush flex-grow-1 d-flex flex-column">
        <ListGroup.Item className="py-2 px-3">
          <Card.Title className="mb-0" style={{ fontSize: '1rem', lineHeight: '1.2', whiteSpace: 'normal', overflowWrap: 'break-word' }}>{product.name}</Card.Title>
        </ListGroup.Item>
        <ListGroup.Item className="py-2 px-3 flex-grow-1 d-flex align-items-end">
          <Card.Text className="mb-0 fw-bold text-dark" style={{ fontSize: '1.1rem' }}>{formattedPrice}</Card.Text>
        </ListGroup.Item>
      </ListGroup>
      <Card.Body className="d-flex justify-content-between align-items-center mt-auto px-3 py-2">
        <Button
          variant={isFavorite ? 'danger' : 'outline-danger'}
          onClick={handleFavorite}
          size="sm"
          className="rounded-pill"
        >
          <FaHeart />
        </Button>
        <Button 
          variant="primary" 
          onClick={handlePurchase} 
          size="sm"
          className="rounded-pill d-flex align-items-center"
        >
          {isPurchased ? <Check className="me-1" /> : 'Comprar'}
        </Button>
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