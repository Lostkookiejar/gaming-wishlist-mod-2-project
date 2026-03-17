import { useContext, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const pressButton = (e) => {
    e.preventDefault();
    const isCorrectUsername = username === "rxchong1123@gmail.com";
    const isCorrectPassword = password === "password";
    if (isCorrectUsername && isCorrectPassword) {
      authContext.setToken("1234");
      navigate("/");
    }
    //press button code here
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center my-4 py-4">
          <Col md={4}>
            <Card>
              <Card.Body className="text-center">
                <small className=" text-black-50">
                  Please enter your details
                </small>
                <h2 className="my-4">
                  <strong>Welcome Back</strong>
                </h2>
                <br />
                <Form onSubmit={pressButton}>
                  <Form.Control
                    placeholder="Enter your email address"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mb-4"
                  />
                  <Form.Control
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4"
                  />
                  <Button
                    style={{ width: "100%" }}
                    className=" btn btn-primary"
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
