import React from "react";
import { Link } from "react-router-dom";
import "./PricingCard.css"; // Import CSS
import xCicle from "../../../../asset/icon/x_circle.svg";
import checkCircle from "../../../../asset/icon/check_circle.svg";
import checkCirclePopular from "../../../../asset/icon/check_circle_popular.svg";
import eclipsePricing from "../../../../asset/imgae/eclipse_pricing_card.png";
const PricingCard = ({ title, price, period, features, buttonText, isPopular }) => {
  return (
    <div className={`pricing-card ${isPopular ? "popular-card" : ""}`}>
      {isPopular && <div className="popular-badge">Most Popular</div>}
      <div className="pricing-card-header">
        <h2 className="pricing-card-title">{title}</h2>
        <p className="pricing-card-price">{price}<span>/{period}</span></p>
        <p className="pricing-card-subtitle">{features.description}</p>
      </div>
      <hr className="pricing-card-divider" />

      <ul className="pricing-card-features">
        {features.items.map((item, index) => (
          <li key={index} className="pricing-card-feature">
            <span className={item.included ? "pricing-card-icon pricing-icon-check" : "pricing-card-icon pricing-icon-cross"}>
              {item.included ? 
                <img src={isPopular ? checkCirclePopular : checkCircle} alt="" /> 
                : <img src={xCicle} alt="" />
              }
            </span>
            {item.text}
          </li>
        ))}
      </ul>
      {buttonText === "Current" || buttonText === "Sign up" ? (
        <Link to={buttonText === "Sign up" ? "/login" : ""}><button className="pricing-card-signup-button" style={{ backgroundColor: "#ffffff" }}>
          {buttonText}
        </button></Link>
      ) : (
        <Link to={buttonText === "Access" ? "" : ""}><button className="pricing-card-access-button" style={{ backgroundColor: "#5700C6" }}>
          {buttonText}
        </button></Link>
      )}
      {isPopular && <img src={eclipsePricing} alt="" className="eclipse-image" />}
    </div>
  );
};

export default PricingCard;
