import React, { createContext, useState, useEffect } from "react";

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [mode, setMode] = useState("legacy");
  const [userItem, setUserItem] = useState("");
  const [houseItem, setHouseItem] = useState("");
  const [winner, setWinner] = useState("");
  
  useEffect(() => {
    const score = localStorage.getItem("score");

    if (!score) localStorage.setItem("score", "0");
    else setScore(localStorage.getItem("score"));
  }, []);

  useEffect(() => {
    localStorage.setItem("score", score);
  }, [score])

  const handleScore = newScore => {
    if (newScore < 0) return;
    else setScore(newScore);
  }

  const handleWinner = (userChoice, houseChoice) => {
    if (mode === "legacy") {
      const result = (((userChoice - houseChoice) % 3) + 3) % 3;

      if (result === 1) {
        handleScore(parseInt(score) + 1);
        setWinner("user");
        return "user";
      }

      else if (result === 2) {
        handleScore(parseInt(score) - 1);
        setWinner("house");
        return "house";
      }
    } else if (mode === "modern") {
      const result = (((userChoice - houseChoice) % 5) + 5) % 5;

      if (result === 1 || result === 2) {
        handleScore(parseInt(score) + 1);
        setWinner("user");
        return "user";
      }

      else if (result === 3 || result === 4) {
        handleScore(parseInt(score) - 1);
        setWinner("house");
        return "house";
      }
    }

    return "";
  }

  const state = {
    score: [score, setScore],
    mode: [mode, setMode],
    userItem: [userItem, setUserItem],
    houseItem: [houseItem, setHouseItem],
    winner: [winner, setWinner],
    handleWinner: [handleWinner],
  }

  return (
    <GameContext.Provider value={state}>
      {children}
    </GameContext.Provider>
  );
}