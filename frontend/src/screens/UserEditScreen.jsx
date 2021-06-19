import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { Button, Form } from "react-bootstrap";
import { getUserDetails } from "../redux/actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

function UserEditScreen({ match, history }) {
    console.log("UserEditScreen ---- match : ",match);
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);


  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    if(!user.name || user.id !== Number(userId)){
        dispatch(getUserDetails(userId))
    }else{
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
    }

  }, [user,userId]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Link to="admin/users-list" className="btn btn-light m-3 rounded ">GO BACK</Link>
      <FormContainer>
        <h3 className="text-center">Edit User : </h3>
        <hr />

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label> Name </Form.Label>
              <Form.Control
                type="text"
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

            <Form.Group controlId="isAdmin">
              <Form.Label>Set Admin ? </Form.Label>
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <div className="text-center">
              <Button
                type="submit"
                className="btn rounded m-auto"
                variant="danger"
              >
                Update
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default UserEditScreen;
