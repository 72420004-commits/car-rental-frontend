import React from "react";
import "../styles/WelcomeSection.css";
import carImage from "../assets/welcome-cars.png"; // Your cars image

function WelcomeSection() {
  return (
    <div className="welcome-container">
      <h2 className="welcome-number">01</h2>
      <h1 className="welcome-title">
        WELCOME TO <span>MR SMART CARS</span>
      </h1>

      <img src={carImage} alt="Cars" className="welcome-image" />

      <p className="welcome-description">
        Welcome to MR Cars, your smart destination for seamless and modern car rentals. Discover a wide selection of vehicles, real-time availability, flexible booking options, and secure online payments — all designed to make your journey easier and more enjoyable. Whether you're planning a weekend trip, a business ride, or a special occasion, we bring comfort, technology, and convenience together in one smart platform.
      </p>

      <div className="welcome-features">
        <div className="feature-box orange">
          <i className="fas fa-headset"></i>
          <h3>24/7 CAR RENTAL SUPPORT</h3>
        </div>
        <div className="feature-box dark">
          <i className="fas fa-car"></i>
          <h3>CAR RESERVATION ANYTIME</h3>
        </div>
        <div className="feature-box orange">
          <i className="fas fa-map-marker-alt"></i>
          <h3>Tyre Alhosh Near Time-square</h3>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;