import { Accordion, Button, Col, Container, Form, Row } from "react-bootstrap";
import { SteamData } from "../SteamData";
export default function AddWishlist() {
  return (
    <Container>
      <div className="my-5 py-5">
        <Form className="mb-5 pb-5">
          <Row>
            <Col sm={10}>
              <Form.Control
                className="border-black"
                placeholder="Add any game from the list below to wishlist"
              />
            </Col>
            <Col sm={2}>
              <Button variant="primary" type="submit">
                Wishlist
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
}
