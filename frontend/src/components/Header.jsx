import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
function Header() {
  return (
    <div>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <Navbar.Brand href="#home">Saj Shop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/cart">
                  <i class="fas fa-cart-plus"></i>
                  Cart
                </Nav.Link>
                <Nav.Link href="/login">
                  <i class="fas fa-sign-in-alt"></i>
                  Login
                </Nav.Link>
              </Nav>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  );
}

export default Header;
