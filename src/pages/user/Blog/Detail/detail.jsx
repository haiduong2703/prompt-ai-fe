// src/pages/user/Blog/Detail/BlogDetail.js
import React from "react";
import "./index.css";
import img from "../../../../asset/imgae/1.png";

const BlogDetail = ({ blog }) => {
  return (
    <div className="blog-detail-container">
      <article className="blog-detail-article">
        {/* Header */}
        <header className="blog-detail-header">
          <h1 className="blog-detail-title">{blog?.title}</h1>

          <div className="blog-detail-meta">
            <div className="blog-detail-author">
              <img src={img} alt="Author" className="author-avatar" />
              <div>
                <p className="author-name">God of Prompt</p>
                <p className="blog-date">
                  {new Date(blog.published_at).toLocaleDateString()}
                </p>
              </div>
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

        {/* Category */}
        {blog?.category && (
          <div className="blog-detail-category">
            <span className="category-tag">{blog.category.name}</span>
          </div>
        )}
      </article>
    </div>
  );
};

export default BlogDetail;
