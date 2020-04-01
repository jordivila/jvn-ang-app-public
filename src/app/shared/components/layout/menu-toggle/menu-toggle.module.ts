import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuToggleComponent } from './menu-toggle.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [MenuToggleComponent],
  exports: [MenuToggleComponent]
})
export class MenuToggleModule { }
