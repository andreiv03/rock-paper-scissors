import styles from "../styles/components/header.module.scss";

interface PropsInterface {
  score: string;
};

const Header: React.FC<PropsInterface> = ({ score }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={"/assets/svg/logo.svg"} alt="Rock, Paper, Scissors" />
      </div>

      <div className={styles.score}>
        <h3>Score</h3>
        <h4>{score}</h4>
      </div>
    </header>
  );
}

export default Header;