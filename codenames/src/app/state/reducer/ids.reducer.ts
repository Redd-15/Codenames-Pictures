import { createReducer } from "@ngrx/store"
import { immerOn } from "ngrx-immer/store"
import { loadPlayerId, loadRoomId, loadUsername, resetIds } from "../action/ids.action"

export interface IdsState {
  username: string,
  playerId: number,
  roomId: number
}

export const initialIdsState = {
  username: '',
  playerId: 3, //TODO: change to -1
  roomId: -1
}

export const IdsReducer = createReducer(
  initialIdsState,
  immerOn(loadUsername, (state, action)=>{
    state.username = action.username;
  }),
  immerOn(loadPlayerId, (state, action)=>{
    state.playerId = action.playerId;
  }),
  immerOn(loadRoomId, (state, action)=>{
    state.roomId = action.roomId;
  }),
  immerOn(resetIds, (state)=> {
    state.username = '',
    state.playerId = 3, //TODO: -1
    state.roomId = -1
  })
)
