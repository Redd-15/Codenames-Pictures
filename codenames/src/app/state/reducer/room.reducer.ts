import { createReducer } from "@ngrx/store";
import { immerOn } from 'ngrx-immer/store';
import { Room } from "../../../../model/room";
import { loadHint, loadRoom, resetRoom } from "../action/room.action";
import { HintHistory, TeamType } from "../../../../model/message-interfaces";
import { Card } from "../../../../model/card";
import { Player } from "../../../../model/player";

export interface RoomState {
  room: Room | null;
}

export const initialRoomState = {
  room: {
    roomId: 0,
    players: [] as Player[],
    cards: [] as Card[],
    isStarted: false,
    turn: TeamType.Red,
    remainingGuesses: 0,
    currentHint: null,
    hintHistory: [] as HintHistory[]
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
