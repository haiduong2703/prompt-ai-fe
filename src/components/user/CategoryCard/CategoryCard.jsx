import React from "react";
import "./CategoryCard.css";
import { Link } from "react-router-dom";
import category_image from "../../../asset/imgae/category_img_card.png";
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
          {/* {isNew && <div className="red-new-tag">New</div>} */}
        </div>

        <div className="user-category-card-main-content">
          <div className="user-category-card-content">
            <span>{category?.prompt_count} Proms</span>
          </div>
        </div>
      </Link>
      <div className="category-image-container">
        <img
          src={category_image}
          alt={category?.name}
          className="category-image"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default CategoryCard;
