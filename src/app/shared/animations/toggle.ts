import { animate, state, style, transition, trigger } from '@angular/animations';

export const toggleIt = trigger('applicationPanel', [
    state('active', style({
        maxHeight: '*',
        visibility: 'visible',
    })),
    state('inactive', style({
        height: '0px',
        visibility: 'hidden',
        display: 'none'
    })),
    transition('active => inactive', animate('200ms ease-in-out')),
    transition('inactive => active', animate('200ms ease-in-out'))
]);

export const toggleFade = trigger('toggleFade', [
    state('active', style({
        opacity: 1
    })),
    state('inactive', style({
        opacity: 0
    })),
    transition('active => inactive', animate('0ms ease-in-out')),
    // we use faster timing when hiding. And slower for showing.
    // That makes the anoimation smoother
    transition('inactive => active', animate('1000ms ease-in-out'))
]);
