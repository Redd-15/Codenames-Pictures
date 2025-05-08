import { Component, inject } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { CreateRoomFormComponent } from '../create-room-form/create-room-form.component';
import { JoinRoomFormComponent } from '../join-room-form/join-room-form.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { selectUsername } from '../state/selector/ids.selector';
import { take } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  private modalService = inject(ModalService);
  private router = inject(Router);

  isRejoinAvailable = localStorage.getItem('playerId') !== null;

  openCreateModal(){
    this.modalService.open('Create room', CreateRoomFormComponent, 'Create');
  }

  openJoinModal() {
    this.modalService.open('Join room', JoinRoomFormComponent, 'Join');
  }

  rejoinPrevious() {
    this.router.navigateByUrl('/game');
  }
}
