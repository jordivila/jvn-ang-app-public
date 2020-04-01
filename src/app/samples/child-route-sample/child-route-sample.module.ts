import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChildRouteDefaultComponent } from './child-route-default/child-route-default.component';
import { ChildRouteSampleComponent } from './child-route-sample.component';
import { ChildRouteSecondaryComponent } from './child-route-secondary/child-route-secondary.component';

const routes = [{
  path: '',
  component: ChildRouteSampleComponent,
  children: [
    { path: '', component: ChildRouteDefaultComponent },
    { path: 'secondary', component: ChildRouteSecondaryComponent },
  ]
}] as Route[];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ChildRouteSampleComponent, ChildRouteDefaultComponent, ChildRouteSecondaryComponent]
})
export class ChildRouteSampleModule { }
