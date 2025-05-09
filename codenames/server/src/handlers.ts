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

public cookieHandler(cookie: any) {

    if (cookie == undefined || !cookie.playerId) { // If no cookie is found, return
        return;
    }
    // Handle cookies here if needed
    console.log(`Client ${this.socket.id} has joined with existing player ID: ${cookie.playerId}`);
    let room = this.database.getPlayerRoomById(Number.parseInt(cookie.playerId), this.socket.id); // Find the player by ID in the database
     // Get the player ID from the database

    if (room) { // If the player is found in a room, join the room
        console.log(`Found room for client (${this.socket.id}): ${room.roomId}`);
        const currentPlayerId = this.database.getPlayerId(this.socket.id);
        room = this.database.setPlayerActive(this.socket.id); // Set the player as active in the database

        if (!room) { // If player cannot be set active
            console.log(`Client ${this.socket.id} cannot be set Active`);

            const error : ErrorMessage = {
            errorType: ErrorType.SettingUnavailable, // Error type for other errors
            message: `Player with ID (${cookie.playerId}) cannot be set Active.` // Error message for room not found
            };

            this.io.to(this.socket.id).emit(ServerMessageType.Error, error); // Send an error message back to the client
            return;
        }

        const idmessage: IdMessage = {
            playerId: currentPlayerId, // Player ID from room ids
            roomId: room.roomId, // Room ID from the created room
        };

        this.io.to(this.socket.id).emit(ServerMessageType.ReceiveId, idmessage ); // Send the socket ID back to the client
        this.socket.join(room.roomId.toString()); // Join the room in the socket
        this.io.to(room.roomId.toString()).emit(ServerMessageType.ReceiveRoom, room); // Send a message back to the client

        console.log(`Client ${this.socket.id} joined back to room (${room.roomId})`);
    }else{
        console.log(`Client ${this.socket.id} does not have an existing room`);

        const error : ErrorMessage = {
            errorType: ErrorType.RoomNoLongerExists, // Error type for other errors
            message: `Room with ID (${cookie.playerId}) no longer exists.` // Error message for room not found
        };
        this.io.to(this.socket.id).emit(ServerMessageType.Error, error); // Send an error message back to the client
        return;
    }
}

public createRoomHandler(username: string) {

    console.log(`Client ${this.socket.id} requested to create a room with username: "${username}"`);

    let room = this.database.getRoomBySocketId(this.socket.id)
    if (room){
        const idmessage: IdMessage = {
            playerId: this.database.getPlayerId(this.socket.id), // Player ID from room ids
            roomId: room.roomId, // Room ID from the created room
        };

        this.io.to(this.socket.id).emit(ServerMessageType.ReceiveId, idmessage ); // Send the socket ID back to the client
        this.io.to(this.socket.id).emit(ServerMessageType.ReceiveRoom, room); // Send a message back to the client
        this.socket.join(room.roomId.toString()); // Join the room in the socket
        console.log(`Client ${this.socket.id} tried to create new room while having an already existing one (${room.roomId})`);
        return; // Return the room if it exists
    }

    if (username == ''){
        this.noUsernameError(); // If no username is provided, send an error message
        return;
    }

    room = this.database.createRoom(username, this.socket.id); // Create a new room in the database
    const idmessage: IdMessage = {
        playerId: room.players[0].id, // Player ID from room ids
        roomId: room.roomId, // Room ID from the created room
    };

    this.io.to(this.socket.id).emit(ServerMessageType.ReceiveId, idmessage ); // Send the socket ID back to the client
    this.io.to(this.socket.id).emit(ServerMessageType.ReceiveRoom, room); // Send a message back to the client
    console.log(`Client (SID: ${this.socket.id}) created room (ID: ${room.roomId}) with username: ${username}`);
    this.socket.join(room.roomId.toString()); // Join the room in the socket
}

public joinRoomHandler(username: string, roomId: number) {

    console.log(`Player ${username} requested to join room with ID: ${roomId}`);

    let room = this.database.getRoomBySocketId(this.socket.id)
    if (room){

        if (room.isStarted){
            console.log(`Client ${this.socket.id} does not have an existing room`);

            const error : ErrorMessage = {
                errorType: ErrorType.RoomAlreadyStarted, // Error type for other errors
                message: `Room with ID (${room.roomId}) has already started.` // Error message for room not found
            };
            this.io.to(this.socket.id).emit(ServerMessageType.Error, error); // Send an error message back to the client
            return;
        }

        const idmessage: IdMessage = {
            playerId: this.database.getPlayerId(this.socket.id), // Player ID from room ids
            roomId: room.roomId, // Room ID from the created room
        };

        this.io.to(this.socket.id).emit(ServerMessageType.ReceiveId, idmessage ); // Send the socket ID back to the client
        this.io.to(this.socket.id).emit(ServerMessageType.ReceiveRoom, room); // Send a message back to the client
        this.socket.join(room.roomId.toString()); // Join the room in the socket
        console.log(`Client ${this.socket.id} tried to create new room while having an already existing one (${room.roomId})`);
        return; // Return the room if it exists
    }

    if (username == ''){
        this.noUsernameError(); // If no username is provided, send an error message
        return;
    }

    room = this.database.joinRoom(username, this.socket.id, roomId); // Join the room in the database
    const currentPlayerId = this.database.getPlayerId(this.socket.id); // Get the player ID from the database

    if (room) {

        const idmessage: IdMessage = {
            playerId: currentPlayerId, // Player ID from room ids
            roomId: room.roomId, // Room ID from the created room
        };
        this.io.to(this.socket.id).emit(ServerMessageType.ReceiveId, idmessage ); // Send the socket ID back to the client
        this.socket.join(room.roomId.toString()); // Join the room in the socket
        this.io.to(room.roomId.toString()).emit(ServerMessageType.ReceiveRoom, room); // Send a message back to the client
        console.log(`Client ${this.socket.id} joined room with username: ${username}`);

    }else {

       this.roomWithIdNotFound(roomId); // If the room does not exist, send an error message

    }
}

public pickPositionHandler(team: TeamType, spymaster: boolean) {
    console.log(`Client ${this.socket.id} requested to pick team: ${team} and spymaster: ${spymaster}`);
    const room = this.database.pickPosition(this.socket.id, team, spymaster); // Pick a team in the database

    if (room) {
        this.io.to(room.roomId.toString()).emit(ServerMessageType.ReceiveRoom, room); // Send a message back to the client
        console.log(`Client switched to team ${team} and spymaster: ${spymaster}`);

    }else {
        this.roomNotFoundError(); // If the room does not exist, send an error message
    }
}

public startGameHandler() {
    console.log(`Client ${this.socket.id} requested to start game`);
    const room = this.database.startGame(this.socket.id); // Start the game in the database

    if (room) {
        this.io.to(room.roomId.toString()).emit(ServerMessageType.ReceiveRoom, room); // Send a message back to the client
        console.log(`Client ${this.socket.id} started game in room with ID: ${room.roomId}`);

    }else {
        this.roomNotFoundError(); // If the room does not exist, send an error message
    }
}


public leaveRoomHandler(){
    console.log(`Client ${this.socket.id} requested to leave their room`);

    const room = this.database.leaveRoom(this.socket.id)

    if (room){ // Leave the room in the database

        this.io.to(room.roomId.toString()).emit(ServerMessageType.ReceiveRoom, room); // Send a message back to the client
        this.socket.leave(room.roomId.toString()); // Leave the socket room
        console.log(`Client ${this.socket.id} left their room`);
        this.socket.disconnect(); // Disconnect the socket

    } else {
        this.roomNotFoundError(); // If the room does not exist, send an error message
    }
}

public disconnectHandler() {
    console.log(`Client ${this.socket.id} disconnected, setting status to inactive`);
    const room = this.database.setPlayerInactive(this.socket.id); // Leave the room in the database

    if (room) { // If the room exists, send a message back to the client
        this.io.to(room.roomId.toString()).emit(ServerMessageType.ReceiveRoom, room); // Send a message back to the client
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

private roomNotFoundError() {
    console.log(`Client ${this.socket.id} does not have an existing room`);

    const error : ErrorMessage = {
        errorType: ErrorType.RoomNotFound, // Error type for other errors
        message: `Room for player with socketID (${this.socket.id}) no longer not exist.` // Error message for room not found
    };

    this.io.to(this.socket.id).emit(ServerMessageType.Error, error); // Send an error message back to the client
    return;
}

private roomWithIdNotFound(roomId: number) {
    console.log(`Room with ID ${roomId} does not exist.`);

    const error : ErrorMessage = {
        errorType: ErrorType.RoomNotFound, // Error type for other errors
        message: `Room with ID ${roomId} does not exist.` // Error message for room not found
    };
    this.io.to(this.socket.id).emit(ServerMessageType.Error, error); // Send an error message back to the client
    return;
}

private noUsernameError() {
    console.log(`Client ${this.socket.id} requested to join a room without username`)
        const error : ErrorMessage = {
            errorType: ErrorType.NoUsername, // Error type for other errors
            message: `Username cannot be empty.` // Error message for room not found
        };
        this.io.to(this.socket.id).emit(ServerMessageType.Error, error); // Send an error message back to the client
        return;
}

}
/*

TestMessage = 'clientTest', ++
CreateRoom = 'createRoom',  ++
JoinRoom = 'joinRoom',      ++
LeaveRoom = 'leaveRoom',    ++
GetId = 'getId',            ++
PickPosition = 'pickPosition',      ++
StartGame = 'startGame',
GiveHint = 'giveHint',
MakeGuess = 'makeGuess',
EndGuessing = 'endGuessing',
SendTeamMessage = 'sendTeamMessage',
SendGlobalMessage = 'sendGlobalMessage' */
