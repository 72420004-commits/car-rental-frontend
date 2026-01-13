import React, { useState } from "react";
import "../styles/LogIn.css";
import loginImg from "../assets/login.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLoginClick = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://mycarrental.xo.je/car_rental_api/login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/AvailableCars");
        }
      } else {
        setMsg(data.message);
      }
    } catch (err) {
      setMsg("Server unreachable");
    }
  };

  return (
    <div className="login-container">
      {/* LEFT IMAGE */}
      <div
        className="left-side"
        style={{ backgroundImage: `url(${loginImg})` }}
      ></div>

      {/* RIGHT SIDE */}
      <div className="right-side">
        {/* Back Button */}
        <p className="back-link" onClick={() => navigate("/")}>
          ← Back to Home
        </p>

        <div className="form-card">
          <h2>Login</h2>

          {msg && <p className="error-msg">{msg}</p>}

          <form>
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" onClick={handleLoginClick}>
              Login
            </button>
          </form>

          {/* Create Account Link */}
          <div className="signup-inline">
            <span>Don’t have an account?</span>
            <span className="create-text" onClick={() => navigate("/signup")}>
              Create Account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
