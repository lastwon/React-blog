import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <div className="post-item">
      <div className="post-thumbnail-container">
        <Link to={`/${post.id}`}>
          <img src={post.imageUrl} alt="seat" />
        </Link>
      </div>
      <div className="post-details-container">
        <div className="badge-row-two">
          <Link to={`/${post.id}`}>{post.category}</Link>
        </div>
        <Link to={`/${post.id}`}>
          <h4>{post.title}</h4>
        </Link>
        <Link to={`/${post.id}`}>
          <p>{post.intro}</p>
        </Link>
      </div>
    </div>
  );
};

export default Post;
