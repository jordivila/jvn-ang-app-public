import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { authGuardGetData } from './reducers/auth-guard.actions';
import { selectAuthGuardFeature } from './reducers/auth-guard.selectors';
import { AppState } from 'src/app/app.store';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { i18nMessages } from 'src/app/core/services/i18n/i18n.config';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private store: Store<AppState>,
        public router: Router,
        private notificationService: NotificationService,
        private config: ConfigService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot)
        : Observable<boolean> {
        return this.store.pipe(
            select(selectAuthGuardFeature),
            tap(loaded => {

                if (!loaded.isInitialized) {
                    this.store.dispatch(authGuardGetData({ jwToken: 'someTokenValue' }));
                }

                if (loaded.userInfoError) {
                    this.notificationService.error(i18nMessages.common.authErrorMessage);
                    this.router.navigateByUrl(this.config.LOGIN_PAGE);
                }

            }),
            filter(loaded => loaded.isInitialized === true),
            map(loaded => {
                return loaded.userInfo ? true : false;
            }),
        );
    }
}
