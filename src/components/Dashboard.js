import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import "../styles/dashboard.css";

import { BsCheckAll } from "react-icons/bs";
import { TbProgress } from "react-icons/tb";
import { CiNoWaitingSign } from "react-icons/ci";
import { BsLightningCharge } from "react-icons/bs";

import Nav from "./Nav";
import Footer from "./Footer";
import DashboardStatsCard from "./DashboardStatsCard";
import UserPost from "./UserPost";
import MonthlyPostChart from "./MonthlyPostChart";

const Dashboard = () => {
  const { user } = useAuth0();
  const [userPosts, setUserPosts] = useState([]);
  const [acceptedPostsCount, setAcceptedPostsCount] = useState(0);
  const [inProgressPostsCount, setInProgressPostsCount] = useState(0);
  const [declinePostsCount, setDeclinedPostsCount] = useState(0);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/posts/user/${user.nickname}`
        );
        setUserPosts(response.data);
      } catch (error) {
        console.error("Error fetching user posts", error);
      }
    };

    fetchUserPosts();
  }, [user.nickname]);

  useEffect(() => {
    const fetchAcceptedPostsCount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/posts/user/${user.nickname}/accepted/count`
        );
        setAcceptedPostsCount(response.data.count);
      } catch (error) {
        console.error("Error fetching accepted posts count", error);
      }
    };

    fetchAcceptedPostsCount();
  }, [user.nickname]);

  useEffect(() => {
    const fetchInProgressPostsCount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/posts/user/${user.nickname}/inprogress/count`
        );
        setInProgressPostsCount(response.data.count);
      } catch (error) {
        console.error("Error fetching in progress posts count", error);
      }
    };

    fetchInProgressPostsCount();
  }, [user.nickname]);

  useEffect(() => {
    const fetchInDeclinedPostsCount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/posts/user/${user.nickname}/declined/count`
        );
        setDeclinedPostsCount(response.data.count);
      } catch (error) {
        console.error("Error fetching in progress posts count", error);
      }
    };

    fetchInDeclinedPostsCount();
  }, [user.nickname]);

  const cards = [
    {
      id: 1,
      title: "Accepted Posts",
      icon: <BsCheckAll className="card-icon" />,
      value: `${acceptedPostsCount} / ${userPosts.length}`,
    },
    {
      id: 2,
      title: "In Progress",
      icon: <TbProgress className="card-icon" />,
      value: inProgressPostsCount,
    },
    {
      id: 3,
      title: "Declined Posts",
      icon: <CiNoWaitingSign className="card-icon" />,
      value: declinePostsCount,
    },
    {
      id: 4,
      title: "Total Posts Views",
      icon: <BsLightningCharge className="card-icon" />,
      value: 1,
    },
  ];
  return (
    <>
      <Nav />
      <section className="dashboard">
        <div className="container">
          <div className="dashboard-container">
            <div className="dashboard-menu">
              <ul>
                <li>
                  <Link className="active" to={"/dashboard"}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to={"/create_post"}>Create Post</Link>
                </li>
                <li>
                  <Link to={"/dashboard"}>ADMIN Panel</Link>
                </li>
                <li>
                  <Link to={"/dashboard"}>Logout</Link>
                </li>
              </ul>
            </div>
            <div className="dashboard-content">
              <h2>Dashboard</h2>
              <div className="dashboard-sections">
                <button>Overview</button>
              </div>
              <div className="dashboard-stat-cards">
                {cards.map((card) => (
                  <DashboardStatsCard key={card.id} info={card} />
                ))}
              </div>
              <div className="dashboard-overview">
                <MonthlyPostChart userNickname={user.nickname} />
                <div className="dashboard-recent-posts">
                  <h3>Your Posts/Articles</h3>
                  <p>Here's a list of your posts/articles!</p>
                  <UserPost userPosts={userPosts} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Dashboard;
