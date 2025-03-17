// src/pages/user/Blog/Detail/BlogDetail.js
import React from "react";
import "./index.css";
import img from "../../../../asset/imgae/1.png";

const BlogDetail = ({ blog }) => {
  // const getAdjustedTime = (utcTimeString) => {
  //   // Chuyển chuỗi UTC thành đối tượng Date
  //   const utcDate = new Date(utcTimeString);

  //   // Cộng thêm 7 tiếng (7 * 60 * 60 * 1000 milliseconds)
  //   const adjustedDate = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);

  //   // Định dạng lại thành chuỗi dễ đọc (ví dụ: YYYY-MM-DD HH:mm:ss)
  //   const year = adjustedDate.getFullYear();
  //   const month = String(adjustedDate.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  //   const day = String(adjustedDate.getDate()).padStart(2, "0");
  //   const hours = String(adjustedDate.getHours()).padStart(2, "0");
  //   const minutes = String(adjustedDate.getMinutes()).padStart(2, "0");
  //   const seconds = String(adjustedDate.getSeconds()).padStart(2, "0");

  //   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  // };
  const getAdjustedDate = (utcTimeString) => {
    // Chuyển chuỗi UTC thành đối tượng Date
    const utcDate = new Date(utcTimeString);

    // Cộng thêm 7 tiếng để chuyển sang UTC+7 (7 * 60 * 60 * 1000 milliseconds)
    const adjustedDate = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);

    // Lấy ngày, tháng, năm
    const day = adjustedDate.getDate(); // Lấy ngày (10)
    const year = adjustedDate.getFullYear(); // Lấy năm (2025)

    // Mảng chứa tên các tháng
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[adjustedDate.getMonth()]; // Lấy tên tháng (March)

    // Định dạng kết quả: "10 March, 2025"
    return `${day} ${month}, ${year}`;
  };
  return (
    <div className="blog-detail-container">
      <article className="blog-detail-article">
        {/* Header */}
        <header className="blog-detail-header">
          <h1 className="blog-detail-title">{blog?.title}</h1>

          <div className="blog-detail-meta">
            <div className="blog-detail-author">
              <p className="author-name">By Admin</p>
              <strong>•</strong>
              <p className="blog-date">{getAdjustedDate(blog.created_at)}</p>
            </div>
          </div>

          {/* <div className="blog-detail-share">
            {[
              "linkedin",
              "twitter",
              "facebook",
              "pinterest",
              "reddit",
              "telegram",
            ].map((platform) => (
              <button
                key={platform}
                className="share-button"
                aria-label={`Share on ${platform}`}
              >
                <div className="share-icon" />
              </button>
            ))}
          </div> */}
        </header>

        {/* Featured Image */}
        {blog?.featured_image && (
          <div className="blog-detail-image">
            <img src={blog.featured_image} alt={blog.title} />
          </div>
        )}

        {/* Content */}
        <div
          className="blog-detail-content"
          dangerouslySetInnerHTML={{ __html: blog?.content }}
        />

        {/* Table of Contents */}
        {blog?.table_of_contents && (
          <nav className="blog-detail-toc">
            <h2>Table of Contents:</h2>
            <div dangerouslySetInnerHTML={{ __html: blog.table_of_contents }} />
          </nav>
        )}
      </article>
    </div>
  );
};

export default BlogDetail;
