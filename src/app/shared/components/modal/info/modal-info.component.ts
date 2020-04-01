import { Component, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalBaseComponent } from '../base/modal.component';
import { ModalState } from '../reducers/modal.store';


@Component({
    selector: 'app-modal-info',
    templateUrl: 'modal-info.component.html',
    styleUrls: ['modal-info.component.scss']
})
export class ModalInfoComponent extends ModalBaseComponent {

    constructor(
        protected elementRef: ElementRef,
        protected store: Store<ModalState>) {

        super(elementRef, store);
    }
}
