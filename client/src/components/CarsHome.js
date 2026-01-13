import React from "react";
import "../styles/CarsHome.css";
import { useNavigate } from "react-router-dom";

// Import car images
import car1 from "../assets/car1.png";
import car2 from "../assets/car2.png";
import car3 from "../assets/car3.png";

function CarsHome() {
  const navigate = useNavigate();

  return (
    <section className="home-cars-section">
      <div className="home-section-number">03</div>

      <h2 className="home-cars-title">
        <span>Featured</span> Cars
      </h2>

      <p className="home-cars-intro">
        Choose from our top-rated cars designed for luxury, comfort, and smart driving experience.
      </p>

      <div className="home-cars-container">
        
        {/* Car 1 */}
        <div className="home-car-card" onClick={() => navigate("/AvailableCars")}>
          <img src={car1} alt="Luxury Car" className="home-car-img" />
          <h3>BMW X5</h3>
          <p>Starting from $120/day</p>
          <button className="home-view-btn">View Details</button>
        </div>

        {/* Car 2 */}
        <div className="home-car-card" onClick={() => navigate("/AvailableCars")}>
          <img src={car2} alt="SUV Car" className="home-car-img" />
          <h3>Mercedes AMG GT</h3>
          <p>Starting from $100/day</p>
          <button className="home-view-btn">View Details</button>
        </div>

        {/* Car 3 */}
        <div className="home-car-card" onClick={() => navigate("/AvailableCars")}>
          <img src={car3} alt="Sport Car" className="home-car-img" />
          <h3>BMW i8 Hybrid</h3>
          <p>Starting from $140/day</p>
          <button className="home-view-btn">View Details</button>
        </div>

        {/* View More Card */}
        <div className="home-car-card home-view-more" onClick={() => navigate("/AvailableCars")}>
          <h3>View More Cars</h3>
          <p>Explore our full collection of smart, luxury and economy cars.</p>
          <button className="home-view-btn home-more-btn">View More →</button>
        </div>

      </div>
    </section>
  );
}

export default CarsHome;

