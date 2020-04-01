import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalWrapperModule } from '../modal/modal.module';
import { SessionTimerComponent } from './session-timer.component';


@NgModule({
    imports: [
        CommonModule, ModalWrapperModule
    ],
    declarations: [
        SessionTimerComponent
    ],
    exports: [
        SessionTimerComponent
    ]
})
export class SessionTimerModule { }
