import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpLastRequestService } from './http-last-request-service';

@Injectable()
export class HttpLastRequestInterceptor implements HttpInterceptor {

    constructor(private httpLastReqiestService: HttpLastRequestService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.httpLastReqiestService.setLastRequest(request, next);
        return next.handle(request);
    }
}


export let HttpLastRequestProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpLastRequestInterceptor,
    multi: true,
    deps: [HttpLastRequestService]
};
