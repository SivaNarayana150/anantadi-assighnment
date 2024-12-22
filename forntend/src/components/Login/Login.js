import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      if (response.status === 200) {
        navigate("/videos"); // Navigate to videos page after successful login
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Logo_TV_2021.svg/512px-Logo_TV_2021.svg.png"
        alt="App Logo"
        className="app-logo"
      />
      <div className="login-card">
        <h2 className="login-title">Video Management</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
        <p className="signup-prompt">
          Don&#39;t have an account?{" "}
          <a href="/signup" className="signup-link">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
