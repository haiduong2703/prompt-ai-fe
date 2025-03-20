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
          Liên hệ với chúng tôi.
          <br />
          Chúng tôi ở đây để hỗ trợ bạn.
        </h1>
        <p>
          Vui lòng liên hệ với chung tôi bằng cách điền vào biểu mẫu bên dưới và
          nêu rõ nhu cầu của bạn, chúng tôi sẽ phản hồi sớm nhất có thể.
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
                <label>Tên</label>
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
                <label>Email</label>
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
                <label>Số điện thoại (Không bắt buộc)</label>
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
              <label>Nội dung</label>
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
              {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"} <span>→</span>
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
        <h2 style={{ fontSize: "20px" }}>THÔNG TIN LIÊN HỆ</h2>
        <div className="contact-info-content">
          <h2>Chúng tôi luôn sẵn sàng hỗ trợ bạn</h2>
          <div className="info-grid">
            <div className="info-column">
              <h3>Địa chỉ Email</h3>
              <p>—</p>
              <p>help@info.com</p>
              <p>Giờ hỗ trợ:</p>
              <p>Thứ Hai - Thứ Sáu, 6h sáng - 8h tối (EST)</p>
            </div>
            <div className="info-column">
              <h3>Số Điện Thoại</h3>
              <p>—</p>
              <p>(808) 999-34256</p>
              <p>Giờ hỗ trợ:</p>
              <p>Thứ Hai - Thứ Sáu, 6h sáng - 8h tối (EST)</p>
            </div>
            <div className="info-column">
              <h3>Discord</h3>
              <p>—</p>
              <p>Prom-io</p>
              <p>Giờ hỗ trợ:</p>
              <p>Thứ Hai - Thứ Sáu, 6h sáng - 8h tối (EST)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
