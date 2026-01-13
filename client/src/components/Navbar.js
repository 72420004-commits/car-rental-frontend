import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* LOGO */}
        <div className="nav-logo">
          <img src={logo} alt="Logo" />
        </div>

        {/* CENTER LINKS */}
        <div className="nav-center">
          <ul className={`nav-links ${isOpen ? "nav-active" : ""}`}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/AvailableCars">Cars</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="nav-right">
          {!user ? (
            <>
              <button className="login-btn" onClick={() => navigate("/login")}>
                Login
              </button>
              <button className="signup-btn" onClick={() => navigate("/signup")}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              {/* CLICKABLE USER PROFILE (Dashboard) */}
              <div
                className="nav-profile"
                onClick={() => navigate("/dashboard")}
                title="Go to Dashboard"
              >
                <div className="nav-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <div className="nav-profile-info">
                  <span className="nav-username">Hi, {user.name}</span>
                  <span className="nav-profile-hint">View Dashboard</span>
                </div>
              </div>

              {user.role === "admin" && (
                <button
                  className="dashboard-btn"
                  onClick={() => navigate("/admin")}
                >
                  Admin Panel
                </button>
              )}

              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>

        {/* HAMBURGER */}
        <div className="hamburger" onClick={toggleMenu}>
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
