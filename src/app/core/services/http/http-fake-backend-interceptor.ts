import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpFakeBackendPaginatedUsers } from './http-fake-backend-pagination';

@Injectable()
export class HttpFakeBackendInterceptor implements HttpInterceptor {

    private httpFakeBackendPaginatedUsers = new HttpFakeBackendPaginatedUsers();

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('/assets/')) {
            return next.handle(req);
        } else {

            const userPaginatedFake = this.httpFakeBackendPaginatedUsers.get(req);

            if (userPaginatedFake) {
                return of(new HttpResponse({
                    status: 200,
                    body: userPaginatedFake
                }))
                .pipe(delay(3000));
            } else {
                const fakeUrl = new URL(req.url).pathname;
                req = Object.assign(req, new HttpRequest(req.method as any, `./assets/json/api${fakeUrl}.json`));
                return next.handle(req.clone({})).pipe(delay(3000));
            }
        }
    }
}

export let HttpFakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpFakeBackendInterceptor,
    multi: true
};
