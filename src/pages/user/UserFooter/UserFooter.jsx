import React from "react";
import { Link } from "react-router-dom";
import "./UserFooter.css";
import logoImg from "../../../asset/imgae/logo.svg"
import arrowExpand from "../../../asset/icon/arow_expand.svg"
import facebookIcon from "../../../asset/icon/facebook2.svg"
import linkdleIcon from "../../../asset/icon/linkdle.svg"
import twitterIcon from "../../../asset/icon/twitter.svg"
import igIcon from "../../../asset/icon/ig.svg"
const UserFooter = () => {
    return (
        <footer className="user-footer">
            <div className="footer-up-container">
                <div className="footer-up-left-box">
                    <h1>Are you interested <br /> with <span style={{ fontWeight: "700", color: "#1D1E25" }}>PROM?</span></h1>
                    <Link to="/contact" className="footer-contact-button">
                        Contact Now
                    </Link>
                </div>
                <div className="footer-up-right-box">
                    <div className="footer-up-right-paragraph">
                        <h2 className="title-right-box">Company</h2>
                        <p>Customer Help Center <br /> Careers <br /> FAQs</p>
                    </div>
                    <div className="footer-up-right-paragraph">
                        <h2 className="title-right-box">Legal Information</h2>
                        <p>Privacy Policy <br /> Terms of Services <br />Cookies Policy</p>
                    </div>
                </div>

            </div>
            <div className="footer-down-container">
                <div className="footer-logo">
                    <img src={logoImg} alt="God of Prompt" /> <span style={{ fontSize: "28px", fontWeight: "700" }}>Prom</span>
                </div>

                <div className="footer-down-center">
                    <Link to="/home">
                        Home
                    </Link>
                    <Link to="/prompts">
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

                    <Link to="/products">
                        Products
                    </Link>
                    <Link to="/blog" >
                        Blog
                    </Link>
                    <Link to="/pricing" >
                        Pricing
                    </Link>

                    <Link to="/contact">
                        Contact
                    </Link>
                </div>
                <div className="footer-social-connect">
                    <a href=""><img src={facebookIcon} alt="" /></a>
                    <a href=""><img src={twitterIcon} alt="" /></a>
                    <a href=""><img src={igIcon} alt="" /></a>
                    <a href=""><img src={linkdleIcon} alt="" /></a>
                </div>

            </div>

            <div className="footer-bottom">
                <p>2025 All rights reserved © by Prom</p>
                <div className="footer-botton-right"> 
                    <a href="">Community guidelines</a>
                    <a href="">Term & Conditions</a>
                    <a href="">Privacy Policy</a>
                </div>

            </div>
        </footer>
    );
};

export default UserFooter;
