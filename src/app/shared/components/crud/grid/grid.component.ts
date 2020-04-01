import { AfterViewInit, ChangeDetectorRef, EventEmitter, OnInit, ViewChild, OnDestroy, AfterViewChecked } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, map, switchMap, last, take, filter } from 'rxjs/operators';
import { Guid } from '../../../helpers/guid';
import { CrudState, GridSearch } from '../reducers/crud.store';
import { FilterComponent } from '../filter/filter.component';
import { Filter } from '../filter/models/filter';
import { CrudGridMessagesComponent } from './crud-grid-messages/crud-grid-messages.component';
import { GridStorable, GridStore } from './models/grid-storable';
import { PaginatedResults, PaginationModel, PaginationEventArgs, PaginationModelMapper } from './models/pagination';
import { SortModel } from './models/sort';
import { Store, select } from '@ngrx/store';
import { crudGridSearchSet, GridSearchSetActionParam } from '../reducers/crud.actions';
import { NotificationService } from '../../../../core/services/notification/notification.service';


export abstract class
    GridMaterialComponent<
    TRow,
    TFilterType extends Filter,
    TFilterComponent extends FilterComponent<TFilterType>>
    implements OnInit, GridStorable, AfterViewInit, AfterViewChecked, OnDestroy {

    public gridStoreId: () => Guid;
    public dataSource = new MatTableDataSource();
    public isLoading: boolean;
    public isErrorThrown: boolean;
    public isEmptyMessageShown: boolean;
    public isInitMessageShown: boolean;
    public isCrudMessageVisible: boolean;
    public resultsLength = 0;
    public initMessage = 'Use filter to search';
    public noDataFoundMessage = 'No data found';
    public errorMessage = 'Error fecthing data';

    protected gridStoreInitEvent = new EventEmitter();
    private currentCrudState: CrudState;
    private storeSubscription: Subscription;
    private defaultModel: {
        filterValue: Filter,
        paginationModel: PaginationModel,
        sortModel: SortModel
    } = null;
    private isDefaultModelSet = false;


    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild('TFilterComponent', { static: false }) filter: TFilterComponent;
    @ViewChild(CrudGridMessagesComponent, { static: false }) crudMessages: CrudGridMessagesComponent;

    constructor(
        protected store: Store<{ crudState: CrudState }>,
        protected changeDetectionRef: ChangeDetectorRef,
        protected notificationService: NotificationService) {

    }

    abstract searchEvent(
        filterValue: Filter,
        paginationModel: PaginationModel | PaginationEventArgs,
        sortModel: SortModel): Observable<PaginatedResults<TRow>>;

    ngOnInit() {
        this.storeSubscription =
            this.store.pipe(
                select('crudState'),
                take(1)
            ).subscribe((change: CrudState) => {
                this.currentCrudState = change;
            });
    }

    ngAfterViewInit() {

        this.isErrorThrown = false;
        this.isInitMessageShown = true;
        this.isLoading = false;
        this.paginator.pageSizeOptions = new PaginationModel().pageSizes;
        this.paginator.pageSize = new PaginationModel().pageSize;
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        this.filter.searchEvent.subscribe(() => this.paginator.pageIndex = 0);
        this.crudMessages.visibilityChangedEvent.subscribe((isVisible) => {
            this.isCrudMessageVisible = isVisible;
        });

        merge(
            this.sort.sortChange,
            this.paginator.page,
            this.filter.searchEvent,
            this.gridStoreInitEvent)
            .pipe(switchMap(() => this.getSearchActions()),
            ).subscribe(data => this.dataSource.data = data);

        if (this.getStore()) {
            this.gridStoreInitEvent.emit();
        }

        this.changeDetectionRef.markForCheck();
    }

    ngAfterViewChecked() {
        this.defaultModelCheck();
    }

    ngOnDestroy() {
        if (this.storeSubscription) {
            this.storeSubscription.unsubscribe();
        }
    }

    getStore(): GridSearch {
        if (this.gridStoreIdExists() && this.gridStoreId()) {
            const gridStore = this.currentCrudState.gridSearches.find(value => value.gridId === this.gridStoreId());
            if (gridStore) {
                // https://github.com/angular/material2/issues/10242
                // I'm programmatically setting the active and direction on matSort, but it's not updating the UI
                this.sort.active = gridStore.gridParams.sortModel.sortBy;
                this.sort.direction = gridStore.gridParams.sortModel.sortAsc ? 'asc' : 'desc';
                this.paginator.pageIndex = gridStore.gridParams.paginationModel.pageIndex;
                this.paginator.pageSize = gridStore.gridParams.paginationModel.pageSize;
                this.filter.value = gridStore.gridParams.filterForm;
            }
            return gridStore;
        } else {
            return null;
        }
    }

    setStore(filterValue: Filter, paginationModel: PaginationModel, sortModel: SortModel) {
        if (this.gridStoreIdExists() && this.gridStoreId()) {
            this.store.dispatch(
                crudGridSearchSet({
                    gridStoreId: this.gridStoreId(),
                    gridStore: {
                        filterForm: filterValue,
                        sortModel,
                        paginationModel,
                    } as GridStore
                } as GridSearchSetActionParam
                ));
        }
    }


    setDefaultModel(filterValue: Filter, paginationModel: PaginationModel, sortModel: SortModel) {
        this.defaultModel = { filterValue, paginationModel, sortModel };
    }

    private defaultModelCheck() {
        if (!this.isDefaultModelSet && (this.defaultModel !== null) && !this.getStore()) {
            this.isDefaultModelSet = true;
            this.setStore(
                this.defaultModel.filterValue,
                this.defaultModel.paginationModel,
                this.defaultModel.sortModel);
            this.gridStoreInitEvent.emit();
        }
    }

    private gridStoreIdExists(): boolean {
        return (typeof this.gridStoreId === 'function');
    }

    private getSearchActions(): Observable<TRow[]> {
        this.isLoading = true;
        return this.searchEvent(
            this.filter.value,
            PaginationModelMapper.mapFromMatPaginator(this.paginator),
            {
                sortBy: this.sort.active,
                sortAsc: this.sort.direction === 'asc'
            } as SortModel)
            .pipe(
                map((data: PaginatedResults<TRow>) => this.getSearchActionsOnSucceed(data)),
                catchError((searchError) => this.getSearchActionsOnFail(searchError)),
                finalize(() => {
                    this.isLoading = false;
                })
            );
    }

    private getSearchActionsOnSucceed(data: PaginatedResults<TRow>) {
        this.isInitMessageShown = false;
        this.isErrorThrown = false;
        this.isEmptyMessageShown = data.total === 0;
        this.resultsLength = data.total;
        this.filter.onSearchSucceed();
        this.setStore(
            this.filter.value,
            PaginationModelMapper.mapFromMatPaginator(this.paginator),
            {
                sortBy: this.sort.active,
                sortAsc: this.sort.direction === 'asc'
            } as SortModel);
        return data.results;
    }

    private getSearchActionsOnFail(error: any) {
        this.filter.onSearchFail();
        this.isErrorThrown = true;
        this.notificationService.error(this.errorMessage);
        this.changeDetectionRef.markForCheck();
        return of([]);
    }
}
