import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';

function Product() {
  const { id } = useParams();
  // Ejemplo de producto (en un caso real, vendría de una API)
  const product = {
    id,
    name: `Camiseta ${id}`,
    price: 50 + Number(id) * 10,
    image: 'https://via.placeholder.com/300',
    description: 'Camiseta oficial de fútbol, edición 2025.',
  };

  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <Image src={product.image} fluid alt={product.name} />
        </Col>
        <Col md={6}>
          <h1>{product.name}</h1>
          <p className="text-muted">${product.price}</p>
          <p>{product.description}</p>
          <Button variant="primary" className="me-2">Agregar al Carrito</Button>
          <Button variant="outline-danger">Marcar como Favorito</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Product;