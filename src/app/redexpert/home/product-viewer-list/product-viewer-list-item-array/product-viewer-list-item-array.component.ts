import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProductListItem } from '../product-viewer-list.dto';

@Component({
  selector: 'app-product-viewer-list-item-array',
  templateUrl: './product-viewer-list-item-array.component.html',
  styleUrls: ['./product-viewer-list-item-array.component.scss']
})
export class ProductViewerListItemArrayComponent implements OnInit {

  @Input() productListItems: ProductListItem[];
  @Output() visitClick = new EventEmitter<ProductListItem>();

  constructor() { }

  ngOnInit() { }

  onVisitClick(item: ProductListItem) {
    this.visitClick.emit(item);
  }
}
