import React from "react";
import "./PromptCard.css";
import { StarFilled, HeartFilled, LockFilled, UnlockFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
const PromptCard = ({ prompt, image_category, activeSection }) => {
  const createdDate = new Date(prompt.created_at);
  const currentDate = new Date();

  // Tính khoảng cách ngày giữa `created_at` và hiện tại
  const daysDiff = (currentDate - createdDate) / (1000 * 60 * 60 * 24);

  // Kiểm tra nếu ngày tạo <= 30 ngày thì hiển thị nhãn NEW
  const isNew = daysDiff <= 30;
  return (
    <div className="prompt-card-container">
      <div className="prompt-card">
        <div className="prompt-card-header">
          <div className="prompt-card-image-block">
            <img src={activeSection?.description} alt="ChatGPT Logo" className="prompt-icon" style={{ backgroundColor: "white", borderRadius: "15px", padding: "5px" }} />
            <img src={prompt?.Category?.image_card} alt="Category Icon" className="prompt-icon" />
          </div>
          <div className="premium-tag-div">
            {prompt.is_type == 2 && <span className="premium-tag"><StarFilled style={{ color: "yellow" }} /> Premium</span>}
            {prompt.is_type == 1 && <span className="premium-tag"><HeartFilled style={{ color: "white" }} /> Free</span>}
          </div>
        </div>
        <div className="prompt-card-body">
          {isNew && <div className="promt-card-red-new-tag">NEW</div>}
          <h3 className="prompt-title">{prompt.title}</h3>
          <p className="prompt-description">{prompt.short_description}</p>
        </div>
      </div>
      <div className="prompt-card-under-box">
        <div className="prompt-card-topic">{prompt?.Topic?.name || "Unknown"}</div>
        <div className="prompt-card-footer">
          <div className="prompt-card-footer-link">
            <Link
              to={`/prompts/detail-prompts/${prompt.id}`}
              state={{ image_category, activeSection, topicName: prompt?.Topic?.name }}
              className="view-prompt-button">
              {prompt.is_type == 2 && <LockFilled style={{ fontSize: "12px", color: "black", marginRight: "5px" }} />}
              {prompt.is_type == 1 && <UnlockFilled style={{ fontSize: "12px", color: "black", marginRight: "5px" }} />}
              View Prompt
            </Link>
          </div>
          <div className="like-link-holder">
            <div className="like-link-holder-div-child">
              <HeartFilled />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default PromptCard;
