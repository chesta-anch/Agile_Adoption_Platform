import React, { useEffect, useState } from 'react';
import './Style.css'; // Import the shared CSS file
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from './logo.png';

function Training() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State to store knowledge level, attempt count, and completed modules
  const [knowledgeLevel, setKnowledgeLevel] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [completedModules, setCompletedModules] = useState(0);
  
  // Fetch data from localStorage on component mount
  useEffect(() => {
    setKnowledgeLevel(localStorage.getItem('knowledgeLevel') || '');
    setAttemptCount(parseInt(localStorage.getItem('attemptCount'), 10) || 0);
    setCompletedModules(parseInt(localStorage.getItem('completedModules'), 10) || 0);
  }, []);

  // Update the backend and local storage when a module is marked as completed
  const completeModule = async (moduleId) => {
    const newCompletedModules = completedModules + 1;
    setCompletedModules(newCompletedModules);
    localStorage.setItem('completedModules', newCompletedModules);
    
    // Update the backend with the new completed modules count
    const email = localStorage.getItem('email'); // Assuming the email is stored in localStorage after login
    await fetch('http://localhost:5000/update-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, completedModules: newCompletedModules }),
    });
  };

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session logic (adjust as needed)
    navigate('/login');
  };

  const handleAgileAdoptionClick = () => {
    if (knowledgeLevel === 'Expert' || knowledgeLevel === 'Master') {
      navigate('/agile-adoption');
    } else {
      alert("You need to achieve at least 'Expert' or 'Master' level to access Agile Adoption.");
    }
  };

  return (
    <div className='home-page'>
      <header className="home-header">
        <div className="logo-container">
          <img src={logo} alt="Agile Adoption Platform" className="home-logo" />
          <h1>Agile Adoption Platform</h1>
        </div>
        <nav className="home-nav">
          <ul>
            <li className={location.pathname === '/home' ? 'active' : ''}>
              <Link to="/home">Home</Link>
            </li>
            <li className={location.pathname === '/questionnaire' ? 'active' : ''}>
              <Link to="/questionnaire">Take Assessment</Link>
            </li>
            <li className={location.pathname === '/training' ? 'active' : ''}>
              {attemptCount > 0 ? (
                <Link to="/training">Explore Training Material</Link>
              ) : (
                <span className="disabled-link"
                  onClick={() => alert("You need to complete at least one attempt to access the training material.")} >
                  Explore Training Material
                </span>
              )}
            </li>
            <li onClick={handleAgileAdoptionClick} className={location.pathname === '/agile-adoption' ? 'active' : ''}>
              Proceed to Agile Adoption
            </li>
            <li onClick={handleLogout} className="logout-btn">
              Logout
            </li>
          </ul>
        </nav>
      </header>
      <div className="training-container">
        <h1>Training Material</h1>
        <p>Here are some resources to help you advance your knowledge of Agile:</p>
        <ul>
          {[
            { id: 1, title: "Agile Basics - Agile Alliance", url: "https://www.agilealliance.org/resources/what-is-agile/" },
            { id: 2, title: "Understanding Scrum - Scrum.org", url: "https://www.scrum.org/resources/what-is-scrum" },
            { id: 3, title: "Kanban Fundamentals - Atlassian", url: "https://www.atlassian.com/agile/kanban" },
            { id: 4, title: "User Story Mapping - Mountain Goat Software", url: "https://www.mountaingoatsoftware.com/agile/user-stories" },
            { id: 5, title: "Agile Knowledge Base - Agile Alliance", url: "https://www.agilealliance.org/resources/knowledge-base/" },
            { id: 6, title: "Continuous Delivery - ThoughtWorks", url: "https://www.thoughtworks.com/continuous-delivery" },
            { id: 7, title: "XP Practices - Agile Alliance", url: "https://www.agilealliance.org/exp-practices/" },
            { id: 8, title: "Lean Software Development", url: "https://www.lean.org/lean-articles/lean-software-development/" },
            { id: 9, title: "Agile Leadership - Scrum Alliance", url: "https://www.scrumalliance.org/agile-leadership" },
            { id: 10, title: "DevOps and Agile - DevOps.com", url: "https://devops.com/devops-agile/" }
          ].map((module) => (
            <li key={module.id} className="module-item">
              <div className="module-content">
                <a href={module.url} target="_blank" rel="noopener noreferrer">{module.title}</a>
                <button className="complete-btn" onClick={() => completeModule(module.id)} disabled={completedModules >= module.id}>
                  Mark as Completed
                </button>
              </div>
            </li>
          ))}
        </ul>
        <p>Completed Modules: {completedModules} / 10</p>
      </div>
    </div>
  );
}

export default Training;
