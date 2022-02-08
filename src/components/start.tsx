import { motion } from "framer-motion";
import styles from "../styles/components/start.module.scss";

interface PropsInterface {
  items: string[];
  setChoice: React.Dispatch<React.SetStateAction<string>>;
  setInGame: React.Dispatch<React.SetStateAction<boolean>>;
};

const Start: React.FC<PropsInterface> = ({ items, setChoice, setInGame }) => {
  const handleInteraction = (item: string) => {
    setChoice(item);
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
            <img src={`/assets/svg/${item}.svg`} alt={item} />
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