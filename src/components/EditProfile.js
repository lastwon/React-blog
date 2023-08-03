import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { ToastContainer, Slide } from "react-toastify";
import { showSuccessToast, showErrorToast } from "./toastUtils";

import "../styles/editProfile.css";

import Nav from "./Nav";
import Footer from "./Footer";

const EditProfile = () => {
  const { user } = useAuth0();
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Fetch user profile information from the server
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `https://blog-m671.onrender.com/api/users/${user.nickname}`
        );
        setDescription(response.data.description || "");
      } catch (error) {
        console.error("Error fetching user profile", error);
        showErrorToast("Error fetching description");
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Save or update the user's description in the server
    try {
      await axios.post(
        `https://blog-m671.onrender.com/api/users/create-update/${user.nickname}`,
        {
          description,
        }
      );
      showSuccessToast("Description saved successfully");
    } catch (error) {
      console.error("Error saving user profile", error);
      showErrorToast("Error saving description");
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
          <h1>Change Description</h1>
          <form className="row column center" onSubmit={handleSubmit}>
            <div className="row">
              <label htmlFor="description">About yourself (optional)</label>
            </div>
            <input
              type="text"
              id="description"
              placeholder="Display at the end of your each post"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export default EditProfile;
