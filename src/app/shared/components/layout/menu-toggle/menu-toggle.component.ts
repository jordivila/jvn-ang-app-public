import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu-toggle',
  templateUrl: 'menu-toggle.component.html',
  styleUrls: ['menu-toggle.component.scss'],
})
export class MenuToggleComponent {

  @Input() isOpen: boolean;
  @Output() toggleEvent = new EventEmitter<boolean>();

  toggleClick($event: any) {
    this.toggleEvent.emit(!this.isOpen);
  }

}
