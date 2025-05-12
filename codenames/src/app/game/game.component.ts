import { Component, inject } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Card } from '../model/card';
import { CommonModule } from '@angular/common';
import { MAX_CARD_NO } from '../../../model/';
import { CardColour, TeamType } from '../../../model/message-interfaces';
import { Store } from '@ngrx/store';
import { selectCards, selectRoom } from '../state/selector/room.selector';
import { BaseComponent } from '../base.component';
import { takeUntil } from 'rxjs';
import { selectPlayerId } from '../state/selector/ids.selector';
import { HintFormComponent } from '../hint-form/hint-form.component';
import { HintDisplayComponent } from '../hint-display/hint-display.component';
import { HintHistoryComponent } from '../hint-history/hint-history.component';
import { GameBarComponent } from '../game-bar/game-bar.component';
import { SocketHandlerService } from '../services/socket-handler.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, CardComponent, HintFormComponent, HintDisplayComponent, HintHistoryComponent, GameBarComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent extends BaseComponent {
  private store = inject(Store);
  private socketHandlerService = inject(SocketHandlerService);

  //Current state info
  cards: Card[] = [];
  currentTeam = TeamType.Red;
  currentPhase: 'clue' | 'guess' = 'clue';
  remainingGuesses = 0;

  //Current player info
  username = '';
  playerId = -1;
  isSpymaster = false;
  team = TeamType.Red;


  ngOnInit() {
    this.store.select(selectPlayerId).pipe(takeUntil(this.destroy$)).subscribe((playerId) => {
      if(playerId != -1){
        this.playerId = playerId;
      } else {
        this.socketHandlerService.getId();
      }
    });
    this.store.select(selectRoom).pipe(takeUntil(this.destroy$)).subscribe((room) => {
      if (room) {
        this.currentTeam = room.turn;
        this.currentPhase = room.currentHint ? 'guess' : 'clue';
        this.remainingGuesses = room.remainingGuesses;
        //Get current player's info
        let player = room.players.find((player) => player.id === this.playerId);
        if (player) {
          this.username = player.name
          this.isSpymaster = player.isSpymaster;
          this.team = player.team ?? TeamType.Red;
        }
      }
    });
    this.store.select(selectCards).pipe(takeUntil(this.destroy$)).subscribe((cards) => {
      // TODO: modify, this won't work, will always have different images behind it
      const cardObjects: Card[] = [];
      for (let card of cards) {
        cardObjects.push(new Card(card.id, card.colour, card.isSecret));
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
