import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAX_MESSAGE_LENGTH } from '../../../model';

@Component({
  selector: 'app-chat-message-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './chat-message-form.component.html',
  styleUrl: './chat-message-form.component.css'
})
export class ChatMessageFormComponent {
  @Input({required: true})
  type!: 'room' | 'global';

  private formBuilder = inject(FormBuilder);
  formGroup = this.formBuilder.group({
    message: ['', [Validators.required, Validators.maxLength(MAX_MESSAGE_LENGTH)]]
  });

  sendMessage() {
    if(this.formGroup.valid) {
      //TODO: send throug socket depending on type
      console.log(this.formGroup.value.message);
      this.formGroup.reset();
    }
  }

  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // reset
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  }
}
