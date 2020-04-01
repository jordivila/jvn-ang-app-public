import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { TestBedHelper, TestBedHelperContext } from '../../../../testing/testbed-helper';
import { FilterComponent } from '../../../shared/components/crud/filter/filter.component';
import { crudTestModuleMetadata } from '../crud-sample.module.spec';
import { CrudSampleFilterComponent } from './crud-sample-filter.component';



describe('Crud GridFilter Sample', () => {
  let component: CrudSampleFilterComponent;
  let fixture: ComponentFixture<CrudSampleFilterComponent>;
  let testBedHelper: TestBedHelper<CrudSampleFilterComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule(crudTestModuleMetadata);

    testBedHelper = new TestBedHelper<CrudSampleFilterComponent>(CrudSampleFilterComponent)
      .onCreated((context: TestBedHelperContext<CrudSampleFilterComponent>) => {
        fixture = context.fixture;
        component = context.component;
      });

  }));

  describe('When component is created', () => {

    beforeEach(fakeAsync(() => {
      return testBedHelper
        .onBeforeInit((comp) => {
          spyOn(comp.isOpenChanged, 'emit').and.callThrough();
          spyOn(FilterComponent.prototype, 'cancelClick').and.callThrough();
          spyOn(comp, 'onFilterToggleClick').and.callThrough();
        })
        .create();
    }));

    it('should initialize properly', fakeAsync(() => {
      expect(component).toBeTruthy();
    }));

    it('should call Base Class when cancel button clicked', fakeAsync(() => {
      component.cancelClick(new Event('click'));
      expect(FilterComponent.prototype.cancelClick).toHaveBeenCalled();
      expect(component.onFilterToggleClick).toHaveBeenCalled();
    }));

    it('should change filter visibility when toggle filter is click', fakeAsync(() => {
      component.onFilterToggleClick(new Event('click'), false);
      expect(component.isOpen).toEqual(false);
      expect(component.isOpenChanged.emit).toHaveBeenCalledWith(false);

      component.onFilterToggleClick(new Event('click'), true);
      expect(component.isOpen).toEqual(true);
      expect(component.isOpenChanged.emit).toHaveBeenCalledWith(true);
    }));

  });

  describe('When Validating', () => {

    const expectValidation = (shouldBeValid: boolean, theValue) => {
      component.value = theValue;
      component.searchClick();
      expect(component.filterbuttonEnabled).toEqual(shouldBeValid);
    };

    const filterValue = {
      userID: '',
      cidPid: '',
      accountStatus: '',
      applicationId: '',
      roleId: '',
    };

    beforeEach(fakeAsync(() => {
      return testBedHelper
        .onBeforeInit((comp) => {
          spyOn(comp.searchEvent, 'emit').and.callThrough();
        })
        .create();
    }));

    it(`should NOT enable filter button if filter form value is NOT valid`, () => {
      filterValue.userID = '   '; // requiredTrim validation
      expectValidation(false, filterValue);

      filterValue.userID = '123'; // invalid because required minlength 4
      expectValidation(false, filterValue);

      filterValue.userID = '01234567890'.padStart(200, 'X'); // invalid because required maxLength 100
      expectValidation(false, filterValue);
    });

    it(`should enable filter button if filter form value is NOT valid`, () => {
      filterValue.userID = 'a_valid_user_name';
      expectValidation(true, filterValue);
    });

  });

});
