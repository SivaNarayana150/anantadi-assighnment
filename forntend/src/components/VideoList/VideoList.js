import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./VideoList.css";
import { FaTrash } from 'react-icons/fa'; // Correct import for trash icon

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch videos based on the title input
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/videos", {
          params: { title }, // Use the title from the state to filter the videos
        });
        setVideos(response.data); // Set the fetched videos to the state
      } catch (error) {
        console.error("Error fetching videos", error); // Handle any errors
      }
    };

    fetchVideos(); // Call the fetchVideos function whenever the title changes
  }, [title]); // Dependency on the title input

  // Delete video handler
  const deleteVideo = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/videos/${id}`, {
        data: { id }, // Send the video ID in the body of the DELETE request
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Remove the deleted video from the state to update the UI
      setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
    } catch (error) {
      console.error("Error deleting video", error); // Handle any errors
    }
  };

  return (
    <div className="video-list">
      {/* Button to navigate to the Upload Video page at the top */}
      <Link to="/upload-video">
        <button className="upload-button">Upload Video</button>
      </Link>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Update the title state
        placeholder="Search by title"
        className="search-bar"
      />
      
      <div className="video-cards">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video.id} className="video-card">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <Link to={`/video/${video.id}`} className="video-link">
                View Details
              </Link>
           
              <button
                className="delete-button"
                onClick={() => deleteVideo(video.id)}
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p className="no-videos-message">No videos found</p>
        )}
      </div>
    </div>
  );
}

export default VideoList;
