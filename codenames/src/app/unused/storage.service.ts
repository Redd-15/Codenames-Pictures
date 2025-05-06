import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private roomIdValue: number | undefined;
  private usernameValue: string | undefined;

  set roomId(roomId: number | undefined) {
    this.roomIdValue = roomId;
  }

  get roomId() {
    return this.roomIdValue;
  }

  set username(username: string | undefined) {
    this.usernameValue = username;
  }

  get username() {
    return this.usernameValue;
  }
}
