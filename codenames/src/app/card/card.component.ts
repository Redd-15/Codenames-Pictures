import { Component, Input } from '@angular/core';
import { Card } from '../model/card';
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
  @Input()
  isSpymasterMode = false;
  @Input({ required: true })
  team !: string;


  isFlipped: boolean = false;

  ngOnInit() {
    this.isFlipped = !this.card.isSecret;
  }

  flipImage() {
    if(this.isSpymasterMode) return;
    this.isFlipped = true;
    this.card.revealColour();
  }
}
