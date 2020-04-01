import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { I18nSampleComponent } from './i18n-sample.component';

const routes = [{
  path: '',
  component: I18nSampleComponent,
  children: [
    { path: '', component: I18nSampleComponent },
  ]
}] as Route[];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [I18nSampleComponent],
  exports: [I18nSampleComponent]
})
export class I18nSampleModule { }
