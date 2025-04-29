import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { GameComponent } from './game/game.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { RoomMenuComponent } from './room-menu/room-menu.component';

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
  {
    path: 'room',
    component: RoomMenuComponent,
  }
];
