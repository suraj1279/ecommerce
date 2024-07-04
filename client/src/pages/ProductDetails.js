import { Layout } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import Header from "../components/Layout/Header";
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/products/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      let user = JSON.parse(localStorage.getItem("auth"));
      const updatedProduct = {
        ...product,
        quantity: 1,
        user_id: user.user._id,
      };
      setCart([...cart, updatedProduct]);
      localStorage.setItem("cart", JSON.stringify([...cart, updatedProduct]));
    }

    toast.success("Item Added to cart");
  };

  return (
    <Layout>
      <Header />
      <div className="container">
        <div className="product-card">
          <img
            src={`${process.env.REACT_APP_API}/product/product-photo/${product._id}`}
            alt={product.name}
          />
          <div className="product-details-info">
            <h1 className="text-center">Product Details</h1>
            <hr />
            <h6>Name: {product.name}</h6>
            <h6>Description: {product.description}</h6>
            <h6>
              Price:{" "}
              {product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </h6>
            <h6>Category: {product?.category?.name}</h6>
            <button
              className="btn btn-secondary ms-2 cart1"
              onClick={() => addToCart(product)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <hr />
    </Layout>
  );
};

export default ProductDetails;
