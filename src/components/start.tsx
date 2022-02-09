import { useContext } from "react";
import { motion } from "framer-motion";

import { GameContext } from "../contexts/game-context";
import styles from "../styles/components/start.module.scss";

interface PropsInterface {
  items: string[];
};

const Start: React.FC<PropsInterface> = ({ items }) => {
  const { choices: [choices, setChoices], inGame: [, setInGame] } = useContext(GameContext);

  const handleInteraction = (item: string) => {
    setChoices({ ...choices, user: item });
    setInGame(true);
  }

  return (
    <div className={styles.start}>
      <div className={styles.items}>
        {items.map((item, index) => (
          <motion.div
            key={index}
            className={`${styles.item} ${styles[item]}`}
            layoutId={item}
            transition={{ duration: 0 }}
            onClick={() => handleInteraction(item)}
          >
            <img src={`assets/svg/${item}.svg`} alt={item} />
          </motion.div>
        ))}

        <div className={styles.lines}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export default Start;