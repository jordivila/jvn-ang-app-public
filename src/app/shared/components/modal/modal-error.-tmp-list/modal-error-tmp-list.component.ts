import { Component, ContentChild, ElementRef, Input, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalBaseComponent } from '../base/modal.component';
import { ModalState } from '../reducers/modal.store';


@Component({
    selector: 'app-modal-error-templated-list',
    templateUrl: 'modal-error-tmp-list.component.html',
    styleUrls: ['modal-error-tmp-list.component.scss']
})
export class ModalErrorTmpListComponent extends ModalBaseComponent {

    @ContentChild(TemplateRef, { static: false}) template: TemplateRef<any>;
    @Input() items: any[] = [];

    public index: number;

    constructor(
        protected elementRef: ElementRef,
        protected store: Store<ModalState>) {

        super(elementRef, store);
    }
}
