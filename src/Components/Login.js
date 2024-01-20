import React from 'react';

const Login = () => {
  const handleGoogleLogin = () => {
    // Redirect the user to the Google authentication URL
    window.location.href = 'http://localhost:9000/google';
  };

  return (
    <div style={styles.container}>
      <h2>Login Page</h2>
      <p>Click the button below to login with Google:</p>
      <button style={styles.googleButton} onClick={handleGoogleLogin}>
        Login with Google
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
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
};

export default Login;
