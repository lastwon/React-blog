import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/index.css";

import Nav from "./components/Nav";
import Intro from "./components/Intro";
import Recent from "./components/Recent";
import Featured from "./components/Featured";
import Community from "./components/Community";
import Footer from "./components/Footer";
import CreatePost from "./components/CreatePost";
import CurrentPost from "./components/CurrentPost";
import EditProfile from "./components/EditProfile";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav />
              <Intro />
              <Recent />
              <Featured />
              <Community />
              <Footer />
            </>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create_post" element={<CreatePost />} />
        <Route path="/:postId" element={<CurrentPost />} />
        <Route path="/edit_profile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
