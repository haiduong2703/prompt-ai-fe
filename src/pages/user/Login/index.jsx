import React, { useState, useEffect } from "react";
import { Input, Button, Divider, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import "./index.css";
import api from "../../../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [usePassword, setUsePassword] = useState(false);
  const [userIP, setUserIP] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  useEffect(() => {
    const getUserIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setUserIP(data.ip);
      } catch (error) {
        console.error("Could not get IP address:", error);
        setUserIP("");
      }
    };
    getUserIP();
  }, []);

  // Gửi OTP
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
      }
    } catch (error) {
      console.log(error);
      message.error("Server error, please try again");
    }
  };

  // Xác thực OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      message.error("Please enter the OTP code");
      return;
    }
    try {
      const response = await api.verifyLogin(email, otp, userIP);
      const data = await response.data;
      if (data) {
        message.success("Login successful!");
        login(data.user, data.token);
        navigate(data.user.role === 2 ? "/admin" : "/home");
      }
    } catch (error) {
      message.error("Server error, please try again");
    }
  };

  // Đăng nhập bằng mật khẩu
  const handlePasswordLogin = async () => {
    if (!email || !password) {
      message.error("Vui lòng nhập email và mật khẩu");
      return;
    }
    try {
      const response = await api.passwordLogin(email, password, userIP);
      const data = await response.data;
      if (data) {
        message.success("Đăng nhập thành công!");
        login(data.user, data.token);
        navigate(data.user.role === 2 ? "/admin" : "/home");
      }
    } catch (error) {
      message.error(
        error.response?.data?.error || "Lỗi server, vui lòng thử lại"
      );
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-form">
        <h2 className="login-page-title">Đăng nhập</h2>

        {!usePassword ? (
          <>
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
                  Mã xác thực gồm 6 chữ số đã được gửi đến email của bạn.
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
          </>
        ) : (
          <>
            <p style={{ marginBottom: "40px" }}>
              Nhập email và mật khẩu để đăng nhập
            </p>
            <strong>Email đăng nhập</strong>
            <Input
              type="email"
              placeholder="Nhập email đăng nhập của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <strong>Mật khẩu</strong>
            <Input.Password
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="primary"
              className="login-page-btn-yellow"
              onClick={handlePasswordLogin}
            >
              Đăng nhập
            </Button>
          </>
        )}

        <Divider>Hoặc</Divider>
        <Button
          className="login-page-btn-yellow"
          onClick={() => {
            setUsePassword(!usePassword);
            setIsOtpSent(false);
          }}
        >
          {usePassword ? "Đăng nhập với OTP" : "Đăng nhập với mật khẩu"}
        </Button>

        <p className="login-page-signup-text">
          Bạn chưa có tài khoản? <Link to="/signup">Đăng ký</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
