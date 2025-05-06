import { createReducer } from "@ngrx/store";
import { ChatMessage } from "../../../../model/message-interfaces";
import { immerOn } from "ngrx-immer/store";
import { loadGlobalMessages, loadTeamMessages, resetMessages } from "../action/chat.action";

export interface ChatState {
  teamMessages: ChatMessage[],
  globalMessages: ChatMessage[],
}

export const initialChatState = {
  teamMessages: [{ senderId: 1, message: "This is a message, cute." },
    { senderId: 1, message: "This is a message, cute. This is a message, cute. This is a message, cute. This is a message, cute." },
    { senderId: 2, message: "This is a message, cute." },
    { senderId: 1, message: "OK." },
    { senderId: 3, message: "This is a message, cute." },
    { senderId: 1, message: "This is a message, cute." },
    { senderId: 1, message: "This is a message, cute. This is a message, cute. This is a message, cute. This is a message, cute." },
    { senderId: 2, message: "This is a message, cute." },
    { senderId: 1, message: "OK." },
    { senderId: 3, message: "This is a message, cute." },
    { senderId: 1, message: "This is a message, cute." },
    { senderId: 1, message: "This is a message, cute. This is a message, cute. This is a message, cute. This is a message, cute." },
    { senderId: 2, message: "This is a message, cute." },
    { senderId: 1, message: "OK." },
    { senderId: 3, message: "This is a message, cute." },] as ChatMessage[],
  globalMessages: [] as ChatMessage[],
}

export const ChatReducer = createReducer(
  initialChatState,
  immerOn(loadTeamMessages, (state, action)=> {
    state.teamMessages = action.messages;
  }),
  immerOn(loadGlobalMessages, (state, action)=> {
    state.globalMessages = action.messages;
  }),
  immerOn(resetMessages, (state)=> {
    state.teamMessages = [];
    state.globalMessages = [];
  })
)
