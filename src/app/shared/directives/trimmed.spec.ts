import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { TestBedHelper, TestBedHelperContext } from 'src/testing/testbed-helper';
import { TrimmedInputDirective } from './trimmed';

@Component({
    selector: 'app-test-cmp',
    template: `<input [trim] #theInput />`
})
class TestComponent {

    @ViewChild(TrimmedInputDirective, { static: false }) sut: TrimmedInputDirective;

    constructor() { }
}

describe('Input System of Unit Value Component', () => {

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let testBedHelper: TestBedHelper<TestComponent>;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, TrimmedInputDirective],
        });
    }));

    beforeEach(fakeAsync(() => {
        testBedHelper = new TestBedHelper<TestComponent>(TestComponent)
            .onBeforeInit((comp) => {

            })
            .onCreated((context: TestBedHelperContext<TestComponent>) => {
                fixture = context.fixture;
                component = context.component;
            });

        testBedHelper
            .create()
            .then(() => {

            });
    }));

    it('should create component with empty value', fakeAsync(() => {
        expect(component).toBeTruthy();
        expect(component.sut).toBeTruthy();

        const event = {
            target: {
                value: ' a string with some white spaces at the beginning & at then end    '
            }
        };

        const eventExpected = {
            target: {
                value: 'a string with some white spaces at the beginning & at then end'
            }
        };

        component.sut.onchange(event);

        expect(event.target.value).toEqual(eventExpected.target.value);
    }));

});
