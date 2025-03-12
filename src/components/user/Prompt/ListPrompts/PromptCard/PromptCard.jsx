import React from "react";
import "./PromptCard.css";
import { StarFilled, HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const PromptCard = ({ prompt, image_category, activeSection }) => {
  const createdDate = new Date(prompt.created_at);
  const currentDate = new Date();
  const daysDiff = (currentDate - createdDate) / (1000 * 60 * 60 * 24);
  const isNew = daysDiff <= 30;

  return (
    <div className="component-prompt-card-container">
      <div className="component-prompt-card">
        <div className="component-prompt-card-header">
          <div className="component-prompt-card-image-block">
            <img
              src={activeSection?.description}
              alt="ChatGPT Logo"
              className="component-prompt-icon"
            />
          </div>
          <div className="component-premium-tag-div">
            {isNew && <span className="component-new-tag">New</span>}
            <div>
              <button>
                <HeartOutlined />
              </button>
            </div>
            {/* {prompt.is_type === 2 && (
              <span className="component-premium-tag">
                <StarFilled />
                Premium
              </span>
            )}
            {prompt.is_type === 1 && (
              <span className="component-free-tag">
                Free
              </span>
            )} */}
          </div>
        </div>

        <div className="component-prompt-card-body">
          {/* <p className="component-prompt-card-body-title">{activeSection.name}</p> */}
          <h3 className="component-prompt-title">{prompt.title}</h3>
          <p className="component-prompt-description">{prompt.short_description}</p>
        </div>

      </div>
      <div className="component-prompt-card-topic">{prompt?.topic?.name || "Unknown"}</div>

      <div className="component-prompt-card-footer">
        <Link
          to={`/prompts/detail-prompts/${prompt.id}`}
          state={{ image_category, activeSection, topicName: prompt?.topic?.name }}
          className="component-view-prompt-button"
        >
          View Prompt
        </Link>
        {/* <div className="component-like-link-holder">
          <div className="component-like-link-holder-div-child">
            <HeartFilled />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PromptCard;
