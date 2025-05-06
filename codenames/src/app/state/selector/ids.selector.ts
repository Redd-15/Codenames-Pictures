import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectIdsState = (state: AppState) => state.ids;

export const selectUsername = createSelector(
  selectIdsState,
  (state) => state.username
);

export const selectPlayerId = createSelector(
  selectIdsState,
  (state) => state.playerId
);

export const selectRoomId = createSelector(
  selectIdsState,
  (state) => state.roomId
);
