import { createAction, props } from "@ngrx/store";

export const loadUsername = createAction(
  '[Ids] LoadUsername',
  props<{username: string}>()
)

export const loadPlayerId = createAction(
  '[Ids] LoadPlayerId',
  props<{playerId: number}>()
)

export const loadRoomId = createAction(
  '[Ids] LoadRoomId',
  props<{roomId: number}>()
)

export const resetIds = createAction(
  '[Ids] ResetIds'
)
