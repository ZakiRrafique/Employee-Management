import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

function Signup() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/backend/signup', {
        username: formData.username,
        password: formData.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setMessage('Signup successful!');
      console.log(response.data);

      // Redirect to employee dashboard after a short delay
      setTimeout(() => {
        navigate('../employee/EmployeeDashboard');
      }, 1000); // Optional delay to show success message

    } catch (error) {
      console.error('Signup Error:', error);
      setMessage('Signup failed. Check server.');
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
        {message && <p className="signup-message">{message}</p>}
      </form>
    </div>
  );
}

export default Signup;
