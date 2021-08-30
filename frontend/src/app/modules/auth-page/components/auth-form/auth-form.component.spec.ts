import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatProgressSpinnerModule,
  MatSpinner,
} from '@angular/material/progress-spinner';
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
  let mockValidationErrorsService: jasmine.SpyObj<
    ValidationErrorsService<ControlNames>
  >;

  beforeEach(async () => {
    mockValidationErrorsService = jasmine.createSpyObj(
      'ValidationErrorsService',
      [
        'extractFirstNotVoidErrorMessage',
        'getRequiredErrorMessage',
        'getMinLengthErrorMessage',
      ]
    );

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
      providers: [
        {
          provide: ValidationErrorsService,
          useValue: mockValidationErrorsService,
        },
      ],
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
    describe('errorMessages', () => {
      beforeEach(() => {
        mockValidationErrorsService.extractFirstNotVoidErrorMessage.and.callFake(
          (messages) => {
            return messages[0];
          }
        );
      });

      it('return errorMessages for each control name if ValidationErrorsService return erros', () => {
        const FAKE_ERROR_REQUIRED = 'FAKE_ERROR_REQUIRED';
        mockValidationErrorsService.getRequiredErrorMessage.and.returnValue(
          FAKE_ERROR_REQUIRED
        );

        expect(component.errorMessages).toEqual({
          [ControlNames.USERNAME]: FAKE_ERROR_REQUIRED,
          [ControlNames.PASSWORD]: FAKE_ERROR_REQUIRED,
        });
      });

      it('return void strings for each control if ValidationErrorsService returns void strings', () => {
        mockValidationErrorsService.getRequiredErrorMessage.and.returnValue('');

        expect(component.errorMessages).toEqual({
          [ControlNames.USERNAME]: '',
          [ControlNames.PASSWORD]: '',
        });
      });
    });

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

    describe('form', () => {
      describe('password visibility', () => {
        let input: DebugElement;
        let button: DebugElement;
        let icon: DebugElement;

        beforeEach(() => {
          const fields = fixture.debugElement.queryAll(
            By.css('mat-form-field ')
          );

          const passwordField = fields.find((de) => {
            return !!de.query(By.css('[formControlName=password]'));
          }) as DebugElement;

          input = passwordField.query(By.css('input'));
          button = passwordField.query(By.css('button'));
          icon = button.query(By.css('mat-icon'));
        });

        it('pass type password if button icon is visibility_off', () => {
          expect(input.attributes.type).toBe('password');
          expect(icon.nativeElement.textContent.trim()).toBe('visibility_off');
        });

        it('pass type text if button icon is visibility', () => {
          button.triggerEventHandler('click', null);
          fixture.detectChanges();

          expect(input.attributes.type).toBe('text');
          expect(icon.nativeElement.textContent.trim()).toBe('visibility');
        });
      });

      describe('submit button', () => {
        let buttonDe: DebugElement;

        beforeEach(() => {
          buttonDe = fixture.debugElement.query(By.css('[type="submit"]'));
        });

        describe('disabled attr', () => {
          it('should be disabled if form is invalid', () => {
            expect(buttonDe.attributes.disabled).toBe(true.toString());
          });

          it('should be enabled if form is valid and no loading', () => {
            makeFormValid();
            fixture.detectChanges();

            expect(buttonDe.attributes.disabled ?? 'false').toBe(
              false.toString()
            );
          });

          it('should be disabled if loading', () => {
            makeFormValid();
            setIsLoading(true);
            fixture.detectChanges();

            expect(buttonDe.attributes.disabled).toBe(true.toString());
          });

          function makeFormValid(): void {
            component.formGroup
              .get(ControlNames.USERNAME)
              ?.setValue('FAKE_USERNAME');
            component.formGroup
              .get(ControlNames.PASSWORD)
              ?.setValue('FAKE_PASSWORD');
          }
        });

        describe('spinner', () => {
          const testCases = [
            {
              loading: true,
              isExists: true,
              text: 'should be display if loading',
            },
            {
              loading: false,
              isExists: false,
              text: 'should not be display if no loading',
            },
          ];

          testCases.forEach((test) => {
            it('should be display if loading', () => {
              setIsLoading(test.loading);
              fixture.detectChanges();

              expect(!!getSpinnerDe()).toBe(test.isExists);
            });
          });

          function getSpinnerDe() {
            return buttonDe.query(By.directive(MatSpinner));
          }
        });

        describe('text', () => {
          const AUTH_INFO_STATES: Readonly<AuthInfo>[] = [
            {
              isSignIn: false,
              isSignUp: true,
              authType: AuthTypeNames.SIGN_UP,
            },
            {
              isSignIn: true,
              isSignUp: false,
              authType: AuthTypeNames.SIGN_IN,
            },
          ];

          const testCases = AUTH_INFO_STATES.map((state) => {
            return {
              ...state,
              text: state.isSignIn ? 'Sign in' : 'Sign up',
            };
          });

          testCases.forEach((test) => {
            it(`should display ${test.text} text if user in ${test.authType} page`, () => {
              component.authInfo$ = new BehaviorSubject<AuthInfo>({
                isSignIn: test.isSignIn,
                isSignUp: test.isSignUp,
                authType: test.authType,
              });

              fixture.detectChanges();

              expect(
                buttonDe.nativeElement.textContent.trim().toLowerCase()
              ).toContain(test.text.toLowerCase());
            });
          });
        });

        function setIsLoading(value: boolean): void {
          component.isLoading = value;
        }
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
