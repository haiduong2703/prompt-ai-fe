import React, { useState } from "react";
import { message } from "antd";
import api from "../../../services/api";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    agreeTerms: false,
  });

  const [loading, setLoading] = useState(false);

  // Xử lý thay đổi giá trị trong form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra điều khoản
    if (!formData.agreeTerms) {
      message.error("Vui lòng đồng ý với điều khoản và điều kiện.");
      return;
    }

    // Kiểm tra dữ liệu
    if (!formData.name || !formData.email || !formData.message) {
      message.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setLoading(true);

    try {
      // Gửi dữ liệu lên server

      const data = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      };
      await api.sendContacts(data);

      // Thông báo thành công
      message.success("Gửi liên hệ thành công!");
      console.log("Done");

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
        agreeTerms: false,
      });
    } catch (error) {
      // Thông báo lỗi
      message.error("Gửi liên hệ thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-image">
          <img src="/contactimg.png" alt="Contact Illustration" />
        </div>

        <div className="contact-form">
          <h1 className="contact-title">
            Contact <br /> <span className="contact-badge">Our Team</span>
          </h1>
          <p className="contact-description">
            We respond in up to 3 business days.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your first name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Write your message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form-terms">
              <input
                type="checkbox"
                id="terms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <label htmlFor="terms"> Terms & Conditions</label>
            </div>

            <button type="submit" className="contact-button" disabled={loading}>
              {loading ? "Đang gửi..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
