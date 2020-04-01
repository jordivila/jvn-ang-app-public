import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/components/material/material.module';
import { FlexLayoutSampleComponent } from './flex-layout-sample.component';

const routes = [{
  path: '',
  component: FlexLayoutSampleComponent,
  children: [
    { path: '', component: FlexLayoutSampleComponent },
  ]
}] as Route[];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
  declarations: [FlexLayoutSampleComponent]
})
export class FlexLayoutSampleModule { }
