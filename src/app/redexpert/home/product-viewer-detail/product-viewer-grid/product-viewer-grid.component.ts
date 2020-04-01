import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, finalize, tap } from 'rxjs/operators';
import { gridRowExpand } from '../../../../shared/animations/row-expand';
import { toggleFade, toggleIt } from '../../../../shared/animations/toggle';

import { Filter } from '../../../../shared/components/crud/filter/models/filter';
import { GridMaterialComponent } from '../../../../shared/components/crud/grid/grid.component';
import { GridButton } from '../../../../shared/components/crud/grid/models/grid-button';
import {
  PaginatedResults,
  PaginationModel,
  PaginationUrlHelper,
  PaginationModelMapper
} from '../../../../shared/components/crud/grid/models/pagination';
import { SortModel } from '../../../../shared/components/crud/grid/models/sort';
import { GuidHelper } from '../../../../shared/helpers/guid-helper';
import { OfflineModuleMetadata, ProductViewerGridRow } from '../../api/offline-module-data/offline-module-data-api.dto';
import { ProductViewerFilterComponent } from '../product-viewer-filter/product-viewer-filter.component';
import { Store } from '@ngrx/store';
import { CrudState } from '../../../../shared/components/crud/reducers/crud.store';
import { i18nMessages } from '../../../../core/services/i18n/i18n.config';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { BusyIndicatorService } from 'src/app/core/services/busy-indicator/busy-indicator.service';

export class ProductViewerGridActionEventArgs {
  constructor(public type: RowActionType, public item: ProductViewerGridRow) { }
}

export type RowActionType = 'show_chart' | 'multiline_chart';


@Component({
  selector: 'app-product-viewer-grid',
  templateUrl: './product-viewer-grid.component.html',
  styleUrls: ['./product-viewer-grid.component.scss'],
  animations: [toggleIt, toggleFade, gridRowExpand]
})
export class ProductViewerGridComponent
  extends GridMaterialComponent<
  ProductViewerGridRow,
  Filter,
  ProductViewerFilterComponent>
  implements OnInit, AfterViewInit {

  private static gridStoreIdStaticValue = GuidHelper.create().value;
  public displayedColumns = [];
  public displayedColumnsHash = {};
  public initMessage = i18nMessages.redexpert.standardModules.filter.initMessage;
  public noDataFoundMessage = i18nMessages.redexpert.standardModules.filter.noDataFoundMessage;
  public rightPanelFilterTitle = i18nMessages.redexpert.standardModules.filter.rightPanelFilterTitle;
  public isFilterOpen: boolean;
  public gridButtons: GridButton[];
  public expandedElement: ProductViewerGridRow;
  public firstSearchFired = false; // this component will fire a search on the first load. This way data will always be present on the grid

  @Input() offlineMetadata: OfflineModuleMetadata;
  @Output() actionTriggeredEvent = new EventEmitter<ProductViewerGridActionEventArgs>();

  constructor(
    private busyIndicatorService: BusyIndicatorService,
    protected store: Store<{ crudState: CrudState }>,
    protected changeDetectionRef: ChangeDetectorRef,
    protected notificationService: NotificationService) {

    super(store, changeDetectionRef, notificationService);
  }

  gridStoreId = () => ProductViewerGridComponent.gridStoreIdStaticValue;

  ngOnInit() {
    super.ngOnInit();
    this.isFilterOpen = false;
    this.gridButtons = this.initGridButtons();
    this.initDisplayedColumns();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.setDefaultModel({
      current: '',
      current2: ''
    },
      PaginationModelMapper.mapFromMatPaginator(this.paginator),
      {
        sortBy: this.sort.active,
        sortAsc: this.sort.direction === 'asc'
      } as SortModel);
  }

  onFilterToggleClick(showFilter: boolean) {
    this.isFilterOpen = showFilter;
  }

  onRowClick(row: ProductViewerGridRow) {
    if (this.expandedElement === row) {
      this.expandedElement = null;
    } else {
      this.expandedElement = row;
    }
  }

  onRowActionClick(row: ProductViewerGridRow, action: RowActionType) {
    this.actionTriggeredEvent.emit(new ProductViewerGridActionEventArgs(action, row));
  }


  searchEvent(filterValue: any, paginationModel: PaginationModel, sortModel: SortModel):
    Observable<PaginatedResults<ProductViewerGridRow>> {

    this.busyIndicatorService.show('');

    const paginationModelHelper = PaginationUrlHelper.toUrlModel(paginationModel);
    const paginationSortCallback = this.searchEventGetSortComparer(sortModel);
    const results = this.offlineMetadata.endpoints[1].value.Data
      .sort(paginationSortCallback)
      .slice(paginationModelHelper.skip, paginationModelHelper.top);

    return of({
      results,
      total: this.offlineMetadata.endpoints[1].value.Data.length
    }).pipe(
      delay(50),
      tap(dataResults => { this.isFilterOpen = false; }),
      finalize(() => {
        this.isFilterOpen = false;
        this.busyIndicatorService.hide();
      })
    );
  }

  private searchEventGetSortComparer(sortModel: SortModel): ((a: any, b: any) => number) {
    return (a, b) => {
      if (a[sortModel.sortBy] < b[sortModel.sortBy]) { return sortModel.sortAsc ? 1 : -1; }
      if (a[sortModel.sortBy] > b[sortModel.sortBy]) { return sortModel.sortAsc ? -1 : 1; }
      return 0;
    };
  }


  private initGridButtons() {
    return [];
  }

  private initDisplayedColumns() {
    const domParser = new DOMParser();

    this.displayedColumns =
      (this.offlineMetadata.endpoints[2].value.GridColumns)
        .reduce((before, item, index) => {
          if (!item.Settings.hidden && (index < 5)) {
            before.push(item.field);
          }

          item.Settings.title = domParser.parseFromString(item.Settings.title, 'text/html').documentElement.textContent;

          this.displayedColumnsHash[item.field] = item;

          return before;
        }, []);
  }

}
