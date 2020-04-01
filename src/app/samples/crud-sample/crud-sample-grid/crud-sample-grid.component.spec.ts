import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { TestBedHelper, TestBedHelperContext } from '../../../../testing/testbed-helper';
import { Filter } from '../../../shared/components/crud/filter/models/filter';
import { GridMaterialComponent } from '../../../shared/components/crud/grid/grid.component';
import { GridButton } from '../../../shared/components/crud/grid/models/grid-button';
import { PaginatedResults } from '../../../shared/components/crud/grid/models/pagination';
import { crudTestModuleMetadata } from '../crud-sample.module.spec';
import { CrudGridActionEventArgs, CrudSampleGridComponent } from './crud-sample-grid.component';
import { CrudState } from 'src/app/shared/components/crud/reducers/crud.store';
import { provideMockStore } from '@ngrx/store/testing';
import { UserRow } from 'src/app/core/api/user/user-api.dto';
import { userServiceMockListDataCreate } from 'src/app/core/api/user/user-api.mock';
import { i18nMessages } from 'src/app/core/services/i18n/i18n.config';
import { UserApiService } from 'src/app/core/api/user/user-api.service';
import { cold } from 'jasmine-marbles';

describe('Crud Grid Sample', () => {
  let component: CrudSampleGridComponent;
  let fixture: ComponentFixture<CrudSampleGridComponent>;
  let testBedHelper: TestBedHelper<CrudSampleGridComponent>;

  let filterValue: Filter;
  let listData: PaginatedResults<UserRow>;

  beforeEach(async(() => {

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
          list: jasmine.createSpy()
        }
      }
    );

    TestBed.configureTestingModule(crudTestModuleMetadata);

    testBedHelper = new TestBedHelper<CrudSampleGridComponent>(CrudSampleGridComponent)
      .onCreated((context: TestBedHelperContext<CrudSampleGridComponent>) => {
        fixture = context.fixture;
        component = context.component;
      });

  }));

  beforeEach(() => {
    filterValue = {
      userID: 'someUserID',
      cidPid: 'cidPid',
      accountStatus: '',
      applicationId: '',
      roleId: '',
    };

    const tempData = userServiceMockListDataCreate();

    listData = {
      total: tempData.length,
      results: tempData.reduce<UserRow[]>((previous: UserRow[], current: UserRow) => {
        if (previous.length < 10) {
          return [...previous, current];
        } else {
          return previous;
        }
      }, [])
    };
  });

  describe('When initialize', () => {

    beforeEach(fakeAsync(() => {
      return testBedHelper
        .onBeforeInit((comp) => {
          spyOn(GridMaterialComponent.prototype, 'ngOnInit').and.callThrough();
          spyOn(comp.actionTriggeredEvent, 'emit').and.callThrough();
        })
        .create()
        .then(() => { });
    }));

    it('should initialize properly', fakeAsync(() => {
      expect(GridMaterialComponent.prototype.ngOnInit).toHaveBeenCalled();
      expect(component.isFilterOpen).toEqual(false);
      expect(component.gridButtons[0].text).toEqual(i18nMessages.crudFilterExpand.addUser);
    }));

    it('should emit Action Event when Add Button is clicked', fakeAsync(() => {
      const btnAdd = component.gridButtons.find((btn: GridButton) => btn.text === i18nMessages.crudFilterExpand.addUser);
      btnAdd.onClickCallback(new Event('click'));
      const spyCall = ((component.actionTriggeredEvent.emit) as jasmine.Spy).calls.mostRecent();
      expect(spyCall.args[0] instanceof CrudGridActionEventArgs).toEqual(true);
      expect((spyCall.args[0] as CrudGridActionEventArgs).type).toEqual('add');
      expect((spyCall.args[0] as CrudGridActionEventArgs).item).toBeNull();
    }));

  });

  describe('When filter toggle is clicked', () => {

    beforeEach(fakeAsync(() => {
      return testBedHelper.create();
    }));

    it('should change the value of "isFilterOpen"', fakeAsync(() => {
      component.onFilterToggleClick(false);
      expect(component.isFilterOpen).toEqual(false);

      component.onFilterToggleClick(true);
      expect(component.isFilterOpen).toEqual(true);
    }));

  });

  describe('When search event is fired and Search result is Ok', () => {

    let serviceApiMock: jasmine.SpyObj<UserApiService>;

    beforeEach(fakeAsync(() => {
      return testBedHelper
        .onBeforeCreate(() => {
          // spyOn(userServiceMock, 'list').and.returnValue(of(listData));
        })
        .onBeforeInit((comp) => {

          serviceApiMock = TestBed.inject(UserApiService) as jasmine.SpyObj<UserApiService>;
          serviceApiMock.list.and.returnValue(cold('-a|', {
            a: {
              total: 0,
              results: []
            } as PaginatedResults<UserRow>
          }));

          spyOn(comp, 'searchEvent').and.callThrough();
          spyOn(comp.actionTriggeredEvent, 'emit').and.callThrough();
        })
        .create()
        .then(() => {
          component.onFilterToggleClick(true);
          component.filter.value = filterValue;
          component.filter.searchClick();
        });
    }));

    xit('should invoke SearchEvent and set isFilterOpen to false', fakeAsync(() => {
      expect(component.searchEvent).toHaveBeenCalled();
      expect(component.isFilterOpen).toEqual(false);
    }));

    it('should emit Action Event when Row is clicked', fakeAsync(() => {

      component.onRowClick(listData[0]);
      const spyCall = ((component.actionTriggeredEvent.emit) as jasmine.Spy).calls.mostRecent();

      expect(spyCall.args[0] instanceof CrudGridActionEventArgs).toEqual(true);
      expect((spyCall.args[0] as CrudGridActionEventArgs).type).toEqual('edit');
      expect((spyCall.args[0] as CrudGridActionEventArgs).item).toEqual(listData[0]);
    }));


  });

});
