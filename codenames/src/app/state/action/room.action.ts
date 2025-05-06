import { Room } from "../../../../model/room";
import { createAction, props } from '@ngrx/store';

export const loadRoom = createAction(
  '[Room] LoadRoom',
  props<{room: Room}>()
)

export const resetRoom = createAction(
  '[Room] ResetRoom'
)
