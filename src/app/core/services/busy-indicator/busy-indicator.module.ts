import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialModule } from 'src/app/shared/components/material/material.module';
import { BusyIndicatorComponent } from './busy-indicator.component';
import { BusyIndicatorService } from './busy-indicator.service';

export function BusyIndicatorServiceFactory() {
    return new BusyIndicatorService();
}

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    declarations: [BusyIndicatorComponent],
    exports: [BusyIndicatorComponent],
    providers: [
        {
            provide: BusyIndicatorService,
            useFactory: BusyIndicatorServiceFactory,
            deps: [Store]
        }
    ]
})
export class BusyIndicatorModule {

}
