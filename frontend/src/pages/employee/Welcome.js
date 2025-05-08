import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.headlines}>
        
        <h1 style={styles.subHeading}>From WhatsApp to Web: A Smarter Way to Manage Security Staff</h1>
      </div>
      <h1 style={styles.heading}>Welcome to Our Employee Management System</h1>
      <div style={styles.buttonContainer}>
        <button onClick={() => navigate('/login')} style={styles.button}>Login</button>
        <button onClick={() => navigate('/signup')} style={styles.button}>Signup</button>
        <br>
        </br>
        <button onClick={() => navigate('/admin')} style={styles.button} class="adminbtn">Admin Login</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#001f3f',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Orbitron, sans-serif',
    padding: '0 20px',
    textAlign: 'center'
  },
  headlines: {
    marginBottom: '30px'
  },
  subHeading: {
    fontSize: '1.2em',
    margin: '10px 0',
    maxWidth: '800px'
  },
  heading: {
    fontSize: '2.5em',
    marginBottom: '40px'
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px'
  },
  button: {
    backgroundColor: '#013220',
    color: 'white',
    padding: '12px 30px',
    fontSize: '1em',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  adminbtn: {
    backgroundColor:'#2980b9',
  },

};

export default Welcome;
