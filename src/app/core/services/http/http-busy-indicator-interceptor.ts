import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BusyIndicatorService } from 'src/app/core/services/busy-indicator/busy-indicator.service';

@Injectable()
export class HttpBusyIndicatorInterceptor implements HttpInterceptor {

    private httpRequestCounter: number;

    constructor(private busyIndicatorService: BusyIndicatorService) {
        this.httpRequestCounter = 0;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.httpRequestCounter === 0) {
            this.busyIndicatorService.show('');
        }
        this.httpRequestCounter++;
        return next
            .handle(request)
            .pipe(
                finalize(() => {
                    this.httpRequestCounter--;
                    if (this.httpRequestCounter === 0) {
                        this.busyIndicatorService.hide();
                    }
                })
            );
    }
}


export let HttpBusyIndicatorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpBusyIndicatorInterceptor,
    multi: true,
    deps: [BusyIndicatorService]
};
