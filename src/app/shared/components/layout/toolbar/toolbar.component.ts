import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent {

  @Input() isMenuOpen: boolean;
  @Output() toggleEvent = new EventEmitter<boolean>();

  onMenuToggleClick(isOpen: boolean) {
    this.toggleEvent.emit(isOpen);
  }
}
