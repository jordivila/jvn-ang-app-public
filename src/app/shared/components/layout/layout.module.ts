import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { FooterModule } from './footer/footer.module';
import { NavbarModule } from './navbar/navbar.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { ErrorUnhandledDisplayModule } from './error-unhandled-display/error-unhandled-display.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ToolbarModule,
        NavbarModule,
        FooterModule,
        ErrorUnhandledDisplayModule,
        MaterialModule
    ],
    declarations: [
    ],
    exports: [
        ToolbarModule,
        FooterComponent,
        NavbarModule,
        FooterModule,
        ErrorUnhandledDisplayModule
    ],
})
export class LayoutModule { }
