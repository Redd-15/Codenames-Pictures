import { Component, inject } from '@angular/core';
import { ModalContent } from '../model/modal-content';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-room-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-room-form.component.html',
  styleUrl: './create-room-form.component.css'
})
export class CreateRoomFormComponent implements ModalContent {
 formBuilder = inject(FormBuilder);
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
       return true;
     } else {
       console.log('Form invalid');
       return false;
     }
   };

}
