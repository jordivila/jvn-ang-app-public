import { CrudState } from './crud.store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../../../app.store';

export const crudFeatureKey = 'crudState';
export const selectCrudFeature = createFeatureSelector<AppState, CrudState>(crudFeatureKey);
export const selectGridSearches = createSelector(
    selectCrudFeature,
    (state: CrudState) => state.gridSearches
);
