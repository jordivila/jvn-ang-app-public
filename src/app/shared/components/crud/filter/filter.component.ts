import { EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Filter } from './models/filter';


export abstract class FilterComponent<T extends Filter> implements OnInit, OnDestroy {

    @Output() searchEvent = new EventEmitter<T>();


    filterbuttonEnabled: boolean;
    filterForm: FormGroup;
    isLoading: boolean;

    private filterFormChangesSubscription: Subscription;
    private filterFormLastValue: T;

    constructor(public formBuilder: FormBuilder) {

    }

    abstract initFormGroup(): FormGroup;

    ngOnInit() {
        this.isLoading = false;
        this.filterForm = this.initFormGroup();
        this.filterFormLastValue = this.filterForm.value;
        this.filterbuttonEnabled = false;
        this.filterFormChangesSubscription =
            this.filterForm
                .valueChanges
                .pipe(
                    tap((next: any) => {
                        this.checkFilterButtonAvailability();
                    }))
                .subscribe();
    }

    ngOnDestroy() {
        this.filterFormChangesSubscription.unsubscribe();
    }

    searchClick(): void {
        this.checkFilterButtonAvailability(); // due to autocomplete we need to re-check
        if (this.filterbuttonEnabled) {
            this.isLoading = true;
            this.searchEvent.emit(this.filterForm.value);
        }
    }

    onSearchSucceed(): void {
        this.filterFormLastValue = this.filterForm.value;
        this.isLoading = false;
        this.filterForm.reset(this.filterFormLastValue);
        this.filterbuttonEnabled = false;
    }

    onSearchFail(): void {
        this.isLoading = false;
    }

    cancelClick($event: Event): void {
        this.filterForm.reset(this.filterFormLastValue);
    }

    get value() {
        return this.filterForm.value;
    }

    set value(filterForm: any) {
        this.filterForm.patchValue(filterForm); // setValue vs pathValue
        this.filterForm.markAsTouched();
        this.filterForm.markAsDirty();
        this.filterbuttonEnabled = true;
    }

    private checkFilterButtonAvailability() {
        this.filterbuttonEnabled = (this.filterForm.dirty && this.filterForm.valid);
    }
}
