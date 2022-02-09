import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { GameContext } from "../contexts/game-context";
import { houseVariants, resultsVariants } from "../variants/game-variants";

import styles from "../styles/components/game.module.scss";

interface PropsInterface {
  items: string[];
};

const Game: React.FC<PropsInterface> = ({ items }) => {
  const { choices: [choices, setChoices], inGame: [, setInGame], winner: [winner, setWinner] } = useContext(GameContext);

  const [isUserReady, setIsUserReady] = useState(false);
  const [isHouseReady, setIsHouseReady] = useState(false);

  const handleLayoutAnimationComplete = () => {
    setIsUserReady(true);

    const randomIndex = Math.floor(Math.random() * 3);
    setChoices({ ...choices, house: items[randomIndex] });
  }

  const handleAnimationComplete = () => {
    setIsHouseReady(true);

    const userChoiceIndex = items.indexOf(choices.user);
    const houseChoiceIndex = items.indexOf(choices.house);
    const result = (((userChoiceIndex - houseChoiceIndex) % 3) + 3) % 3;

    switch (result) {
      case 1: return setWinner("user");
      case 2: return setWinner("house");
    }
  }

  const handleEndGame = () => {
    setChoices({ user: "", house: "" });
    setInGame(false);
    setWinner("");
    setIsUserReady(false);
    setIsHouseReady(false);
  }

  return (
    <div className={styles.game}>
      <div className={`${styles.container} ${isHouseReady ? styles.larger : ""}`}>
        <div className={styles.user}>
          <h3 className={isUserReady ? styles.visible : ""}>You picked</h3>
          <motion.div
            className={`${styles.item} ${styles[choices.user]}`}
            layoutId={choices.user}
            onLayoutAnimationComplete={handleLayoutAnimationComplete}
          >
            <img src={`/assets/svg/${choices.user}.svg`} alt={choices.user} />
          </motion.div>
        </div>

        <AnimatePresence>
          {isHouseReady && (
            <motion.div className={styles.results} initial="initial" animate="animate" variants={resultsVariants}>
              <h3>{winner === "user" ? "You win" : winner === "house" ? "You lose" : "Tie"}</h3>
              <div className={styles.button} onClick={handleEndGame}>Play again</div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.house}>
          <h3 className={isUserReady ? styles.visible : ""}>House picked</h3>
          <motion.div
            className={`${styles.item} ${choices.house ? styles[choices.house] : ""}`}
            initial={{ scale: 0 }}
            animate={choices.house && houseVariants}
            onAnimationComplete={handleAnimationComplete}
          >
            {choices.house && <img src={`/assets/svg/${choices.house}.svg`} alt={choices.house} />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Game;