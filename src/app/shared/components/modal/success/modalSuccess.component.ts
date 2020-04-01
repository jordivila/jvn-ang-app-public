import { Component, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalBaseComponent } from '../base/modal.component';
import { ModalState } from '../reducers/modal.store';

@Component({
    selector: 'app-modal-success',
    templateUrl: 'modalSuccess.component.html',
    styleUrls: ['modalSuccess.component.scss']
})
export class ModalSuccessComponent extends ModalBaseComponent {
    constructor(
        protected elementRef: ElementRef,
        protected store: Store<ModalState>) {

        super(elementRef, store);
    }
}
