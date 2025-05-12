import { Component, inject } from '@angular/core';
import { HintHistory, TeamType } from '../../../model/message-interfaces';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectRoom } from '../state/selector/room.selector';
import { BaseComponent } from '../base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-hint-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hint-history.component.html',
  styleUrl: './hint-history.component.css'
})
export class HintHistoryComponent extends BaseComponent {
  private store = inject(Store);

  hintHistory: HintHistory[] = [
    {
      team: TeamType.Blue,
      hint: {
        word: 'alma',
        number: 2
      }
    },
    {
      team: TeamType.Red,
      hint: {
        word: 'almafa',
        number: 2
      }
    },
    {
      team: TeamType.Blue,
      hint: {
        word: 'megszentségteleníthetetlenségeskedéseitekért',
        number: -1
      }
    },
    {
      team: TeamType.Red,
      hint: {
        word: 'béka',
        number: 0
      }
    }
  ]

  ngOnInit() {
    this.store.select(selectRoom).pipe(takeUntil(this.destroy$)).subscribe((room) => {
      if (room && room.hintHistory) {
        this.hintHistory = room.hintHistory;
      } else {
        this.hintHistory = [];
      }
    });
  }
}
