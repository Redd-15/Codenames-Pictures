import { Player } from "./player";
import { Game } from "./game";

export class Room {
    public room_id: string;
    public max_size: number;
    public game: Game;
    public players: Player[];

    public constructor(room_id: string, max_size: number) {
        this.room_id = room_id;
        this.max_size = max_size;
        this.players = [];
    }

    // Add a player to the room
    public addPlayer(player: Player): boolean {
        if (this.players.length < this.maxPlayers) {
            this.players.push(player);
            return true;
        }
        return false; // Room is full
    }

    // Remove a player from the room
    public removePlayer(playerId: string): boolean {
        const index = this.players.findIndex((player) => player.id === playerId);
        if (index !== -1) {
          this.players.splice(index, 1); // remove player from list
          return true;
        }
        return false; // Player not found
    }
    
    // Check if the room is empty
    public isEmpty(): boolean {
        return this.players.length === 0;
    }

    // game logic
    public startGame() {
        if (players.length < 2) {
            // not enough players to start
        }
    }
}