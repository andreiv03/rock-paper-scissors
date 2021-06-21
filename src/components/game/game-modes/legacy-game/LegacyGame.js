import React, { useContext } from "react"
import { motion, AnimateSharedLayout, AnimatePresence, useAnimation } from "framer-motion";

import { GameContext } from "../../../../contexts/GameContext.js";
import Match from "../match/Match.js";
import icons from "../icons.json";

export default function LegacyGame() {
  const gameContext = useContext(GameContext);
  const [userItem, setUserItem] = gameContext.userItem;

  const containerControls = useAnimation();

  const items = ["rock", "paper", "scissors"];
  const exitAnimation = {
    opacity: 0,
    transition: {
      duration: 0.1
    }
  }
  
  return (
    <motion.div className="legacy-game" animate={containerControls}>
      <AnimateSharedLayout type="crossfade">
        <AnimatePresence>
          {
            !userItem && items.map(item => (
              <motion.div
                key={item}
                className={`legacy-game__item legacy-game__${item}`}
                style={{ background: `linear-gradient(var(--${item}-gradient))`, boxShadow: `0px 8px 0px var(--${item}-shadow)` }}
                onClick={() => setUserItem(item)}
                layoutId={`${item}`}
                transition={{ duration: 0 }}
                exit={exitAnimation}
              >
                <div className="legacy-game__item-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" width={icons[item].width} height={icons[item].height}>
                    <path d={icons[item].d} />
                  </svg>
                </div>
              </motion.div>
            ))
          }

          {
            !userItem && (
              <motion.div className="legacy-game-layout" exit={exitAnimation}>
                <div className="legacy-game-layout__line"></div>
                <div className="legacy-game-layout__line"></div>
                <div className="legacy-game-layout__line"></div>
              </motion.div>
            )
          }

          {
            userItem && <Match icons={icons} items={items} containerControls={containerControls} />
          }
        </AnimatePresence>
      </AnimateSharedLayout>
    </motion.div>
  );
}