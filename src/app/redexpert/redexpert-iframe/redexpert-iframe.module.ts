import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedexpertIframeComponent } from './redexpert-iframe.component';
import { RedexpertIframeRoutingModule } from './redexpert-iframe-routing';

@NgModule({
  declarations: [
    RedexpertIframeComponent
  ],
  imports: [
    CommonModule,
    RedexpertIframeRoutingModule
  ],
  exports: [
    RedexpertIframeComponent
  ]
})
export class RedexpertIframeModule { }
