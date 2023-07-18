import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const UserPost = ({ userPosts }) => {
  const { user } = useAuth0();

  const getYear = (dateString) => {
    const createdAt = new Date(dateString);
    const year = createdAt.getFullYear();
    const month = String(createdAt.getMonth() + 1).padStart(2, "0");
    const day = String(createdAt.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userPosts.map((post) => (
            <tr key={post.id}>
              <td className="dashboard-post-img-container">
                <img src={post.imageUrl} alt="img" />
              </td>
              <td>{post.title}</td>
              <td>{post.category}</td>
              <td>Pending...</td>
              <td>{getYear(post.createdAt)}</td>
              <td>
                <button>Accept</button>
                <button>Decline</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPost;
