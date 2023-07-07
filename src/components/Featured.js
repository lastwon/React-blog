import React from "react";

import "../styles/featured.css";

const Featured = () => {
  return (
    <section className="featured-video">
      <div className="container">
        <div className="grid">
          <div className="row column">
            <div className="video-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26.136"
                height="32.837"
                viewBox="0 0 26.136 32.837"
              >
                <g data-name="Group 33" transform="translate(-96.678 -655.443)">
                  <path
                    data-name="Path 38"
                    d="M119.4,676.531,97.194,663.514l.462,25.571Z"
                    transform="translate(0 -1.662)"
                    fill="none"
                    stroke="#1a1818"
                    stroke-miterlimit="10"
                    stroke-width="1"
                  ></path>
                  <path
                    data-name="Path 39"
                    d="M123.65,668.864,101.9,656.309v25.109l21.745-12.555"
                    transform="translate(-1.087)"
                    fill="#1a1818"
                    stroke="#1a1818"
                    stroke-miterlimit="10"
                    stroke-width="1"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="video-heading">
              <h5>Featured video</h5>
            </div>
            <div className="video-title">
              <a href="">
                <h3>
                  DMTV Milkshake: Ceramicist Bob Dinetz on Finding the Beauty in
                  Chance
                </h3>
              </a>
            </div>
            <div className="video-description">
              <p>
                For this DMTV Milkshake, ceramicist Bob Dinetz shares how he
                combines modern shapes with an experimental approach to color
                and glaze + more.
              </p>
            </div>
            <div className="button">
              <a className="btn-primary" href="">
                Watch now
              </a>
            </div>
          </div>
          <div className="video-container">
            <figure className="video-embed">
              <iframe
                src="https://www.youtube.com/embed/c7QuPzJCn5M"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen=""
                width="560"
                height="315"
                frameborder="0"
              ></iframe>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
