import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import "../styles/AdminCars.css";

const AdminCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  /* ===============================
     FETCH ALL CARS
  =============================== */
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch(
          "http://localhost/car_rental_api/getAllCars.php"
        );
        const data = await res.json();
        setCars(data || []);
      } catch (err) {
        console.error("Error fetching cars", err);
        alert("Failed to load cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  /* ===============================
     DELETE CAR
  =============================== */
  const handleDelete = async (car_id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    try {
      const res = await fetch(
        "http://localhost/car_rental_api/deleteCar.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ car_id }),
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        setCars((prev) => prev.filter((car) => car.car_id !== car_id));
        alert(data.message || "Car deleted successfully");
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Network error. Please try again.");
    }
  };

  /* ===============================
     UPDATE CAR STATUS
  =============================== */
  const updateStatus = async (car_id, status) => {
    try {
      const res = await fetch(
        "http://localhost/car_rental_api/updateCarStatus.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ car_id, status }),
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        setCars((prev) =>
          prev.map((car) =>
            car.car_id === car_id ? { ...car, status } : car
          )
        );
      } else {
        alert(data.message || "Status update failed");
      }
    } catch (err) {
      console.error("Status update error:", err);
      alert("Network error");
    }
  };

  /* ===============================
     FILTERED CARS
  =============================== */
  const filteredCars = cars.filter((car) => {
    const term = searchTerm.toLowerCase();
    return (
      car.brand.toLowerCase().includes(term) ||
      car.model.toLowerCase().includes(term)
    );
  });

  return (
    <AdminLayout>
      <div className="admin-cars-container">
        <h1 className="admin-cars-title">Manage Cars</h1>

        {/* ACTION BUTTONS */}
        <div style={{ marginBottom: "15px" }}>
          <button
            className="admin-add-btn"
            onClick={() => navigate("/admin/cars/add")}
          >
            + Add New Car
          </button>

          <button
            className="admin-add-btn admin-trash-btn"
            onClick={() => navigate("/admin/cars/trash")}
            style={{ marginLeft: "10px" }}
          >
            🗑 Trash
          </button>
        </div>

        <p className="admin-cars-subtitle">
          Manage car availability, maintenance, and visibility.
        </p>

        <input
          type="text"
          className="admin-cars-search"
          placeholder="Search by brand or model..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading ? (
          <p className="admin-cars-loading">Loading cars...</p>
        ) : filteredCars.length === 0 ? (
          <p className="admin-cars-empty">No cars found.</p>
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
                  <th>Color</th>
                  <th>Price / Day</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCars.map((car) => (
                  <tr key={car.car_id}>
                    <td>{car.car_id}</td>
                    <td>{car.brand}</td>
                    <td>{car.model}</td>
                    <td>{car.type}</td>
                    <td>{car.year}</td>
                    <td>{car.color}</td>
                    <td>${car.daily_price}</td>

                    <td>
                      <select
                        value={car.status}
                        onChange={(e) =>
                          updateStatus(car.car_id, e.target.value)
                        }
                      >
                        <option value="available">Available</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="hidden">Hidden</option>
                      </select>
                    </td>

                    <td>
                      <button
                        className="admin-cars-btn edit"
                        onClick={() =>
                          navigate(`/admin/cars/edit/${car.car_id}`)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="admin-cars-btn delete"
                        onClick={() => handleDelete(car.car_id)}
                      >
                        Delete
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

export default AdminCars;
