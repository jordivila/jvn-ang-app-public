import { createAction, props } from '@ngrx/store';
import { ErrorUnhandledDetail } from './error-unhandled.store';

export const errUnhandledThrown = createAction('[Error Unhandled] Thrown', props<{ error: ErrorUnhandledDetail }>());
export const errUnhandledCleared = createAction('[Error Unhandled] Cleared');
