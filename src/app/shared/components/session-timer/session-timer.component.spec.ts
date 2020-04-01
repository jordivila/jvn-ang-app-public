import { CommonModule } from '@angular/common';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TestBedHelper, TestBedHelperContext } from '../../../../testing/testbed-helper';
import { rootStoreConfig } from '../../../app.store';
import { ConfigService } from '../../../core/services/config/config.service';
import { HttpCustomizedModule } from '../../../core/services/http/http-interceptor.module';
import { HttpLastRequestService } from '../../../core/services/http/http-last-request-service';
import { MaterialModule } from '../material/material.module';
import { ModalWrapperModule } from '../modal/modal.module';
import { SessionTimerComponent } from './session-timer.component';
import { SessionTimerEventArgs } from './session-timer.dto';
import { SessionTimerModule } from './session-timer.module';
import { AuthGuardModule } from 'src/app/core/guards/auth-guard/auth-guard.module';

@Component({
    selector: 'app-test-cmp',
    template: `
    <app-session-timer
        (sessionExpired)="onSessionExpired($event)"
        [sessionTimeoutInMinutes]="sessionTimeoutInMinutes">
    </app-session-timer>`
})
class TestComponent {

    public callbackFired = false;
    public callbackResultKeppAlive?: boolean = null;
    public sessionTimeoutInMinutes = 1;


    @ViewChild(SessionTimerComponent, { static: false }) sessionTimerComponent: SessionTimerComponent;

    onSessionExpired(event: SessionTimerEventArgs) {
        this.callbackFired = true;
        this.callbackResultKeppAlive = event.keepAlive;
    }

}

describe('Session Timer Component', () => {

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let testBedHelper: TestBedHelper<TestComponent>;

    let httpLastRequestService: HttpLastRequestService;

    beforeEach(async((done: DoneFn) => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}, rootStoreConfig),
                EffectsModule.forRoot([]),
                RouterTestingModule,
                NoopAnimationsModule,
                MaterialModule,
                CommonModule,
                ModalWrapperModule,
                AuthGuardModule,
                HttpCustomizedModule,
                HttpClientTestingModule,
                SessionTimerModule
            ],
            declarations: [TestComponent],
            providers: [
                ConfigService,
                HttpLastRequestService
            ]
        });

        testBedHelper = new TestBedHelper<TestComponent>(TestComponent)
            .onCreated((context: TestBedHelperContext<TestComponent>) => {
                fixture = context.fixture;
                component = context.component;
                httpLastRequestService = TestBed.inject(HttpLastRequestService) as HttpLastRequestService;
            });

    }));


    describe('When initialize', () => {

        const getSecondsToFireSessionEnd = () => {
            return 60 * component.sessionTimeoutInMinutes;
        };

        it('should emit "sessionExpired" when timeout', fakeAsync(() => {
            testBedHelper
                .create()
                .then(() => {
                    tick((getSecondsToFireSessionEnd()) * 1000);
                    testBedHelper.fixtureDetectChanges(fixture);

                    expect(component.callbackFired).toEqual(true);
                    expect(component.callbackResultKeppAlive).toEqual(false);
                });
        }));

        it('should reset Timer when an Http Request Occur', fakeAsync(() => {
            testBedHelper
                .create()
                .then(() => {

                    // wait half of the time to emit Session End
                    tick((getSecondsToFireSessionEnd() / 2) * 1000);
                    testBedHelper.fixtureDetectChanges(fixture);

                    // simulate an Http Request to reset timer
                    const httpHandler = { handle: (req: HttpRequest<any>) => { } } as HttpHandler;
                    httpLastRequestService.setLastRequest(new HttpRequest('GET', '/', {}), httpHandler);

                    // at this point if timer was reset propperly
                    // component should be able to wait another half time
                    // without firing Session End event
                    tick((getSecondsToFireSessionEnd() / 2) * 1000);
                    testBedHelper.fixtureDetectChanges(fixture);

                    expect(component.callbackFired).toEqual(false);
                    expect(component.callbackResultKeppAlive).toBeNull();

                    // then, waiting half of the time again should fire Session End event
                    tick((getSecondsToFireSessionEnd() / 2) * 1000);
                    testBedHelper.fixtureDetectChanges(fixture);

                    expect(component.callbackFired).toEqual(true);
                    expect(component.callbackResultKeppAlive).toEqual(false);
                });
        }));

        it('should be able to "keep working" when user clicks on the right button', fakeAsync(() => {
            testBedHelper
                .create()
                .then(() => {

                    const timePercentageToOpenModal = component.sessionTimerComponent.timePercentageToOpenModal;
                    // wait to see confirmation modal
                    const secondsToOpenConfirmModal = (getSecondsToFireSessionEnd() * timePercentageToOpenModal) / 100;
                    tick(secondsToOpenConfirmModal * 1000);
                    testBedHelper.fixtureDetectChanges(fixture);

                    component.sessionTimerComponent.modalInstance.okClicked();

                    tick(1000);
                    testBedHelper.fixtureDetectChanges(fixture);

                    expect(component.callbackFired).toEqual(true);
                    expect(component.callbackResultKeppAlive).toEqual(true);

                    tick(getSecondsToFireSessionEnd() * 1000);
                    testBedHelper.fixtureDetectChanges(fixture);

                });
        }));

        it('should be able to destroy component and unsubscribe from timers', fakeAsync(() => {
            testBedHelper
                .create()
                .then(() => {

                    const timePercentageToOpenModal = component.sessionTimerComponent.timePercentageToOpenModal;
                    // // wait to see confirmation modal
                    const secondsToOpenConfirmModal = (getSecondsToFireSessionEnd() * timePercentageToOpenModal) / 100;

                    component.sessionTimerComponent.ngOnDestroy();

                    // at this point timers has been unsubscribe
                    tick(secondsToOpenConfirmModal * 1000);
                    testBedHelper.fixtureDetectChanges(fixture);

                    // so, it does not matter how much time has gone
                    // because it won't trigger session-end event
                    expect(component.callbackFired).toEqual(false);
                    expect(component.callbackResultKeppAlive).toBeNull();
                });
        }));

    });

});
