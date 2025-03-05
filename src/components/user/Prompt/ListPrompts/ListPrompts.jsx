import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./ListPrompts.css";
import { HomeOutlined, StarFilled, HeartOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import api from "../../../../services/api";
import PromptCard from "./PromptCard/PromptCard";

const ListPrompts = () => {
    const location = useLocation();
    const { category, activeSection } = location.state || {};

    const [prompts, setPrompts] = useState([]);
    const [topics, setTopics] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isType, setIsType] = useState(1);
    const [topicId, setTopicId] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [newestPrompts, setNewestPrompts] = useState([]);

    useEffect(() => {
        fetchListTopic(category?.id);
        getListNewestPrompts(category?.id);
    }, [])
    useEffect(() => {
        if (topicId == undefined) {
            getListPrompts("", searchText.trim(), isType, currentPage);
        } else {
            getListPrompts(topicId, searchText.trim(), isType, currentPage);
        }

    }, [category?.id, isType, currentPage]);

    const fetchListTopic = async (category_id) => {
        try {
            const resp = await api.getPromptsContentByCategoryId(category_id);
            setTopics(resp.data.topics);
        } catch (error) {
            console.error("Error fetching content list:", error);
        }
    };

    const getListPrompts = async (topic_id, search_text, is_type, page) => {
        try {
            const resp = await api.getPromptsByCategoryId(page, 12, category?.id, topic_id, search_text, is_type);
            setPrompts(resp.data?.data || []);
            setTotalPages(Math.ceil(resp.data?.total / 12));
        } catch (error) {
            console.error("Error fetching prompts:", error);
        }
    };
    const handelSearch = async (value) => {
        try {
            setCurrentPage(1);
            setSearchText(value);
            if (topicId == undefined) {
                getListPrompts (topicId, value.trim(), isType, currentPage)
            }
            getListPrompts ("", value.trim(), isType, currentPage)

        } catch (error) {
            
        }
    }
    const handelSearchByTopic = async (value) => {
        try {
            setCurrentPage(1);
            setTopicId(value);
            getListPrompts (value, searchText, isType, currentPage)
        } catch (error) {
            
        }
    }
    const handleChangeTypeSub = async (value) => {
        setCurrentPage(1);
        if (topicId == undefined) {
            setTopicId("");
        }
        setIsType(value);
    }
    const getListNewestPrompts = async (category_id) => {
        try {
            const resp = await api.getNewestPromptsByCategoryId(category_id);
            setNewestPrompts(resp.data.data);
        } catch (error) {
            console.error("Error fetching newest prompts:", error);
        }
    }
    const getCurrentMonthYear = () => {
        const date = new Date();
        const options = { month: "long", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    };
    const handleChangePage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    
    return (
        <div className="list-prompts-component">
            <div className="list-prompts-container">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <Link to="/prompts" style={{ color: "black" }}>
                        <HomeOutlined style={{ fontSize: "20px" }} />
                    </Link>
                    <span>
                        &gt; <img src={activeSection?.description} alt="" />
                        {activeSection?.name} Prompts for {category?.name}
                    </span>
                </div>

                {/* Tiêu đề */}
                <h1 className="list-prompts-container-title">
                    <span className="count">{category?.prompt_count}</span> {activeSection?.name} Prompts for <br /> {category?.name}
                </h1>

                {/* Nút chọn Premium / Free */}
                <div className="filter-buttons">
                    <button
                        className={`premium-btn ${isType === 2 ? "active" : ""}`}
                        onClick={() => handleChangeTypeSub(2)}
                    >
                        <StarFilled style={{ color: "yellow" }} /> Premium
                    </button>

                    <button
                        className={`free-btn ${isType === 1 ? "active" : ""}`}
                        onClick={() => handleChangeTypeSub(1)}
                    >
                        <HeartOutlined /> Free
                    </button>

                </div>

                {/* Ô tìm kiếm */}
                <input
                    className="list-prompt-search-bar"
                    type="text"
                    placeholder="Search prompts..."
                    value={searchText}
                    onChange={(e) => handelSearch(e.target.value)}
                />

                {/* Danh sách danh mục con */}
                <div className="category-tags">
                    {topics?.map((topic) => (
                        <span
                            key={topic.id}
                            className={`category-tag ${topicId === topic.id ? "active" : ""}`}
                            onClick={() => handelSearchByTopic(topicId === topic.id ? 0 : topic.id)}
                            // onClick={() => setTopicId(topicId === topic.id ? 0 : topic.id)}
                        >
                            {topic?.name}
                        </span>
                    ))}
                </div>

                {/* Danh sách Prompt Cards */}
                <div className="prompt-list-title">
                    <h2><img src={activeSection?.description} alt="" /> Best {activeSection?.name} Prompts for {category?.name}, {getCurrentMonthYear()} </h2>
                </div>
                <div className="prompt-list">
                    {prompts.length === 0 ? (
                        <p>No prompts found</p>
                    ) : (
                        prompts.map((prompt) => (
                            <PromptCard
                                key={prompt.id}
                                prompt={prompt}
                                image_category={category?.image_card}
                                activeSection={activeSection}
                            />
                        ))
                    )}
                </div>

                {/* Phân trang */}
                <Pagination
                    className="pagination_list_prompts"
                    current={currentPage}
                    total={totalPages * 10}
                    pageSize={10}
                    onChange={handleChangePage}
                    showSizeChanger={false}
                    showQuickJumper
                />


            </div>

            {/* Danh sách prompt mới nhất */}
            <div className="newest-prompts-container">
                <div className="newest-prompts-title-box">
                    <h2><img src="/675f6a3795417f518282f233_ni-bell-plus.svg" alt="" style={{ marginRight: "10px", paddingTop: "5px" }} />Newest {activeSection?.name} Prompts for {category?.name}:</h2>
                </div>
                <div className="newest-prompt-list-wrapper">
                    <div className="newest-prompt-list">
                        {newestPrompts.map((prompt) => (
                            <PromptCard
                                key={prompt.id}
                                prompt={prompt}
                                image_category={category?.image_card}
                                activeSection={activeSection}
                            />))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ListPrompts;
