import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { AuthInfo, AuthPageComponent } from '@modules/auth-page/components';
import { CreateUserProps } from '@common';
import { AuthService } from '@modules/auth';
import { AuthTypeNames } from '@modules/auth-page/auth-page-routing.module';

describe('[AuthPage] AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  let mockQueryParams: BehaviorSubject<Params>;
  let mockParams: BehaviorSubject<Params>;

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
      it('should call authService.signIn if user in SIGN_IN page');
      it('should call authService.signUp if user in SIGN_UP page');

      describe('if success request', () => {
        it('should reset form');
        it('set error to null');
        it('should call router.navigate with ["contacts"]');
      });

      describe('if error request', () => {
        it('should set error');
      });
    });

    describe('handleCloseAlert', () => {
      it('should set error to null');
      it('should call router.navigate without errorMessage query parameter');
    });
  });

  describe('template', () => {
    describe('title', () => {
      it('should show Authorization text if user in SIGN_IN page');
      it('should show Registration text if user in SIGN_UP page');
    });

    describe('auth-form', () => {
      it('should pass right inputs');
      it('should call handleSubmit($event) when submit emits');
      it('should call handleCloseAlert() when closeAlert emits');
    });

    describe('auth-switcher', () => {
      it('should pass right inputs');
    });
  });
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
}

@Component({
  selector: 'app-auth-switcher',
  template: '<div>AuthSwitcherComponentStub</div>',
})
class AuthSwitcherComponentStub {
  @Input() authInfo$!: BehaviorSubject<AuthInfo>;
}
