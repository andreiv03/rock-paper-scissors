import type { ITEMS } from "@utils/constants";

export type Item = (typeof ITEMS)[number];

export type Player = "user" | "house" | null;

export interface Choices {
	user: Item | null;
	house: Item | null;
}

export interface Game {
	choices: Choices;
	isPlaying: boolean;
	score: number;
	winner: Player;
}

export type Action =
	| { type: "SET_CHOICES"; payload: Choices }
	| { type: "SET_IS_PLAYING"; payload: boolean }
	| { type: "UPDATE_SCORE"; payload: number }
	| { type: "SET_WINNER"; payload: Player }
	| { type: "PLAY_AGAIN" };
