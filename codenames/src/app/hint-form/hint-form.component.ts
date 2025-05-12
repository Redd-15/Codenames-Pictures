import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SocketHandlerService } from '../services/socket-handler.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hint-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgbTooltipModule, CommonModule],
  templateUrl: './hint-form.component.html',
  styleUrl: './hint-form.component.css'
})
export class HintFormComponent {
  private socketHandlerService = inject(SocketHandlerService);
  private toastr = inject(ToastrService);
  private formBuilder = inject(FormBuilder);
  clueForm = this.formBuilder.group({
    clue: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[^\s]*$/)]],
    number: [1]
  });
  numbers: number[] = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  submitClue() {
    console.log(this.clueForm.value);
    if (this.clueForm.valid && this.clueForm.value.clue && this.clueForm.value.number) {
      this.socketHandlerService.giveHint(this.clueForm.value.clue, this.clueForm.value.number);
      this.clueForm.reset({ clue: '', number: 1 });
    } else {
      this.toastr.error('Please enter a single word of maximum 50 characters.', 'Invalid data', { toastClass: 'ngx-toastr toast-custom' });
    }
  }
}
