import { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Card, Button, ListGroup, Image } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { Check } from 'react-bootstrap-icons';
import { useAppContext } from '../AppContextUtils';
import { Link } from 'react-router-dom';
import api from '../api';
import golstore from '../assets/golstore.jpg';

function Destacado() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { addToCart, addToFavorites, favorites } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [purchasedStates, setPurchasedStates] = useState({});

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await api.get('/products/search', {
          params: {
            q: 'boca juniors|barcelona|manchester city|atlético de madrid',
            limit: 4
          }
        });
        setFeaturedProducts(response.data.slice(0, 4));
        setLoading(false);
      } catch (err) {
        setError('Error al cargar productos destacados: ' + err.message);
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  if (loading)
    return (
      <Container className="my-4">
        <p className="text-center">Cargando productos destacados...</p>
      </Container>
    );
  if (error)
    return (
      <Container className="my-4">
        <p className="text-center text-danger">{error}</p>
      </Container>
    );

  const carouselItems = [
    {
      id: 1,
      image: golstore,
    }
  ];

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Productos más vendidos</h1>
      <Carousel className="mb-4" interval={3000}>
        {carouselItems.map((item) => (
          <Carousel.Item key={item.id}>
            <div style={{ position: 'relative', paddingBottom: '30%' }} className="overflow-hidden">
              <Image
                className="d-block position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                src={item.image}
                alt={item.alt}
                fluid
              />
            </div>
            <Carousel.Caption className="d-none d-md-block">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      {featuredProducts.length > 0 ? (
        <>
          <Row className="g-4">
            {featuredProducts.map((product) => {
              const isPurchased = purchasedStates[product._id] || false;
              const isFavorite = favorites.some((fav) => fav._id === product._id);

              const handleFavorite = () => {
                addToFavorites(product);
              };

              const handlePurchase = () => {
                addToCart(product);
                setPurchasedStates((prev) => ({ ...prev, [product._id]: true }));
                setTimeout(
                  () => setPurchasedStates((prev) => ({ ...prev, [product._id]: false })),
                  2000
                );
              };

              const formattedPrice = `$${product.price.toLocaleString('en-US', {
                maximumFractionDigits: 0
              })}`;

              return (
                <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    className="h-100 d-flex flex-column shadow-sm"
                    style={{ width: '190px', minHeight: '320px', borderRadius: '12px' }}
                  >
                    <Card.Img
                      variant="top"
                      src={product.image}
                      className="img-fluid"
                      style={{
                        height: '200px',
                        objectFit: 'cover',
                        borderTopLeftRadius: '12px',
                        borderTopRightRadius: '12px'
                      }}
                    />
                    <ListGroup className="list-group-flush flex-grow-1 d-flex flex-column">
                      <ListGroup.Item className="py-2 px-3">
                        <Card.Title
                          className="mb-0"
                          style={{
                            fontSize: '1rem',
                            lineHeight: '1.2',
                            whiteSpace: 'normal',
                            overflowWrap: 'break-word'
                          }}
                        >
                          {product.name}
                        </Card.Title>
                      </ListGroup.Item>
                      <ListGroup.Item className="py-2 px-3 flex-grow-1 d-flex align-items-end">
                        <Card.Text className="mb-0 fw-bold text-dark" style={{ fontSize: '1.1rem' }}>
                          {formattedPrice}
                        </Card.Text>
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
                </Col>
              );
            })}
          </Row>
          <div className="text-center mt-4">
            <Link to="/">
              <Button variant="outline-primary">Ver más productos</Button>
            </Link>
          </div>
        </>
      ) : (
        <p className="text-center">No hay productos destacados disponibles en este momento.</p>
      )}
    </Container>
  );
}

export default Destacado;
