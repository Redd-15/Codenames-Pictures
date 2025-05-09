import { ChatState } from "./reducer/chat.reducer";
import { IdsState } from "./reducer/ids.reducer";
import { RoomState } from "./reducer/room.reducer";

export interface AppState {
  //Room
  room: RoomState,
  //Temporary storage for specified ids
  ids: IdsState,
  //Chat
  chat: ChatState
}
