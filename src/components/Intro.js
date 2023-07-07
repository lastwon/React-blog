import React from "react";
import FeaturedCard from "./FeaturedCard";

import "../styles/intro.css";

const Intro = () => {
  return (
    <section className="intro">
      <div className="container">
        <div className="grid-system">
          <FeaturedCard />
          <FeaturedCard />
          <FeaturedCard />
          <FeaturedCard />
          <FeaturedCard />
        </div>
      </div>
    </section>
  );
};

export default Intro;
