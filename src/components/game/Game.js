import React, { useContext } from "react";

import { GameContext } from "../../contexts/GameContext.js";
import LegacyGame from "./game-modes/legacy-game/LegacyGame.js";
import ModernGame from "./game-modes/modern-game/ModernGame.js";

export default function Game() {
  const gameContext = useContext(GameContext);
  const [mode] = gameContext.mode;

  return (
    <div className="game">
      {
        mode === "legacy" ? <LegacyGame /> : <ModernGame />
      }    
    </div>
  );
}