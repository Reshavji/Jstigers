import React from 'react';

const Login = () => {
  const handleGoogleLogin = () => {
    // Redirect the user to the Google authentication URL
    window.location.href = 'http://localhost:9000/google';
  };

  return (
    <div style={styles.fullScreen}>
      <div style={styles.background}></div>
      <h1>Login Page</h1>
      <p>Click the button below to login with Google:</p>
      <button style={styles.googleButton} onClick={handleGoogleLogin}>
        Login with Google
      </button>
    </div>
  );
};

const styles = {
  fullScreen: {
    position: 'fixed',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    background: 'linear-gradient(90deg, rgba(255,247,173,1) 0%, rgba(255,231,189,1) 35%, rgba(255,180,238,1) 100%)',
    backgroundSize: '300% 300%',
    animation: 'backgroundAnimation 25s ease infinite',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  background: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'url(https://i.imgur.com/wCG2csZ.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: '-1',
  },
  googleButton: {
    backgroundColor: '#4285F4', // Google blue color
    color: '#fff',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    outline: 'none',
  },
  // Animation keyframes
  '@keyframes backgroundAnimation': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
};

export default Login;
