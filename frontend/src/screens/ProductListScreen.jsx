import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listProducts,
  productDeleteAction,
  productCreateAction,
} from "../redux/actions/productActions";
import { PRODUCT_CREATE_RESET } from "../redux/constants/productConstant";

const ProductListScreen = ({ match, history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: createLoading,
    error: createError,
    success: createSuccess,
    product: createProduct,
  } = productCreate;

  useEffect(() => {
    dispatch({
      type: PRODUCT_CREATE_RESET,
    });
    if (!userInfo.isAdmin) {
      history.push("/login");
    } else if (createSuccess) {
      history.push(`/admin/product/${createProduct.id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    history,
    userInfo,
    deleteSuccess,
    createSuccess,
    createProduct,
  ]);

  const deleteHandler = (product_id) => {
    //console.log("ProductListScreen ----->deleteHandler : ", user_id);
    if (window.confirm("Are you Sure Want to delete this Product ???")) {
      dispatch(productDeleteAction(product_id));
    }
  };

  const createProductHandler = () => {
    dispatch(productCreateAction())
  };
  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button
            className="my-3 btn btn-secondary rounded"
            onClick={createProductHandler}
          >
            <i className="fas fa-plus"></i> create Product
          </Button>
        </Col>
      </Row>
      {deleteLoading && <Loader />}
      {deleteError && <Message variant="danger">{deleteError}</Message>}
      {createLoading && <Loader />}
      {createError && <Message variant="danger">{createError}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product.id}/edit`}>
                      <Button variant="light" className="btn rounded btn-sm">
                        <i
                          className="fas fa-edit"
                          style={{ color: "orange" }}
                        ></i>
                      </Button>
                    </LinkContainer>
                    {"  "}
                    <Button
                      variant="light"
                      className="btn rounded btn-sm"
                      onClick={() => deleteHandler(product.id)}
                    >
                      <i className="fas fa-trash" style={{ color: "red" }}></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ProductListScreen;

/**
 * 
 * 
 * import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button,Row ,Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../redux/actions/productActions";



const ProductListScreen = ({ history, match}) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;



  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }
  }, [dispatch, history,userInfo]);

  const deleteHandler = (user_id) => {
    //console.log("ProductListScreen ----->deleteHandler : ", user_id);
    if(window.confirm("Are you Sure Want to delete this Product ???")){
        //
    

  };

  const createProductHandler = (product)=>{
      //
  }
  return (
    <div>
      <h3>Products  :</h3>
      <Row className='align-items-center'>
          <Col>
            <h1>Products</h1>
          </Col>
          <Col className='text-right'>
              <Button className='my-3' onClick={createProductHandler}>
                  <i className='fas fa-plus'></i> create Product

              </Button>
          
          </Col>

      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products && products.map((user) => (
              <tr key={products.id}>
                <td>{products.id}</td>
                <td>{products.name}</td>
                <td>{products.price}</td>
                <td>{products.category}</td>
                <td>{products.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product.id}/edit`}>
                    <Button variant="light" className="btn rounded btn-sm">
                      <i
                        className="fas fa-edit"
                        style={{ color: "orange" }}
                      ></i>
                    </Button>
                  </LinkContainer>
                  {"  "}
                  <Button
                    variant="light"
                    className="btn rounded btn-sm"
                    onClick={() => deleteHandler(product.id)}
                  >
                    <i className="fas fa-trash" style={{ color: "red" }}></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};





export default ProductListScreen;
 */
