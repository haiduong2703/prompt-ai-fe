import React from 'react';
import './PromptLibrary.css'; // Import file CSS

// Custom Lightning SVG component
const LightningIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="user-icon"
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const PromptLibrary = () => {
  return (
    <div className="user-container">

      {/* Hero Section */}
      <div className="user-hero">
        <div className="user-hero-header">
          <img src="/api/placeholder/96/96" alt="God of Prompt Logo" className="user-logo-img"/>
          <div className="user-icon-wrapper">
            <LightningIcon />
          </div>
        </div>

        <div className="user-hero-text">
          <h1>
            The Biggest AI
            <div className="user-highlight-box">Prompt Library</div>
          </h1>
          <p>by God of Prompt</p>
          <p className="user-description">
            Discover the best AI prompts for ChatGPT & Midjourney designed
            to supercharge your business and boost your productivity.
          </p>
        </div>

        {/* AI Tools */}
        <div className="user-ai-tools">
          <div className="user-tool">
            <img src="/api/placeholder/24/24" alt="ChatGPT Logo" />
            <span>ChatGPT</span>
          </div>
          <div className="user-tool">
            <img src="/api/placeholder/24/24" alt="Midjourney Logo" />
            <span>Midjourney</span>
          </div>
        </div>

        {/* Categories Section */}
        <div className="user-categories">
          <h2>Prompt Library Categories:</h2>
          <div className="user-category-grid">
            <div className="user-category-card">
              <span>📈</span>
              <h3>Sales</h3>
              <span className="user-badge">New</span>
            </div>
            <div className="user-category-card">
              <span>📚</span>
              <h3>Education</h3>
              <span className="user-badge">New</span>
            </div>
            <div className="user-category-card">
              <span>📢</span>
              <h3>Marketing</h3>
            </div>
          </div>
        </div>

        {/* Custom Prompt Button */}
        <div className="user-float-button">
          <button>
            <span>✨</span>
            Custom Prompt?
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptLibrary;
