import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/components/material/material.module';
import { ThemeSampleComponent } from './theme-sample.component';

const routes = [{
  path: '',
  component: ThemeSampleComponent,
  children: [
    { path: '', component: ThemeSampleComponent },
  ]
}] as Route[];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  declarations: [ThemeSampleComponent]
})
export class ThemeSampleModule { }
