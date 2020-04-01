import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { ConfigService } from '../../services/config/config.service';
import { ApiBaseService } from '../apiBase';
import { User } from '../user/user-api.dto';
import { GuidHelper } from '../../../shared/helpers/guid-helper';

export interface UserLoggedInApi {
    get(): Observable<User>;
}

@Injectable()
export class UserLoggedInApiService
    extends ApiBaseService
    implements UserLoggedInApi {

    constructor(
        private http: HttpClient,
        private configService: ConfigService) {
        super();
    }

    url(...args: string[]): string {
        return `${this.configService.API}/auth/`;
    }


    get(): Observable<User> {
        return of({
            id: GuidHelper.create().toString(),
            firstName: 'Fake',
            lastName: 'User',
            userName: 'fakeusername',
            email: 'valid.email@fakeuser.name'
        } as User)
            .pipe(delay(500)); // simulate http
        // remove above when implementing auth
        // and uncomment below
        // return this.http.get<User>(this.url())
        //     .pipe(catchError((error: Error) => throwError(error)));
    }
}
