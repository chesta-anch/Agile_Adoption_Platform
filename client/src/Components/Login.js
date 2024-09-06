import React, { useState } from 'react';
import './Form.css'; // Ensure this CSS file is present in your project
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [progress, setProgress] = useState({ completedModules: 0, totalModules: 0 });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    // Check for empty fields and set error messages
    if (!email) {
      setEmailError('Email is required.');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required.');
      hasError = true;
    } else {
      setPasswordError('');
    }

    // Stop form submission if there are errors
    if (hasError) {
      return;
    }

    try {
      // Send login request to backend
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.status === "ok") {
        // Handle successful login
        sessionStorage.setItem('email', email);

        // Store all user details in local storage
        localStorage.setItem('name', data.name);
        localStorage.setItem('attemptCount', data.attemptCount || '0');
        localStorage.setItem('knowledgeLevel', data.knowledgeLevel || 'Beginner');

        // Store progress data in state
        setProgress({
          completedModules: data.completedModules || 0,
          totalModules: data.totalModules || 0,
        });

        // Show success toast and navigate to home after 3 seconds
        toast.success('Login Successful! Redirecting to Home...', {
          autoClose: 3000, // Close after 3 seconds
          onClose: () => navigate('/home'), // Navigate to home after toast disappears
        });
      } else {
        // Handle login error
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while trying to login.');
    }
  };

  return (
    <div>
      <header className="home-header">
        <div className="logo-container">
          <img src={logo} alt="Agile Adoption Platform" className="home-logo" />
          <h1>Agile Adoption Platform</h1>
        </div>
      </header>
      <div className="login-container">
        <ToastContainer />
        <div className="login-wrapper">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <span className="error-message">{emailError}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && <span className="error-message">{passwordError}</span>}
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <p className="signup-link">
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </form>

          {/* Progress Tracking */}
          {progress.totalModules > 0 && (
            <div className="progress-container">
              <h3>Progress</h3>
              <p>
                Completed Modules: {progress.completedModules}/{progress.totalModules}
              </p>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${(progress.completedModules / progress.totalModules) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
