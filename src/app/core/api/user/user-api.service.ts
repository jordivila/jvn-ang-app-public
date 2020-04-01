import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../services/config/config.service';
import { ApiBaseService } from '../apiBase';
import { PaginationModel, PaginatedResults } from '../../../shared/components/crud/grid/models/pagination';
import { Filter } from '../../../shared/components/crud/filter/models/filter';
import { SortModel } from '../../../shared/components/crud/grid/models/sort';
import { UserDetails, UserPostPut, UserRow } from './user-api.dto';

export interface UserApi {
    url(...args: string[]): string;
    list(filterModel: Filter, paginationModel: PaginationModel, sortModel: SortModel): Observable<PaginatedResults<UserRow>>;
    get(userId: string): Observable<UserDetails>;
    post(userCreateModel: UserPostPut): Observable<object>;
    put(userEditModel: UserPostPut): Observable<object>;
}

@Injectable()
export class UserApiService extends ApiBaseService implements UserApi {

    constructor(
        private http: HttpClient,
        private configService: ConfigService) {

        super();
    }

    url(...args: string[]): string {
        if (args.length > 0) {
            return `${this.configService.API}/users/${args[0]}`;
        } else {
            return `${this.configService.API}/users`;
        }
    }

    list(filterModel: Filter,
         paginationModel: PaginationModel,
         sortModel: SortModel): Observable<PaginatedResults<UserRow>> {

        return this.http.get<PaginatedResults<UserRow>>(`${this.url()}?${this.listParamsToUrl(filterModel, paginationModel, sortModel)}`);
    }

    get(userId: string): Observable<UserDetails> {
        return this.http.get<UserDetails>(`${this.url()}/${userId}`);
    }

    post(userCreateModel: UserPostPut): Observable<object> {
        return this.http.post(`${this.url()}`, userCreateModel);
    }

    put(userEditModel: UserPostPut): Observable<object> {
        return this.http.put(`${this.url()}/${userEditModel.id}`, userEditModel);
    }

    delete(id: string): Observable<object> {
        return this.http.delete(`${this.url()}/${id}`);
    }
}
