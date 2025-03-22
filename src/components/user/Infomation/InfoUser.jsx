import AccountInfo from "./AccountInfo/AccountInfo";
import ChangePassword from "./ChangePassword/ChangePassword";
import FavoritePrompts from "./FavoritePrompt/FavoritePrompt";
import { useState, useContext } from "react";
import { Divider } from "antd";
import {
  HeartFilled,
  LogoutOutlined,
  UserOutlined,
  LockFilled,
} from "@ant-design/icons";
import "./InfoUser.css";
import { UserContext } from "../../../context/AuthContext";
import { useUser } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logout_icon from "../../../../src/asset/icon/logout_icon.png";
const InfoUser = () => {
  const [activeMenu, setActiveMenu] = useState("account"); // account, password, favorites
  const { user } = useContext(UserContext); // Lấy user từ Context API
  const { logout } = useUser();
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeMenu) {
      case "account":
        return (
          <AccountInfo
            user={user}
            onSwitchToPassword={handleChangePasswordClick}
          />
        );
      case "password":
        return <ChangePassword user={user} />;
      case "favorites":
        return <FavoritePrompts user={user} />;
      default:
        return (
          <AccountInfo
            user={user}
            onSwitchToPassword={handleChangePasswordClick}
          />
        );
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChangePasswordClick = () => {
    setActiveMenu("password");
  };

  return (
    <div className="info-user-container">
      <div className="info-user-sidebar">
        <div className="info-user-menu-item-container">
          <div
            className={`info-user-menu-item ${
              activeMenu === "account" ? "active" : ""
            }`}
            onClick={() => setActiveMenu("account")}
          >
            <UserOutlined />
            <span className="info-user-menu-item-text">
              Thông tin tài khoản
            </span>
          </div>
          <div
            className={`info-user-menu-item ${
              activeMenu === "password" ? "active" : ""
            }`}
            onClick={() => setActiveMenu("password")}
          >
            <LockFilled />
            <span className="info-user-menu-item-text">Đổi mật khẩu</span>
          </div>
          <div
            className={`info-user-menu-item ${
              activeMenu === "favorites" ? "active" : ""
            }`}
            onClick={() => setActiveMenu("favorites")}
          >
            <HeartFilled />
            <span className="info-user-menu-item-text">Prompt yêu thích</span>
          </div>
        </div>
        <div className="mobile-divider">
          <Divider />
        </div>

        <div className="info-user-menu-item logout-item" onClick={handleLogout}>
          <img src={logout_icon} alt="logout" className="logout-icon" />
          <span className="info-user-menu-item-text">Thoát</span>
        </div>
      </div>

      <div className="info-user-content">{renderContent()}</div>
    </div>
  );
};

export default InfoUser;
