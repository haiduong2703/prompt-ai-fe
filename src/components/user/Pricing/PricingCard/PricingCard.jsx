import React from "react";
import { Link } from "react-router-dom";
import "./PricingCard.css"; // Import CSS
import xCicle from "../../../../asset/icon/x_circle.svg";
import checkCircle from "../../../../asset/icon/check_circle.svg"
const PricingCard = ({ title, price, period, features, buttonText, isPopular }) => {
  const computedHighlightColor = buttonText === "Current" ? "#ffffff" : "#5700C6";
  return (
    <div className={`pricing-card ${isPopular ? "popular-card" : ""}`}>
      {isPopular && <div className="popular-badge">Most Popular</div>}
      <h2 className="pricing-card-title">{title}</h2>
      <p className="pricing-card-price">{price}<span>/{period}</span></p>
      <p className="pricing-card-subtitle">{features.description}</p>
      <hr className="pricing-card-divider" />

      <ul className="pricing-card-features">
        {features.items.map((item, index) => (
          <li key={index} className="pricing-card-feature">
            <span className={item.included ? "pricing-card-icon pricing-icon-check" : "pricing-card-icon pricing-icon-cross"}>
              {item.included ? <img src={checkCircle} alt="" /> : <img src={xCicle} alt="" />}
            </span>
            {item.text}
          </li>
        ))}
      </ul>
      {buttonText === "Current" || buttonText === "Sign up" ? (
        <Link to={buttonText === "Sign up" ? "/login" : ""}><button className="pricing-card-signup-button" style={{ backgroundColor: computedHighlightColor }}>
          {buttonText}
        </button></Link>
      ) : (
        <button className="pricing-card-access-button" style={{ backgroundColor: computedHighlightColor }}>
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default PricingCard;
