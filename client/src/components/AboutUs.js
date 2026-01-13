import React from "react";
import "../styles/AboutUs.css";
import about from "../assets/about.png"; 
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import VerifiedIcon from "@mui/icons-material/Verified";
import SmartToyIcon from "@mui/icons-material/SmartToy"; 


const AboutUs = () => {
  return (
    <div className="about-container">

      {/* HERO SECTION */}
      <div className="about-hero">
        <h1>About MR Smart Car Rental</h1>
        <p>
          Delivering modern, reliable, and seamless car rental experiences with real-time
          availability, transparent pricing, and 24/7 support.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="about-content">

        {/* LEFT TEXT SECTION */}
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            Smart Car Rental is a modern platform built to simplify the way you book cars.
            We focus on providing a smooth online experience where customers can browse cars,
            check availability instantly, manage reservations, and interact with our AI-powered chatbot.
          </p>

          <h2>Our Mission</h2>
          <p>
            To offer an innovative digital rental system that is fast, secure, and fully transparent—
            helping customers find the perfect car at the right time.
          </p>

          <h2>Our Vision</h2>
          <p>
            To become the leading smart rental system in the region by combining technology,
            automation, and excellent customer service.
          </p>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="about-image">
          <img src={about} alt="About Car" />
        </div>
      </div>

      {/* VALUES SECTION */}
      <div className="values-section">
        <div className="value-card">
          <VerifiedIcon className="value-icon" />
          <h3>Trusted Service</h3>
          <p>All cars are verified, clean, and regularly inspected.</p>
        </div>

        <div className="value-card">
          <EmojiEventsIcon className="value-icon" />
          <h3>Premium Quality</h3>
          <p>We ensure high-quality rentals with modern features.</p>
        </div>

        <div className="value-card">
          <SmartToyIcon className="value-icon" />
          <h3>Smart AI Assistance</h3>
          <p>Our intelligent chatbot helps you browse cars, answer questions, and guide you through booking in real time.</p>
        </div>

      </div>

    </div>
  );
};

export default AboutUs;
