import { Component, inject } from '@angular/core';
import { ModalContent } from '../model/modal-content';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadUsername, resetIds } from '../state/action/ids.action';
import { resetRoom } from '../state/action/room.action';
import { SocketHandlerService } from '../services/socket-handler.service';

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
  private store = inject(Store);
  private formBuilder = inject(FormBuilder);
  private socketHandlerService = inject(SocketHandlerService);
  form = this.formBuilder.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
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
      if(this.form.value.username){
        this.store.dispatch(resetIds());
        this.store.dispatch(resetRoom());
        this.store.dispatch(loadUsername({username: this.form.value.username}));
      }
      //Leave current room to be able to rejoin new room
      this.socketHandlerService.leaveRoom();
      this.router.navigateByUrl('/game');
      return true;
    } else {
      console.log('Form invalid');
      this.toastr.error('Please specify a valid username of 3-20 alphanumeric characters.', 'Invalid data', { toastClass: 'ngx-toastr toast-custom' });
      return false;
    }
  };

}
