import { useCallback, useEffect, useMemo, useReducer } from "react";

import { GameContext } from "@contexts/game-context";
import type { Action, Choices, Game, Player } from "@typings/game-types";

const initialGameState: Game = {
	choices: { user: null, house: null },
	isPlaying: false,
	score: 0,
	winner: null,
};

const reducer = (state: Game, action: Action): Game => {
	switch (action.type) {
		case "SET_CHOICES":
			return { ...state, choices: action.payload };

		case "SET_IS_PLAYING":
			return { ...state, isPlaying: action.payload };

		case "UPDATE_SCORE":
			return { ...state, score: action.payload };

		case "SET_WINNER": {
			const scoreAdjustment =
				action.payload === "user" ? 1 : action.payload === "house" && state.score > 0 ? -1 : 0;

			return { ...state, score: state.score + scoreAdjustment, winner: action.payload };
		}

		case "PLAY_AGAIN":
			return { ...initialGameState, score: state.score };

		default:
			return state;
	}
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialGameState);

	useEffect(() => {
		const score = localStorage.getItem("score");
		if (score) {
			dispatch({ type: "UPDATE_SCORE", payload: parseInt(score, 10) });
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("score", state.score.toString());
	}, [state.score]);

	const setChoices = useCallback((choices: Choices) => {
		dispatch({ type: "SET_CHOICES", payload: choices });
	}, []);

	const setIsPlaying = useCallback((isPlaying: boolean) => {
		dispatch({ type: "SET_IS_PLAYING", payload: isPlaying });
	}, []);

	const setWinner = useCallback((winner: Player) => {
		dispatch({ type: "SET_WINNER", payload: winner });
	}, []);

	const playAgain = useCallback(() => {
		dispatch({ type: "PLAY_AGAIN" });
	}, []);

	const contextValue = useMemo(
		() => ({ state, setChoices, setIsPlaying, setWinner, playAgain }),
		[state, setChoices, setIsPlaying, setWinner, playAgain],
	);

	return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};
