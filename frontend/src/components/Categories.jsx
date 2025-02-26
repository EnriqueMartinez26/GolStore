import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Categories() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Equipos Locales</Accordion.Header>
        <Accordion.Body>
          <ul className="list-unstyled">
            <li><Link to="/liga-argentina" className="text-dark">Liga Argentina</Link></li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Internacionales</Accordion.Header>
        <Accordion.Body>
          <ul className="list-unstyled">
            <li><Link to="/laliga" className="text-dark">LaLiga</Link></li>
            <li><Link to="/premier-league" className="text-dark">Premier League</Link></li>
            <li><Link to="/serie-a" className="text-dark">Serie A</Link></li>
            <li><Link to="/resto" className="text-dark">Resto</Link></li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Categories;