import { Hint } from "../../../../model/message-interfaces";
import { Room } from "../../../../model/room";
import { createAction, props } from '@ngrx/store';

export const loadRoom = createAction(
  '[Room] LoadRoom',
  props<{room: Room}>()
)

export const loadHint = createAction(
  '[Room] LoadHint',
  props<{hint: Hint | null}>()
)

export const resetRoom = createAction(
  '[Room] ResetRoom'
)
