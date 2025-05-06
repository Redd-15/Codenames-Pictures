import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../model/card';
import { CommonModule } from '@angular/common';
import { TeamType } from '../../../model/message-interfaces';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input({ required: true })
  card !: Card;
  @Input({ required: true })
  index !: number;
  @Input()
  isSpymasterMode = false;
  @Input({ required: true })
  team !: TeamType;
  @Input({ required: true })
  turn !: TeamType;


  isFlipped: boolean = false;

  get cardClass() {
    return (this.isSpymasterMode ? 'spymaster '+this.card.colour : 'non-spymaster ') + ' ' + (this.card.isHighlighted ? 'highlighted' : '');
  }

  ngOnInit() {
    this.isFlipped = !this.card.isSecret;
  }

  highlightCard() {
    this.card.toggleHighlight();
  }

  flipCard() {
    if(this.turn != this.team) return;
    if(this.isSpymasterMode) return;
    this.isFlipped = true;
    this.card.revealColour();
  }
}
