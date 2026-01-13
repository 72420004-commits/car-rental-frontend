import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import "../styles/AdminReports.css";

const AdminReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const res = await fetch(
        "http://localhost/car_rental_api/getReports.php"
      );
      const data = await res.json();

      if (data.status === "success") {
        setReports(data.reports);
      }
    };

    fetchReports();
  }, []);

  return (
    <AdminLayout>
      <h1>Reports</h1>

      {reports.length === 0 ? (
        <p>No reports received.</p>
      ) : (
        <table className="admin-reports-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((r) => (
              <tr key={r.report_id}>
                <td>{r.report_id}</td>
                <td>{r.full_name}</td>
                <td>{r.email}</td>
                <td>{r.subject}</td>
                <td>{r.message}</td>
                <td>{r.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
};

export default AdminReports;
