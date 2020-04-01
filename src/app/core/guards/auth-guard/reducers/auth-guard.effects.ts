
import { Injectable } from '@angular/core';
import { finalize, map, catchError, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { AuthGuardStateErrorDetail } from './auth-guard.store';
import { User } from 'src/app/core/api/user/user-api.dto';
import { UserLoggedInApiService } from 'src/app/core/api/user-logged-in/user-logged-in-api.service';
import { i18nMessages } from 'src/app/core/services/i18n/i18n.config';
import { BusyIndicatorService } from 'src/app/core/services/busy-indicator/busy-indicator.service';


@Injectable()
export class AuthGuardEffects {

    constructor(
        private actions$: Actions,
        private busyIndicatorService: BusyIndicatorService,
        private userLoggedInApi: UserLoggedInApiService) {

    }

    checkAuth$ = createEffect(() =>
        this.actions$.pipe(
            ofType('[Auth Guard] GetData'),
            switchMap(() => {
                this.busyIndicatorService.show(i18nMessages.common.checkingPermissions);
                return this.userLoggedInApi.get()
                    .pipe(
                        map((user: User) => ({ type: '[Auth Guard] SetData', user })),
                        catchError((error: Error) => of({
                            type: '[Auth Guard] SetError', error: {
                                message: error.message,
                                stack: error.stack
                            } as AuthGuardStateErrorDetail
                        })),
                        finalize(() => this.busyIndicatorService.hide())
                    );
            })
        ),
        // https://ngrx.io/guide/effects/lifecycle#resubscribe-on-error
        // https://ngrx.io/guide/effects#handling-errors
        // { resubscribeOnError: false }
    );
}
