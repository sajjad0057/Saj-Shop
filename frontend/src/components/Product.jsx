import React from "react";
import { Card } from "react-bootstrap";

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
              <strong>{product.name}</strong>
            </Card.Title>
          </a>
        </Card.Body>
        <Card.Text as="div">
          <div className="my-3">
            {product.rating} <i class="far fa-star"></i> from{" "}
            {product.numReviews} reviews
          </div>
        </Card.Text>
        <Card.Text as="h4" className="text-muted">
        <i class="fas fa-dollar-sign"></i> {product.price}
        </Card.Text>
      </Card>
    </div>
  );
}

export default Product;
