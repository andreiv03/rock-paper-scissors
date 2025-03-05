import { useCallback } from "react";
import { motion } from "framer-motion";

import { GameContext } from "@contexts/game-context";
import { useContextHook } from "@hooks/use-context-hook";
import type { Item } from "@typings/game-types";
import { ITEMS } from "@utils/constants";
import { getIconPath } from "@utils/icon-loader";

import styles from "@styles/components/start.module.scss";

const Start: React.FC = () => {
	const { setChoices, setIsPlaying } = useContextHook(GameContext);

	const chooseItem = useCallback(
		(item: Item) => {
			setChoices({ user: item, house: null });
			setIsPlaying(true);
		},
		[setChoices, setIsPlaying],
	);

	return (
		<div className={styles["start"]}>
			<div className={styles["items"]}>
				<div className={styles["lines"]}>
					{ITEMS.map((_, index) => (
						<span key={index} />
					))}
				</div>

				{ITEMS.map((item) => (
					<motion.div
						className={`${styles["item"]} ${styles[item]}`}
						key={item}
						layoutId={item}
						onClick={() => chooseItem(item)}
						transition={{ duration: 0 }}
					>
						<img alt={item} src={getIconPath(item)} />
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default Start;
