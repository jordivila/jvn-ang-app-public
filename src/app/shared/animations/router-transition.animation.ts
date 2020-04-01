import { transition, trigger } from '@angular/animations';

// export const routerTransition = trigger('routerTransition', [
//     transition('* <=> *', [
//     /* order */
//     /* 1 */ query(':enter, :leave', style({ position: 'absolute', width: '100%' })
//             , { optional: true }),
//     /* 2 */ group([  // block executes in parallel
//             query(':enter', [
//                 style({ transform: 'translateX(100%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
//             ], { optional: true }),
//             query(':leave', [
//                 style({ transform: 'translateX(0%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
//             ], { optional: true }),
//         ])
//     ])
// ]);


export const routerTransition = trigger('routerTransition', [
    transition('* <=> *', [
    // /* order */
    // /* 1 */ query(':enter, :leave', style({ position: 'absolute' /*, width: '100%'*/}), { optional: true }),
    // /* 2 */ // group([  // block executes in parallel
    //         query(':enter', [
    //             style({ opacity: 0 }),
    //             animate('1s', style({ opacity: 1 }))
    //         ], { optional: true }),
    //         query(':leave', [
    //             style({ opacity: 1 }),
    //             animate('0s', style({ opacity: 0 }))
    //         ], { optional: true }),
    //     // ])
    ])
]);


// export const routerTransition = trigger('routerTransition', [
//     // DOES nothing... igf you want to animate unncoment above animation
//     transition('* <=> *', [
//     /* order */
//     /* 1 */ query(':enter, :leave', style({  })
//             , { optional: true }),
//     /* 2 */ group([  // block executes in parallel
//             query(':enter', [
//                 style({  }),
//                 animate('0s ease-in-out', style({  }))
//             ], { optional: true }),
//             query(':leave', [
//                 style({ }),
//                 animate('0s ease-in-out', style({  }))
//             ], { optional: true }),
//         ])
//     ])
// ]);

