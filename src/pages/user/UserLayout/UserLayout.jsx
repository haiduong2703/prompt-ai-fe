import React from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import "./UserLayout.css";
import UserFooter from "../UserFooter/UserFooter";
import { useUser } from "../../../context/AuthContext";
import logoImg from "../../../asset/imgae/logo.svg"
import arrowExpand from "../../../asset/icon/arow_expand.svg"
const UserLayout = ({ children }) => {
  const location = useLocation();
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const { user, logout } = useUser(); // Lấy user và hàm logout từ Context API
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(); // Gọi hàm logout từ Context API
    navigate("/login"); // Chuyển hướng về trang đăng nhập
  };
  return (
    <div className="user-container">
      {/* Navbar */}
      <nav className="user-navbar">
        <div className="user-logo">
          <img src={logoImg} alt="" style={{ color: "#5700C6" }} /> <span style={{ fontSize: "28px", fontWeight: "600" }}>Prom</span>
        </div>
        <div className="user-nav-left">

          <div className="user-nav-links">
            <Link
              to="/home"
              className={`user-nav-item ${location.pathname === "/home" ? "user-active" : ""
                }`}
            >
              Home
            </Link>
            <Link
              to="/prompts"
              className={`user-nav-item ${location.pathname === "/prompts" ? "user-active" : ""
                }`}
            >
              Prompt
            </Link>

            <div className="user-dropdown">
              <button className="user-dropdown-btn">Tools <img src={arrowExpand} alt="" /></button>
              <div className="user-dropdown-menu">
                <Link to="/tool1" className="user-dropdown-item">
                  Prompts Generator
                </Link>
                <Link to="/tool2" className="user-dropdown-item">
                  GPTs
                </Link>
              </div>
            </div>

            <Link
              to="/products"
              className={`user-nav-item ${location.pathname === "/products" ? "user-active" : ""
                }`}
            >
              Products
            </Link>
            <Link
              to="/blog"
              className={`user-nav-item ${location.pathname === "/blog" ? "user-active" : ""
                }`}
            >
              Blog
            </Link>
            <Link
              to="/pricing"
              className={`user-nav-item ${location.pathname === "/pricing" ? "user-active" : ""
                }`}
            >
              Pricing
            </Link>

            <Link
              to="/contact"
              className={`user-nav-item ${location.pathname === "/contact" ? "user-active" : ""
                }`}
            >
              Contact
            </Link>


          </div>
        </div>

        <div className="user-nav-right">
          {userLocal ? (
            <>
              {/* <Link to="/logout" className="user-logout">
                Log out
              </Link> */}
              <p onClick={handleLogout} className="user-logout">
                Log out
              </p>
              <div className="user-avatar">
                <img src={userLocal.avatar} alt="Avatar" />
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "black",
                  borderRight: "1px solid black",
                  paddingRight: "20px",
                }}
                
              >
                <span className="user-login">Login</span>
              </Link>
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "black" }}
                
              >
                <span className="user-signup">Sign up</span>
              </Link>
            </>
          )}
          <button className="user-menu-btn">☰</button>
        </div>
      </nav>

      {/* Spacer để tránh navbar che nội dung */}
      {/* <div className="user-spacer"></div> */}

      {/* Nội dung chính */}
      <main className="user-main-content">
        <Outlet />
      </main>
      {/* Thêm Footer */}
      <UserFooter />
    </div>
  );
};

export default UserLayout;
