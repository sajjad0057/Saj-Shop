import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Button,
  Col,
  Row,
  ListGroup,
  Image,
  Card,
} from "react-bootstrap";
// import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { createOrder } from "../redux/actions/orderActions";
import { ORDER_CREATE_RESET } from "../redux/constants/orderConstants";


const PlaceOrderScreen = ({history}) => {

  const orderCreate = useSelector(state => state.orderCreate)
  const {order,success,error} = orderCreate;


  const cart = useSelector((state) => state.cart);

  const { shippingAddress, paymentMethod, cartItems } = cart;

  //update object or initialize  : object_name.key = value [like as pyhton dict]

  cart.itemsPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10;
  cart.taxPrice = (0.05 * cart.itemsPrice).toFixed(2);
  cart.totalPrice =
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice);

  const dispatch = useDispatch();

  if(!paymentMethod){
    history.push('/payment')
  }

  useEffect(() => {
    if(success){
      history.push(`/order/${order.id}`)
      dispatch({
        type : ORDER_CREATE_RESET
      })
    }
  }, [success,history])

  const placeOrder = () => {
    console.log("PlaceOrderScreen from Submitted !");
    dispatch(createOrder({
      orderItems : cartItems,
      shippingAddress : shippingAddress,
      paymentMethod : paymentMethod,
      itemsPrice : cart.itemsPrice,
      shippingPrice : cart.shippingPrice,
      taxPrice : cart.taxPrice,
      totalPrice : cart.totalPrice

    }))
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <hr />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Shipping </h3>
              <p>
                <strong>Shipping : </strong>
                {shippingAddress.address} , {shippingAddress.city} ,
                {shippingAddress.postalcode} , {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Payment Method </h3>
              <p>
                <strong>Method : </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Order Items </h3>
              {cartItems.length === 0 ? (
                <Message variant="info">Your Cart is Empty ! </Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, key) => (
                    <ListGroup.Item key={key}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product_id}/${item.name}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X {item.price} ={" "}
                          {(item.qty * item.price).toFixed(2)} $
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Order Summary :</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Item : </Col>
                  <Col> ${cart.itemsPrice} </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping : </Col>
                  <Col> ${cart.shippingPrice} </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax : </Col>
                  <Col> ${cart.taxPrice} (5% Tax include) </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total : </Col>
                  <Col> ${cart.totalPrice} </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant='danjer'>{error}</Message>}

              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block btn-info rounded"
                  disabled={cartItems === 0}
                  onClick={placeOrder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
