import 'hammerjs';
import { ModuleWithProviders, NgModule, Optional, SkipSelf, ErrorHandler, Injector } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { rootStoreConfig } from '../app.store';
import { UserApiService } from './api/user/user-api.service';
import { UserLoggedInApiService } from './api/user-logged-in/user-logged-in-api.service';
import { HttpCustomizedModule } from './services/http/http-interceptor.module';
import { throwIfAlreadyLoaded } from '../shared/helpers/module-import-helper';
import { ErrorHandlerService } from './services/error/error-unhandled.service';
import { ConfigService } from './services/config/config.service';
import { ErrorUnhandledStoreModule } from '../shared/services/error/error-unhandled.store.module';
import { NotificationModule } from './services/notification/notification.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardModule } from 'src/app/core/guards/auth-guard/auth-guard.module';
import { BusyIndicatorModule } from 'src/app/core/services/busy-indicator/busy-indicator.module';
import { UnitSystemApiService } from './api/units/units-api.servce';

@NgModule({
    imports: [
        StoreModule.forRoot({}, rootStoreConfig),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            // logOnly: environment.production, // Restrict extension to log-only mode
        }),
        EffectsModule.forRoot([]),

        BrowserAnimationsModule,
        HttpCustomizedModule.forRoot(),
        ErrorUnhandledStoreModule,
        NotificationModule,
        BusyIndicatorModule,
        AuthGuardModule
    ],
    declarations: [

    ],
    exports: [
        BrowserAnimationsModule,
        HttpCustomizedModule,
        ErrorUnhandledStoreModule,
        NotificationModule,
        BusyIndicatorModule,
        AuthGuardModule
    ],
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                ConfigService,
                UserApiService,
                UserLoggedInApiService,
                UnitSystemApiService,
                {
                    provide: ErrorHandler,
                    useClass: ErrorHandlerService,
                    deps: [Injector]
                }
            ]
        };
    }

    // Prevent reimport of the SharedModule
    // Only the root AppModule should import the SharedModule.
    // Bad things happen if a lazy loaded module imports it
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, typeof(parentModule));
    }
}
