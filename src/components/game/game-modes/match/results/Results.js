import React, { useContext } from "react";
import { motion } from "framer-motion";

import { GameContext } from "../../../../../contexts/GameContext.js";

export default function Results({ message, containerControls }) {
  const gameContext = useContext(GameContext);
  const [, setUserItem] = gameContext.userItem;
  const [, setHouseItem] = gameContext.houseItem;
  const [, setWinner] = gameContext.winner;

  const handleButtonClick = () => {
    if (window.innerWidth > 1024)
      containerControls.start({ width: "450px", transition: { duration: 0 } });

    setUserItem("");
    setHouseItem("");
    setWinner("");
  }

  return (
    <motion.div className="results" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.2, ease: "easeInOut" } }}>
      <h2 className="results-message">{message}</h2>
      <div className="results-button" onClick={handleButtonClick}>Play again</div>
    </motion.div>
  );
}