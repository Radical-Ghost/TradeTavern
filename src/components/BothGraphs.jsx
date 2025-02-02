import { Row, Col } from 'react-bootstrap';
import TopCompanies from './TopCompanies'; // Import the TopCompanies component
import StockGraph from './StockGraph'; // Assume you have a StockGraph component

const YourMainComponent = () => {
  return (
    <Row>
      <Col md={8}>
        <StockGraph /> Your stock graph component
      </Col>
      <Col md={4}>
        {/* <TopCompanies /> Your TopCompanies component */}
      </Col>
    </Row>
  );
};

export default YourMainComponent;
