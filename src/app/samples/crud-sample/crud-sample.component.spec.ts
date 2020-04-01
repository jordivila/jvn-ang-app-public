import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { TestBedHelper, TestBedHelperContext } from './../../../testing/testbed-helper';
import { CrudGridActionEventArgs } from './crud-sample-grid/crud-sample-grid.component';
import { CrudSampleComponent } from './crud-sample.component';
import { crudTestModuleMetadata } from './crud-sample.module.spec';
import { UserRow } from 'src/app/core/api/user/user-api.dto';
import { userServiceMockListDataCreate } from 'src/app/core/api/user/user-api.mock';


describe('Crud Sample Component', () => {
    let component: CrudSampleComponent;
    let fixture: ComponentFixture<CrudSampleComponent>;
    let testBedHelper: TestBedHelper<CrudSampleComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule(crudTestModuleMetadata);

        testBedHelper = new TestBedHelper<CrudSampleComponent>(CrudSampleComponent)
            .onCreated((context: TestBedHelperContext<CrudSampleComponent>) => {
                fixture = context.fixture;
                component = context.component;
            });

    }));

    describe('When component is created', () => {

        beforeEach(fakeAsync(() => {
            return testBedHelper
                .onBeforeInit((comp) => {

                })
                .create();
        }));

        it('should initialize properly', fakeAsync(() => {
            expect(component.isOpen).toEqual(false);
            expect(component.selectedUserId).toBeNull();
        }));

        it('should close form when "onFormClose" is invoked', fakeAsync(() => {
            component.onFormClose();
            expect(component.isOpen).toEqual(false);
        }));

        it('should prepare Form when an Add action is invoked', fakeAsync(() => {
            const eventArgs = new CrudGridActionEventArgs('add', null);
            component.onActionTriggeredEvent(eventArgs);
            expect(component.isOpen).toEqual(true);
            expect(component.selectedUserId).toEqual(null);
        }));

        it('should prepare Form when an Edit action is invoked', fakeAsync(() => {
            const user = userServiceMockListDataCreate()[0];
            const eventArgs = new CrudGridActionEventArgs('edit', user as UserRow);
            component.onActionTriggeredEvent(eventArgs);
            expect(component.isOpen).toEqual(true);
            expect(component.selectedUserId).toEqual(user.userId);
        }));

    });

});
