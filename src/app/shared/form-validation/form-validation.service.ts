import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { RegexService } from '../regex/regex.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class FormValidationService extends Validators {

  constructor(private regex: RegexService, private translate: TranslateService) {
    super();
  }

  userName(): ValidatorFn {
    return (control) => {
      const composedValidator = Validators.compose([
        Validators.required,
        Validators.pattern(this.regex.name),
      ]);

      return composedValidator(control);
    };
  }

  email(): ValidatorFn {
    return (control) => {
      const composedValidator = Validators.compose([
        Validators.required,
        Validators.pattern(this.regex.email),
      ]);

      return composedValidator(control);
    };
  }

  password(): ValidatorFn {
    return (control) => {
      const composedValidator = Validators.compose([
        Validators.required,
        Validators.pattern(this.regex.password),
        this.emojiFree(),
      ]);

      return composedValidator(control);
    };
  }

  getValidationErrorMessage(key: string): string {
    const errorMessage = this.translate.instant(`VALIDATION_ERRORS.${key.toUpperCase()}`);

    if (errorMessage.includes('VALIDATION_ERRORS')) {
      return this.translate.instant(`VALIDATION_ERRORS.UNKNOWN`);
    } else {
      return errorMessage;
    }
  }

  private emojiFree(): ValidatorFn {
    return ({ value }) => {
      if (this.isEmptyValue(value)) {
        return null;
      }

      const emoji = value.match(this.regex.emoji);
      return emoji ? { emoji } : null;
    };
  }

  private isEmptyValue(value: any): boolean {
    return value == null || value.length === 0;
  }

}
