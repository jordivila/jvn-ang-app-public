import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/components/material/material.module';
import { ModalWrapperModule } from '../../shared/components/modal/modal.module';
import { ModalsSampleComponent } from './modals-sample.component';

const routes = [{
  path: '',
  component: ModalsSampleComponent,
  children: [
    { path: '', component: ModalsSampleComponent },
  ]
}] as Route[];


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ModalWrapperModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ModalsSampleComponent
  ],
  exports: [
    // ModalWrapperModule
  ]
})
export class ModalsSampleModule { }
