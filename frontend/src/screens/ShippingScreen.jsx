import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const ShippingScreen = ({ history, location }) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [country, setCountry] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("ShippingScreen Form submitHandler Triggered !");
  };
  return (
    <FormContainer>
      <h2>Shipping ... </h2>
      <hr />
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="Address">
          <Form.Label> Address </Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={3}
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="City">
          <Form.Label> City </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalcode">
          <Form.Label> City </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Postal Code"
            value={postalcode}
            onChange={(e) => setPostalcode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label> Country </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <div className="text-center">
          <Button type="submit" className="btn rounded m-auto" variant="info">
            Continue
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
