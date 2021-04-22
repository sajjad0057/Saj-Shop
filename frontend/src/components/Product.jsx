import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <div>
      <Card className="my-3 p-3 rounded">
        <a href={`/product/${product._id}`}>
          <Card.Img src={product.image} />
        </a>
        <Card.Body>
          <a href={`/product/${product._id}`}>
            <Card.Title as="div">
              <h6 className="text-muted">{product.name}</h6>
            </Card.Title>
          </a>
          <Card.Text as="div">
            <div className="my-3">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#a8a8a7"}
              />
            </div>
          </Card.Text>
          <Card.Text as="h4" className="text-muted">
            <i class="fas fa-dollar-sign"></i> {product.price}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product;
