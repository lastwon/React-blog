import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import { RiSettings3Fill } from "react-icons/ri";
import { AiFillFileAdd } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiLogoutCircleRFill } from "react-icons/ri";

import "../styles/profile.css";

const Profile = () => {
  const { logout, isAuthenticated, user } = useAuth0();
  return (
    <div className="profile">
      <h3>{user.name}</h3>
      <ul>
        <li>
          <span>
            <RiSettings3Fill className="profile-icon" />
          </span>
          <Link to={"/edit_profile"}>Profile</Link>
        </li>
        <li>
          <span>
            <AiFillFileAdd className="profile-icon" />
          </span>
          <Link to={"/create_post"}>Create Post</Link>
        </li>
        {isAuthenticated && user.email === "admin@admin.com" ? (
          <li>
            <span>
              <MdAdminPanelSettings className="profile-icon" />
            </span>
            <Link to={"/"}>ADMIN Panel</Link>
          </li>
        ) : (
          ""
        )}
        <li>
          <span>
            <RiLogoutCircleRFill className="profile-icon" />
          </span>
          <button onClick={() => logout()}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
