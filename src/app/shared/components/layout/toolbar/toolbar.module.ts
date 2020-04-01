import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MenuToggleModule } from '../menu-toggle/menu-toggle.module';
import { RouteTitleModule } from '../route-title/route-title.module';
import { UserDropDownListModule } from '../user-dropdown/user-dropdown.module';
import { ToolbarComponent } from './toolbar.component';


@NgModule({
  imports: [
    CommonModule,
    MenuToggleModule,
    RouteTitleModule,
    UserDropDownListModule,
    MaterialModule
  ],
  declarations: [ToolbarComponent],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule { }
