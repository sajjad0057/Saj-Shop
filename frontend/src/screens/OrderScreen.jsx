import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, ListGroup, Image, Card } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
// import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder } from "../redux/actions/orderActions";
import { ORDER_PAY_RESET } from "../redux/constants/orderConstants";

const OrderScreen = ({ match }) => {
  //console.log("OrderScreen ------> : ", match);
  const orderId = match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  //by distructuring rules loading be renamed or assign in laodingPay same as success.
  const { loading: loadingPay, success: successPay } = orderPay;  

  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  //AaBT0ADNm38QCmRFFXUTsBMfYKPiV2rRGzAB4xPq1pextqKErS87y0CCf13BMzu3H4hOoMxealwEgbg7

  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=AaBT0ADNm38QCmRFFXUTsBMfYKPiV2rRGzAB4xPq1pextqKErS87y0CCf13BMzu3H4hOoMxealwEgbg7`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!order || successPay || order.id !== Number(orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <div>
        <h3 className="text-muted text-center">Order Id: #{order.id}</h3>
      </div>
      <hr />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Shipping </h3>
              <p>
                <strong>
                  Name : <i>{order.user.name}</i>
                </strong>
                <br />
                <strong>
                  Email :{" "}
                  <a href={`mailto:${order.user.email}`}>
                    <i>{order.user.email}</i>
                  </a>
                </strong>
              </p>
              <p>
                <strong>Shipping : </strong>
                {order.shippingAddress.address} , {order.shippingAddress.city} ,
                {order.shippingAddress.postalcode} ,{" "}
                {order.shippingAddress.country}
              </p>
              {order.IsDelivered ? (
                <Message variant="success">
                  Delivered On : {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Payment Method </h3>
              <p>
                <strong>Method : </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid On : {order.paidAt}</Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Order Items </h3>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Your Order is Empty ! </Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, key) => (
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
                  <Col> ${order.itemsPrice} </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping : </Col>
                  <Col> ${order.shippingPrice} </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax : </Col>
                  <Col> ${order.taxPrice} (5% Tax include) </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total : </Col>
                  <Col> ${order.totalPrice} </Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;
