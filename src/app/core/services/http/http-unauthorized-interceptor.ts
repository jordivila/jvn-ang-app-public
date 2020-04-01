import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';


@Injectable()
export class HttpUnauthorizedInterceptor implements HttpInterceptor {

    constructor(private configService: ConfigService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (!this.isAuthorized(err.status)) {
                    this.onDeniedAccess();
                }
            }
        }));
    }

    private onDeniedAccess() {
        window.location.href = this.configService.LOGIN_PAGE;
    }

    private isAuthorized(status: number): boolean {
        return !(status === 401);
    }
}


export let HttpUnauthorizedProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpUnauthorizedInterceptor,
    multi: true,
    deps: [ConfigService]
};
