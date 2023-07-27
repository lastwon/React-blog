import React from "react";

import "../styles/community.css";

import community1 from "../images/community1.jpg";
import community2 from "../images/community2.jpg";
import community3 from "../images/community3.jpg";
import community4 from "../images/community4.jpg";
import community5 from "../images/community5.jpg";

import instagram from "../images/insta.svg";
import facebook from "../images/fb.svg";
import pinterest from "../images/pinterest.svg";
import youtube from "../images/yt.svg";
import twitter from "../images/twitter.svg";
import tiktok from "../images/tiktok.svg";

const Community = () => {
  return (
    <section className="community">
      <div className="container">
        <div className="row column center">
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33.321"
              height="33.72"
              viewBox="0 0 33.321 33.72"
            >
              <g data-name="Group 36" transform="translate(-160.248 -652.429)">
                <g data-name="Group 19">
                  <path
                    data-name="Path 26"
                    d="M189.363,674.178H178.678v11.471h-7.245V674.178H160.748v-6.761h10.685V656.309h7.245v11.108h10.685Z"
                    fill="#fff"
                    stroke="#1a1818"
                    strokeMiterlimit="10"
                    strokeWidth="1"
                  ></path>
                </g>
                <g data-name="Group 20">
                  <path
                    data-name="Path 27"
                    d="M193.069,670.8H182.384v11.471H175.14V670.8H164.454v-6.761H175.14V652.929h7.244v11.108h10.685Z"
                    fill="#1a1818"
                    stroke="#1a1818"
                    strokeMiterlimit="10"
                    strokeWidth="1"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
          <h2>Join Our Community</h2>
          <p>For more blogs follow us on all the socials!</p>
          <div className="socials">
            <ul className="row">
              <li>
                <a
                  target="_blank"
                  rel="noopener"
                  href="https://www.instagram.com/"
                >
                  <img src={instagram} alt="instagram" />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener"
                  href="https://www.facebook.com/"
                >
                  <img src={facebook} alt="facebook" />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener"
                  href="https://www.pinterest.com/"
                >
                  <img src={pinterest} alt="pinterest" />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener"
                  href="https://www.youtube.com/"
                >
                  <img src={youtube} alt="youtube" />
                </a>
              </li>
              <li>
                <a target="_blank" rel="noopener" href="https://twitter.com/">
                  <img src={twitter} alt="twitter" />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener"
                  href="https://www.tiktok.com/"
                >
                  <img src={tiktok} alt="tik-tok" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-img">
          <div>
            <img src={community1} alt="community1" id="img1" />
          </div>
          <div className="row column">
            <img src={community2} alt="community2" id="img2" />
            <img src={community3} alt="community3" id="img3" />
          </div>
          <div className="row column">
            <img src={community4} alt="community4" id="img4" />
            <img src={community5} alt="community5" id="img5" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
