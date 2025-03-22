import React from "react";
import { Link } from "react-router-dom";
import { Collapse } from "antd";
import "./UserFooter.css";
import logoImg from "../../../asset/imgae/logo.png";
import arrowExpand from "../../../asset/icon/arow_expand.svg";
import facebookIcon from "../../../asset/icon/facebook2.svg";
import linkdleIcon from "../../../asset/icon/linkdle.svg";
import twitterIcon from "../../../asset/icon/twitter.svg";
import igIcon from "../../../asset/icon/ig.svg";

const UserFooter = () => {
  const companyItems = [
    "Phản hồi từ khách hàng",
    "FAQs",
    "Chương trình Affiliate",
    "Liên hệ",
  ];

  const legalItems = [
    "Chính sách bảo mật",
    "Điều khoản dịch vụ",
    "Chính sách cookie",
  ];

  // Thay vì dùng <Panel> với children,
  // ta tạo mảng items để truyền thẳng vào Collapse.
  const collapseItems = [
    {
      key: "3",
      label: "Thông tin",
      children: (
        <div className="footer-down-center">
          <Link to="/home">Trang chủ</Link>
          <Link to="/prompts">Prompt</Link>
          <Link to="/products">Tài Liệu AI</Link>
          <Link to="/tools">Tools</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/pricing">Gói dịch vụ</Link>
        </div>
      ),
    },
    {
      key: "1",
      label: "Khám phá",
      children: companyItems.map((item, index) => (
        <div key={index} className="collapse-item">
          {item}
        </div>
      )),
    },
    {
      key: "2",
      label: "Tìm hiểu",
      children: legalItems.map((item, index) => (
        <div key={index} className="collapse-item">
          {item}
        </div>
      )),
    },
  ];

  return (
    <footer className="user-footer">
      <div className="footer-up-container">
        <div className="footer-up-left-box">
          <img style={{ width: "100px" }} src={logoImg} alt="" />
          <div className="footer-social-connect">
            <a href="#">
              <img src={facebookIcon} alt="Facebook" />
            </a>
            <a href="#">
              <img src={twitterIcon} alt="Twitter" />
            </a>
            <a href="#">
              <img src={igIcon} alt="Instagram" />
            </a>
            <a href="#">
              <img src={linkdleIcon} alt="LinkedIn" />
            </a>
          </div>
          <div
            style={{ marginTop: "20px", display: "flex", alignItems: "center" }}
          >
            <input
              type="email"
              placeholder="Your email address"
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px 0 0 5px",
                width: "200px",
                height: "40px",
                fontSize: "14px",
                outline: "none",
              }}
            />
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#6B48FF",
                color: "white",
                border: "none",
                height: "40px",
                borderRadius: "0 5px 5px 0",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Desktop View */}
        <div className="footer-up-right-box desktop-view">
          <div className="footer-up-right-paragraph">
            <h2 className="title-right-box">Thông tin</h2>
            <div>
              <div className="footer-down-center">
                <div className="footer-link">
                  <Link to="/home">Trang chủ</Link>
                  <Link to="/prompts">Prompt</Link>
                  <Link to="/products">Tài Liệu AI</Link>
                </div>
                <div className="footer-link">
                  <Link to="/tools">Tools</Link>
                  <Link to="/blog">Blog</Link>
                  <Link to="/pricing">Gói dịch vụ</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-up-right-paragraph">
            <h2 className="title-right-box">Khám phá</h2>
            <p>
              {companyItems.map((item, index) => (
                <React.Fragment key={index}>
                  {item}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
          <div className="footer-up-right-paragraph">
            <h2 className="title-right-box">Tìm hiểu</h2>
            <p>
              {legalItems.map((item, index) => (
                <React.Fragment key={index}>
                  {item}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>

        {/* Mobile View with Collapse */}
        <div className="footer-up-right-box mobile-view">
          {/* Thay vì Panel children, ta dùng items */}
          <Collapse expandIconPosition="end" ghost items={collapseItems} />
        </div>
      </div>

      <div className="footer-down-container" />

      <div className="footer-bottom">
        <p>2025 All rights reserved © by Prom</p>
        <div className="footer-botton-right">
          <a href="#">Community guidelines</a>
          <a href="#">Term & Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
