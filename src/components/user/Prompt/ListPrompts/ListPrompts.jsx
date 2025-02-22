import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./ListPrompts.css";
import { HomeOutlined, StarFilled, HeartOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import api from "../../../../services/api";
import PromptCard from "./PromptCard/PromptCard";

const ListPrompts = () => {
    const location = useLocation();
    const { count, title, categoryId, activeSection, icon } = location.state || {};

    const [prompts, setPrompts] = useState([]);
    const [contents, setContents] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isType, setIsType] = useState(1);
    const [contentText, setContentText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchListContent(categoryId);
    }, [])
    useEffect(() => {
        getListPrompts(contentText, searchText.trim(), isType, currentPage);
    }, [categoryId, isType, searchText, contentText, currentPage]);

    const fetchListContent = async (category_id) => {
        try {
            const resp = await api.getPromptsContentByCategoryId(category_id);
            setContents(resp.data.contents);
        } catch (error) {
            console.error("Error fetching content list:", error);
        }
    };

    const getListPrompts = async (content, search_text, is_type, page) => {
        try {
            const resp = await api.getPromptsByCategoryId(page, 12, categoryId, content, search_text, is_type);
            setPrompts(resp.data?.data || []);
            setTotalPages(Math.ceil(resp.data?.total / 12));
        } catch (error) {
            console.error("Error fetching prompts:", error);
        }
    };

    return (
        <div className="list-prompts-container">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <Link to="/prompts" style={{ color: "black" }}>
                    <HomeOutlined style={{ fontSize: "20px" }} />
                </Link>
                <span>
                    &gt; <img src={activeSection?.description} alt="section" />
                    {activeSection?.name} Prompts for {title}
                </span>
            </div>

            {/* Tiêu đề */}
            <h1 className="title">
                <span className="count">{count}</span> {activeSection?.name} Prompts for <br /> {title}
            </h1>

            {/* Nút chọn Premium / Free */}
            <div className="filter-buttons">
                <button
                    className={`premium-btn ${isType === 2 ? "active" : ""}`}
                    onClick={() => setIsType(2)}
                >
                    <StarFilled style={{ color: "yellow" }} /> Premium
                </button>

                <button
                    className={`free-btn ${isType === 1 ? "active" : ""}`}
                    onClick={() => setIsType(1)}
                >
                    <HeartOutlined /> Free
                </button>

            </div>

            {/* Ô tìm kiếm */}
            <input
                className="search-bar"
                type="text"
                placeholder="Search prompts..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />

            {/* Danh sách danh mục con */}
            <div className="category-tags">
                {contents?.map((content) => (
                    <span
                        key={content.id}
                        className={`category-tag ${contentText === content.name ? "active" : ""}`}
                        onClick={() => setContentText(content)}
                    >
                        {content}
                    </span>
                ))}
            </div>

            {/* Danh sách Prompt Cards */}
            <div className="prompt-list">
                {prompts.length === 0 ? (
                    <p>No prompts found</p>
                ) : (
                    prompts.map((prompt) => (
                        <PromptCard key={prompt.id} prompt={prompt} image_category={icon} image_section={activeSection?.description} />
                    ))
                )}
            </div>

            {/* Phân trang */}
            <Pagination
                className="pagination_list_prompts"
                current={currentPage}
                total={totalPages * 10}
                pageSize={10}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
                showQuickJumper
            />
        </div>
    );
};

export default ListPrompts;
