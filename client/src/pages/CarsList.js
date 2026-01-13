import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/CarsList.css";

// MUI Icons
import {
  DirectionsCar,
  AirlineSeatReclineNormal,
  LocalGasStation,
  CalendarMonth,
  Speed,
  Route,
} from "@mui/icons-material";

const CarsList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  //extracts pickup and drop off dates
  const queryParams = new URLSearchParams(location.search);
  const pickup = queryParams.get("pickup");
  const dropoff = queryParams.get("dropoff");

  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  const [brandFilter, setBrandFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("default");

  /* ================================
     ACCESS CONTROL (REAL LOGIC)
  ================================= */
  useEffect(() => {
    // Not logged in → login first
    if (!user) {
      alert("Please login to view available cars");
      navigate("/login");
      return;
    }

    // Logged in but dates missing → go home
    if (!pickup || !dropoff) {
      alert("Please select pickup and drop-off dates first");
      navigate("/");
      return;
    }
  }, [user, pickup, dropoff, navigate]);

  /* ================================
     FETCH AVAILABLE CARS FROM DATABASE
  ================================= */
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(
          "http://localhost/car_rental_api/getAvailableCars.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              pickup_datetime: pickup,
              dropoff_datetime: dropoff,
            }),
          }
        );

        const data = await response.json();

        if (data.status === "success") {
          setCars(data.cars || []);
          setFilteredCars(data.cars || []);
        } else {
          setCars([]);
          setFilteredCars([]);
        }
      } catch (error) {
        console.error("Error loading cars:", error);
        setCars([]);
        setFilteredCars([]);
      }
    };

    fetchCars();
  }, [pickup, dropoff]);

  /* ================================
     FILTERING LOGIC
  ================================= */
  useEffect(() => {
    let filtered = [...cars];

    if (brandFilter !== "all") {
      filtered = filtered.filter((car) => car.brand === brandFilter);
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((car) => car.type === typeFilter);
    }

    if (priceFilter === "low-high") {
      filtered.sort((a, b) => (a.daily_price ?? 0) - (b.daily_price ?? 0));
    } else if (priceFilter === "high-low") {
      filtered.sort((a, b) => (b.daily_price ?? 0) - (a.daily_price ?? 0));
    }

    setFilteredCars(filtered);
  }, [brandFilter, typeFilter, priceFilter, cars]);

  return (

    <div className="cars-container">

      {/* FILTER BAR */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search (Brand or Model)"
          className="search-input"
          onChange={(e) => {
            const text = e.target.value.toLowerCase();
            setFilteredCars(
              cars.filter(
                (car) =>
                  car.brand?.toLowerCase().includes(text) ||
                  car.model?.toLowerCase().includes(text)
              )
            );
          }}
        />

        <select onChange={(e) => setBrandFilter(e.target.value)}>
          <option value="all">Brand</option>
          <option value="Kia">Kia</option>
          <option value="Toyota">Toyota</option>
          <option value="Honda">Honda</option>
          <option value="BMW">BMW</option>
          <option value="Ford">Ford</option>
          <option value="Mercedes">Mercedes</option>
          <option value="Lamborghini">Lamborghini</option>
          <option value="Hyundai">Hyundai</option>
          <option value="Range Rover">Range Rover</option>
        </select>

        <select onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">Type</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Sport">Sport</option>
          <option value="Truck">Truck</option>
          <option value="Luxury">Luxury</option>
          <option value="Hatchback">Hatchback</option>
        </select>

        <select onChange={(e) => setPriceFilter(e.target.value)}>
          <option value="default">Price</option>
          <option value="low-high">Low → High</option>
          <option value="high-low">High → Low</option>
        </select>
      </div>

      {/* NO CARS MESSAGE */}
      {filteredCars.length === 0 && (
        <h2 style={{ textAlign: "center", marginTop: "40px", color: "#555" }}>
          🚫 No cars available for the selected dates.
        </h2>
      )}

      {/* CARS GRID */}
      <div className="cars-grid">
        {filteredCars.map((car) => (
          <div key={car.car_id} className="list-card">

            {/* GEt IMAGE FROM UPLOADS  */}
            <div className="list-img-box">
              <img
                src={
                  car.image_url
                    ? `http://localhost/car_rental_api/uploads/${car.image_url}`
                    : "/placeholder-car.png"
                }
                alt={`${car.brand} ${car.model}`}
                className="list-car-img"
              />
            </div>

            <div className="list-divider"></div>

            <h2 className="list-car-title">
              {car.brand} {car.model}
            </h2>

        

            <div className="list-price">
              ${car.daily_price}.00 <span>/Day</span>
            </div>

            <div className="list-features">
              <div><AirlineSeatReclineNormal /> {car.seats ?? 4} Seats</div>
              <div><DirectionsCar /> {car.type}</div>
              <div><LocalGasStation /> {car.fuel ?? "Petrol"}</div>
              <div><CalendarMonth /> {car.year}</div>
              <div><Speed /> {car.transmission ?? "AUTO"}</div>
              <div><Route /> {car.mileage ?? "27K"}</div>
            </div>

            <button
              className="list-book-btn"
              onClick={() =>
                navigate("/booking", {
                  state: { car, pickup, dropoff },
                })
              }
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarsList;
