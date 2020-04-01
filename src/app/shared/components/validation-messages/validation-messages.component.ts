import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CustomValidators } from '../../services/validation/validation.service';

@Component({
    selector: 'app-control-messages',
    template: `<div class="control-label" *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ValidationMessagesComponent {

    @Input() control: FormControl;
    @Input() controlLabel: string;
    @Input() extra: any;

    get errorMessage() {
        for (const propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                return CustomValidators.getValidatorErrorMessage(
                    propertyName,
                    this.controlLabel,
                    this.control.errors[propertyName],
                    this.extra);
            }
        }
        return null;
    }
}
