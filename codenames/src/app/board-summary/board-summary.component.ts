import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Store } from '@ngrx/store';
import { Card } from '../model/card';
import { selectCards } from '../state/selector/room.selector';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../base.component';
import { CardColour, TeamType } from '../../../model/message-interfaces';

@Component({
  selector: 'app-board-summary',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './board-summary.component.html',
  styleUrl: './board-summary.component.css'
})
export class BoardSummaryComponent extends BaseComponent {
  private store = inject(Store);

  cards: Card[] = [];
  team = TeamType.Blue;
  currentTeam = TeamType.Red;
  currentPhase: "guess" | "clue" = 'clue';
  isSpymaster = true;

  ngOnInit() {
    this.store.select(selectCards).pipe(takeUntil(this.destroy$)).subscribe((incomingCards) => {
      this.cards = incomingCards.map(c => new Card(c.id, c.colour, true));
    });
  }
}
