import React, { useState } from "react";
import { Input, Button, Divider, Checkbox, message } from "antd";
import "./index.css";
import api from "../../../services/api";
import { Link } from "react-router-dom";
const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // 🟢 Xử lý đăng ký & gửi OTP
  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      message.error("Please fill in all fields");
      return;
    }

    try {
      const response = await api.registerUser(fullName, email, password);

      const data = await response.data;
      if (data) {
        message.success("OTP sent to your email");
        setIsOtpSent(true);
      } else {
        message.error(data.error || "Registration failed");
      }
    } catch (error) {
      message.error("Server error, please try again");
    }
  };

  // 🟢 Xử lý xác thực OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      message.error("Please enter the OTP code");
      return;
    }

    try {
      const response = await api.verifyOTP(email, otp);

      const data = await response.data;
      if (data) {
        message.success("Account verified successfully");
        setIsVerified(true);
      } else {
        message.error(data.error || "Invalid OTP");
      }
    } catch (error) {
      console.log(error);
      message.error("Server error, please try again");
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-page-form">
        <h2 className="register-page-title">Đăng ký</h2>

        {/* Hiển thị form đăng ký nếu chưa gửi OTP */}
        {!isOtpSent && (
          <>
            <strong>Tên hiển thị</strong>
            <Input
              style={{ marginBottom: "20px", padding: "10px 15px" }}
              type="text"
              placeholder="Nhập tên của bạn"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <strong>Email đăng nhập</strong>
            <Input
              style={{ marginBottom: "20px", padding: "10px 15px" }}
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <strong>Mật khẩu</strong>
            <Input.Password
              style={{ marginBottom: "20px", padding: "10px 15px" }}
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="checkbox-item">
              <Checkbox />
              <span>Ghi nhớ mật khẩu</span>
            </div>
            {/* <div className="checkbox-item">
              <Checkbox />
              <span>
                I agree to the <a href="#">Terms of Use & Privacy Policy</a>.
              </span>
            </div>
            <div className="checkbox-item">
              <Checkbox />
              <span>Send me product updates & newsletters</span>
            </div> */}
            <Button
              type="primary"
              className="register-page-btn-yellow"
              onClick={handleRegister}
            >
              Tiếp tục
            </Button>
          </>
        )}

        {/* Hiển thị ô nhập OTP nếu đã gửi */}
        {isOtpSent && !isVerified && (
          <>
            <strong>Nhập mã xác thực OTP</strong>
            <Input
              type="text"
              placeholder="Enter OTP sent to your email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              type="primary"
              className="register-page-btn-yellow"
              onClick={handleVerifyOtp}
            >
              Xác thực OTP
            </Button>
          </>
        )}

        {/* Hiển thị thông báo khi xác thực thành công */}
        {isVerified && (
          <>
            <p style={{ color: "green", fontWeight: "bold" }}>
              🎉 Bạn đã đăng ký thành công! <a href="/login">Đăng nhập</a>.
            </p>
          </>
        )}

        <Divider>Hoặc</Divider>
        <p className="register-page-signin-text">
          Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
