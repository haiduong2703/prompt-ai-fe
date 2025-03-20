import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PricingCard.css"; // Import CSS
import xCicle from "../../../../asset/icon/x_circle.svg";
import checkCircle from "../../../../asset/icon/check_circle.svg";
import checkCirclePopular from "../../../../asset/icon/check_circle_popular.svg";
import eclipsePricing from "../../../../asset/imgae/eclipse_pricing_card.png";
import api from "../../../../services/api";
import { Switch } from "antd";

const PricingCard = ({ id, type, title, price, period, features, buttonText, isPopular }) => {
  const [durationActive, setDurationActive] = useState(1);
  const [priceState, setPriceState] = useState(price);
  const [isFetching, setIsFetching] = useState(false);

  const handleSwitchDuration = async (checked) => {
    const newDuration = checked ? 2 : 1;
    setDurationActive(newDuration);

    // Nếu đang gọi API thì không gọi lại
    if (isFetching) return;

    setIsFetching(true); // Đánh dấu đang gọi API
    try {
      const res = await api.getSubByDurationAndType(newDuration, type);
      if (res && res.data) {
        setPriceState(res.data.price);
      }
    } catch (error) {
      console.error("Error fetching updated price:", error);
    } finally {
      setIsFetching(false); // Sau khi gọi API xong, đặt lại trạng thái fetching
    }
  };

  return (
    <div className={`pricing-card ${isPopular ? "popular-card" : ""}`}>
      {isPopular && <div className="popular-badge">Most Popular</div>}
      <div className="pricing-card-header">
        <h2 className="pricing-card-title">{title}</h2>
        <p className="pricing-card-price">
          {`${parseFloat(priceState).toLocaleString("vi-VN", { maximumFractionDigits: 0 })}đ`}<span>/{period}</span>
        </p>
        <p className="pricing-card-subtitle">{features.description}</p>
        <div className="pricing-card-switch">
          <p><span className="discount-text">Giảm 33%</span> khi thanh toán theo năm</p>
          <Switch
            checked={durationActive === 2}
            onChange={handleSwitchDuration} // Call the function when the switch is toggled
          />
        </div>
      </div>
      <hr className="pricing-card-divider" />

      <ul className="pricing-card-features">
        {features.items.map((item, index) => (
          <li key={index} className="pricing-card-feature">
            <span className={item.included ? "pricing-card-icon pricing-icon-check" : "pricing-card-icon pricing-icon-cross"}>
              {item.included ? (
                <img src={isPopular ? checkCirclePopular : checkCircle} alt="" />
              ) : (
                <img src={xCicle} alt="" />
              )}
            </span>
            {item.text}
          </li>
        ))}
      </ul>
      {buttonText === "Current" || buttonText === "Sign up" ? (
        <Link to={buttonText === "Sign up" ? "/login" : ""}>
          <button className="pricing-card-signup-button" style={{ backgroundColor: "#ffffff" }}>
            {buttonText}
          </button>
        </Link>
      ) : (
        <Link to={buttonText === "Access" ? "" : ""}>
          <button className="pricing-card-access-button" style={{ backgroundColor: "#5700C6" }}>
            {buttonText}
          </button>
        </Link>
      )}
      {isPopular && <img src={eclipsePricing} alt="" className="eclipse-image" />}
    </div>
  );
};

export default PricingCard;
