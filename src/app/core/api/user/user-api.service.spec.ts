import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from '../../services/config/config.service';
import { UserApiService } from './user-api.service';
import { Filter } from '../../../shared/components/crud/filter/models/filter';
import { PaginationModel, PaginatedResults, PaginationUrlHelper } from '../../../shared/components/crud/grid/models/pagination';
import { SortModel } from '../../../shared/components/crud/grid/models/sort';
import { Guid } from '../../../shared/helpers/guid';
import { GuidHelper } from '../../../shared/helpers/guid-helper';
import { UserRow, UserDetails, UserPostPut } from './user-api.dto';



// TODO: Make abstract class and reuse tests/describes/etc
describe('UserApiService', () => {
    let httpMock: HttpTestingController;
    let service: UserApiService;
    let filter: Filter;
    let paginationModel: PaginationModel;
    let sortModel: SortModel;

    let listExpected: UserRow[];
    let listPaginatedExpected: PaginatedResults<UserRow>;
    let getExpected: UserDetails;
    let putItem: UserPostPut;
    let putExpected: object; // {}, null or any other value would work as we will check on http status

    let postItem: UserPostPut;
    let postExpected: { id: Guid };
    let deleteId: Guid;
    let deleteExpectedResult: object;  // {}, null or any other value would work as we will check on http status

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                UserApiService,
                ConfigService,
            ]
        });

        httpMock = TestBed.inject(HttpTestingController);
        service = TestBed.inject(UserApiService);

        filter = {};
        paginationModel = new PaginationModel();
        sortModel = {
            sortBy: 'sortByParamFieldName',
            sortAsc: true
        };



        listExpected = [
            {
                userId: GuidHelper.create().toString(),
                email: 'firstUser@email.com',
                fullName: 'Firstuser name',
                loginName: 'firstuser_login',
                primaryCompanyName: 'primaryCompany',
                activationOrDeactivationDate: new Date(),
                isActive: true,
                isPrivileged: true
            },
            {
                userId: GuidHelper.create().toString(),
                email: 'lastUser@email.com',
                fullName: 'Lastuser name',
                loginName: 'lastuser_login',
                primaryCompanyName: 'primaryCompany',
                activationOrDeactivationDate: new Date(),
                isActive: true,
                isPrivileged: true
            }
        ];
        listPaginatedExpected = {
            total: listExpected.length,
            results: listExpected
        } as PaginatedResults<UserRow>;


        getExpected = {
            id: GuidHelper.create().toString(),
            firstName: 'A user name',
            lastName: 'A user lastname',
            email: 'auser@email.com',
            userName: 'A user name',
            isPrivilegedContact: true,
            isUserAccountActive: false,
            lastActivationDeactivationDate: new Date()
        };

        postItem = {
            firstName: 'A user name',
            lastName: 'A user lastname',
            email: 'auser@email.com',
            userName: 'A user name',
            sendEmailConfirmation: true,
            caseId: '182719287192'
        };

        postExpected = { id: GuidHelper.create().toString() };

        putItem = {
            id: GuidHelper.create().toString(),
            firstName: 'A user name',
            lastName: 'A user lastname',
            email: 'auser@email.com',
            userName: 'A user name',
            sendEmailConfirmation: true,
            caseId: '182719287192'
        };
        putExpected = {};

        deleteId = GuidHelper.create().toString();
        deleteExpectedResult = {};

    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('#list params to Url', () => {

        it('should return correct querystring when no filter', () => {
            let url = service.listParamsToUrl(filter, paginationModel, sortModel);
            expect(url).toEqual(
                `&skip=${paginationModel.pageIndex}` +
                `&top=${paginationModel.pageSize}` +
                `&sortBy=${sortModel.sortBy}` +
                `&sortAsc=${sortModel.sortAsc}`);

            filter = null;
            url = service.listParamsToUrl(filter, paginationModel, sortModel);
            expect(url).toEqual(
                `&skip=${paginationModel.pageIndex}` +
                `&top=${paginationModel.pageSize}` +
                `&sortBy=${sortModel.sortBy}` +
                `&sortAsc=${sortModel.sortAsc}`);
        });

        it('should return correct querystring when filter exists', () => {
            filter = {
                aFieldName1: 'aValue1',
                aFieldName2: 'aValue2'
            };
            const url = service.listParamsToUrl(filter, paginationModel, sortModel);
            expect(url).toEqual(
                `aFieldName1=aValue1&aFieldName2=aValue2` +
                `&skip=${paginationModel.pageIndex}` +
                `&top=${paginationModel.pageSize}` +
                `&sortBy=${sortModel.sortBy}` +
                `&sortAsc=${sortModel.sortAsc}`);
        });

        it('should return correct querystring when page index changes', () => {
            paginationModel.pageIndex = 0;
            const url = service.listParamsToUrl(filter, paginationModel, sortModel);
            expect(url).toEqual(
                `&skip=${PaginationUrlHelper.toUrlModel(paginationModel).skip}` +
                `&top=${PaginationUrlHelper.toUrlModel(paginationModel).top}` +
                `&sortBy=${sortModel.sortBy}` +
                `&sortAsc=${sortModel.sortAsc}`);

            paginationModel.pageIndex = 1;
            const url2 = service.listParamsToUrl(filter, paginationModel, sortModel);
            expect(url2).toEqual(
                `&skip=${PaginationUrlHelper.toUrlModel(paginationModel).skip}` +
                `&top=${PaginationUrlHelper.toUrlModel(paginationModel).top}` +
                `&sortBy=${sortModel.sortBy}` +
                `&sortAsc=${sortModel.sortAsc}`);
        });

        it('should return correct querystring when page size changes', () => {
            paginationModel.pageSize = 20;
            const url = service.listParamsToUrl(filter, paginationModel, sortModel);
            expect(url).toEqual(
                `&skip=${PaginationUrlHelper.toUrlModel(paginationModel).skip}` +
                `&top=${PaginationUrlHelper.toUrlModel(paginationModel).top}` +
                `&sortBy=${sortModel.sortBy}` +
                `&sortAsc=${sortModel.sortAsc}`);
        });

        it('should return correct querystring when page sort changes', () => {
            sortModel = {
                sortBy: 'anotherFieldName',
                sortAsc: false
            } as SortModel;
            const url = service.listParamsToUrl(filter, paginationModel, sortModel);
            expect(url).toEqual(
                `&skip=${PaginationUrlHelper.toUrlModel(paginationModel).skip}` +
                `&top=${PaginationUrlHelper.toUrlModel(paginationModel).top}` +
                `&sortBy=${sortModel.sortBy}` +
                `&sortAsc=${sortModel.sortAsc}`);
        });

        it('should return correct querystring when page no sort exists', () => {
            sortModel = null;
            const url = service.listParamsToUrl(filter, paginationModel, sortModel);
            expect(url).toEqual(
                `&skip=${paginationModel.pageIndex}` +
                `&top=${paginationModel.pageSize}`);
        });
    });

    describe('#list', () => {

        it('should return expected list when no filter', () => {
            service.list(filter, paginationModel, sortModel).subscribe(
                data => expect(data).toEqual(listPaginatedExpected, 'should return expected list'),
                fail
            );

            const req = httpMock.expectOne(`${service.url()}?${service.listParamsToUrl(filter, paginationModel, sortModel)}`);
            expect(req.request.method).toEqual('GET');

            req.flush(listPaginatedExpected);
        });

        it('should be OK returning empty list', () => {
            service.list(filter, paginationModel, sortModel).subscribe(
                data => {
                    expect(data.total).toEqual(0, 'should have empty data array');
                    expect(data.results).toEqual([], 'should have empty data array');
                },
                fail
            );

            const req = httpMock.expectOne(`${service.url()}?${service.listParamsToUrl(filter, paginationModel, sortModel)}`);
            req.flush({
                results: [],
                total: 0
            } as PaginatedResults<UserRow>);
        });

        it('should return expected data (called multiple times)', () => {
            service.list(filter, paginationModel, sortModel).subscribe();
            service.list(filter, paginationModel, sortModel).subscribe();
            service.list(filter, paginationModel, sortModel).subscribe(
                data => expect(data).toEqual(listPaginatedExpected, 'should return expected list'),
                fail
            );

            const requests = httpMock.match(`${service.url()}?${service.listParamsToUrl(filter, paginationModel, sortModel)}`);
            expect(requests.length).toEqual(3, 'calls to list()');

            requests[0].flush([]);
            requests[1].flush([{ id: 1, name: 'bob' }]);
            requests[2].flush(listPaginatedExpected);
        });

        it('should return original exception in case it exists', () => {
            const errorDesc = 'unexpected error 500';
            const errorObj = { status: 500, statusText: 'Unexpected error' };
            service.list(filter, paginationModel, sortModel).subscribe(
                (data) => { },
                fail => {
                    expect(fail.error).toEqual(errorDesc, 'should return the original exception');
                    expect(fail.status).toEqual(errorObj.status, 'should return the original exception');
                    expect(fail.statusText).toEqual(errorObj.statusText, 'should return the original exception');
                }
            );

            const req = httpMock.expectOne(`${service.url()}?${service.listParamsToUrl(filter, paginationModel, sortModel)}`);
            req.flush(errorDesc, errorObj);
        });
    });

    describe('#get', () => {

        it('should return expected item if exists', () => {
            service.get(getExpected.id).subscribe(
                data => expect(data).toEqual(getExpected, 'should return expected item'),
                fail
            );

            const req = httpMock.expectOne(service.url(getExpected.id));
            expect(req.request.method).toEqual('GET');

            req.flush(getExpected);
        });

        it('should return expected data (called multiple times)', () => {
            service.get(getExpected.id).subscribe();
            service.get(getExpected.id).subscribe();
            service.get(getExpected.id).subscribe(
                data => expect(data).toEqual(getExpected, 'should return expected item'),
                fail
            );

            const requests = httpMock.match(service.url(getExpected.id));
            expect(requests.length).toEqual(3, 'calls to get()');

            requests[0].flush({});
            requests[1].flush([{ id: 1, name: 'bob' }]);
            requests[2].flush(getExpected);
        });

        it('should return original exception in case it exists', () => {
            const errorDesc = 'unexpected error 500';
            const errorObj = { status: 500, statusText: 'Unexpected error' };
            service.get(getExpected.id).subscribe(
                (data) => { },
                fail => {
                    expect(fail.error).toEqual(errorDesc, 'should return the original exception');
                    expect(fail.status).toEqual(errorObj.status, 'should return the original exception');
                    expect(fail.statusText).toEqual(errorObj.statusText, 'should return the original exception');
                }
            );

            const req = httpMock.expectOne(service.url(getExpected.id));
            req.flush(errorDesc, errorObj);
        });
    });

    describe('#put', () => {

        it('should update an item and return the result', () => {
            service.put(putItem).subscribe(
                data => expect(data).toEqual(putExpected, 'should return update expected result'),
                fail
            );

            const req = httpMock.expectOne(service.url(putItem.id));
            expect(req.request.method).toEqual('PUT');
            expect(req.request.body).toEqual(putItem);

            const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: putExpected });
            req.event(expectedResponse);
        });

        it('should return original exception in case it exists', () => {
            const errorDesc = 'unexpected error 500';
            const errorObj = { status: 500, statusText: 'Unexpected error' };
            service.put(putItem).subscribe(
                (data) => { },
                fail => {
                    expect(fail.error).toEqual(errorDesc, 'should return the original exception');
                    expect(fail.status).toEqual(errorObj.status, 'should return the original exception');
                    expect(fail.statusText).toEqual(errorObj.statusText, 'should return the original exception');
                }
            );

            const req = httpMock.expectOne(service.url(putItem.id));
            req.flush(errorDesc, errorObj);
        });
    });

    describe('#post', () => {

        it('should update an item and return the result', () => {
            service.post(postItem).subscribe(
                data => expect(data).toEqual(postExpected, 'should return the item'),
                fail
            );

            const req = httpMock.expectOne(service.url());
            expect(req.request.method).toEqual('POST');
            expect(req.request.body).toEqual(postItem);

            const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: postExpected });
            req.event(expectedResponse);
        });

        it('should return original exception in case it exists', () => {
            const errorDesc = 'unexpected error 500';
            const errorObj = { status: 500, statusText: 'Unexpected error' };
            service.post(postItem).subscribe(
                (data) => { },
                fail => {
                    expect(fail.error).toEqual(errorDesc, 'should return the original exception');
                    expect(fail.status).toEqual(errorObj.status, 'should return the original exception');
                    expect(fail.statusText).toEqual(errorObj.statusText, 'should return the original exception');
                }
            );

            const req = httpMock.expectOne(service.url());
            req.flush(errorDesc, errorObj);
        });
    });

    describe('#delete', () => {

        it('should delete an item and return the result', () => {

            service.delete(deleteId).subscribe(
                data => expect(data).toEqual(deleteExpectedResult, 'should return the expected item'),
                fail
            );

            const req = httpMock.expectOne(service.url(deleteId));
            expect(req.request.method).toEqual('DELETE');

            const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: deleteExpectedResult });
            req.event(expectedResponse);
        });

        it('should return original exception in case it exists', () => {
            const errorDesc = 'unexpected error 500';
            const errorObj = { status: 500, statusText: 'Unexpected error' };
            service.delete(deleteId).subscribe(
                (data) => { },
                fail => {
                    expect(fail.error).toEqual(errorDesc, 'should return the original exception');
                    expect(fail.status).toEqual(errorObj.status, 'should return the original exception');
                    expect(fail.statusText).toEqual(errorObj.statusText, 'should return the original exception');
                }
            );

            const req = httpMock.expectOne(service.url(deleteId));
            req.flush(errorDesc, errorObj);
        });
    });
});
