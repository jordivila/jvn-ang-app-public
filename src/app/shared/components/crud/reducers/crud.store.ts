import { Guid } from '../../../helpers/guid';
import { GridStore } from '../grid/models/grid-storable';

export interface CrudState {
    gridSearches: GridSearch[];
}

export interface GridSearch {
    gridId: Guid;
    gridParams: GridStore;
}
