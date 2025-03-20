// src/components/BlogList/BlogList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../../services/api";
import { Link, useNavigate } from "react-router-dom"; // Add this import
import "./index.css";
import img from "../../../asset/imgae/1.png";
import arrow_prev from "../../../asset/icon/arrow_prev.png";
import arrow_next from "../../../asset/icon/arrow_next.png";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
const BlogList = () => {
  const navigate = useNavigate(); // Add this if you want to use programmatic navigation
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, searchTerm]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await api.getBlogPage(currentPage, 6, searchTerm);
      setBlogs(response.data.blogs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };
  const handleChangePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="blog-container-list">
      <div className="blog-header">
        <h1>Bài Viết Blog & Tài Nguyên</h1>
        <p>Nhận miễn phí các gợi ý AI, hướng dẫn, mẹo và thủ thuật.</p>
        {/* <div className="search-bar">
          <input
            type="text"
            placeholder="Search blog..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">Search</button>
        </div> */}
        {/* <div className="search-container">
          <div className="search-wrapper">
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search blog..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div> */}
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="blog-grid">
            {blogs.map((post, index) => (
              <Link
                to={`/blog/${post.id}`}
                className="blog-card hover:shadow-lg transition-shadow"
                key={index}
              >
                <div key={index} className="blog-post">
                  <div className="blog-dot"></div>
                  <div className="blog-content">
                    <span className="blog-read-time">{post.readTime}</span>
                    <h3>{post.title}</h3>
                    {post.featured_image && (
                      <div className="blog-image">
                        <img src={post.featured_image} alt={post.title} />
                      </div>
                    )}
                    <div className="blog-footer">
                      <p>{post.meta_description}</p>

                      <button className="blog-button">
                        <ArrowRightOutlined />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Pagination
            className="pagination_list_prompts"
            current={currentPage}
            total={totalPages}
            pageSize={10}
            onChange={handleChangePage}
            showSizeChanger={false}
            itemRender={(_, type, originalElement) => {
              if (type === "prev") {
                return (
                  <button className="pagination-arrow-btn prev">
                    <img src={arrow_prev} alt="Previous" />
                  </button>
                );
              }
              if (type === "next") {
                return (
                  <button className="pagination-arrow-btn next">
                    <img src={arrow_next} alt="Next" />
                  </button>
                );
              }
              return originalElement;
            }}
          />
        </>
      )}
    </div>
  );
};

export default BlogList;
