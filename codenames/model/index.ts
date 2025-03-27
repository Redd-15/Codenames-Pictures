/** Constant for the number of picture cards */
export const MAX_CARD_NO = 279

/** Enum for message types FROM SERVER */
export enum ServerMessageType {
  TestMessage = 'serverTest',
  ReceiveId = 'receiveId',
  ReceiveRoom = 'receiveRoom',
  ReceiveHint = 'receiveHint',
  ReceiveGuess = 'receiveGuess',
  GameOver = 'gameOver',
  Error = 'error',
  ReceiveTeamMessage = 'receiveTeamMessage',
  ReceiveGlobalMessage = 'receiveGlobalMessage'
}

/** Enum for message types FROM CLIENT */
export enum ClientMessageType {
  TestMessage = 'clientTest',
  CreateRoom = 'createRoom',
  JoinRoom = 'joinRoom',
  LeaveRoom = 'leaveRoom',
  GetId = 'getId',
  PickTeam = 'pickTeam',
  PickSpymaster = 'pickSpymaster',
  StartGame = 'startGame',
  GiveHint = 'giveHint',
  MakeGuess = 'makeGuess',
  EndGuessing = 'endGuessing',
  SendTeamMessage = 'sendTeamMessage',
  SendGlobalMessage = 'sendGlobalMessage'
}

/** Enum for the hidden card colours */
export enum CardColour {
  Red = 'red',
  Blue = 'blue',
  Grey = 'grey',
  Black = 'black',
  Unknown = 'unknown'
}

/** How many different agent cards per colour we have (numbered from 1 to n) */
export const AGENT_CARD_NO = {
  'red': 2,
  'blue': 2,
  'grey': 2,
  'black': 1
}
