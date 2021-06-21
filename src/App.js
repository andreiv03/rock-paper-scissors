import React from "react";

import { GameContextProvider } from "./contexts/GameContext.js";
import Header from "./components/header/Header.js";
import Game from "./components/game/Game.js";
import Buttons from "./components/buttons/Buttons.js";

export default function App() {
  return (
    <div className="app">
      <GameContextProvider>
        <Header />
        <Game />
        <Buttons />
      </GameContextProvider>
    </div>
  );
}