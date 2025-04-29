import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { GameComponent } from './game/game.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';

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
  }
];
