import React from "react";
import { Link } from "react-router-dom";
import "./UserFooter.css";

const UserFooter = () => {
    return (
        <footer className="user-footer">
            <div className="footer-container">
                {/* Logo */}
                <div className="footer-logo">
                    <img src="/prompts_img.avif" alt="God of Prompt" />
                </div>

                {/* About Section */}
                <div className="footer-section">
                    <h3>About God of Prompt</h3>
                    <p>God of Prompt provides <br /> cutting-edge AI products for <br /> streamlining your workflow.</p>
                </div>

                {/* Menu Section */}
                <div className="footer-section">
                    <h3>Menu</h3>
                    <ul>
                        <li><Link to="/prompts">Prompt Library</Link></li>
                        <li><Link to="/tool1">Prompt Generator</Link></li>
                        <li><Link to="/tool2">GPTs</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/pricing">Pricing</Link></li>
                        <li><Link to="/affiliates">Affiliates</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link to="/refund-policy">Refund Policy</Link></li>
                        <li><Link to="/terms-of-service">Terms of Service</Link></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="footer-section">
                    <h3>Follow God of Prompt</h3>
                    <div className="footer-social-icons">
                        <a href="" target="_blank" rel="noopener noreferrer">
                            <img src="https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/66a7a4b6108a1e5ce7781060_ni-linkedin.svg" loading="lazy" alt="" class="cf-footer-social-icon" />
                        </a>
                        <a href="" target="_blank" rel="noopener noreferrer">
                            <img src="https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/66a7a4b6d20aec5c7414457d_ni-facebook.svg" loading="lazy" alt="A facebook logo, clickable icon leading God of Prompt's facebook page" class="cf-footer-social-icon" />
                        </a>
                        <a href="" target="_blank" rel="noopener noreferrer">
                            <img src="https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/66a7a4b733000cc0c11e5f41_ni-x-brand.svg" loading="lazy" alt="A facebook logo, clickable icon leading God of Prompt's twitter " class="cf-footer-social-icon" />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <img src="https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/66a7a4b77e329e020f40b645_ni-instagram.svg" loading="lazy" alt="A facebook logo, clickable icon leading God of Prompt's instagram" class="cf-footer-social-icon" />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <img src="https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/66a7a4b6156200523594a37d_ni-youtube.svg" loading="lazy" alt="A facebook logo, clickable icon leading God of Prompt's youtube channel" class="cf-footer-social-icon" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>Copyright © 2025 <strong>Prompt Vietnam</strong>. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default UserFooter;
