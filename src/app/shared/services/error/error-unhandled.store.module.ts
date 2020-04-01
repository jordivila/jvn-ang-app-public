import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { errorUnhandledFeatureKey } from './error-unhandled.selector';
import { errorUnhandledReducer } from './error-unhandled.reducers';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(errorUnhandledFeatureKey, errorUnhandledReducer),
    ]
})
export class ErrorUnhandledStoreModule {

}
