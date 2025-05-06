import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideState, provideStore } from '@ngrx/store';
import { RoomReducer } from './state/reducer/room.reducer';
import { IdsReducer } from './state/reducer/ids.reducer';
import { ChatReducer } from './state/reducer/chat.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), provideAnimationsAsync(), provideToastr(), provideAnimations(),
    provideStore(),
    provideState({name: 'room', reducer: RoomReducer}),
    provideState({name: 'ids', reducer: IdsReducer}),
    provideState({name: 'chat', reducer: ChatReducer}),
  ]
};
