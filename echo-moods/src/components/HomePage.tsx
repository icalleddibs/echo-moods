// src/HomePage.js

import React from "react";
import Button from "./Button/Button";
import Header from "./Header/Header";
import BodyText from "./BodyText/BodyText";

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <BodyText />
      <Button />
    </div>
  );
};

export default HomePage;



/* import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/personal-info');
  };

  return (
    <div>
      <h1>Welcome to Roommate Matching App</h1>
      <p>This is the home page</p>
      <button onClick={handleGetStarted}>Get Started</button>
    </div>
  );
} 

export default HomePage; */


