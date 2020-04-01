import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, ProgressbarModule } from 'ngx-bootstrap';
import { ModalConfirmComponent } from './confirm/modal-confirm.component';
import { ModalErrorComponent } from './error/modal-error..component';
import { ModalHelperComponent } from './helper/modal-helper.component';
import { ModalInfoComponent } from './info/modal-info.component';
import { ModalErrorTmpListComponent } from './modal-error.-tmp-list/modal-error-tmp-list.component';
import { ModalSlideMenuComponent } from './slide-menu/slide-menu.component';
import { ModalSuccessComponent } from './success/modalSuccess.component';
import { ModalTimeoutComponent } from './timeout/modalTimeout.component';
import { ModalTimeoutSecondsToDateTimePipe } from './timeout/modalTimeout.pipe';
import { ModalWarningTmpListComponent } from './warning-templated-list/modal-warning-templated-list.component';
import { ModalWarningComponent } from './warning/modalWarning.component';
import { modalReducer } from './reducers/modal.reducers';
import { StoreModule } from '@ngrx/store';
import { modalFeatureKey } from './reducers/modal.selectors';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ModalModule.forRoot(),
        ProgressbarModule.forRoot(),
        StoreModule.forFeature(modalFeatureKey, modalReducer)
    ],
    declarations: [
        ModalHelperComponent,
        ModalConfirmComponent,
        ModalSuccessComponent,
        ModalWarningComponent,
        ModalWarningTmpListComponent,
        ModalErrorTmpListComponent,
        ModalInfoComponent,
        ModalErrorComponent,
        ModalTimeoutComponent,
        ModalTimeoutSecondsToDateTimePipe,
        ModalSlideMenuComponent
    ],
    exports: [
        ModalHelperComponent,
        ModalConfirmComponent,
        ModalSuccessComponent,
        ModalWarningComponent,
        ModalWarningTmpListComponent,
        ModalErrorTmpListComponent,
        ModalInfoComponent,
        ModalErrorComponent,
        ModalTimeoutComponent,
        ModalModule,
        ProgressbarModule,
        ModalSlideMenuComponent
    ],
})
export class ModalWrapperModule {

}
