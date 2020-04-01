import { createReducer, on } from '@ngrx/store';
import { AuthGuardState } from './auth-guard.store';
import { authGuardSetData, authGuardSetError } from './auth-guard.actions';

export const authGuardReducerInitialState = {
  isInitialized: false,
  userInfo: null,
  userInfoError: null,
} as AuthGuardState;

const reducer = createReducer(
  authGuardReducerInitialState,
  on(authGuardSetData, (state, actionParam): AuthGuardState => ({
    ...state,
    isInitialized: true,
    userInfoError: null,
    userInfo: actionParam.user
  })),
  on(authGuardSetError,
    (state: AuthGuardState, actionParam): AuthGuardState => ({
      ...state,
      isInitialized: true,
      userInfoError: actionParam.error,
      userInfo: null
    })
  ));

export function authGuardReducer(state: AuthGuardState, action) {
  return reducer(state, action);
}
