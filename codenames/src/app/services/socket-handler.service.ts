import { inject, Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { ServerMessageType, ClientMessageType } from '../../../model';
import { CookieHandlerService } from './cookie-handler.service';

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
    this.socket.on(ServerMessageType.TestMessage, (message) =>{
      console.log(message);
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

  /** Disconnect socket */
  disconnect(){
    this.socket?.disconnect();
    this.socket = undefined;
  }
}
