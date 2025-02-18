import React from 'react';
import './Pricing.css'; // Import file CSS

const Pricing = () => {
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
            <img src="/api/placeholder/150/50" alt="Product Hunt" />
            <img src="/api/placeholder/150/50" alt="OpenAI" />
            <img src="/api/placeholder/150/50" alt="Toolify.ai" />
            <img src="/api/placeholder/150/50" alt="There's an AI for that" />
          </div>
        </div>

        <div className="user-pricing-options">
          <button className="user-pricing-btn user-pricing-monthly">
            <span>📅</span> Pay Monthly
          </button>
          <button className="user-pricing-btn user-pricing-lifetime">
            <span>🔍</span> Lifetime Access
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
