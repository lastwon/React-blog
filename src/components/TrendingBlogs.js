import React from "react";

import triangle from "../images/triangle.svg";
import FeaturedCard from "./FeaturedCard";

const TrendingBlogs = ({ post }) => {
  return (
    <div className="container">
      <div className="trend-heading">
        <div className="icon">
          <img src={triangle} alt="" />
        </div>
        <h2>Now Trending</h2>
      </div>
      <div className="trend-blogs">
        {post.map((trending) => {
          return <FeaturedCard key={trending.id} post={trending} />;
        })}
      </div>
    </div>
  );
};

export default TrendingBlogs;
