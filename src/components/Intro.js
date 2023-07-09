import React, { useEffect, useState } from "react";
import FeaturedCard from "./FeaturedCard";
import axios from "axios";

import "../styles/intro.css";

const Intro = () => {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    // Fetch the recent posts when the component mounts
    fetchRecentPosts();
  }, []);

  const fetchRecentPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/posts/recent"
      );
      const { data } = response;
      setRecentPosts(data);
    } catch (error) {
      console.error("Error fetching recent posts", error);
    }
  };

  return (
    <section className="intro">
      <div className="container">
        <div className="section-title">
          <h2>Recent Posts</h2>
        </div>
        <div className="grid-system">
          {recentPosts.map((post) => (
            <FeaturedCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Intro;
