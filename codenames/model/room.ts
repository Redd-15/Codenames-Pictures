import { Card } from "./card"
import { TeamType, Hint } from "./message-interfaces"
import { Player } from "./player"

/** Type for game room handling */
export interface Room {
  roomId: number,
  players: Player[],
  cards: Card[],
  isStarted: boolean,
  turn: TeamType,
  remainingGuesses: number,
  currentHint: Hint | null
}

