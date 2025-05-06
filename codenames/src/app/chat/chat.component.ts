import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessageListComponent } from '../chat-message-list/chat-message-list.component';
import { ChatMessageFormComponent } from '../chat-message-form/chat-message-form.component';
import { ChatMessage } from '../../../model/message-interfaces';
import { Store } from '@ngrx/store';
import { BaseComponent } from '../base.component';
import { selectGlobalMessages, selectTeamMessages } from '../state/selector/chat.selector';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ChatMessageListComponent, ChatMessageFormComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent extends BaseComponent {
  private store = inject(Store);
  @Input()
  name = 'Chat';
  @Input()
  type: 'team' | 'global' = 'team';

  messages: ChatMessage[] = [];

  ngOnInit(){
    if(this.type == 'team') {
       this.store.select(selectTeamMessages).pipe(takeUntil(this.destroy$)).subscribe((teamMessages) => {
            this.messages = teamMessages;
        });
    } else {
      this.store.select(selectGlobalMessages).pipe(takeUntil(this.destroy$)).subscribe((globalMessages) => {
        this.messages = globalMessages;
    });
    }
  }
}
