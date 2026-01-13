import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import "../styles/AdminCars.css";

const AdminTrashCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ===============================
     FETCH DELETED CARS
  =============================== */
  useEffect(() => {
    const fetchDeletedCars = async () => {
      try {
        const res = await fetch(
          "http://localhost/car_rental_api/getDeletedCars.php"
        );
        const data = await res.json();

        if (data.status === "success") {
          setCars(data.cars || []);
        } else {
          alert("Failed to load deleted cars");
        }
      } catch (err) {
        console.error(err);
        alert("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchDeletedCars();
  }, []);

  /* ===============================
     RESTORE CAR
  =============================== */
  const handleRestore = async (car_id) => {
    if (!window.confirm("Are you sure you want to restore this car?")) return;

    try {
      const res = await fetch(
        "http://localhost/car_rental_api/restoreCar.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ car_id }),
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        // remove restored car from trash list
        setCars((prev) => prev.filter((car) => car.car_id !== car_id));
        alert("Car restored successfully");
      } else {
        alert(data.message || "Restore failed");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  return (
    <AdminLayout>
      <div className="admin-cars-container">
        <h1 className="admin-cars-title">Trash – Deleted Cars</h1>

        <p className="admin-cars-subtitle">
          These cars are soft-deleted and hidden from users.
        </p>

        {/* BACK BUTTON */}
        <button
          className="admin-add-btn"
          onClick={() => navigate("/admin/cars")}
        >
          ← Back to Cars
        </button>

        {loading ? (
          <p className="admin-cars-loading">Loading deleted cars...</p>
        ) : cars.length === 0 ? (
          <p className="admin-cars-empty">Trash is empty.</p>
        ) : (
          <div className="admin-cars-table-wrapper">
            <table className="admin-cars-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Type</th>
                  <th>Year</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {cars.map((car) => (
                  <tr key={car.car_id}>
                    <td>{car.car_id}</td>
                    <td>{car.brand}</td>
                    <td>{car.model}</td>
                    <td>{car.type}</td>
                    <td>{car.year}</td>
                    <td>Deleted</td>
                    <td>
                      <button
                        className="admin-cars-btn restore"
                        onClick={() => handleRestore(car.car_id)}
                      >
                        Restore
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminTrashCars;
