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
        <Route path="/create_post" element={<CreatePost />} />
        <Route path="/:postId" element={<CurrentPost />} />
      </Routes>
    </Router>
  );
}

export default App;
