import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import './UserLayout.css';

const UserLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="user-container">
      {/* Navbar */}
      <nav className="user-navbar">
        <div className="user-nav-left">
          <Link to="/" className="user-logo">&gt;-</Link>

          <div className="user-nav-links">
            <Link 
              to="/prompts" 
              className={`user-nav-item ${location.pathname === '/prompts' ? 'user-active' : ''}`}
            >
              Prompts
            </Link>

            <div className="user-dropdown">
              <button className="user-dropdown-btn">Tools ▼</button>
              <div className="user-dropdown-menu">
                <Link to="/tool1" className="user-dropdown-item">Prompts Generator</Link>
                <Link to="/tool2" className="user-dropdown-item">GPTs</Link>
              </div>
            </div>

            <Link 
              to="/products" 
              className={`user-nav-item ${location.pathname === '/products' ? 'user-active' : ''}`}
            >
              Products
            </Link>

            <Link 
              to="/pricing" 
              className={`user-nav-item ${location.pathname === '/pricing' ? 'user-active' : ''}`}
            >
              Pricing
            </Link>

            <Link 
              to="/contact" 
              className={`user-nav-item ${location.pathname === '/contact' ? 'user-active' : ''}`}
            >
              Contact Us
            </Link>

            <Link 
              to="/blog" 
              className={`user-nav-item ${location.pathname === '/blog' ? 'user-active' : ''}`}
            >
              Blog
            </Link>
          </div>
        </div>
        
        <div className="user-nav-right">
          <Link to="/logout" className="user-logout">Log out</Link>
          <button className="user-menu-btn">☰</button>
          <div className="user-avatar"></div>
        </div>
      </nav>

      {/* Spacer để tránh navbar che nội dung */}
      <div className="user-spacer"></div>

      {/* Nội dung chính */}
      <main className="user-main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
