// src/components/BlogList/BlogList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../../services/api";
import "./index.css";
import img from "../../../asset/imgae/1.png";

const BlogList = () => {
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
      const response = await api.getBlogPage(currentPage, 10);
      setBlogs(response.data.blogs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1>Articles & Resources</h1>
        {/* <div className="search-bar">
          <input
            type="text"
            placeholder="Search blog..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">Search</button>
        </div> */}
        <div className="search-container">
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
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="blog-grid">
            {blogs.map((blog) => (
              <div key={blog.id} className="blog-card">
                <div className="blog-image">
                  <img
                    src={blog.featured_image || "/placeholder.jpg"}
                    alt={blog.title}
                  />
                </div>
                <div className="blog-content">
                  <span className="blog-category">{blog.category?.name}</span>
                  <h2 className="blog-title">{blog.title}</h2>
                  <p className="blog-description">{blog.meta_description}</p>
                  <div className="blog-footer">
                    <div className="author-info">
                      <img src={img} alt="Author" />
                      <div>
                        <p className="author-name">God of Prompt</p>
                        <p className="blog-date">
                          {new Date(blog.published_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <span>
              {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogList;
