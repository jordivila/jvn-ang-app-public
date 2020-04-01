import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FileMetadata } from './api/file-metadata-api/file-metadata-api.interface';
import { FileMetadataApiService } from './api/file-metadata-api/file-metadata-api.service';
import { FileOcrApiService } from './api/file-ocr-api/file-ocr-api.service';
import { CoordsImgAreaViewerComponent, ScaleApplyEventArgs } from './coords-img-area-viewer/coords-img-area-viewer.component';
import { Guid } from 'src/app/shared/helpers/guid';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { GuidHelper } from 'src/app/shared/helpers/guid-helper';

export interface FileViewerState {
  page: number;
}

export interface AreaSelected {
  guid: Guid;
  cssClass: string;
  page: number;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export interface AreaSelector {
  guid?: Guid;
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
  clear?: () => {};
}

@Component({
  selector: 'app-coords-img-area',
  templateUrl: './coords-img-area.component.html',
  styleUrls: ['./coords-img-area.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoordsAreaSelectorComponent implements OnInit {


  @ViewChild(CoordsImgAreaViewerComponent, { static: false }) coordsImgAreaViewerComponent: CoordsImgAreaViewerComponent;

  public fileId: string;
  public fileMetadata: FileMetadata;
  public fileImageUrl: string;
  public fileViewerState: FileViewerState;
  public isFileViewerOpened: boolean;
  public fileCoordsSelected: Array<AreaSelected>;
  public fileImageScale: number;
  public fileImageAreaSelector: AreaSelector;

  constructor(
    protected changeDetectionRef: ChangeDetectorRef,
    private notificationService: NotificationService,
    private fileMetadataApi: FileMetadataApiService,
    private fileOcrApi: FileOcrApiService) {

  }

  ngOnInit() {
    this.fileId = GuidHelper.create().value;
    this.fileMetadata = null;
    this.fileImageUrl = null;
    this.fileViewerState = null;
    this.isFileViewerOpened = false;
    this.fileCoordsSelected = [];
    this.fileImageScale = 1;

    this.fileImageAreaSelector = {
      x1: null,
      x2: null,
      y1: null,
      y2: null,
      clear: () => {
        this.fileImageAreaSelector.x1 =
          this.fileImageAreaSelector.x2 =
          this.fileImageAreaSelector.y1 =
          this.fileImageAreaSelector.y2 = undefined;
      }
    } as AreaSelector;

    this.initFileViewer();
  }

  initFileViewer() {
    this.fileMetadataApi.get(this.fileId)
      .then((data) => {
        this.onFilePaginationReset();
        this.onFilePaginate(this.fileViewerState.page);
        this.fileMetadata = data;
      }, (error) => {
        if (error.status === 404) {
          this.notificationService.error('File/Image/PDF not found');
        }
      }).finally(() => {
        this.changeDetectionRef.markForCheck();
      });
  }

  onFilePaginationReset() {
    this.fileViewerState = {
      page: 1
    };
  }

  onFilePaginate(pageIndex) {
    this.fileOcrApi.get(this.fileId, pageIndex)
      .then((data) => {
        this.fileImageUrl = URL.createObjectURL(new Blob([data]));
        this.fileViewerState = Object.assign({}, this.fileViewerState, {page: pageIndex});
      }, (error) => {
        this.fileImageUrl = null;
      }).finally(() => {
        this.changeDetectionRef.markForCheck();
      });
  }

  onZoomApply(event: ScaleApplyEventArgs) {
    const zero = 0;
    const scale = event.scale;
    if (scale > zero) {
      this.fileImageAreaSelector.clear();
      this.fileImageScale = scale;
      // this.fileImageScalePerCent = this.fileImageScalePerCentCalc(this.fileImageScale);
    }
  }

  getAreaSelected(): AreaSelected {
    const one = 1;
    let zoomDiff = 1;
    let drawerItem = null;

    if (this.fileImageScale === one) {
      drawerItem = {
        x1: this.fileImageAreaSelector.x1,
        x2: this.fileImageAreaSelector.x2,
        y1: this.fileImageAreaSelector.y1,
        y2: this.fileImageAreaSelector.y2
      } as AreaSelected;
    }

    if (this.fileImageScale < one) {
      zoomDiff = one / this.fileImageScale;
      drawerItem = {
        x1: this.fileImageAreaSelector.x1 * zoomDiff,
        x2: this.fileImageAreaSelector.x2 * zoomDiff,
        y1: this.fileImageAreaSelector.y1 * zoomDiff,
        y2: this.fileImageAreaSelector.y2 * zoomDiff
      } as AreaSelected;
    }

    if (this.fileImageScale > one) {
      zoomDiff = one - (this.fileImageScale - one);
      drawerItem = {
        x1: this.fileImageAreaSelector.x1 / this.fileImageScale,
        x2: this.fileImageAreaSelector.x2 / this.fileImageScale,
        y1: this.fileImageAreaSelector.y1 / this.fileImageScale,
        y2: this.fileImageAreaSelector.y2 / this.fileImageScale
      } as AreaSelected;
    }

    drawerItem.guid = GuidHelper.create();
    drawerItem.cssClass = '';
    drawerItem.page = this.fileViewerState.page;

    return drawerItem;
  }

  onAreaStoreCoords() {
    this.fileCoordsSelected = [...this.fileCoordsSelected, this.getAreaSelected()];
    this.fileImageAreaSelector.clear();
  }

  onAreaCreate() {
    this.fileImageAreaSelector = Object.assign({}, this.fileImageAreaSelector, {
      x1: 0,
      x2: this.coordsImgAreaViewerComponent.width - 100,
      y1: 0,
      y2: this.coordsImgAreaViewerComponent.height - 100,
    });
  }

  onAreaListItemSelected(coordsObj: AreaSelected) {
    this.fileCoordsSelected.forEach(value => {
      if (value.guid === coordsObj.guid) {
        value.cssClass = value.cssClass === '' ? 'selected' : '';
      } else {
        value.cssClass = '';
      }
    });
  }

  onAreaListItemRemove(coordsObj: AreaSelected) {
    this.fileCoordsSelected = this.fileCoordsSelected.filter(value => value.guid !== coordsObj.guid);
  }
}
