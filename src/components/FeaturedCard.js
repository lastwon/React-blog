import React from "react";

import seat from "../images/seat.jpg";

const FeaturedCard = () => {
  return (
    <div className="list-item-featured">
      <div className="post-thumbnail-container">
        <div className="badge-row">
          <a href="">Home Furnishings</a>
        </div>
        <a href="">
          <img src={seat} alt="img" />
        </a>
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
  );
};

export default FeaturedCard;
