import { Component, inject } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { RoomMenuComponent } from '../room-menu/room-menu.component';
import { Router } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import { Store } from '@ngrx/store';
import { resetRoom } from '../state/action/room.action';
import { resetIds } from '../state/action/ids.action';
import { SocketHandlerService } from '../services/socket-handler.service';
import { selectIsStarted, selectRoom } from '../state/selector/room.selector';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../base.component';
import { GameSummaryComponent } from '../game-summary/game-summary.component';
import { TeamType } from '../../../model/message-interfaces';
import { selectNewGlobalMessageFlag, selectNewTeamMessageFlag } from '../state/selector/chat.selector';
import { CommonModule } from '@angular/common';
import { resetMessages, setNewGlobalMessageFlag, setNewTeamMessageFlag } from '../state/action/chat.action';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule, GameComponent, RoomMenuComponent, ChatComponent, GameSummaryComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent extends BaseComponent {
  private router = inject(Router);
  private store = inject(Store);
  private socketHandlerService = inject(SocketHandlerService)
  isRoomWindowVisible = true;
  isGlobalChatOpen = false;
  isTeamChatOpen = false;
  isTeamChatNew = true;
  isGlobalChatNew = true;
  winner: TeamType | null = null;

  ngOnInit() {
    this.socketHandlerService.connect();
    this.store.select(selectIsStarted).pipe(takeUntil(this.destroy$)).subscribe((isGameStarted) => {
      this.isRoomWindowVisible = !isGameStarted;
    });
    this.store.select(selectRoom).pipe(takeUntil(this.destroy$)).subscribe((room) => {
      if(room) this.winner = room.winner;
    });
    this.store.select(selectNewGlobalMessageFlag).pipe(takeUntil(this.destroy$)).subscribe((isNew) => {
      //If the chat is already open, do not signal
      if(isNew && this.isGlobalChatOpen) return;
      this.isGlobalChatNew = isNew;
    });
    this.store.select(selectNewTeamMessageFlag).pipe(takeUntil(this.destroy$)).subscribe((isNew) => {
      //If the chat is already open, do not signal
       if(isNew && this.isTeamChatOpen) return;
      this.isTeamChatNew = isNew;
    });
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.socketHandlerService.disconnect();
  }

  toggleGlobalChat() {
    this.isGlobalChatOpen = !this.isGlobalChatOpen;
    if(this.isGlobalChatOpen) this.store.dispatch(setNewGlobalMessageFlag({isNew: false}));
  }

  toggleTeamChat() {
    this.isTeamChatOpen = !this.isTeamChatOpen;
    if(this.isTeamChatOpen) this.store.dispatch(setNewTeamMessageFlag({isNew: false}));
  }

  startGame(){
    this.isRoomWindowVisible = false;
    this.socketHandlerService.startGame();
  }

  restartGame() {
    this.store.dispatch(resetRoom());
    this.socketHandlerService.startNewGame();
  }

  leaveGame(){
    this.store.dispatch(resetMessages());
    this.store.dispatch(resetRoom());
    this.store.dispatch(resetIds());
    this.socketHandlerService.leaveRoom();
    this.router.navigateByUrl("")
  }
}
