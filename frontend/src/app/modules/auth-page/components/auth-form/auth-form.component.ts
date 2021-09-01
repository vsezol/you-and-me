import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateUserProps } from '@common';
import { BehaviorSubject } from 'rxjs';

import { ValidationErrorsService } from '@modules/auth-page/services/validation-errors.service';
import { AuthInfo } from '@modules/auth-page/components/auth-page/auth-page.component';

export enum ControlNames {
  USERNAME = 'username',
  PASSWORD = 'password',
}

type ErrorMessages = Record<ControlNames, string>;

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  @ViewChild('formElement') private formElement!: ElementRef;

  @Input() error: Error | null = null;
  @Input() isLoading = false;
  @Input() authInfo$!: BehaviorSubject<AuthInfo>;

  @Output() submit = new EventEmitter<CreateUserProps>();
  @Output() closeAlert = new EventEmitter<void>();

  public isPasswordVisible = false;

  public formGroup!: FormGroup;

  public controlNames = ControlNames;

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
      [PASSWORD]: this.validErrors.extractFirstNotVoidErrorMessage([
        required(PASSWORD),
        minLength(PASSWORD),
      ]),
    };
  }

  constructor(private validErrors: ValidationErrorsService<ControlNames>) {
    this.formGroup = new FormGroup({
      [ControlNames.USERNAME]: new FormControl('', Validators.required),
      [ControlNames.PASSWORD]: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  public handleSubmit(): void {
    if (this.formGroup.valid) {
      const user: CreateUserProps = {
        username: this.formGroup.value.username,
        password: this.formGroup.value.password,
      };

      this.submit.emit(user);
    }
  }

  public handleCloseAlert(): void {
    this.closeAlert.emit();
  }

  public resetForm(): void {
    this.formElement.nativeElement.reset();
  }
}
