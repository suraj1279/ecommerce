import { Layout } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Layout/Header";
import useCategory from "../hooks/useCategory";
import categoryBackground from "../pages/categorybackground.jpg";

const Categories = () => {
  const categories = useCategory();

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
      <Layout.Content className="categories-content">
        <div className="container">

          <div className="row mt-4">
            {categories.map((c) => (
              <div className="col-md-3 mb-3" key={c._id}>
                <Link
                  to={`/category/${c.slug}`}
                  className="btn btn-primary category-button"
                  style={{
                    backgroundColor: "#1890ff",
                    color: "#000000",
                    borderColor: "#1890ff",
                  }}
                >
                  {c.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default Categories;
