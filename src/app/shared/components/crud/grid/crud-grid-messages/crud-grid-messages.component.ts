import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-crud-grid-messages',
  templateUrl: './crud-grid-messages.component.html',
  styleUrls: ['./crud-grid-messages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CrudGridMessagesComponent implements OnInit, OnChanges {


  @Input() isLoading: boolean;
  @Input() isErrorThrown: boolean;
  @Input() isInitMessageShown: boolean;
  @Input() isEmptyMessageShown: boolean;

  @Input() errorMessage: string;
  @Input() initMessage: string;
  @Input() noDataFoundMessage: string;

  @Output() visibilityChangedEvent = new EventEmitter<boolean>();

  public isVisible: boolean;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.isVisible !== (this.isLoading || this.isErrorThrown || this.isInitMessageShown || this.isEmptyMessageShown)) {
      this.isVisible = !this.isVisible;
      this.visibilityChangedEvent.emit(this.isVisible);
    }
  }

}
