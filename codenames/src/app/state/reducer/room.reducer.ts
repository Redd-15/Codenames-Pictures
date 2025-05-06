import { createReducer } from "@ngrx/store";
import { immerOn } from 'ngrx-immer/store';
import { Room } from "../../../../model/room";
import { loadHint, loadRoom, resetRoom } from "../action/room.action";
import { CardColour, TeamType } from "../../../../model/message-interfaces";

export interface RoomState {
  room: Room | null;
}

export const initialRoomState = {
  room: {
    roomId: 0,
    players: [
      {
        id: 1,
        socketId: "1",
        name: "player1",
        team: TeamType.Red,
        isSpymaster: true,
        isInactive: false,
      },
      {
        id: 2,
        socketId: "2",
        name: "player2",
        team: TeamType.Blue,
        isSpymaster: true,
        isInactive: false,
      },
      {
        id: 3,
        socketId: "3",
        name: "player3",
        team: TeamType.Red,
        isSpymaster: false,
        isInactive: false,
      },
      {
        id: 4,
        socketId: "4",
        name: "player4",
        team: TeamType.Red,
        isSpymaster: false,
        isInactive: false,
      },
      {
        id: 5,
        socketId: "5",
        name: "player5",
        team: TeamType.Red,
        isSpymaster: false,
        isInactive: false,
      },
      {
        id: 6,
        socketId: "6",
        name: "player6",
        team: TeamType.Red,
        isSpymaster: false,
        isInactive: false,
      },
      {
        id: 7,
        socketId: "7",
        name: "player7",
        team: TeamType.Red,
        isSpymaster: false,
        isInactive: false,
      },
      {
        id: 8,
        socketId: "8",
        name: "player8",
        team: TeamType.Red,
        isSpymaster: false,
        isInactive: false,
      },
      {
        id: 9,
        socketId: "9",
        name: "player9",
        team: TeamType.Red,
        isSpymaster: false,
        isInactive: false,
      },
      {
        id: 10,
        socketId: "10",
        name: "player10",
        team: TeamType.Red,
        isSpymaster: false,
        isInactive: false,
      },
      {
        id: 11,
        socketId: "11",
        name: "player11",
        team: TeamType.Blue,
        isSpymaster: false,
        isInactive: false,
      }
    ],
    cards: [
      { id: 1, colour: CardColour.Blue, isSecret: true },

      { id: 2, colour: CardColour.Red, isSecret: true },
      { id: 3, colour: CardColour.Red, isSecret: true },
      { id: 4, colour: CardColour.Red, isSecret: true },
      { id: 5, colour: CardColour.Red, isSecret: true },
      { id: 6, colour: CardColour.Red, isSecret: true },
      { id: 7, colour: CardColour.Red, isSecret: true },
      { id: 8, colour: CardColour.Red, isSecret: true },
      { id: 9, colour: CardColour.Red, isSecret: true },

      { id: 10, colour: CardColour.Blue, isSecret: true },
      { id: 11, colour: CardColour.Blue, isSecret: true },
      { id: 12, colour: CardColour.Blue, isSecret: true },
      { id: 13, colour: CardColour.Blue, isSecret: true },
      { id: 14, colour: CardColour.Blue, isSecret: true },
      { id: 15, colour: CardColour.Blue, isSecret: true },

      { id: 16, colour: CardColour.Black, isSecret: true },

      { id: 17, colour: CardColour.Grey, isSecret: true },
      { id: 18, colour: CardColour.Grey, isSecret: true },
      { id: 19, colour: CardColour.Grey, isSecret: true },
      { id: 20, colour: CardColour.Grey, isSecret: true },
    ],
    isStarted: false,
    turn: TeamType.Red,
    remainingGuesses: 0,
    currentHint: {
      word: 'alma',
      number: -1
    }
  } as Room | null
}

export const RoomReducer = createReducer(
  initialRoomState,
  immerOn(loadRoom, (state, action) => {
    state.room = action.room;
  }),
  immerOn(loadHint, (state, action) => {
    if (state.room)
      state.room.currentHint = action.hint;
  }),
  immerOn(resetRoom, (state) => {
    state.room = null;
  })
)
