import { Component, inject } from '@angular/core';
import { ModalContent } from '../model/modal-content';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-join-room-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './join-room-form.component.html',
  styleUrl: './join-room-form.component.css'
})
export class JoinRoomFormComponent implements ModalContent {

  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z0-9]+$') // Alphanumeric only
      ]
    ],
    roomId: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]+$') // Digits only
      ]
    ]
  });

  get username() {
    return this.form.get('username');
  }
  get roomId() {
    return this.form.get('roomId');
  }
  submit = () => {
    if (this.form.valid) {
      console.log('Form data:', this.form.value);
      return true;
    } else {
      console.log('Form invalid');
      return false;
    }
  };
}
