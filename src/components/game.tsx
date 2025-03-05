import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { GameContext } from "@contexts/game-context";
import { useContextHook } from "@hooks/use-context-hook";
import type { Item } from "@typings/game-types";
import { ITEMS } from "@utils/constants";
import { getIconPath } from "@utils/icon-loader";

import styles from "@styles/components/game.module.scss";

const Game: React.FC = () => {
	const { state, setChoices, setWinner, playAgain } = useContextHook(GameContext);

	const [isUserReady, setIsUserReady] = useState(false);
	const [isHouseReady, setIsHouseReady] = useState(false);

	useEffect(() => {
		if (!state.choices.user) {
			return;
		}

		const timer = setTimeout(() => {
			const houseChoice = ITEMS[Math.floor(Math.random() * ITEMS.length)] as Item;
			setChoices({ user: state.choices.user, house: houseChoice });
			setIsHouseReady(true);
		}, 1000);

		setIsUserReady(true);
		return () => clearTimeout(timer);
	}, [state.choices.user, setChoices]);

	useEffect(() => {
		if (!isHouseReady || !state.choices.user || !state.choices.house) {
			return;
		}

		const userChoiceIndex = ITEMS.indexOf(state.choices.user);
		const houseChoiceIndex = ITEMS.indexOf(state.choices.house);

		if (userChoiceIndex === -1 || houseChoiceIndex === -1) {
			return;
		}

		const result = (userChoiceIndex - houseChoiceIndex + ITEMS.length) % ITEMS.length;
		setWinner(result === 1 ? "user" : result === 2 ? "house" : null);
	}, [isHouseReady, state.choices.user, state.choices.house, setWinner]);

	const getResultsMessage = () => {
		return state.winner === "user" ? "You win" : state.winner === "house" ? "You lose" : "Tie";
	};

	const handleEndGame = () => {
		playAgain();
		setIsUserReady(false);
		setIsHouseReady(false);
	};

	return (
		<div className={styles["game"]}>
			<div className={`${styles["container"]} ${isHouseReady ? styles["larger"] : ""}`}>
				<div className={styles["user"]}>
					<h3 className={isUserReady ? styles["visible"] : ""}>You picked</h3>
					<motion.div
						className={`${styles["item"]} ${styles[state.choices.user as Item]}`}
						layoutId={state.choices.user as Item}
					>
						<img alt={state.choices.user as Item} src={getIconPath(state.choices.user as Item)} />
					</motion.div>
				</div>

				<AnimatePresence>
					{isHouseReady && (
						<motion.div
							className={styles["results"]}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } }}
						>
							<h3>{getResultsMessage()}</h3>
							<div className={styles["button"]} onClick={handleEndGame}>
								Play again
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				<div className={styles["house"]}>
					<h3 className={isUserReady ? styles["visible"] : ""}>House picked</h3>
					<motion.div
						className={`${styles["item"]} ${styles[state.choices.house as Item]}`}
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { duration: 0.3, ease: "easeInOut" } }}
					>
						{state.choices.house && (
							<img
								alt={state.choices.house as Item}
								src={getIconPath(state.choices.house as Item)}
							/>
						)}
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Game;
