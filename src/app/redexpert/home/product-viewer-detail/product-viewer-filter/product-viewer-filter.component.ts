import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FilterComponent } from '../../../../shared/components/crud/filter/filter.component';
import { Filter } from '../../../../shared/components/crud/filter/models/filter';

@Component({
  selector: 'app-product-viewer-filter',
  templateUrl: './product-viewer-filter.component.html',
  styleUrls: ['./product-viewer-filter.component.scss', './product-viewer-svg.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [],
})
export class ProductViewerFilterComponent
  extends FilterComponent<Filter>
  implements OnInit {

  @Input() title: string;
  @Input() isOpen: boolean;
  @Output() isOpenChanged = new EventEmitter<boolean>();

  constructor(public formBuilder: FormBuilder) {

    super(formBuilder);
  }

  initFormGroup(): FormGroup {
    return this.formBuilder.group({
      current: new FormControl('', []),
      length: new FormControl('', []),
      number: new FormControl('', []),
      current2: new FormControl('', []),
    });
  }

  onFilterToggleClick($event: Event, showFilter: boolean) {
    this.isOpen = showFilter;
    this.isOpenChanged.emit(this.isOpen);
  }

  cancelClick($event: Event) {
    super.cancelClick($event);
    this.onFilterToggleClick($event, false);
  }

}
