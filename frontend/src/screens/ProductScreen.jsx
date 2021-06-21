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
import {
  productDetailsAction,
  productReviewCreateAction,
} from "../redux/actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../redux/constants/productConstant";

const ProductScreen = (props) => {

  const Product_ID = props.match.params.id;

  const [Qty, setQty] = useState(1);

  // console.log("Qty : ", Qty);
  // console.log("ProductScreen props ---> :",props);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
      dispatch({
        type: PRODUCT_CREATE_REVIEW_RESET,
      });
    }
    dispatch(productDetailsAction(Product_ID));
  }, [dispatch, Product_ID, successProductReview]);

  const addToCartHandler = () => {
    // console.log("addToCartHandler called !");
    props.history.push(`/cart/${Product_ID}?qty=${Qty}`);
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    //console.log("reviewSubmitHandler ----> Triggered !");
    dispatch(
      productReviewCreateAction(Product_ID, {
        rating,
        comment,
      })
    );
  };

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
        <div>
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
                          {product.countInStock > 0
                            ? "In Stoke"
                            : "Out of Stoke"}
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
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h3 className="text-muted">Reviews</h3>
              <hr />
              {product.reviews.length === 0 && (
                <Message variant="info">No Reviews</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review.id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>
                      <i>{review.createdAt.substring(0, 10)}</i>
                    </p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h4>Write a review </h4>
                  {loadingProductReview && <Loader />}
                  {successProductReview && (
                    <Message variant="info"> Your Review Submitted !</Message>
                  )}
                  {errorProductReview && (
                    <Message variant="danger"> {errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={reviewSubmitHandler}>
                      <Form.Group controlId="comment">
                        <Form.Label> Make Comment </Form.Label>
                        <Form.Control
                          as="textarea"
                          row={5}
                          placeholder="Write comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="rating">
                        <Form.Label> Rating </Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Setect...</option>
                          <option value="1">Setect</option>
                          <option value="2"> Fair</option>
                          <option value="3">Good</option>
                          <option value="4">Very Good</option>
                          <option value="5">Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="info"
                        className="btn btn-warning rounded"
                      >
                        submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="warning">
                      Please <Link to="/login">Login</Link> to write your review
                      !
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
