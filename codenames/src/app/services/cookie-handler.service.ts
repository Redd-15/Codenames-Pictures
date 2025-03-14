import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { ServerMessageType, ClientMessageType } from '../../../model';

@Injectable({
  providedIn: 'root'
})
export class CookieHandlerService {

  /** Set a cookie with given name, value and path */
  setCookie(name: string, value: string, path: string){
    document.cookie = `${name}=${value}; path=${path}; Secure; SameSite=Strict;  max-age=14400;`;
  }

  /** Set a cookie of given name and path. The path should be same as on setting! */
  removeCookie(name: string, path:string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
  }
}
