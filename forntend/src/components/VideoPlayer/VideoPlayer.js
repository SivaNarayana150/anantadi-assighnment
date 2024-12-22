import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate for navigation
import ReactPlayer from "react-player";
import axios from "axios";
import "./VideoPlayer.css";

function VideoPlayer() {
  const { id } = useParams(); // Get the video id from the URL
  const [video, setVideo] = useState(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/videos/${id}`);
        setVideo(response.data); // Set the video details to the state
      } catch (error) {
        console.error("Error fetching video details", error);
      }
    };

    fetchVideoDetails();
  }, [id]); // Fetch video details when the id changes

  return (
    <div className="video-player-container">
      <button
        className="home-button"
        onClick={() => navigate("/videos")} // Navigate to /videos
      >
        🏠 Home
      </button>
      {video ? (
        <>
          <h2>{video.title}</h2>
          <ReactPlayer url={video.video_link} controls={true} />
        </>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
}

export default VideoPlayer;
