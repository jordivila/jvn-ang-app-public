import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    // tslint:disable-next-line:pipe-naming
    name: 'secondsToDateTime',
})
@Injectable()
export class ModalTimeoutSecondsToDateTimePipe implements PipeTransform {
  transform(seconds: number): any {
    return new Date(1970, 0, 1).setSeconds(seconds);
  }
}
