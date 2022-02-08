import { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

import styles from "../styles/components/game.module.scss";

interface PropsInterface {
  items: string[];
  score: string;
  setScore: React.Dispatch<React.SetStateAction<string>>;
  choice: string;
  setChoice: React.Dispatch<React.SetStateAction<string>>;
  setInGame: React.Dispatch<React.SetStateAction<boolean>>;
};

const resultsVariants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

const Game: React.FC<PropsInterface> = ({ items, score, setScore, choice, setChoice, setInGame }) => {
  const [house, setHouse] = useState("");
  const [winner, setWinner] = useState(0);
  const [isUserReady, setIsUserReady] = useState(false);
  const [isHouseReady, setIsHouseReady] = useState(false);

  const houseControls = useAnimation();

  useEffect(() => {
    if (!isUserReady) return;

    const randomIndex = Math.floor(Math.random() * 3);
    setHouse(items[randomIndex]);

    houseControls.start({
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    });
  }, [isUserReady]);

  useEffect(() => {
    if(!isHouseReady) return;

    const choiceIndex = items.indexOf(choice);
    const houseIndex = items.indexOf(house);
    const result = (((choiceIndex - houseIndex) % 3) + 3) % 3;

    if (result === 1) {
      const newScore = (parseInt(score) + 1).toString(10);
      localStorage.setItem("score", newScore);
      setScore(newScore);
      setWinner(0);
    } else if (result === 2) {
      if (parseInt(score) > 0) {
        const newScore = (parseInt(score) - 1).toString(10);
        localStorage.setItem("score", newScore);
        setScore(newScore);
      }
      setWinner(1);
    } else setWinner(2);
  }, [isHouseReady]);

  const handleEndGame = () => {
    setHouse("");
    setWinner(0);
    setIsUserReady(false);
    setIsHouseReady(false);
    setChoice("");
    setInGame(false);
  }

  return (
    <div className={styles.game}>
      <div className={`${styles.container} ${isHouseReady ? styles.larger : ""}`}>
        <div className={styles.user}>
          <h3 className={isUserReady ? styles.visible : ""}>You picked</h3>
          <motion.div
            className={`${styles.item} ${styles[choice]}`}
            layoutId={choice}
            onLayoutAnimationComplete={() => setIsUserReady(true)}
          >
            <img src={`/assets/svg/${choice}.svg`} alt={choice} />
          </motion.div>
        </div>

        <AnimatePresence>
          {isHouseReady && (
            <motion.div className={styles.results} initial="initial" animate="animate" variants={resultsVariants}>
              <h3>{winner === 0 ? "You win" : winner === 1 ? "You lose" : "Tie"}</h3>
              <div className={styles.button} onClick={handleEndGame}>Play again</div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.house}>
          <h3 className={isUserReady ? styles.visible : ""}>House picked</h3>
          <motion.div
            className={`${styles.item} ${house ? styles[house] : ""}`}
            initial={{ scale: 0 }}
            animate={houseControls}
            onAnimationComplete={() => setIsHouseReady(true)}
          >
            {house && (
              <img src={`/assets/svg/${house}.svg`} alt={house} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Game;