// tslint:disable-next-line
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AreaSelected, FileViewerState } from '../coords-img-area.component';

export interface ScaleApplyEventArgs {
  scale: number;
}

@Component({
  selector: 'app-coords-img-area-viewer',
  templateUrl: './coords-img-area-viewer.component.html',
  styleUrls: ['./coords-img-area-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  //  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoordsImgAreaViewerComponent implements OnInit, OnChanges {
  @Input() fileCoordsSelected: Array<AreaSelected>;
  @Input() selector: any;
  @Input() src: string;
  @Input() scale?: number;
  @Input() fileViewerState: FileViewerState;
  @Output() scaleApply = new EventEmitter<ScaleApplyEventArgs>();

  public image: HTMLImageElement;
  public height: number;
  public width: number;
  public imageData: any;
  public areasToDraw: Array<AreaSelected>;


  constructor(
    protected elementRef: ElementRef,
    protected sanitizer: DomSanitizer) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.src) {
      this.image = null;
      this.loadImage(this.src);
    }

    if (changes.fileCoordsSelected || changes.fileViewerState) {
      this.areasToDraw = this.fileCoordsSelected.filter(value => value.page === this.fileViewerState.page);
    }
  }

  loadImage(src) {
    this.image = new Image();
    this.image.onload = this.onImageLoaded.bind(this);
    this.image.src = src;

    this.imageData = this.sanitizer.bypassSecurityTrustUrl(src);
  }

  onImageLoaded() {
    const one = 1;
    this.height = this.image.height;
    this.width = this.image.width;
    this.scale = this.scale || one;
    this.elementRef.nativeElement.style.width = this.scaleValuePx(this.width, this.scale);
    this.elementRef.nativeElement.style.height = this.scaleValuePx(this.height, this.scale);
    this.scaleCalcToFitParent();
  }

  scaleCalcToFitParent() {
    const parentWidth = this.elementRef.nativeElement.parentElement.offsetWidth;
    const scaleToFit = parentWidth / this.image.width;
    this.scaleApply.emit({ scale: scaleToFit } as ScaleApplyEventArgs);
  }

  scaleValue(value, scale) {
    return Math.floor(value * scale);
  }

  scaleValuePx(value, scale) {
    return `${this.scaleValue(value, scale)}px`;
  }

}
