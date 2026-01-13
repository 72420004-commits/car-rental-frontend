import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import "../styles/AdminBookings.css";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState({});
  const [loading, setLoading] = useState(true);

  /* ===============================
     HELPERS
  ================================ */
  const getEffectiveStatus = (booking) => {
    if (
      booking.status === "active" &&
      new Date(booking.dropoff_datetime) < new Date()
    ) {
      return "returned";
    }
    return booking.status;
  };

  /* ===============================
     FETCH BOOKINGS
  ================================ */
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          "https://mycarrental.xo.je/car_rental_api/getAllBookings.php"
        );
        const data = await res.json();

        if (data.status === "success") {
          setBookings(data.bookings);
        }
      } catch (err) {
        console.error("Error loading bookings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  /* ===============================
     FETCH REVIEWS
  ================================ */
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          "https://mycarrental.xo.je/car_rental_api/getReviews.php"
        );
        const data = await res.json();

        if (data.status === "success") {
          const grouped = {};
          data.reviews.forEach((r) => {
            grouped[r.reservation_id] = r;
          });
          setReviews(grouped);
        }
      } catch (err) {
        console.error("Error loading reviews", err);
      }
    };

    fetchReviews();
  }, []);

  /* ===============================
     COUNTS
  ================================ */
  const activeCount = bookings.filter(
    (b) => getEffectiveStatus(b) === "active"
  ).length;

  const returnedCount = bookings.filter(
    (b) => getEffectiveStatus(b) === "returned"
  ).length;

  const cancelledCount = bookings.filter(
    (b) => getEffectiveStatus(b) === "cancelled"
  ).length;

  /* ===============================
     REVENUE
  ================================ */
  const totalRevenue = bookings
    .filter((b) =>
      ["active", "returned"].includes(getEffectiveStatus(b))
    )
    .reduce((sum, b) => sum + Number(b.total_price), 0);

  return (
    <AdminLayout>
      <div className="admin-bookings-container">
        <h1>Bookings & Revenue</h1>

        {/* SUMMARY */}
        <div className="booking-summary-boxes">
          <div className="summary-box active">
            <h3>Active</h3>
            <p>{activeCount}</p>
          </div>

          <div className="summary-box returned">
            <h3>Returned</h3>
            <p>{returnedCount}</p>
          </div>

          <div className="summary-box cancelled">
            <h3>Cancelled</h3>
            <p>{cancelledCount}</p>
          </div>

          <div className="summary-box revenue">
            <h3>Total Revenue</h3>
            <p>${totalRevenue}</p>
          </div>
        </div>

        {loading ? (
          <p>Loading bookings...</p>
        ) : (
          <table className="admin-bookings-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Email</th>
                <th>Car</th>
                <th>Pickup</th>
                <th>Drop-off</th>
                <th>Days</th>
                <th>Total ($)</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Review</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => {
                const status = getEffectiveStatus(b);
                const review = reviews[b.reservation_id];

                return (
                  <tr key={b.reservation_id}>
                    <td>{b.reservation_id}</td>
                    <td>{b.full_name}</td>
                    <td>{b.email}</td>
                    <td>{b.brand} {b.model}</td>
                    <td>{b.pickup_datetime}</td>
                    <td>{b.dropoff_datetime}</td>
                    <td>{b.days}</td>
                    <td>${b.total_price}</td>

                    {/* 💳 PAYMENT METHOD */}
                    <td>
                      <span
                        className={`payment-badge ${
                          b.payment_method === "cash"
                            ? "cash"
                            : "card"
                        }`}
                      >
                        {b.payment_method
                          ? b.payment_method.toUpperCase()
                          : "—"}
                      </span>
                    </td>

                    <td className={`status ${status}`}>
                      {status}
                    </td>

                    {/* ⭐ REVIEW */}
                    <td>
                      {review ? (
                        <div>
                          <div
                            style={{
                              color: "#f5b301",
                              fontSize: "16px",
                            }}
                          >
                            {"★".repeat(review.rating)}
                          </div>

                          {review.comment && (
                            <small>{review.comment}</small>
                          )}
                        </div>
                      ) : (
                        <span style={{ color: "#999" }}>
                          No review
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminBookings;
