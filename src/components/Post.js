import React from "react";

import seat from "../images/seat.jpg";

const Post = () => {
  return (
    <div className="post-item">
      <div className="post-thumbnail-container">
        <a href="">
          <img src={seat} alt="seat" />
        </a>
      </div>
      <div className="post-details-container">
        <div className="badge-row-two">
          <a href="">Home Furnishings</a>
        </div>
        <a href="">
          <h4>Twiggy's Modular, Unexpected Seating Can Take Many Forms</h4>
        </a>
        <a href="">
          <p>
            Designed by Rodolfo Dordoni for Minotti, the individual elements of
            Twiggy's modular seating are fluid + flexible, free from models +
            configurations to fit your lifestyle.
          </p>
        </a>
      </div>
    </div>
  );
};

export default Post;
