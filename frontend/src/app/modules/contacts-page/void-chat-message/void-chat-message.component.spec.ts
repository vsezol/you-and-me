import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoidChatMessageComponent } from './void-chat-message.component';

describe('VoidChatMessageComponent', () => {
  let component: VoidChatMessageComponent;
  let fixture: ComponentFixture<VoidChatMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoidChatMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoidChatMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
