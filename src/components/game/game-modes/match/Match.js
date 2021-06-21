import React, { useContext, useState } from "react";
import { motion, useAnimation } from "framer-motion";

import { GameContext } from "../../../../contexts/GameContext.js";
import Results from "./results/Results.js";

export default function Match({ icons, items, containerControls }) {
  const gameContext = useContext(GameContext);
  const [score] = gameContext.score;
  const [userItem] = gameContext.userItem;
  const [houseItem, setHouseItem] = gameContext.houseItem;
  const [handleScore] = gameContext.handleScore;

  const [isReady, setIsReady] = useState(false);
  const [message, setMessage] = useState("");

  const controlsHouseItem = useAnimation();
  const controlsUserItemTitle = useAnimation();
  const controlsHouseItemTitle = useAnimation();

  const handleLayoutAnimationComplete = () => {
    if (isReady) return;

    controlsUserItemTitle.start({ opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } });
    controlsHouseItemTitle.start({ opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } });

    const randomIndex = Math.floor(Math.random() * 3);

    setHouseItem(items[randomIndex]);
    setIsReady(true);

    controlsHouseItem.start({ scale: 1, transition: { duration: 0.5, ease: "easeInOut" } });
  }

  const handleAnimationComplete = () => {
    if (message) return;

    const userChoice = items.indexOf(userItem);
    const houseChoice = items.indexOf(houseItem);
    const result = (((userChoice - houseChoice) % 3) + 3) % 3;

    if (result === 0)
      setMessage("Tie");

    else if (result === 1) {
      handleScore(parseInt(score) + 1);
      setMessage("You win");
    }
    else if (result === 2) {
      handleScore(parseInt(score) - 1);
      setMessage("You lose");
    }

    if (window.innerWidth > 1024) containerControls.start({ width: "600px" });
    else containerControls.start({ width: "300px" });
  }

  return (
    <>
      <motion.h2 className="match__user-item-title" initial={{ opacity: 0 }} animate={controlsUserItemTitle}>You picked</motion.h2>
      <motion.h2 className="match__house-item-title" initial={{ opacity: 0 }} animate={controlsHouseItemTitle}>The house picked</motion.h2>

      <motion.div className="match__house-item" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="match__house-item-background"></div>
      </motion.div>

      <motion.div
        className="match__user-item"
        style={{ background: `linear-gradient(var(--${userItem}-gradient))`, boxShadow: `0 8px 0 var(--${userItem}-shadow)` }}
        layoutId={`${userItem}`}
        onLayoutAnimationComplete={handleLayoutAnimationComplete}
      >
        <div className="match__user-item-inner">
          <svg xmlns="http://www.w3.org/2000/svg" width={icons[userItem].width} height={icons[userItem].height}>
            <path d={icons[userItem].d} />
          </svg>
        </div>
      </motion.div>

      {
        isReady && (
          <motion.div
            className="match__house-item"
            style={{ background: `linear-gradient(var(--${houseItem}-gradient))`, boxShadow: `0px 8px 0px var(--${houseItem}-shadow)` }}
            initial={{ scale: 0 }}
            animate={controlsHouseItem}
            onAnimationComplete={handleAnimationComplete}
          >
            <div className="match__house-item-inner">
              <svg xmlns="http://www.w3.org/2000/svg" width={icons[houseItem].width} height={icons[houseItem].height}>
                <path d={icons[houseItem].d} />
              </svg>
            </div>
          </motion.div>
        )
      }

      {
        message && <Results message={message} containerControls={containerControls} />
      }
    </>
  );
}