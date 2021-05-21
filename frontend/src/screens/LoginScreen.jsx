import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Login } from "../redux/actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const userLogin = useSelector(state => state.userLogin)
  const {error,loading,userInfo} = userLogin

  const dispatch = useDispatch()




//   console.log("LoginScreen ----- > ", props)
  const redirect = props.location.serach ? props.location.serach.split("=")[1] : '/register';



  useEffect(()=>{
      if (userInfo){
          props.history.push(redirect)
      }
  },[props.history,userInfo,redirect])

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("LoginScreen --- submitHandler triggered");
    dispatch(Login(email,password))

  };


  

  return (
    <div>
      <FormContainer>
        <h3 className="text-center">Sign In</h3>
        <hr />
        <div>
            {error && <Message variant={"danger"}>{error}</Message>}
            {loading && <Loader/>}
        </div>
        <Form onSubmit={submitHandler}>
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
          <div className="text-center">
            <Button type="submit" className="btn rounded m-auto" variant="info">
              Sign In
            </Button>
          </div>
        </Form>
        <div className="text-center">
          <Row className="py-3">
            <Col>
              New Customer ?
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                {" "}
                Register{" "}
              </Link>
            </Col>
          </Row>
        </div>
      </FormContainer>
    </div>
  );
};

export default LoginScreen;
