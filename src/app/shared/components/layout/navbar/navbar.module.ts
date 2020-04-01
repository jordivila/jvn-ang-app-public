import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { MenuToggleModule } from '../menu-toggle/menu-toggle.module';
import { NavbarComponent } from './navbar.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MenuToggleModule,
    MaterialModule
  ],
  declarations: [
    NavbarComponent,
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
