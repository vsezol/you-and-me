import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { CreateUserProps } from '@common';
import { AuthResponse, AuthService } from '@modules/auth';
import { AuthTypeNames } from '../../auth-page-routing.module';
import { AuthFormComponent } from '@modules/auth-page/components';

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
  public error: Error | null = null;

  public authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>({
    isSignUp: false,
    isSignIn: true,
    authType: AuthTypeNames.SIGN_IN,
  });

  @ViewChild(AuthFormComponent) public authForm!: AuthFormComponent;

  private destroyed$: Subject<void> = new Subject<void>();

  constructor(
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

          if (authType !== '') {
            return {
              isSignIn: authType === AuthTypeNames.SIGN_IN,
              isSignUp: authType === AuthTypeNames.SIGN_UP,
              authType,
            };
          } else {
            return this.authInfo$.getValue();
          }
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe((authInfo) => this.authInfo$.next(authInfo));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public handleSubmit(user: CreateUserProps) {
    let auth$: Observable<AuthResponse>;

    if (this.authInfo$.getValue().isSignIn) {
      auth$ = this.authService.signIn(user);
    } else {
      auth$ = this.authService.signUp(user);
    }

    auth$.subscribe(
      () => {
        this.authForm.resetForm();
        this.error = null;
        this.router.navigate(['/contacts']);
      },
      (error: Error) => {
        console.log('submit', error);
        this.error = error;
      }
    );
  }

  public handleCloseAlert(): void {
    this.error = null;
    this.removeQueryParam('errorMessage');
  }

  private removeQueryParam(paramName: string): Promise<boolean> {
    const queryParams = { ...this.route.snapshot.queryParams };
    delete queryParams[paramName];
    return this.router.navigate([], { queryParams });
  }
}
