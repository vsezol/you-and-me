import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class ValidationErrorsService<T extends string> {
  constructor() {}

  public extractFirstNotVoidErrorMessage(messages: string[]): string{
    return messages.filter((item) => !!item)[0] ?? '';
  }

  public getRequiredErrorMessage(formGroup: FormGroup, controlName: T): string {
    if (formGroup.get(controlName)?.errors?.required) {
      return `${
        controlName.charAt(0).toUpperCase() + controlName.slice(1)
      } is required`;
    } else {
      return '';
    }
  }

  public getMinLengthErrorMessage(
    formGroup: FormGroup,
    controlName: T
  ): string {
    const error = formGroup.get(controlName)?.errors?.minlength;

    if (!!error) {
      return `The min length must be ${error?.requiredLength} but actual length is ${error?.actualLength}`;
    } else {
      return '';
    }
  }
}
