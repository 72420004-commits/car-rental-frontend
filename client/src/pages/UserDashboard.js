import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/UserDashboard.css";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState({});
  const [loading, setLoading] = useState(true);

  //  track if reviews finished loading (prevents any “flash” issues)
  const [reviewsLoaded, setReviewsLoaded] = useState(false);

  // prevent double submit
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Review modal states
  const [activeReview, setActiveReview] = useState(null);
  const [activeCarId, setActiveCarId] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));


  const getLocksKey = () => `reviewLocks_${user?.user_id || "guest"}`;

  const getReviewLocks = () => {
    try {
      return JSON.parse(localStorage.getItem(getLocksKey())) || {};
    } catch {
      return {};
    }
  };

  const setReviewLock = (reservationId) => {
    const locks = getReviewLocks();
    locks[String(reservationId)] = true;
    localStorage.setItem(getLocksKey(), JSON.stringify(locks));
  };

  const isLocked = (reservationId) => {
    const locks = getReviewLocks();
    return !!locks[String(reservationId)];
  };

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    fetchMyBookings();
    fetchMyReviews();
    // eslint-disable-next-line
  }, []);

  /* ===============================
     AUTO DISPLAY STATUS
  ================================ */
  const getDisplayStatus = (booking) => {
    if (booking.status === "cancelled") return "cancelled";

    if (
      booking.status === "active" &&
      new Date(booking.dropoff_datetime) < new Date()
    ) {
      return "done";
    }

    return "active";
  };

  /* ===============================
     FETCH BOOKINGS
  ================================ */
  const fetchMyBookings = async () => {
    try {
      const res = await fetch(
        "http://localhost/car_rental_api/getMyBookings.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user.user_id }),
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        setBookings(data.bookings);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error("Error loading bookings", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyReviews = async () => {
    try {
      const res = await fetch(
        "http://localhost/car_rental_api/getUserReviews.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user.user_id }),
        }
      );

      const data = await res.json();

      if (data.status === "success" && Array.isArray(data.reviews)) {
        const map = {};
        data.reviews.forEach((r) => {
          // ✅ normalize key to string
          const rid = String(r.reservation_id);
          map[rid] = r;

          // ✅ sync local lock from DB
          setReviewLock(rid);
        });
        setReviews(map);
      } else {
        setReviews({});
      }
    } catch (err) {
      console.error("Error loading reviews", err);
      // keep current reviews as-is
    } finally {
      setReviewsLoaded(true);
    }
  };

  /* ===============================
     CANCEL BOOKING
  ================================ */
  const canCancel = (booking) => {
    return (
      booking.status === "active" &&
      new Date(booking.pickup_datetime) > new Date()
    );
  };

  const cancelBooking = async (reservation_id) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?"))
      return;

    try {
      const res = await fetch(
        "http://localhost/car_rental_api/cancelBooking.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reservation_id,
            user_id: user.user_id,
          }),
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        fetchMyBookings();
      } else {
        alert(data.message);
      }
    } catch {
      alert("Server error");
    }
  };


  const canReview = (booking) => {
    if (!reviewsLoaded) return false; 

    const rid = String(booking.reservation_id);
    return getDisplayStatus(booking) === "done" && !reviews[rid] && !isLocked(rid);
  };

  /* ===============================
     SUBMIT REVIEW (SAFE)
  ================================ */
  const submitReview = async () => {
    if (isSubmittingReview) return;

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    if (!activeCarId || !activeReview) {
      alert("Missing review data. Please refresh and try again.");
      return;
    }

    setIsSubmittingReview(true);

    try {
      const res = await fetch(
        "http://localhost/car_rental_api/addReview.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reservation_id: activeReview,
            car_id: activeCarId,
            user_id: user.user_id,
            rating,
            comment,
          }),
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        const rid = String(activeReview);

       
        setReviews((prev) => ({
          ...prev,
          [rid]: { reservation_id: rid, rating, comment },
        }));

       
        setReviewLock(rid);

        setActiveReview(null);
        setActiveCarId(null);
        setRating(0);
        setComment("");

        fetchMyReviews();
      } else {
        alert(data.message);
      }
    } catch {
      alert("Server error");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="user-dashboard-container">
        <h1>My Reservations</h1>

        {loading ? (
          <p>Loading your reservations...</p>
        ) : bookings.length === 0 ? (
          <p>No reservations found.</p>
        ) : (
          <table className="user-bookings-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Car</th>
                <th>Pickup</th>
                <th>Drop-off</th>
                <th>Days</th>
                <th>Total ($)</th>
                <th>Status</th>
                <th>Action</th>
                <th>Review</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => {
                const displayStatus = getDisplayStatus(b);
                const rid = String(b.reservation_id);

                return (
                  <tr key={b.reservation_id}>
                    <td>{b.reservation_id}</td>
                    <td>
                      {b.brand} {b.model}
                    </td>
                    <td>{b.pickup_datetime}</td>
                    <td>{b.dropoff_datetime}</td>
                    <td>{b.days}</td>
                    <td>${b.total_price}</td>

                    <td className={`status ${displayStatus}`}>{displayStatus}</td>

                    <td>
                      {canCancel(b) && (
                        <button
                          className="cancel-btn"
                          onClick={() => cancelBooking(b.reservation_id)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>

                    <td>
                      {displayStatus === "done" && !reviewsLoaded ? (
                        
                        <button className="review-btn done" disabled>
                          Checking...
                        </button>
                      ) : canReview(b) ? (
                        <button
                          className="review-btn"
                          onClick={() => {
                            setActiveReview(b.reservation_id);
                            setActiveCarId(b.car_id);
                            setRating(0);
                            setComment("");
                          }}
                        >
                          Leave Review
                        </button>
                      ) : reviews[rid] || isLocked(rid) ? (
                        <button className="review-btn done" disabled>
                          Thanks ✓
                        </button>
                      ) : (
                        <span style={{ color: "#999" }}>—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* REVIEW MODAL */}
      {activeReview && (
        <div className="review-modal-overlay">
          <div className="review-modal">
            <h3>Rate Your Experience</h3>

            <div className="stars">
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  className={n <= rating ? "star active" : "star"}
                  onClick={() => setRating(n)}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              placeholder="Write a comment (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="modal-actions">
              <button
                onClick={() => {
                  setActiveReview(null);
                  setActiveCarId(null);
                  setRating(0);
                  setComment("");
                }}
                disabled={isSubmittingReview}
              >
                Cancel
              </button>

              <button onClick={submitReview} disabled={isSubmittingReview}>
                {isSubmittingReview ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default UserDashboard;
