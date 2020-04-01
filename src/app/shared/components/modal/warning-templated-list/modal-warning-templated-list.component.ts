import { Component, ContentChild, ElementRef, Input, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalBaseComponent } from '../base/modal.component';
import { ModalState } from '../reducers/modal.store';


@Component({
    selector: 'app-modal-warning-templated-list',
    templateUrl: 'modal-warning-templated-list.component.html',
    styleUrls: ['modal-warning-templated-list.component.scss']
})
export class ModalWarningTmpListComponent extends ModalBaseComponent {

    @ContentChild(TemplateRef, { static: false}) template: TemplateRef<any>;
    @Input() items: any[] = [];

    public index: number;

    constructor(
        protected elementRef: ElementRef,
        protected store: Store<ModalState>) {

        super(elementRef, store);
    }
}
