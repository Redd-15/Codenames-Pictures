import { Component, inject } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Card } from '../model/card';
import { CommonModule } from '@angular/common';
import { MAX_CARD_NO } from '../../../model/';
import { CardColour, Hint, TeamType } from '../../../model/message-interfaces';
import { Store } from '@ngrx/store';
import { selectCards, selectPlayerById, selectPlayerCount, selectRoom } from '../state/selector/room.selector';
import { BaseComponent } from '../base.component';
import { map, switchMap, take, takeUntil } from 'rxjs';
import { selectPlayerId, selectUsername } from '../state/selector/ids.selector';
import { HintHistoryEntry } from '../model/hint-history-entry';
import { resetIds } from '../state/action/ids.action';
import { resetRoom } from '../state/action/room.action';
import { SocketHandlerService } from '../services/socket-handler.service';
import { Router } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Player } from '../../../model/player';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, NgbTooltipModule, CardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent extends BaseComponent {
  private store = inject(Store);
  private socketHandlerService = inject(SocketHandlerService);
  private router = inject(Router);

  cards: Card[] = [];
  currentTeam = TeamType.Red;
  currentPhase: 'clue' | 'guess' = 'clue';

  username = '';
  playerId = -1;
  isSpymaster = false;
  team = TeamType.Red;

  players: Player[] = [];

  playerNum = 0;

  get playerNameList() {
    let output = "";
    for(let player of this.players) {
      output += player.name+'<br>';
    }
    return output;
  }

  currentHint: Hint = {
    word: 'kiskutya',
    number: 4
  }
  hintHistory: HintHistoryEntry[] = [
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
    },
    {
      team: TeamType.Blue,
      hint: {
        word: 'havas',
        number: 8
      }
    },
    {
      team: TeamType.Red,
      hint: {
        word: 'béka',
        number: 0
      }
    },
    {
      team: TeamType.Blue,
      hint: {
        word: 'havas',
        number: 8
      }
    },
    {
      team: TeamType.Red,
      hint: {
        word: 'béka',
        number: 0
      }
    },
    {
      team: TeamType.Blue,
      hint: {
        word: 'havas',
        number: 8
      }
    },
    {
      team: TeamType.Red,
      hint: {
        word: 'béka',
        number: 0
      }
    },
    {
      team: TeamType.Blue,
      hint: {
        word: 'havas',
        number: 8
      }
    },
    {
      team: TeamType.Red,
      hint: {
        word: 'béka',
        number: 0
      }
    },
    {
      team: TeamType.Blue,
      hint: {
        word: 'havas',
        number: 8
      }
    },
    {
      team: TeamType.Red,
      hint: {
        word: 'béka',
        number: 0
      }
    },
    {
      team: TeamType.Blue,
      hint: {
        word: 'havas',
        number: 8
      }
    },
    {
      team: TeamType.Red,
      hint: {
        word: 'béka',
        number: 0
      }
    },
    {
      team: TeamType.Blue,
      hint: {
        word: 'havas',
        number: 8
      }
    }
  ]

  ngOnInit() {
    this.store.select(selectPlayerId).pipe(takeUntil(this.destroy$)).subscribe((playerId) => {
      this.playerId = playerId;
    });
    this.store.select(selectRoom).pipe(takeUntil(this.destroy$)).subscribe((room) => {
      if (room) {
        this.currentTeam = room.turn;
        this.currentPhase = room.currentHint ? 'guess' : 'clue';
        this.players = room.players;
        //Get player data
        let player = room.players.find((player) => player.id === this.playerId);
        if (player) {
          this.username = player.name;
          this.isSpymaster = player.isSpymaster;
          this.team = player.team ?? TeamType.Red;
        }
      }
    });
    this.store.select(selectPlayerCount).pipe(takeUntil(this.destroy$)).subscribe((playerCount) => {
      this.playerNum = playerCount;
    });
    this.store.select(selectCards).pipe(takeUntil(this.destroy$)).subscribe((cards) => {
      const cardObjects: Card[] = [];
      for (let card of cards) {
        cardObjects.push(new Card(card.id, card.colour));
      }
      this.cards = cardObjects;
    });
  }

  leaveGame() {
    this.store.dispatch(resetRoom());
    this.store.dispatch(resetIds());
    this.socketHandlerService.leaveRoom();
    this.router.navigateByUrl("")
    //TODO: socket communication
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
