import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "../styles/categoryPage.css";

import Nav from "./Nav";
import Footer from "./Footer";
import Post from "./Post";

const CategoryPage = () => {
  const params = useParams();
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fecthCategoryPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/posts/categories/${params.categoryName}`
        );
        setPost(response.data);
      } catch (error) {
        console.log("Error fetching category posts", error);
      }
    };

    fecthCategoryPosts();
  }, [params.categoryName]);

  return (
    <>
      <Nav />
      <div className="category-section">
        <div className="container">
          <h1 className="center">{params.categoryName}</h1>
          <div className="row">
            <div className="post-items">
              {post.map((categoryPost) => (
                <Post key={categoryPost.id} post={categoryPost} />
              ))}
            </div>
            <div className="ad-container"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
