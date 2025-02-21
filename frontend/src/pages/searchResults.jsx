import { useState } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q')?.toLowerCase() || '';
  
  // Datos de ejemplo (luego conectarías una API)
  const allProducts = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Camiseta ${i + 1}`,
    price: 50 + i * 10,
    image: `https://via.placeholder.com/150`,
  }));

  const results = allProducts.filter(product => 
    product.name.toLowerCase().includes(query)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = {
    xs: 10, // 5 filas de 2 en mobile
    md: 12, // 4 filas de 3 en tablet
    lg: 15, // 3 filas de 5 en web
  };

  const currentItemsPerPage = window.innerWidth >= 992 ? itemsPerPage.lg : 
                             window.innerWidth >= 768 ? itemsPerPage.md : itemsPerPage.xs;
  const totalPages = Math.ceil(results.length / currentItemsPerPage);
  const paginatedResults = results.slice(
    (currentPage - 1) * currentItemsPerPage,
    currentPage * currentItemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <Container className="my-4">
      <h2>Resultados de búsqueda para &quot;{query}&quot;</h2>
      {results.length > 0 ? (
        <>
          <Row xs={2} md={3} lg={5} className="g-4">
            {paginatedResults.map(product => (
              <Col key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
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
        </>
      ) : (
        <p>No se encontraron resultados.</p>
      )}
    </Container>
  );
}

export default SearchResults;