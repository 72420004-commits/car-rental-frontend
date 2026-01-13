import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLayout.css";

// MUI Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleIcon from "@mui/icons-material/People";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">Admin Panel</h2>

        <nav className="admin-nav">
          <button onClick={() => navigate("/admin")} className="side-btn">
            <DashboardIcon />
            <span>Dashboard</span>
          </button>

          <button onClick={() => navigate("/admin/cars")} className="side-btn">
            <DirectionsCarIcon />
            <span>Cars</span>
          </button>

          <button onClick={() => navigate("/admin/users")} className="side-btn">
            <PeopleIcon />
            <span>Users</span>
          </button>

          <button
            onClick={() => navigate("/admin/bookings")}
            className="side-btn"
          >
            <BookOnlineIcon />
            <span>Bookings</span>
          </button>

          <button
            onClick={() => navigate("/admin/reports")}
            className="side-btn"
          >
            <AssessmentIcon />
            <span>Reports</span>
          </button>
        </nav>

        <button className="side-btn-logout" onClick={handleLogout}>
          <LogoutIcon />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">{children}</main>
    </div>
  );
};

export default AdminLayout;
