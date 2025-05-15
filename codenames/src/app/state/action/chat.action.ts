import { createAction, props } from "@ngrx/store";
import { ChatMessage } from "../../../../model/message-interfaces";

export const loadTeamMessages = createAction(
  '[Chat] LoadTeamMessages',
  props<{messages: ChatMessage[]}>()
)

export const loadGlobalMessages = createAction(
  '[Chat] LoadGlobalMessages',
  props<{messages: ChatMessage[]}>()
)

export const setNewTeamMessageFlag = createAction(
  '[Chat] SetNewTeamMessageFlag',
  props<{isNew: boolean}>()
)

export const setNewGlobalMessageFlag = createAction(
  '[Chat] SetNewGlobalMessageFlag',
  props<{isNew: boolean}>()
)

export const resetMessages = createAction(
  '[Chat] ResetMessages'
)
