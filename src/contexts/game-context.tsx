import { createContext, useState, useEffect } from "react";
import type { ChoicesInterface } from "../interfaces/game-interfaces";

interface ProviderStateInterface {
  score: number;
  choices: [ChoicesInterface, React.Dispatch<React.SetStateAction<ChoicesInterface>>];
  inGame: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  winner: [string, React.Dispatch<React.SetStateAction<string>>];
};

export const GameContext = createContext<ProviderStateInterface>({} as ProviderStateInterface);

export const GameProvider: React.FC = ({ children }) => {
  const [score, setScore] = useState(0);
  const [choices, setChoices] = useState<ChoicesInterface>({ user: "", house: "" });
  const [inGame, setInGame] = useState(false);
  const [winner, setWinner] = useState("");

  useEffect(() => {
    const scoreValue = localStorage.getItem("score");
    if (scoreValue) setScore(parseInt(scoreValue));
    else localStorage.setItem("score", "0");
  }, []);

  useEffect(() => {
    const scoreValue = localStorage.getItem("score");
    if (!score || !scoreValue || score === parseInt(scoreValue)) return;
    localStorage.setItem("score", score.toString(10));
  }, [score])

  useEffect(() => {
    if (winner === "user") setScore(prevState => prevState + 1);
    else if (winner === "house") setScore(prevState => prevState > 0 ? prevState - 1 : 0);
  }, [winner]);

  const state: ProviderStateInterface = {
    score,
    choices: [choices, setChoices],
    inGame: [inGame, setInGame],
    winner: [winner, setWinner]
  };

  return (
    <GameContext.Provider value={state}>
      {children}
    </GameContext.Provider>
  );
}