import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "../styles/editProfile.css";

import Nav from "./Nav";
import Footer from "./Footer";

const EditProfile = () => {
  const { user } = useAuth0();
  return (
    <>
      <Nav />
      <section className="create-post-container">
        <div className="container">
          <h1>Edit profile</h1>
          <form className="row column center">
            <div className="row">
              <label htmlFor="email">Email address</label>
            </div>
            <input type="text" id="email" value={user.email} readOnly />

            <div className="row">
              <label htmlFor="description">About yourself (optional)</label>
            </div>
            <input
              type="text"
              id="description"
              placeholder="Display at the end of your post"
            />
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default EditProfile;
