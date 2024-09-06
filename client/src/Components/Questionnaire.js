import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Style.css'; 
import logo from './logo.png';

const sections = [
  { id: 'section1', title: 'Agile Fundamentals' },
  { id: 'section2', title: 'Scrum Framework' },
  { id: 'section3', title: 'Kanban' },
  { id: 'section4', title: 'Extreme Programming (XP)' },
  { id: 'section5', title: 'Agile Practices' },
  { id: 'section6', title: 'Agile Metrics and Feedback' },
  { id: 'section7', title: 'Advanced Topics' },
];

function Questionnaire() {
  const [currentSection, setCurrentSection] = useState(sections[0].id);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [sectionIndex, setSectionIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [attemptCount, setAttemptCount] = useState(0);
  const [knowledgeLevel, setKnowledgeLevel] = useState('');

  useEffect(() => {
    const storedAttemptCount = parseInt(localStorage.getItem('attemptCount'), 10) || 0;
    const storedKnowledgeLevel = localStorage.getItem('knowledgeLevel') || '';

    setAttemptCount(storedAttemptCount);
    setKnowledgeLevel(storedKnowledgeLevel);
    
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/questions?sectionId=${currentSection}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched questions:', data); 
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [currentSection]);

  const handleChangeSection = (sectionId) => {
    setCurrentSection(sectionId);
    setSectionIndex(sections.findIndex(section => section.id === sectionId));
    setAnswers({}); // Reset answers for the new section
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [`${currentSection}-${questionIndex}`]: answer,
    }));
  };

  const handleNextSection = () => {
    if (sectionIndex < sections.length - 1) {
      handleChangeSection(sections[sectionIndex + 1].id);
    }
  };

  const handlePreviousSection = () => {
    if (sectionIndex > 0) {
      handleChangeSection(sections[sectionIndex - 1].id);
    }
  };

  const calculateScoreAndNavigate = async () => {
  let correctAnswers = 0;

  questions.forEach((question, index) => {
    if (question.correctAnswer === answers[`${currentSection}-${index}`]) {
      correctAnswers += 1;
    }
  });

  const percentage = (correctAnswers / questions.length) * 100;
  let knowledgeLevel = '';

  if (percentage >= 90) {
    knowledgeLevel = 'Master';
  } else if (percentage >= 75) {
    knowledgeLevel = 'Expert';
  } else if (percentage >= 60) {
    knowledgeLevel = 'Advanced';
  } else if (percentage >= 40) {
    knowledgeLevel = 'Intermediate';
  } else {
    knowledgeLevel = 'Beginner';
  }

  // Update the attempt count
  const email = sessionStorage.getItem('email'); // Assume user email is stored in sessionStorage
  const updatedAttemptCount = attemptCount + 1; // Increase the attempt count

  try {
    console.log(email);
    const response = await fetch('http://localhost:5000/update-attempt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: email,
        attemptCount: updatedAttemptCount,
        knowledgeLevel: knowledgeLevel
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Attempt count and knowledge level updated:', data);

    // Update local storage with the new values
    localStorage.setItem('attemptCount', data.attemptCount);
    localStorage.setItem('knowledgeLevel', data.knowledgeLevel);

    // Navigate to results page
    navigate('/results', { state: { percentage, knowledgeLevel } });
  } catch (error) {
    console.error('Error updating attempt count and knowledge level:', error);
  }
};


  const handleLogout = () => {
    sessionStorage.clear();
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
    <div>
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
                {/* Disable the link if attempt count is less than 1 */}
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
          <div className="questionnaire-container">
      <div className="nav">
        <ul>
          {sections.map((section) => (
            <li
              key={section.id}
              className={currentSection === section.id ? 'active' : ''}
              onClick={() => handleChangeSection(section.id)}
            >
              {section.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="questions">
        {questions.length === 0 ? (
          <p>Loading questions...</p>
        ) : (
          questions.map((item, index) => (
            <div key={index} className="question">
              <p>{item.question}</p>
              {item.options.map((option, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    name={`${currentSection}-${index}`}
                    value={option}
                    checked={answers[`${currentSection}-${index}`] === option}
                    onChange={() => handleAnswerChange(index, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          ))
        )}
        <div className="navigation-buttons">
          {sectionIndex > 0 && (
            <button onClick={handlePreviousSection} className="btn btn-secondary">Previous</button>
          )}
          {sectionIndex < sections.length - 1 ? (
            <button onClick={handleNextSection} className="btn btn-primary">Next</button>
          ) : (
            <button onClick={calculateScoreAndNavigate} className="btn btn-primary">Submit</button>
          )}
        </div>
      </div>
    </div>
    </div>

  );
}

export default Questionnaire;
