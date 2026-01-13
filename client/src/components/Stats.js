import React from "react";
import "../styles/Stats.css";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TimelineIcon from "@mui/icons-material/Timeline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function Stats() {
  const statsData = [
    { icon: <ThumbUpAltIcon />, number: "829+", title: "Happy Clients" },
    { icon: <DirectionsCarIcon />, number: "56+", title: "Number of Cars" },
    { icon: <TimelineIcon />, number: "10+", title: "Years of Experience" },
    { icon: <AccessTimeIcon />, number: "589+", title: "Total Kilometers" },
  ];

  return (
    <section className="stats-section">
      <div className="overlay">
        <div className="stats-container">
          {statsData.map((item, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-icon">{item.icon}</div>
              <h2>{item.number}</h2>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
