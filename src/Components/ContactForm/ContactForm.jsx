/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import z414 from '../../assets/z414new.png'
import z324 from '../../assets/z324new.png'

import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      // Send form data using Formspree
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset(); // Reset the form after submission
        
        setTimeout(() => {
          setSubmitted(false); // Show the form again
        }, 4000); // 4000 ms = 4 seconds
      } else {
        console.error("Form submission failed:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="contact-container">
      <div className="corner-image lower-middle-right">
        <img src={z414} alt="Middle Right" className="side-image"/>
      </div>
      <div className="corner-image bottom-left">
        <img src={z324} alt="Top Left" className="side-image" />
      </div>
      <div className="form-wrapper">
        <h2>CONTACT RAY</h2>
        {submitted ? (
          <div className="confirmation-message">
            <p>Thank you for your message! I'll get back to you soon.</p>
          </div>
        ) : (
          <form
            className="contact-form"
            action="https://formspree.io/f/mpwanjjz"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="input-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ray Omiyi"
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="monad@gmoyaki.com"
              />
            </div>
            <div className="input-group">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
                placeholder="Tell us what's on your mind..."
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
