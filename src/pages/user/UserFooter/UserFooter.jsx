import React from "react";
import { Link } from "react-router-dom";
import { Collapse } from "antd";
import "./UserFooter.css";
import logoImg from "../../../asset/imgae/logo.svg";
import arrowExpand from "../../../asset/icon/arow_expand.svg";
import facebookIcon from "../../../asset/icon/facebook2.svg";
import linkdleIcon from "../../../asset/icon/linkdle.svg";
import twitterIcon from "../../../asset/icon/twitter.svg";
import igIcon from "../../../asset/icon/ig.svg";

const { Panel } = Collapse;

const UserFooter = () => {
  const companyItems = ["Dịch vụ khách hàng", "Tuyển dụng", "FAQs"];

  const legalItems = [
    "Chính sách bảo mật",
    "Điều khoản dịch vụ",
    "Chính sách cookie",
  ];

  return (
    <footer className="user-footer">
      <div className="footer-up-container">
        <div className="footer-up-left-box">
          <h1>
            Bạn muốn gia nhập team
            <br />
            <span style={{ fontWeight: "700", color: "#1D1E25" }}>PROM?</span>
          </h1>
          <Link to="/contact" className="footer-contact-button">
            Liên Hệ Ngay
          </Link>
        </div>

        {/* Desktop View */}
        <div className="footer-up-right-box desktop-view">
          <div className="footer-up-right-paragraph">
            <h2 className="title-right-box">Công ty</h2>
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
            <h2 className="title-right-box">Thông tin pháp lý</h2>
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
          <Collapse expandIconPosition="end" ghost>
            <Panel header="Company" key="1">
              {companyItems.map((item, index) => (
                <div key={index} className="collapse-item">
                  {item}
                </div>
              ))}
            </Panel>
            <Panel header="Legal Information" key="2">
              {legalItems.map((item, index) => (
                <div key={index} className="collapse-item">
                  {item}
                </div>
              ))}
            </Panel>
          </Collapse>
        </div>
      </div>

      <div className="footer-down-container">
        <Link to="/" className="footer-logo">
          <img src={logoImg} alt="Prom" />
          <span>Prom</span>
        </Link>

        <div className="footer-down-center">
          <Link to="/home">Trang chủ</Link>
          <Link to="/prompts">Prompt</Link>
          {/* <Link to="/products">Tài Liệu AI</Link>
          <Link to="/tools">Tools</Link>
          <Link to="/blog">Blog</Link> */}
          <Link to="/pricing">Gói dịch vụ</Link>
          {/* <Link to="/contact">Liên hệ</Link> */}
        </div>

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
      </div>

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
