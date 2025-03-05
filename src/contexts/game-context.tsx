import { createContext } from "react";
import type { Choices, Game, Player } from "@typings/game-types";

interface GameContextType {
	state: Game;
	setChoices: (choices: Choices) => void;
	setIsPlaying: (isPlaying: boolean) => void;
	setWinner: (winner: Player) => void;
	playAgain: () => void;
}

export const GameContext = createContext<GameContextType | null>(null);
