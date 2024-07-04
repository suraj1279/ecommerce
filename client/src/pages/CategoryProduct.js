import { Layout } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/CategoryProductStyle.css";
import categoryBackground from "../pages/categorybackground.jpg";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout
      className="categories-layout"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${categoryBackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Header />
      <div className="container mt-3">
        <h4 className="text-center"> {category?.name} </h4>

        <div className="row">
          <div className="col-md-12">
            <div className="d-flex flex-wrap category">
              {products?.map((p) => (
                <div className="card m-2" key={p._id}>
                  <img
                    src={`${process.env.REACT_APP_API}/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>

                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <b>
                      <p className="card-text"> ₹ {p.price}</p>
                    </b>

                    <button
                      className="btn btn-primary ms-2"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-2">
                      
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
