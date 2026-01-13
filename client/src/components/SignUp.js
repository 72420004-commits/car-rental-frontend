import React, { useState } from "react";
import "../styles/SignUp.css";
import registerImg from "../assets/register.jpg";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !password) {
      setMessage("All fields are required");
      return;
    }

    if (password !== confirm) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost/car_rental_api/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          password
        }),
      });

      const data = await res.json();

      if (data.status === "success") {
        navigate("/login");
      } else {
        setMessage(data.message || "Server error");
      }
    } catch (error) {
      setMessage("Connection failed");
    }
  };

  return (
    <div className="register-container">

      {/* LEFT IMAGE */}
      <div
        className="left-side"
        style={{ backgroundImage: `url(${registerImg})` }}
      ></div>

      {/* RIGHT FORM */}
      <div className="right-side">

        {/* Back Button */}
        <p className="back-link" onClick={() => navigate("/")}>
          ← Back to Home
        </p>

        <div className="form-card">
          <h2>Create Account</h2>

          {message && <p className="error-msg">{message}</p>}

          <form onSubmit={handleRegister}>
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="password" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />

            <button type="submit">Register</button>
          </form>

          {/* Login Link */}
          <p className="login-link">
            Already have an account?
            <span className="login-text" onClick={() => navigate("/login")}>
            Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
