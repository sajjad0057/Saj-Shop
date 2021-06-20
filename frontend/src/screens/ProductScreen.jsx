import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { productDetailsAction } from "../redux/actions/productActions";

const ProductScreen = (props) => {
  const [Qty, setQty] = useState(1);
  // console.log("Qty : ", Qty);
  // console.log("ProductScreen props ---> :",props);

  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  useEffect(() => {
    dispatch(productDetailsAction(props.match.params.id));
  }, [dispatch,props.match.params.id]);

  const addToCartHandler = () =>{
    // console.log("addToCartHandler called !");
    props.history.push(`/cart/${props.match.params.id}?qty=${Qty}`)
  }

  return (
    <div>
      <Link to="/" className="btn btn-light m-3 rounded ">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.image} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={product.numReviews} />
              </ListGroup.Item>
              <ListGroup.Item>
                <i>Price : $ {product.price}</i>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5 className="text-muted">
                  <i>Description : </i>
                </h5>
                <i>{product.description}</i>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price :</Col>
                    <Col>
                      <strong>$ {product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status :</Col>
                    <Col>
                      <i>
                        {product.countInStock > 0 ? "In Stoke" : "Out of Stoke"}
                      </i>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col className="m-auto">Quantity : </Col>
                      <Col xs="auto" className="my-1">
                        <Form.Control
                          as="select"
                          value={Qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map(
                            (key_val) => (
                              <option key={key_val} value={key_val + 1}>
                                {key_val + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className="btn btn-light btn-block rounded"
                    type="button"
                    disabled={product.countInStock < 1}
                    onClick = {addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductScreen;
