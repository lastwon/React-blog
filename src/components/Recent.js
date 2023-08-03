import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../styles/recent.css";

import Post from "../components/Post";

const Recent = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://blog-m671.onrender.com/api/posts/category/top3")
      .then((response) => {
        setCategories(response.data);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="recent-posts">
      {categories.map(({ category, posts }) => (
        <div key={category} className="recent-post">
          <div className="container">
            <div className="section-title">
              <h2>{category}</h2>
            </div>
            <div className="row">
              <div className="post-items">
                {posts.map((post) => (
                  <Post key={post.id} post={post} />
                ))}
              </div>
              <div className="ad-container"></div>
            </div>
          </div>
        </div>
      ))}
      <div className="container">
        <div className="end-btn-container">
          <Link to={"/all_blogs"}>
            <button className="btn-primary large">More Recent Blogs</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Recent;
