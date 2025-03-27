import { inject, Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { ServerMessageType, ClientMessageType } from '../../../model';
import { CookieHandlerService } from './cookie-handler.service';
import { ChatMessage, ErrorMessage, ErrorType, Hint, IdMessage, JoinMessage, TeamPickerMessage, TeamType } from '../../../model/message-interfaces';
import { Room } from '../../../model/room';

@Injectable({
  providedIn: 'root'
})
export class SocketHandlerService {
  private socket?: Socket;
  private cookieHandlerService = inject(CookieHandlerService);

  /** Establish socket connection with server, optional groupId parameter for joining existing group */
  connect(groupId: number | null = null){
    this.disconnect();
    this.cookieHandlerService.removeCookie('playerId', '/socket.io');
    this.cookieHandlerService.setCookie('playerId', '123', '/socket.io');
    this.socket = io({query: {
      groupId: groupId
    }});

    // Listeners for incoming socket messages
    // Game handling
    this.socket.on(ServerMessageType.TestMessage, (message) =>{
      console.log(message);
    });
    this.socket.on(ServerMessageType.ReceiveId, (ids: IdMessage) =>{
      console.log(ids.playerId, ids.roomId);
    });
    this.socket.on(ServerMessageType.ReceiveRoom, (room: Room) =>{
      console.log(room.roomId);
    });
    this.socket.on(ServerMessageType.ReceiveHint, (hint: Hint) =>{
      console.log(hint.word, hint.number);
    });
    this.socket.on(ServerMessageType.ReceiveGuess, (index: number) =>{
      console.log(index);
    });
    this.socket.on(ServerMessageType.GameOver, (winningTeam: TeamType) =>{
      console.log(winningTeam);
    });
    this.socket.on(ServerMessageType.Error, (error: ErrorMessage) =>{
      console.log(error.message);
    });

    //Chat handling
    this.socket.on(ServerMessageType.ReceiveTeamMessage, (chat: ChatMessage[]) =>{
      console.log(chat);
    });
    this.socket.on(ServerMessageType.ReceiveGlobalMessage, (chat: ChatMessage[]) =>{
      console.log(chat);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      this.socket = undefined;
    });
  }

  /** Send a simple test socket message */
  sendMessage(message: string){
    this.socket?.emit(ClientMessageType.TestMessage, message);
  }

  /** Create a new room and join with given username */
  createRoom(username: string) {
    this.socket?.emit(ClientMessageType.CreateRoom, username);
  }

  /** Join a given room with given username */
  joinRoom(username: string, roomId: number) {
    let content : JoinMessage = {
      roomId: roomId,
      username: username
    };
    this.socket?.emit(ClientMessageType.JoinRoom, content);
  }

  /** Leave current game room */
  leaveRoom() {
    this.socket?.emit(ClientMessageType.LeaveRoom);
  }

  /** Query own room and player ids */
  getId() {
    this.socket?.emit(ClientMessageType.GetId);
  }

   /** Pick a team for player with given id */
   pickTeam(playerId: number, team: TeamType) {
    let content : TeamPickerMessage = {
      playerId: playerId,
      team: team
    };
    this.socket?.emit(ClientMessageType.PickTeam, content);
  }

  /** Appoint player with given id as spymaster */
  pickSpymaster() {
    this.socket?.emit(ClientMessageType.PickSpymaster);
  }

  /** Start game */
  startGame() {
    this.socket?.emit(ClientMessageType.StartGame);
  }

  /** Give hint (only allowed for spymaster) */
  giveHint(word: string, number: number) {
    let content : Hint = {
      word: word,
      number: number
    };
    this.socket?.emit(ClientMessageType.GiveHint, content);
  }

  /** Make a guess by card index */
  makeGuess(index: number) {
    this.socket?.emit(ClientMessageType.MakeGuess, index);
  }

  /** End guessing for the current turn */
  endGuessing() {
    this.socket?.emit(ClientMessageType.EndGuessing);
  }

  /** Send message to team chat */
  sendTeamMessage(playerId: number, message: string) {
    let content : ChatMessage = {
      senderId: playerId,
      message: message
    };
    this.socket?.emit(ClientMessageType.SendTeamMessage, content);
  }

  /** Send message to global chat */
  sendGlobalMessage(playerId: number, message: string) {
    let content : ChatMessage = {
      senderId: playerId,
      message: message
    };
    this.socket?.emit(ClientMessageType.SendGlobalMessage, content);
  }


  /** Disconnect socket */
  disconnect(){
    this.socket?.disconnect();
    this.socket = undefined;
  }
}
