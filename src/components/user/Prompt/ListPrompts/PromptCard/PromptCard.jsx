import React from "react";
import "./PromptCard.css";
import { StarFilled, HeartFilled, LockFilled } from "@ant-design/icons";
const PromptCard = ({ prompt, image_section, image_category }) => {
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
            <img src={image_section} alt="ChatGPT Logo" className="prompt-icon" style={{backgroundColor: "white", borderRadius: "15px", padding: "5px"}} />
            <img src={image_category} alt="Category Icon" className="prompt-icon" />
          </div>
          <div className="premium-tag-div">
            <span className="premium-tag"><StarFilled style={{ color: "yellow" }} /> Premium</span>
          </div>
        </div>
        <div className="prompt-card-body">
        {isNew && <div className="promt-card-red-new-tag">NEW</div>}
          <h3 className="prompt-title">{prompt.title}</h3>
          <p className="prompt-description">{prompt.short_description}</p>
        </div>
      </div>
      <div className="prompt-card-topic">{prompt.content || "Unknown"}</div>
      <div className="prompt-card-footer">
        <div className="prompt-card-footer-link">
          <a href={`/chatgpt-premium/task-management/${prompt.id}`} className="view-prompt-button">
            <LockFilled style={{ fontSize: "12px", color: "black" }} /> View Prompt
          </a>
        </div>
        <div className="like-link-holder">
          <div className="like-link-holder-div-child">          
            <HeartFilled />
          </div>
        </div>

      </div>
    </div>
  );
};

export default PromptCard;
