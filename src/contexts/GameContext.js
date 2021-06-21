import React, { createContext, useState, useEffect } from "react";

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [mode, setMode] = useState("legacy");
  const [userItem, setUserItem] = useState("");
  const [houseItem, setHouseItem] = useState("");
  
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

  const state = {
    score: [score, setScore],
    mode: [mode, setMode],
    userItem: [userItem, setUserItem],
    houseItem: [houseItem, setHouseItem],
    handleScore: [handleScore]
  }

  return (
    <GameContext.Provider value={state}>
      {children}
    </GameContext.Provider>
  );
}