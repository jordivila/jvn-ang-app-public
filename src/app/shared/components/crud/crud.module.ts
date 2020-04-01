import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { CrudComponent } from './crud.component';
import { FilterSideTemplatedComponent } from './filter/filter-side-templated/filter-side-templated.component';
import { FormSideTemplatedComponent } from './forms/form-side-templated/form-side-templated.component';
import { CrudGridButtonsComponent } from './grid/crud-grid-buttons/crud-grid-buttons.component';
import { CrudGridFilterToggleComponent } from './grid/crud-grid-filter-toggle/crud-grid-filter-toggle.component';
import { CrudGridMessagesComponent } from './grid/crud-grid-messages/crud-grid-messages.component';
import { StoreModule } from '@ngrx/store';
import { crudReducers } from './reducers/crud.reducers';
import { crudFeatureKey } from './reducers/crud.selectors';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        StoreModule.forFeature(crudFeatureKey, crudReducers)
    ],
    declarations: [
        CrudComponent,
        FormSideTemplatedComponent,
        CrudGridMessagesComponent,
        CrudGridButtonsComponent,
        CrudGridFilterToggleComponent,
        FilterSideTemplatedComponent,
    ],
    exports: [
        FormSideTemplatedComponent,
        FilterSideTemplatedComponent,
        CrudGridButtonsComponent,
        CrudGridMessagesComponent,
        CrudGridFilterToggleComponent
    ]
})
export class CrudModule {

}
