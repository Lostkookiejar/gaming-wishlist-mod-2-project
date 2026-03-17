import { useEffect, useState } from "react";
import { Image, Form, Button, Col, Modal, Row, Card } from "react-bootstrap";
import { SteamData } from "../SteamData";

function AddModal({ show, handleClose }) {
  const [userQuery, setUserQuery] = useState("");
  const [gameName, setGameName] = useState("");
  const [gameDesc, setGameDesc] = useState("");
  const [gameImage, setGameImage] = useState("");
  const [hasDesc, setHasDesc] = useState(false);
  const [hasImg, setHasImg] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("firing");
  }

  useEffect(() => {
    setHasDesc(false);
    setHasImg(false);
    if (userQuery) {
      const game = SteamData.filter((ele) => ele.name === userQuery)[0];
      if (game.length > 0) {
        setGameName(game.name);
        setGameDesc(game.short_description);
        setGameImage(game.header_image);
        setHasDesc(true);
        setHasImg(true);
      }
    }
  }, [userQuery]);

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Game To Wishlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ height: "50vh" }}>
            <Col sm={6}>{hasImg && <Image src={gameImage} />}</Col>

            <Col sm={6}>
              <Form.Control
                className="border-black"
                placeholder="Add any game from the list below to wishlist"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
              />
              {hasDesc && (
                <Card>
                  <Card.Body>
                    <Card.Title>{gameName}</Card.Title>
                    <Card.Text>{gameDesc}</Card.Text>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Proceed
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
