import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VideoList from "./components/VideoList/VideoList";
import VideoDetail from "./components/VideoDetail/VideoDetail";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer"; // Import VideoPlayer component
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import VideoUpload from "./components/VideoUpload/VideoUpload";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/videos" element={<VideoList />} />
          <Route path="/video/:id" element={<VideoDetail />} /> {/* This route is for VideoDetail */}
          <Route path="/video-player/:id" element={<VideoPlayer />} /> {/* This route is for VideoPlayer */}
          <Route path="/upload-video" element={<VideoUpload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
