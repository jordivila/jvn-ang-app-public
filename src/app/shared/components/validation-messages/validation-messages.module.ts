import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

import { ValidationMessagesComponent } from './validation-messages.component';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, MatInputModule],
    declarations: [
        ValidationMessagesComponent
    ],
    exports: [
        ValidationMessagesComponent
    ]
})
export class ValidationMessagesModule {

}
