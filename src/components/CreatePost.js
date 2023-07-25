import React, { useEffect, useState } from "react";
import { ToastContainer, Slide } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { showSuccessToast, showErrorToast } from "./toastUtils";

import "../styles/createpost.css";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.minimal.css";

import Nav from "./Nav";
import Footer from "./Footer";

const CreatePost = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleEditorChange = (e) => {
    setBody(e.target.value);
  };

  const validateForm = () => {
    const errors = {};

    if (!title.trim()) {
      errors.title = "Title is required";
    }

    if (!intro.trim()) {
      errors.intro = "Short introduction is required";
    }

    if (!body.trim()) {
      errors.body = "Post content is required";
    }

    if (!category) {
      errors.category = "Category is required";
    }

    if (!image) {
      errors.image = "Image is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("intro", intro);
        formData.append("body", body);
        formData.append("category", category);
        formData.append("image", image);
        formData.append("user", user.nickname);

        await axios.post("http://localhost:8081/api/posts", formData);

        console.log("Post created successfully");
        setTitle("");
        setIntro("");
        setBody("");
        setCategory("");
        setImage(null);
        showSuccessToast("Post created successfully");
      } catch (error) {
        console.error("Error creating post", error);
        showErrorToast("Error creating post");
      }
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

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
      <div className="create-post-container">
        <div className="container">
          <h1>Create a post</h1>
          <form
            className="row column center"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="row">
              <label htmlFor="title">Title</label>
              {errors.title && <p className="error">{errors.title}</p>}
            </div>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <div className="row">
              <label htmlFor="title">Short introduction about post</label>
              {errors.intro && <p className="error">{errors.intro}</p>}
            </div>
            <input
              type="text"
              id="intro"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              required
            />

            <div className="row">
              <label htmlFor="body">Post</label>
              {errors.body && <p className="error">{errors.body}</p>}
            </div>
            <textarea
              id="body"
              value={body}
              onChange={handleEditorChange}
              required
            />

            <div className="row">
              <label htmlFor="category">Select Category</label>
              {errors.category && <p className="error">{errors.category}</p>}
            </div>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="Architecture">Architecture</option>
              <option value="Art">Art</option>
              <option value="Commercial">Commercial</option>
              <option value="Featured">Featured</option>
              <option value="Home">Home Furnishings</option>
              <option value="Interior">Interior Design</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Pets">Pets</option>
              <option value="Fashion">Style + Fashion</option>
              <option value="Tech">Technology</option>
              <option value="Travel">Travel</option>
            </select>

            <div className="row">
              <label className="row post-img" htmlFor="image">
                Image
              </label>
              {errors.image && <p className="error">{errors.image}</p>}
            </div>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />

            <button className="btn-primary" type="submit">
              Create Post
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreatePost;
