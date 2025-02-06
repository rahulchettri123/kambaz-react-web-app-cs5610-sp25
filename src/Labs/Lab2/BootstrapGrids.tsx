import { Row, Col } from "react-bootstrap";
export default function BootstrapGrid() {
  return (
    <div>
      <h2>Bootstrap</h2>
      <h2>Responsive Grid</h2>
      <Row>
        <Col xs={12} sm={4} md = {8} lg={2} xl={3} className = "bg-danger text-white">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
        
        </Col>
        <Col xs={12} sm={8} md={4} lg = {8} xl={7}className = "bg-success text-white">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
        
        </Col>
        <Col lg = {2} xl = {2} className = "bg-primary text-white">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
        
        </Col>



      </Row>
      <div id="wd-bs-grid-system">
        <h2>Grid system</h2>
        <Row>
          <Col className="bg-danger text-white">
            <h3>Left half</h3>
          </Col>
          <Col className="bg-primary text-white">
            <h3>Right half</h3>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="bg-warning">
            <h3>One third</h3>
          </Col>
          <Col md={8} className="bg-success text-white">
            <h3>Two thirds</h3>
          </Col>
        </Row>
        <Row>
    <Col xs={2} className="bg-black text-white">
      <h3>Sidebar</h3>
    </Col>
    <Col xs={8} className="bg-secondary text-white">
      <h3>Main content</h3>
    </Col>
    <Col xs={2} className="bg-info">
      <h3>Sidebar</h3>
    </Col>
  </Row>
      </div>
      <div id="wd-bs-responsive-grids">
  <h2>Responsive grid system</h2>
  <Row>
    <Col xs={12} md={6} xl={3} className="bg-warning">
         <h3>Column A</h3> </Col>
    <Col xs={12} md={6} xl={3} className="bg-primary text-white">
         <h3>Column B</h3> </Col>
    <Col xs={12} md={6} xl={3} className="bg-danger text-white">
         <h3>Column C</h3> </Col>
    <Col xs={12} md={6} xl={3} className="bg-success text-white">
         <h3>Column D</h3> </Col>
  </Row>
  </div>
    </div>
  );
}
