import { createFeatureSelector } from '@ngrx/store';
import { ModalState } from './modal.store';
import { AppState } from '../../../../app.store';

export const modalFeatureKey = 'modalState';
export const selectModalFeature = createFeatureSelector<AppState, ModalState>(modalFeatureKey);
