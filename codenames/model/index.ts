/** Constant for the number of picture cards */
export const MAX_CARD_NO = 279

/** Enum for message types FROM SERVER */
export enum ServerMessageType {
  TestMessage = 'serverTest'
}

/** Enum for message types FROM CLIENT */
export enum ClientMessageType {
  TestMessage = 'clientTest'
}

/** Enum for the hidden card colours */
export enum CardColour {
  Red = 'red',
  Blue = 'blue',
  Grey = 'grey',
  Black = 'black',
  Unknown = 'unknown'
}

export const AGENT_CARD_NO = {
  'red': 2,
  'blue': 2,
  'grey': 2,
  'black': 1
}
