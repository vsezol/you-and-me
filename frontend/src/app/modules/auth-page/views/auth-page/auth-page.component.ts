import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { ValidationErrorsService } from '../../validation-errors.service';
import { map, takeUntil } from 'rxjs/operators';
import { AuthTypeNames } from '../../auth-page-routing.module';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

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

  isPasswordVisible = false;

  controlNames = ControlNames;

  formGroup!: FormGroup;

  destroyed$: Subject<void> = new Subject<void>();

  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>({
    isSignUp: false,
    isSignIn: true,
    authType: AuthTypeNames.SIGN_IN,
  });

  constructor(
    private validErrors: ValidationErrorsService<ControlNames>,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
      this.authService
        .login({
          username: this.formGroup.value.username,
          password: this.formGroup.value.password,
        })
        .subscribe((response) => {
          this.formElement.nativeElement.reset();
        });
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
}
