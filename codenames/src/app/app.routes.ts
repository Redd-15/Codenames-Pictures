import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { GameComponent } from './game/game.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: '',
    component: MenuComponent,
  },
  {
    path: 'game',
    component: GameComponent,
  },
];
