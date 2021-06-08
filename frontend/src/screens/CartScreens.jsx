import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import { ListGroup, Row, Col, Image, Form, Button, Card } from "react-bootstrap";
import Message from "../components/Message";

function CartScreens(props) {
  // console.log("CartScreens props--->",props);
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  // console.log("qty --- >",qty);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // console.log("cartItems", cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeCartHandler = (id) => {
    console.log("CartScreens ----> Remove Cart Id :", id);
    dispatch(removeFromCart(id))
    props.history.push('/cart')
  };

  const checkOutHandler = ()=>{
    //console.log("CartScreens ----> checkOutHandler :");
    props.history.push('/login?redirect=shipping')
  }
  return (
    <Row>
      <Col md={8}>
        <h1 className="text-muted">Shopping Cart</h1>
        <hr />
        {cartItems.length === 0 ? (
          <Message variant="light">
            Your Cart Is Empty !
            <Link to="/" className="btn btn-light m-3 rounded ">
              Go Back
            </Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product_id}>
                {/* {console.log("CartScreens>>>>>>",item.countInStoke)} */}
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link
                      to={`/product/${item.product_id}/${item.name}`}
                      className="text-muted"
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2} className="m-auto">
                    $ {item.price}
                  </Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product_id, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.countInStoke).keys()].map((key_val) => (
                        <option key={key_val} value={key_val + 1}>
                          {key_val + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeCartHandler(item.product_id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4 className="text-muted">
                SUBTOTAL : {cartItems.reduce((acc,item)=>acc+item.qty,0)} ITEMS
              </h4>
              $ {cartItems.reduce((acc,item)=>acc+item.qty * item.price,0)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type = 'button'
                className = 'btn-block btn-info rounded'
                disabled = {cartItems.length === 0}
                onClick = {()=>checkOutHandler()}
              >
                Proceed to chekout
              </Button>
            </ListGroup.Item>

          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreens;
