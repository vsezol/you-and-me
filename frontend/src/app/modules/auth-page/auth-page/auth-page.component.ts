import { map, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService, AuthResponse } from 'src/app/modules/auth/auth.service';
import { ValidationErrorsService } from '../validation-errors.service';
import { AuthTypeNames } from '../auth-page-routing.module';
import { UserWithPassword } from '../../../common';

enum ControlNames {
  USERNAME = 'username',
  PASSWORD = 'password',
}

export interface AuthInfo {
  isSignIn: boolean;
  isSignUp: boolean;
  authType: AuthTypeNames;
}

type ErrorMessages = Record<ControlNames, string>;

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit, OnDestroy {
  @ViewChild('formElement') formElement!: ElementRef;

  isLoading = false;

  isPasswordVisible = false;

  controlNames = ControlNames;

  formGroup!: FormGroup;

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

    this.formGroup = new FormGroup({
      [ControlNames.USERNAME]: new FormControl('', Validators.required),
      [ControlNames.PASSWORD]: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
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

  public handleSubmit() {
    if (this.formGroup.valid) {
      const user: UserWithPassword = {
        username: this.formGroup.value.username,
        password: this.formGroup.value.password,
      };

      let auth$: Observable<AuthResponse>;

      if (this.authInfo$.getValue().isSignIn) {
        auth$ = this.authService.signIn(user);
      } else {
        auth$ = this.authService.signUp(user);
      }

      this.isLoading = true;

      auth$.subscribe(
        () => {
          this.formElement.nativeElement.reset();
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
  }

  public get errorMessages(): ErrorMessages {
    const required = this.validErrors.getRequiredErrorMessage.bind(
      this.validErrors,
      this.formGroup
    );

    const minLength = this.validErrors.getMinLengthErrorMessage.bind(
      this.validErrors,
      this.formGroup
    );

    const { USERNAME, PASSWORD } = ControlNames;
    return {
      [USERNAME]: required(USERNAME),
      [PASSWORD]: this.validErrors.extractNotVoidErrorMessages([
        required(PASSWORD),
        minLength(PASSWORD),
      ]),
    };
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  handleCloseAlert(): void {
    this.error = null;
  }
}
