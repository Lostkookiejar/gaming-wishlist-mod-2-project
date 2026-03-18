import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Form,
  Col,
  Container,
  Modal,
  Nav,
  Navbar,
  Row,
  Placeholder,
  Card,
  Image,
  Toast,
  ToastContainer,
  Badge,
} from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { SteamData } from "../SteamData";
import { useContext } from "react";
import WishlistContext from "../WishlistContext";

export default function NavbarMod() {
  const [show, setShow] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const handleShow = () => {
    setUserQuery("");
    setShow(true);
  };
  const handleClose = () => setShow(false);
  const [preview, setPreview] = useState([]);

  const [showToast, setShowToast] = useState(false);
  const toggleToast = () => setShowToast(!showToast);
  const { userWishlist, setUserWishlist } = useContext(WishlistContext);
  const [toastInfo, setToastInfo] = useState("");

  useEffect(() => {
    setPreview(SteamData.filter((game) => game.name === userQuery));
  }, [userQuery]);

  const handleSubmit = (gameName) => {
    setUserWishlist([...userWishlist, { ...preview[0], id: Date.now() }]);
    setShow(false);
    setToastInfo(gameName);
    setShowToast(true);
  };

  return (
    <>
      <Navbar className="bg-light shadow rounded">
        <Container>
          <Navbar.Brand>Steam Game Wishlist</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className="bg-black text-white" onClick={handleShow}>
              Add
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <ToastContainer
        style={{ position: "sticky" }}
        className="p-3"
        position="top-center"
      >
        <Toast bg="primary" show={showToast} onClose={toggleToast}>
          <Toast.Header>
            <strong className="me-auto">This is a confirmation.</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {toastInfo} added into the wishlist
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <Outlet />

      {/*Modal Code*/}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <em>Add Game</em>
          </Modal.Title>
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
                      <Badge>{element.description} </Badge>
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
                placeholder="Add any item from the listed available games"
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
          {!preview[0] && (
            <Button variant="primary" disabled>
              Add
            </Button>
          )}
          {preview[0] && (
            <Button
              variant="primary"
              onClick={() => handleSubmit(preview[0].name)}
            >
              Add
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
