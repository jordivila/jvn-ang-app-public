import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-crud-grid-filter-toggle',
  templateUrl: './crud-grid-filter-toggle.component.html',
  styleUrls: ['./crud-grid-filter-toggle.component.scss']
})
export class CrudGridFilterToggleComponent implements OnInit {

  @Input() title: string;
  @Input() isOpen: boolean;
  @Output() isOpenChanged = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onClick($event: Event) {
    this.isOpenChanged.emit(!this.isOpen);
  }

}
