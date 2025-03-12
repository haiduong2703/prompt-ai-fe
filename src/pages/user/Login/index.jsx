import React, { useState } from "react";
import { Input, Button, Divider, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import "./index.css";
import api from "../../../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  // 🟢 Gửi OTP khi đăng nhập
  const handleSendOtp = async () => {
    if (!email) {
      message.error("Please enter your email");
      return;
    }

    try {
      const response = await api.loginUser(email);
      const data = await response.data;
      if (data.message) {
        message.success("OTP sent to your email");
        setIsOtpSent(true);
      } else {
        message.error("Failed to send OTP");
      }
    } catch (error) {
      console.log(error);
      message.error("Server error, please try again");
    }
  };

  // 🟢 Xác thực OTP và lưu user vào localStorage
  const handleVerifyOtp = async () => {
    if (!otp) {
      message.error("Please enter the OTP code");
      return;
    }

    try {
      const response = await api.verifyLogin(email, otp);

      const data = await response.data;
      if (data) {
        message.success("Login successful!");
        setUser(data.user); // Cập nhật trạng thái người dùng
        if (data.user.role === 2) {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        message.error(data.error || "Invalid OTP");
      }
    } catch (error) {
      message.error("Server error, please try again");
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-form">
        <h2 className="login-page-title">Đăng nhập</h2>
        <p style={{ marginBottom: "40px" }}>
          Nhập địa chỉ email để nhận mã xác thực gồm 6 chữ số
        </p>
        {!isOtpSent ? (
          <>
            <strong>Email đăng nhập</strong>
            <Input
              type="email"
              placeholder="Nhập email đăng nhập của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="primary"
              className="login-page-btn-yellow"
              onClick={handleSendOtp}
            >
              Lấy mã xác thực
            </Button>
          </>
        ) : (
          <>
            <p className="code-message">
              Mã xác thực gồm 6 chữ số đã được gửi đến email của bạn. Nhập nó dưới đây.
            </p>
            <Input
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              type="primary"
              className="login-page-btn-yellow"
              onClick={handleVerifyOtp}
            >
              Xác thực và Đăng nhập
            </Button>
          </>
        )}

        <Divider>Hoặc</Divider>
        <Button className="login-page-btn-yellow">Đăng nhập với mật khẩu</Button>

        <p className="login-page-signup-text">
          Bạn chưa có tài khoản? <Link to="/signup">Đăng ký</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
