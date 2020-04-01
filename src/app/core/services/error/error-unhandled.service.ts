import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Store } from '@ngrx/store';
import { ErrorUnhandledState, ErrorUnhandledDetail } from '../../../shared/services/error/error-unhandled.store';
import { errUnhandledThrown } from '../../../shared/services/error/error-unhandled.actions';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService extends ErrorHandler {

    private store: Store<ErrorUnhandledState>;


    // Could not find the way to inject Store<T> directly on the constructor
    // Cyclic dependency error thrown
    // Workaround: Injector instance on the constructor and
    //              get the service when needed
    constructor(
        private injector: Injector,
        // private store: Store<ErrorUnhandledState>
    ) {
        super();
    }

    handleError(error: Error | string) {

        // console.error(error);

        if (!this.store) {
            this.store = this.injector.get(Store);
        }
        const errorDetail = {
            message: (error as any).message ? (error as Error).message : 'Unhandled Error',
            stack: (error as any).stack ? (error as Error).stack : error as string,
        } as ErrorUnhandledDetail;
        this.store.dispatch(errUnhandledThrown({ error: errorDetail }));
    }
}
