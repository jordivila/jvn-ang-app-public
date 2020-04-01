import { HttpClient, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { HttpLastRequestProvider } from './http-last-request-interceptor';
import { HttpLastRequestService } from './http-last-request-service';

describe('Http Interceptor', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HttpLastRequestService,
                HttpLastRequestProvider
            ]
        });
    });

    afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
        httpMock.verify();
    }));

    it('invoke setLastRequest when an http request occurs', inject(
        [HttpClient, HttpTestingController, HttpLastRequestService],
        (http: HttpClient,
         httpMock: HttpTestingController,
         httpLastRequestService: HttpLastRequestService) => {

            spyOn(httpLastRequestService, 'setLastRequest');

            http.get('/data').subscribe(
                response => {
                    expect(response).toBeTruthy();
                }
            );

            const req = httpMock.expectOne((request: HttpRequest<any>) => {
                return true;
            });
            expect(req.request.method).toEqual('GET');

            req.flush({ hello: 'world' });
            expect(httpLastRequestService.setLastRequest).toHaveBeenCalled();
        }));
});
