import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listOfTopProducts } from "../redux/actions/productActions";

const CarouselProduct = () => {
  const dispatch = useDispatch();
  const topProducts = useSelector((state) => state.topProducts);
  const { loading, error, products } = topProducts;
  useEffect(() => {
    dispatch(listOfTopProducts());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Carousel pause="hover" style={{background:"#bfbcbb"}}>
          {products.map((product) => (
            <Carousel.Item key={product.id}>
              <Link to={`product/${product.id}/${product.name}/`}>
                <Image src={product.image} alt={product.name} fluid />
              </Link>
              <Carousel.Caption className="carousel.caption">
                <h3 >{product.name}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default CarouselProduct;
