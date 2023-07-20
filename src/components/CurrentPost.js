import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "../styles/currentPost.css";

import Nav from "./Nav";
import Footer from "./Footer";

const CurrentPost = () => {
  const [post, setPost] = useState(null);
  const params = useParams();

  useEffect(() => {
    // Fetch the post information when the component mounts
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/posts/${params.postId}`
      );
      const { data } = response;
      setPost(data);
    } catch (error) {
      console.error("Error fetching post", error);
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  const createdAt = post.createdAt;
  const formattedDate = new Date(createdAt).toISOString().substring(0, 10);

  return (
    <>
      <Nav />
      <section className="current-post">
        <div className="container">
          <div className="current-post-intro center">
            <div className="badge-row-two center">
              <a href="">{post.category}</a>
            </div>
            <h1>{post.title}</h1>
            <div className="decorative-line">
              <div className="decorative-line-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16.395"
                  height="20.284"
                  viewBox="0 0 16.395 20.284"
                >
                  <g
                    data-name="Group 197"
                    transform="translate(-689.803 -586.663)"
                  >
                    <rect
                      data-name="Rectangle 362"
                      width="7"
                      height="13"
                      transform="translate(692.403 591.991) rotate(-21)"
                      fill="#fff"
                    ></rect>
                    <rect
                      data-name="Rectangle 198"
                      width="0.999"
                      height="19.965"
                      transform="translate(690.449 587.668) rotate(-21.05)"
                      stroke="#000"
                      stroke-width="1"
                    ></rect>
                    <rect
                      data-name="Rectangle 199"
                      width="0.999"
                      height="19.965"
                      transform="translate(697.448 587.668) rotate(-21.05)"
                      stroke="#000"
                      stroke-width="1"
                    ></rect>
                  </g>
                </svg>
              </div>
            </div>
            <div className="current-post-dateAndAuthor">
              {formattedDate}
              <span className="divider"> | </span>
              By {post.user}
            </div>
          </div>
          <div className="image-container">
            <img src={post.imageUrl} alt={post.title} />
          </div>
          <div className="current-post-content">
            <p>{post.body}</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CurrentPost;
