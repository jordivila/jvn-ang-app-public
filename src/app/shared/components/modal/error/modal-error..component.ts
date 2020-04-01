import { Component, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalBaseComponent } from '../base/modal.component';
import { ModalState } from '../reducers/modal.store';

@Component({
    selector: 'app-modal-error',
    templateUrl: 'modal-error.component.html',
    styleUrls: ['modal-error.component.scss']
})
export class ModalErrorComponent extends ModalBaseComponent {

    constructor(
        protected elementRef: ElementRef,
        protected store: Store<ModalState>) {

        super(elementRef, store);
    }
}
