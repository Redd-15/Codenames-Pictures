import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessageListComponent } from '../chat-message-list/chat-message-list.component';
import { ChatMessageFormComponent } from '../chat-message-form/chat-message-form.component';
import { ChatMessage } from '../../../model/message-interfaces';
import { Store } from '@ngrx/store';
import { BaseComponent } from '../base.component';
import { selectGlobalMessages, selectTeamMessages } from '../state/selector/chat.selector';
import { combineLatest, filter, takeUntil } from 'rxjs';
import { selectRoom } from '../state/selector/room.selector';
import { UserMessage } from '../model/user-message';
import { Player } from '../../../model/player';
import { selectPlayerId } from '../state/selector/ids.selector';
import { SocketHandlerService } from '../services/socket-handler.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ChatMessageListComponent, ChatMessageFormComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent extends BaseComponent {
  private store = inject(Store);
  private socketHandlerService = inject(SocketHandlerService);
  @Input()
  name = 'Chat';
  @Input()
  type: 'team' | 'global' = 'team';

  players: Player[] = [];
  messages: UserMessage[] = [];
  myId = -1;

  ngOnInit() {
    this.store.select(selectPlayerId).pipe(takeUntil(this.destroy$)).subscribe((playerId) => {
      if(playerId != -1){
        this.myId = playerId;
      } else {
        this.socketHandlerService.getId();
      }
    });
    const room$ = this.store.select(selectRoom).pipe(
      filter(room => !!room), // Ensure room is not null
      takeUntil(this.destroy$)
    );

    const messages$ = (this.type === 'team')
      ? this.store.select(selectTeamMessages).pipe(takeUntil(this.destroy$))
      : this.store.select(selectGlobalMessages).pipe(takeUntil(this.destroy$));

    combineLatest([room$, messages$]).subscribe(([room, messages]) => {
      this.players = room!.players;
      this.messages = this.mapMessages(messages);
    });
  }

  mapMessages(chatMessages: ChatMessage[]) {
    return chatMessages.map(msg => {
      const player = this.players.find(p => p.id === msg.senderId);
      return {
        senderId: player?.id ?? -1,
        senderName: player?.name ?? 'unknown',
        message: msg.message,
      } as UserMessage
    });
  }
}
