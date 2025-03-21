import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup"; // Thư viện đếm số
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
  const [prevPrice, setPrevPrice] = useState(price);
  const [triggerCountUp, setTriggerCountUp] = useState(false);
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
        setPrevPrice(priceState);
        setPriceState(res.data.price);
        setTriggerCountUp(true);
      }
    } catch (error) {
      console.error("Error fetching updated price:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (triggerCountUp) {
      const timer = setTimeout(() => {
        setTriggerCountUp(false);
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [triggerCountUp]);

  return (
    <div className={`pricing-card ${isPopular ? "popular-card" : ""}`}>
      {isPopular && <div className="popular-badge">Bán chạy nhất</div>}
      <div className="pricing-card-header">
        <h2 className="pricing-card-title">{title}</h2>
        <p className="pricing-card-price">
          <CountUp
            start={Number(prevPrice)}
            end={Number(priceState)}
            duration={1}
            // Sử dụng formattingFn để định dạng theo kiểu tiền tệ Việt Nam
            formattingFn={(value) =>
              `${parseFloat(value).toLocaleString("vi-VN", { maximumFractionDigits: 0 })}đ`
            }
            // key được thay đổi mỗi khi giá thay đổi để kích hoạt hiệu ứng đếm lại
            key={triggerCountUp ? priceState : prevPrice} // Kích hoạt hiệu ứng khi giá thay đổi bởi switch
            style={{ fontSize: "48px", fontWeight: "700" }}
          />
          <span>/{period}</span>
        </p>
        <p className="pricing-card-subtitle">{features.description}</p>
        <div className="pricing-card-switch">
          <p>
            <span className="discount-text">Giảm 50%</span> khi thanh toán theo năm
          </p>
          <Switch
            checked={durationActive === 2}
            onChange={handleSwitchDuration}
          />
        </div>
      </div>
      <hr className="pricing-card-divider" />

      <ul className="pricing-card-features">
        {features.items.map((item, index) => (
          <li key={index} className="pricing-card-feature">
            <span
              className={
                item.included
                  ? "pricing-card-icon pricing-icon-check"
                  : "pricing-card-icon pricing-icon-cross"
              }
            >
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
      {(buttonText === "Hiện tại" || buttonText === "Mặc định" || buttonText === "Đăng ký")
        && type === 1 ? 
        (<Link to={buttonText === "Đăng ký" ? "/login" : ""}>
          <button
            className="pricing-card-signup-button"
            style={{ backgroundColor: "#ffffff" }}
          >
            {buttonText}
          </button>
        </Link>
        ) : buttonText === "Đăng ký" && type !== 1 ? (
          <Link to={buttonText === "Đăng ký" ? "/login" : ""}>
            <button
              className="pricing-card-access-button"
              style={{ backgroundColor: "#5700C6" }}
            >
              {buttonText}
            </button>
          </Link>
        ) : (
          <Link to={buttonText === "Nâng cấp" ? "" : ""}>
            <button
              className="pricing-card-access-button"
              style={{ backgroundColor: "#5700C6" }}
            >
              {buttonText}
            </button>
          </Link>
        )}
      {isPopular && <img src={eclipsePricing} alt="" className="eclipse-image" />}
    </div>
  );
};

export default PricingCard;
