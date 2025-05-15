import { createReducer } from "@ngrx/store";
import { ChatMessage } from "../../../../model/message-interfaces";
import { immerOn } from "ngrx-immer/store";
import { loadGlobalMessages, loadTeamMessages, resetMessages, setNewGlobalMessageFlag, setNewTeamMessageFlag } from "../action/chat.action";

export interface ChatState {
  teamMessages: ChatMessage[],
  globalMessages: ChatMessage[],
  isTeamNew: boolean,
  isGlobalNew: boolean
}

export const initialChatState = {
  teamMessages: [] as ChatMessage[],
  globalMessages: [] as ChatMessage[],
  isTeamNew: false,
  isGlobalNew: false,
}

export const ChatReducer = createReducer(
  initialChatState,
  immerOn(loadTeamMessages, (state, action)=> {
    state.teamMessages = action.messages;
  }),
  immerOn(loadGlobalMessages, (state, action)=> {
    state.globalMessages = action.messages;
  }),
  immerOn(setNewTeamMessageFlag, (state, action)=> {
    state.isTeamNew = action.isNew;
  }),
  immerOn(setNewGlobalMessageFlag, (state, action)=> {
    state.isGlobalNew = action.isNew;
  }),
  immerOn(resetMessages, (state)=> {
    state.teamMessages = [];
    state.globalMessages = [];
    state.isGlobalNew = false;
    state.isTeamNew = false;
  })
)
