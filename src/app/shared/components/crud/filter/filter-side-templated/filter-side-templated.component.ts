import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-filter-side-templated',
  templateUrl: './filter-side-templated.component.html',
  styleUrls: ['./filter-side-templated.component.scss']
})
export class FilterSideTemplatedComponent
  implements OnInit {

  @Input() title: string;
  @Input() isOpen: boolean;
  @Input() formTemplate: TemplateRef<any>;
  @Input() formButtonsTemplate: TemplateRef<any>;

  constructor() { }

  ngOnInit() { }

}
