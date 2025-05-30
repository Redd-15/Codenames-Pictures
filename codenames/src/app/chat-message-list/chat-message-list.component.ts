import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ChatMessage } from '../../../model/message-interfaces';
import { CommonModule } from '@angular/common';
import { UserMessage } from '../model/user-message';

@Component({
  selector: 'app-chat-message-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-message-list.component.html',
  styleUrl: './chat-message-list.component.css'
})
export class ChatMessageListComponent {
    @Input({required: true})
    myId = -1;
    @Input({required: true})
    messages: UserMessage[] = [];

    @ViewChild('scrollPanel') scrollPanel!: ElementRef<HTMLDivElement>;

    ngAfterViewInit() {
      // Scroll to bottom
      const panel = this.scrollPanel.nativeElement;
      panel.scrollTop = panel.scrollHeight;
    }
}
