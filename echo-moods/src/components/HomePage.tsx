/*
Webpage Home Page
*/

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
