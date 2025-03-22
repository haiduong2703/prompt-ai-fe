import React, { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import "./UserLayout.css";
import UserFooter from "../UserFooter/UserFooter";
import { useUser } from "../../../context/AuthContext";
import logoImg from "../../../asset/imgae/logo.png";
import defaultAvatar from "../../../asset/imgae/default_avatar.png";
import arrowExpand from "../../../asset/icon/arow_expand.svg";

const UserLayout = ({ children }) => {
  const location = useLocation();
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      className={`user-container ${
        location.pathname === "/home" ? "home-page" : ""
      }`}
    >
      <nav className="user-navbar">
        <Link to="/home" className="user-logo">
          <img
            src={logoImg}
            alt=""
            style={{ color: "#5700C6" }}
            className="logo-img"
          />
          {/* <span style={{ fontSize: "28px", fontWeight: "600" }}>Prom</span> */}
        </Link>
        <div
          className={`user-nav-left ${isMobileMenuOpen ? "mobile-open" : ""}`}
        >
          <div className="user-nav-links">
            <Link
              to="/home"
              className={`user-nav-item ${
                location.pathname === "/home" ? "user-active" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Trang chủ
            </Link>
            <Link
              to="/prompts"
              className={`user-nav-item ${
                location.pathname === "/prompts" ? "user-active" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Prompt
            </Link>

            <Link
              to="/product"
              className={`user-nav-item ${
                location.pathname === "/product" ? "user-active" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tài Liệu AI
            </Link>
            <Link
              to="/generate-prompt"
              className={`user-nav-item user-tools-nav ${
                location.pathname === "/generate-prompt" ? "user-active" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tools
            </Link>
            {/* <div className="user-dropdown-header">
              <button className="user-dropdown-btn-header">
                <span>Tools</span> <img src={arrowExpand} alt="" />
              </button>
              <div className="user-dropdown-menu">
                <Link
                  to="/generate-prompt"
                  className="user-dropdown-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Prompts Generator
                </Link>
                <Link
                  to="/generate-prompt"
                  className="user-dropdown-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  GPTs
                </Link>
              </div>
            </div> */}
            <Link
              to="/blog"
              className={`user-nav-item ${
                location.pathname === "/blog" ? "user-active" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/pricing"
              className={`user-nav-item ${
                location.pathname === "/pricing" ? "user-active" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Gói Dịch Vụ
            </Link>

            <Link
              to="/contact"
              className={`user-nav-item ${
                location.pathname === "/contact" ? "user-active" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Liên Hệ
            </Link>

            {/* Mobile Menu Auth Buttons */}
            {!userLocal && (
              <div className="mobile-auth-buttons">
                <Link
                  to="/login"
                  className="mobile-login-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Đăng Nhập
                </Link>
                <Link
                  to="/signup"
                  className="mobile-signup-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Đăng Ký
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="user-nav-right">
          {userLocal ? (
            <>
              <Link to="/user-information" className="user-infomation-link">
                <div className="user-avatar">
                  {userLocal.profile_image ? (
                    <img src={userLocal.profile_image} alt="Avatar" />
                  ) : (
                    <img src={defaultAvatar} alt="Avatar" />
                  )}
                </div>
                <p className="user-fullname">{userLocal.fullName}</p>
              </Link>
              <Link
                to="/user-information"
                className="user-infomation-link-mobile"
              >
                <div className="user-avatar-mobile">
                  {userLocal.profile_image ? (
                    <img src={userLocal.profile_image} alt="Avatar" />
                  ) : (
                    <img src={defaultAvatar} alt="Avatar" />
                  )}
                </div>
                <p className="user-fullname-mobile">{userLocal.fullName}</p>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="user-login-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="user-login">Đăng Nhập</span>
              </Link>
              <Link
                to="/signup"
                className="user-signup-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <button className="signup-button">Đăng Ký</button>
              </Link>
              <Link
                to="/login"
                className="mobile-header-signup"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="user-login">Đăng Nhập</span>
              </Link>
              <Link
                to="/signup"
                className="mobile-header-signup"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <button className="signup-button">Đăng Ký</button>
              </Link>
            </>
          )}

          <button className="user-menu-btn" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      <main className="user-main-content">
        <Outlet />
      </main>

      <UserFooter />
    </div>
  );
};

export default UserLayout;
