import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { useAppContext } from '../AppContextUtils';
import api from '../api';

function Destacado() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { addToCart, addToFavorites } = useAppContext();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await api.get('/products/featured');
        setFeaturedProducts(response.data);
      } catch (err) {
        console.error('Error al cargar productos destacados:', err);
      }
    };
    fetchFeaturedProducts();
  }, []);

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Productos Destacados</h1>
      <Row className="g-4">
        {featuredProducts.map(product => (
          <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 d-flex flex-column">
              <Card.Img variant="top" src={product.image} className="card-img-top" style={{ height: '250px', objectFit: 'contain' }} />
              <Card.Body className="d-flex flex-column justify-content-between flex-grow-1">
                <div className="d-flex flex-column" style={{ minHeight: '100px' }}>
                  <Card.Title className="mb-2" style={{ wordBreak: 'break-word' }}>{product.name}</Card.Title>
                  <Card.Text className="mb-0" style={{ marginTop: 'auto' }}>{`$${product.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}</Card.Text>
                </div>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="outline-danger"
                      onClick={() => addToFavorites(product)}
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
          </Col>
        ))}
      </Row>
      {featuredProducts.length === 0 && (
        <p className="text-center">No hay productos destacados disponibles.</p>
      )}
    </Container>
  );
}

export default Destacado;