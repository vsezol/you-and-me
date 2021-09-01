import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Subject } from 'rxjs';

import {
  AuthInfo,
  AuthPageComponent,
  AuthSwitcherComponent,
} from '@modules/auth-page/components';
import { CreateUserProps } from '@common';
import { AuthResponse, AuthService } from '@modules/auth';
import { AuthTypeNames } from '@modules/auth-page/auth-page-routing.module';
import { By } from '@angular/platform-browser';

describe('[AuthPage] AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  let mockQueryParams: BehaviorSubject<Params>;
  let mockParams: BehaviorSubject<Params>;

  const AUTH_STATES: AuthInfo[] = [
    {
      authType: AuthTypeNames.SIGN_UP,
      isSignIn: false,
      isSignUp: true,
    },
    {
      authType: AuthTypeNames.SIGN_IN,
      isSignIn: true,
      isSignUp: false,
    },
  ];

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj<AuthService>('AuthService', [
      'signIn',
      'signUp',
    ]);

    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);

    mockQueryParams = new BehaviorSubject<Params>({});
    mockParams = new BehaviorSubject<Params>({});
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AuthFormComponentStub,
        AuthSwitcherComponentStub,
        AuthPageComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: mockQueryParams,
            params: mockParams,
            snapshot: {
              get queryParams() {
                return mockQueryParams.getValue();
              },
            },
          },
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('class', () => {
    describe('on init', () => {
      it('should not set error if errorMessage is not in url', () => {
        expect(component.error).toBeFalsy();
      });

      it('should set error if errorMessage query param is in url', () => {
        const FAKE_ERROR_MESSAGE = 'FAKE_ERROR_MESSAGE';
        mockQueryParams.next({
          errorMessage: FAKE_ERROR_MESSAGE,
        });

        expect(component.error?.message).toBe(FAKE_ERROR_MESSAGE);
      });

      it('should set authInfo$ by default', () => {
        expect(component.authInfo$.getValue()).toEqual({
          authType: AuthTypeNames.SIGN_IN,
          isSignUp: false,
          isSignIn: true,
        });
      });

      it('should set authInfo$ by authType param in url', () => {
        const AUTH_TYPE = AuthTypeNames.SIGN_UP;

        mockParams.next({
          authType: AUTH_TYPE,
        });

        expect(component.authInfo$.getValue()).toEqual({
          isSignUp: true,
          isSignIn: false,
          authType: AUTH_TYPE,
        });
      });
    });

    describe('handleSubmit', () => {
      const FAKE_USER = {
        username: 'FAKE_USERNAME',
        password: 'FAKE_PASSWORD',
      };
      let request: Subject<AuthResponse>;

      beforeEach(() => {
        request = new Subject<AuthResponse>();
        mockAuthService.signIn.and.returnValue(request);
        mockAuthService.signUp.and.returnValue(request);
      });

      const testCases: (AuthInfo & { methodName: 'signUp' | 'signIn' })[] =
        AUTH_STATES.map((item) => {
          return {
            ...item,
            methodName: item.isSignIn ? 'signIn' : 'signUp',
          };
        });

      testCases.forEach((test) => {
        it('should call authService.signIn if user in SIGN_IN page', () => {
          setAuthInfo$(test);

          component.handleSubmit(FAKE_USER);

          expect(mockAuthService[test.methodName]).toHaveBeenCalled();
        });
      });

      describe('request', () => {
        let resetFormSpy: jasmine.Spy;

        beforeEach(() => {
          component.handleSubmit(FAKE_USER);
          resetFormSpy = jasmine.createSpy();
          fixture.debugElement.componentInstance.authForm = {
            resetForm: resetFormSpy,
          };
        });

        describe('if success', () => {
          beforeEach(() => {
            request.next({
              expiresIn: 9999,
              token: 'FAKE_TOKEN',
            });
          });

          it('should reset form', () => {
            expect(resetFormSpy).toHaveBeenCalled();
          });

          it('set error to null', () => {
            expect(component.error).toBeNull();
          });

          it('should call router.navigate with ["/contacts"]', () => {
            expect(mockRouter.navigate).toHaveBeenCalledWith(['/contacts']);
          });
        });

        describe('if error', () => {
          it('should set error', () => {
            const ERROR = new Error('FAKE_ERROR');

            request.error(ERROR);

            expect(component.error?.message).toBe(ERROR.message);
          });
        });
      });
    });

    describe('handleCloseAlert', () => {
      it('should set error to null', () => {
        component.error = new Error('FAKE_ERROR');

        fixture.detectChanges();
        component.handleCloseAlert();

        expect(component.error).toBeNull();
      });

      it('should call router.navigate without errorMessage query parameter', () => {
        const FAKE_ERROR_MESSAGE = 'FAKE_ERROR_MESSAGE';
        const NOT_DELETED_MESSAGE = 'NOT_DELETED_MESSAGE';
        mockQueryParams.next({
          errorMessage: FAKE_ERROR_MESSAGE,
          NOT_DELETED_MESSAGE,
        });
        fixture.detectChanges();

        component.handleCloseAlert();

        expect(mockRouter.navigate).toHaveBeenCalledWith(
          jasmine.anything(),
          jasmine.objectContaining({
            queryParams: {
              NOT_DELETED_MESSAGE,
            },
          })
        );
      });
    });
  });

  describe('template', () => {
    describe('title', () => {
      const testCases: (AuthInfo & { title: string })[] = AUTH_STATES.map(
        (item) => {
          return {
            ...item,
            title: item.isSignIn ? 'Authorization' : 'Registration',
          };
        }
      );

      testCases.forEach((test) => {
        it(`should show ${test.title} text if user in ${test.authType} page`, () => {
          setAuthInfo$(test);

          fixture.detectChanges();

          expect(fixture.debugElement.nativeElement.textContent).toContain(
            test.title
          );
        });
      });
    });

    describe('auth-form', () => {
      let authFormComponent: AuthFormComponentStub;

      beforeEach(() => {
        authFormComponent = fixture.debugElement.query(
          By.directive(AuthFormComponentStub)
        ).componentInstance;
      });

      it('should pass right inputs', () => {
        const FAKE_ERROR = new Error('FAKE_ERROR_MESSAGE');

        component.error = FAKE_ERROR;
        setAuthInfo$({
          authType: AuthTypeNames.SIGN_UP,
          isSignIn: false,
          isSignUp: false,
        });
        fixture.detectChanges();

        expect(authFormComponent.authInfo$).toEqual(component.authInfo$);
        expect(authFormComponent.error).toEqual(FAKE_ERROR);
      });

      it('should call handleSubmit($event) when submit emits', () => {
        const spyHandleSubmit = spyOn(component, 'handleSubmit').and.stub();
        const FAKE_EVENT: CreateUserProps = {
          password: 'FAKE_PASSWORD',
          username: 'FAKE_USERNAME',
        };

        authFormComponent.submit.emit(FAKE_EVENT);

        expect(spyHandleSubmit).toHaveBeenCalledWith(FAKE_EVENT);
      });

      it('should call handleCloseAlert() when closeAlert emits', () => {
        const spyHandleCloseAlert = spyOn(
          component,
          'handleCloseAlert'
        ).and.stub();

        authFormComponent.closeAlert.emit();

        expect(spyHandleCloseAlert).toHaveBeenCalled();
      });
    });

    describe('auth-switcher', () => {
      it('should pass right inputs', () => {
        const authSwitcherComponent = fixture.debugElement.query(
          By.directive(AuthSwitcherComponentStub)
        ).componentInstance;

        setAuthInfo$({
          authType: AuthTypeNames.SIGN_UP,
          isSignIn: false,
          isSignUp: false,
        });
        fixture.detectChanges();

        expect(authSwitcherComponent.authInfo$).toEqual(component.authInfo$);
      });
    });
  });

  function setAuthInfo$(info: AuthInfo) {
    component.authInfo$.next({
      isSignUp: info.isSignUp,
      isSignIn: info.isSignIn,
      authType: info.authType,
    });
  }
});

@Component({
  selector: 'app-auth-form',
  template: '<div>AuthFormComponentStub</div>',
})
class AuthFormComponentStub {
  @Input() error: Error | null = null;
  @Input() isLoading = false;
  @Input() authInfo$!: BehaviorSubject<AuthInfo>;

  @Output() submit = new EventEmitter<CreateUserProps>();
  @Output() closeAlert = new EventEmitter<void>();

  public resetForm(): void {}
}

@Component({
  selector: 'app-auth-switcher',
  template: '<div>AuthSwitcherComponentStub</div>',
})
class AuthSwitcherComponentStub {
  @Input() authInfo$!: BehaviorSubject<AuthInfo>;
}
