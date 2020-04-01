import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CrudGridActionEventArgs } from './crud-sample-grid/crud-sample-grid.component';

@Component({
  selector: 'app-crud-sample',
  templateUrl: './crud-sample.component.html',
  styleUrls: ['./crud-sample.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CrudSampleComponent implements OnInit {

  public isOpen: boolean;
  public selectedUserId: string;

  constructor() { }

  ngOnInit() {
    this.isOpen = false;
    this.selectedUserId = null;
  }

  onActionTriggeredEvent(eventArgs: CrudGridActionEventArgs) {
    if (eventArgs.type === 'add') {
      this.selectedUserId = null;
      this.isOpen = true;
    }
    if (eventArgs.type === 'edit') {
      this.selectedUserId = eventArgs.item.userId;
      this.isOpen = true;
    }
  }

  onFormClose() {
    this.isOpen = false;
  }
}
