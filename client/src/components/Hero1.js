import React from "react";
import "../styles/Hero1.css";
import {useNavigate } from "react-router-dom";
import heroCar from "../assets/hero3.png"; 

const HomeHero = () => {
  const navigate = useNavigate();
  return (
    <div className="hero-container">

      {/* TEXT */}
      <h1 className="hero-title">Drive Your Journey with Confidence</h1>
      <p className="hero-subtitle">
        Smart, reliable, and modern car rentals at your fingertips.
      </p>

      {/* CAR IMAGE CENTERED */}
      <div className="hero-img-wrapper">
        <img src={heroCar} alt="Car" className="hero-img" />
        <div className="car-shadow"></div>
      </div>

      {/* BUTTON UNDER CAR */}
      <button className="hero-btn" onClick={() => navigate("/AvailableCars")}>Explore Cars</button>

    </div>
  );
};

export default HomeHero;
