import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';

import { AuthSwitcherComponent } from './auth-switcher.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthTypeNames } from '@modules/auth-page/auth-page-routing.module';

import { Router } from '@angular/router';
import { AuthInfo } from '@modules/auth-page/auth-page/auth-page.component';
import { BehaviorSubject } from 'rxjs';

describe('AuthSwitcherComponent', () => {
  let component: AuthSwitcherComponent;
  let fixture: ComponentFixture<AuthSwitcherComponent>;

  let mockRouter: {
    navigate: jasmine.Spy;
  };

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
      const testCases = [
        {
          isSignIn: false,
          authType: AuthTypeNames.SIGN_UP,
          endUrl: AuthTypeNames.SIGN_IN,
        },
        {
          isSignIn: true,
          authType: AuthTypeNames.SIGN_IN,
          endUrl: AuthTypeNames.SIGN_UP,
        },
      ];

      testCases.forEach((test) => {
        it(`should call router to navigate to auth/${test.endUrl} if user ${
          test.isSignIn ? 'in sign up' : 'in sign in page'
        }`, () => {
          component.authInfo$ = new BehaviorSubject<AuthInfo>({
            isSignIn: test.isSignIn,
            isSignUp: !test.isSignIn,
            authType: test.authType,
          });

          fixture.detectChanges();

          component.handleSwitchAuthType();

          expect(mockRouter.navigate).toHaveBeenCalledWith(['auth', test.endUrl]);
        });
      });
    });
  });

  describe(`component's class and template`, () => {
  });
});
