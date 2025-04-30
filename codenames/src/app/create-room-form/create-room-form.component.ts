import { Component, inject } from '@angular/core';
import { ModalContent } from '../model/modal-content';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-create-room-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-room-form.component.html',
  styleUrl: './create-room-form.component.css'
})
export class CreateRoomFormComponent implements ModalContent {
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private storageService = inject(StorageService);
  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z0-9]+$') // Alphanumeric only
      ]
    ]
  });

  get username() {
    return this.form.get('username');
  }

  submit = () => {
    if (this.form.valid) {
      console.log('Form data:', this.form.value);
      if(this.form.value.username) this.storageService.username = this.form.value.username;
      this.router.navigateByUrl('/game');
      return true;
    } else {
      console.log('Form invalid');
      this.toastr.error('Please specify a valid username of minimum 3 alphanumeric characters.', 'Invalid data', { toastClass: 'ngx-toastr toast-custom' });
      return false;
    }
  };

}
