import { Player } form "./player"

export class Game {
	public redTeam: Player[];
	public blueTeam: Player[];
	public redSpyMaster: Player;
	public blueSpyMaster: Player;

	const words: string[];
	const board: any;

	public isRunning: boolean;
	public turn: string:

	public constructor(players: Player[]) {
		// divide players into teams
		// select spymasters
		// generate words
		// fill board

		let t = ["red", "blue"];
		this.turn = t[Math.floor(Math.random() * 2)];
		this.isRunning = true;
	}

	private assignRoles(player Players[]) {
		[red, blue] = splitArray(players);
		this.redSpyMaster = red.splice(0, 1)[0];
		this.blueSpyMaster = blue.splice(0, 1)[0];

		this.redTeam = red;
		this.blueTeam = blue;
	}

	private generateWords() {
		// pick random words from external dictionary
	}

	private generateBoard() {
		// generate board with cards and information
		// {word: word, color: string, revealed: boolean}
	}

	private splitArray(players: Player[]): [Player[], Player[]] {
		// shuffle the array randomly
		const shuffled = array.sort(() => Math.random() - 0.5);

		const middle = Math.ceil(shuffled.length / 2);

		const firstHalf = shuffled.slice(0, middle);
		const secondHalf = shuffled.slice(middle);

		return [firstHalf, secondHalf];
	}
}