import { createReducer, on } from '@ngrx/store';
import { ErrorUnhandledState } from './error-unhandled.store';
import { errUnhandledThrown, errUnhandledCleared } from './error-unhandled.actions';

export const errorUnhandledReducerInitialState = {
    error: null,
} as ErrorUnhandledState;

const reducer = createReducer(
    errorUnhandledReducerInitialState,
    on(errUnhandledThrown, (state, actionParam): ErrorUnhandledState => ({
        ...state,
        error: {
            message: actionParam.error.message,
            stack: actionParam.error.stack
        }
    })),
    on(errUnhandledCleared,
        (state: ErrorUnhandledState): ErrorUnhandledState => ({
            ...state,
            error: null
        })
    ));

export function errorUnhandledReducer(state: ErrorUnhandledState, action) {
    return reducer(state, action);
}
