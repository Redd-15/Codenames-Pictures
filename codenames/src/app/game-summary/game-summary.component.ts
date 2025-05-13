import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TeamType } from '../../../model/message-interfaces';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { BoardSummaryComponent } from '../board-summary/board-summary.component';

@Component({
  selector: 'app-game-summary',
  standalone: true,
  imports: [CommonModule, BoardSummaryComponent],
  templateUrl: './game-summary.component.html',
  styleUrl: './game-summary.component.css'
})
export class GameSummaryComponent {
  @Input({required: true})
  winner: TeamType | null = TeamType.Blue;

  @Output() restartGame = new EventEmitter<void>();
  @Output() leaveGame = new EventEmitter<void>();

  leaveRoom() {
    this.leaveGame.emit();
  }

  startNewGame() {
    this.restartGame.emit();
  }
}
