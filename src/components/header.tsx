import { GameContext } from "@contexts/game-context";
import { useContextHook } from "@hooks/use-context-hook";
import { ITEMS } from "@utils/constants";

import styles from "@styles/components/header.module.scss";

const Header: React.FC = () => {
	const { state } = useContextHook(GameContext);

	return (
		<header className={styles["header"]}>
			<div className={styles["logo"]}>
				{ITEMS.map((item) => (
					<span key={item}>{item}</span>
				))}
			</div>

			<div className={styles["score"]}>
				<h3>Score</h3>
				<h4>{state.score}</h4>
			</div>
		</header>
	);
};

export default Header;
