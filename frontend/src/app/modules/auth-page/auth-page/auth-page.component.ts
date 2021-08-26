import { map, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CreateUserProps } from '@common';
import { AuthResponse, AuthService } from '@modules/auth';
import { ValidationErrorsService } from '../services/validation-errors.service';
import { AuthTypeNames } from '../auth-page-routing.module';
import {
  AuthFormComponent,
  ControlNames,
} from '@modules/auth-page/components/auth-form/auth-form.component';

export interface AuthInfo {
  isSignIn: boolean;
  isSignUp: boolean;
  authType: AuthTypeNames;
}

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit, OnDestroy {
  @ViewChild(AuthFormComponent) authForm!: AuthFormComponent;

  isLoading = false;

  destroyed$: Subject<void> = new Subject<void>();

  error: Error | null = null;

  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>({
    isSignUp: false,
    isSignIn: true,
    authType: AuthTypeNames.SIGN_IN,
  });

  constructor(
    private validErrors: ValidationErrorsService<ControlNames>,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroyed$))
      .subscribe((queryParams) => {
        if (!!queryParams?.errorMessage) {
          this.error = new Error(queryParams.errorMessage);
        }
      });

    this.route.params
      .pipe(
        map((params) => {
          const authType = params?.authType ?? '';

          return {
            isSignIn: authType === AuthTypeNames.SIGN_IN,
            isSignUp: authType === AuthTypeNames.SIGN_UP,
            authType,
          };
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe((authInfo) => this.authInfo$.next(authInfo));
  }

  public handleSubmit(user: CreateUserProps) {
    let auth$: Observable<AuthResponse>;

    if (this.authInfo$.getValue().isSignIn) {
      auth$ = this.authService.signIn(user);
    } else {
      auth$ = this.authService.signUp(user);
    }

    this.isLoading = true;

    auth$.subscribe(
      () => {
        this.authForm.resetForm();
        this.error = null;
        this.isLoading = false;
        this.router.navigate(['/contacts']);
      },
      (error: Error) => {
        console.log('submit', error);
        this.error = error;
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  handleCloseAlert(): void {
    this.error = null;
    this.removeQueryParam('errorMessage');
  }

  private removeQueryParam(paramName: string): Promise<boolean> {
    const queryParams = { ...this.route.snapshot.queryParams };
    delete queryParams[paramName];
    return this.router.navigate([], { queryParams });
  }
}
