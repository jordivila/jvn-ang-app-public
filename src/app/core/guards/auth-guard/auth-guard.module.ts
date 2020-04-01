import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthGuardEffects } from './reducers/auth-guard.effects';
import { StoreModule, Store } from '@ngrx/store';
import { authGuardReducer } from './reducers/auth-guard.reducers';
import { AuthGuard } from './auth-guard';
import { Router } from '@angular/router';
import { authGuardFeatureKey } from './reducers/auth-guard.selectors';
import { AppState } from 'src/app/app.store';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { BusyIndicatorModule } from 'src/app/core/services/busy-indicator/busy-indicator.module';
import { UserLoggedInApiService } from 'src/app/core/api/user-logged-in/user-logged-in-api.service';

export function AuthGuardFactory(
    store: Store<AppState>,
    router: Router,
    notificationService: NotificationService,
    config: ConfigService) {

    return new AuthGuard(store, router, notificationService, config);
}

@NgModule({
    imports: [
        CommonModule,
        BusyIndicatorModule,
        StoreModule.forFeature(authGuardFeatureKey, authGuardReducer),
        EffectsModule.forFeature([AuthGuardEffects])
    ],
    declarations: [],
    providers: [
        UserLoggedInApiService,
        {
            provide: AuthGuard,
            useFactory: AuthGuardFactory,
            deps: [Store, Router, NotificationService, ConfigService]
        }
    ]
})
export class AuthGuardModule {

}
