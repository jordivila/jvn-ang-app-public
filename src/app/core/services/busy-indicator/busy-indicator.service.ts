import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { BusyIndicatorState } from './busy-indicator.dto';
import { filter } from 'rxjs/operators';
import { Guid } from 'src/app/shared/helpers/guid';
import { GuidHelper } from 'src/app/shared/helpers/guid-helper';

@Injectable()
export class BusyIndicatorService {

    private state$ = new ReplaySubject<BusyIndicatorState>(1);
    private defaultId: Guid = GuidHelper.create().value;

    constructor() { }

    get(id: Guid = this.defaultId): Observable<BusyIndicatorState> {
        if (!id) {
            id = this.defaultId;
        }
        return this.state$.asObservable().pipe(filter((x: BusyIndicatorState) => x && x.id === id));
    }

    show(text: string, id: Guid = this.defaultId) {
        this.state$.next({
            id,
            isOpen: true,
            text
        } as BusyIndicatorState);
    }

    hide(id: Guid = this.defaultId) {
        this.state$.next({
            id,
            isOpen: false,
            text: ''
        } as BusyIndicatorState);
    }
}
