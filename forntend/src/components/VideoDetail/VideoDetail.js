import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import "./VideoDetail.css"; // Import CSS for styling

function VideoDetail() {
  const [video, setVideo] = useState(null);
  const { id } = useParams(); // Get the video id from the URL
  const navigate = useNavigate(); // For navigating to the VideoPlayer page

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

  // Handle navigation to the video player page
  const handleVideoClick = () => {
    navigate(`/video-player/${id}`); // Navigate to VideoPlayer page with video id
  };

  return (
    <div className="video-detail">
      {video ? (
        <>
          <h2>{video.title}</h2>
          <p>{video.description}</p>
          <p><strong>Tags:</strong> {video.tags}</p>
          <p><strong>Duration:</strong> {video.duration} seconds</p>
          <p><strong>File Size:</strong> {video.file_size} bytes</p>
          <p><strong>Uploaded At:</strong> {video.uploaded_at}</p>

          {/* Button to navigate to the video player */}
          <div className="video-thumbnail">
            <button className="watch-button" onClick={handleVideoClick}>
              Click to watch the video
            </button>
          </div>
        </>
      ) : (
        <p>Loading video details...</p> 
      )}
    </div>
  );
}

export default VideoDetail;
