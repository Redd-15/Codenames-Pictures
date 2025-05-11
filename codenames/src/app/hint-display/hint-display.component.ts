import { Component, inject } from '@angular/core';
import { Hint } from '../../../model/message-interfaces';
import { Store } from '@ngrx/store';
import { BaseComponent } from '../base.component';
import { takeUntil } from 'rxjs';
import { selectRoom } from '../state/selector/room.selector';

@Component({
  selector: 'app-hint-display',
  standalone: true,
  imports: [],
  templateUrl: './hint-display.component.html',
  styleUrl: './hint-display.component.css'
})
export class HintDisplayComponent extends BaseComponent {
  private store = inject(Store);
  currentHint: Hint = {
      word: 'kiskutya',
      number: 4
  }

  ngOnInit() {
      this.store.select(selectRoom).pipe(takeUntil(this.destroy$)).subscribe((room) => {
        if (room) {
          this.currentHint = room.currentHint ?? {word: 'clue', number: -1};
        }
      });
    }
}
