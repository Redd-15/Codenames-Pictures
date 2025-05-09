import { inject, Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { ServerMessageType, ClientMessageType } from '../../../model';
import { CookieHandlerService } from './cookie-handler.service';
import { ChatMessage, ErrorMessage, ErrorType, Hint, IdMessage, JoinMessage, PositionPickerMessage, TeamType } from '../../../model/message-interfaces';
import { Room } from '../../../model/room';
import { Store } from '@ngrx/store';
import { selectRoomId, selectUsername } from '../state/selector/ids.selector';
import { forkJoin, take } from 'rxjs';
import { loadPlayerId, loadRoomId, loadUsername } from '../state/action/ids.action';
import { loadHint, loadRoom } from '../state/action/room.action';
import { loadGlobalMessages, loadTeamMessages } from '../state/action/chat.action';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SocketHandlerService {
  private socket?: Socket;
  private cookieHandlerService = inject(CookieHandlerService);
  private errorHandlerService = inject(ErrorHandlerService);
  private store = inject(Store);

  private isOwnIdKnown = false;

  loadGameJoinData(callback: (username: string, roomId: number) => void) {
    forkJoin({
      username: this.store.select(selectUsername).pipe(take(1)),
      roomId: this.store.select(selectRoomId).pipe(take(1))
    }).subscribe(({ username, roomId }) => {
      callback(username, roomId);
    });
  }

  /** Establish socket connection with server, optional groupId parameter for joining existing group */
  connect(){
    this.disconnect();
    this.isOwnIdKnown = false;
    this.socket = io();

    // Listeners for incoming socket messages
    // Game handling
    this.socket.on(ServerMessageType.TestMessage, (message) =>{
      console.log('Received test message', message);
    });
    this.socket.on(ServerMessageType.ConnectAck, () =>{
      console.log('Received connect ACK.');
      this.loadGameJoinData((username, roomId) => {
        if(roomId == -1){
          this.createRoom(username);
        } else {
          this.joinRoom(username, roomId);
        }
      });
    });
    this.socket.on(ServerMessageType.ReceiveId, (ids: IdMessage) =>{
      console.log("Received ids", ids.playerId, ids.roomId);
      this.isOwnIdKnown = true;
      this.store.dispatch(loadPlayerId({playerId: ids.playerId as number}));
      this.store.dispatch(loadRoomId({roomId: ids.roomId as number}));
      this.cookieHandlerService.removeCookie('playerId', '/socket.io');
      this.cookieHandlerService.setCookie('playerId', (ids.playerId as number) + '', '/socket.io');

    });
    this.socket.on(ServerMessageType.ReceiveRoom, (room: Room) =>{
      console.log("Received room", room);
      //If own id info has not been received, query it
      if(!this.isOwnIdKnown) this.getId();
      this.store.dispatch(loadRoom({room: room}));
    });
    this.socket.on(ServerMessageType.ReceiveHint, (hint: Hint) =>{
      console.log("Received hint", hint.word, hint.number);
      this.store.dispatch(loadHint({hint: hint}));
    });
    this.socket.on(ServerMessageType.ReceiveGuess, (index: number) =>{
      console.log("Received guess", index);
      //TODO: load to store
    });
    this.socket.on(ServerMessageType.GameOver, (winningTeam: TeamType) =>{
      console.log("Received game over", winningTeam);
      //TODO: handle
    });
    this.socket.on(ServerMessageType.Error, (error: ErrorMessage) =>{
      console.log("SOCKET ERROR", error.errorType, error.message);
      this.errorHandlerService.handle(error);
    });

    //Chat handling
    this.socket.on(ServerMessageType.ReceiveTeamMessage, (chat: ChatMessage[]) =>{
      console.log("Received room chat", chat);
      this.store.dispatch(loadTeamMessages({messages: chat}));
    });
    this.socket.on(ServerMessageType.ReceiveGlobalMessage, (chat: ChatMessage[]) =>{
      console.log("Received global chat", chat);
      this.store.dispatch(loadGlobalMessages({messages: chat}));
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
    this.disconnect();
    this.cookieHandlerService.removeCookie('playerId', '/socket.io');
  }

  /** Query own room and player ids */
  getId() {
    this.socket?.emit(ClientMessageType.GetId);
  }

  /** Pick a team and role for player with given id */
  pickPosition(playerId: number, team: TeamType, isSpymaster: boolean) {
    let content : PositionPickerMessage = {
      playerId: playerId,
      team: team,
      spymaster: isSpymaster
    };
    this.socket?.emit(ClientMessageType.PickPosition, content);
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
