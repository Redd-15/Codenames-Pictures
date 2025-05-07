/** Types of errors forwarded via socket */
export enum ErrorType {
  Other = 'other',
  RoomNotFound = 'room-not-found',
}

/** Types of teams in a game */
export enum TeamType {
  Red = 'red',
  Blue = 'blue',
}

/** Enum for the hidden card colours */
export enum CardColour {
  Red = 'red',
  Blue = 'blue',
  Grey = 'grey',
  Black = 'black',
  Unknown = 'unknown'
}

/** Message type for joining a room  */
export interface JoinMessage {
  username: string,
  roomId: number
}

/** Message type for picking a team */
export interface TeamPickerMessage {
  playerId: number,
  team: TeamType
}

/** Message type for the forwarding of player and room ids */
export interface IdMessage {
  playerId: number | null,
  roomId: number | null
}

/** Error message type */
export interface ErrorMessage {
  errorType: ErrorType,
  message: string
}

/** Hint type for the game */
export interface Hint {
  word: string,
  number: number // 0 means not, -1 means any number
}

/** Type of messages passed in in-game chat */
export interface ChatMessage {
  senderId: number,
  message: string
}
