import { Guid } from '../../../../helpers/guid';
import { Filter } from '../../filter/models/filter';
import { SortModel } from './sort';
import { PaginationModel } from './pagination';
import { GridSearch } from '../../reducers/crud.store';

export interface GridStorable {
    gridStoreId(): Guid;
    getStore(): GridSearch;
    setStore(filterValue: Filter, paginationModel: PaginationModel, sortModel: SortModel): void;
}

export interface GridStore {
    filterForm: Filter;
    paginationModel: PaginationModel;
    sortModel: SortModel;
}
