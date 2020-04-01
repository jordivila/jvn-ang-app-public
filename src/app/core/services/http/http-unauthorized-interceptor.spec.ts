import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { ConfigService } from '../config/config.service';
import { HttpUnauthorizedInterceptor } from './http-unauthorized-interceptor';

describe('Http Unauthorized Interceptor', () => {

    let interceptor = null;

    beforeEach(() => {

        const configService: Partial<ConfigService> = {
            production: false,
            API: 'http://someApiUrl/',
            ENV: 'dev',
            LOGIN_PAGE: 'http://someLoginPage/',
            SESSION_LOGOUT_TIMER_MINUTS: 1,
            LOCALE: 'en-US'
        };

        interceptor = new HttpUnauthorizedInterceptor(configService as ConfigService);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: HTTP_INTERCEPTORS, useValue: interceptor, multi: true, deps: [ConfigService] },
                { provide: ConfigService, useValue: configService, deps: [] },
            ]
        });
    });

    afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
        httpMock.verify();
    }));

    it('should verify isAuthorized', () => {
        expect(interceptor.isAuthorized(401)).toEqual(false);
        expect(interceptor.isAuthorized(200)).toEqual(true);
    });

    it('should call onDeniedAccess method when not authorized', inject(
        [HttpClient, HttpTestingController, ConfigService],
        (http: HttpClient,
         httpMock: HttpTestingController,
         configService: ConfigService) => {

            spyOn(interceptor, 'onDeniedAccess');

            http.get('/test').subscribe(
                () => { },
                (res: HttpErrorResponse) => {
                    expect(res.error.data).toEqual('hello world');
                });
            httpMock.expectOne('/test').flush(
                { data: 'hello world' },
                {
                    status: 401,
                    statusText: 'Server error'
                });

            expect(interceptor.onDeniedAccess).toHaveBeenCalled();
        })
    );

    it('should NOT call onDeniedAccess method when is authorized', inject(
        [HttpClient, HttpTestingController, ConfigService],
        (http: HttpClient,
         httpMock: HttpTestingController,
         configService: ConfigService) => {
            spyOn(interceptor, 'onDeniedAccess');
            http.get('/test').subscribe(() => { });
            httpMock.expectOne('/test').flush({});
            expect(interceptor.onDeniedAccess).not.toHaveBeenCalled();
        })
    );
});
