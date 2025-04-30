import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessageListComponent } from '../chat-message-list/chat-message-list.component';
import { ChatMessageFormComponent } from '../chat-message-form/chat-message-form.component';
import { ChatMessage } from '../../../model/message-interfaces';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ChatMessageListComponent, ChatMessageFormComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  @Input()
  name = 'Chat';

  messages: ChatMessage[] = [
    { senderId: 1, message: "This is a message, cute." },
    { senderId: 1, message: "This is a message, cute. This is a message, cute. This is a message, cute. This is a message, cute." },
    { senderId: 2, message: "This is a message, cute." },
    { senderId: 1, message: "OK." },
    { senderId: 3, message: "This is a message, cute." },
    { senderId: 1, message: "This is a message, cute." },
    { senderId: 1, message: "This is a message, cute. This is a message, cute. This is a message, cute. This is a message, cute." },
    { senderId: 2, message: "This is a message, cute." },
    { senderId: 1, message: "OK." },
    { senderId: 3, message: "This is a message, cute." },
    { senderId: 1, message: "This is a message, cute." },
    { senderId: 1, message: "This is a message, cute. This is a message, cute. This is a message, cute. This is a message, cute." },
    { senderId: 2, message: "This is a message, cute." },
    { senderId: 1, message: "OK." },
    { senderId: 3, message: "This is a message, cute." },
  ];
}
