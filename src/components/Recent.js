import React, { useState, useEffect } from "react";
import axios from "axios";

import "../styles/recent.css";

import Post from "../components/Post";

const Recent = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/posts/category/top3")
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
          <button className="btn-primary large">More Recent Blogs</button>
        </div>
      </div>
    </section>
  );
};

export default Recent;
