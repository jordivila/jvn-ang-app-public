import { Directive, HostListener } from '@angular/core';

@Directive({
    // tslint:disable-next-line
    selector: 'input[trim]',
})
export class TrimmedInputDirective {

    // WARNING !!
    // Do not use with form validation
    // Otherwise form validation should be fired after this value is changed
    @HostListener('change', ['$event']) onchange($event: any) {
        $event.target.value = $event.target.value.trim();
    }
}
