import { Component, inject } from '@angular/core';
import { ModalContent } from '../model/modal-content';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-join-room-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './join-room-form.component.html',
  styleUrl: './join-room-form.component.css'
})
export class JoinRoomFormComponent implements ModalContent {
  private toastr = inject(ToastrService);
  private storageService = inject(StorageService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
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
      if(this.form.value.roomId) this.storageService.roomId = parseInt(this.form.value.roomId);
      if(this.form.value.username) this.storageService.username = this.form.value.username;
      this.router.navigateByUrl('/game');
      return true;
    } else {
      console.log('Form invalid');
      let message = this.roomId?.invalid ? 'Please specify a valid numeric room ID.' : 'Please specify a valid username of minimum 3 alphanumeric characters.';
      this.toastr.error(message, 'Invalid data', {toastClass: 'ngx-toastr toast-custom'});
      return false;
    }
  };
}
