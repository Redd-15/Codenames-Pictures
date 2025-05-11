import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { SocketHandlerService } from '../services/socket-handler.service';
import { resetIds } from '../state/action/ids.action';
import { resetRoom } from '../state/action/room.action';
import { TeamType } from '../../../model/message-interfaces';
import { Player } from '../../../model/player';
import { BaseComponent } from '../base.component';
import { takeUntil } from 'rxjs';
import { selectPlayerId } from '../state/selector/ids.selector';
import { selectRoom } from '../state/selector/room.selector';

@Component({
  selector: 'app-game-bar',
  standalone: true,
  imports: [CommonModule, NgbTooltipModule],
  templateUrl: './game-bar.component.html',
  styleUrl: './game-bar.component.css'
})
export class GameBarComponent extends BaseComponent {
  private store = inject(Store);
  private socketHandlerService = inject(SocketHandlerService);
  private router = inject(Router);

  @Input({required: true})
  username = '';
  @Input({required: true})
  isSpymaster = false;
  @Input({required: true})
  team = TeamType.Red;

  @Input({required: true})
  isEndGuessingAvailable = false;

  players: Player[] = [];
  ngOnInit() {
    this.store.select(selectRoom).pipe(takeUntil(this.destroy$)).subscribe((room) => {
      if (room) {
        this.players = room.players;
      }
    });
  }

  endGuessing() {
    // TODO: implement
  }

  leaveGame() {
    this.store.dispatch(resetRoom());
    this.store.dispatch(resetIds());
    this.socketHandlerService.leaveRoom();
    this.router.navigateByUrl("")
  }
}
