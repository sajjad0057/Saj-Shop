import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../redux/actions/productActions";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  console.log("Check -----> ", productList);

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <div>
      <h2>Latest Product</h2>
      <hr />
      {loading ? (
        <h3>Loading .... </h3>
      ) : error ? (
        <div>
          <h1>Opps!</h1>
          <h4 className="text-muted">{error}</h4>
        </div>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
