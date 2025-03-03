import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesMain from './routes/Routes';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <UserProvider>
    <Router>
      <RoutesMain />
    </Router>
  </UserProvider>

);

reportWebVitals();