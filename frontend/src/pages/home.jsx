import { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Pagination } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import Categories from '../components/Categories';
import api from '../api';

function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = {
    xs: 10,
    md: 12,
    lg: 15,
  };

  const featuredItems = [
    { id: 1, name: 'Camiseta Boca', image: 'https://via.placeholder.com/800x300' },
    { id: 2, name: 'Camiseta River', image: 'https://via.placeholder.com/800x300' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (err) {
        console.error('Error al cargar productos:', err);
      }
    };
    fetchProducts();
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
      <Carousel className="mb-4">
        {featuredItems.map(item => (
          <Carousel.Item key={item.id}>
            <img className="d-block w-100" src={item.image} alt={item.name} />
            <Carousel.Caption>
              <h3>{item.name}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
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
          <Row xs={2} md={3} lg={5} className="g-4">
            {paginatedProducts.map(product => (
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
        </Col>
      </Row>
    </Container>
  );
}

export default Home;