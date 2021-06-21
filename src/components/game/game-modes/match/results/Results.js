import React, { useContext } from "react";
import { motion } from "framer-motion";

import { GameContext } from "../../../../../contexts/GameContext.js";

export default function Results({ message, containerControls }) {
  const gameContext = useContext(GameContext);
  const [, setUserItem] = gameContext.userItem;
  const [, setHouseItem] = gameContext.houseItem;

  const handleButtonClick = () => {
    if (window.innerWidth > 1024) containerControls.start({ width: "450px", transition: { duration: 0 } });
    else containerControls.start({ width: "300px", transition: { duration: 0 } });

    setUserItem("");
    setHouseItem("");
  }

  return (
    <motion.div className="results">
      <h2 className="results-message">{message}</h2>
      <div className="results-button" onClick={handleButtonClick}>Play again</div>
    </motion.div>
  );
}