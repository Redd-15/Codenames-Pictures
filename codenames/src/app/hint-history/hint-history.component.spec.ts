import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HintHistoryComponent } from './hint-history.component';

describe('HintHistoryComponent', () => {
  let component: HintHistoryComponent;
  let fixture: ComponentFixture<HintHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HintHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HintHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
