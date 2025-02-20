import React from "react";
import "./PromptLibrary.css"; // Import file CSS

const PromptLibrary = () => {
  return (
    <div className="user-container">
      {/* Hero Section */}
      <div className="user-hero">
        <div className="user-hero-header">
          <img
            src="/prompts_img.avif"
            alt="God of Prompt Logo"
            className="user-logo-img"
          />
          <div className="user-hero-text">
            <h1>
              The Biggest AI <br />
              <span className="user-highlight-box">Prompt Library</span>
            </h1>
            <div className="user-txt-holder-center">
              <div>by God of Prompt</div>
            </div>
          </div>
          <div className="user-icon-wrapper">
            <img
              src="/promtpts_img_2.avif"
              alt="God of Prompt Logo"
              className="user-logo-img"
            />
          </div>
        </div>
        <div className="user-description">
          Discover the best AI prompts for ChatGPT & Midjourney designed to
          supercharge your business and boost your productivity.
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
