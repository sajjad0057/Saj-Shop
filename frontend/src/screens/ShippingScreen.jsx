import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from '../redux/actions/cartActions'

const ShippingScreen = ({ history, location }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch()
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalcode, setPostalcode] = useState(shippingAddress.postalcode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("ShippingScreen Form submitHandler Triggered !");
    dispatch(saveShippingAddress({address,city,postalcode,country}));
    history.push("/payment")
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
            value={address?address:""}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="City">
          <Form.Label> City </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="city"
            value={city?city:""}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalcode">
          <Form.Label> City </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Postal Code"
            value={postalcode?postalcode:""}
            onChange={(e) => setPostalcode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label> Country </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="country"
            value={country?country:""}
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
