import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Style.css'; // Import the shared CSS file
import logo from './logo.png';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve data passed from the Questionnaire component or from localStorage
  const [percentage, setPercentage] = useState(0);
  const [knowledgeLevel, setKnowledgeLevel] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    const locationState = location.state || {};
    const storedAttemptCount = parseInt(localStorage.getItem('attemptCount'), 10) || 0;
    const storedKnowledgeLevel = localStorage.getItem('knowledgeLevel') || '';

    setPercentage(locationState.percentage || 0);
    setKnowledgeLevel(locationState.knowledgeLevel || storedKnowledgeLevel);
    setAttemptCount(storedAttemptCount);
  }, [location.state]);

  const handleTrainingClick = () => {
    navigate('/training');
  };

  const handleAdoptionClick = () => {
    if (knowledgeLevel === 'Master' || knowledgeLevel === 'Expert') {
      navigate('/agile-adoption');
    }
  };

  const handleRetakeQuestionnaireClick = () => {
    navigate('/questionnaire');
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

  // Determine button color based on knowledge level
  const adoptionButtonClass = knowledgeLevel === 'Master' || knowledgeLevel === 'Expert' 
    ? 'btn btn-primary btn-green' 
    : 'btn btn-primary btn-red';

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
      <div className="results-container">
        <h1>Your Results</h1>
        <div className="result-details">
          <p><strong>Score:</strong> {percentage.toFixed(2)}%</p>
          <p><strong>Knowledge Level:</strong> {knowledgeLevel}</p>
        </div>
        <div className="feedback">
          <p>You can always access training materials to enhance your Agile knowledge or learn something new.</p>
          <button className="btn btn-primary" onClick={handleTrainingClick}>Explore Training Material</button>
          <button 
            className={adoptionButtonClass} 
            onClick={handleAdoptionClick} 
            disabled={knowledgeLevel !== 'Master' && knowledgeLevel !== 'Expert'}
          >
            Proceed to Agile Adoption
          </button>
          {knowledgeLevel !== 'Master' && knowledgeLevel !== 'Expert' && (
            <p className="info-text">Agile adoption is recommended once you've reached the Expert or Master level.</p>
          )}
          <button className="btn btn-secondary" onClick={handleRetakeQuestionnaireClick}>Retake Questionnaire</button>
        </div>
      </div>
    </div>
  );
}

export default Results;
