import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
//import { savePaymentMethod } from '../redux/actions/cartActions'
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch(savePaymentMethod(paymentMethod))
    history.push("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={submitHandler}>
          <Form.Group>
              <Form.Label as='legend'> Select Method </Form.Label>
              <Col>
              <Form.Check
                type='radio'
                label = "PayPal or Credit Card"
                id = "paypal"
                name = "paymentMethod"
                checked
                onChange = {(e)=>e.target.value}
              >

              </Form.Check>
              </Col>
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

export default PaymentScreen;
