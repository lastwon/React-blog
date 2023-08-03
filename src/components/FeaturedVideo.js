import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { ToastContainer, Slide } from "react-toastify";
import { showSuccessToast, showErrorToast } from "./toastUtils";

import "../styles/editProfile.css";

import Nav from "./Nav";
import Footer from "./Footer";

const FeaturedVideo = () => {
  const { user } = useAuth0();
  const [featuredVideo, setFeaturedVideo] = useState({
    title: "",
    description: "",
    link: "",
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the data to your server's API endpoint
    try {
      const response = await axios.put(
        "https://blog-m671.onrender.com/api/featured/update",
        featuredVideo
      );
      showSuccessToast("Featured video updated successfully!");
    } catch (error) {
      showErrorToast("Failed to update featured video.");
    }
  };

  return (
    <>
      <Nav />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        theme="dark"
      />
      <section className="create-post-container">
        <div className="container">
          <h1>Change Featured Video</h1>
          <form className="row column center" onSubmit={handleSubmit}>
            <div className="row">
              <label htmlFor="title">Title</label>
            </div>
            <input
              type="text"
              id="title"
              placeholder="Featured video title"
              value={featuredVideo.title}
              onChange={(e) =>
                setFeaturedVideo({ ...featuredVideo, title: e.target.value })
              }
            />
            <div className="row">
              <label htmlFor="description">Description</label>
            </div>
            <input
              type="text"
              id="description"
              placeholder="Short description about video"
              value={featuredVideo.description}
              onChange={(e) =>
                setFeaturedVideo({
                  ...featuredVideo,
                  description: e.target.value,
                })
              }
            />
            <div className="row">
              <label htmlFor="link">Link</label>
            </div>
            <input
              type="text"
              id="link"
              placeholder="Video link embed (youtube recommended) e.g. https://www.youtube.com/embed/IoZri9hq7z4"
              value={featuredVideo.link}
              onChange={(e) =>
                setFeaturedVideo({ ...featuredVideo, link: e.target.value })
              }
            />
            <button className="btn-primary" type="submit">
              Save
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default FeaturedVideo;
