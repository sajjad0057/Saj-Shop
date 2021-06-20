import React, { useEffect, useState } from "react";
import { USER_UPDATE_PROFILE_RESET } from "../redux/constants/userConstant";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  updateUserProfile,
} from "../redux/actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { userOrderList } from "../redux/actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";

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

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderList = useSelector((state) => state.orderList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderList; // Follow js distructuring methods

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      props.history.push("/login");
    } else {
      if (!user || !user.name || success || userInfo.id !== user.id) {
        dispatch({
          type: USER_UPDATE_PROFILE_RESET,
        });
        dispatch(getUserDetails("profile"));
        dispatch(userOrderList());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("LoginScreen --- submitHandler triggered");
    if (password !== confirmPassword) {
      setMessage("Password don't matched !");
    } else {
      console.log("profile Updated Triggered !");
      setPassword("");
      setConfirmPassword("");
      dispatch(
        updateUserProfile({
          id: user.id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("Your Info is Updated");
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
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.map((order) => (
                <tr key={order.id}>
                  <th>{order.id}</th>
                  <th>{order.createdAt.substring(0, 10)}</th>
                  <th>$ {order.totalPrice}</th>
                  <th>
                    {order.isPaid ? (
                      `Paid-${order.paidAt.substring(0, 10)}`
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </th>
                  <th>
                    <LinkContainer to={`/order/${order.id}`}>
                      <Button
                        type="button"
                        className="btn btn-secondary btn-sm rounded "
                      >
                        Details
                      </Button>
                    </LinkContainer>
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen;
