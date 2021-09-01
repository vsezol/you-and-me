import { TestBed } from '@angular/core/testing';
import { ValidationErrorsService } from '@modules/auth-page/services/validation-errors.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('ValidationErrorsService', () => {
  let validationErrorsService: ValidationErrorsService<string>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationErrorsService],
    });

    validationErrorsService = TestBed.inject(ValidationErrorsService);
  });

  describe('extractFirstNotVoidErrorMessage', () => {
    const testCases = [
      {
        messages: ['', 'NOT_VOID_1', '', 'NOT_VOID_2'],
        expected: 'NOT_VOID_1',
        description: 'only not void messages',
      },
      {
        messages: ['', ''],
        expected: '',
        description: 'void string if all messages are void',
      },
      {
        messages: [],
        expected: '',
        description: 'void string if all messages.length is 0',
      },
    ];

    testCases.forEach((test) => {
      it(`should return ${test.description}`, () => {
        const result = validationErrorsService.extractFirstNotVoidErrorMessage(
          test.messages
        );

        expect(result).toEqual(test.expected);
      });
    });
  });

  describe('getRequiredErrorMessage', () => {
    const FAKE_CONTROL_NAME = 'FAKE_CONTROL';
    let FAKE_FORM_GROUP: FormGroup;

    function getResult() {
      return validationErrorsService.getRequiredErrorMessage(
        FAKE_FORM_GROUP,
        FAKE_CONTROL_NAME
      );
    }

    beforeEach(() => {
      FAKE_FORM_GROUP = new FormGroup({
        [FAKE_CONTROL_NAME]: new FormControl('', [Validators.required]),
      });
    });

    it('should return message control is required', () => {
      FAKE_FORM_GROUP.markAsTouched();
      const result = getResult();

      expect(result.toLowerCase()).toContain(FAKE_CONTROL_NAME.toLowerCase());
    });

    it('should return void string if control has not errors', () => {
      FAKE_FORM_GROUP.get(FAKE_CONTROL_NAME)?.setValue('not void value');
      FAKE_FORM_GROUP.markAsTouched();
      const result = getResult();

      expect(result).toBe('');
    });
  });

  describe('getMinLengthErrorMessage', () => {
    const FAKE_CONTROL_NAME = 'FAKE_CONTROL';
    const MIN_LENGTH = 5;
    let FAKE_FORM_GROUP: FormGroup;

    function getResult() {
      return validationErrorsService.getMinLengthErrorMessage(
        FAKE_FORM_GROUP,
        FAKE_CONTROL_NAME
      );
    }

    beforeEach(() => {
      FAKE_FORM_GROUP = new FormGroup({
        [FAKE_CONTROL_NAME]: new FormControl('', [
          Validators.minLength(MIN_LENGTH),
        ]),
      });
    });

    it('should return message control should have min length', () => {
      const FAKE_VALUE = '123';

      FAKE_FORM_GROUP.get(FAKE_CONTROL_NAME)?.setValue(FAKE_VALUE);
      FAKE_FORM_GROUP.markAsTouched();

      const result = getResult();

      expect(result.toLowerCase()).toContain(MIN_LENGTH.toString());
      expect(result.toLowerCase()).toContain(FAKE_VALUE.length.toString());
    });

    it('should return void string if control has not errors', () => {
      const FAKE_VALUE = new Array(MIN_LENGTH).fill('1').join('');

      FAKE_FORM_GROUP.get(FAKE_CONTROL_NAME)?.setValue(FAKE_VALUE);
      FAKE_FORM_GROUP.markAsTouched();
      const result = getResult();

      expect(result).toBe('');
    });
  });
});
