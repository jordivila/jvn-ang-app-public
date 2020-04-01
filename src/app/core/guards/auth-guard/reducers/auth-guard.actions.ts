import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/api/user/user-api.dto';
import { AuthGuardStateErrorDetail } from './auth-guard.store';

export const authGuardGetData = createAction('[Auth Guard] GetData', props<{ jwToken: string }>());
export const authGuardSetData = createAction('[Auth Guard] SetData', props<{ user: User }>());
export const authGuardSetError = createAction('[Auth Guard] SetError', props<{ error: AuthGuardStateErrorDetail }>());
