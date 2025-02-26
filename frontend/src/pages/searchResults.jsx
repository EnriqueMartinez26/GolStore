import { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';
import api from '../api';

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q')?.toLowerCase() || '';
  const [results, setResults] = useState([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = {
    xs: 10,
    md: 12,
    lg: 15,
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await api.get('/products/search', { params: { q: query } });
        setResults(response.data);
      } catch (err) {
        console.error('Error al buscar productos:', err);
      }
    };
    fetchResults();
  }, [query]);

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
          <div className="d-flex flex-wrap">
            <Row xs={2} md={3} lg={5} className="g-4 w-100">
              {paginatedResults.map(product => (
                <Col key={product._id} className="h-100">
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </div>
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