import { useEffect, useState } from "react";
import {
  Form,
  Col,
  Container,
  Modal,
  Row,
  Button,
  Image,
  Card,
  Placeholder,
  Alert,
  Toast,
} from "react-bootstrap";
import { SteamData } from "../SteamData";

export default function Testing() {
  const [show, setShow] = useState(false);
  const [userQuery, setUserQuery] = useState("");

  const [preview, setPreview] = useState([]);

  useEffect(() => {
    setPreview(SteamData.filter((game) => game.name === userQuery));
  }, [userQuery]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [showToast, setShowToast] = useState(false);
  const toggleToast = () => setShowToast(!showToast);
  return (
    <>
      <Container>
        <div className="my-5 py-5">
          <Button variant="primary" onClick={handleShow}>
            Open modal
          </Button>
          <Button onClick={toggleToast}>Toggle Toast</Button>
          <Toast show={showToast} onClose={toggleToast}>
            <Toast.Header>
              <strong>This is a confirmation.</strong>
            </Toast.Header>
            <Toast.Body>
              <strong>Game</strong> added into the wishlist
            </Toast.Body>
          </Toast>
        </div>
      </Container>

      <Modal
        className="bg-secondary"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ height: "30rem" }}>
            <Col sm={8} className="d-flex flex-column justify-content-center">
              {!preview[0] && (
                <>
                  <Placeholder
                    className="mb-3"
                    as={Card.Title}
                    animation="glow"
                  >
                    <Placeholder xs={4} />
                  </Placeholder>
                  <Image src="https://placehold.co/600x400" />
                  <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={3} /> <Placeholder xs={3} />{" "}
                    <Placeholder xs={11} /> <Placeholder xs={4} />{" "}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                  </Placeholder>
                </>
              )}
              {preview[0] && (
                <>
                  <h2>
                    <strong>{preview[0].name}</strong>
                  </h2>
                  <small className="mb-1">
                    {preview[0].genres.map((element) => (
                      <>{element.description} </>
                    ))}
                  </small>
                  <Image className="py-3" src={preview[0].header_image} />
                  <Card.Text>{preview[0].short_description}</Card.Text>
                </>
              )}
            </Col>
            <Col>
              <Form.Control
                className="border-black mb-4"
                placeholder="add any game"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
              />
              {!preview[0] && (
                <>
                  <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} />
                    <Placeholder xs={4} /> <Placeholder xs={6} />
                    <Placeholder xs={8} />
                  </Placeholder>
                  <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} />
                    <Placeholder xs={4} /> <Placeholder xs={6} />
                    <Placeholder xs={8} />
                  </Placeholder>
                  <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} />
                    <Placeholder xs={4} /> <Placeholder xs={6} />
                    <Placeholder xs={8} />
                  </Placeholder>
                </>
              )}
              {preview[0] && !preview[0].is_free && (
                <>
                  <h3>Price Overview</h3>
                  {preview[0]?.price_overview?.final ===
                    preview[0]?.price_overview?.initial && (
                    <>
                      <h4>
                        MYR{" "}
                        {parseFloat(
                          preview[0]?.price_overview?.final / 100,
                        ).toFixed(2)}
                      </h4>
                    </>
                  )}
                  {preview[0]?.price_overview?.final !==
                    preview[0]?.price_overview?.initial && (
                    <>
                      <h5>
                        <del>
                          MYR{" "}
                          {parseFloat(
                            preview[0]?.price_overview?.initial / 100,
                          ).toFixed(2)}
                        </del>
                      </h5>
                      <h4>
                        MYR{" "}
                        {parseFloat(
                          preview[0]?.price_overview?.final / 100,
                        ).toFixed(2)}
                      </h4>
                      <Alert key="info">
                        <h4 className="my-0 py-0">
                          <strong>
                            {preview[0]?.price_overview?.discount_percent}
                          </strong>
                          % Discounted
                        </h4>
                      </Alert>
                    </>
                  )}
                </>
              )}
              {preview[0] && preview[0].is_free && (
                <>
                  <h3>Free to Play</h3>
                </>
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
