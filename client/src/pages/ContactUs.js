import React, { useState } from "react";
import "../styles/ContactUs.css";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import contactImg from "../assets/ContactUs.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactUs = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!fullName || !email || !subject || !message) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost/car_rental_api/submitReport.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: fullName,
            email,
            subject,
            message,
          }),
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        alert("Message sent successfully 📩");

        // reset fields
        setFullName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        alert(data.message || "Failed to send message");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="contact-container">
        {/* HEADER */}
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-sub">
          We’re here to help you with any questions about our cars, reservations,
          or services.
        </p>

        {/* INFO CARDS */}
        <div className="contact-info">
          <div className="info-card">
            <PhoneIcon className="info-icon" />
            <h3>Phone</h3>
            <p>+961 76 575 289</p>
          </div>

          <div className="info-card">
            <EmailIcon className="info-icon" />
            <h3>Email</h3>
            <p>support@smartcarrental.com</p>
          </div>

          <div className="info-card">
            <LocationOnIcon className="info-icon" />
            <h3>Location</h3>
            <p>Tyre, Lebanon</p>
          </div>
        </div>

        {/* IMAGE + FORM */}
        <div className="contact-row">
          <div className="contact-image-wrapper">
            <img src={contactImg} alt="Contact" className="contact-image" />
          </div>

          <div className="form-card side-form">
            <h2>Send Us a Message</h2>

            {/* ❌ NO <form> SUBMIT */}
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <textarea
              placeholder="Your Message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            {/* ✅ BUTTON ONLY */}
            <button type="button" onClick={handleSend}>
              Send Message
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactUs;
