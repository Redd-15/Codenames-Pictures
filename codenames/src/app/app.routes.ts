import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { GameComponent } from './game/game.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'game',
    component: GameComponent,
  },
];
