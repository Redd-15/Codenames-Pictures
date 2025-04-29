import { Component, inject } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { CreateRoomFormComponent } from '../create-room-form/create-room-form.component';
import { JoinRoomFormComponent } from '../join-room-form/join-room-form.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  private modalService = inject(ModalService);
  openCreateModal(){
    this.modalService.open('Create room', CreateRoomFormComponent, 'Create');
  }

  openJoinModal() {
    this.modalService.open('Join room', JoinRoomFormComponent, 'Join');
  }
}
