import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth-guard';
import { AuthGuardModule } from './auth-guard.module';
import { StoreModule, Store, select } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { cold } from 'jasmine-marbles';
import { selectAuthGuardFeature } from './reducers/auth-guard.selectors';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { AuthGuardState, AuthGuardStateErrorDetail } from './reducers/auth-guard.store';
import { UserLoggedInApiService } from 'src/app/core/api/user-logged-in/user-logged-in-api.service';
import { AppState, rootStoreConfig } from 'src/app/app.store';
import { BusyIndicatorModule } from 'src/app/core/services/busy-indicator/busy-indicator.module';
import { NotificationModule } from 'src/app/core/services/notification/notification.module';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { i18nMessages } from 'src/app/core/services/i18n/i18n.config';
import { User } from 'src/app/core/api/user/user-api.dto';
import { ActivatedRouteStub } from 'src/testing/router-stubs';
import { BusyIndicatorService } from '../../services/busy-indicator/busy-indicator.service';

describe('Auth Guard', () => {

    let service: jasmine.SpyObj<UserLoggedInApiService>;
    let authGuard: AuthGuard;
    let activatedRoute: ActivatedRoute;
    let store: Store<AppState>;
    let storeDispatchSpy: jasmine.Spy;
    let busyIndicatorService: BusyIndicatorService;
    let busyIndicatorServiceShowSpy: jasmine.Spy;
    let busyIndicatorServiceHideSpy: jasmine.Spy;
    const authError = {
        message: 'Unauthorized',
        stack: 'somestack'
    } as AuthGuardStateErrorDetail; // new Error ('Unauthorized');
    const loggedInUser = {
        id: 'asdasdasdsd',
        firstName: 'firstname',
        lastName: 'lastname',
        email: 'email@email.com',
        userName: 'userName'
    } as User;



    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}, rootStoreConfig),
                EffectsModule.forRoot([]),
                AuthGuardModule,
                HttpClientTestingModule,
                RouterTestingModule,
                BusyIndicatorModule,
                NotificationModule,
                NoopAnimationsModule
            ],
            providers: [
                {
                    provide: UserLoggedInApiService,
                    useValue: {
                        get: jasmine.createSpy()
                    }
                },
                ConfigService,
                { provide: ActivatedRoute, useValue: new ActivatedRouteStub({}), deps: [] },
            ]
        });

        service = TestBed.inject(UserLoggedInApiService) as jasmine.SpyObj<UserLoggedInApiService>;
        authGuard = TestBed.inject(AuthGuard) as AuthGuard;
        store = TestBed.inject(Store);
        storeDispatchSpy = spyOn(store, 'dispatch').and.callThrough();
        activatedRoute = TestBed.inject(ActivatedRoute) as ActivatedRoute;
        busyIndicatorService = TestBed.inject(BusyIndicatorService);
        busyIndicatorServiceShowSpy = spyOn(busyIndicatorService, 'show').and.callThrough();
        busyIndicatorServiceHideSpy = spyOn(busyIndicatorService, 'hide').and.callThrough();
    }));

    describe('When CanActivate is invoked', () => {


        it('should initialize authGuardState when Http Auth is 200', fakeAsync(() => {

            const response = cold('-a|', { a: loggedInUser });
            const expected = cold('-b', { b: true });

            service.get.and.returnValue(response);

            expect(authGuard.canActivate(activatedRoute.snapshot, null)).toBeObservable(expected);
            tick(100);

        }));

        it('should initialize authGuardState when Http Auth is different than 200', fakeAsync(() => {

            const response = cold('-#|', null, authError);
            const expected = cold('-b', { b: false });

            service.get.and.returnValue(response);

            spyOn(authGuard.router, 'navigateByUrl').and.returnValue(new Promise(resolve => resolve(true)));


            expect(authGuard.canActivate(activatedRoute.snapshot, null)).toBeObservable(expected);
            tick(100);
        }));

        it('should NOT repeat http request once is already Initialized', fakeAsync(() => {

            const response = cold('-a|', { a: loggedInUser });
            const expected = cold('-b', { b: true });
            const serviceGetSpy = service.get.and.returnValue(response);

            expect(authGuard.canActivate(activatedRoute.snapshot, null)).toBeObservable(expected);
            tick(100);
            expect(serviceGetSpy.calls.count()).toEqual(1);

            const expected2 = cold('--b', { b: true });
            expect(authGuard.canActivate(activatedRoute.snapshot, null)).toBeObservable(expected2);
            tick(100);
            expect(serviceGetSpy.calls.count()).toEqual(1);
        }));

    });

    describe('When AuthGuard is invoked', () => {

        let userLoggedInServiceResponseMock: TestColdObservable;
        let guardExpected: TestColdObservable;
        let stateExpected: TestColdObservable;


        const expectBusyText = () => {
            const busyIndicatorShowSpyArgs = busyIndicatorServiceShowSpy.calls.argsFor(0)[0];
            expect(busyIndicatorShowSpyArgs).toEqual(i18nMessages.common.checkingPermissions);
        };

        const expectBusyHide = () => {
            expect(busyIndicatorServiceHideSpy).toHaveBeenCalled();
        };

        describe('and the http request returns 200', () => {

            beforeEach(fakeAsync(() => {
                stateExpected = cold('--c', {
                    c: {
                        isInitialized: true,
                        userInfo: loggedInUser,
                        userInfoError: null
                    } as AuthGuardState
                });
                userLoggedInServiceResponseMock = cold('-a|', { a: loggedInUser });
                guardExpected = cold('-b', { b: true });
                service.get.and.returnValue(userLoggedInServiceResponseMock);
                expect(authGuard.canActivate(activatedRoute.snapshot, null)).toBeObservable(guardExpected);
                // tick(100);
            }));

            it('should call Busyindicator service and let the user know "we are checking permissions" ', fakeAsync(() => {
                expectBusyText();
            }));

            it('should call Busyindicator service and Hide it when the request is completed', fakeAsync(() => {
                expectBusyHide();
            }));

            it('should store user info when request has finished ', fakeAsync(() => {
                expect(store.pipe(select(selectAuthGuardFeature))).toBeObservable(stateExpected);
            }));

            it('should NOT set error message when http request finished OK ', fakeAsync(() => {
                expect(store.pipe(select(selectAuthGuardFeature))).toBeObservable(stateExpected);
            }));

        });

        describe('and the http request returns an error', () => {

            beforeEach(fakeAsync(() => {

                spyOn(authGuard.router, 'navigateByUrl').and.returnValue(new Promise(resolve => resolve(true)));

                stateExpected = cold('-c', {
                    c: {
                        isInitialized: true,
                        userInfo: null,
                        userInfoError: authError as any
                    } as AuthGuardState
                });

                userLoggedInServiceResponseMock = cold('-#|', null, authError);
                guardExpected = cold('-b', { b: false });
                service.get.and.returnValue(userLoggedInServiceResponseMock);
                expect(authGuard.canActivate(activatedRoute.snapshot, null)).toBeObservable(guardExpected);

                tick(1000); // => due to router.navigateUrl redirection
            }));

            it('should call Busyindicator service and let the user know "we are checking permissions" ', fakeAsync(() => {
                expectBusyText();
            }));

            it('should call Busyindicator service and Hide it when the request is completed', () => {
                expectBusyHide();
            });

            it('should set error in app state when http request finished with error ', () => {
                expect(store.pipe(select(selectAuthGuardFeature))).toBeObservable(stateExpected);
            });

            it('should NOT set user info data when finished with error ', () => {
                expect(store.pipe(select(selectAuthGuardFeature))).toBeObservable(stateExpected);
            });

        });

    });

});
