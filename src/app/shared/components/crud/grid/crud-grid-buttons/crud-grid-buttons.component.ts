import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { GridButton } from '../models/grid-button';

@Component({
  selector: 'app-crud-grid-buttons',
  templateUrl: './crud-grid-buttons.component.html',
  styleUrls: ['./crud-grid-buttons.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CrudGridButtonsComponent implements OnInit {

  @Input() buttons: GridButton[];

  constructor() { }

  ngOnInit() {
  }

}
