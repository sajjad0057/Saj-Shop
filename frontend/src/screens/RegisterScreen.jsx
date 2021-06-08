import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Register } from "../redux/actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  const dispatch = useDispatch();

  //   console.log("LoginScreen ----- > ", props)
  const redirect = props.location.serach
    ? props.location.serach.split("=")[1]
    : "/";

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("LoginScreen --- submitHandler triggered");
    if (password !== confirmPassword) {
      setMessage("Password don't matched !");
    } else {
      dispatch(Register(name, email, password));
    }
  };

  return (
    <div>
      <FormContainer>
        <h3 className="text-center">Sign Up</h3>
        <hr />
        <div>
          {message && <Message variant={"danger"}>{message}</Message>}
          {error && <Message variant={"danger"}>{error}</Message>}
          {loading && <Loader />}
        </div>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label> Name </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label> Email Address </Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Enter Password </Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confrim Password </Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Confrim Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <div className="text-center">
            <Button
              type="submit"
              className="btn rounded m-auto"
              variant="danger"
            >
              Sign Up
            </Button>
          </div>
        </Form>
        <div className="text-center">
          <Row className="py-3">
            <Col>
              Have an Account?
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                {" "}
                Sign In{" "}
              </Link>
            </Col>
          </Row>
        </div>
      </FormContainer>
    </div>
  );
}

export default RegisterScreen;
