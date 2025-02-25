import React, { useState } from "react";
import { Input, Button, Divider, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/AuthContext";
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
    <div className="login-container">
      <div className="login-image">
        <img
          src="https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/675f4b4479874b35a71a514f_Login%20God-p-800.avif"
          alt="Login Illustration"
        />
      </div>

      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <p style={{ marginBottom: "20px" }}>
          Enter your email and receive a 6-digit code to login.
        </p>

        {!isOtpSent ? (
          <>
            <strong>Email Address*</strong>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="primary"
              className="btn-yellow"
              onClick={handleSendOtp}
            >
              Get Confirmation Code
            </Button>
          </>
        ) : (
          <>
            <p className="code-message">
              A 6-digit code has been sent to your email. Enter it below.
            </p>
            <Input
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              type="primary"
              className="btn-yellow"
              onClick={handleVerifyOtp}
            >
              Verify & Login
            </Button>
          </>
        )}

        <Divider>OR</Divider>
        <Button className="btn-yellow">Login with Password</Button>

        <p className="signup-text">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
