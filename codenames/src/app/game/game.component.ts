import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Card } from '../model/card';
import { CommonModule } from '@angular/common';
import { CardColour, MAX_CARD_NO } from '../../../model';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  isSpymaster = false;
  team = 'blue';
  cards: Card[] = this.generateRandomDeck();

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
