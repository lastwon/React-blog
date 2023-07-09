import React from "react";

const FeaturedCard = ({ post }) => {
  const { title, intro, category, imageUrl } = post;
  return (
    <div className="list-item-featured">
      <div className="post-thumbnail-container">
        <div className="badge-row">
          <a href="">{category}</a>
        </div>
        <a href="">
          <img src={imageUrl} alt="img" />
        </a>
      </div>
      <a href="">
        <h4>{title}</h4>
      </a>
      <a href="">
        <p>{intro}</p>
      </a>
    </div>
  );
};

export default FeaturedCard;
