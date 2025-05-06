import { createReducer } from "@ngrx/store";
import { immerOn } from 'ngrx-immer/store';
import { Room } from "../../../../model/room";
import { loadRoom, resetRoom } from "../action/room.action";

export interface RoomState {
  room: Room | null;
}

export const initialRoomState = {
  room: null as Room | null
}

export const RoomReducer = createReducer(
  initialRoomState,
  immerOn(loadRoom, (state, action)=> {
    state.room = action.room;
  }),
  immerOn(resetRoom, (state)=> {
    state.room = null;
  })
)
