import React from "react";
import "../styles/Services.css";
import service from "../assets/services-img.png";

// Material UI Icons
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

function Services() {
  return (
    <section className="services-section">
      <div class="section-number">02</div>
      <h2>
        <span>Our</span> Services
      </h2>
      <p className="services-intro">
        Experience smart, premium and effortless car renting with real-time
        availability, professional support.
      </p>

      <div className="services-container">
        {/* Left Side */}
        <div className="services-left">
          <div className="service-item">
            <div className="icon-bg">
              <EmojiEventsIcon style={{ fontSize: 35, color: "white" }} />
            </div>
            <div>
              <h3>First Class Services</h3>
              <p>Enjoy luxury experience with high-quality vehicles and support.</p>
            </div>
          </div>

          <div className="service-item">
            <div className="icon-bg">
              <SupportAgentIcon style={{ fontSize: 35, color: "white" }} />
            </div>
            <div>
              <h3>24/7 Road Assistance</h3>
              <p>Support anytime, anywhere — your safety is our priority.</p>
            </div>
          </div>
        </div>

        {/* Center Car Image */}
        <div className="car-image">
          <img src={service} alt="Luxury Car" />
        </div>

        {/* Right Side */}
        <div className="services-right">
          <div className="service-item">
            <div className="icon-bg">
              <LocalOfferIcon style={{ fontSize: 35, color: "white" }} />
            </div>
            <div>
              <h3>Quality at Minimum</h3>
              <p>Premium cars at best affordable price without compromise.</p>
            </div>
          </div>

          <div className="service-item">
            <div className="icon-bg">
              <DirectionsCarIcon style={{ fontSize: 35, color: "white" }} />
            </div>
            <div>
              <h3>Real-Time Car Availability</h3>
              <p>Check which cars are available instantly and book anytime..</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;

