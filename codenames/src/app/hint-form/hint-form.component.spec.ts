import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HintFormComponent } from './hint-form.component';

describe('HintFormComponent', () => {
  let component: HintFormComponent;
  let fixture: ComponentFixture<HintFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HintFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HintFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
