import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { AuthSwitcherComponent } from './auth-switcher.component';
import { AuthTypeNames } from '@modules/auth-page/auth-page-routing.module';
import { AuthInfo } from "@modules/auth-page/components";

describe('[AuthPage] AuthSwitcherComponent', () => {
  let component: AuthSwitcherComponent;
  let fixture: ComponentFixture<AuthSwitcherComponent>;

  let mockRouter: {
    navigate: jasmine.Spy;
  };

  let AUTH_INFO_STATES: Readonly<AuthInfo>[] = [
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

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      imports: [MatButtonModule, FlexLayoutModule],
      declarations: [AuthSwitcherComponent],
      providers: [{ provide: Router, useValue: mockRouter }],
    });

    fixture = TestBed.createComponent(AuthSwitcherComponent);
    component = fixture.componentInstance;
  });

  describe(`component's class`, () => {
    describe('handleSwitchAuthType', () => {
      const testCases = AUTH_INFO_STATES.map((info) => ({
        ...info,
        endUrl: info.isSignIn ? AuthTypeNames.SIGN_UP : AuthTypeNames.SIGN_IN,
      }));

      testCases.forEach((test) => {
        it(`should call router to navigate to auth/${test.endUrl} if user in ${test.authType} page`, () => {
          component.authInfo$ = createAuthInfo$(test);
          fixture.detectChanges();

          component.handleSwitchAuthType();

          expect(mockRouter.navigate).toHaveBeenCalledWith([
            'auth',
            test.endUrl,
          ]);
        });
      });
    });
  });

  describe(`component's class and template`, () => {
    describe('helper text', () => {
      const testCases = AUTH_INFO_STATES.map((info) => ({
        ...info,
        text: info.isSignIn ? 'Not registered yet?' : 'Already Registered?',
      }));

      testCases.forEach((test) => {
        it(`should show ${test.text} for button if user in ${test.authType} page`, () => {
          component.authInfo$ = createAuthInfo$(test);
          fixture.detectChanges();

          const textContent = fixture.debugElement.nativeElement.textContent;
          expect(textContent).toContain(test.text);
        });
      });
    });

    describe('button text', () => {
      const testCases = AUTH_INFO_STATES.map((info) => ({
        ...info,
        text: info.isSignIn ? 'Sing up' : 'Sign in',
      }));

      testCases.forEach((test) => {
        it(`should show ${test.text} text in button if user in ${test.authType} page`, () => {
          component.authInfo$ = createAuthInfo$(test);
          fixture.detectChanges();

          const button = fixture.debugElement.query(By.css('button'));
          expect(button.nativeElement.textContent).toContain(test.text);
        });
      });
    });

    describe('should call handleSwitchAuthType if button is clicked', () => {
      it('should call handleSwitchAuthType if button is clicked', () => {
        const spyHandleSwitchAuthType = spyOn(
          component,
          'handleSwitchAuthType'
        ).and.stub();
        component.authInfo$ = createAuthInfo$(AUTH_INFO_STATES[0]);
        const button = fixture.debugElement.query(By.css('button'));

        button.triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(spyHandleSwitchAuthType).toHaveBeenCalled();
      });
    });
  });
});

function createAuthInfo$(info: AuthInfo): BehaviorSubject<AuthInfo> {
  return new BehaviorSubject<AuthInfo>({
    isSignIn: info.isSignIn,
    isSignUp: info.isSignUp,
    authType: info.authType,
  });
}
