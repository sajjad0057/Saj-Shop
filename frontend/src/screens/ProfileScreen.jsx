import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../redux/actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

function ProfileScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      props.history.push("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("LoginScreen --- submitHandler triggered");
    if (password !== confirmPassword) {
      setMessage("Password don't matched !");
    } else {
      console.log("Updateing The Profile ...... !");
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h3 className="text-center text-muted">User Profile</h3>
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
              type="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label> Email Address </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Enter Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confrim Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confrim Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <div className="text-center">
            <Button type="submit" className="btn rounded m-auto" variant="info">
              update
            </Button>
          </div>
        </Form>
      </Col>
      <Col md={9}>
        <h3 className="text-center text-muted">My Orders</h3>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
