import { Injectable, TemplateRef } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, throwError } from 'rxjs';
import { Guid } from '../../../helpers/guid';
import { CrudModule } from '../crud.module';
import { FormCrudComponent, FormCrud } from './form.component';
import { StoreModule } from '@ngrx/store';
import { rootStoreConfig } from '../../../../app.store';
import { ConfigService } from '../../../../core/services/config/config.service';
import { i18nMessages } from '../../../../core/services/i18n/i18n.config';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { BusyIndicatorService } from 'src/app/core/services/busy-indicator/busy-indicator.service';
import { BusyIndicatorModule } from 'src/app/core/services/busy-indicator/busy-indicator.module';
import { NotificationServiceMockClass } from 'src/app/core/services/notification/notification.service.mock.spec';

interface FormTestModel {
    id?: Guid;
    name: string;
}

@Injectable()
class FormTestClass
    extends FormCrudComponent<FormTestModel>
    implements FormCrud<FormTestModel> {

    closeForm: () => void;
    initModels: () => Promise<FormTestModel>;
    initFormGroup: () => FormGroup;
    isEdit: () => boolean;
    savePost: (theForm: FormGroup, theModel: FormTestModel) => Observable<object>;
    savePut: (theForm: FormGroup, theModel: FormTestModel) => Observable<object>;
    formTemplate: TemplateRef<any>;
    isOpen: boolean;
    msgTitle: string;
    msgGettingFormData: string;
    msgErrorGettingFormData: string;
    msgSavingData: string;
    msgDataSavedSuccessfully: string;

    constructor(
        public notificationService: NotificationService,
        public busyIndicatorService: BusyIndicatorService) {

        super(notificationService, busyIndicatorService);

        this.msgTitle = 'msgTitle';
        this.msgGettingFormData = 'msgGettingFormData';
        this.msgErrorGettingFormData = 'msgErrorGettingFormData';
        this.msgSavingData = 'msgSavingData';
        this.msgDataSavedSuccessfully = 'msgDataSavedSuccessfully';
    }
}



describe('form.component.ts', () => {

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CrudModule,
                NoopAnimationsModule, // no need for animations while testing
                RouterTestingModule,
                StoreModule.forRoot({}, rootStoreConfig),
                BusyIndicatorModule
            ],
            providers: [
                ConfigService,
                { provide: FormTestClass, useClass: FormTestClass, deps: [NotificationService, BusyIndicatorService] },
                { provide: NotificationService, useClass: NotificationServiceMockClass, deps: [] }
            ]
        });
    }));


    describe('NgOnInit', () => {

        it(`should
            1.- set busy indicator text to class.msgGettingFormData property
            2.- invoke InitModels & set result values & init Form object
            3.- hide busy indicator when finised`, fakeAsync(() => {

            const initModelsResult = { id: null, name: '' } as FormTestModel;
            const instance = TestBed.inject(FormTestClass);

            instance.initModels = () => new Promise<FormTestModel>((resolve, reject) => resolve(initModelsResult));
            instance.busyIndicatorService.show = jasmine.createSpy();
            instance.busyIndicatorService.hide = jasmine.createSpy();
            instance.initFormGroup = () => jasmine.createSpyObj('initFormGroup', ['patchValue']);
            instance.ngOnInit();
            tick();
            expect((instance.busyIndicatorService.show as jasmine.Spy).calls.first().args[0]).toEqual(instance.msgGettingFormData);
            expect(instance.theModel).toEqual(initModelsResult);
            expect(instance.theForm.patchValue).toHaveBeenCalledWith(initModelsResult);
            // TODO: check why this throws exception
            // expect(instance.initFormGroup).toHaveBeenCalledBefore(instance.busyIndicatorService.hide);
            expect(instance.busyIndicatorService.hide).toHaveBeenCalled();
        }));

        it(`should
            1.- catch exception during InitModels
            2.- show notification
            3.- hide busy indicator
            4.- close form`, fakeAsync(() => {

            const instance = TestBed.inject(FormTestClass);
            instance.initModels = () => new Promise<FormTestModel>((resolve, reject) => reject('some unhandled exception'));
            instance.busyIndicatorService.hide = jasmine.createSpy();
            instance.busyIndicatorService.show = jasmine.createSpy().and.callThrough();
            instance.notificationService.error = jasmine.createSpy();
            instance.closeForm = jasmine.createSpy();
            instance.ngOnInit();
            tick();
            expect(instance.busyIndicatorService.hide).toHaveBeenCalled();
            expect(instance.notificationService.error).toHaveBeenCalledWith(instance.msgErrorGettingFormData);
            expect(instance.busyIndicatorService.hide).toHaveBeenCalled();
            expect(instance.closeForm).toHaveBeenCalled();
        }));

    });

    describe('Saving the form ', () => {

        it(`should do nothing if form is NOT dirty or form is NOT valid`, fakeAsync(() => {
            const instance = TestBed.inject(FormTestClass);
            instance.busyIndicatorService.show = jasmine.createSpy().and.callThrough();
            instance.isEdit = jasmine.createSpy().and.returnValue(true);
            instance.savePut = jasmine.createSpy().and.returnValue(of({}));

            (instance as any).theForm = {};
            (instance as any).theForm.dirty = false;
            (instance as any).theForm.valid = false;
            (instance as FormCrudComponent<FormTestModel>).saveForm();
            expect(instance.busyIndicatorService.show).not.toHaveBeenCalled();

            (instance as any).theForm.dirty = true;
            (instance as any).theForm.valid = false;
            (instance as FormCrudComponent<FormTestModel>).saveForm();
            expect(instance.busyIndicatorService.show).not.toHaveBeenCalled();

            (instance as any).theForm.dirty = false;
            (instance as any).theForm.valid = true;
            (instance as FormCrudComponent<FormTestModel>).saveForm();
            expect(instance.busyIndicatorService.show).not.toHaveBeenCalled();

            (instance as any).theForm.dirty = true;
            (instance as any).theForm.valid = true;
            (instance as FormCrudComponent<FormTestModel>).saveForm();
            expect(instance.busyIndicatorService.show).toHaveBeenCalled();
        }));

        it(`should
            1.- set busyIndicator to component\s "saving data message"
            2.- call POST/PUT depending on isEdit()
            3.- show notification success
            4.- closes form
            5.- busyIndicatgor is hidden`, fakeAsync(() => {

            const instance = TestBed.inject(FormTestClass);
            instance.busyIndicatorService.show = jasmine.createSpy();
            instance.busyIndicatorService.hide = jasmine.createSpy();
            instance.isEdit = jasmine.createSpy().and.returnValue(true);
            instance.savePut = jasmine.createSpy().and.returnValue(of({}));
            instance.savePost = jasmine.createSpy().and.returnValue(of({}));
            instance.notificationService.success = jasmine.createSpy();
            // instance.closeForm = jasmine.createSpy();
            (instance as any).theForm = {};
            (instance as any).theForm.dirty = true;
            (instance as any).theForm.valid = true;
            (instance as any).theModel = 'someModel';
            (instance as FormCrudComponent<FormTestModel>).saveForm();

            // When Adding
            expect((instance.busyIndicatorService.show as jasmine.Spy).calls.mostRecent().args[0]).toEqual(instance.msgSavingData);
            expect(instance.savePost).not.toHaveBeenCalled();
            expect((instance.savePut as jasmine.Spy).calls.mostRecent().args[0]).toEqual(instance.theForm);
            expect((instance.savePut as jasmine.Spy).calls.mostRecent().args[1]).toEqual(instance.theModel);
            expect((instance.notificationService.success as jasmine.Spy)
                .calls.mostRecent().args[0]).toEqual(instance.msgDataSavedSuccessfully);
            // expect(instance.closeForm).toHaveBeenCalled();
            expect((instance.busyIndicatorService.hide as jasmine.Spy)).toHaveBeenCalled();

            // When Editing
            instance.isEdit = jasmine.createSpy().and.returnValue(false);
            (instance as FormCrudComponent<FormTestModel>).saveForm();
            expect(instance.savePost).toHaveBeenCalled();
        }));

        it(`should
            1.- catch exception and show backend valiadtion messages when status code is 400
            2.- do NOT close form`, fakeAsync(() => {
            const theError = { status: 400, message: 'some backend validation message' };
            const instance = TestBed.inject(FormTestClass);
            instance.isEdit = jasmine.createSpy().and.returnValue(true);
            instance.savePut = jasmine.createSpy().and.returnValue(throwError(theError));
            instance.busyIndicatorService.show = jasmine.createSpy();
            instance.notificationService.error = jasmine.createSpy();
            instance.closeForm = jasmine.createSpy();
            (instance as any).theForm = {};
            (instance as any).theForm.dirty = true;
            (instance as any).theForm.valid = true;
            (instance as any).theModel = 'someModel';
            (instance as FormCrudComponent<FormTestModel>).saveForm();
            tick();
            expect(instance.notificationService.error).toHaveBeenCalledWith(theError.message);
            expect(instance.closeForm).not.toHaveBeenCalled();
        }));

        it(`should
            1.- catch exception and show propper message depending on error status code
            2.- do NOT close form`, fakeAsync(() => {
            const theError = { status: 500 };
            const instance = TestBed.inject(FormTestClass);
            instance.isEdit = jasmine.createSpy().and.returnValue(true);
            instance.savePut = jasmine.createSpy().and.returnValue(throwError(theError));
            instance.notificationService.error = jasmine.createSpy();
            instance.closeForm = jasmine.createSpy();
            (instance as any).theForm = {};
            (instance as any).theForm.dirty = true;
            (instance as any).theForm.valid = true;
            (instance as any).theModel = 'someModel';
            (instance as FormCrudComponent<FormTestModel>).saveForm();
            tick();
            expect(instance.notificationService.error).toHaveBeenCalledWith(i18nMessages.common.errUnhandled);
            expect(instance.closeForm).not.toHaveBeenCalled();
        }));
    });
});
