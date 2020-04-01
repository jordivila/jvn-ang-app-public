import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../../app.store';
import { ErrorUnhandledState } from './error-unhandled.store';

export const errorUnhandledFeatureKey = 'errorUnhandledState';
export const errorUnhandledFeature = createFeatureSelector<AppState, ErrorUnhandledState>(errorUnhandledFeatureKey);
export const errorUnhandledDetail = createSelector(
    errorUnhandledFeature,
    (state: ErrorUnhandledState) => state.error
);
