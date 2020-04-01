import { HttpRequest } from '@angular/common/http';
import { PaginatedResults, PaginationModel } from 'src/app/shared/components/crud/grid/models/pagination';
import { SortModel } from 'src/app/shared/components/crud/grid/models/sort';
import { UserRow, UserDetails } from '../../api/user/user-api.dto';
import { userServiceMockListDataCreate, userDetailsMockGet } from '../../api/user/user-api.mock';

export class HttpFakeBackendPaginatedUsers {

    public get(request: HttpRequest<any>) {

        let result: UserDetails | PaginatedResults<UserRow> | null = null;
        const url = new URL(request.url);
        debugger;

        if (url.pathname.includes('/users')) {

            if (url.pathname === '/users') {
                const params = url.searchParams;
                const skip = parseInt(params.get('skip'), 0);
                const top = parseInt(params.get('top'), 0);
                const pageSize = top - skip;
                const pageIndex = skip / pageSize;
                const paginationModel = new PaginationModel({ pageIndex, pageSize });
                const sortModel = {
                    sortAsc: params.get('sortAsc') === 'true' ? true : false,
                    sortBy: params.get('sortby'),
                } as SortModel;

                result = this.paginateResults(
                    this.clone(userServiceMockListDataCreate()),
                    paginationModel.pageIndex,
                    paginationModel.pageSize,
                    sortModel.sortBy,
                    sortModel.sortAsc.toString().toLowerCase() === 'true');
            } else {
                // let's assume this request is for getting Edit data
                result = userDetailsMockGet();
            }
        }

        return result;

    }

    private clone(data: any) {
        return JSON.parse(JSON.stringify(data));
    }

    private paginateResults(
        data: UserRow[],
        pageIndex: number,
        pageSize: number,
        sortBy: string,
        sortAsc: boolean): PaginatedResults<UserRow> {

        const rowsModel: UserRow[] = [];
        const dataSort = (temp: UserRow[]) => {

            return temp.sort((a, b) => {
                switch (sortBy) {
                    case 'email':
                        if (a.email < b.email) { return sortAsc ? -1 : 1; }
                        if (a.email > b.email) { return sortAsc ? 1 : -1; }
                        return 0;
                    default:
                        if (a.email < b.email) { return sortAsc ? -1 : 1; }
                        if (a.email > b.email) { return sortAsc ? 1 : -1; }
                        return 0;
                }
            });
        };

        data = dataSort(data);

        for (let index = (pageIndex * pageSize); index < ((pageIndex * pageSize) + pageSize); index++) {
            const element1 = data[index];
            if (element1) {
                rowsModel.push(element1);
            }
        }

        return { results: rowsModel, total: data.length };
    }

}

