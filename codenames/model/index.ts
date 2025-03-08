/** Enum for message types FROM SERVER */
export enum ServerMessageType {
  	TestMessage = 'serverTest',
	RoomCreated = 'roomCreated',
	PlayerJoined = 'playerJoined',
	JoinFailed = 'joinFailed',
	PlayerLeft = 'playerLeft',
}

/** Enum for message types FROM CLIENT */
export enum ClientMessageType {
  	TestMessage = 'clientTest',
  	CreateRoom = 'createRoom',
  	JoinRoom = 'joinRoom',
  	LeaveRoom = 'leaveRoom',
}
