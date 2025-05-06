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

export const resetMessages = createAction(
  '[Chat] ResetMessages'
)
