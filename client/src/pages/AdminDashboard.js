import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import "../styles/AdminDashboard.css";

/* 📊 Charts */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const COLORS = ["#3498db", "#2ecc71", "#e74c3c"];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  /* 🔐 Check login + admin role */
  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      navigate("/login");
      return;
    }

    const parsed = JSON.parse(stored);

    if (parsed.role !== "admin") {
      navigate("/dashboard");
      return;
    }

    setUser(parsed);
  }, [navigate]);

  /* 📊 Fetch admin statistics */
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "http://localhost/car_rental_api/adminStats.php"
        );
        const data = await res.json();

        if (data.status === "success") {
          setStats(data.stats);
        }
      } catch (err) {
        console.error("Error fetching admin stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [location.pathname]);

  if (!user) return null;

  /* ===============================
     DATA PREPARATION
  =============================== */

  const carStatusData = [
    { name: "Available", value: stats?.available_cars ?? 0 },
    { name: "Maintenance", value: stats?.maintenance_cars ?? 0 },
    { name: "Deleted", value: stats?.deleted_cars ?? 0 },
  ];

  const userReservationData = [
    { name: "Customers", value: stats?.total_customers ?? 0 },
    { name: "Admins", value: stats?.total_admins ?? 0 },
    { name: "Reservations", value: stats?.total_reservations ?? 0 },
  ];

  const monthlyRevenueData = stats?.monthly_revenue ?? [];

  const avgRevenue =
    stats && stats.total_reservations > 0
      ? (stats.total_revenue / stats.total_reservations).toFixed(2)
      : 0;

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>

        <button
          className="admin-home-btn"
          onClick={() => navigate("/")}
        >
          View User Website
        </button>
      </div>

      <p className="admin-welcome">
        Welcome, <strong>{user.name}</strong>
      </p>

      {loading && <p className="admin-loading">Loading dashboard...</p>}

      {!loading && stats && (
        <>
          {/* ===============================
              STAT CARDS
          =============================== */}
          <div className="admin-stats">
            <div className="stat-card">
              <h3>Cars Overview</h3>
              <p><strong>Total:</strong> {stats.total_cars}</p>
              <p><strong>Available:</strong> {stats.available_cars ?? 0}</p>
              <p><strong>Deleted:</strong> {stats.deleted_cars ?? 0}</p>
            </div>

            <div className="stat-card">
              <h3>Total Reservations</h3>
              <p>{stats.total_reservations}</p>
            </div>

            <div className="stat-card">
              <h3>Total Users</h3>
              <p>{stats.total_customers + stats.total_admins}</p>
            </div>

            <div className="stat-card revenue">
              <h3>Total Revenue</h3>
              <p>${stats.total_revenue ?? 0}</p>
            </div>

            <div className="stat-card">
              <h3>Revenue Insights</h3>
              <p><strong>Total:</strong> ${stats.total_revenue ?? 0}</p>
              <p><strong>Avg / Reservation:</strong> ${avgRevenue}</p>
            </div>
          </div>

          {/* ===============================
              CHARTS
          =============================== */}
          <div className="admin-charts">
            {/* BAR CHART */}
            <div className="chart-box">
              <h3>Cars Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={carStatusData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3498db" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* PIE CHART */}
            <div className="chart-box">
              <h3>Users & Reservations</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userReservationData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {userReservationData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* LINE CHART – MONTHLY REVENUE */}
            <div className="chart-box">
              <h3>Monthly Revenue</h3>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3498db"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ===============================
              ACTION CARDS
          =============================== */}
          <div className="admin-cards">
            <div className="admin-card">
              <h3>Cars</h3>
              <p>View, add, edit and remove cars.</p>
              <button onClick={() => navigate("/admin/cars")}>
                Manage Cars
              </button>
            </div>

            <div className="admin-card">
              <h3>Reservations</h3>
              <p>View all bookings and revenue.</p>
              <button onClick={() => navigate("/admin/bookings")}>
                View Reservations
              </button>
            </div>

            <div className="admin-card">
              <h3>Users</h3>
              <p>Manage customers and admin accounts.</p>
              <button onClick={() => navigate("/admin/users")}>
                Manage Users
              </button>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
