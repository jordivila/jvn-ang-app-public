import { HomeModule } from './home.module';
import { HomeComponent } from './home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

const routes = [{
  path: '',
  component: HomeComponent,
}] as Route[];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
