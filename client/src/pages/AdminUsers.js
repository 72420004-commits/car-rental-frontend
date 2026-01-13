import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import "../styles/AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [search, setSearch] = useState("");


  /* ===============================
     FETCH USERS
  =============================== */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "http://localhost/car_rental_api/getAllUsers.php"
        );
        const data = await res.json();
        setUsers(data || []);
      } catch {
        alert("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /* ===============================
     UPDATE USER STATUS (CUSTOMERS ONLY)
  =============================== */
  const updateUserStatus = async (user_id, newStatus) => {
    const confirmChange = window.confirm(
      `Are you sure you want to ${
        newStatus === "blocked" ? "block" : "activate"
      } this user?`
    );

    if (!confirmChange) return;

    setUpdatingId(user_id);

    // Optimistic UI update
    setUsers((prev) =>
      prev.map((u) =>
        u.user_id === user_id ? { ...u, status: newStatus } : u
      )
    );

    try {
      const res = await fetch(
        "http://localhost/car_rental_api/updateUserStatus.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id, status: newStatus }),
        }
      );

      const data = await res.json();

      if (data.status !== "success") {
        alert(data.message || "Update failed");
      }
    } catch {
      alert("Server error while updating user");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredUsers = users.filter((user) => {
  const keyword = search.toLowerCase();

  return (
    user.full_name.toLowerCase().includes(keyword) ||
    user.email.toLowerCase().includes(keyword) ||
    user.role.toLowerCase().includes(keyword)
  );
  });


  return (
    <AdminLayout>
   

      <div className="admin-users-container">
        <h1>Manage Users</h1>
           <div className="admin-users-search">
        <input
       type="text"
       placeholder="Search by name, email or role..."
       value={search}
       onChange={(e) => setSearch(e.target.value)}
       />
      </div>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <table className="admin-users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.user_id}>
                    <td>{user.user_id}</td>
                    <td>{user.full_name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>

                    <td>
                      {/* STATUS BADGE */}
                      <span
                        className={`status-badge ${
                          user.status === "blocked"
                            ? "blocked"
                            : "active"
                        }`}
                      >
                        {user.status || "active"}
                      </span>

                      {/* NO DROPDOWN FOR ADMINS */}
                      {user.role !== "admin" ? (
                        <select
                          value={user.status || "active"}
                          disabled={updatingId === user.user_id}
                          onChange={(e) =>
                            updateUserStatus(
                              user.user_id,
                              e.target.value
                            )
                          }
                        >
                          <option value="active">Active</option>
                          <option value="blocked">Blocked</option>
                        </select>
                      ) : (
                        <span className="admin-protected">
                          Admin
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;

