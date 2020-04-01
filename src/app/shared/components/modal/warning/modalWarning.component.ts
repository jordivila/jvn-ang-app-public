import { Component, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalBaseComponent } from '../base/modal.component';
import { ModalState } from '../reducers/modal.store';

@Component({
    selector: 'app-modal-warning',
    templateUrl: 'modalWarning.component.html',
    styleUrls: ['modalWarning.component.scss']
})
export class ModalWarningComponent extends ModalBaseComponent {
    constructor(
        protected elementRef: ElementRef,
        protected store: Store<ModalState>) {

        super(elementRef, store);
    }
}
