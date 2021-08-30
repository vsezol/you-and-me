import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  AuthFormComponent,
  AuthPageComponent,
  AuthSwitcherComponent,
} from '@modules/auth-page/components';

describe('[AuthPage] AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AuthFormComponent,
        AuthSwitcherComponent,
        AuthPageComponent,
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
      it('should set error if errorMessage query param is in url');
      it('should set authInfo$ by authType param in url');
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
