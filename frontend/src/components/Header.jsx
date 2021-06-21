import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Form,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Logout } from "../redux/actions/userActions";
import SearchBox from "./SearchBox";



function Header() {

  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    //console.log("from Header logoutHandler triggered!");


    dispatch(Logout());
  };

  return (
    <div>
      <header>
        <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand href="#home">Saj Shop</Navbar.Brand>
            </LinkContainer>

            <Navbar.Collapse id="basic-navbar-nav">
              
              <Nav className="mr-auto">
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i class="fas fa-cart-plus"></i>
                    Cart
                  </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    {/* <LinkContainer to="/"> */}
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                    {/* </LinkContainer> */}

                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i class="fas fa-sign-in-alt"></i>
                      Login
                    </Nav.Link>
                  </LinkContainer>
                )}

                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="ADMIN" id="adminmenu">
                    <LinkContainer to="/admin/users-list">
                      <NavDropdown.Item>users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/products-list">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orders-list">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>

                  </NavDropdown>
                )}
              </Nav>
              <SearchBox/>
            </Navbar.Collapse>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </Container>
        </Navbar>
      </header>
    </div>
  );
}

export default Header;
