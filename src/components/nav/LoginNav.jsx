import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export const LoginNav = () => {
  return (
    <>
      <Navbar fixed="top" bg="light" data-bs-theme="light">
        <Container className="p-0">
          <Navbar.Brand href="/">
            {/* <img
              src="src\assets\seneca_creek_sprigs_logo_no_text_corrected.png"
              width="30"
              height="30"
              alt=""
            /> */}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};
