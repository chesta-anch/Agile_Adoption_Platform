// client/src/Components/Layout.js
import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import './Style.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session logic (adjust as needed)
    navigate('/login');
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="logo-container">
          <img src="/logo.png" alt="Agile Adoption Platform" className="home-logo" />
          <h1>Agile Adoption Platform</h1>
        </div>
        <nav className="home-nav">
          <ul>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/">Home</Link>
            </li>
            <li className={location.pathname === '/questionnaire' ? 'active' : ''}>
              <Link to="/questionnaire">Take Assessment</Link>
            </li>
            <li className={location.pathname === '/training' ? 'active' : ''}>
              <Link to="/training">Explore Training Material</Link>
            </li>
            <li className={location.pathname === '/agile-adoption' ? 'active' : ''}>
              <Link to="/agile-adoption">Proceed to Agile Adoption</Link>
            </li>
            <li onClick={handleLogout} className="logout-btn">Logout</li>
          </ul>
        </nav>
      </header>
      <main className="home-container">
        <Outlet /> {/* This renders the content of the currently active route */}
      </main>
    </div>
  );
}

export default Header;
