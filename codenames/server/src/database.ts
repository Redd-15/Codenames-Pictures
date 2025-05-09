import { Room } from "../../model/room"
import { Player } from "../../model/player"
import { CardColour, TeamType } from "../../model/message-interfaces"
import { Card } from "../../model/card";

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
      isSpymaster: false, // Default to false
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
      players: [this.createPlayer(username, roomId*100 + 0, socketId)],
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
        const player = this.createPlayer(username, room.roomId * 100 + room.players.length, socketId); // Create a new player 
        room.players.push(player); // Add the player to the room
        return room; // Return the updated room
        }
  }

  public pickPosition(socketId: string, team: TeamType, spymaster: boolean): Room | null {
    // Find the room by socket ID
    const room = this.getRoomBySocketId(socketId); // Get the room ID from the socket ID
    if (room) {
      // Find the player by socket ID in the room
      const player = room.players.find(player => player.socketId === socketId);
      if (player) {
        player.team = team; // Set the player's team to the selected team
        player.isSpymaster = spymaster; // Set the player's isSpymaster property to true or false based on the input
        return room; // Return the room 
      }
    }
    return null; // Return null if the room does not exist
  }

  public startGame(socketId: string): Room | null {
    // Find the room by ID
    const room = this.getRoomBySocketId(socketId); // Get the room ID from the socket ID
    if (room) {
      room.isStarted = true; // Set the room's isStarted property to true
      room.cards = this.getRandomCardsArray(room.turn); // Initialize the cards array
      room.remainingGuesses = 0; // Set the initial number of guesses for the starting team
      return room; // Return the updated room
    }
    return null; // Return null if the room does not exist
  }

  public leaveRoom(socketId: string): Room | null {
    // Find the room by socket ID
    let room = this.roomdb.find(room => room.roomId === this.getRoomId(socketId)); // Get the room ID from the socket ID
    if (room) { 

      // Remove the player from the room
      room.players = room.players.filter(player => player.socketId !== socketId);
      
      if (room.players.length === 0) {
        // If no players left, remove the room from the database
        this.roomdb = this.roomdb.filter(r => r.roomId !== room.roomId);
      }

      return room; // Return the updated room
    } else {
      return null; // Return null if the room does not exist

    }
  }

  public setPlayerInactive(socketId: string): Room | null {
    // Find the room by socket ID
    const room = this.getRoomBySocketId(socketId); // Get the room ID from the socket ID
    if (room) {
      // Find the player by socket ID in the room
      const player = room.players.find(player => player.socketId === socketId);
      if (player) {
        player.isInactive = true; // Set the player's isInactive property to true
        return room; // Return the room 
      }
    }
    return null; // Return null if the room does not exist
  }

  public setPlayerActive(socketId: string): Room | null {
    // Find the room by socket ID
    const room = this.getRoomBySocketId(socketId); // Get the room ID from the socket ID
    if (room) {
      // Find the player by socket ID in the room
      const player = room.players.find(player => player.socketId === socketId);
      if (player) {
        player.isInactive = false; // Set the player's isInactive property to true
        return room; // Return the room 
      }
    }
    return null; // Return null if the room does not exist
  }

  public getRoomId(socketId: string): number | null {
    // Find the room by socket ID
    const playerId = this.getPlayerId(socketId); // Call getPlayerId to ensure the player exists
    if (playerId === null) {
      return null; // Return null if the player does not exist
    }else{
      return Math.floor(playerId / 100)
    }
  }

  public getPlayerId(socketId: string): number | null {
    // Find the room by socket ID
    const room = this.roomdb.find(room => room.players.some(player => player.socketId === socketId));
    if (room) {
      const player = room.players.find(player => player.socketId === socketId);
      if (player) {
        return player.id; // Return the player ID if found
      }
    }
    return null; // Return null if the player does not exist
  }

  public getPlayerRoomById(playerId: number, newSocketId: string): Room | null {
    // Find the room by player ID
    const room = this.roomdb.find(room => room.roomId === this.getRoomIdFromPlayerId(playerId)); 
    
    if (room) {
      // Find the player by ID in the room
      const player = room.players.find(player => player.id === playerId); 

      if (player){
        player.socketId = newSocketId; // Update the player's socket ID
        return room; // Return the room 
      }
      else{
        return null
      }
    }
    return null; // Return null if the room does not exist
  }

  public getRoomBySocketId(socketId: string): Room | null {
    // Find the room by socket ID
    const room = this.roomdb.find(room => room.players.some(player => player.socketId === socketId));
    if (room) {
      return room; // Return the room if found
    }
    return null; // Return null if the room does not exist
  }

  private getUniqueRoomId(): number {
    // Generate a unique room ID
    let roomId: number;
    do {
      roomId = Math.floor(Math.random() * 9000) + 999; // Random room ID for now
    } while (this.roomdb.some(room => room.roomId === roomId)); // Check if the room ID already exists
    return roomId;
  }

  private getRoomIdFromPlayerId(playerId: number): number {

    return Math.floor(playerId / 100); // Get the room ID from the player ID

  }

  private getRandomCardsArray(startTeam:TeamType): Card[] {
    const MAX_CARD_NO: number = 279; // Maximum card number
    const cardArray: Card[] = []; // Array to hold the cards

    while (cardArray.length < 8) {
      const randomCard = Math.floor(Math.random() * (MAX_CARD_NO));
      cardArray.push({
        id: randomCard,
        colour: (startTeam === TeamType.Blue ? CardColour.Blue: CardColour.Red), // Randomly assign red or blue
        isSecret: true, // Set isSecret to true
      });
    }
    while (cardArray.length < 15) {
      const randomCard = Math.floor(Math.random() * (MAX_CARD_NO));
      cardArray.push({
        id: randomCard,
        colour: (startTeam === TeamType.Blue ? CardColour.Red: CardColour.Blue), // Randomly assign red or blue
        isSecret: true, // Set isSecret to true
      });
    }
    {
      const randomCard = Math.floor(Math.random() * (MAX_CARD_NO));
      cardArray.push({
        id: randomCard,
        colour: CardColour.Black, // Assign white
        isSecret: true, // Set isSecret to true
      });
    }
    while (cardArray.length < 20) {
      const randomCard = Math.floor(Math.random() * (MAX_CARD_NO));
      cardArray.push({
        id: randomCard,
        colour: CardColour.Grey, // Randomly assign red or blue
        isSecret: true, // Set isSecret to true
      });
    }
    
    // Shuffle the cards
    for (let i = cardArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]]; // Swap the elements
    }

    return Array.from(cardArray);

  }
}