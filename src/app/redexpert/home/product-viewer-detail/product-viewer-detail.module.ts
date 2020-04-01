import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrudModule } from '../../../shared/components/crud/crud.module';
import { MaterialModule } from '../../../shared/components/material/material.module';
import { ValidationMessagesModule } from '../../../shared/components/validation-messages/validation-messages.module';
import { CommonModule } from '@angular/common';
import { ProductViewerGraphComponent } from './product-viewer-graph/product-viewer-graph.component';
import { ProductViewerFilterComponent } from './product-viewer-filter/product-viewer-filter.component';
import { ProductViewerGridComponent } from './product-viewer-grid/product-viewer-grid.component';
import { ProductViewerDetailComponent } from './product-viewer-detail.component';
import { OfflineModuleApiService } from '../api/offline-module-data/offline-module-data-api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CrudModule,
    ValidationMessagesModule
  ],
  declarations: [
    ProductViewerDetailComponent,
    ProductViewerGridComponent,
    ProductViewerFilterComponent,
    ProductViewerGraphComponent,
  ],
  exports: [
    ProductViewerDetailComponent
  ],
  providers: [
    OfflineModuleApiService
  ]
})
export class ProductViewerDetailModule { }
