import { Injector } from '@angular/core';
import { CustomValidators } from './validation.service';
import { ConfigService } from '../../../core/services/config/config.service';
import { AbstractControl } from '@angular/forms';

describe('CustomValidators', () => {
    let customValidators: CustomValidators;

    beforeEach(() => {

        const injector = Injector.create({
            providers: [
                { provide: CustomValidators, useClass: CustomValidators, deps: [] },
                { provide: ConfigService, useValue: {} }
            ] as any[]
        });
        customValidators = injector.get(CustomValidators);
    });

    it('created instance is ok', () => {
        expect(customValidators).toEqual(jasmine.any(CustomValidators));
    });

    describe('When validating an email input', () => {

        it('should return null when is valid', () => {
            const sut = CustomValidators.emailValidator({
                value: 'valid.email@gmail.com'
            } as AbstractControl);

            expect(sut).toBeNull();
        });

        it('should return proper error object null when is NOT valid', () => {
            const sut = CustomValidators.emailValidator({
                value: 'invalid.email_gmail.com'
            } as AbstractControl);

            expect(sut).toEqual({ invalidEmailAddress: true });
        });

    });
});
