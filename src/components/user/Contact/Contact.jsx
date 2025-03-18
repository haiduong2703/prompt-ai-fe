import React from "react";
import "./Contact.css";
import astronautImage from "../../../asset/imgae/imgcontact.png"; // Thay bằng đường dẫn ảnh thực tế

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-left">
        <img src={astronautImage} alt="Astronaut" className="astronaut-image" />
      </div>
      <div className="contact-right">
        <div className="contact-header">
          <h1>Get in touch with us.</h1>
          <p>
            We're here to assist you. Please contact us by filling in the form
            below and specify what you need, and we will respond as soon as
            possible.
          </p>
        </div>
        <form className="contact-form">
          <div className="form-group">
            <label>Your Name</label>
            <input type="text" className="underline-input" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" className="underline-input" />
          </div>
          <div className="form-group">
            <label>Phone Number (optional)</label>
            <input type="tel" className="underline-input" />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea className="underline-textarea"></textarea>
          </div>
          <button type="submit" className="submit-button">
            Leave us a Message <span>→</span>
          </button>
        </form>
        <div className="contact-info">
          <h2>CONTACT INFO</h2>
          <p>We are always happy to assist you</p>
          <div className="info-grid">
            <div className="info-column">
              <h3>Email Address</h3>
              <p>—</p>
              <p>help@info.com</p>
              <p>Assistance hours:</p>
              <p>Monday - Friday 6AM - 8PM EST</p>
            </div>
            <div className="info-column">
              <h3>Phone Number</h3>
              <p>—</p>
              <p>(808) 999-34256</p>
              <p>Assistance hours:</p>
              <p>Monday - Friday 6 am to 8 pm EST</p>
            </div>
            <div className="info-column">
              <h3>Discord</h3>
              <p>—</p>
              <p>Prom-io</p>
              <p>Assistance hours:</p>
              <p>Monday - Friday 6 am to 8 pm EST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
