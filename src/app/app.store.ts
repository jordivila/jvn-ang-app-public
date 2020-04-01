import { RuntimeChecks } from '@ngrx/store';
import { authGuardFeatureKey } from 'src/app/core/guards/auth-guard/reducers/auth-guard.selectors';
import { AuthGuardState } from 'src/app/core/guards/auth-guard/reducers/auth-guard.store';
import { crudFeatureKey } from './shared/components/crud/reducers/crud.selectors';
import { CrudState } from './shared/components/crud/reducers/crud.store';
import { modalFeatureKey } from './shared/components/modal/reducers/modal.selectors';
import { ModalState } from './shared/components/modal/reducers/modal.store';
import { errorUnhandledFeatureKey } from './shared/services/error/error-unhandled.selector';
import { ErrorUnhandledState } from './shared/services/error/error-unhandled.store';

export interface AppState {
    [authGuardFeatureKey]: AuthGuardState;
    [modalFeatureKey]: ModalState;
    [crudFeatureKey]: CrudState;
    [errorUnhandledFeatureKey]: ErrorUnhandledState;
}

export const rootStoreConfigRuntimeChecks = {
    strictStateImmutability: true,
    strictActionImmutability: true,
    strictStateSerializability: true,
    strictActionSerializability: true,
} as RuntimeChecks;

export const rootStoreConfig = {
    runtimeChecks: rootStoreConfigRuntimeChecks
};
