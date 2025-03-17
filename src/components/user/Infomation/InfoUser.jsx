import AccountInfo from "./AccountInfo/AccountInfo";
import ChangePassword from "./ChangePassword/ChangePassword";
import FavoritePrompts from "./FavoritePrompt/FavoritePrompt";
import { useState, useContext } from "react";
import { Divider } from "antd";
import { HeartFilled, LogoutOutlined, UserOutlined, LockFilled } from "@ant-design/icons";
import "./InfoUser.css";
import { UserContext } from "../../../context/AuthContext";
import { useUser } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const InfoUser = () => {
    const [activeMenu, setActiveMenu] = useState('account'); // account, password, favorites
    const { user } = useContext(UserContext); // Lấy user từ Context API
    const { logout } = useUser();
    const navigate = useNavigate();
    const renderContent = () => {
      switch (activeMenu) {
        case 'account':
          return <AccountInfo />;
        case 'password':
          return <ChangePassword />;
        case 'favorites':
          return <FavoritePrompts user={user} />;
        default:
          return <AccountInfo />;
      }
    };
    const handleLogout = () => {
      logout();
      navigate("/login");
    };
    return (
      <div className="info-user-container">
        <div className="info-user-sidebar">
          <div 
            className={`info-user-menu-item ${activeMenu === 'account' ? 'active' : ''}`}
            onClick={() => setActiveMenu('account')}
          >
            <UserOutlined/><span>Thông tin tài khoản</span>
          </div>
          <div 
            className={`info-user-menu-item ${activeMenu === 'password' ? 'active' : ''}`}
            onClick={() => setActiveMenu('password')}
          >
            <LockFilled/><span>Đổi mật khẩu</span>
          </div>
          <div 
            className={`info-user-menu-item ${activeMenu === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveMenu('favorites')}
          >
            <HeartFilled/><span>Prompt yêu thích</span>
          </div>
          <Divider />
          <div className="info-user-menu-item">
            <LogoutOutlined/><span onClick={handleLogout}>Thoát</span>
          </div>
        </div>
  
        <div className="info-user-content">
          {renderContent()}
        </div>
      </div>
    );
  };
  
  export default InfoUser;