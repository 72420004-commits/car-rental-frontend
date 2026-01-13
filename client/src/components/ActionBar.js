import React from 'react';
import "../styles/ActionBar.css";

function ActionBar() {
  return (
    <div className="action-bar">
      <button className="login-btn">Login</button>
      <button className="signup-btn">Sign Up</button>
    </div>
  );
}

export default ActionBar;