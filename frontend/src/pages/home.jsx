import { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Pagination, Image } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import Categories from '../components/Categories';
import api from '../api';

// Importa las imágenes localmente
import boca from '../assets/Featured/Boca.jpg';
import barcelona from '../assets/Featured/Barça.jpg';
import atm from '../assets/Featured/ATM.jpeg';
import mancity from '../assets/Featured/ManCity.jpg';

function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = {
    xs: 6,
    md: 12, 
    lg: 15, 
  };

  const featuredItems = [
    { id: 1, image: boca },
    { id: 2, image: barcelona },
    { id: 3, image: atm },
    { id: 4, image: mancity },
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
      <Row>
        <Col md={3}>
          <Carousel className="mb-4" controls={true} indicators={false}>
            {featuredItems.map((item, index) => (
              <Carousel.Item key={item.id} active={String(index === 0)}>
                <div style={{ position: 'relative', paddingBottom: '66.67%' }} className="overflow-hidden">
                  <Image 
                    className="d-block position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                    src={item.image} 
                    alt={`Producto ${item.id}`}
                    fluid
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <Categories />
          <div className="d-none d-md-block mt-4 bg-secondary text-white text-center p-4">
            Publicidad Lateral
          </div>
        </Col>
        <Col md={9}>
          <Row className="d-none d-md-block mb-4">
            <Col>
              <img src="https://via.placeholder.com/1200x150" alt="Publicidad" className="w-100" />
            </Col>
          </Row>
          <div className="d-flex flex-wrap">
            <Row xs={2} md={3} lg={5} className="g-4 w-100">
              {paginatedProducts.map(product => (
                <Col key={product._id}>
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
        </Col>
      </Row>
    </Container>
  );
}

export default Home;