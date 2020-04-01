import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { ProductViewerComponent } from './product-viewer.component';
import { ProductViewerDefaultComponent } from './product-viewer-list/product-viewer-default/product-viewer-default.component';
import { EmcDesignToolsComponent } from './product-viewer-list/emc-design-tools/emc-design-tools.component';
import { PowerDesignToolsComponent } from './product-viewer-list/power-design-tools/power-design-tools.component';
import {
  ProductViewerListByCategoryComponent
} from './product-viewer-list/product-viewer-list-by-category/product-viewer-list-by-category.component';
import { ProductViewerDetailComponent } from './product-viewer-detail/product-viewer-detail.component';
import { REDEXPERT_HOME_ARTICLE_COMP_ROUTE_PATH } from './product-viewer-routing-paths';


const routes = [{
  path: '',
  component: ProductViewerComponent,
  children: [
    { path: '', component: ProductViewerDefaultComponent },
    { path: 'emc-design-tools', component: EmcDesignToolsComponent },
    { path: 'power-design-tools', component: PowerDesignToolsComponent },
    { path: REDEXPERT_HOME_ARTICLE_COMP_ROUTE_PATH, component: ProductViewerListByCategoryComponent },
    { path: 'detail/:id', component: ProductViewerDetailComponent }
  ]
}] as Route[];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RedexpertHomeRoutingModule { }
