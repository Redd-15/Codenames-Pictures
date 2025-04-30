import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Room } from '../../../model/room';
import { CommonModule } from '@angular/common';
import { CdkDropList, CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TeamType } from '../../../model/message-interfaces';
import { Player } from '../../../model/player';
import { StorageService } from '../services/storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-room-menu',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag],
  templateUrl: './room-menu.component.html',
  styleUrl: './room-menu.component.css'
})
export class RoomMenuComponent implements OnInit {
  private storageService = inject(StorageService);
  private toastr = inject(ToastrService);

  @Output() startGame = new EventEmitter<void>();
  @Output() leaveGame = new EventEmitter<void>();

  roomId = -1;
  myId = 1;
  room: Room | undefined = {
    roomId: 1234,
    isStarted: false,
    turn: TeamType.Red,
    remainingGuesses: 0,
    currentHint: null,
    players: [],
    cards: []
  };
  isLoaded = true;

  get roomIdText() {
    return this.roomId == -1 ? '?' : this.roomId;
  }

  redSpymasters: Player[] = [{
    id: 1,
    socketId: "1",
    name: "player1",
    team: TeamType.Red,
    isSpymaster: true,
    isInactive: false,
  }]

  blueSpymasters: Player[] = [{
    id: 2,
    socketId: "2",
    name: "player2",
    team: TeamType.Blue,
    isSpymaster: true,
    isInactive: false,
  }]

  redTeam: Player[] = [
    {
      id: 3,
      socketId: "3",
      name: "player3",
      team: TeamType.Red,
      isSpymaster: false,
      isInactive: false,
    },
    {
      id: 4,
      socketId: "4",
      name: "player4",
      team: TeamType.Red,
      isSpymaster: false,
      isInactive: false,
    },
    {
      id: 3,
      socketId: "3",
      name: "player3",
      team: TeamType.Red,
      isSpymaster: false,
      isInactive: false,
    },
    {
      id: 4,
      socketId: "4",
      name: "player4",
      team: TeamType.Red,
      isSpymaster: false,
      isInactive: false,
    },
    {
      id: 3,
      socketId: "3",
      name: "player3",
      team: TeamType.Red,
      isSpymaster: false,
      isInactive: false,
    },
    {
      id: 4,
      socketId: "4",
      name: "player4",
      team: TeamType.Red,
      isSpymaster: false,
      isInactive: false,
    },
    {
      id: 3,
      socketId: "3",
      name: "player3",
      team: TeamType.Red,
      isSpymaster: false,
      isInactive: false,
    },
    {
      id: 4,
      socketId: "4",
      name: "player4",
      team: TeamType.Red,
      isSpymaster: false,
      isInactive: false,
    }
  ]

  blueTeam: Player[] = [
    {
      id: 5,
      socketId: "5",
      name: "player5",
      team: TeamType.Blue,
      isSpymaster: false,
      isInactive: false,
    }
  ]

  ngOnInit() {
    if (this.storageService.roomId) this.roomId = this.storageService.roomId;
    else this.roomId = -1;
  }

  clickStart() {
    if(this.redSpymasters.length == 0 || this.blueSpymasters.length == 0 || this.redTeam.length == 0 || this.blueTeam.length == 0)
      this.toastr.error('Make sure you have spymasters and operatives in both teams.', 'Error', { toastClass: 'ngx-toastr toast-custom' });
    else this.startGame.emit();
  }

  clickLeave() {
    this.leaveGame.emit();
  }

  drop(event: CdkDragDrop<Player[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      //TODO: send move player socket message
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
