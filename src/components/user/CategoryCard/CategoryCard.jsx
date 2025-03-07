import React from "react";
import "./CategoryCard.css";
import { Link } from "react-router-dom";
import arrow_category_card from "../../../asset/icon/arrow_category_card.svg";
const CategoryCard = ({ category, link, activeSection }) => {
  // Chuyển đổi ngày `created_at` thành đối tượng Date
  const createdDate = new Date(category.created_at);
  const currentDate = new Date();

  // Tính khoảng cách ngày giữa `created_at` và hiện tại
  const daysDiff = (currentDate - createdDate) / (1000 * 60 * 60 * 24);

  // Kiểm tra nếu ngày tạo <= 30 ngày thì hiển thị nhãn NEW
  const isNew = daysDiff <= 30;

  return (
    <div role="listitem" className="collection-item-card">
      <Link
        to={link}
        state={{ category: category, activeSection }}
        className="category-item"
      >
        <div className="user-category-card-title">
          <h2 className="user-category-card-content-title">{category?.name}</h2>
          {isNew && <div className="red-new-tag">New</div>}
        </div>

        <div className="user-category-card-main-content">
          <div className="user-category-card-content">
            <span className="user-category-card-number-of-prompts">{category?.prompt_count}</span>
            <span className="user-category-card-word-prompts">Proms</span>
          </div>
          <div className="category-image-container">
            <img
              src={category?.image}
              alt=""
              className="category-image"
              loading="lazy"
            />
          </div>
          <div className="user-category-card-arrow-btn">
            <img loading="lazy" src={arrow_category_card} alt="arrow-icon" className="arrow-img" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
