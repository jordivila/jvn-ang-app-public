
import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, timer as observableTimer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { ModalBaseComponent } from '../base/modal.component';
import { ModalState } from '../reducers/modal.store';
import { ModalTimeOutModel } from './modalTimeout.model';

@Component({
    selector: 'app-modal-timeout',
    templateUrl: 'modalTimeout.component.html',
    styleUrls: ['modalTimeout.component.scss']
})
export class ModalTimeoutComponent extends ModalBaseComponent implements OnInit, OnDestroy {

    @Input() model: ModalTimeOutModel; // = new ModalTimeOutModel(60, 0, 'warning');
    private timerSubscription: Subscription;

    constructor(
        protected elementRef: ElementRef,
        protected store: Store<ModalState>,
        private changeDetectorRef: ChangeDetectorRef) {

        super(elementRef, store);
    }


    ngOnInit() {
        // this.title = this.title.trim() !== '' ? this.title : 'You will be signed out in';
        // this.body = this.body.trim() !== '' ? this.body : 'What do you want to do?';
        super.ngOnInit();
    }

    ngOnDestroy() {
        this.counterStop();
        super.ngOnDestroy();
    }

    show(): void {
        this.model.value = 0;
        this.counterStart();
        super.show();
    }

    modalHidden(): void {
        this.counterStop();
        super.modalHidden();
    }

    private counterStart() {
        this.timerSubscription = observableTimer(0, 1000)
            .pipe(
                takeWhile(() => this.timerSubscription instanceof Subscription)
            )
            .subscribe(() => {
                this.model.value = this.model.value + 1;
                this.changeDetectorRef.detectChanges();
                if (this.model.value >= this.model.max) {
                    this.koClicked();
                }
            });
    }

    private counterStop() {
        this.timerSubscription.unsubscribe();
    }
}
