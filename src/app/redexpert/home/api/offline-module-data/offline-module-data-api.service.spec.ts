import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OfflineModuleApiService } from './offline-module-data-api.service';
import { ConfigService } from '../../../../core/services/config/config.service';


// TODO: Make abstract class and reuse tests/describes/etc
describe('OfflineModuleApiService', () => {
    let httpMock: HttpTestingController;
    let service: OfflineModuleApiService;


    afterEach(() => {
        httpMock.verify();
    });

    describe('#url when no i18n dist exists', () => {

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [
                    OfflineModuleApiService,
                    ConfigService,
                ]
            });

            httpMock = TestBed.inject(HttpTestingController);
            service = TestBed.inject(OfflineModuleApiService);

        });

        it('should return expected url when no params', () => {
            expect(service.url()).toEqual('./assets/json/redexpert/product-module-data', 'should return expected url');
        });

        it('should return expected url when params exists', () => {
            const expected = './assets/json/redexpert/product-module-data/oneparam/anotherparam';
            expect(service.url('oneparam', 'anotherparam')).toEqual(expected, 'should return expected url');
        });
    });

    describe('#url when no i18n dist exists', () => {

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [
                    OfflineModuleApiService,
                    ConfigService,
                ]
            });

            httpMock = TestBed.inject(HttpTestingController);
            service = TestBed.inject(OfflineModuleApiService);

        });

        it('should return expected url when no params', () => {
            expect(service.url()).toEqual('./assets/json/redexpert/product-module-data', 'should return expected url');
        });

        it('should return expected url when params exists', () => {
            const expected = './assets/json/redexpert/product-module-data/oneparam/anotherparam';
            expect(service.url('oneparam', 'anotherparam')).toEqual(expected, 'should return expected url');
        });
    });

});
