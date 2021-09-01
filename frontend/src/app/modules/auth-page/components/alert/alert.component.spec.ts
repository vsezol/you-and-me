import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { first } from 'rxjs/operators';

import { AlertComponent } from './alert.component';

describe('[AuthPage] AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, MatButtonModule, MatCardModule],
      declarations: [AlertComponent],
    });

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  it('should displays @Input message', () => {
    const FAKE_MESSAGE = 'FAKE_MESSAGE';

    component.message = FAKE_MESSAGE;
    const element = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    expect(element.textContent).toContain(FAKE_MESSAGE);
  });

  it('should pass @Input color to root mat-card class', () => {
    const COLOR = 'warn';
    const expectedClass = `alert_${COLOR}`;
    const element = fixture.debugElement.query(By.css('mat-card'));

    component.color = COLOR;
    fixture.detectChanges();

    expect(element.classes[expectedClass]).toBe(true);
  });

  it('should emit close when button is clicked', () => {
    const button = fixture.debugElement.query(By.css('button'));
    let isEmitted = false;
    component.close.pipe(first()).subscribe((value) => {
      isEmitted = true;
    });

    button.triggerEventHandler('click', null);

    expect(isEmitted).toBe(true);
  });
});
