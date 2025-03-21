import React, { useContext, useState, useEffect } from "react";
import { Tooltip } from 'antd';
import "./MidjourneyPromptCard.css";
import { HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../../context/AuthContext";
import api from "../../../../../services/api";
import { Modal } from 'antd';

const MidjourneyPromptCard = ({ prompt, favoriteList }) => {
  const createdDate = new Date(prompt.created_at);
  const currentDate = new Date();
  const daysDiff = (currentDate - createdDate) / (1000 * 60 * 60 * 24);
  const isNew = daysDiff <= 30;
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [dataFavorite, setDataFavorite] = useState([]);

  useEffect(() => {
    if (favoriteList.length > 0) {
      setDataFavorite(favoriteList);
    }
  }, []);

  const getFavoritePrompts = async () => {
    try {
      const resp = await api.getFavoritePrompts(user?.id);
      setDataFavorite(resp.data);
    } catch (error) {
      console.error("Error fetching favorite prompts:", error);
    }
  }

  const isFavorite = dataFavorite.some(item => item.prompt_id === prompt.id);

  const getFavoriteId = () => {
    const favorite = dataFavorite.find(item => item.prompt_id === prompt.id);
    return favorite ? favorite.id : null;
  };

  const handleLike = async () => {
    if (user == null) {
      navigate("/login");
      return;
    }

    try {
      if (isFavorite) {
        const favoriteId = getFavoriteId();
        await api.removeFavoritePrompt(favoriteId);
      } else {
        await api.addFavoritePrompt(prompt.id, user?.id);
      }
      getFavoritePrompts();
    } catch (error) {
      console.error("Error handling favorite:", error);
    }
  }

  const handleViewPrompt = async () => {
    try {
      if (user?.count_prompt != 0) {
        const response = await api.updateCount(user?.id);
        // Lấy user hiện tại từ localStorage
        const currentUser = JSON.parse(localStorage.getItem('user'));
        // Cập nhật count_prompt mới
        const updatedUser = {
          ...currentUser,
          count_prompt: response.data.count_promt
        };
        // Lưu lại vào localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
        // Cập nhật UserContext
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Error updating count:", error);
    }
    window.scrollTo(0, 0);
    navigate(`/prompts/detail-prompts-midjourney/${prompt.id}`);
  };

  return (
    <div className="component-prompt-card-container">
      <div className="component-prompt-card-midjourney" style={{background: `url(${prompt.short_description})`}}>
        <div className="component-prompt-card-header">
          <div className="component-prompt-card-image-block">
            <img
              src={prompt?.Category?.Section?.description}
              alt="Midjourney Logo"
              className="component-prompt-icon"
            />
          </div>
          <div className="component-premium-tag-div">
            {isNew && <span className="component-new-tag">New</span>}
            <div>
              <Tooltip title={isFavorite ? "Gỡ bỏ yêu thích" : "Thêm vào yêu thích"}>
                <button
                  onClick={handleLike}
                  className={isFavorite ? 'favorite-button' : ''}
                >
                  <HeartOutlined />
                </button>
              </Tooltip>

            </div>
          </div>
        </div>
      </div>
      <div className="component-prompt-card-topic">
        {prompt?.topic?.name || "Unknown"}
      </div>

      <div className="component-prompt-card-footer">
        <button
          onClick={handleViewPrompt}
          className="component-view-prompt-button"
        >
          Xem Prompt
        </button>
      </div>
    </div>
  );
};

export default MidjourneyPromptCard;
