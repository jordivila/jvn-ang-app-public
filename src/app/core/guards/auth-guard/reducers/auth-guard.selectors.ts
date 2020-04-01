import { AuthGuardState } from './auth-guard.store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.store';

export const authGuardFeatureKey = 'authGuardState';
export const selectAuthGuardFeature = createFeatureSelector<AppState, AuthGuardState>(authGuardFeatureKey);
export const selectAuthGuardInitizlied = createSelector(
    selectAuthGuardFeature,
    (state: AuthGuardState) => state.isInitialized
);
