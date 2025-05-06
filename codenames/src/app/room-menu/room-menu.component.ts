import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Room } from '../../../model/room';
import { CommonModule } from '@angular/common';
import { CdkDropList, CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Player } from '../../../model/player';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { selectPlayerId, selectRoomId } from '../state/selector/ids.selector';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../base.component';
import { selectBlueOperatives, selectBlueSpymasters, selectRedOperatives, selectRedSpymasters, selectRoom } from '../state/selector/room.selector';

@Component({
  selector: 'app-room-menu',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag],
  templateUrl: './room-menu.component.html',
  styleUrl: './room-menu.component.css'
})
export class RoomMenuComponent extends BaseComponent implements OnInit {
  private store = inject(Store);
  private toastr = inject(ToastrService);

  @Output() startGame = new EventEmitter<void>();
  @Output() leaveGame = new EventEmitter<void>();

  roomId = -1;
  myId = -1;
  room: Room | undefined;
  isLoaded = false;

  get roomIdText() {
    return this.roomId == -1 ? '?' : this.roomId;
  }

  redSpymasters: Player[] = [];

  blueSpymasters: Player[] = [];

  redTeam: Player[] = [];

  blueTeam: Player[] = [];

  ngOnInit() {
    this.store.select(selectRoomId).pipe(takeUntil(this.destroy$)).subscribe((roomId) => {
      this.roomId = roomId;
    });

    this.store.select(selectPlayerId).pipe(takeUntil(this.destroy$)).subscribe((playerId) => {
      this.myId = playerId;
    });

    this.store.select(selectRoom).pipe(takeUntil(this.destroy$)).subscribe((room) => {
      if(room) {
        this.room = room;
        this.isLoaded = true;
        console.log("Loaded");
      } else {
        console.log("No room loaded.");
      }
    });

    this.loadPlayers();
  }

  loadPlayers() {
    this.store.select(selectRedOperatives).pipe(takeUntil(this.destroy$)).subscribe((players) => {
      this.redTeam = players;
    });
    this.store.select(selectBlueOperatives).pipe(takeUntil(this.destroy$)).subscribe((players) => {
      this.blueTeam = players;
    });
    this.store.select(selectRedSpymasters).pipe(takeUntil(this.destroy$)).subscribe((players) => {
      this.redSpymasters = players;
    });
    this.store.select(selectBlueSpymasters).pipe(takeUntil(this.destroy$)).subscribe((players) => {
      this.blueSpymasters = players;
    });
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
