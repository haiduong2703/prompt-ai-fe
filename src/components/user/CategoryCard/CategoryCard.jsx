import React from "react";
import "./CategoryCard.css";
import { Link } from "react-router-dom";

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
      state={{category: category, activeSection}}
      className="category-item">
        <div className="user-category-card-title">
          <img loading="lazy" src={category?.image} alt="category-icon" className="user-category-card-img" />
          <h2 className="user-category-card-content-title">{category?.name}</h2>
          {isNew && <div className="red-new-tag">NEW!</div>}
        </div>

        <div className="user-category-card-main-content">
          <div className="user-category-card-content">
            <div className="user-category-card-number-of-prompts">{category?.prompt_count}</div>
            <div className="user-category-card-word-prompts">&nbsp;Prompts</div>
          </div>

          {/* Nút mũi tên */}
          <div className="user-category-card-arrow-btn">
            <img loading="lazy" src="https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/67095c33c8685276d0b21e0e_arrow-btn.svg" alt="arrow-icon" className="arrow-img" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
