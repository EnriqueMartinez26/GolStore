import { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard';
import Categories from '../../components/Categories';
import api from '../../api';

function Resto() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = {
    xs: 10,
    md: 12,
    lg: 15,
  };

  useEffect(() => {
    const fetchRestoProducts = async () => {
      try {
        const response = await api.get('/products/search', { 
          params: { 
            q: 'paris|bayern|dortmund|retro' 
          } 
        });
        setProducts(response.data);
      } catch (err) {
        console.error('Error al cargar productos del Resto:', err);
      }
    };
    fetchRestoProducts();
  }, []);

  const currentItemsPerPage = window.innerWidth >= 992 ? itemsPerPage.lg : 
                             window.innerWidth >= 768 ? itemsPerPage.md : itemsPerPage.xs;
  const totalPages = Math.ceil(products.length / currentItemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * currentItemsPerPage,
    currentPage * currentItemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Resto</h1>
      <Row>
        <Col md={3}>
          <Categories />
          <div className="d-none d-md-block mt-4 bg-secondary text-white text-center p-4">
            Publicidad Lateral
          </div>
        </Col>
        <Col md={9}>
          <div className="d-flex flex-wrap">
            <Row xs={2} md={3} lg={5} className="g-4 w-100">
              {paginatedProducts.map(product => (
                <Col key={product._id} className="h-100">
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </div>
          {products.length > 0 && (
            <Pagination className="justify-content-center mt-4">
              <Pagination.Prev
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
              />
              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          )}
          {products.length === 0 && (
            <p className="text-center">No hay productos en Resto disponibles.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Resto;
