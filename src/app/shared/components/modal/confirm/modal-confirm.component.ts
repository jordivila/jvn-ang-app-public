import { Component, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalBaseComponent } from '../base/modal.component';
import { ModalState } from '../reducers/modal.store';

@Component({
    selector: 'app-modal-confirm',
    templateUrl: 'modal-confirm.component.html',
    styleUrls: ['modal-confirm.component.scss']
})
export class ModalConfirmComponent extends ModalBaseComponent {

    constructor(
        protected elementRef: ElementRef,
        protected store: Store<ModalState>) {
        super(elementRef, store);
    }
}
