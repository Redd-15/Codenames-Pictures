import { Component, inject } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { RoomMenuComponent } from '../room-menu/room-menu.component';
import { Router } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [GameComponent, RoomMenuComponent, ChatComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent {
  private router = inject(Router);
  // TODO: set to true
  isRoomWindowVisible = false;
  isGlobalChatOpen = false;
  isTeamChatOpen = false;

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
    this.router.navigateByUrl("")
    //TODO: socket communication
  }
}
