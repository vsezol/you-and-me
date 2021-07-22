import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { ValidationErrorsService } from '../../validation-errors.service';

enum ControlNames {
  USERNAME = 'username',
  PASSWORD = 'password',
}

type ErrorMessages = Record<ControlNames, string>;

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
  @ViewChild('formElement') formElement!: ElementRef;

  isPasswordVisible = false;

  controlNames = ControlNames;

  formGroup!: FormGroup;

  constructor(
    private validErrors: ValidationErrorsService<ControlNames>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [ControlNames.USERNAME]: new FormControl('', Validators.required),
      [ControlNames.PASSWORD]: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  public handleSubmit() {
    if (this.formGroup.valid) {
      this.authService
        .login({
          username: this.formGroup.value.username,
          password: this.formGroup.value.password,
        })
        .subscribe(
          (response) => {
            this.formElement.nativeElement.reset();
          },
          (err) => {}
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
}
