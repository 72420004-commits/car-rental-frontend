import React, { useState } from "react";
import "../styles/AvailableCars.css";
import home from "../assets/home.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

// MUI Icons
import {
  Discount,
  GppGood,
  Speed,
  CarRental,
  SmartToy,
  AccountBalance,
  Payments,
  LocalAtm,
  AccountBalanceWallet,
} from "@mui/icons-material";

const SearchSection = () => {
  const navigate = useNavigate();

  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");
  const [warning, setWarning] = useState("");

  /* ===============================
     SEARCH (LOGIC UNCHANGED)
  ================================ */
  const handleSearch = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login to search available cars");
      navigate("/login");
      return;
    }

    if (!pickupDate || !pickupTime || !dropoffDate || !dropoffTime) {
      setWarning("⚠ Please fill all fields to search");
      return;
    }


    const pickupHour = parseInt(pickupTime.split(":")[0], 10);
    if (pickupHour < 9 || pickupHour >= 21) {
      alert("Pickup time must be between 9:00 AM and 9:00 PM");
      return;
    }

    const pickup_datetime = `${pickupDate} ${pickupTime}`;
    const dropoff_datetime = `${dropoffDate} ${dropoffTime}`;

    if (new Date(dropoff_datetime) <= new Date(pickup_datetime)) {
      setWarning("⚠ Drop-off must be at least one day after pickup");
      return;
    }

    setWarning("");

    navigate(
      `/carsList?pickup=${encodeURIComponent(
        pickup_datetime
      )}&dropoff=${encodeURIComponent(dropoff_datetime)}`
    );
  };

  return (
    <>
      <Navbar />

      <div
        className="search-page-container"
        style={{ backgroundImage: `url(${home})` }}
      >
        <h1 className="website-title">MR Smart Car Rental</h1>
        <p className="website-caption">
          Drive Smart, Save More — Your Perfect Ride Awaits.
        </p>

        {/* SEARCH BOX */}
        <div className="search-box">
          <div className="input-group">
            <label>Location</label>
            <input
              type="text"
              value="Tyre, Lebanon"
              readOnly
              className="readonly-input"
            />
          </div>

          <div className="input-group">
            <label>Pickup Date</label>
            <input
              type="date"
              value={pickupDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setPickupDate(e.target.value);
                setWarning("");
              }}
            />
          </div>

          <div className="input-group">
            <label>Pickup Time</label>
            <input
              type="time"
              value={pickupTime}
              min="09:00"
              max="21:00"
              onChange={(e) => {
                const time = e.target.value;
                const hour = parseInt(time.split(":")[0], 10);

               
                if (hour < 9 || hour >= 21) {
                  alert("Pickup time must be between 9:00 AM and 9:00 PM");
                  return;
                }

                setPickupTime(time);
                setDropoffTime(time); 
                setWarning("");
              }}
            />
          </div>

          <div className="input-group">
            <label>Drop-off Date</label>
            <input
              type="date"
              value={dropoffDate}
              min={
                pickupDate
                  ? new Date(
                      new Date(pickupDate).setDate(
                        new Date(pickupDate).getDate() + 1
                      )
                    )
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={(e) => {
                setDropoffDate(e.target.value);
                setWarning("");
              }}
            />
          </div>

          <div className="input-group">
            <label>Drop-off Time</label>
            <input
              type="time"
              value={dropoffTime}
              min="09:00"
              max="21:00"
              disabled
            />
          </div>

          <button className="search-btn" onClick={handleSearch}>
            Search Available Cars
          </button>

          {warning && <p className="warning-text">{warning}</p>}
        </div>

        {/* PAYMENT METHODS */}
        <div className="payment-section">
          <h2>Accepted Payment Methods</h2>

          <div className="payment-options">
            <div className="payment-card">
              <AccountBalance />
              <p>Bank</p>
            </div>

            <div className="payment-card">
              <Payments />
              <p>OMT</p>
            </div>

            <div className="payment-card">
              <AccountBalanceWallet />
              <p>Whish</p>
            </div>

            <div className="payment-card">
              <LocalAtm />
              <p>Cash</p>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div className="features-section">
          <div className="feature-card">
            <CarRental className="feature-icon" />
            <p>Wide Car Selection</p>
          </div>

          <div className="feature-card">
            <Speed className="feature-icon" />
            <p>Fast Booking Process</p>
          </div>

          <div className="feature-card">
            <Discount className="feature-icon" />
            <p>Best Value Deals</p>
          </div>

          <div className="feature-card">
            <GppGood className="feature-icon" />
            <p>Available Now</p>
          </div>

          <div className="feature-card">
            <SmartToy className="feature-icon" />
            <p>Smart AI Assistant</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SearchSection;
