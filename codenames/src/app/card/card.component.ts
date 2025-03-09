import { Component, Input } from '@angular/core';
import { Card } from '../../../model/card';
import { CardColour } from '../../../model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input({ required: true })
  card !: Card;
  @Input({ required: true })
  index !: number;

  isFlipped: boolean = false;

  ngOnInit() {
    this.isFlipped = !this.card.isSecret;
  }

  flipImage() {
    this.isFlipped = true;
    this.card.revealColour();
  }
}
