import { Component, inject } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { RoomMenuComponent } from '../room-menu/room-menu.component';
import { Router } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import { Store } from '@ngrx/store';
import { resetRoom } from '../state/action/room.action';
import { resetIds } from '../state/action/ids.action';
import { SocketHandlerService } from '../services/socket-handler.service';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [GameComponent, RoomMenuComponent, ChatComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent {
  private router = inject(Router);
  private store = inject(Store);
  private socketHandlerService = inject(SocketHandlerService)
  // TODO: set to true
  isRoomWindowVisible = true;
  isGlobalChatOpen = false;
  isTeamChatOpen = false;

  ngOnInit() {
    this.socketHandlerService.connect();
  }

  toggleGlobalChat() {
    this.isGlobalChatOpen = !this.isGlobalChatOpen;
  }

  toggleTeamChat() {
    this.isTeamChatOpen = !this.isTeamChatOpen;
  }

  startGame(){
    this.isRoomWindowVisible = false;
    //TODO: socket communication
  }

  leaveGame(){
    //TODO this.store.dispatch(resetRoom());
    this.store.dispatch(resetIds());
    this.router.navigateByUrl("")
    //TODO: socket communication
  }
}
