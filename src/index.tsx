import React from "react";
import ReactDOM from "react-dom";
import { AnimateSharedLayout } from "framer-motion";

import { GameContext, GameProvider } from "./contexts/game-context";

import "./styles/globals.scss";
import Header from "./components/header";
import Rules from "./components/rules";
import Start from "./components/start";
import Game from "./components/game";

const items = ["rock", "paper", "scissors"];

const App: React.FC = () => {
  return (
    <GameProvider>
      <Header />
      <Rules />
      <AnimateSharedLayout>
        <GameContext.Consumer>
          {({ inGame: [inGame] }) => !inGame ? <Start items={items} /> : <Game items={items} />}
        </GameContext.Consumer>
      </AnimateSharedLayout>
    </GameProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);