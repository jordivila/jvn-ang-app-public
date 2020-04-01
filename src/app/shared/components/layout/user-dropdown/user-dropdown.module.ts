import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserDropDownComponent } from './user-dropdown.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule
    ],
    declarations: [
        UserDropDownComponent
    ],
    exports: [
        UserDropDownComponent
    ]
})
export class UserDropDownListModule {

}
