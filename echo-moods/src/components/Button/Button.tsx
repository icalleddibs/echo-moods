import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './Button.css';

const Button = () => {
  const navigate = useNavigate();  // Initialize useNavigate

  const handleClick = () => {
    navigate('/record');  // Navigate to the desired route
  };

  return (
    <div className="button-container">
      <button className="custom-button" onClick={handleClick}>
        Get Started
      </button>
    </div>
  );
};

export default Button;
