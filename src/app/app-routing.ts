import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule } from '@angular/router';
import { AppRoutes } from './app-routing.routes.factory';


@NgModule({
  imports: [
    RouterModule.forRoot(AppRoutes, { useHash: true, preloadingStrategy: NoPreloading, enableTracing: false })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
