import React, { useContext, useState, useEffect } from "react";
import { Tooltip } from "antd";
import "./PromptCard.css";
import { HeartOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../../../../context/AuthContext";
import api from "../../../../../services/api";
import { Modal } from "antd";

const PromptCard = ({ prompt, favoriteList }) => {
  const location = useLocation();
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
  };

  const isFavorite = dataFavorite.some((item) => item.prompt_id === prompt.id);

  const getFavoriteId = () => {
    const favorite = dataFavorite.find((item) => item.prompt_id === prompt.id);
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
  };

  const handleViewPrompt = async () => {
    // if (user == null) {
    //   navigate("/login");
    //   return;
    // }

    // if (user?.count_prompt === 0 && user?.userSub?.subscription?.type === 1) {
    //   Modal.confirm({
    //     title: 'Thông báo',
    //     content: 'Bạn đã sử dụng hết số lượng prompt cho phép. Hãy click vào đây để nâng cấp ngay!',
    //     okText: 'Nâng cấp',
    //     cancelText: 'Đóng',
    //     className: 'custom-modal-confirm',
    //     okButtonProps: {
    //       style: {
    //         backgroundColor: '#5700C6',
    //         borderColor: '#5700C6',
    //         color: '#FFFFFF',
    //         fontSize: '16px',
    //       }
    //     },
    //     cancelButtonProps: {
    //       style: {
    //         borderColor: '#5700C6',
    //         color: '#5700C6',
    //         fontSize: '16px',
    //       }
    //     },
    //     onOk() {
    //         window.scrollTo(0, 0);
    //         navigate("/pricing");
    //     }
    //   });
    //   return;
    // }
    try {
      if (user?.count_prompt != 0) {
        const response = await api.updateCount(user?.id);
        // Lấy user hiện tại từ localStorage
        const currentUser = JSON.parse(localStorage.getItem("user"));
        // Cập nhật count_prompt mới
        const updatedUser = {
          ...currentUser,
          count_prompt: response.data.count_promt,
        };
        // Lưu lại vào localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser));
        // Cập nhật UserContext
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Error updating count:", error);
    }
    window.scrollTo(0, 0);
    navigate(`/prompts/detail-prompts/${prompt.id}`);
  };

  return (
    <div
      className={`component-prompt-card-container ${
        location.pathname === "/home" ? "home" : ""
      }`}
    >
      <div className="component-prompt-card">
        <div className="component-prompt-card-header">
          <div className="component-prompt-card-image-block">
            <img
              src={prompt?.Category?.Section?.description}
              alt="ChatGPT Logo"
              className="component-prompt-icon"
            />
          </div>
          <div className="component-premium-tag-div">
            {isNew && <span className="component-new-tag">New</span>}
            <div>
              <Tooltip
                title={isFavorite ? "Gỡ bỏ yêu thích" : "Thêm vào yêu thích"}
              >
                <button
                  onClick={handleLike}
                  className={isFavorite ? "favorite-button" : ""}
                >
                  <HeartOutlined />
                </button>
              </Tooltip>
            </div>
            {/* {prompt.is_type === 2 && (
              <span className="component-premium-tag">
                <StarFilled />
                Premium
              </span>
            )}
            {prompt.is_type === 1 && (
              <span className="component-free-tag">
                Free
              </span>
            )} */}
          </div>
        </div>

        <div className="component-prompt-card-body">
          {/* <p className="component-prompt-card-body-title">{activeSection.name}</p> */}
          <h3 className="component-prompt-title">{prompt.title}</h3>
          <p className="component-prompt-description">
            {prompt.short_description}
          </p>
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
        {/* <div className="component-like-link-holder">
          <div className="component-like-link-holder-div-child">
            <HeartFilled />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PromptCard;
