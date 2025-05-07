// This file contains the handlers for the socket events.

import { Socket, Server } from "socket.io";
import { CodenamesDatabase } from "./database";
import { ServerMessageType } from "../../model";
import { ErrorMessage, ErrorType, IdMessage, TeamType } from "../../model/message-interfaces";


// Import necessary types from the model
export class ServerHandlers {
    // This class will handle the socket events

private io: Server; // Socket.IO instance
private socket: Socket; // Socket instance
private database: CodenamesDatabase; // Database instance

constructor(io: Server, socket : Socket, database: CodenamesDatabase) {
    this.io = io; // Assign the Socket.IO instance
    this.socket = socket; // Assign the Socket instance
    this.database = database
}

public clientTestMessageHandler(content: any) {
    console.log(`Client ${this.socket.id} sent: ${content}`);
}

public createRoomHandler(username: string) {
    
    if (this.database.getPlayerId(this.socket.id)){// Get the player ID from the database
        this.leaveRoomHandler(); // Leave the room if the player ID exists
    } 

    const room = this.database.createRoom(username, this.socket.id); // Create a new room in the database
    const idmessage: IdMessage = {
        playerId: room.players[0].id, // Player ID from room ids
        roomId: room.roomId, // Room ID from the created room
    };

    this.io.to(this.socket.id).emit(ServerMessageType.ReceiveId, idmessage ); // Send the socket ID back to the client
    this.io.to(this.socket.id).emit(ServerMessageType.ReceiveRoom, room); // Send a message back to the client
    console.log(`Client (SID: ${this.socket.id}) created room (ID: ${room.roomId}) with username: ${username}`);
}

public joinRoomHandler(username: string, roomId: number) {
    
    if (this.database.getPlayerId(this.socket.id)){// Get the player ID from the database
        this.leaveRoomHandler(); // Leave the room if the player ID exists
    } 

    console.log(`Player ${username} requested to join room with ID: ${roomId}`);
    const room = this.database.joinRoom(username, this.socket.id, roomId); // Join the room in the database

    if (!room) {

        const error : ErrorMessage = {
            errorType: ErrorType.RoomNotFound, // Error type for other errors
            message: `Room with ID ${roomId} does not exist.` // Error message for room not found
        };
        this.io.to(this.socket.id).emit(ServerMessageType.Error, error); // Send an error message back to the client
        return;

    }else {
        const idmessage: IdMessage = {
            playerId: room.players[0].id, // Player ID from room ids
            roomId: room.roomId, // Room ID from the created room
        };
        this.io.to(this.socket.id).emit(ServerMessageType.ReceiveId, idmessage ); // Send the socket ID back to the client
        this.io.to(this.socket.id).emit(ServerMessageType.ReceiveRoom, room); // Send a message back to the client
        console.log(`Client ${this.socket.id} joined room with username: ${username}`);
    }
}

public leaveRoomHandler(){
    console.log(`Client ${this.socket.id} requested to leave their room`);

    const room = this.database.leaveRoom(this.socket.id)

    if (room){ // Leave the room in the database

        this.io.to(this.socket.id).emit(ServerMessageType.ReceiveRoom, room); // Send a message back to the client
        console.log(`Client ${this.socket.id} left their room`);

    } else {

        const error : ErrorMessage = {
            errorType: ErrorType.RoomNotFound, // Error type for other errors
            message: `Room with player (${this.socket.id}) does not exist.` // Error message for room not found
        };

        this.io.to(this.socket.id).emit(ServerMessageType.Error, error); // Send an error message back to the client
    }
}

public getIdHandler() {
    console.log(`Client ${this.socket.id} requested their ID`);
    const idmessage: IdMessage = {
        playerId: this.database.getPlayerId(this.socket.id), // Player ID from room ids
        roomId: this.database.getRoomId(this.socket.id), // Room ID from the created room
    };
    this.io.to(this.socket.id).emit(ServerMessageType.ReceiveId, idmessage ); // Send the socket ID back to the client
    console.log(`Client ${this.socket.id} received their ID`);
}


}
/* 
{"roomId":0000, "username":"asd2"}

TestMessage = 'clientTest', ++
CreateRoom = 'createRoom',  ++
JoinRoom = 'joinRoom',      ++
LeaveRoom = 'leaveRoom',    ++
GetId = 'getId',            ++
PickTeam = 'pickTeam',
PickSpymaster = 'pickSpymaster',
StartGame = 'startGame',
GiveHint = 'giveHint',
MakeGuess = 'makeGuess',
EndGuessing = 'endGuessing',
SendTeamMessage = 'sendTeamMessage',
SendGlobalMessage = 'sendGlobalMessage' */