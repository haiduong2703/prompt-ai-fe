import React, { useEffect, useState } from "react";
import "./Pricing.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
const PricingCard = ({
  title = "Free",
  price = "$0",
  features,
  buttonText = "Sign Up",
  badge = null,
  className = "",
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (buttonText === "Sign Up") {
      navigate("/signup"); // Điều hướng đến trang đăng ký
    }
  };

  return (
    <div className={`pricing-card ${className}`}>
      <div className="card-header">
        <span className="title">{title}</span>
        {badge && (
          <span className={`badge ${badge.toLowerCase()}`}>{badge}</span>
        )}
      </div>
      <div className="price">{price}</div>
      <button
        className={`btn ${
          buttonText === "Sign Up" ? "btn-black" : "btn-yellow"
        }`}
        onClick={handleClick}
      >
        {buttonText}
      </button>
      {features && (
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: features }}
        />
      )}
    </div>
  );
};

const PricingSection = () => {
  const [plans, setPlans] = useState([]); // State để lưu dữ liệu từ API
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading
  const [error, setError] = useState(null); // State để quản lý lỗi
  const [duration, setDuration] = useState(1); // State để lưu giá trị duration (1: Pay Monthly, 2: Lifetime Access)

  // Fetch dữ liệu từ API dựa trên duration
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getSubDuration(duration);
        setPlans(response.data); // Lưu dữ liệu vào state
        setLoading(false); // Tắt trạng thái loading
      } catch (error) {
        setError(error.message); // Lưu thông báo lỗi
        setLoading(false); // Tắt trạng thái loading
      }
    };
    fetchData();
  }, [duration]); // Gọi lại khi duration thay đổi

  // Xử lý khi nhấn nút Pay Monthly
  const handlePayMonthly = () => {
    setDuration(1); // Cập nhật duration = 1
  };

  // Xử lý khi nhấn nút Lifetime Access
  const handleLifetimeAccess = () => {
    setDuration(2); // Cập nhật duration = 2
  };

  // Hiển thị loading hoặc lỗi nếu có
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="user-pricing-container">
      <div className="user-pricing-header">
        <div className="user-pricing-title">
          <span className="user-pricing-icon">🔑</span>
          <h1>Give Your Business AI Superpowers</h1>
        </div>

        <div className="user-pricing-featured">
          <h2>FEATURED ON</h2>
          <div className="user-pricing-logos">
            <img
              src="https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/673b7e007c97e1f2908d848c_Product%20Remove%20Background.png"
              alt="Product Hunt"
            />
            <img
              src="https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/673b7df4d3372486acd7af6a_Open%20AI%20Remove%20Background.png"
              alt="OpenAI"
            />
            <img
              src="https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/66c5f52ba0102ad78be65b99_logo.webp"
              alt="Toolify.ai"
            />
            <img
              src="https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/660fad111929536638c653a6_theresanaiforthat_logo.avif"
              alt="There's an AI for that"
            />
          </div>
        </div>

        <div className="user-pricing-options">
          <button
            className={`user-pricing-btn ${
              duration === 1
                ? "user-pricing-lifetime"
                : "user-pricing-lifetime-active"
            }`}
            onClick={handlePayMonthly}
          >
            <span>📅</span> Pay Monthly
          </button>
          <button
            className={`user-pricing-btn ${
              duration === 2
                ? "user-pricing-lifetime"
                : "user-pricing-lifetime-active"
            }`}
            onClick={handleLifetimeAccess}
          >
            <span>🔍</span> Lifetime Access
          </button>
        </div>
      </div>
      <div className="pricing-container">
        {plans.map((plan, index) => (
          <PricingCard
            key={index}
            title={plan.name_sub}
            price={`$${plan.price}`}
            features={plan.description} // Giả sử description là chuỗi các tính năng phân cách bằng dấu phẩy
            buttonText={plan.type === 1 ? "Sign Up" : "Get Access"}
            badge={plan.type === 2 ? "Premium" : null}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
