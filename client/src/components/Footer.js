import React from "react";
import "../styles/Footer.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    
    <footer className="footer">
      <div className="footer-container">

        {/* 🟠 Get in Touch */}
        <div className="footer-section">
          <h3>GET IN TOUCH</h3>
          <p><LocationOnIcon className="icon" /> 123 Street, Tyre, Lebanon</p>
          <p><LocalPhoneIcon className="icon" /> +961 76 575 289</p>
          <p><EmailIcon className="icon" /> mr@gmail.com</p>

          <div className="social-icons">
            <TwitterIcon />
            <FacebookIcon />
            <LinkedInIcon />
            <InstagramIcon />
          </div>
        </div>

        {/* 🔵 Useful Links */}
        <div className="footer-section">
          <h3>USEFUL LINKS</h3>
          <ul>
            <li>Private Policy</li>
            <li>Terms & Conditions</li>
            <li>New Member Registration</li>
            <li>Affiliate Programme</li>
            <li>Return & Refund</li>
            <li>Help & FAQs</li>
          </ul>
        </div>

        {/* 🟡 Newsletter */}
        <div className="footer-section">
          <h3>NEWSLETTER</h3>
          <p>
            Subscribe to get the latest updates, special offers and more!
          </p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your Email" />
            <button onClick={() => navigate("/signup")}>Sign Up</button>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © MR SMART Car Rental. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;