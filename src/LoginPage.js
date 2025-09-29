import React, { useState, useEffect } from 'react';
import './LoginPage.css'; // Make sure this CSS file exists

function LoginPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [message, setMessage] = useState(''); // For any future login messages

  // Effect to apply/remove dark mode class to the body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]); // Re-run effect when isDarkMode changes

  const handleGoogleSignIn = () => {
    setMessage('Initiating Google Sign-In...');
    // In a real application, you would integrate the Google Sign-In SDK here.
    // This typically involves:
    // 1. Initializing the Google API client.
    // 2. Opening a Google login popup.
    // 3. Handling the callback with user credentials.
    // For now, it's a placeholder.
    console.log("Google Sign-In functionality would go here.");
    // After successful sign-in, you might clear message or redirect.
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`login-page-wrapper ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Dark/Light Mode Toggle Button */}
      <button className="theme-toggle-button" onClick={toggleDarkMode}>
        {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      <div className="login-card">
        <h1>KIIT LibTrack</h1>
        
        {/* App logo at top */}
        <img src="/logo.png" alt="App logo" className="app-logo" />

        {/* Google Sign-In Button (restored icon) */}
        <button 
          className="google-signin-button" 
          onClick={handleGoogleSignIn}
        >
          <img 
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo" 
            className="google-logo" 
          />
          Sign in with Google
        </button>
        
        <p className="restriction-note">
         Note: Login is restricted to KIIT mail id only.
        </p>

        {message && <p className="status-message">{message}</p>}
      </div>
    </div>
  );
}

export default LoginPage;