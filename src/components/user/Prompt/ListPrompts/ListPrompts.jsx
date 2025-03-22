import React, { useEffect, useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import "./ListPrompts.css";
import { HomeOutlined, StarFilled, HeartOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import api from "../../../../services/api";
import PromptCard from "./PromptCard/PromptCard";
import astronault from "../../../../asset/imgae/astronault_list_prom.png";
import arrow_prev from "../../../../asset/icon/arrow_prev.png";
import arrow_next from "../../../../asset/icon/arrow_next.png";
import kinh_lup from "../../../../asset/icon/kinh_lup.png";
import phi_hanh_gia from "../../../../asset/imgae/phi_hanh_gia.png";
import { UserContext } from "../../../../context/AuthContext";
import MidjourneyPromptCard from "./MidjourneyPromptCard/MidjourneyPromptCard";
const ListPrompts = () => {
  const location = useLocation();
  const { category, activeSection } = location.state || {};
  const { user } = useContext(UserContext); // Lấy user từ Context API

  const [prompts, setPrompts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isType, setIsType] = useState(1);
  const [topicId, setTopicId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newestPrompts, setNewestPrompts] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    fetchListTopic(category?.id);
    getListNewestPrompts(category?.id);
    if (user != null) {
      getFavoritePrompts();
    }
  }, []);
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
      const resp = await api.getPromptsByCategoryId(
        page,
        12,
        category?.id,
        topic_id,
        search_text,
        is_type
      );
      setPrompts(resp.data?.data || []);
      setTotalPages(Math.ceil(resp.data?.total / 12));
    } catch (error) {
      console.error("Error fetching prompts:", error);
    }
  };
  const getFavoritePrompts = async () => {
    try {
      const resp = await api.getFavoritePrompts(user?.id);
      setFavoriteList(resp.data);
    } catch (error) {
      console.error("Error fetching favorite prompts:", error);
    }
  };
  const handelSearch = async (value) => {
    try {
      setCurrentPage(1);
      setSearchText(value);
      if (topicId == undefined) {
        getListPrompts(topicId, value.trim(), isType, currentPage);
      }
      getListPrompts("", value.trim(), isType, currentPage);
    } catch (error) {}
  };
  const handelSearchByTopic = async (value) => {
    try {
      setCurrentPage(1);
      setTopicId(value);
      getListPrompts(value, searchText, isType, currentPage);
    } catch (error) {}
  };
  const handleChangeTypeSub = async (value) => {
    setCurrentPage(1);
    if (topicId == undefined) {
      setTopicId("");
    }
    setIsType(value);
  };
  const getListNewestPrompts = async (category_id) => {
    try {
      const resp = await api.getNewestPromptsByCategoryId(category_id);
      setNewestPrompts(resp.data.data);
    } catch (error) {
      console.error("Error fetching newest prompts:", error);
    }
  };
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
        {/* Tiêu đề */}
        <h1 className="list-prompts-container-title">
          {category?.prompt_count} {activeSection?.name} Prompts cho{" "}
          {category?.name}
        </h1>
        <p className="list-prompts-container-description">
          Khám phá các Prompt AI tốt nhất cho ChatGPT và Midjourney được thiết
          kế để tăng cường doanh nghiệp của bạn và nâng cao năng suất làm việc.
        </p>
        {/* Nút chọn Premium / Free */}
        {/* <div className={`filter-buttons ${isType === 2 ? 'premium-active' : 'free-active'}`}>
                    <button
                        className={`premium-btn ${isType === 2 ? "active" : ""}`}
                        onClick={() => handleChangeTypeSub(2)}
                    >
                        <StarFilled /> Premium
                    </button>

                    <button
                        className={`free-btn ${isType === 1 ? "active" : ""}`}
                        onClick={() => handleChangeTypeSub(1)}
                    >
                        <HeartOutlined /> Free
                    </button>
                </div> */}

        {/* Ô tìm kiếm */}
        <div className="search-container-list-prompt">
          <img
            src={kinh_lup}
            alt="search"
            className="search-icon-list-prompt"
          />
          <input
            className="list-prompt-search-bar"
            type="text"
            placeholder="Search prompts"
            value={searchText}
            onChange={(e) => handelSearch(e.target.value)}
          />
        </div>

        {/* Danh sách danh mục con */}
        <div className="category-tags-list-prompt">
          {topics?.map((topic) => (
            <span
              key={topic.id}
              className={`category-tag-list-prompt ${
                topicId === topic.id ? "active" : ""
              }`}
              onClick={() =>
                handelSearchByTopic(topicId === topic.id ? 0 : topic.id)
              }
              // onClick={() => setTopicId(topicId === topic.id ? 0 : topic.id)}
            >
              {topic?.name}
            </span>
          ))}
        </div>

        {/* Danh sách Prompt Cards */}
        <div className="prompt-list">
          {prompts.length === 0 ? (
            <p>No prompts found</p>
          ) : activeSection?.name === "Midjourney" ? (
            prompts.map((prompt) => (
              <MidjourneyPromptCard
                key={prompt.id}
                prompt={prompt}
                favoriteList={favoriteList}
              />
            ))
          ) : (
            prompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                favoriteList={favoriteList}
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
      </div>

      {/* Danh sách prompt mới nhất */}
      <div className="newest-prompts-container">
        <div className="newest-prompts-title-box">
          <h2>
            Các Prompts {activeSection?.name} Mới Nhất Cho {category?.name}
          </h2>
        </div>
        <div className="newest-prompt-list-wrapper">
          <div className="astronaut-image">
            <img src="/phi_hanh_gia_alone.png" alt="Astronaut" />
          </div>
          <div className="newest-prompt-list">
            {activeSection?.name === "Midjourney"
              ? newestPrompts.map((prompt) => (
                  <MidjourneyPromptCard
                    key={prompt.id}
                    prompt={prompt}
                    favoriteList={favoriteList}
                  />
                ))
              : newestPrompts.map((prompt) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    favoriteList={favoriteList}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPrompts;
