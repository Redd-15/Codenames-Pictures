import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectChatState = (state: AppState) => state.chat;

export const selectTeamMessages = createSelector(
  selectChatState,
  (state) => state.teamMessages
);

export const selectGlobalMessages = createSelector(
  selectChatState,
  (state) => state.globalMessages
);
