import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

import "../styles/currentPost.css";

import Nav from "./Nav";
import Footer from "./Footer";
import TrendingBlogs from "./TrendingBlogs";

const CurrentPost = () => {
  const [post, setPost] = useState(null);
  const [description, setDescription] = useState("");
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [postViews, setPostViews] = useState(0);
  const params = useParams();
  const { user } = useAuth0();

  useEffect(() => {
    // Fetch the post information when the component mounts
    fetchPost();
    window.scrollTo(0, 0);
  }, [params.postId]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `https://blog-m671.onrender.com/api/posts/${params.postId}`
      );
      const { data } = response;
      setPost(data);

      // Once we have the post data, fetch the user profile information
      fetchUserProfile(data.user);
    } catch (error) {
      console.error("Error fetching post", error);
    }
  };

  const fetchUserProfile = async (username) => {
    try {
      const response = await axios.get(
        `https://blog-m671.onrender.com/api/users/${username}`
      );
      setDescription(response.data.description || "");
    } catch (error) {
      console.error("Error fetching user profile", error);
    }
  };

  useEffect(() => {
    fetchPostViews();
  }, [params.postId]);

  const fetchPostViews = async () => {
    try {
      const response = await axios.put(
        `https://blog-m671.onrender.com/api/posts/views/${params.postId}`
      );
      setPostViews(response.views);
    } catch (error) {
      console.error("Error updating post views", error);
    }
  };

  useEffect(() => {
    fetchTrendingPosts(params.postId);
  }, [params.postId]);

  const fetchTrendingPosts = async (currentPostId) => {
    try {
      const response = await axios.get(
        `https://blog-m671.onrender.com/api/posts/trending`,
        {
          params: {
            postId: currentPostId,
          },
        }
      );
      setTrendingPosts(response.data);
    } catch (error) {
      console.error("Error fetching trending posts", error);
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
            {post.decline_note ? (
              <div className="decline_note">
                <b>
                  <i>Note:</i>
                </b>{" "}
                {post.decline_note}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="image-container">
            <img src={post.imageUrl} alt={post.title} />
          </div>
          <div className="current-post-content">
            <p>{post.body}</p>
          </div>
          <div className="author-box">
            <div className="current-post-author-info">
              <h3>{post.user}</h3>
              <p>{description}</p>
            </div>
          </div>
          <div className="line-container">
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
          </div>
        </div>
      </section>
      <div className="trending-blogs">
        <TrendingBlogs post={trendingPosts} />
      </div>
      <Footer />
    </>
  );
};

export default CurrentPost;
