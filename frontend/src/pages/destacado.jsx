import { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Card, Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { useAppContext } from '../AppContextUtils';
import { Link } from 'react-router-dom';
import api from '../api';

function Destacado() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { addToCart, addToFavorites } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Obtener productos destacados (los más recientes, o con featured: true si lo configuraste)
        const response = await api.get('/products?sort=-_id&limit=6'); // 6 productos más recientes
        setFeaturedProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar productos destacados: ' + err.message);
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  if (loading) return <Container className="my-4"><p className="text-center">Cargando productos destacados...</p></Container>;
  if (error) return <Container className="my-4"><p className="text-center text-danger">{error}</p></Container>;

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Productos Destacados</h1>
      {/* Banner o carrusel para promociones */}
      <Carousel className="mb-4" interval={3000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x200"
            alt="Promoción 1 - Camisetas al 20% de descuento"
            style={{ objectFit: 'cover', height: '200px' }}
          />
          <Carousel.Caption className="d-none d-md-block">
            <h3>¡Ofertas especiales en camisetas 2024/2025!</h3>
            <p>Descuentos exclusivos para los fans del fútbol.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x200"
            alt="Promoción 2 - Nuevas colecciones"
            style={{ objectFit: 'cover', height: '200px' }}
          />
          <Carousel.Caption className="d-none d-md-block">
            <h3>Nuevas camisetas de tus equipos favoritos</h3>
            <p>¡Llegaron las ediciones limitadas 2024/2025!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {featuredProducts.length > 0 ? (
        <>
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
          <div className="text-center mt-4">
            <Link to="/"><Button variant="outline-primary">Ver más productos</Button></Link>
          </div>
        </>
      ) : (
        <p className="text-center">No hay productos destacados disponibles en este momento.</p>
      )}
    </Container>
  );
}

export default Destacado;