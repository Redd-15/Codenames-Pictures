import { Component, inject } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { RoomMenuComponent } from '../room-menu/room-menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [GameComponent, RoomMenuComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent {
  private router = inject(Router);
  isRoomWindowVisible = true;
  startGame(){
    this.isRoomWindowVisible = false;
    //TODO: socket communication
  }

  leaveGame(){
    this.router.navigateByUrl("")
    //TODO: socket communication
  }
}
