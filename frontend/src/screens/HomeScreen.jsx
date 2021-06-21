import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../redux/actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function HomeScreen({history}) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  // console.log("Check -----> ", productList);
  const keyword = history.location.search
  console.log("Check HomeScreen -----> ", keyword);
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch,keyword]);

  return (
    <div>
      <h2>Viewing All products</h2>
      <hr />
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>

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
