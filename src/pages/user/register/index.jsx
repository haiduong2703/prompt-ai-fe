import React, { useState } from "react";
import { Input, Button, Divider, Checkbox, message } from "antd";
import "./index.css";
import api from "../../../services/api";

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

      const data = await response.json();
      if (response.ok) {
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
      const response = await api.verifyLogin(email, otp);

      const data = await response.json();
      if (response.ok) {
        message.success("Account verified successfully");
        setIsVerified(true);
      } else {
        message.error(data.error || "Invalid OTP");
      }
    } catch (error) {
      message.error("Server error, please try again");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image">
        <img
          src="https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/675f4b4479874b35a71a514f_Login%20God-p-800.avif"
          alt="Register Illustration"
        />
      </div>

      <div className="auth-form">
        <h2 className="auth-title">Create an Account</h2>
        <p style={{ marginBottom: "20px" }}>
          Please complete the form below to create your account.
        </p>

        {/* Hiển thị form đăng ký nếu chưa gửi OTP */}
        {!isOtpSent && (
          <>
            <strong>Full Name*</strong>
            <Input
              style={{ marginTop: "10px", marginBottom: "20px" }}
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <strong>Email Address*</strong>
            <Input
              style={{ marginTop: "10px", marginBottom: "20px" }}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <strong>Password*</strong>
            <Input.Password
              style={{ marginTop: "10px", marginBottom: "20px" }}
              placeholder="Create your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="checkbox-item">
              <Checkbox />
              <span>
                I agree to the <a href="#">Terms of Use & Privacy Policy</a>.
              </span>
            </div>
            <div className="checkbox-item">
              <Checkbox />
              <span>Send me product updates & newsletters</span>
            </div>
            <Button
              type="primary"
              className="btn-yellow"
              onClick={handleRegister}
            >
              Continue
            </Button>
          </>
        )}

        {/* Hiển thị ô nhập OTP nếu đã gửi */}
        {isOtpSent && !isVerified && (
          <>
            <strong>Enter OTP Code*</strong>
            <Input
              type="text"
              placeholder="Enter OTP sent to your email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              type="primary"
              className="btn-yellow"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </Button>
          </>
        )}

        {/* Hiển thị thông báo khi xác thực thành công */}
        {isVerified && (
          <>
            <p style={{ color: "green", fontWeight: "bold" }}>
              🎉 Account verified! You can now <a href="/login">Login here</a>.
            </p>
          </>
        )}

        <Divider>OR</Divider>
        <p className="signin-text">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
