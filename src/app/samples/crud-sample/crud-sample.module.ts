import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { CrudModule } from '../../shared/components/crud/crud.module';
import { MaterialModule } from '../../shared/components/material/material.module';
import { ValidationMessagesModule } from '../../shared/components/validation-messages/validation-messages.module';
import { CrudSampleFilterComponent } from './crud-sample-filter/crud-sample-filter.component';
import { CrudSampleFormComponent } from './crud-sample-form/crud-sample-form.component';
import { CrudSampleGridComponent } from './crud-sample-grid/crud-sample-grid.component';
import { CrudSampleComponent } from './crud-sample.component';

const routes = [{
  path: '',
  component: CrudSampleComponent,
  children: [
    { path: '', component: CrudSampleComponent },
  ]
}] as Route[];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
    CrudModule,
    ValidationMessagesModule,
  ],
  declarations: [
    CrudSampleComponent,
    CrudSampleGridComponent,
    CrudSampleFormComponent,
    CrudSampleFilterComponent]
})
export class CrudSampleModule { }
