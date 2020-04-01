import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-coords-img-area-drawer',
  templateUrl: './coords-img-area-drawer.component.html',
  styleUrls: ['./coords-img-area-drawer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CoordsImgAreaDrawerComponent implements OnInit {

  @Input() public rects: any;
  @Input() public scale: any;


  constructor() { }

  ngOnInit() {
  }

}
