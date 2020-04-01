import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UnitSystemDto } from './units-api.dto';
import { HttpClient } from '@angular/common/http';
import { unitSystemData } from './units-api.fake';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UnitSystemApiService {

    constructor(private http: HttpClient) { }

    get(): Observable<UnitSystemDto[]> {
        // simulate http until DDBB is ready
        return of(unitSystemData)
            .pipe(delay(500));
    }
}
