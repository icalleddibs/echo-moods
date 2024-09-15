import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Button.css';

const Button = () => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate('/record');  // Next derisred route from Homepage
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
