import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductViewerComponent } from './product-viewer.component';
import { ProductViewerListModule } from './product-viewer-list/product-viewer-list.module';
import { ProductViewerDetailModule } from './product-viewer-detail/product-viewer-detail.module';
import { RedexpertHomeRoutingModule } from './product-viewer-routing';

@NgModule({
  imports: [
    CommonModule,
    RedexpertHomeRoutingModule,
    ProductViewerListModule,
    ProductViewerDetailModule
  ],
  declarations: [
    ProductViewerComponent
  ]
})
export class ProductViewerModule { }
