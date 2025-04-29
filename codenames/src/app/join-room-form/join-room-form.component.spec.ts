import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinRoomFormComponent } from './join-room-form.component';

describe('JoinRoomFormComponent', () => {
  let component: JoinRoomFormComponent;
  let fixture: ComponentFixture<JoinRoomFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinRoomFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinRoomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
