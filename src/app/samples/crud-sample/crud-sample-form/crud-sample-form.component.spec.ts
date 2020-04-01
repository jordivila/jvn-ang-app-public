import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { UserDetails } from 'src/app/core/api/user/user-api.dto';
import { userDetailsMockGet } from 'src/app/core/api/user/user-api.mock';
import { UserApiService } from 'src/app/core/api/user/user-api.service';
import { BusyIndicatorService } from 'src/app/core/services/busy-indicator/busy-indicator.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { CrudState } from 'src/app/shared/components/crud/reducers/crud.store';
import { TestBedHelper, TestBedHelperContext } from '../../../../testing/testbed-helper';
import { GuidHelper } from '../../../shared/helpers/guid-helper';
import { crudTestModuleMetadata } from '../crud-sample.module.spec';
import { CrudSampleFormComponent } from './crud-sample-form.component';

interface FormKeyValuePair<T> {
    key: keyof T;
    value: any;
}

xdescribe('Crud Form Sample', () => {
    let component: CrudSampleFormComponent;
    let fixture: ComponentFixture<CrudSampleFormComponent>;
    let testBedHelper: TestBedHelper<CrudSampleFormComponent>;

    let userDetailsData: UserDetails;
    let userDetailsId: string;
    const saveButtonSelector = '.app-right-sidenav-templated-footer button.mat-primary';
    const saveButtonGet = () => fixture.debugElement.query(By.css(saveButtonSelector));
    const saveFormValues = (form: FormKeyValuePair<UserDetails>[]) => {
        if (Array.isArray(form) && form.length > 0) {
            component.formSideTemplated.theForm.markAsDirty();
            form.forEach((entry: FormKeyValuePair<UserDetails>) => {
                component.formSideTemplated.theForm.controls[entry.key].setValue(entry.value);
            });
        }
        saveButtonGet().triggerEventHandler('click', null);
    };
    const saveAddUserDetails = (data: UserDetails) => {
        saveFormValues([
            { key: 'email', value: data.email } as FormKeyValuePair<UserDetails>,
            { key: 'firstName', value: data.firstName } as FormKeyValuePair<UserDetails>,
            { key: 'lastName', value: data.lastName } as FormKeyValuePair<UserDetails>,
            { key: 'userName', value: data.userName } as FormKeyValuePair<UserDetails>,
        ]);
    };
    const saveEditUserDetails = () => {
        saveFormValues([{ key: 'email', value: 'avaliduseremail@gmail.com' }]);
    };




    beforeEach(fakeAsync(() => {

        const initialState = {
            crudState: {
                gridSearches: []
            } as CrudState
        };


        crudTestModuleMetadata.providers.push(
            provideMockStore({ initialState }),
            {
                provide: UserApiService,
                useValue: {
                    get: jasmine.createSpy(),
                    list: jasmine.createSpy(),
                    post: jasmine.createSpy(),
                    put: jasmine.createSpy(),
                    delete: jasmine.createSpy()
                }
            }
        );

        TestBed.configureTestingModule(crudTestModuleMetadata);

        testBedHelper = new TestBedHelper<CrudSampleFormComponent>(CrudSampleFormComponent)
            .onCreated((context: TestBedHelperContext<CrudSampleFormComponent>) => {
                fixture = context.fixture;
                component = context.component;
            });
    }));

    describe('When Adding an item', () => {

        describe('and slide form is opening', () => {

            let busyIndicatorServiceMock: BusyIndicatorService;
            let userServiceMock: jasmine.SpyObj<UserApiService>;

            beforeEach(fakeAsync(() => {

                return testBedHelper
                    .onBeforeCreate(() => {
                        busyIndicatorServiceMock = TestBed.inject(BusyIndicatorService);
                        userServiceMock = TestBed.inject(UserApiService) as jasmine.SpyObj<UserApiService>;


                        spyOn(busyIndicatorServiceMock, 'show').and.callThrough();
                        spyOn(busyIndicatorServiceMock, 'hide').and.callThrough();
                        spyOn(userServiceMock, 'get').and.returnValue(of(userDetailsMockGet()));
                    })
                    .onBeforeInit((comp) => {
                        spyOn(comp, 'closeForm');
                        spyOn(comp, 'initFormGroup').and.callThrough();
                    })
                    .create();
            }));

            it(`should  set busy indicator text to component\'s "getting data message"`, () => {
                expect((busyIndicatorServiceMock.show as jasmine.Spy).calls.first().args[0]).toEqual(component.msgGettingFormData);
            });

            it(`should NOT invoke http GetById using item id because we are not editing`, () => {
                expect(userServiceMock.get).not.toHaveBeenCalled();
            });

            it(`should set empty values & init Form object`, () => {
                expect({}).toEqual(component.formSideTemplated.theModel);
                expect(component.formSideTemplated.theForm instanceof FormGroup).toEqual(true);
                expect(component.formSideTemplated.theForm.value.firstName).toEqual('');
            });

            it(`should hide busy indicator after getting & setting item details`, () => {
                expect(busyIndicatorServiceMock.hide).toHaveBeenCalled();
                expect(component.initFormGroup).toHaveBeenCalledBefore(busyIndicatorServiceMock.hide as jasmine.Spy);
            });
        });


        describe('and the user fill form and click on "save" button', () => {

            let busyIndicatorServiceMock: BusyIndicatorService;
            let notificationServiceMock: NotificationService;
            let userServiceMock: UserApiService;

            beforeEach(fakeAsync(() => {
                return testBedHelper
                    .onBeforeCreate(() => {
                        busyIndicatorServiceMock = TestBed.inject(BusyIndicatorService);
                        notificationServiceMock = TestBed.inject(NotificationService);
                        userServiceMock = TestBed.inject(UserApiService) as jasmine.SpyObj<UserApiService>;

                        spyOn(busyIndicatorServiceMock, 'show').and.callThrough();
                        spyOn(busyIndicatorServiceMock, 'hide').and.callThrough();
                        // spyOn(userServiceMock, 'get').and.returnValue(throwError(new Error('Http Get by Id should not happen when adding')));
                        // spyOn(userServiceMock, 'post').and.returnValue(of({}));
                        // spyOn(userServiceMock, 'put').and.returnValue(of({}));
                        spyOn(notificationServiceMock, 'success').and.callThrough();
                    })
                    .onBeforeInit((comp) => {
                        spyOn(comp, 'closeForm').and.callThrough();
                        spyOn(comp, 'initFormGroup').and.callThrough();
                    })
                    .create();

            }));

            it(`should set busyIndicator to component\s "saving data message"`, () => {
                saveAddUserDetails(userDetailsMockGet());
                expect((busyIndicatorServiceMock.show as jasmine.Spy).calls.mostRecent().args[0]).toEqual(component.msgSavingData);
            });

            it(`should do call post using form data`, () => {
                userDetailsData = userDetailsMockGet();
                saveAddUserDetails(userDetailsData);
                expect(userServiceMock.post).toHaveBeenCalled();
                expect((userServiceMock.post as jasmine.Spy).calls.mostRecent().args[0].email).toEqual(userDetailsData.email);
            });

            it(`should  do NOT call PUT`, () => {
                saveAddUserDetails(userDetailsMockGet());
                expect(userServiceMock.put).not.toHaveBeenCalled();
            });

            it(`should show notification success with component specific message`, () => {
                saveAddUserDetails(userDetailsMockGet());
                expect((notificationServiceMock.success as jasmine.Spy).calls.mostRecent().args[0]).toEqual(component.msgDataSavedSuccessfully);
            });

            it(`should close form once success message has been shown`, () => {
                saveAddUserDetails(userDetailsMockGet());
                expect(notificationServiceMock.success).toHaveBeenCalledBefore(component.closeForm as jasmine.Spy);
                expect(component.closeForm).toHaveBeenCalled();
            });

        });
    });

    describe('Editing an item', () => {

        beforeEach(fakeAsync(() => {
            userDetailsData = userDetailsMockGet();
            userDetailsId = GuidHelper.create().toString();
        }));

        describe('when slide form is opening', () => {

            describe('and loading succeeds', () => {

                let busyIndicatorServiceMock: BusyIndicatorService;
                let userServiceMock: jasmine.SpyObj<UserApiService>;


                beforeEach(fakeAsync(() => {
                    return testBedHelper
                        .onBeforeCreate(() => {
                            busyIndicatorServiceMock = TestBed.inject(BusyIndicatorService);
                            userServiceMock = TestBed.inject(UserApiService) as jasmine.SpyObj<UserApiService>;
                            userServiceMock.get.and.returnValue(cold('-a|', { a: userDetailsData }));

                            spyOn(busyIndicatorServiceMock, 'show').and.callThrough();
                            spyOn(busyIndicatorServiceMock, 'hide').and.callThrough();

                        })
                        .onBeforeInit((comp) => {
                            spyOn(comp, 'closeForm').and.callThrough();
                            spyOn(comp, 'initFormGroup').and.callThrough();
                            comp.userId = userDetailsId;
                        })
                        .create();
                }));

                it(`should set busy indicator text to component\'s "getting data message"`, () => {
                    expect(busyIndicatorServiceMock.show).toHaveBeenCalledWith(component.msgGettingFormData);
                });

                it(`should invoke http GetById using item id`, () => {
                    expect(userServiceMock.get).toHaveBeenCalledWith(userDetailsId);
                });

                it(`should set propper values & init Form object`, fakeAsync(() => {
                    expect(userDetailsData).toEqual(component.formSideTemplated.theModel);
                    expect(component.formSideTemplated.theForm instanceof FormGroup).toEqual(true);
                    expect(component.formSideTemplated.theForm.value.firstName).toEqual(userDetailsData.firstName);
                }));

                it(`should hide busy indicator after getting & setting item details`, () => {
                    expect(userServiceMock.get).toHaveBeenCalledBefore(busyIndicatorServiceMock.hide as jasmine.Spy);
                    expect(busyIndicatorServiceMock.hide).toHaveBeenCalled();
                });

            });

            describe('and an exception occurs loading data', () => {

                let busyIndicatorServiceMock: BusyIndicatorService;
                let notificationServiceMock: NotificationService;
                let userServiceMock: jasmine.SpyObj<UserApiService>;

                beforeEach(fakeAsync(() => {
                    return testBedHelper
                        .onBeforeCreate(() => {
                            busyIndicatorServiceMock = TestBed.inject(BusyIndicatorService);
                            notificationServiceMock = TestBed.inject(NotificationService);
                            userServiceMock = TestBed.inject(UserApiService) as jasmine.SpyObj<UserApiService>;
                            userServiceMock.get.and.returnValue(cold('-#|', null, 'some unexpected error'));


                            spyOn(busyIndicatorServiceMock, 'show').and.callThrough();
                            spyOn(busyIndicatorServiceMock, 'hide').and.callThrough();
                            spyOn(notificationServiceMock, 'error').and.callThrough();
                        })
                        .onBeforeInit((comp) => {
                            spyOn(comp, 'closeForm').and.callThrough();
                            spyOn(comp, 'initFormGroup').and.callThrough();
                            comp.userId = userDetailsId;
                        })
                        .create();
                }));

                it(`should show notification`, fakeAsync(() => {
                    expect(notificationServiceMock.error).toHaveBeenCalledWith(component.formSideTemplated.msgErrorGettingFormData);
                }));

                it(`should hide busy indicator`, fakeAsync(() => {
                    expect(busyIndicatorServiceMock.hide).toHaveBeenCalled();
                }));

                it(`should close form`, fakeAsync(() => {
                    expect(component.closeForm).toHaveBeenCalled();
                }));

            });

        });

        describe('Saving the item data', () => {

            let busyIndicatorServiceMock: BusyIndicatorService;
            let notificationServiceMock: NotificationService;
            let userServiceMock: jasmine.SpyObj<UserApiService>;

            beforeEach(fakeAsync(() => {
                return testBedHelper
                    .onBeforeCreate(() => {
                        busyIndicatorServiceMock = TestBed.inject(BusyIndicatorService);
                        notificationServiceMock = TestBed.inject(NotificationService);
                        userServiceMock = TestBed.inject(UserApiService) as jasmine.SpyObj<UserApiService>;

                        userServiceMock.get.and.returnValue(cold('-a|', { a: userDetailsData }));
                        userServiceMock.put.and.returnValue(cold('-a|', { a: {} }));
                        userServiceMock.post.and.returnValue(cold('-a|', { a: {} }));


                        spyOn(busyIndicatorServiceMock, 'show').and.callThrough();
                        spyOn(busyIndicatorServiceMock, 'hide').and.callThrough();
                        spyOn(notificationServiceMock, 'success');
                        spyOn(notificationServiceMock, 'error');
                    })
                    .onBeforeInit((comp) => {
                        spyOn(comp, 'closeForm');
                        comp.userId = userDetailsId;
                    })
                    .create();

            }));

            it(`should do nothing if form is NOT dirty or form is NOT valid`, () => {

                // At this point form is NOT dirty
                // Check button is not enabled and clicking triggers nothing
                saveFormValues([]);
                expect(userServiceMock.put).not.toHaveBeenCalled();
                expect(saveButtonGet().nativeElement.disabled).toEqual(true);

                // Lets set form as dirty but NOT valid
                saveFormValues([{ key: 'email', value: 'invalidEmail' }]);
                expect(component.formSideTemplated.theForm.dirty).toEqual(true);
                expect(component.formSideTemplated.theForm.valid).toEqual(false);
                expect(saveButtonGet().nativeElement.disabled).toEqual(true);

                // Lets set form as dirty and valid
                saveFormValues([{ key: 'email', value: 'avaliduseremail@gmail.com' }]);
                expect(component.formSideTemplated.theForm.dirty).toEqual(true);
                expect(component.formSideTemplated.theForm.valid).toEqual(true);
                expect(saveButtonGet().nativeElement.disabled).toEqual(true);
            });

            describe('and saving succeeds', () => {

                beforeEach(() => {
                    saveEditUserDetails();
                });

                it(`should set busyIndicator text to component\s "saving data message"`, () => {
                    expect((busyIndicatorServiceMock.show as jasmine.Spy).calls.mostRecent().args[0]).toEqual(component.msgSavingData);
                });

                it(`should do NOT call post`, () => {
                    expect(userServiceMock.post).not.toHaveBeenCalled();
                });

                it(`should do call PUT using propper id`, () => {
                    expect(userServiceMock.put).toHaveBeenCalled();
                    expect((userServiceMock.put as jasmine.Spy).calls.mostRecent().args[0].id).toEqual(userDetailsId);
                });

                it(`should show notification success`, () => {
                    expect((notificationServiceMock.success as jasmine.Spy).calls.mostRecent().args[0]).toEqual(component.msgDataSavedSuccessfully);
                });

                it(`should close form`, () => {
                    expect(component.closeForm).toHaveBeenCalled();
                });

                it(`busyIndicatgor is hidden`, () => {
                    expect(userServiceMock.get).toHaveBeenCalledBefore(busyIndicatorServiceMock.hide as jasmine.Spy);
                    expect(busyIndicatorServiceMock.hide).toHaveBeenCalled();
                });

            });

        });

        // describe('Saving the item data fails with unhandled error (500)', () => {

        //     let busyIndicatorServiceMock: BusyIndicatorService;
        //     let notificationServiceMock: NotificationService;
        //     let userServiceMock = TestBed.inject(UserApiService) as jasmine.SpyObj<UserApiService>;

        //     beforeEach(fakeAsync(() => {
        //         return testBedHelper
        //             .onBeforeCreate(() => {
        //                 busyIndicatorServiceMock = TestBed.inject(BusyIndicatorService);
        //                 notificationServiceMock = TestBed.inject(NotificationService);
        //                 userServiceMock = TestBed.inject(UserApiService) as jasmine.SpyObj<UserApiService>;
        //                 userServiceMock.get.and.returnValue(cold('-a|', { a: userDetailsData }));
        //                 userServiceMock.put.and.returnValue(cold('-#|', { a: { status: 500 } }));
        //                 userServiceMock.post.and.returnValue(cold('-a|', { a: {} }));

        //                 spyOn(busyIndicatorServiceMock, 'show').and.callThrough();
        //                 spyOn(busyIndicatorServiceMock, 'hide').and.callThrough();
        //                 spyOn(notificationServiceMock, 'success');
        //                 spyOn(notificationServiceMock, 'error');
        //             })
        //             .onBeforeInit((comp) => {
        //                 spyOn(comp, 'closeForm');
        //                 comp.userId = userDetailsId;
        //             })
        //             .create()
        //             .then(() => {
        //                 saveEditUserDetails();
        //                 testBedHelper.fixtureDetectChanges(fixture);
        //             });

        //     }));

        //     it(`should show notification error with "unexpected error" when status is not 400`, () => {
        //         expect(notificationServiceMock.error).toHaveBeenCalledWith(i18nMessages.common.errUnhandled);
        //     });

        //     it(`should do NOT close form`, () => {
        //         expect(component.closeForm).not.toHaveBeenCalled();
        //     });
        // });

        // describe('Saving the item data fails with bad request status code (400)', () => {

        //     const theError = { status: 400, message: 'some backend validation message' };
        //     let busyIndicatorServiceMock: BusyIndicatorService;
        //     let notificationServiceMock: NotificationService;
        //     let userServiceMock: jasmine.SpyObj<UserApiService>;


        //     beforeEach(fakeAsync(() => {
        //         return testBedHelper
        //             .onBeforeCreate(() => {
        //                 busyIndicatorServiceMock = TestBed.inject(BusyIndicatorService);
        //                 notificationServiceMock = TestBed.inject(NotificationService);
        //                 userServiceMock = TestBed.inject(UserApiService) as jasmine.SpyObj<UserApiService>;
        //                 userServiceMock.get.and.returnValue(cold('-a|', { a: userDetailsData }));
        //                 userServiceMock.put.and.returnValue(cold('-#|', { a: theError }));
        //                 userServiceMock.post.and.returnValue(cold('-a|', { a: {} }));


        //                 spyOn(busyIndicatorServiceMock, 'show').and.callThrough();
        //                 spyOn(busyIndicatorServiceMock, 'hide').and.callThrough();
        //                 spyOn(notificationServiceMock, 'success');
        //                 spyOn(notificationServiceMock, 'error');
        //             })
        //             .onBeforeInit((comp) => {
        //                 spyOn(comp, 'closeForm');
        //                 comp.userId = userDetailsId;
        //             })
        //             .create()
        //             .then(() => {
        //                 saveEditUserDetails();
        //                 testBedHelper.fixtureDetectChanges(fixture);
        //             });

        //     }));

        //     it(`should show notification error error using backend message`, () => {
        //         expect(notificationServiceMock.error).toHaveBeenCalledWith(theError.message);
        //     });

        //     it(`should NOT close the form`, () => {
        //         expect(component.closeForm).not.toHaveBeenCalled();
        //     });

        // });

    });
});
