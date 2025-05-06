import { Component, inject } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Card } from '../model/card';
import { CommonModule } from '@angular/common';
import { MAX_CARD_NO } from '../../../model/';
import { CardColour, TeamType } from '../../../model/message-interfaces';
import { Store } from '@ngrx/store';
import { selectCards, selectPlayerById, selectPlayerCount, selectRoom, selectTurn } from '../state/selector/room.selector';
import { BaseComponent } from '../base.component';
import { take, takeUntil } from 'rxjs';
import { selectPlayerId, selectUsername } from '../state/selector/ids.selector';
import { Player } from '../../../model/player';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent extends BaseComponent {
  private store = inject(Store);

  cards: Card[] = [];
  currentTeam = TeamType.Red;
  currentPhase: 'clue' | 'guess' = 'clue';

  username = '';
  isSpymaster = false;
  team = TeamType.Red;

  playerNum = 0;

  ngOnInit() {
    this.store.select(selectPlayerId).pipe(takeUntil(this.destroy$)).subscribe((playerId) => {
      this.store.select(selectPlayerById(playerId)).pipe(take(1)).subscribe((player) => {
        this.username = player ? player.name : '';
        this.isSpymaster = player ? player.isSpymaster : false;
        this.team = player ? (player.team ?? TeamType.Red) : TeamType.Red;
      });
    });
    this.store.select(selectRoom).pipe(takeUntil(this.destroy$)).subscribe((room) => {
      if(room){
        this.currentTeam = room.turn;
        this.currentPhase = room.currentHint ? 'guess' : 'clue';
      }
    });
    this.store.select(selectPlayerCount).pipe(takeUntil(this.destroy$)).subscribe((playerCount) => {
      this.playerNum = playerCount;
    });
    this.store.select(selectCards).pipe(takeUntil(this.destroy$)).subscribe((cards) => {
      const cardObjects: Card[] = [];
      for(let card of cards){
        cardObjects.push(new Card(card.id, card.colour));
      }
      this.cards = cardObjects;
    });
  }

  private generateRandomDeck(): Card[] {
    //Array with all ids
    const ids = Array.from({ length: MAX_CARD_NO + 1 }, (_, i) => i);
    //Shuffle
    this.shuffle(ids);

    const cardDistribution = [
      { colour: CardColour.Red, count: 8 },
      { colour: CardColour.Blue, count: 7 },
      { colour: CardColour.Black, count: 1 },
      { colour: CardColour.Grey, count: 4 }
    ];

    let index = 0;
    const cards: Card[] = [];
    //Add a colour coloured card count times for all in cardDistribution
    for (const { colour, count } of cardDistribution) {
      for (let i = 0; i < count; i++) {
        cards.push(new Card(ids[index], colour));
        index++;
      }
    }
    //Shuffle again
    this.shuffle(cards);
    return cards;
  }

  private shuffle(array: any[]) {
    array.sort(() => Math.random() - 0.5);
  };
}
