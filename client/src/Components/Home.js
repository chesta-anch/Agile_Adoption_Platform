import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Style.css'; // Ensure this CSS file is present in your project
import logo from './logo.png';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location/path

  // States for attempt count, knowledge level, name, and progress tracking
  const [attemptCount, setAttemptCount] = useState(0);
  const [knowledgeLevel, setKnowledgeLevel] = useState('');
  const [name, setName] = useState('');
  const [progress, setProgress] = useState({ completedModules: 0, totalModules: 0 });

  // Fetch user details from local storage
  useEffect(() => {
    const storedAttemptCount = parseInt(localStorage.getItem('attemptCount'), 10) || 0;
    const storedKnowledgeLevel = localStorage.getItem('knowledgeLevel') || '';
    const storedName = localStorage.getItem('name') || 'User';

    const storedCompletedModules = parseInt(localStorage.getItem('completedModules'), 10) || 0;
    const storedTotalModules = parseInt(localStorage.getItem('totalModules'), 10) || 10; // Assuming default is 10

    setAttemptCount(storedAttemptCount);
    setKnowledgeLevel(storedKnowledgeLevel);
    setName(storedName);
    setProgress({ completedModules: storedCompletedModules, totalModules: storedTotalModules });
  }, []);

  const handleStartQuestionnaire = () => {
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

  // Calculate progress percentage
  const progressPercentage = (progress.completedModules / progress.totalModules) * 100 || 0;

  return (
    <div className="home-page">
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
                  onClick={() => alert("You need to complete at least one attempt to access the training material.")}>
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
      <div className="home-container">
        <h2>Welcome {name} to the Agile Adoption Platform</h2>
        <p>
          Kickstart your Agile journey by assessing your knowledge with our questionnaire.
          Receive personalized training recommendations based on your score.
        </p>
        <button onClick={handleStartQuestionnaire} className="btn btn-primary btn-start">
          Start Questionnaire
        </button>

        {/* Progress Tracking Section */}
        <div className="progress-section">
          <h3>Your Training Progress</h3>
          {progress.totalModules > 0 ? (
            <div>
              <p>Completed {progress.completedModules} out of {progress.totalModules} modules.</p>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p>{Math.round(progressPercentage)}% Complete</p>

              {/* Show Knowledge Level inside or below progress bar */}
              <p><strong>Knowledge Level:</strong> {knowledgeLevel}</p>
            </div>
          ) : (
            <p>No training modules available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
