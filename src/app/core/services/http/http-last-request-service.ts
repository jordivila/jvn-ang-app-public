import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class HttpLastRequestService {

    private lastRequest: Observable<Date>;
    private lastRequestSubject: ReplaySubject<Date> = new ReplaySubject<Date>();

    constructor() {
        this.lastRequest = this.lastRequestSubject.asObservable();
    }

    getLastRequest(): Observable<Date> {
        return this.lastRequest;
    }

    setLastRequest(request: HttpRequest<any>, next: HttpHandler): void {
        this.lastRequestSubject.next(new Date());
    }
}
