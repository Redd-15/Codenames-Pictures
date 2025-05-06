import { Room } from "../../model/room"
import { Player } from "../../model/player"
import { TeamType } from "../../model/message-interfaces"

export class CodenamesDatabase {
  // This class will handle the database connection and queries
  // For now, we will use a mock database
  private roomdb: Room[]; 

  constructor() {
    this.roomdb = []; // Initialize as null, can be assigned a Room object later
  }

  public createPlayer(username: string, id: number, socketId: string): Player {
    // Create a new player object
    const newPlayer: Player = {
      id: id,      // Player ID from room ids
      socketId: socketId, // Socket ID from socket connection
      name: username,   // Player's name
      team: TeamType.Blue, // Team will be default Blue
      isSpymaster: true, // Default to false
      isInactive: false, // Default to false
    };
    return newPlayer; // Return the new player object
  }

  // Method to create a new room
  public createRoom(username: string, socketId: string): Room {
    // Create a new room and add the player to it
    const roomId = this.getUniqueRoomId(); // Generate a unique room ID
    const newRoom: Room = {
      roomId: roomId, // Random room ID for now
      players: [this.createPlayer(username, roomId*10 + 0, socketId)],
      cards: [], // Initialize with an empty array of cards
      isStarted: false,
      turn: (Math.random() > 0.5 ? TeamType.Red : TeamType.Blue), // Default starting team
      remainingGuesses: 0,
      currentHint: null,
    };
    this.roomdb.push(newRoom); // Assign the new room to the database
    return newRoom;
  }

  public joinRoom(username: string, socketId: string, roomId: number,): Room | null {
    // Find the room by ID
    const room = this.roomdb.find(room => room.roomId == roomId);
    if (room == undefined) { // If the room exists, create a new player and add them to the room
        return null; // Return null if the room does not exist
    }
    else {
        const player = this.createPlayer(username, room.roomId * 10 + room.players.length, socketId); // Create a new player 
        room.players.push(player); // Add the player to the room
        return room; // Return the updated room
        }
  }




  private getUniqueRoomId(): number {
    // Generate a unique room ID
    let roomId: number;
    do {
      roomId = Math.floor(Math.random() * 10000); // Random room ID for now
    } while (this.roomdb.some(room => room.roomId === roomId)); // Check if the room ID already exists
    return roomId;
  }





}