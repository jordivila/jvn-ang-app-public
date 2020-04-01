import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from 'src/app/core/core.module';
import { UnitSystemDto } from 'src/app/core/api/units/units-api.dto';
import { CustomValidators } from 'src/app/shared/services/validation/validation.service';
import { TestBedHelper, TestBedHelperContext } from 'src/testing/testbed-helper';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputSystemOfUnitFormFieldComponent } from './input-system-of-unit-form-field.component';
import { inputSystemOfUnitDtoForTestingForTesting } from '../input-system-of-unit/input-system-of-unit.component.spec.const';

@Component({
  selector: 'app-test-cmp',
  template: `
    <form
        [formGroup]="theForm"
        (ngSubmit)="saveForm()"
        #theFormSpy="ngForm">
        <app-input-system-of-unit-form-field
          [theLabel]="'the Labale Value'"
          [theSystemOfUnit]="theUnitSystem"
          [theForm]="theForm"
          [theFormControlName]="'theInput'">
        </app-input-system-of-unit-form-field>
    </form>`
})
class TestComponent implements OnInit {

  theForm: FormGroup;
  theInitialValue: string;
  theUnitSystem: UnitSystemDto;

  @ViewChild(InputSystemOfUnitFormFieldComponent, { static: false }) sut: InputSystemOfUnitFormFieldComponent;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.theUnitSystem = inputSystemOfUnitDtoForTestingForTesting;
    this.theForm = this.initFormGroup();
  }

  initFormGroup = (): FormGroup => {
    return this.formBuilder.group({
      theInput: new FormControl(
        this.theInitialValue, [
        CustomValidators.requiredWithTrim,
        CustomValidators.numberValidator,
        Validators.min(0),
        Validators.min(500)]
      )
    });
  }
}

describe('Input System of Unit Value Form Field', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let testBedHelper: TestBedHelper<TestComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        CoreModule.forRoot(),
        SharedModule
      ],
      declarations: [TestComponent],
      providers: []
    });
  }));


  describe('When initialize', () => {

    describe('And form has no value', () => {

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
        expect(component.theForm.value).toEqual({ theInput: null });
        expect(component.theForm.valid).toEqual(false);
      }));

    });

    describe('And form has a default value', () => {

      const theInputValueExpected = '3';

      beforeEach(fakeAsync(() => {
        testBedHelper = new TestBedHelper<TestComponent>(TestComponent)
          .onBeforeInit((comp) => {
            comp.theInitialValue = theInputValueExpected;
          })
          .onCreated((context: TestBedHelperContext<TestComponent>) => {
            fixture = context.fixture;
            component = context.component;
          });
      }));

      it('should create component and return expected value', fakeAsync(() => {
        testBedHelper
          .create()
          .then(() => {
            expect(component).toBeTruthy();
            expect(component.theForm.value).toEqual({ theInput: theInputValueExpected });
          });
      }));

    });

  });

});
