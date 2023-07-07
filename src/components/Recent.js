import React from "react";

import "../styles/recent.css";

import Post from "../components/Post";

const Recent = () => {
  return (
    <section className="recent-posts">
      <div className="container">
        <div className="section-title">
          <h2>Recent Posts</h2>
        </div>
        <div className="row">
          <div className="post-items">
            <Post />
            <Post />
            <Post />
          </div>
          <div className="ad-container"></div>
        </div>
      </div>
    </section>
  );
};

export default Recent;
