import React, { useContext } from "react";

import { GameContext } from "../../contexts/GameContext.js";
import Logo from "../../assets/logo.svg";

export default function Header() {
  const gameContext = useContext(GameContext);
  const [score] = gameContext.score;
  
  return (
    <div className="header">
      <img src={Logo} alt="Logo" />
      
      <div className="header__score">
        <h2>Score</h2>
        <h3>{score}</h3>
      </div>
    </div>
  );
}