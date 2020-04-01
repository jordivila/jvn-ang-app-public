import { createReducer, on } from '@ngrx/store';
import { crudGridSearchSet } from './crud.actions';
import { CrudState, GridSearch } from './crud.store';

export const crudReducerinitialState = {
    gridSearches: [] as GridSearch[]
};
const crudReducer = createReducer(
    crudReducerinitialState,
    on<CrudState>(crudGridSearchSet,
        (state: CrudState, actionParam) => {

            const t = state.gridSearches.reduce(
                (a: GridSearch[], b: GridSearch) => {

                    if (b.gridId !== actionParam.gridStoreId) {
                        a.push(b);
                    }

                    return a;
                }, [{
                    gridId: actionParam.gridStoreId,
                    gridParams: actionParam.gridStore
                }]);

            return {
                gridSearches: t
            };

        })
);

export function crudReducers(state: CrudState, action) {
    return crudReducer(state, action);
}
