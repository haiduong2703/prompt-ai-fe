import React, { useState } from "react";
import "./Contact.css";
import astronautImage from "../../../asset/imgae/imgcontact.png";
import api from "../../../services/api";
const Contact = () => {
  // State để quản lý dữ liệu form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // State để quản lý trạng thái gửi form
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    await api
      .sendContacts({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      })
      .then((response) => {
        if (response) {
          setSubmitStatus("success");
          // Reset form sau khi gửi thành công
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        }
      })
      .catch((error) => {
        setSubmitStatus("error");
        console.error("Error submitting contact form:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="contact-container-box">
      <div className="contact-header">
        <h1>
          Get in touch with us.
          <br />
          We're here to assist you.
        </h1>
        <p>
          We're here to assist you. Please contact us by filling in the form
          below and specify what you need, and we will respond as soon as
          possible.
        </p>
      </div>
      <div className="contact-container">
        <div className="contact-left">
          <img
            src={astronautImage}
            alt="Astronaut"
            className="astronaut-image-contact"
          />
        </div>
        <div className="contact-right">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group-contact">
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="underline-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="underline-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number (optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="underline-input"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="underline-textarea"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Leave us a Message"}{" "}
              <span>→</span>
            </button>
            {submitStatus === "success" && (
              <p className="success-message">
                Đã gửi tin nhắn thành công! Chúng tôi sẽ sớm phản hồi bạn.
              </p>
            )}
            {submitStatus === "error" && (
              <p className="error-message">
                Gửi tin nhắn thất bại. Vui lòng thử lại sau.
              </p>
            )}
          </form>
        </div>
      </div>
      <div className="contact-info">
        <h2 style={{ fontSize: "20px" }}>CONTACT INFO</h2>
        <div className="contact-info-content">
          <h2>We are always happy to assist you</h2>
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
