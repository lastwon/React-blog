import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import { ToastContainer, Slide } from "react-toastify";
import { showSuccessToast, showErrorToast } from "./toastUtils";

const UserPost = ({ userPosts, updatedPosts, setUpdatedPosts }) => {
  const { user } = useAuth0();
  const [declineNote, setDeclineNote] = useState("");
  const [showDeclineForm, setShowDeclineForm] = useState({});

  const getYear = (dateString) => {
    const createdAt = new Date(dateString);
    const year = createdAt.getFullYear();
    const month = String(createdAt.getMonth() + 1).padStart(2, "0");
    const day = String(createdAt.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getStatusClass = (status) => {
    if (status === "In Progress") {
      return "pending";
    } else if (status === "Accepted") {
      return "accepted";
    } else if (status === "Declined") {
      return "declined";
    }
    return "";
  };

  const handleNoteChange = (e) => {
    setDeclineNote(e.target.value);
  };

  const renderDeclineForm = (postId) => {
    if (showDeclineForm[postId]) {
      return (
        <div className="backdrop">
          <div className="decline-note-popup">
            <textarea
              placeholder="Add a note for declining this blog..."
              value={declineNote}
              onChange={handleNoteChange}
            />

            <div className="buttons">
              <button
                className="btn-cancel"
                onClick={() => setShowDeclineForm(false)}
              >
                Cancel
              </button>

              <button
                className="btn-primary"
                onClick={() => handleDecline(postId)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  const handleAccept = async (postId) => {
    try {
      // Make an API call to update the post status to "Accepted"
      await axios.put(
        `https://blog-m671.onrender.com/api/posts/${postId}/accept`
      );
      // Update the updatedPosts state to reflect the change
      setUpdatedPosts([...updatedPosts, postId]);
      showSuccessToast("Post accepted successfully");
    } catch (error) {
      console.error("Error accepting post", error);
      showErrorToast("Error accepting post");
    }
  };

  const handleDecline = async (postId) => {
    try {
      // Make an API call to update the post status to "Declined" and include the decline note
      await axios.put(
        `https://blog-m671.onrender.com/api/posts/${postId}/decline`,
        {
          note: declineNote,
        }
      );
      // Update the updatedPosts state to reflect the change
      setUpdatedPosts([...updatedPosts, postId]);
      showSuccessToast("Post declined successfully");
      // Close the decline form
      setShowDeclineForm((prevState) => ({ ...prevState, [postId]: false }));
    } catch (error) {
      console.error("Error declining post", error);
      showErrorToast("Error declining post");
    }
  };

  return (
    <div>
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
              <td>
                {post.title.length > 55
                  ? `${post.title.slice(0, 55)}...`
                  : post.title}
              </td>
              <td>
                <div className="dashboard-category">{post.category}</div>
              </td>
              <td>
                <div className={getStatusClass(post.status)}>{post.status}</div>
              </td>
              <td>{getYear(post.createdAt)}</td>
              <td>
                {renderDeclineForm(post.id)}
                {user.email === "admin@admin.com" &&
                post.status === "In Progress" ? (
                  <>
                    <button
                      className="btn-accept"
                      onClick={() => handleAccept(post.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn-decline"
                      onClick={() =>
                        setShowDeclineForm((prevState) => ({
                          ...prevState,
                          [post.id]: true,
                        }))
                      }
                    >
                      Decline
                    </button>
                  </>
                ) : (
                  ""
                )}
                <Link to={`/${post.id}`}>
                  <button className="btn-review">Review</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPost;
