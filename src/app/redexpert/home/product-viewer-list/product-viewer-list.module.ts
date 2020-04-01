import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfflineModuleApiService } from '../api/offline-module-data/offline-module-data-api.service';
import { MaterialModule } from '../../../shared/components/material/material.module';
import { ProductViewerListByCategoryComponent } from './product-viewer-list-by-category/product-viewer-list-by-category.component';
import { ProductViewerListItemComponent } from './product-viewer-list-item/product-viewer-list-item.component';
import { ProductViewerDefaultComponent } from './product-viewer-default/product-viewer-default.component';
import { EmcDesignToolsComponent } from './emc-design-tools/emc-design-tools.component';
import { PowerDesignToolsComponent } from './power-design-tools/power-design-tools.component';
import { ProductViewerListItemArrayComponent } from './product-viewer-list-item-array/product-viewer-list-item-array.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    ProductViewerListByCategoryComponent,
    ProductViewerListItemComponent,
    ProductViewerDefaultComponent,
    EmcDesignToolsComponent,
    PowerDesignToolsComponent,
    ProductViewerListItemArrayComponent
  ],
  exports: [

  ],
  providers: [
    OfflineModuleApiService
  ]
})
export class ProductViewerListModule { }
