import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import "../styles/AdminEditCar.css"; 

const AdminAddCar = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    brand: "",
    model: "",
    type: "",
    year: "",
    color: "",
    daily_price: "",
    seats: "",
    fuel: "",
    transmission: "",
    mileage: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ===============================
     HANDLE INPUT CHANGE
  =============================== */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ===============================
     ADD CAR
  =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload a car image!");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    formData.append("image", imageFile);

    try {
      const response = await fetch(
        "https://mycarrental.xo.je/car_rental_api/addCar.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        alert("Car added successfully!");
        navigate("/admin/cars");
      } else {
        alert(data.message || "Failed to add car");
      }
    } catch (error) {
      alert("Server connection failed");
    }

    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="admin-edit-container">
        <h1 className="admin-edit-title">Add New Car</h1>

        <div className="admin-edit-form">
          <form onSubmit={handleSubmit}>
            <div className="admin-edit-grid">
              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                placeholder="Brand"
                required
              />

              <input
                name="model"
                value={form.model}
                onChange={handleChange}
                placeholder="Model"
                required
              />

              <input
                name="type"
                value={form.type}
                onChange={handleChange}
                placeholder="Type (SUV, Sedan...)"
                required
              />

              <input
                name="year"
                type="number"
                value={form.year}
                onChange={handleChange}
                placeholder="Year"
                required
              />

              <input
                name="color"
                value={form.color}
                onChange={handleChange}
                placeholder="Color"
                required
              />

              <input
                name="daily_price"
                type="number"
                value={form.daily_price}
                onChange={handleChange}
                placeholder="Daily Price ($)"
                required
              />

              <input
                name="seats"
                type="number"
                value={form.seats}
                onChange={handleChange}
                placeholder="Seats"
                required
              />

              <input
                name="fuel"
                value={form.fuel}
                onChange={handleChange}
                placeholder="Fuel (Petrol/Diesel)"
                required
              />

              <input
                name="transmission"
                value={form.transmission}
                onChange={handleChange}
                placeholder="Transmission (AUTO/MANUAL)"
                required
              />

              <input
                name="mileage"
                value={form.mileage}
                onChange={handleChange}
                placeholder="Mileage"
                required
              />

              {/* IMAGE UPLOAD */}
              <input
                type="file"
                accept="image/*"
                className="full"
                onChange={(e) => setImageFile(e.target.files[0])}
                required
              />

              {/* IMAGE PREVIEW */}
              {imageFile && (
                <div className="image-preview">
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Preview"
                  />
                </div>
              )}

              {/* DESCRIPTION */}
              <textarea
                className="full"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
              />
            </div>

            {/* ACTIONS */}
            <div className="admin-edit-actions">
              <button
                type="button"
                className="admin-cancel-btn"
                onClick={() => navigate("/admin/cars")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="admin-save-btn"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Car"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAddCar;
