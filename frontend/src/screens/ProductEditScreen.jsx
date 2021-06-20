import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { Button, Form } from "react-bootstrap";
import { productDetailsAction } from "../redux/actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";




function ProductEditScreen({ match, history }) {

  const productId = match.params.id;
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [countInStock, setCountInStoke] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')

  const productDetail = useSelector((state) => state.productDetail);
  const { error, loading, product } = productDetail;

  const dispatch = useDispatch();

  useEffect(() => {

        if(!product.name || product.id !== Number(productId)){
            dispatch(productDetailsAction(productId))
        }else{
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCountInStoke(product.countInStock)
            setCategory(product.category)
            setDescription(product.description)
            
        }
    
      
    
  }, [dispatch,productId,product,history]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("ProductEditScreen --- > Triggered !");
    // // if we pass just variable into a object, not key value pair. when variable_name set as key and this variable_value set this keys_value automatically.  
    // dispatch(productUpdateAction({      
    //     id : user.id,
    //     name,
    //     email,
    //     isAdmin,
    // }))
  };

  return (
    <div>
      <Link to="/admin/products-list/" className="btn btn-light m-3 rounded ">GO BACK</Link>
      <FormContainer>
        <h3 className="text-center">Edit Product : </h3>

        
        <hr />

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label> Name </Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label> Price </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label> Image </Form.Label>
              <Form.Control
                type="text"
                placeholder="Set image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label> Brand </Form.Label>
              <Form.Control
                type="text"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>            
            <Form.Group controlId="countInStock">
              <Form.Label> CountInStock </Form.Label>
              <Form.Control
                type="number"
                placeholder="Set Stock"
                value={countInStock}
                onChange={(e) => setCountInStoke(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label> Category </Form.Label>
              <Form.Control
                type="text"
                placeholder="Set Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label> Description </Form.Label>
              <Form.Control
                type="number"
                placeholder="Set description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <div className="text-center">
              <Button
                type="submit"
                className="btn rounded m-auto"
                variant="danger"
              >
                Update
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;
