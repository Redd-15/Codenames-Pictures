import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { Room } from "../../../../model/room";

export const selectRoomState = (state: AppState) => state.room;

export const selectRoom = createSelector(
  selectRoomState,
  (state) => state.room as Room | null
);
