import React, { useState, useEffect } from "react";
import axios from "axios";

import Nav from "./Nav";
import Footer from "./Footer";
import Post from "./Post";

const PAGE_SIZE = 10;

const AllBlogs = () => {
  const [post, setPost] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get(
          `https://blog-m671.onrender.com/api/posts/all?page=${page}&limit=${PAGE_SIZE}`
        );
        setPost(response.data.posts);
        setTotalPosts(response.data.totalCount);
      } catch (error) {
        console.log("Error fetching all posts", error);
      }
    };

    fetchAllPosts();
    window.scrollTo(0, 0);
  }, [page]);

  const totalPages = Math.ceil(totalPosts / PAGE_SIZE);

  return (
    <>
      <Nav />
      <div className="category-section">
        <div className="container">
          <h1 className="center">All Blogs</h1>
          <div className="row">
            <div className="post-items">
              {post.map((currentPost) => (
                <Post key={currentPost.id} post={currentPost} />
              ))}
              <div className="pagination">
                <button
                  className="btn-primary"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <button
                  className="btn-primary"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
            <div className="ad-container"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllBlogs;
