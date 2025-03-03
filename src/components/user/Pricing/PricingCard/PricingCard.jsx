import React from "react";
import { Link } from "react-router-dom";
import "./PricingCard.css"; // Import CSS

const PricingCard = ({ title, price, period, features, buttonText, highlightColor, isPopular }) => {
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
              {item.included ? "✔" : "✖"}
            </span> 
            {item.text}
          </li>
        ))}
      </ul>
      {title === "Free" ? (
        <button className="pricing-card-signup-button" style={{ backgroundColor: highlightColor }}>
          {buttonText}
        </button>
      ) : (
        <button className="pricing-card-access-button" style={{ backgroundColor: highlightColor }}>
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default PricingCard;
