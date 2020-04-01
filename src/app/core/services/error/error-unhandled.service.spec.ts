import { TestBed, inject } from '@angular/core/testing';
import { Store, Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ErrorHandlerService } from './error-unhandled.service';
import { ErrorUnhandledState, ErrorUnhandledDetail } from 'src/app/shared/services/error/error-unhandled.store';
import { errUnhandledThrown } from 'src/app/shared/services/error/error-unhandled.actions';

describe('Error Handler Custom Service', () => {

    let service: ErrorHandlerService;
    let store: MockStore<{}>;
    let storeDispatchSpy: jasmine.Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ErrorHandlerService,
                provideMockStore({})
            ],
        });

        service = TestBed.inject(ErrorHandlerService);
        store = TestBed.inject(Store) as MockStore<{ errorUnhandledFeatureKey: ErrorUnhandledState }>;
        storeDispatchSpy = spyOn(store, 'dispatch').and.callFake(() => { });
    });

    describe('When unhandled error occurs and has no type', () => {

        const theErrorMessage = 'This is an error created to test ErrorHandlerService. No need to take care of it';
        const expectSomething = (
            theError: Error | string,
            theExpected: Action) => {

            service.handleError(theError);

            expect(storeDispatchSpy).toHaveBeenCalledWith(theExpected);
        };

        describe('And the error is not typed', () => {

            it('should set store info and stack information properly',
                () => {

                    const theExpected = errUnhandledThrown({
                        error: {
                            message: 'Unhandled Error',
                            stack: theErrorMessage
                        } as ErrorUnhandledDetail
                    });

                    expectSomething(theErrorMessage, theExpected);
                });
        });

        describe('And the error is "Error" typed', () => {

            it('should set store info and stack information properly to prevents NGRX serialization issues',
                () => {

                    const theError = {
                        message: theErrorMessage,
                        stack: 'the stack'
                    } as Error; // do not use new Error()
                    // otherwise jasmine logs the error in console
                    const theExpected = errUnhandledThrown({
                        error: {
                            message: theError.message,
                            stack: theError.stack
                        } as ErrorUnhandledDetail
                    });
                    expectSomething(theError, theExpected);
                });
        });
    });

});
