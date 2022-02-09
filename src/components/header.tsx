import { useContext } from "react";

import { GameContext } from "../contexts/game-context";
import styles from "../styles/components/header.module.scss";

const Header: React.FC = () => {
  const { score } = useContext(GameContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span>Rock</span>
        <span>Paper</span>
        <span>Scissors</span>
      </div>

      <div className={styles.score}>
        <h3>Score</h3>
        <h4>{score}</h4>
      </div>
    </header>
  );
}

export default Header;