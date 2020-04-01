import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { throwIfAlreadyLoaded } from '../../../shared/helpers/module-import-helper';
import { NotificationService } from './notification.service';

@NgModule({
    imports: [
        CommonModule,
        MatSnackBarModule
    ],
    exports: [

    ],
    declarations: [

    ],
    providers: [
        NotificationService,
    ],
})
export class NotificationModule {
    constructor( @Optional() @SkipSelf() parentModule: NotificationModule) {
        throwIfAlreadyLoaded(parentModule, 'NotificationModule');
    }
}
