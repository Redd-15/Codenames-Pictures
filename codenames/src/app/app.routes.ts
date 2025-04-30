import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { MainPageComponent } from './main-page/main-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { ChatComponent } from './chat/chat.component';

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
    component: GamePageComponent,
  }
];
