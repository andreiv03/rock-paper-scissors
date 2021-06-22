import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { GameContext } from "../../contexts/GameContext.js";
import RulesImage from "../../assets/image-rules.svg";
import RulesImageBonus from "../../assets/image-rules-bonus.svg";
import CloseIcon from "../../assets/icon-close.svg";

export default function Rules() {
  const gameContext = useContext(GameContext);
  const [mode, setMode] = gameContext.mode;
  const [userItem] = gameContext.userItem;
  const [houseItem] = gameContext.houseItem;

  const [isActive, setIsActive] = useState(false);

  const handleChangeMode = () => {
    if (userItem || houseItem)
      return alert("You can't change the mode right now!");

    if (mode === "legacy") setMode("modern");
    else setMode("legacy");
  }

  return (
    <>
      <div className="buttons">
        <motion.div className="mode-button" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleChangeMode}>Mode</motion.div>
        <motion.div className="rules-button" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsActive(!isActive)}>Rules</motion.div>
      </div>

      <AnimatePresence>
        {
          isActive ? (
            <div className="rules">
              <motion.div
                className="rules-content"
                initial={{ top: "-50%" }}
                animate={{ top: "50%" }}
                exit={{ top: "-50%", transition: { duration: 0.2 } }}
              >
                <div className="rules-content__top-section">
                  <h2 className="rules-content__top-section-title">Rules</h2>

                  <div className="rules-content__top-section-close" onClick={() => setIsActive(false)}>
                    <img src={CloseIcon} alt="Close Icon" />
                  </div>
                </div>

                <img src={mode === "legacy" ? RulesImage : RulesImageBonus} alt="Rules" />
              </motion.div>

              <div className="rules-overlay" onClick={() => setIsActive(false)}></div>
            </div>
          ) : null
        }
      </AnimatePresence>
    </>
  );
}