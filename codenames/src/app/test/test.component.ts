import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SocketHandlerService } from '../services/socket-handler.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  private router = inject(Router);
  private socketHandlerService = inject(SocketHandlerService);
  private routerSubscription!: Subscription;
  constructor(){
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.socketHandlerService.disconnect();
      }
    });
  }

  ngOnInit(): void {
    this.socketHandlerService.connect();
    this.socketHandlerService.sendMessage('Megöl a disznófejű nagyúr.');
  }

  ngOnDestroy(): void {
    this.socketHandlerService.disconnect();
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
