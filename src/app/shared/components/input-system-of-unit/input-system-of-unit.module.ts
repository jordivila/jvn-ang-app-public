import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { InputSystemOfUnitComponent } from './input-system-of-unit/input-system-of-unit.component';
import { InputSystemOfUnitFormFieldComponent } from './input-system-of-unit-form-field/input-system-of-unit-form-field.component';
import { ValidationMessagesModule } from '../validation-messages/validation-messages.module';

@NgModule({
    declarations: [
      InputSystemOfUnitComponent, 
      InputSystemOfUnitFormFieldComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
        ValidationMessagesModule
    ],
    exports: [
      InputSystemOfUnitComponent,
      InputSystemOfUnitFormFieldComponent
    ]
})
export class InputSystemOfUnitModule { }
