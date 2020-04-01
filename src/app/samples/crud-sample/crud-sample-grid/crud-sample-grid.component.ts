import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { toggleFade, toggleIt } from '../../../shared/animations/toggle';
import { GridMaterialComponent } from '../../../shared/components/crud/grid/grid.component';
import { GridButton } from '../../../shared/components/crud/grid/models/grid-button';
import { PaginatedResults, PaginationModel } from '../../../shared/components/crud/grid/models/pagination';
import { SortModel } from '../../../shared/components/crud/grid/models/sort';
import { GuidHelper } from '../../../shared/helpers/guid-helper';
import { CrudSampleFilterComponent, CrudFilter } from '../crud-sample-filter/crud-sample-filter.component';
import { Store } from '@ngrx/store';
import { CrudState } from 'src/app/shared/components/crud/reducers/crud.store';
import { UserRow } from 'src/app/core/api/user/user-api.dto';
import { i18nMessages } from 'src/app/core/services/i18n/i18n.config';
import { UserApiService } from 'src/app/core/api/user/user-api.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { BusyIndicatorService } from 'src/app/core/services/busy-indicator/busy-indicator.service';


export class CrudGridActionEventArgs {
  constructor(public type: 'add' | 'edit', public item: UserRow) { }
}

@Component({
  selector: 'app-crud-sample-grid',
  templateUrl: './crud-sample-grid.component.html',
  styleUrls: ['./crud-sample-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [toggleIt, toggleFade]
})
export class CrudSampleGridComponent
  extends GridMaterialComponent<
  UserRow,
  CrudFilter,
  CrudSampleFilterComponent>
  implements OnInit, AfterViewInit {

  private static gridStoreIdStaticValue = GuidHelper.create().value;
  public displayedColumns = ['userId', 'loginName', 'fullName', 'email'];
  public initMessage = i18nMessages.crudFilterExpand.initMessage;
  public noDataFoundMessage = i18nMessages.crudFilterExpand.noDataFoundMessage;
  public isFilterOpen: boolean;
  public gridButtons: GridButton[];


  @Output() actionTriggeredEvent = new EventEmitter<CrudGridActionEventArgs>();

  constructor(
    private userService: UserApiService,
    protected store: Store<{ crudState: CrudState }>,
    protected changeDetectionRef: ChangeDetectorRef,
    protected notificationService: NotificationService,
    protected busyIndicator: BusyIndicatorService) {

    super(store, changeDetectionRef, notificationService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.isFilterOpen = false;
    this.gridButtons = this.initGridButtons();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  onFilterToggleClick(showFilter: boolean) {
    this.isFilterOpen = showFilter;
  }


  onRowClick(row: UserRow) {
    this.actionTriggeredEvent.emit(new CrudGridActionEventArgs('edit', row));
  }

  searchEvent(filterValue: any, paginationModel: PaginationModel, sortModel: SortModel):
    Observable<PaginatedResults<UserRow>> {
    this.busyIndicator.show('');


    return this.userService
      .list(filterValue, paginationModel, sortModel)
      .pipe(
        tap(dataResults => {
          this.isFilterOpen = false;
        }),
        finalize(() => {
          this.busyIndicator.hide();
        })
      );
  }

  gridStoreId = () => CrudSampleGridComponent.gridStoreIdStaticValue;

  private initGridButtons(): GridButton[] {
    return [
      {
        text: i18nMessages.crudFilterExpand.addUser,
        iconClass: 'add',
        buttonClass: 'btn-plain',
        onClickCallback: ($event: any) => {
          this.actionTriggeredEvent.emit(new CrudGridActionEventArgs('add', null));
        }
      },
    ];
  }
}
