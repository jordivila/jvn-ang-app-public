import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FileMetadata } from '../api/file-metadata-api/file-metadata-api.interface';
import { ScaleApplyEventArgs } from '../coords-img-area-viewer/coords-img-area-viewer.component';
import { AreaSelector, FileViewerState } from '../coords-img-area.component';

@Component({
  selector: 'app-coords-img-area-tools',
  templateUrl: './coords-img-area-tools.component.html',
  styleUrls: ['./coords-img-area-tools.component.scss']
})
export class CoordsImgAreaToolsComponent implements OnInit, OnChanges {

  @Input() fileMetadata: FileMetadata;
  @Input() fileImageScale: number;
  @Input() fileImageAreaSelector: AreaSelector;
  @Input() fileViewerState: FileViewerState;
  @Output() applyZoom = new EventEmitter<ScaleApplyEventArgs>();
  @Output() areaCreate = new EventEmitter();
  @Output() areaSetCoords = new EventEmitter();
  @Output() pageIndexChange = new EventEmitter<number>();

  public fileImageScalePerCent: number;
  public pagesDropDownItems: number[];
  private zoomFraction = 0.05;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.fileImageScale) {
      this.fileImageScalePerCent = this.fileImageScalePerCentCalc(this.fileImageScale);
    }

    if (changes.fileMetadata) {
      this.pagesDropDownItems = Array(this.fileMetadata.totalPages).fill(1).map((x, i) => i + 1);
    }
  }

  fileImageScalePerCentCalc(scaleValue) {
    return Math.ceil(scaleValue * 100);
  }

  onFileImageZoomIn() {
    if ((this.fileImageScale - this.zoomFraction) > 0) {
      this.applyZoom.emit({
        scale: this.fileImageScale - this.zoomFraction
      } as ScaleApplyEventArgs);
    }
  }

  onFileImageZoomOut() {
    this.applyZoom.emit({
      scale: this.fileImageScale + this.zoomFraction
    } as ScaleApplyEventArgs);
  }

  onAreaCreate() {
    this.areaCreate.emit();
  }

  onAreaStoreCoords() {
    this.areaSetCoords.emit();
  }

  onPageChanged(pageIndex: string) {
    this.pageIndexChange.emit(parseInt(pageIndex, 0));
  }

}
