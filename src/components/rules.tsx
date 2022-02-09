import { useState } from "react";
import styles from "../styles/components/rules.module.scss";

const Rules: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className={styles.button} onClick={() => setIsActive(!isActive)}>Rules</div>
      <div className={`${styles.overlay} ${isActive ? styles.active : ""}`} onClick={() => setIsActive(false)} />
      <div className={`${styles.rules} ${isActive ? styles.active : ""}`}>
        <div className={styles.top_section}>
          <h3>Rules</h3>
          <div className={styles.close} onClick={() => setIsActive(false)}>
            <img src="/assets/svg/close.svg" alt="Close" />
          </div>
        </div>
        <img src="/assets/svg/rules.svg" alt="Rules" />
      </div>
    </>
  );
}

export default Rules;