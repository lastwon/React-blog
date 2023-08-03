import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../styles/nav.css";

import logo from "../images/logo.png";
import Profile from "./Profile";

const Nav = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [readMenu, setReadMenu] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleReadMenu = () => {
    setReadMenu(!readMenu);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setVisible(visible);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      setReadMenu(false);
      setOpen(false);
    };
  }, [prevScrollPos]);

  const getCategories = (data) => {
    const categories = data.map((post) => post.category);
    setUniqueCategories([...new Set(categories)]);
  };

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get(
          "https://blog-m671.onrender.com/api/posts/all"
        );
        getCategories(response.data.posts);
      } catch (error) {
        console.log("Error fetching all posts", error);
      }
    };

    fetchAllPosts();
  }, []);

  const navClass = `${visible ? "shadow" : "nav-hidden"} ${
    window.pageYOffset < 50 ? "no-shadow" : ""
  }`;

  return (
    <header className={navClass}>
      <div className="container">
        <div className="main-header-inner">
          <div className="menu-toggles">
            <button
              className={readMenu ? "active" : ""}
              onClick={handleReadMenu}
            >
              Read
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13.617"
                  height="7.914"
                  viewBox="0 0 13.617 7.914"
                >
                  <path
                    data-name="Path 125"
                    d="M298.862,492.725l-5.7-5.7,5.7-5.7-1.106-1.106-6.809,6.809,6.809,6.809Z"
                    transform="translate(-480.214 298.862) rotate(-90)"
                    fill="#040505"
                  ></path>
                </svg>
              </span>
            </button>
            {readMenu ? (
              <div className="read-menu">
                <h2 className="section-heading">Topics</h2>
                <ul>
                  {uniqueCategories.map((category) => (
                    <li key={category}>
                      <Link
                        onClick={() => setReadMenu(false)}
                        to={`/category/${category}`}
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="logo">
            <Link to={"/"}>
              <img className="logo-object" src={logo} alt="" />
            </Link>
          </div>
          <div className="login">
            {!isAuthenticated ? (
              <button onClick={() => loginWithRedirect()}>Log in</button>
            ) : (
              <>
                <img src={user.picture} alt="user logo" onClick={handleOpen} />
                {open ? <Profile /> : ""}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
