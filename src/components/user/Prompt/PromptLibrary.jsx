import React, { useEffect, useState } from "react";
import "./PromptLibrary.css";
import api from "../../../services/api";
import CategoryCard from "../CategoryCard/CategoryCard";
import FAQSection from "../../Q&A/FAQSection";

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
    <div className="prompt-library">
      <div className="prompt-library-container">
        <div className="prompt-library-header">
          <h1>The Biggest AI Prom Library</h1>
          <p className="subtitle">
            Discover the best AI prompts for ChatGPT & Midjourney designed to supercharge
            your business and boost your productivity.
          </p>
        </div>

        <div className="ai-tools-container">
          <div className={`ai-tools ${activeSection?.name?.toLowerCase() || 'chatgpt'}`}>
            {sections.map((section) => (
              <button
                key={section.id}
                className={`tool-button ${activeSection?.id === section.id ? "active" : ""}`}
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
                  className={section.name === "ChatGPT" ? "no-invert" : ""}
                />
                {section.name}
              </button>
            ))}
          </div>
        </div>

        <div className="categories-section">
          {categories.length > 0 ? (
            <div className="category-grid">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  link={`/prompts/list-prompts`}
                  activeSection={activeSection}
                />
              ))}
            </div>
          ) : (
            <p className="no-categories">No categories available!</p>
          )}
        </div>

        <FAQSection />
      </div>
    </div>
  );
};

export default PromptLibrary;
