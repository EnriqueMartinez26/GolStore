import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import { useAppContext } from '../AppContextUtils';
import PropTypes from 'prop-types';

function Cart() {
  const { cart, removeFromCart, updateCartQuantity } = useAppContext();
  const total = cart.reduce((acc, item) => acc + (item.productId.price * item.qty), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Procesando pago...');
  };

  return (
    <Container className="my-4">
      <h2>Carrito de Compras</h2>
      <Row>
        <Col md={8}>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.productId._id}>
                  <td>{item.productId.name}</td>
                  <td>${item.productId.price}</td>
                  <td>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => updateCartQuantity(item.productId._id, -1)}
                      className="me-2"
                    >
                      -
                    </Button>
                    {item.qty}
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => updateCartQuantity(item.productId._id, 1)}
                      className="ms-2"
                    >
                      +
                    </Button>
                  </td>
                  <td>${(item.productId.price * item.qty).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item.productId._id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {cart.length === 0 && (
            <p className="text-center">El carrito está vacío.</p>
          )}
        </Col>
        <Col md={4}>
          <h4>Resumen</h4>
          <p><strong>Total: ${total.toFixed(2)}</strong></p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="cardNumber">
              <Form.Label>Número de Tarjeta</Form.Label>
              <Form.Control
                type="text"
                placeholder="1234 5678 9012 3456"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="expiryDate">
              <Form.Label>Fecha de Vencimiento</Form.Label>
              <Form.Control
                type="text"
                placeholder="MM/AA"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="cvc">
              <Form.Label>CVC</Form.Label>
              <Form.Control
                type="text"
                placeholder="123"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-2">
              Pagar
            </Button>
            <Button
              variant="outline-primary"
              className="w-100"
              href="https://www.mercadolibre.com.ar/envios"
              target="_blank"
            >
              Calcular Envío (MercadoLibre)
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }),
      qty: PropTypes.number.isRequired,
    })
  ),
  removeFromCart: PropTypes.func,
  updateCartQuantity: PropTypes.func,
};

export default Cart;