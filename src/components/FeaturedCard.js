import React from "react";
import { Link } from "react-router-dom";

const FeaturedCard = ({ post }) => {
  const { id, title, intro, category, imageUrl } = post;
  return (
    <div className="list-item-featured">
      <div className="post-thumbnail-container">
        <div className="badge-row">
          <a href="">{category}</a>
        </div>
        <Link to={`/${id}`}>
          <img src={imageUrl} alt="img" />
        </Link>
      </div>
      <Link to={`/${id}`}>
        <h4>{title}</h4>
      </Link>
      <Link to={`/${id}`}>
        <p>{intro}</p>
      </Link>
    </div>
  );
};

export default FeaturedCard;
