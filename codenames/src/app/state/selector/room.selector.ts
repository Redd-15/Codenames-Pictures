import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { Player } from "../../../../model/player";
import { Card } from "../../model/card";
import { TeamType } from "../../../../model/message-interfaces";

export const selectRoomState = (state: AppState) => state.room;

export const selectRoom = createSelector(
  selectRoomState,
  (state) => state.room
);

export const selectPlayers = createSelector(
  selectRoom,
  (state) => (state ? state.players : []) as Player[]
)

export const selectPlayerById = (playerId: number) =>
  createSelector(selectRoom, (room) =>
    room?.players.find((player) => player.id === playerId) ?? null
)

export const selectPlayerCount = createSelector(
  selectRoom,
  (state) => (state ? state.players.length : 0)
)

export const selectRedSpymasters = createSelector(
  selectRoom,
  (state) => state ? state.players.filter(
    (player) => player.team === TeamType.Red && player.isSpymaster
  ) as Player[] : []
)

export const selectBlueSpymasters = createSelector(
  selectRoom,
  (state) => state ? state.players.filter(
    (player) => player.team === TeamType.Blue && player.isSpymaster
  ) as Player[] : []
)

export const selectRedOperatives = createSelector(
  selectRoom,
  (state) => state ? state.players.filter(
    (player) => player.team === TeamType.Red && !player.isSpymaster
  ) as Player[] : []
)

export const selectBlueOperatives = createSelector(
  selectRoom,
  (state) => state ? state.players.filter(
    (player) => player.team === TeamType.Blue && !player.isSpymaster
  ) as Player[] : []
)

export const selectCards = createSelector(
  selectRoom,
  (state) => (state ? state.cards : []) as Card[]
)

export const selectIsStarted = createSelector(
  selectRoom,
  (state) => state ? state.isStarted : false
)

export const selectTurn = createSelector(
  selectRoom,
  (state) => state ? state.turn : TeamType.Red
)

export const selectRemainingGuesses = createSelector(
  selectRoom,
  (state) => state ? state.remainingGuesses : 0
)

export const selectCurrentHint = createSelector(
  selectRoom,
  (state) => state ? state.currentHint : null
)
