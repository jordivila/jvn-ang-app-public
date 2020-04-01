import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { HttpFakeBackendProvider } from './http-fake-backend-interceptor';
import { HttpLastRequestProvider } from './http-last-request-interceptor';
import { HttpLastRequestService } from './http-last-request-service';
import { HttpUnauthorizedProvider } from './http-unauthorized-interceptor';
import { HttpBusyIndicatorInterceptorProvider } from './http-busy-indicator-interceptor';
import { throwIfAlreadyLoaded } from '../../../shared/helpers/module-import-helper';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    declarations: [],
    exports: [
        HttpClientModule,
    ],
})
export class HttpCustomizedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: HttpCustomizedModule,
            providers: [
                // HttpBusyIndicatorInterceptorProvider, => shows busy indicadotindicator on ervry http request
                HttpLastRequestProvider,
                HttpLastRequestService,
                HttpUnauthorizedProvider,
                HttpFakeBackendProvider
            ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: HttpCustomizedModule) {
        throwIfAlreadyLoaded(parentModule, 'HttpCustomizedModule');
    }
}
