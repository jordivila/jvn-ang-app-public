import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBedHelper, TestBedHelperContext } from '../../../../../testing/testbed-helper';
import { MaterialModule } from '../../material/material.module';
import { ModalBaseComponent } from '../base/modal.component';
import { ModalWrapperModule } from '../modal.module';
import { ModalHelperComponent } from './modal-helper.component';
import { StoreModule } from '@ngrx/store';
import { modalReducer } from '../reducers/modal.reducers';
import { modalFeatureKey } from '../reducers/modal.selectors';
import { rootStoreConfig } from '../../../../app.store';
import { ConfigService } from '../../../../core/services/config/config.service';
import { i18nMessages } from '../../../../core/services/i18n/i18n.config';



@Component({
    selector: 'app-test-cmp',
    template: '<app-modal-helper></app-modal-helper>'
})

class TestComponent {
    @ViewChild(ModalHelperComponent, { static: false }) modalHelper: ModalHelperComponent;
}

describe('Modal Helper ', () => {

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let testBedHelper: TestBedHelper<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MaterialModule,
                ModalWrapperModule,
                NoopAnimationsModule,
                StoreModule.forRoot({ [modalFeatureKey]: modalReducer }, rootStoreConfig)
            ],
            declarations: [TestComponent],
            providers: [
                ConfigService,
            ]
        });

        testBedHelper = new TestBedHelper<TestComponent>(TestComponent)
            .onCreated((context: TestBedHelperContext<TestComponent>) => {
                fixture = context.fixture;
                component = context.component;
            });

    }));

    describe('When initialize', () => {

        beforeEach(fakeAsync(() => {
            return testBedHelper
                .onBeforeInit((comp) => {

                })
                .create();
        }));


        const expectModalToExistsInDOM = (modal: ModalBaseComponent, title: string, body: string) => {
            const html = fixture.nativeElement as HTMLElement;
            expect(html.querySelectorAll('div.modal-dialog').length).toEqual(1);
            expect(modal.title).toEqual(title);
            expect(modal.body).toEqual(body);
        };

        const expectModalToNOTExistsInDOM = () => {
            const html = fixture.nativeElement as HTMLElement;
            expect(html.querySelectorAll('div.modal-dialog').length).toEqual(0);
        };

        const expectStandardModalBehaviour = (modal: ModalBaseComponent, title: string, body: string) => {
            let isClosed = false;
            expectModalToExistsInDOM(modal, title, body);
            modal.closeEvent.subscribe(() => isClosed = true);
            modal.modalHidden();
            expect(isClosed).toEqual(true);
            expectModalToNOTExistsInDOM();
        };

        it('should be able to open "success" modal, closeit and remove it from DOM', fakeAsync(() => {
            const title = 'Success';
            const body = 'a message';
            const modal = component.modalHelper.success(body);
            expectStandardModalBehaviour(modal, title, body);
        }));

        it('should be able to open "error" modal, closeit and remove it from DOM', fakeAsync(() => {
            const title = 'Error';
            const body = 'a message';
            const modal = component.modalHelper.error(body);
            expectStandardModalBehaviour(modal, title, body);
        }));

        it('should be able to open "warning" modal, closeit and remove it from DOM', fakeAsync(() => {
            const title = 'Warning';
            const body = 'a message';
            const modal = component.modalHelper.warning(body);
            expectStandardModalBehaviour(modal, title, body);
        }));

        it('should be able to open "info" modal, closeit and remove it from DOM', fakeAsync(() => {
            const title = 'Info';
            const body = 'a message';
            const modal = component.modalHelper.info(body);
            expectStandardModalBehaviour(modal, title, body);
        }));

        it(`should be able to open "Confirm" modal, closeit, remove it from DOM
            and Get Confirm Result
            when answer is false`, fakeAsync(() => {
                let callbackInvoked = false;
                let callBackResult: boolean = null;
                let isClosed = false;

                const body = 'a message';
                const modal = component.modalHelper.confirm(body, (result: boolean) => {
                    callbackInvoked = true;
                    callBackResult = result;
                });


                modal.closeEvent.subscribe(() => isClosed = true);
                testBedHelper.fixtureDetectChanges(fixture);
                modal.koClicked();
                tick(1000);

                expect(isClosed).toEqual(true);
                expect(callbackInvoked).toEqual(true);
                expect(callBackResult).toEqual(false);
                expectModalToNOTExistsInDOM();
            }));

        it(`should be able to open "Confirm" modal, closeit, remove it from DOM
            and Get Confirm Result
            when answer is true`, fakeAsync(() => {
                let callbackInvoked = false;
                let callBackResult: boolean = null;
                let isClosed = false;

                const body = 'a message';
                const modal = component.modalHelper.confirm(body, (result: boolean) => {
                    callbackInvoked = true;
                    callBackResult = result;
                });


                modal.closeEvent.subscribe(() => isClosed = true);
                testBedHelper.fixtureDetectChanges(fixture);
                modal.okClicked();
                tick(1000);

                expect(isClosed).toEqual(true);
                expect(callbackInvoked).toEqual(true);
                expect(callBackResult).toEqual(true);
                expectModalToNOTExistsInDOM();
            }));

        it('should be able to open "Timeout" modal and close it automatically in case no answer provided by the user', fakeAsync(() => {
            let isClosed = false;
            let callbackInvoked = false;
            let callBackResult: boolean = null;
            const secondsToClose = 3;
            const secondsToStart = 1;
            const title = 'You will be signed out in';
            const body = 'What do you want to do?';
            const modal = component.modalHelper.timeout(
                title,
                body,
                secondsToClose,
                secondsToStart,
                (result: boolean) => {
                    callbackInvoked = true;
                    callBackResult = result;
                });

            modal.closeEvent.subscribe(() => isClosed = true);
            expectModalToExistsInDOM(modal, title, body);
            expect(callbackInvoked).toEqual(false);
            expect(callBackResult).toBeNull();
            expect(isClosed).toEqual(false);

            tick((secondsToClose + 1) * 1000);
            testBedHelper.fixtureDetectChanges(fixture);
            // TODO: find out why do I need to do tick twice :((
            tick((secondsToClose + 1) * 1000);
            testBedHelper.fixtureDetectChanges(fixture);

            expect(isClosed).toEqual(true);
            expect(callbackInvoked).toEqual(true);
            expect(callBackResult).toEqual(false);
            expectModalToNOTExistsInDOM();
        }));



    });
});
