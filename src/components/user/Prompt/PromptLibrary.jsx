import React, { useEffect, useState } from "react";
import "./PromptLibrary.css";
import api from "../../../services/api";
import CategoryCard from "../CategoryCard/CategoryCard";
import FAQSection from "../Q&A/FAQSection";
const PromptLibrary = () => {
  const [sections, setSections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const response = await api.getSections();
      setSections(response.data);
      if (response.data.length > 0) {
        setActiveSection(response.data[0]);
        fetchCategories(response.data[0].id);
      }
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  const fetchCategories = async (id) => {
    try {
      const response = await api.getCategoriesBySection(id);
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  return (
    <div className="user-container">
      <div className="user-hero">
        <div className="user-hero-header">
          <img src="/prompts_img.avif" alt="God of Prompt Logo" className="user-logo-img" />
          <div className="user-hero-text">
            <h1>
              The Biggest AI <br />
              <span className="user-highlight-box">Prompt Library</span>
            </h1>
            <div className="user-txt-holder-center">by God of Prompt</div>
          </div>
          <div className="user-icon-wrapper">
            <img src="/promtpts_img_2.avif" alt="God of Prompt Icon" className="user-logo-img" />
          </div>
        </div>
        <div className="user-description">
          Discover the best AI prompts for ChatGPT & Midjourney designed to supercharge your business and boost your productivity.
        </div>

        {/* AI Tools */}
        <div className="user-ai-tools">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`user-tool ${activeSection?.id === section.id ? "active" : ""}`}
              onClick={() => {
                if (activeSection?.id !== section.id) {
                  setActiveSection(section);
                  fetchCategories(section.id);
                }
              }}
            >
              <img
                src={section.description}
                alt={section.name}
                className={`user-tool-icon ${section.name === "ChatGPT" ? "no-invert" : ""}`}
              />
              {section.name}
            </button>


          ))}
        </div>

        {/* Categories Section */}
        <div className="user-categories">
          <div className="user-categories-title">
            <h2>Prompt Library Categories:</h2>
          </div>
          <div className="category-grid">
            {categories.length > 0 ? (
              categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  categoryId={category.id}
                  activeSection={activeSection}
                  title={category.name}
                  count={category.prompt_count}
                  icon={category.image}
                  link={`/prompts/list-prompts`}
                  createdAt={category.created_at}
                />
              ))
            ) : (
              <p>No categories available!</p>
            )}
          </div>
        </div>
        <FAQSection/>
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
