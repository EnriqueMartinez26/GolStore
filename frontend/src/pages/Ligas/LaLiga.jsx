import { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard';
import Categories from '../../components/Categories';
import api from '../../api';

function LaLiga() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchLaLigaProducts = async () => {
      try {
        const response = await api.get('/products/search', { params: { q: 'barcelona|real madrid|atlético de madrid' } });
        setProducts(response.data.filter(product => !/retro/i.test(product.name)));
      } catch (err) {
        console.error('Error al cargar productos de LaLiga:', err);
      }
    };
    fetchLaLigaProducts();
  }, []);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 992) {
        setCurrentItemsPerPage(15);
      } else if (window.innerWidth >= 768) {
        setCurrentItemsPerPage(12);
      } else {
        setCurrentItemsPerPage(10);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(products.length / currentItemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * currentItemsPerPage,
    currentPage * currentItemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <Container className="my-4">
      <Row className="d-none d-md-block mb-4">
        <Col>
          <img src="https://via.placeholder.com/1200x150" alt="Publicidad" className="w-100" />
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Categories />
          <div className="d-none d-md-block mt-4 bg-secondary text-white text-center p-4">
            Publicidad Lateral
          </div>
        </Col>
        <Col md={9}>
          <Row xs={2} md={3} lg={5} className="g-4 w-100">
            {paginatedProducts.map(product => (
              <Col key={product._id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
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
            <p className="text-center">No hay productos de LaLiga disponibles.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default LaLiga;
