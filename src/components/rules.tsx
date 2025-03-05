import { useCallback, useState } from "react";
import { getIconPath } from "@utils/icon-loader";

import styles from "@styles/components/rules.module.scss";

const Rules: React.FC = () => {
	const [isActive, setIsActive] = useState(false);

	const toggleRules = useCallback(() => setIsActive(!isActive), [isActive]);
	const closeRules = useCallback(() => setIsActive(false), []);

	return (
		<>
			<div className={styles["button"]} onClick={toggleRules}>
				Rules
			</div>

			<div
				className={`${styles["overlay"]} ${isActive ? styles["active"] : ""}`}
				onClick={closeRules}
			/>

			<div className={`${styles["rules"]} ${isActive ? styles["active"] : ""}`}>
				<div className={styles["top_section"]}>
					<h3>Rules</h3>

					<div className={styles["close"]} onClick={closeRules}>
						<img alt="close" src={getIconPath("close")} />
					</div>
				</div>

				<img alt="rules" src={getIconPath("rules")} />
			</div>
		</>
	);
};

export default Rules;
