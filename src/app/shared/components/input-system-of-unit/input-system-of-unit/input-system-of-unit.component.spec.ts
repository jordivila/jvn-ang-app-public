import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from 'src/app/core/core.module';
import { UnitSystemDto } from 'src/app/core/api/units/units-api.dto';
import { By } from '@angular/platform-browser';
import { inputSystemOfUnitDtoForTestingForTesting } from './input-system-of-unit.component.spec.const';
import { InputSystemOfUnitComponent } from './input-system-of-unit.component';
import { CustomValidators } from 'src/app/shared/services/validation/validation.service';
import { TestBedHelper, TestBedHelperContext } from 'src/testing/testbed-helper';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-test-cmp',
  template: `
    <form
        [formGroup]="theForm"
        (ngSubmit)="saveForm()"
        #theFormSpy="ngForm">
        <mat-form-field>
            <app-input-system-of-unit
                [label]="'theInput label'"
                [unitSystem]="theUnitSystem"
                formControlName="theInput">
            </app-input-system-of-unit>
            <mat-error>
                <app-control-messages controlLabel="theInput" [control]="theForm.controls.theInput"></app-control-messages>
            </mat-error>
        </mat-form-field>
    </form>`
})
class TestComponent implements OnInit {

  theForm: FormGroup;
  theInitialValue: string;
  theUnitSystem: UnitSystemDto;

  @ViewChild(InputSystemOfUnitComponent, { static: false }) sut: InputSystemOfUnitComponent;

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

describe('Input System of Unit Value Component', () => {

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

      it('should set dropdown value to Unit System JSON data "Base" value', fakeAsync(() => {
        expect(component.sut.theUnitSystemListItemSelected).toEqual(inputSystemOfUnitDtoForTestingForTesting.Base);
      }));

      describe('And user types in a number', () => {

        beforeEach(() => {
          const queryByCssPath = (cssPath) => fixture.debugElement.queryAll(By.css(cssPath))[0].nativeElement;
          const theInputEl = queryByCssPath(`input`);
          theInputEl.value = 6;
          theInputEl.dispatchEvent(new Event('input'));
        });

        it('should multiply (Number * Factor selected) when getting component value', fakeAsync(() => {
          expect(component.theForm.valid).toEqual(false);
          expect(component.sut.value).toEqual('6');
        }));

        describe('And user selects a different Unit System Prefix', () => {
          it('should return value equals to (Number * Factor selected)', fakeAsync(() => {
            component.sut.theUnitSystemListItemSelected = inputSystemOfUnitDtoForTestingForTesting.Prefixes[1000].Factor;
            component.sut._handleInput();
            expect(component.theForm.valid).toEqual(true);
            expect(component.sut.value).toEqual('6000');
          }));
        });
      });
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

      it('should create component and return ecpected value', fakeAsync(() => {
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
