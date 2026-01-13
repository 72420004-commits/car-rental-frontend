import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CarSlider.css";

/* ===============================
   IMPORT CAR IMAGES
================================ */
import preview1 from "../assets/preview1.png";
import preview2 from "../assets/preview2.png";
import preview3 from "../assets/preview3.png";
import preview4 from "../assets/preview4.png";
import preview5 from "../assets/preview5.png";
import preview6 from "../assets/preview6.png";

/* ===============================
   CARS DATA
================================ */
const cars = [
  { id: 1, name: "BMW X5", type: "SUV", price: 120, image: preview1 },
  { id: 2, name: "BMW X6", type: "SUV Luxury", price: 140, image: preview2 },
  { id: 3, name: "Mercedes CLS", type: "Coupe", price: 130, image: preview3 },
  { id: 4, name: "Mercedes GLE", type: "SUV", price: 160, image: preview4 },
  { id: 5, name: "C Class", type: "Sport", price: 170, image: preview5 },
  { id: 6, name: "Range Rover", type: "Luxury SUV", price: 150, image: preview6 },
];

/* Duplicate for infinite slider */
const extendedCars = [...cars, ...cars];

const CARD_WIDTH = 300;
const CARD_GAP = 28;
const STEP = CARD_WIDTH + CARD_GAP;

const CarSlider = () => {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  const navigate = useNavigate(); 
  /* ===============================
     AUTO SLIDE
  ================================ */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* ===============================
     RESET FOR INFINITE LOOP
  ================================ */
  useEffect(() => {
    if (index === cars.length) {
      setTimeout(() => {
        trackRef.current.style.transition = "none";
        setIndex(0);
      }, 700);
    } else {
      trackRef.current.style.transition = "transform 0.7s ease-in-out";
    }
  }, [index]);

  /* ===============================
     BOOK NOW HANDLER
  ================================ */
  const handleBookNow = () => {
    navigate("/AvailableCars");
  };

  return (
    <section className="slider-container">
      <h2 className="slider-title">Explore Our Fleet</h2>

      <div className="slider-wrapper">
        <div
          ref={trackRef}
          className="slider-track"
          style={{ transform: `translateX(-${index * STEP}px)` }}
        >
          {extendedCars.map((car, i) => (
            <div className="car-card" key={i}>
              <img src={car.image} alt={car.name} />

              <div className="car-info">
                <h3>{car.name}</h3>
                <p>{car.type}</p>
                <span>${car.price} / day</span>

                <button onClick={handleBookNow}>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarSlider;
