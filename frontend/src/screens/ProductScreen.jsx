import React from "react";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import products from "../products";

const ProductScreen = (props) => {
  //console.log(props.match);
  const product = products.find((p) => p._id === props.match.params.id);
  return (
    <div>
      <Link to="/" className="btn btn-light m-3 rounded ">
        Go Back
      </Link>
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
              <ListGroup.Item>
                <Button
                  className="btn btn-light btn-block rounded"
                  type="button"
                  disabled = {product.countInStock < 1}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
