import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import RoutesMain from './routes/Routes';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Component ScrollToTop
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("Scroll reset triggered for:", pathname);
    window.scrollTo(0, 0); // Reset scroll về đầu trang
  }, [pathname]);

  return null;
};
root.render(
  <UserProvider>
    <Router>
      <ScrollToTop />
      <RoutesMain />
    </Router>
  </UserProvider>

);

reportWebVitals();