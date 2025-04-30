import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageFormComponent } from './chat-message-form.component';

describe('ChatMessageFormComponent', () => {
  let component: ChatMessageFormComponent;
  let fixture: ComponentFixture<ChatMessageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatMessageFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatMessageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
