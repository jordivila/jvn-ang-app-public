import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

export const blinkIt = trigger('blinkThis', [
    state('true', style({ visibility: 'visible' })),
    transition('void => *', [
        animate(2000, keyframes([
            style({opacity: 1 }),
            style({opacity: 0 }),
            style({opacity: 1 }),
            style({opacity: 0 }),
            style({opacity: 1 }),
        ]))
    ]),
    transition('* => void', [
        animate(2000, keyframes([
            style({opacity: 1 }),
            style({opacity: 0 }),
            style({opacity: 1 }),
            style({opacity: 0 }),
            style({opacity: 1 }),
        ]))
    ])
]);
