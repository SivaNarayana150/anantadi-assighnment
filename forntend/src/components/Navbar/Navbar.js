import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/videos">Videos</Link></li>
        <li><Link to="/upload">Upload Video</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
