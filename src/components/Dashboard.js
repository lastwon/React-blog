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
import CategoryStats from "./CategoryStats";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [userPosts, setUserPosts] = useState([]);
  const [updatedPosts, setUpdatedPosts] = useState([]);
  const [acceptedPostsCount, setAcceptedPostsCount] = useState(0);
  const [inProgressPostsCount, setInProgressPostsCount] = useState(0);
  const [declinePostsCount, setDeclinedPostsCount] = useState(0);
  const [postViews, setPostViews] = useState(0);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect(); // Redirect to login page using loginWithRedirect
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/posts/user/${user?.nickname}`
        );
        setUserPosts(response.data);
      } catch (error) {
        console.error("Error fetching user posts", error);
      }
    };

    if (isAuthenticated) {
      fetchUserPosts();
      window.scrollTo(0, 0);
    }
  }, [user?.nickname, isAuthenticated, updatedPosts]);

  useEffect(() => {
    const fetchPostViews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/users/viewstotal/${user?.nickname}`
        );
        setPostViews(response.data.totalViews);
      } catch (error) {
        console.error("Error fetching blog views", error);
      }
    };

    if (isAuthenticated) {
      fetchPostViews();
    }
  }, []);

  useEffect(() => {
    const fetchAcceptedPostsCount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/posts/user/${user?.nickname}/accepted/count`
        );
        setAcceptedPostsCount(response.data.count);
      } catch (error) {
        console.error("Error fetching accepted posts count", error);
      }
    };

    if (isAuthenticated) {
      fetchAcceptedPostsCount();
    }
  }, [user?.nickname, isAuthenticated, updatedPosts]);

  useEffect(() => {
    const fetchInProgressPostsCount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/posts/user/${user?.nickname}/inprogress/count`
        );
        setInProgressPostsCount(response.data.count);
      } catch (error) {
        console.error("Error fetching in progress posts count", error);
      }
    };

    if (isAuthenticated) {
      fetchInProgressPostsCount();
    }
  }, [user?.nickname, isAuthenticated, updatedPosts]);

  useEffect(() => {
    const fetchInDeclinedPostsCount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/posts/user/${user?.nickname}/declined/count`
        );
        setDeclinedPostsCount(response.data.count);
      } catch (error) {
        console.error("Error fetching declined posts count", error);
      }
    };

    if (isAuthenticated) {
      fetchInDeclinedPostsCount();
    }
  }, [user?.nickname, isAuthenticated, updatedPosts]);

  useEffect(() => {
    return () => {
      setUserPosts([]);
      setUpdatedPosts([]);
      setAcceptedPostsCount(0);
      setInProgressPostsCount(0);
      setDeclinedPostsCount(0);
      setPostViews(0);
    };
  }, []);

  const cards = [
    {
      id: 1,
      title: "Accepted Blogs",
      icon: <BsCheckAll className="card-icon accept" />,
      value: `${acceptedPostsCount} / ${userPosts.length}`,
    },
    {
      id: 2,
      title: "In Progress",
      icon: <TbProgress className="card-icon progress" />,
      value: inProgressPostsCount,
    },
    {
      id: 3,
      title: "Declined Blogs",
      icon: <CiNoWaitingSign className="card-icon decline" />,
      value: declinePostsCount,
    },
    {
      id: 4,
      title: "Total Blog Views",
      icon: <BsLightningCharge className="card-icon views" />,
      value: postViews,
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state while Auth0 is checking authentication status
  }

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
                  <Link to={"/edit_profile"}>Change Description</Link>
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
                <MonthlyPostChart
                  userNickname={user?.nickname}
                  updatedPosts={updatedPosts}
                />
                <CategoryStats userPosts={userPosts} />
              </div>
              <div className="dashboard-recent-posts">
                <h3>Your Posts/Articles</h3>
                <p>Here's a list of your posts/articles!</p>
                <UserPost
                  userPosts={userPosts}
                  updatedPosts={updatedPosts}
                  setUpdatedPosts={setUpdatedPosts}
                />
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
