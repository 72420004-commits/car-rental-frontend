// src/components/Slider.js
import React, { useState } from "react";
import "../styles/Slider.css";

import background1 from "../assets/background1.jpg";
import background2 from "../assets/background2.jpg";

const slides = [
  {
    id: 1,
    image: background1,
    title: "Best Rental Cars In Your Location",
    subtitle: "RENT A CAR",
  },
  {
    id: 2,
    image: background2,
    title: "Drive Your Dream. Anytime, Anywhere",
    subtitle: "RENT A CAR",
  },
];

function Slider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="slider">
      {slides.map((slide, index) => (
        <div
          className={`slide ${index === current ? "active" : ""}`}
          key={slide.id}
        >
          {/* 🔹 This is ONLY the background image layer */}
          <div
            className="slide-bg"
            style={{ backgroundImage: `url(${slide.image})`}}
          />

          {/* 🔹 This is the text + button layer */}
          <div className="slide-content">
            <p className="slide-subtitle">{slide.subtitle}</p>
            <h1 className="slide-title">{slide.title}</h1>
            <button className="reserve-btn">Reserve Now</button>
          </div>
        </div>
      ))}

      <button className="arrow left" onClick={prevSlide}>
        ❮
      </button>
      <button className="arrow right" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
}

export default Slider;