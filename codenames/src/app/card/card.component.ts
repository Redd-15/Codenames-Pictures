import { Component, inject, Input, OnInit } from '@angular/core';
import { Card } from '../model/card';
import { CommonModule } from '@angular/common';
import { TeamType } from '../../../model/message-interfaces';
import { SocketHandlerService } from '../services/socket-handler.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  private socketHandlerService = inject(SocketHandlerService);

  @Input()
  isHighlightingAllowed = true;

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

  @Input({ required: true })
  phase !: 'guess' | 'clue';

  get cardClass() {
    return (this.isSpymasterMode ? 'spymaster '+this.card.colour : 'non-spymaster ') + ' ' + (this.card.isHighlighted ? 'highlighted' : '');
  }

  highlightCard() {
    if(!this.isHighlightingAllowed) return;
    this.card.toggleHighlight();
  }

  flipCard() {
    if(this.turn != this.team) return;
    if(this.isSpymasterMode) return;
    this.socketHandlerService.makeGuess(this.index);
    console.log('Guess', this.index);
    //this.card.revealColour();
  }
}
