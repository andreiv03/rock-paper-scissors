import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AnimateSharedLayout } from "framer-motion";

import "./styles/globals.scss";
import Header from "./components/header";
import Start from "./components/start";
import Game from "./components/game";

const items = ["rock", "paper", "scissors"];

const App: React.FC = () => {
  const [score, setScore] = useState("0");
  const [choice, setChoice] = useState("");
  const [inGame, setInGame] = useState(false);

  useEffect(() => {
    const score = localStorage.getItem("score");
    if (score) setScore(score);
    else localStorage.setItem("score", "0");
  }, [score]);

  return (
    <>
      <Header score={score} />
      <AnimateSharedLayout>
        {!inGame ? (
          <Start items={items} setChoice={setChoice} setInGame={setInGame} />
        ) : (
          <Game items={items} score={score} setScore={setScore} choice={choice} setChoice={setChoice} setInGame={setInGame} />
        )}
      </AnimateSharedLayout>
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);