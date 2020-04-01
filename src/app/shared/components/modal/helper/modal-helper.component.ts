// tslint:disable-next-line:max-line-length // organize imports can't break this line ( at the time of writing )
import { ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ModalBaseComponent } from '../base/modal.component';
import { ModalConfirmComponent } from '../confirm/modal-confirm.component';
import { ModalErrorComponent } from '../error/modal-error..component';
import { ModalInfoComponent } from '../info/modal-info.component';
import { ModalState } from '../reducers/modal.store';
import { ModalSuccessComponent } from '../success/modalSuccess.component';
import { ModalTimeoutComponent } from '../timeout/modalTimeout.component';
import { ModalTimeOutModel } from '../timeout/modalTimeout.model';
import { ModalWarningComponent } from '../warning/modalWarning.component';
import { ModalInputParams } from './modal-input-params';

@Component({
    selector: 'app-modal-helper',
    template: `<div #modalHelper></div>`,
    styleUrls: ['./modal-helper.component.scss'],
    encapsulation: ViewEncapsulation.None,
    entryComponents: [
        ModalSuccessComponent,
        ModalErrorComponent,
        ModalInfoComponent,
        ModalWarningComponent,
        ModalConfirmComponent,
        ModalTimeoutComponent
    ],
})
export class ModalHelperComponent {

    @ViewChild('modalHelper', { read: ViewContainerRef, static: false }) public container: ViewContainerRef;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    success(message: string) {
        return this.modalCreate(ModalSuccessComponent, new ModalInputParams('Success', message));
    }

    error(message: string) {
        return this.modalCreate(ModalErrorComponent, new ModalInputParams('Error', message));
    }

    warning(message: string) {
        return this.modalCreate(ModalWarningComponent, new ModalInputParams('Warning', message));
    }

    info(message: string) {
        return this.modalCreate(ModalInfoComponent, new ModalInputParams('Info', message));
    }

    confirm(message: string, onHideCalbback: (result: boolean) => void) {
        return this.modalCreate(ModalConfirmComponent, new ModalInputParams('Confirm', message), onHideCalbback);
    }

    timeout(
        title: string,
        message: string,
        maxSeconds: number,
        startSeconds: number,
        onHideCalbback: (result: boolean) => void) {

        const modalInstance = this.modalCreate<ModalTimeoutComponent>(
            ModalTimeoutComponent,
            new ModalInputParams(title, message),
            onHideCalbback);

        modalInstance.model = new ModalTimeOutModel(maxSeconds, startSeconds, 'warning');

        return modalInstance;
    }

    private modalCreate<T extends ModalBaseComponent>(
        type: new(
                elementRef: ElementRef,
                store: Store<ModalState>,
                changeDetectorRef: ChangeDetectorRef
            ) => T,
        model: ModalInputParams,
        onHideCalbback?: (result: boolean) => void): T {

        const factory = this.componentFactoryResolver.resolveComponentFactory(type);
        let componentRef = this.container.createComponent(factory);
        const instance = componentRef.instance as T;
        let instanceOnCloseSubscription: Subscription;
        let instanceOnViewInitSubscription: Subscription;
        instance.title = model.title;
        instance.body = model.message;
        instanceOnCloseSubscription = instance.closeEvent.subscribe((result: boolean) => {
            componentRef.destroy();
            componentRef = null;
            instanceOnCloseSubscription.unsubscribe();
            instanceOnViewInitSubscription.unsubscribe();
            if (onHideCalbback) {
                onHideCalbback(result);
            }
        });
        instanceOnViewInitSubscription = instance.viewInitDoneEvent.subscribe(() => {
            instance.show();
        });

        return instance;
    }

}
