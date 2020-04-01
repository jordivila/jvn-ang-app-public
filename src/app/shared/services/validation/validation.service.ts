import { AbstractControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { UnitSystemDto, UnitSystemPrefix } from '../../../core/api/units/units-api.dto';

export class CustomValidators {
    static getValidatorErrorMessage(
        validatorName: string,
        validatorLabel: string,
        validatorValue?: any,
        extra?: any): string {
        const config: any = {
            required: `${validatorLabel} is required`,
            invalidEmailAddress: `Invalid email address`,
            minlength: `${validatorLabel} minimum length is ${validatorValue.requiredLength}`,
            maxlength: `${validatorLabel} maximum length is ${validatorValue.requiredLength}`,
            invalidNumber: `${validatorLabel} must be a number`,
            min: `${validatorLabel} must be bigger than ${validatorValue.min}`,
            max: `${validatorLabel} must be smaller than ${validatorValue.max}`,
            unitSystemMin: `${validatorLabel} ${validatorValue.customMessage}`,
            unitSystemMax: `${validatorLabel} ${validatorValue.customMessage}`,
        };

        return config[validatorName];
    }

    static emailValidator(control: AbstractControl) {
        // tslint:disable-next-line
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const result = re.test(control.value);
        if (result) {
            return null;
        } else {
            return { invalidEmailAddress: true };
        }
    }
    static requiredWithTrim(control: AbstractControl) {
        if ((control.value ? false : true) || (control.value as string).trim() === '') {
            return { required: true };
        } else {
            return null;
        }
    }
    static numberValidator(control: AbstractControl) {
        const numericRegex = /^-?[\d.]+(?:e-?\d+)?$/;
        const result = numericRegex.test(control.value);
        if (result) {
            return null;
        } else {
            return { invalidNumber: true };
        }
    }
    static unitSystemMin(num: number, customMessage: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return Validators.min(num)(control) ? { unitSystemMin: { customMessage } } : null;
        };
    }
    static unitSystemMax(num: number, customMessage: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return Validators.max(num)(control) ? { unitSystemMax: { customMessage } } : null;
        };
    }
}
