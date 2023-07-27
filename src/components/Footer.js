import React from "react";

import "../styles/footer.css";

import Form from "./Form";

import instagram from "../images/insta.svg";
import facebook from "../images/fb.svg";
import pinterest from "../images/pinterest.svg";
import youtube from "../images/yt.svg";
import twitter from "../images/twitter.svg";
import tiktok from "../images/tiktok.svg";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="row column footer-left">
            <div className="footer-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="33.322"
                height="33.72"
                viewBox="0 0 33.322 33.72"
              >
                <path
                  data-name="Path 48"
                  d="M275.5,725.4H264.818v11.471h-7.244V725.4H246.888v-6.761h10.686V707.531h7.244v11.108H275.5Z"
                  transform="translate(-246.388 -703.651)"
                  fill="none"
                  stroke="#fff"
                  strokeMiterlimit="10"
                  strokeWidth="1"
                ></path>
                <path
                  data-name="Path 49"
                  d="M279.21,722.02H268.524v11.471H261.28V722.02H250.594v-6.761H261.28V704.151h7.244v11.108H279.21Z"
                  transform="translate(-246.388 -703.651)"
                  fill="#fff"
                  stroke="#fff"
                  strokeMiterlimit="10"
                  strokeWidth="1"
                ></path>
              </svg>
            </div>
            <div className="footer-newsletter">
              <span>Modernize Your Life</span>
              <h2>Get in the Know</h2>
              <div className="footer-newsletter-text">
                <p>
                  You'll always hear it from Expresso first. Our passion is
                  discovering and highlighting emerging talent, and we're
                  energized by and for our community of like-minded design
                  lovers — like you!
                </p>
              </div>
              <div className="newsletter-form">
                <div className="form">
                  <Form />
                </div>
                <button className="btn-sign-up">Sign up</button>
              </div>
            </div>
          </div>
          <div className="row column footer-right">
            <div className="row footer-socials">
              <div className="footer-about">
                <h4>About Expresso</h4>
                <ul>
                  <li>
                    <a href="">About Us</a>
                  </li>
                  <li>
                    <a href="">Our Mission</a>
                  </li>
                </ul>
              </div>
              <div className="footer-contact">
                <h4>Contact us</h4>
                <ul>
                  <li>
                    <a href="">Advertise</a>
                  </li>
                  <li>
                    <a href="">Editorial Submissions</a>
                  </li>
                  <li>
                    <a href="">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="socials">
              <ul
                className="row"
                style={{ justifyContent: "flex-start", marginBottom: "0" }}
              >
                <li>
                  <a
                    target="_blank"
                    rel="noopener"
                    href="https://www.instagram.com/"
                  >
                    <img
                      src={instagram}
                      alt="instagram"
                      style={{ filter: "invert(100%)" }}
                    />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener"
                    href="https://www.facebook.com/"
                  >
                    <img
                      src={facebook}
                      alt="facebook"
                      style={{ filter: "invert(100%)" }}
                    />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener"
                    href="https://www.pinterest.com/"
                  >
                    <img
                      src={pinterest}
                      alt="pinterest"
                      style={{ filter: "invert(100%)" }}
                    />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener"
                    href="https://www.youtube.com/"
                  >
                    <img
                      src={youtube}
                      alt="youtube"
                      style={{ filter: "invert(100%)" }}
                    />
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noopener" href="https://twitter.com/">
                    <img
                      src={twitter}
                      alt="twitter"
                      style={{ filter: "invert(100%)" }}
                    />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener"
                    href="https://www.tiktok.com/"
                  >
                    <img
                      src={tiktok}
                      alt="tik-tok"
                      style={{ filter: "invert(100%)" }}
                    />
                  </a>
                </li>
              </ul>
            </div>
            <hr />
            <div className="footer-copyright">
              <p>
                Photo copyright retained by photo owners, everything else ©{" "}
                {new Date().getFullYear()} Expresso®.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
