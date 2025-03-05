import { lazy } from "react";
import { LayoutGroup } from "framer-motion";

import { GameContext } from "@contexts/game-context";
import { useContextHook } from "@hooks/use-context-hook";

import "@styles/globals.scss";
import Header from "@components/header";
import Rules from "@components/rules";

const Start = lazy(() => import("@components/start"));
const Game = lazy(() => import("@components/game"));

const App: React.FC = () => {
	const { state } = useContextHook(GameContext);

	return (
		<>
			<Header />
			<Rules />
			<LayoutGroup>{!state.isPlaying ? <Start /> : <Game />}</LayoutGroup>
		</>
	);
};

export default App;
