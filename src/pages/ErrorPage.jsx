import { Button, Container } from "react-bootstrap";

export default function ErrorPage() {
  return (
    <Container>
      <h1 className="m-4 p-4">Oops!</h1>
      <p className="mx-4 px-4">This page could not be found</p>
      <p className="mx-4 px-4">
        <Button href="/">Go Back To Home</Button>
      </p>
    </Container>
  );
}
