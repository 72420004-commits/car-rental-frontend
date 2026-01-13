import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Booking.css";

import {
  DirectionsCar,
  AirlineSeatReclineNormal,
  LocalGasStation,
  CalendarMonth,
  Speed,
  Route,
} from "@mui/icons-material";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { car, pickup, dropoff } = location.state || {};

  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  // UX states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [agreeConditions, setAgreeConditions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  /* ================================
     AUTH CHECK
  ================================= */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    if (user.status === "blocked") {
      alert("Your account is blocked. Contact support.");
      navigate("/contact");
    }
  }, [navigate]);

  if (!car || !pickup || !dropoff) {
    return <h2 style={{ textAlign: "center" }}>Missing booking data</h2>;
  }

  /* ================================
     PRICE CALCULATION
  ================================= */
  const startDate = new Date(pickup);
  const endDate = new Date(dropoff);
  const days =
    Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) || 1;

  const totalPrice = car.daily_price * days;

  /* ================================
     COMPLETE BOOKING
  ================================= */
  const handleCompleteBooking = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (paymentMethod !== "cash" && !cardNumber) {
      alert("Please enter card number");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    const bookingData = {
      user_id: user.user_id,
      car_id: car.car_id,
      pickup,
      dropoff,
      payment_method: paymentMethod,
      card_number: paymentMethod === "cash" ? null : cardNumber,
    };

    try {
      setIsSubmitting(true);

      const res = await fetch(
        "http://localhost/car_rental_api/createBooking.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );

      const result = await res.json();

      if (result.status === "success") {
        setBookingSuccess(true);
        setTimeout(() => {
          navigate("/AvailableCars");
        }, 2000);
      } else {
        alert(result.message || "Booking failed");
      }
    } catch {
      alert("Server error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const imageURL = car.image_url
    ? `http://localhost/car_rental_api/uploads/${car.image_url}`
    : "/placeholder-car.png";

  return (
    <div className="booking-wrapper">
      {/* LEFT IMAGE */}
      <div className="booking-image">
        <img src={imageURL} alt={`${car.brand} ${car.model}`} />
      </div>

      {/* RIGHT SUMMARY */}
      <div className="booking-summary">
        <button
          className="back-btn"
          onClick={() =>
            navigate(
              `/carsList?pickup=${encodeURIComponent(
                pickup
              )}&dropoff=${encodeURIComponent(dropoff)}`
            )
          }
        >
          ← Back to Available Cars
        </button>

        <h2>{car.brand} {car.model}</h2>
        <p className="subtitle">{car.type} • {car.year}</p>

        <div className="details-grid">
          <p><AirlineSeatReclineNormal /> {car.seats || 4} Seats</p>
          <p><LocalGasStation /> {car.fuel || "Petrol"}</p>
          <p><Route /> {car.mileage || "—"} km</p>
          <p><Speed /> {car.transmission || "Auto"}</p>
          <p><DirectionsCar /> Body: {car.type}</p>
          <p><CalendarMonth /> Year: {car.year}</p>
        </div>

        <div className="trust-box">
          <p>🟢 Available Now</p>
          <p>💰 Best Value</p>
        </div>

        <div className="price-box">
          <p className="days">{days} day(s)</p>
          <h3>${totalPrice}.00</h3>
          <small>Total Rental Price</small>
        </div>

        {!showPayment && (
          <button className="confirm-btn" onClick={() => setShowPayment(true)}>
            Confirm Booking
          </button>
        )}

        {showPayment && (
          <div className="payment-box">
            <h3>Payment Method</h3>

            <select
              className="payment-select"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select Method</option>
              <option value="cash">Cash on Pickup</option>
              <option value="visa">Visa / Bank Card</option>
              <option value="omt">OMT</option>
              <option value="whish">Whish</option>
            </select>

            {paymentMethod !== "cash" && paymentMethod && (
              <div className="card-input">
                <label>Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="XXXX XXXX XXXX XXXX"
                />
              </div>
            )}

            <p className="cancel-note">✔ Free cancellation before pickup</p>

            <button
              className="final-btn"
              onClick={() => {
                setAgreeConditions(false);
                setShowConfirmModal(true);
              }}
            >
              Complete Booking
            </button>
          </div>
        )}
      </div>

      {/* CONFIRM MODAL */}
      {showConfirmModal && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal">
            <h3>Confirm Your Booking</h3>

            <ul className="conditions-list">
              <li>Take care of the car during the rental period.</li>
              <li>Return the car in the same condition as received.</li>
              <li>
                Any damage, fines, or violations will be documented and
                presented to a certified expert and the insurance company.
              </li>
            </ul>

            <label className="agree-checkbox">
              <input
                type="checkbox"
                checked={agreeConditions}
                onChange={(e) => setAgreeConditions(e.target.checked)}
              />
              I agree to the conditions
            </label>

            <div className="modal-actions">
              <button
                className="modal-cancel"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>

              <button
                className="modal-confirm"
                disabled={!agreeConditions}
                onClick={() => {
                  setShowConfirmModal(false);
                  handleCompleteBooking();
                }}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LOADING */}
      {isSubmitting && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal">
            <h3>Processing Booking</h3>
            <p>Please wait...</p>
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {bookingSuccess && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal">
            <h3>Booking Confirmed ✅</h3>
            <p>Your booking has been successfully confirmed.</p>
            <p>You will be redirected shortly...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
