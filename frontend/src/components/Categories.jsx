import { Accordion } from 'react-bootstrap';

function Categories() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Equipos Locales</Accordion.Header>
        <Accordion.Body>
          <ul className="list-unstyled">
            <li><a href="#">Boca Juniors</a></li>
            <li><a href="#">River Plate</a></li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Internacionales</Accordion.Header>
        <Accordion.Body>
          <ul className="list-unstyled">
            <li><a href="#">Real Madrid</a></li>
            <li><a href="#">Barcelona</a></li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Categories;