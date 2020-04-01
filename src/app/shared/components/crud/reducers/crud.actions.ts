import { Guid } from '../../../helpers/guid';
import { GridStore } from '../grid/models/grid-storable';
import { createAction, props } from '@ngrx/store';

export interface GridSearchSetActionParam {
    gridStoreId: Guid;
    gridStore: GridStore;
}
export const crudGridSearchSet =
    createAction('[Crud Component] SarchSet',
        props<GridSearchSetActionParam>());
