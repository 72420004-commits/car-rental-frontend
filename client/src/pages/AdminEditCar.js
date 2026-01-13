import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import "../styles/AdminEditCar.css";

const AdminEditCar = () => {
  const { id } = useParams();
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
    image_url: "", 
    image_file: null, 
    description: "",
    status: "available",
  });

  const [loading, setLoading] = useState(true);

  /* ===============================
     FETCH CAR BY ID
  =============================== */
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(
          `http://localhost/car_rental_api/getCarById.php?id=${id}`
        );
        const data = await res.json();

        if (data.status === "success") {
          setForm((prev) => ({
            ...prev,
            ...data.car,
            image_file: null, // reset file
          }));
        } else {
          alert("Car not found");
          navigate("/admin/cars");
        }
      } catch (err) {
        alert("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id, navigate]);

  /* ===============================
     HANDLE CHANGE (TEXT)
  =============================== */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ===============================
     HANDLE IMAGE CHANGE
  =============================== */
  const handleImageChange = (e) => {
    setForm({
      ...form,
      image_file: e.target.files[0], // file object
    });
  };

  /* ===============================
     UPDATE CAR
  =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("car_id", id);
      formData.append("brand", form.brand);
      formData.append("model", form.model);
      formData.append("type", form.type);
      formData.append("year", form.year);
      formData.append("color", form.color);
      formData.append("daily_price", form.daily_price);
      formData.append("seats", form.seats);
      formData.append("fuel", form.fuel);
      formData.append("transmission", form.transmission);
      formData.append("mileage", form.mileage);
      formData.append("description", form.description);
      formData.append("status", form.status);

      // keep old image if no new one
      formData.append("image_url", form.image_url);

      // upload new image ONLY if selected
      if (form.image_file) {
        formData.append("image", form.image_file);
      }

      const res = await fetch(
        "http://localhost/car_rental_api/updateCar.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        alert("Car updated successfully");
        navigate("/admin/cars");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <AdminLayout>
      <div className="admin-edit-container">
        <h1 className="admin-edit-title">Edit Car</h1>

        <p>
          <strong>Car ID:</strong> {id}
        </p>

        <div className="admin-edit-form">
          <form onSubmit={handleSubmit}>
            <div className="admin-edit-grid">
              <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" />
              <input name="model" value={form.model} onChange={handleChange} placeholder="Model" />
              <input name="type" value={form.type} onChange={handleChange} placeholder="Type" />
              <input name="year" value={form.year} onChange={handleChange} placeholder="Year" />
              <input name="color" value={form.color} onChange={handleChange} placeholder="Color" />
              <input name="daily_price" value={form.daily_price} onChange={handleChange} placeholder="Daily Price" />
              <input name="seats" value={form.seats} onChange={handleChange} placeholder="Seats" />
              <input name="fuel" value={form.fuel} onChange={handleChange} placeholder="Fuel" />
              <input name="transmission" value={form.transmission} onChange={handleChange} placeholder="Transmission" />
              <input name="mileage" value={form.mileage} onChange={handleChange} placeholder="Mileage" />

              {/* EXISTING IMAGE NAME (unchanged) */}
              <input
                className="full"
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                placeholder="Current image filename"
              />

              {/* NEW IMAGE UPLOAD (OPTIONAL) */}
              <input
                className="full"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              {/* IMAGE PREVIEW */}
              {form.image_url && (
                <div className="image-preview">
                  <img
                    src={`http://localhost/car_rental_api/uploads/${form.image_url}`}
                    alt="Car"
                  />
                </div>
              )}

              {/* STATUS */}
              <select
                className="full"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="available">Available</option>
                <option value="maintenance">Maintenance</option>
                <option value="hidden">Hidden</option>
              </select>
            </div>

            <div className="admin-edit-actions">
              <button
                type="button"
                className="admin-cancel-btn"
                onClick={() => navigate("/admin/cars")}
              >
                Cancel
              </button>

              <button type="submit" className="admin-save-btn">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEditCar;
