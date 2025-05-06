import { Component, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Component({ template: '' })
export abstract class BaseComponent implements OnDestroy {
  private destroy = new Subject<void>();
  public destroy$ = this.destroy as Observable<void>;
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
