import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useAppContext } from '../AppContextUtils';
import { useState, useEffect } from 'react';
import api from '../api';

function Product() {
  const { id } = useParams();
  const { addToCart, addToFavorites } = useAppContext();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar el producto');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Container className="my-4"><p>Cargando...</p></Container>;
  if (error) return <Container className="my-4"><p>{error}</p></Container>;
  if (!product) return <Container className="my-4"><p>Producto no encontrado</p></Container>;

  const formattedPrice = `$${product.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <Image src={product.image} fluid alt={product.name} />
        </Col>
        <Col md={6}>
          <h1>{product.name}</h1>
          <p className="text-muted">{formattedPrice}</p>
          <p>{product.description}</p>
          <Button variant="primary" className="me-2" onClick={() => addToCart(product)}>
            Agregar al Carrito
          </Button>
          <Button variant="outline-danger" onClick={() => addToFavorites(product)}>
            Marcar como Favorito
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Product;