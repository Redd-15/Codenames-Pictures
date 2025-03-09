import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'game',
    component: GameComponent,
  },
];
