import { Injectable } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Guid } from '../../../helpers/guid';
import { CustomValidators } from '../../../services/validation/validation.service';
import { CrudModule } from '../crud.module';
import { FilterComponent } from './filter.component';
import { StoreModule } from '@ngrx/store';
import { rootStoreConfig } from '../../../../app.store';
import { ConfigService } from '../../../../core/services/config/config.service';


interface CrudFilterTest {
    id: Guid;
    name: string;
}

@Injectable()
class FilterTestClass extends FilterComponent<CrudFilterTest> {

    constructor(public formBuilder: FormBuilder) {
        super(formBuilder);
    }

    initFormGroup(): FormGroup {
        return this.formBuilder.group({
            id: new FormControl('', [
                CustomValidators.requiredWithTrim,
                Validators.minLength(4),
                Validators.maxLength(100)]),
            name: new FormControl('', [])
        });
    }
}

const simulateFilterFormChangeValue = (instance, model: CrudFilterTest): void => {
    instance.filterForm.markAsDirty();
    instance.filterForm.patchValue(model);
};

describe('filter.component.ts', () => {

    let instance: FilterTestClass;
    let modelValid: CrudFilterTest;
    let modelEmpty: CrudFilterTest;

    beforeEach(fakeAsync(() => {

        modelValid = { id: 'someId', name: 'someName' } as CrudFilterTest;
        modelEmpty = { id: '', name: '' } as CrudFilterTest;

        TestBed.configureTestingModule({
            imports: [
                CrudModule,
                NoopAnimationsModule, // no need for animations while testing
                RouterTestingModule,
                StoreModule.forRoot({}, rootStoreConfig)
            ],
            providers: [
                ConfigService,
                { provide: FilterTestClass, useClass: FilterTestClass, deps: [FormBuilder] },
            ]
        });

        tick(2000);

    }));

    describe('NgOnInit', () => {

        beforeEach(fakeAsync(() => {
            instance = TestBed.inject(FilterTestClass) as FilterTestClass;
            tick(1000);
        }));

        it(`should initialize isLoading to false as component did not trigger any search yet`, () => {
            instance.ngOnInit();
            expect(instance.isLoading).toEqual(false);
        });

        it(`should initialize filterForm as a FormGroup variable`, () => {
            instance.ngOnInit();
            expect(instance.filterForm instanceof FormGroup).toEqual(true);
        });

        it(`should initialize filterFormValue to the value returned by initFormGroup method`, () => {
            const wrap = instance.initFormGroup.bind(instance);
            instance.initFormGroup = () => {
                const f = wrap();
                f.patchValue(modelValid);
                return f;
            };
            instance.ngOnInit();
            expect(instance.filterForm.value).toEqual(modelValid);
            expect(instance.filterForm.value.id).toEqual(modelValid.id);
            expect(instance.filterForm.value.name).toEqual(modelValid.name);
        });

        it(`should initialize filterbuttonEnabled to be disabled after initialize`, () => {
            instance.ngOnInit();
            expect(instance.filterbuttonEnabled).toEqual(false);
        });

        it(`should subscribe to form value changes and activate filterButton in case is valid`, () => {
            instance.ngOnInit();
            expect(instance.filterbuttonEnabled).toEqual(false);
            // simulate form has been modified
            simulateFilterFormChangeValue(instance, modelValid);
            // then filterbuttonEnabled value should be set automatically
            expect(instance.filterbuttonEnabled).toEqual(true);
        });

    });

    describe('NgOnDestroy', () => {

        it(`should unsubscribe filterFormChangesSubscription`, () => {
            instance = TestBed.inject(FilterTestClass) as FilterTestClass;
            instance.ngOnInit();
            instance.ngOnDestroy(); // => unsubscribes from Form value changes
            simulateFilterFormChangeValue(instance, modelValid);
            expect(instance.filterbuttonEnabled).toEqual(false);
        });

    });

    describe('Search Click', () => {

        it(`should NOT fire searchEvent when filter button is NOT enabled`, () => {
            instance = TestBed.inject(FilterTestClass) as FilterTestClass;
            spyOn(instance.searchEvent, 'emit').and.callThrough();
            instance.ngOnInit();
            instance.searchClick();
            expect(instance.filterbuttonEnabled).toEqual(false);
            expect(instance.isLoading).toEqual(false);
            expect(instance.searchEvent.emit).not.toHaveBeenCalled();
        });

        it(`should fire searchEvent when filter button is enabled`, () => {
            instance = TestBed.inject(FilterTestClass) as FilterTestClass;
            spyOn(instance.searchEvent, 'emit').and.callThrough();
            instance.ngOnInit();
            simulateFilterFormChangeValue(instance, modelValid);
            expect(instance.filterbuttonEnabled).toEqual(true);
            instance.searchClick();
            expect(instance.isLoading).toEqual(true);
            expect(instance.searchEvent.emit).toHaveBeenCalledWith(modelValid);
        });

    });

    describe('OnSearchSuccees', () => {

        beforeEach(fakeAsync(() => {
            instance = TestBed.inject(FilterTestClass) as FilterTestClass;
            instance.ngOnInit();
            spyOn(instance.filterForm, 'reset').and.callThrough();
            simulateFilterFormChangeValue(instance, modelValid);
            instance.searchClick();
            instance.onSearchSucceed();

            tick(1000);

        }));

        it(`should set isLoading to false as the search event is completed`, () => {
            expect(instance.isLoading).toEqual(false);
        });

        it(`should set filter Button NOT enabled as user should change filter values in order to search again`, () => {
            expect(instance.filterbuttonEnabled).toEqual(false);
        });

        it(`should call FormGroup.reset method using the last form value used by the search`, () => {
            expect(instance.filterForm.reset).toHaveBeenCalledWith(modelValid);
        });

    });

    describe('OnSearchFail', () => {

        it(`should set isLoading to false as the search event is completed`, () => {
            instance = TestBed.inject(FilterTestClass) as FilterTestClass;
            instance.isLoading = true;
            instance.onSearchFail();
            expect(instance.isLoading).toEqual(false);
        });

    });

    describe('OnCancelClick', () => {

        it(`should rest the form to its latest value`, () => {
            instance = TestBed.inject(FilterTestClass) as FilterTestClass;
            instance.ngOnInit();
            spyOn(instance.filterForm, 'reset').and.callThrough();
            instance.cancelClick(new Event('click'));
            expect(instance.filterForm.reset).toHaveBeenCalledWith(modelEmpty);
        });

    });

    describe('Value get property', () => {

        it(`should return current filter form value object`, () => {
            instance = TestBed.inject(FilterTestClass) as FilterTestClass;
            instance.ngOnInit();
            expect(instance.value).toEqual(modelEmpty);
            simulateFilterFormChangeValue(instance, modelValid);
            expect(instance.value).toEqual(modelValid);
        });

    });

    describe('Value set property', () => {

        beforeEach(fakeAsync(() => {
            instance = TestBed.inject(FilterTestClass) as FilterTestClass;
            instance.ngOnInit();
            spyOn(instance.filterForm, 'patchValue').and.callThrough();
            spyOn(instance.filterForm, 'markAsTouched').and.callThrough();
            spyOn(instance.filterForm, 'markAsDirty').and.callThrough();
            instance.value = modelValid;

            tick(1000);
        }));

        it(`should set filterButton enabled to true`, () => {
            expect(instance.value).toEqual(modelValid);
        });

        it(`should call FormGroup.patchValue method`, () => {
            expect(instance.filterForm.patchValue).toHaveBeenCalledWith(modelValid);
        });
        it(`should call FormGroup.markAsTouched method`, () => {
            expect(instance.filterForm.markAsTouched).toHaveBeenCalled();
        });
        it(`should call FormGroup.markAsDirty method`, () => {
            expect(instance.filterForm.markAsDirty).toHaveBeenCalled();
        });

    });

    describe('checkFilterButtonAvailability', () => {

        it(`should set filterButtonEnabled to true when form is ready to be search-clicked`, () => {
            instance = TestBed.inject(FilterTestClass) as FilterTestClass;
            instance.ngOnInit();
            simulateFilterFormChangeValue(instance, modelEmpty);
            // at this point checkFilterButtonAvailability has been fired
            expect(instance.filterbuttonEnabled).toEqual(false); // false because is empty
            simulateFilterFormChangeValue(instance, modelValid);
            expect(instance.filterbuttonEnabled).toEqual(true);
        });

    });

});
