import React, { useState } from "react";
import axios from "axios";
import "../styles/createpost.css";
import Nav from "./Nav";
import Footer from "./Footer";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validateForm = () => {
    const errors = {};

    if (!title.trim()) {
      errors.title = "Title is required";
    }

    if (!body.trim()) {
      errors.body = "Post content is required";
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
        formData.append("body", body);
        formData.append("image", image);

        await axios.post("http://localhost:8081/api/posts", formData);

        console.log("Post created successfully");
        setTitle("");
        setBody("");
        setImage(null);
      } catch (error) {
        console.error("Error creating post", error);
        // Handle any error cases
      }
    }
  };

  return (
    <>
      <Nav />
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
              <label htmlFor="body">Post</label>
              {errors.body && <p className="error">{errors.body}</p>}
            </div>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
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
