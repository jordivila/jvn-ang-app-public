import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Route, RouterModule } from '@angular/router';
import { FileMetadataApiService } from './api/file-metadata-api/file-metadata-api.service';
import { FileOcrApiService } from './api/file-ocr-api/file-ocr-api.service';
import { CoordsImgAreaDrawerComponent } from './coords-img-area-drawer/coords-img-area-drawer.component';
import { CoordsImgAreaListComponent } from './coords-img-area-list/coords-img-area-list.component';
import { CoordsImgAreaSelectComponent } from './coords-img-area-select/coords-img-area-select.component';
import { CoordsImgAreaToolsComponent } from './coords-img-area-tools/coords-img-area-tools.component';
import { CoordsImgAreaViewerComponent } from './coords-img-area-viewer/coords-img-area-viewer.component';
import { CoordsAreaSelectorComponent } from './coords-img-area.component';

const routes = [{
  path: '',
  component: CoordsAreaSelectorComponent,
}] as Route[];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatListModule
  ],
  declarations: [
    CoordsAreaSelectorComponent,
    CoordsImgAreaViewerComponent,
    CoordsImgAreaDrawerComponent, CoordsImgAreaSelectComponent, CoordsImgAreaListComponent, CoordsImgAreaToolsComponent
  ],
  providers: [
    FileMetadataApiService,
    FileOcrApiService
  ]
})
export class CoordsAreaSelectorModule { }
