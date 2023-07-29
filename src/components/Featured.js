import React, { useEffect, useState } from "react";
import axios from "axios";

import "../styles/featured.css";

const Featured = () => {
  const [featuredVideo, setFeaturedVideo] = useState([]);

  useEffect(() => {
    const fetchFeaturedVideo = async () => {
      const response = await axios.get("http://localhost:8081/api/featured");
      setFeaturedVideo(response.data);
    };

    fetchFeaturedVideo();
  }, []);

  return (
    <section className="featured-video">
      <div className="container">
        {featuredVideo.map((video) => (
          <div className="grid" key={video.title}>
            <div className="row column">
              <div className="video-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26.136"
                  height="32.837"
                  viewBox="0 0 26.136 32.837"
                >
                  <g
                    data-name="Group 33"
                    transform="translate(-96.678 -655.443)"
                  >
                    <path
                      data-name="Path 38"
                      d="M119.4,676.531,97.194,663.514l.462,25.571Z"
                      transform="translate(0 -1.662)"
                      fill="none"
                      stroke="#1a1818"
                      strokeMiterlimit="10"
                      strokeWidth="1"
                    ></path>
                    <path
                      data-name="Path 39"
                      d="M123.65,668.864,101.9,656.309v25.109l21.745-12.555"
                      transform="translate(-1.087)"
                      fill="#1a1818"
                      stroke="#1a1818"
                      strokeMiterlimit="10"
                      strokeWidth="1"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="video-heading">
                <h5>Featured video</h5>
              </div>
              <div className="video-title">
                <a href="">
                  <h3>{video.title}</h3>
                </a>
              </div>
              <div className="video-description">
                <p>{video.description}</p>
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
                  src={video.link}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen=""
                  width="560"
                  height="315"
                  frameBorder="0"
                ></iframe>
              </figure>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featured;
