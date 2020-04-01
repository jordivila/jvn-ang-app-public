import { Component, ElementRef, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalBaseComponent } from '../base/modal.component';
import { ModalState } from '../reducers/modal.store';


@Component({
    selector: 'app-modal-slide-menu',
    templateUrl: 'slide-menu.component.html',
    styleUrls: ['slide-menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ModalSlideMenuComponent extends ModalBaseComponent {

    @Input() slideMenuTemplate: TemplateRef<any>;
    @Input() slideMenuFooterTemplate: TemplateRef<any>;

    public index: number;

    constructor(
        protected elementRef: ElementRef,
        protected store: Store<ModalState>) {

        super(elementRef, store);
    }
}
