import React, { useState, useEffect } from "react";
import "../styles/BrandCarousel.css";

import type1 from "../assets/type1.png";
import type2 from "../assets/type2.png";
import type3 from "../assets/type3.PNG";
import type4 from "../assets/type4.png";
import type5 from "../assets/type5.png";
import type6 from "../assets/type6.png";
import type7 from "../assets/type7.PNG";

const images = [type1, type2, type3,type4,type5,type6, type7];

function BrandSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto change active every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="brand-slider">
      {/* Static row of all logos */}
      <div className="brand-row">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`brand-${index}`}
            className={`brand-img ${activeIndex === index ? "highlight" : ""}`}
          />
        ))}
      </div>

      {/* Indicator buttons under images */}
      <div className="indicator-row">
        {images.map((_, index) => (
          <div
            key={index}
            className={`indicator ${activeIndex === index ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default BrandSlider;