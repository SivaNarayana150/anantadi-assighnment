import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./VideoUpload.css";

function VideoUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [duration, setDuration] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const uploadedAt = new Date().toISOString();

    const videoData = {
      title,
      description,
      tags,
      duration,
      uploaded_at: uploadedAt,
      video_link: videoLink,
    };

    try {
      // Posting the video data to the backend
      await axios.post("http://localhost:3001/videos", videoData, {
        headers: { "Content-Type": "application/json" },
      });

      setLoading(false);
      setUploadSuccess(true);
      navigate("/videos");  // Correctly redirecting to /videos path after upload
    } catch (error) {
      setLoading(false);
      console.error("Error uploading video", error);
      alert("Failed to upload video. Please try again.");
    }
  };

  return (
    <div className="video-upload">
      <h2>Upload a Video</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input-field"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="textarea"
        />
        <input
          type="text"
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="number"
          placeholder="Duration (in seconds)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="text"
          placeholder="Paste the link here"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          required
          className="input-field"
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {uploadSuccess && <p className="success-message">Video uploaded successfully!</p>}
    </div>
  );
}

export default VideoUpload;
