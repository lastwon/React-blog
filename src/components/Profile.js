import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import { MdSpaceDashboard } from "react-icons/md";
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
            <MdSpaceDashboard className="profile-icon" />
          </span>
          <Link to={"/dashboard"}>Dashboard</Link>
        </li>
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
