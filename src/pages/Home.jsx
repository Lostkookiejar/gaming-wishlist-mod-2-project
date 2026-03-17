import { useContext, useEffect, useState } from "react";
import {
  Image,
  Accordion,
  Alert,
  Button,
  Card,
  Col,
  Container,
  Row,
  Badge,
  Modal,
  Placeholder,
  Form,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import WishlistContext from "../WishlistContext";
import { SteamData } from "../SteamData";

export default function Home() {
  const { userWishlist, setUserWishlist } = useContext(WishlistContext);
  const [showModal, setShowModal] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const toggleModal = () => setShowModal(!showModal);
  const [stagedData, setStagedData] = useState([]);
  const [updatingId, setUpdatingId] = useState("");
  const [showToast, setShowToast] = useState(false);
  const toggleToast = () => setShowToast(!showToast);

  function getUpdateModal(name, id) {
    setUserQuery(name);
    setUpdatingId(id);
    toggleModal();
  }

  function deleteWishlist(id) {
    const trimmedWishlist = userWishlist.filter((item) => item.id !== id);
    setUserWishlist(trimmedWishlist);
  }

  useEffect(() => {
    setStagedData(SteamData.filter((game) => game.name === userQuery));
  }, [userQuery]);

  function submitEdit(stagedData) {
    const updatedWishlist = userWishlist.map((item) => {
      if (item.id === updatingId) {
        return stagedData;
      }
      return item;
    });
    setUserWishlist(updatedWishlist);
    toggleToast();
    toggleModal();
  }
  return (
    <>
      <ToastContainer
        style={{ position: "sticky" }}
        className="p-3"
        position="top-center"
      >
        <Toast bg="info" show={showToast} onClose={toggleToast}>
          <Toast.Header>
            <strong className="me-auto">This is a confirmation.</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {stagedData[0] && stagedData[0].name} edited into the wishlist
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <Container>
        <div className="my-5 py-5">
          <Card border="dark" className="mb-5 bg-white text-white">
            <Card.Body>
              <Card.Img src="Header_1.jpg" alt="Card Image" />
              <Card.ImgOverlay className="d-flex flex-column align-items-center justify-content-center">
                <Card.Title className="mb-4 py-4 font-bold">
                  <strong style={{ fontSize: "60px" }}>
                    Chong's Game Wishlist
                  </strong>
                </Card.Title>
                <Card.Text>
                  Keep track of your gaming backlog and any discounts with this
                  handy tool! Made with React and React Bootstrap
                </Card.Text>
              </Card.ImgOverlay>
            </Card.Body>
          </Card>

          {userWishlist.length === 0 && (
            <Alert variant="warning" className="mb-4 py-4 text-center lead">
              Don't have an active wishlist? That's why you're seeing this
              message. Click the 'Add' tab on the top to start tracking
            </Alert>
          )}

          {/*<component array = {userWishlist}/> here*/}
          {userWishlist.length > 0 && (
            <>
              <h1 className="text-white">
                <strong>Your Wishlist</strong>
              </h1>
              {userWishlist.map((game) => {
                return (
                  <>
                    <Card className="mb-4 p-2" key={game.id}>
                      <Row>
                        <Col className="m-0 p-0" sm={11}>
                          <Card.Body className="m-0 p-0 py-2 ps-4">
                            <Row>
                              <Col sm={4}>
                                <Image width="380rem" src={game.header_image} />
                              </Col>
                              <Col sm={8}>
                                <Card.Header className="bg-warning">
                                  <h3 className="my-0 py-0">
                                    <strong>{game.name}</strong>
                                  </h3>
                                </Card.Header>
                                <Card.Text className="mt-1">
                                  {game.short_description}
                                </Card.Text>
                              </Col>
                            </Row>
                            <Card.Footer>
                              <Row>
                                <Col className="me-auto">
                                  {game.genres.map((genre, index) => (
                                    <Badge key={index}>
                                      {genre.description}
                                    </Badge>
                                  ))}
                                </Col>
                                {!game.is_free && (
                                  <>
                                    {game?.price_overview?.initial ===
                                      game?.price_overview?.final && (
                                      <>
                                        <Col className="text-end">
                                          <strong className="py-1 pe-1 border border-success">
                                            <strong className="p-1 bg-success text-light">
                                              {parseFloat(
                                                game?.price_overview?.final /
                                                  100,
                                              ).toFixed(2)}
                                            </strong>
                                            {` MYR`}
                                          </strong>
                                        </Col>
                                      </>
                                    )}
                                    {game?.price_overview?.final <
                                      game?.price_overview?.initial && (
                                      <>
                                        <Col className="text-end">
                                          <strong className="py-1 pe-1 border border-success">
                                            <small className="p-1 bg-success-subtle text-black">
                                              <del>
                                                {parseFloat(
                                                  game?.price_overview
                                                    ?.initial / 100,
                                                ).toFixed(2)}
                                              </del>
                                            </small>
                                            <strong className="p-1 bg-success text-light">
                                              {parseFloat(
                                                game?.price_overview?.final /
                                                  100,
                                              ).toFixed(2)}
                                            </strong>
                                            {` MYR`}
                                          </strong>
                                        </Col>
                                      </>
                                    )}
                                  </>
                                )}
                                {game.is_free && (
                                  <>
                                    <Col className="text-end">
                                      <strong className="p-1 border border-success">
                                        Free To Play
                                      </strong>
                                    </Col>
                                  </>
                                )}
                              </Row>
                            </Card.Footer>
                          </Card.Body>
                        </Col>
                        <Col
                          sm={1}
                          className="m-0 p-0 d-flex flex-column justify-content-center align-items-center"
                        >
                          <Button
                            className="m-3 p-3"
                            onClick={() => getUpdateModal(game.name, game.id)}
                          >
                            <i class="bi bi-pencil-fill"></i>
                          </Button>
                          <Button
                            variant="outline-danger"
                            className="m-3 p-3"
                            onClick={() => deleteWishlist(game.id)}
                          >
                            <i class="bi bi-trash3"></i>
                          </Button>
                        </Col>
                      </Row>
                    </Card>
                  </>
                );
              })}
            </>
          )}

          <Accordion defaultActiveKey="0" className="my-4 pb-4">
            <Accordion.Item>
              <Accordion.Header>Games Available to Wishlist</Accordion.Header>
              <Accordion.Body>
                <ul className="list-unstyled mb-0 pb-0">
                  {SteamData.map((game, index) => (
                    <li key={index}>{game.name}</li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Container>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={toggleModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <em>Edit Game</em>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ height: "30rem" }}>
            <Col sm={8} className="d-flex flex-column justify-content-center">
              {!stagedData[0] && (
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
              {stagedData[0] && (
                <>
                  <h2>
                    <strong>{stagedData[0].name}</strong>
                  </h2>
                  <small className="mb-1">
                    {stagedData[0].genres.map((element) => (
                      <Badge>{element.description} </Badge>
                    ))}
                  </small>
                  <Image className="py-3" src={stagedData[0].header_image} />
                  <Card.Text>{stagedData[0].short_description}</Card.Text>
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
              {!stagedData[0] && (
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
              {stagedData[0] && !stagedData[0].is_free && (
                <>
                  <h3>Price Overview</h3>
                  {stagedData[0]?.price_overview?.final ===
                    stagedData[0]?.price_overview?.initial && (
                    <>
                      <h4>
                        MYR{" "}
                        {parseFloat(
                          stagedData[0]?.price_overview?.final / 100,
                        ).toFixed(2)}
                      </h4>
                    </>
                  )}
                  {stagedData[0]?.price_overview?.final !==
                    stagedData[0]?.price_overview?.initial && (
                    <>
                      <h5>
                        <del>
                          MYR{" "}
                          {parseFloat(
                            stagedData[0]?.price_overview?.initial / 100,
                          ).toFixed(2)}
                        </del>
                      </h5>
                      <h4>
                        MYR{" "}
                        {parseFloat(
                          stagedData[0]?.price_overview?.final / 100,
                        ).toFixed(2)}
                      </h4>
                      <Alert key="info">
                        <h4 className="my-0 py-0">
                          <strong>
                            {stagedData[0]?.price_overview?.discount_percent}
                          </strong>
                          % Discounted
                        </h4>
                      </Alert>
                    </>
                  )}
                </>
              )}
              {stagedData[0] && stagedData[0].is_free && (
                <>
                  <h3>Free to Play</h3>
                </>
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          {!stagedData[0] && (
            <Button variant="primary" disabled>
              Edit
            </Button>
          )}
          {stagedData[0] && (
            <Button variant="primary" onClick={() => submitEdit(stagedData[0])}>
              Edit
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
