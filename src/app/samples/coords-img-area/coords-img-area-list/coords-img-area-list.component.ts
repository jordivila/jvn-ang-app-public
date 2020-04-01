import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AreaSelected, AreaSelector } from '../coords-img-area.component';

@Component({
  selector: 'app-coords-img-area-list',
  templateUrl: './coords-img-area-list.component.html',
  styleUrls: ['./coords-img-area-list.component.scss']
})
export class CoordsImgAreaListComponent implements OnInit {

  @Input() fileImageAreaSelector: AreaSelector;
  @Input() fileCoordsSelected: Array<AreaSelected>;
  @Output() removeFileImageArea = new EventEmitter<AreaSelected>();
  @Output() selectedFileImageArea = new EventEmitter<AreaSelected>();

  constructor() { }

  ngOnInit() {

  }

  onFileCoordsRemove($event: Event, index: number, fileImageArea: AreaSelected) {
    $event.preventDefault();
    this.removeFileImageArea.emit(fileImageArea);
  }

  onRowClick($event: Event, fileImageArea: AreaSelected) {
    this.selectedFileImageArea.emit(fileImageArea);
  }

}
