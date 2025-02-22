import { useState } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { useAppContext } from '../AppContextUtils';

function Favorites() {
  const { favorites } = useAppContext();
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = {
    xs: 10,
    md: 12,
    lg: 15,
  };

  const currentItemsPerPage = window.innerWidth >= 992 ? itemsPerPage.lg : 
                             window.innerWidth >= 768 ? itemsPerPage.md : itemsPerPage.xs;
  const totalPages = Math.ceil(favorites.length / currentItemsPerPage);
  const paginatedFavorites = favorites.slice(
    (currentPage - 1) * currentItemsPerPage,
    currentPage * currentItemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <Container className="my-4">
      <h2>Mis Favoritos</h2>
      {favorites.length > 0 ? (
        <>
          <Row xs={2} md={3} lg={5} className="g-4">
            {paginatedFavorites.map(product => (
              <Col key={product._id}>
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
        <p>No tienes productos favoritos aún.</p>
      )}
    </Container>
  );
}

export default Favorites;