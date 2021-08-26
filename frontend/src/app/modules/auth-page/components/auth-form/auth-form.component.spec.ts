import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';

import { AuthFormComponent, ControlNames } from './auth-form.component';
import { ValidationErrorsService } from '@modules/auth-page/services/validation-errors.service';
import { AuthTypeNames } from '@modules/auth-page/auth-page-routing.module';
import { AuthInfo } from '@modules/auth-page/auth-page/auth-page.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: '<div>AlertComponentStub</div>',
})
class AlertComponentStub {
  @Input() message!: string;
  @Input() color = 'primary';

  @Output() close: EventEmitter<void> = new EventEmitter<void>();
}

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      declarations: [AuthFormComponent, AlertComponentStub],
      providers: [ValidationErrorsService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;

    setInputsToComponent({
      error: null,
      isLoading: false,
      authInfo$: new BehaviorSubject<AuthInfo>({
        isSignUp: false,
        isSignIn: true,
        authType: AuthTypeNames.SIGN_IN,
      }),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('class', () => {
    describe('handleCloseAlert', () => {
      it('should call closeAlert.emit()', () => {
        let isEmitted = false;
        component.closeAlert.pipe(first()).subscribe(() => {
          isEmitted = true;
        });

        component.handleCloseAlert();

        expect(isEmitted).toBe(true);
      });

      describe('resetForm', () => {
        it('should reset form', () => {
          const formElement = fixture.debugElement.query(
            By.css('form')
          ).nativeElement;
          const resetSpy = spyOn(formElement, 'reset').and.stub();

          component.resetForm();

          expect(resetSpy).toHaveBeenCalled();
        });
      });

      describe('handleSubmit', () => {
        let isEmitted: boolean;

        beforeEach(() => {
          isEmitted = false;
          component.submit.pipe(first()).subscribe(() => {
            isEmitted = true;
          });
        });

        it('should call submit.emit() if form is valid', () => {
          component.formGroup
            .get(ControlNames.USERNAME)
            ?.setValue('FAKE_USERNAME');
          component.formGroup
            .get(ControlNames.PASSWORD)
            ?.setValue('FAKE_PASSWORD');
          component.handleSubmit();

          expect(isEmitted).toBe(true);
        });

        it('should not call submit.emit() if form is not valid', () => {
          component.handleSubmit();

          expect(isEmitted).toBe(false);
        });
      });
    });
  });

  describe('template', () => {
    describe('app-alert', () => {
      describe('if error', () => {
        const FAKE_ERROR_MESSAGE = 'FAKE_ERROR_MESSAGE';

        beforeEach(() => {
          component.error = new Error(FAKE_ERROR_MESSAGE);
          fixture.detectChanges();
        });

        it('should show alert with error message if error is not null', () => {
          const alertElement = fixture.debugElement.query(
            By.directive(AlertComponentStub)
          );
          expect(alertElement).toBeTruthy();
        });

        it('should call handleCloseAlert() if alert emitted close', () => {
          const spyHandleCloseAlert = spyOn(
            component,
            'handleCloseAlert'
          ).and.stub();

          const alertElement = fixture.debugElement.query(
            By.directive(AlertComponentStub)
          );
          alertElement.componentInstance.close.emit();

          expect(spyHandleCloseAlert).toHaveBeenCalled();
        });
      });

      describe('if not error', () => {
        it('should not show alert if error is null', () => {
          component.error = null;
          fixture.detectChanges();

          const alertElement = fixture.debugElement.query(
            By.directive(AlertComponentStub)
          );
          expect(alertElement).toBeFalsy();
        });
      });
    });
  });

  function setInputsToComponent({
    error,
    isLoading,
    authInfo$,
  }: {
    error: Error | null;
    isLoading: boolean;
    authInfo$: BehaviorSubject<AuthInfo>;
  }) {
    component.error = error;
    component.isLoading = isLoading;
    component.authInfo$ = authInfo$;
  }
});
